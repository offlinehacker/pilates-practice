#!/usr/bin/env python3
"""Convert research/exercises-draft.json into data.js for the app.

Run again whenever the research draft changes:  python3 tools/build_data.py
In-app corrections are exported as overrides JSON; merge them with
`python3 tools/build_data.py --overrides path/to/overrides.json`.
"""

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

BLOCKS = [
    "Warm-up",
    "Foot Work",
    "Abdominal Work",
    "Hip Work",
    "Spinal Articulation",
    "Stretches",
    "Full Body Integration I",
    "Arm Work",
    "Leg Work",
    "Full Body Integration II",
    "Lateral Flexion/Rotation",
    "Back Extension",
]

BLOCK_EMOJI = ["🌸", "🦶", "💪", "🍑", "🐛", "🧘", "✨", "🏋️", "🦵", "🌟", "🌙", "🦢"]

# Ordered from lightest to heaviest; the first matching pattern wins, so the
# compound ranges must come before their single-word parts.
SPRING_CATEGORIES = [
    ("Extra light to light", r"extra light to light"),
    ("Extra light", r"extra light"),
    ("Light to medium", r"light to medium"),
    ("Medium to heavy", r"medium to heavy"),
    ("All springs (carriage held)", r"all springs"),
    ("Light", r"\blight\b"),
    ("Medium", r"\bmedium\b"),
    ("Heavy", r"\bheavy\b"),
]

LEVELS = ["Fundamental", "Intermediate", "Advanced", "Master"]


def slug(*parts):
    s = "-".join(p for p in parts if p)
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def spring_category(text):
    if not text:
        return None
    low = text.lower()
    for label, pattern in SPRING_CATEGORIES:
        if re.search(pattern, low):
            return label
    return None


def pick_springs(ex):
    """Return (category, detail, confirmed) from the claims.

    Student guesses with '?' or 'prob' are kept as detail only, so quizzes
    never test a colour nobody actually confirmed.
    """
    claims = ex.get("springs_claims") or []
    confirmed = [c for c in claims if c.get("confidence") == "confirmed-by-source"]
    detail = sorted({c["value"] for c in claims if c.get("value")})
    for c in confirmed:
        cat = spring_category(c["value"])
        if cat and "?" not in c["value"] and "prob" not in c["value"].lower():
            return cat, detail, True
    cat = spring_category(ex.get("springs"))
    return cat, detail, False


def clean(value):
    """Strip invisible junk (object-replacement chars, zero-width spaces) copied from the decks."""
    if isinstance(value, str):
        return re.sub(r"[\ufffc\ufffd\u200b\u00ad]", "", value).strip() or None
    if isinstance(value, list):
        return [v for v in (clean(x) for x in value) if v]
    return value


def split_breathing(text):
    if not text:
        return []
    parts = re.split(r"\s*\|\s*|,\s*(?=(?:Inhale|Exhale)\b)", text)
    return [p.strip() for p in parts if p and p.strip()]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--overrides", help="overrides JSON exported from the app")
    args = ap.parse_args()

    raw = json.loads((ROOT / "research/exercises-draft.json").read_text())
    for ex in raw:
        for k in ("name", "series", "springs", "reps", "setup", "breathing"):
            ex[k] = clean(ex.get(k))
        if ex.get("focus"):
            ex["focus"] = {k: clean(v) for k, v in ex["focus"].items()}
    names = {}
    for ex in raw:
        key = (ex["name"], ex["apparatus"])
        names[key] = names.get(key, 0) + 1

    out = []
    seen_ids = set()
    for ex in raw:
        if not ex.get("apparatus") or not ex.get("block"):
            continue
        conf = ex.get("confidence") or {}
        dup = names[(ex["name"], ex["apparatus"])] > 1
        ex_id = slug(ex["apparatus"], ex["series"] if dup else None, ex["name"])
        while ex_id in seen_ids:
            ex_id += "-2"
        seen_ids.add(ex_id)

        springs, springs_detail, springs_ok = pick_springs(ex)
        focus = ex.get("focus") or {}

        def c(field):
            return "c" if conf.get(field) == "confirmed-by-source" else "i"

        out.append(
            {
                "id": ex_id,
                "name": ex["name"],
                "label": f"{ex['name']} ({ex['series']})"
                if dup and ex.get("series")
                else ex["name"],
                "apparatus": ex["apparatus"],
                "level": ex.get("level"),
                "block": ex["block"],
                "blockNo": BLOCKS.index(ex["block"]) + 1,
                "order": ex.get("order"),
                "series": ex.get("series"),
                "seriesOrder": ex.get("order_in_series"),
                "springs": springs,
                "springsDetail": springs_detail,
                "reps": ex.get("reps"),
                "setup": ex.get("setup"),
                "breathing": split_breathing(ex.get("breathing")),
                "muscles": focus.get("muscles") or [],
                "objectives": focus.get("objectives") or [],
                "conf": {
                    "block": c("block"),
                    "level": c("level"),
                    "series": c("order_in_series"),
                    "order": c("order"),
                    "springs": "c" if springs_ok else "i",
                    "reps": "c" if ex.get("reps") else "i",
                    "setup": c("setup"),
                    "breathing": c("breathing"),
                    "muscles": c("focus"),
                    "objectives": c("focus"),
                },
                "notes": ex.get("notes") or [],
                "sources": ex.get("sources") or [],
            }
        )

    if args.overrides:
        overrides = json.loads(Path(args.overrides).read_text())
        by_id = {e["id"]: e for e in out}
        for ex_id, fields in overrides.items():
            if ex_id in by_id:
                for k, v in fields.items():
                    by_id[ex_id][k] = v
                    by_id[ex_id]["conf"][k] = "c"

    data = {
        "blocks": [
            {"no": i + 1, "name": b, "emoji": BLOCK_EMOJI[i]}
            for i, b in enumerate(BLOCKS)
        ],
        "levels": LEVELS,
        "springCategories": [label for label, _ in SPRING_CATEGORIES],
        "exercises": out,
    }
    js = "// Generated by tools/build_data.py from research/exercises-draft.json — do not edit by hand.\n"
    js += "window.PP_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
    (ROOT / "data.js").write_text(js)
    print(f"wrote data.js with {len(out)} exercises")


if __name__ == "__main__":
    main()
