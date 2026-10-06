// Bunny Pilates — BASI Block System practice app. Plain JS, no build step.
(function () {
  "use strict";

  const DATA = window.PP_DATA;
  const BLOCKS = DATA.blocks;
  const LEVEL_RANK = { Fundamental: 1, Intermediate: 2, Advanced: 3, Master: 4 };
  const APPARATUS = [...new Set(DATA.exercises.map((e) => e.apparatus))];
  const STORE_KEY = "bunny-pilates-v1";
  const DAY = 86400000;

  // Fields that can be quizzed. examOnly fields only appear in the mixed / timed exam (written-exam style).
  const FIELDS = {
    name: { label: "Name from picture", short: "Name" },
    block: { label: "Block", short: "Block" },
    level: { label: "Level", short: "Level" },
    series: { label: "Series / group", short: "Series" },
    seriesOrder: { label: "Order within series", short: "Order" },
    springs: { label: "Springs", short: "Springs" },
    reps: { label: "Repetitions", short: "Reps" },
    setup: { label: "Setup / starting position", short: "Setup" },
    breathing: { label: "Breathing", short: "Breathing" },
    muscles: { label: "Muscle focus", short: "Muscles", examOnly: true },
    objectives: { label: "Objectives", short: "Objectives", examOnly: true },
  };

  // Leitner boxes: a correct answer moves an item up one box, a miss drops it to box 1.
  // Box >= MASTERED_BOX counts as mastered on the mastery map.
  const BOX_INTERVAL = [0, 0, DAY, 3 * DAY, 7 * DAY, 16 * DAY];
  const MASTERED_BOX = 3;

  // ---------------------------------------------------------------- state
  const defaultState = () => ({
    settings: {
      apparatus: APPARATUS.slice(),
      levels: ["Fundamental", "Intermediate"],
      fields: Object.fromEntries(Object.keys(FIELDS).map((k) => [k, true])),
      sound: false,
      hideDetails: false,
    },
    srs: {},
    overrides: {},
    workouts: [],
    streak: { last: null, count: 0 },
    mastered: {},
  });

  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (!s) return defaultState();
      const d = defaultState();
      return { ...d, ...s, settings: { ...d.settings, ...s.settings, fields: { ...d.settings.fields, ...(s.settings || {}).fields } } };
    } catch {
      return defaultState();
    }
  }
  let state = loadState();
  const save = () => localStorage.setItem(STORE_KEY, JSON.stringify(state));

  // ---------------------------------------------------------------- data access
  const BY_ID = Object.fromEntries(DATA.exercises.map((e) => [e.id, e]));

  // Exercise with the user's in-app corrections applied. Edited fields count as confirmed.
  function ex(id) {
    const base = BY_ID[id];
    const o = state.overrides[id];
    if (!o) return base;
    const merged = { ...base, ...o, conf: { ...base.conf } };
    for (const k of Object.keys(o)) merged.conf[k] = "c";
    if (o.block) merged.blockNo = BLOCKS.find((b) => b.name === o.block)?.no ?? base.blockNo;
    return merged;
  }
  const allExercises = () => DATA.exercises.map((e) => ex(e.id));

  function filtered() {
    const { apparatus, levels } = state.settings;
    return allExercises().filter((e) => apparatus.includes(e.apparatus) && levels.includes(e.level));
  }

  const hasValue = (e, f) => {
    const v = e[f];
    return Array.isArray(v) ? v.length > 0 : v != null && v !== "";
  };
  const confirmed = (e, f) => hasValue(e, f) && e.conf[f] === "c";

  function seriesMembers(e) {
    if (!e.series) return [];
    return allExercises()
      .filter((x) => x.apparatus === e.apparatus && x.series === e.series && x.seriesOrder != null && x.conf.series === "c")
      .sort((a, b) => a.seriesOrder - b.seriesOrder);
  }

  // Can this (exercise, field) be quizzed with data we trust?
  function quizzable(e, f) {
    if (!state.settings.fields[f]) return false;
    switch (f) {
      case "name":
        return window.PP_FIG.hasPose(e.id);
      case "series":
        return confirmed(e, "series") && seriesMembers(e).length >= 2;
      case "seriesOrder":
        return e.conf.series === "c" && seriesMembers(e).length >= 3;
      default:
        return confirmed(e, f);
    }
  }

  function items(exs, { includeExamOnly = true } = {}) {
    const out = [];
    for (const e of exs) {
      for (const f of Object.keys(FIELDS)) {
        if (!includeExamOnly && FIELDS[f].examOnly) continue;
        if (quizzable(e, f)) out.push({ id: e.id, f, key: `${e.id}|${f}` });
      }
    }
    return out;
  }

  // ---------------------------------------------------------------- helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const uniq = (a) => [...new Set(a)];
  const today = () => new Date().toISOString().slice(0, 10);
  const blockName = (no) => BLOCKS[no - 1]?.name;
  const blockEmoji = (name) => BLOCKS.find((b) => b.name === name)?.emoji || "•";
  const fmt = (f, v) => (Array.isArray(v) ? v.join(f === "breathing" ? " → " : ", ") : v ?? "—");

  // ---------------------------------------------------------------- mascot, sound, confetti
  const BUNNY = (mood = "happy") => `
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="36" cy="26" rx="9" ry="22" fill="#fff" stroke="#5b4a6b" stroke-width="2.5" transform="rotate(-10 36 26)"/>
      <ellipse cx="36" cy="28" rx="4.5" ry="15" fill="#ffc2d6" transform="rotate(-10 36 28)"/>
      <ellipse cx="64" cy="26" rx="9" ry="22" fill="#fff" stroke="#5b4a6b" stroke-width="2.5" transform="rotate(10 64 26)"/>
      <ellipse cx="64" cy="28" rx="4.5" ry="15" fill="#ffc2d6" transform="rotate(10 64 28)"/>
      <path d="M28,92 Q50,70 72,92 Z" fill="#b79cf5"/>
      <circle cx="50" cy="60" r="25" fill="#fff" stroke="#5b4a6b" stroke-width="2.5"/>
      ${
        mood === "oops"
          ? `<path d="M38,56 l6,4 M44,56 l-6,4 M56,56 l6,4 M62,56 l-6,4" stroke="#5b4a6b" stroke-width="2.5" stroke-linecap="round"/>`
          : mood === "cheer"
          ? `<path d="M37,59 Q41,53 45,59 M55,59 Q59,53 63,59" fill="none" stroke="#5b4a6b" stroke-width="2.5" stroke-linecap="round"/>`
          : `<circle cx="41" cy="58" r="3" fill="#5b4a6b"/><circle cx="59" cy="58" r="3" fill="#5b4a6b"/>`
      }
      <circle cx="34" cy="66" r="4.5" fill="#ffb3c9"/><circle cx="66" cy="66" r="4.5" fill="#ffb3c9"/>
      ${mood === "oops" ? `<path d="M45,71 Q50,67 55,71" fill="none" stroke="#5b4a6b" stroke-width="2.2" stroke-linecap="round"/>` : `<path d="M45,68 Q50,73 55,68" fill="none" stroke="#5b4a6b" stroke-width="2.2" stroke-linecap="round"/>`}
      <circle cx="50" cy="64" r="2" fill="#ff8fb3"/>
    </svg>`;

  const CHEERS = ["Yay! 🌸", "Perfect form! ✨", "So strong! 💪", "Nailed it! 🐰", "Hop hop hooray! 🥕", "Control & flow! 🌷"];
  const OOPS = ["Almost! Breathe & retry 🌬️", "Oopsie — you'll get it 💕", "Every rep counts! 🐰", "Gentle reminder below 👇"];
  let bubbleTimer;
  function say(msg, mood = "happy", ms = 1800) {
    const b = $("#bubble");
    b.innerHTML = BUNNY(mood) + `<span>${esc(msg)}</span>`;
    b.hidden = false;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => (b.hidden = true), ms);
  }

  let audio;
  function sound(ok) {
    if (!state.settings.sound) return;
    try {
      audio = audio || new AudioContext();
      const notes = ok ? [660, 880] : [300, 220];
      notes.forEach((freq, i) => {
        const o = audio.createOscillator();
        const g = audio.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.12, audio.currentTime + i * 0.09);
        g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + i * 0.09 + 0.18);
        o.connect(g).connect(audio.destination);
        o.start(audio.currentTime + i * 0.09);
        o.stop(audio.currentTime + i * 0.09 + 0.2);
      });
    } catch {
      /* audio is a nicety; ignore failures */
    }
  }

  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = $("#confetti");
    const ctx = c.getContext("2d");
    c.width = innerWidth;
    c.height = innerHeight;
    const colors = ["#ff8fb3", "#b79cf5", "#7fd1bc", "#ffcfae", "#ffe066"];
    const parts = Array.from({ length: 120 }, () => ({
      x: innerWidth / 2,
      y: innerHeight / 3,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 2,
      s: 4 + Math.random() * 5,
      c: pick(colors),
      r: Math.random() * 6,
    }));
    let frame = 0;
    (function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of parts) {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.r += 0.1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
        ctx.restore();
      }
      if (frame++ < 110) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, c.width, c.height);
    })();
  }

  // ---------------------------------------------------------------- spaced repetition
  function bumpStreak() {
    const t = today();
    const s = state.streak;
    if (s.last === t) return;
    const yesterday = new Date(Date.now() - DAY).toISOString().slice(0, 10);
    s.count = s.last === yesterday ? s.count + 1 : 1;
    s.last = t;
    renderStreak();
  }

  function record(key, ok) {
    const r = state.srs[key] || { b: 0, n: 0, ok: 0, due: 0 };
    r.n++;
    if (ok) r.ok++;
    r.b = ok ? Math.min(5, r.b + 1) : 1;
    r.due = Date.now() + BOX_INTERVAL[r.b];
    r.last = Date.now();
    state.srs[key] = r;
    bumpStreak();
    save();
    checkBlockMastery(key.split("|")[0]);
  }

  const boxOf = (key) => state.srs[key]?.b || 0;

  // Weighted pick: weak and due items come up far more often; the last few are avoided.
  function nextItem(pool, recent) {
    const now = Date.now();
    const candidates = pool.filter((it) => !recent.includes(it.key));
    const list = candidates.length ? candidates : pool;
    const weights = list.map((it) => {
      const r = state.srs[it.key];
      if (!r) return 4;
      const base = [4, 8, 4, 1.5, 0.6, 0.3][r.b];
      return r.due <= now ? base * 2 : base;
    });
    let x = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < list.length; i++) {
      x -= weights[i];
      if (x <= 0) return list[i];
    }
    return list[list.length - 1];
  }

  function blockMastery(blockNo, exs = filtered()) {
    const its = items(exs.filter((e) => e.blockNo === blockNo));
    if (!its.length) return { pct: 0, total: 0, done: 0 };
    const done = its.filter((it) => boxOf(it.key) >= MASTERED_BOX).length;
    return { pct: Math.round((done / its.length) * 100), total: its.length, done };
  }

  // Celebrate the first time a block crosses 90% mastery.
  function checkBlockMastery(id) {
    const e = ex(id);
    if (!e) return;
    const m = blockMastery(e.blockNo);
    if (m.total && m.pct >= 90 && !state.mastered[e.blockNo]) {
      state.mastered[e.blockNo] = today();
      save();
      setTimeout(() => {
        confetti();
        say(`${blockName(e.blockNo)} mastered! 🎉`, "cheer", 3000);
      }, 400);
    }
  }

  // ---------------------------------------------------------------- question builder
  function distractors(correct, candidates, n = 3) {
    const norm = (s) => String(s).trim().toLowerCase();
    const c = norm(correct);
    const seen = new Set([c]);
    const out = [];
    for (const x of shuffle(candidates)) {
      if (!x || seen.has(norm(x))) continue;
      seen.add(norm(x));
      out.push(x);
      if (out.length === n) break;
    }
    return out;
  }

  function asOptions(correct, wrong, { keepOrder } = {}) {
    const opts = keepOrder ? [correct, ...wrong].sort(keepOrder) : shuffle([correct, ...wrong]);
    return { options: opts, answer: opts.indexOf(correct) };
  }

  // Returns {prompt, options, answer, explain, showPose, chips} or null if no good question exists.
  function makeQuestion(e, f) {
    const app = `<span class="badge app">${esc(e.apparatus)}</span>`;
    const name = `<b>${esc(e.label)}</b> ${app}`;
    const same = allExercises().filter((x) => x.apparatus === e.apparatus && x.id !== e.id);
    const q = { showPose: true, chips: false, f };

    switch (f) {
      case "name": {
        const wrong = distractors(e.label, shuffle(same).map((x) => x.label));
        return { ...q, prompt: `Which ${esc(e.apparatus)} exercise is this?`, ...asOptions(e.label, wrong), explain: `${esc(e.label)} · ${esc(e.block)}` };
      }
      case "block": {
        if (Math.random() < 0.3) {
          // Reverse: which exercise belongs to block X?
          const others = same.filter((x) => x.blockNo !== e.blockNo && x.conf.block === "c");
          const wrong = distractors(e.label, shuffle(others).map((x) => x.label));
          if (wrong.length === 3)
            return { ...q, showPose: false, prompt: `Which ${app} exercise belongs to <b>${blockEmoji(e.block)} ${esc(e.block)}</b>?`, ...asOptions(e.label, wrong), explain: `${esc(e.label)} → ${esc(e.block)}` };
        }
        const near = BLOCKS.filter((b) => Math.abs(b.no - e.blockNo) <= 3).map((b) => b.name);
        const wrong = distractors(e.block, near.length > 3 ? near : BLOCKS.map((b) => b.name));
        return { ...q, chips: true, prompt: `Which block is ${name} in?`, ...asOptions(e.block, wrong), explain: `Block ${e.blockNo}: ${esc(e.block)}` };
      }
      case "level": {
        const lv = ["Fundamental", "Intermediate", "Advanced"];
        if (!lv.includes(e.level)) lv.push(e.level);
        return { ...q, chips: true, prompt: `What level is ${name}?`, options: lv, answer: lv.indexOf(e.level), explain: `${esc(e.label)} is ${esc(e.level)}` };
      }
      case "series": {
        const wrong = distractors(e.series, same.map((x) => x.series));
        if (wrong.length < 2) return null;
        return { ...q, chips: true, prompt: `Which series / group is ${name} part of?`, ...asOptions(e.series, wrong), explain: seriesExplain(e) };
      }
      case "seriesOrder": {
        const m = seriesMembers(e);
        const i = m.findIndex((x) => x.id === e.id);
        const after = i < m.length - 1;
        const target = after ? m[i + 1] : m[i - 1];
        const wrong = distractors(target.label, m.filter((x) => x.id !== e.id).map((x) => x.label).concat(shuffle(same).slice(0, 6).map((x) => x.label)));
        return {
          ...q,
          showPose: false,
          prompt: `${esc(e.series)} ${app}: what comes right <b>${after ? "after" : "before"}</b> <b>${esc(e.label)}</b>?`,
          ...asOptions(target.label, wrong),
          explain: seriesExplain(e),
        };
      }
      case "springs": {
        const wrong = distractors(e.springs, DATA.springCategories);
        const extra = e.springsDetail?.length ? `<br><span class="small">Notes: ${esc(e.springsDetail.join(" · "))}</span>` : "";
        return { ...q, chips: true, prompt: `Spring setting for ${name}?`, ...asOptions(e.springs, wrong), explain: `${esc(e.springs)}${extra}` };
      }
      case "reps": {
        const pool = allExercises().filter((x) => confirmed(x, "reps")).map((x) => x.reps).concat(["3-5 reps", "5 reps", "8-10 reps", "10 reps", "6-8 reps"]);
        const wrong = distractors(e.reps, pool);
        return { ...q, chips: true, prompt: `How many repetitions for ${name}?`, ...asOptions(e.reps, wrong), explain: esc(e.reps) };
      }
      case "setup": {
        const wrong = distractors(e.setup, same.filter((x) => x.setup).map((x) => x.setup));
        if (wrong.length < 2) return null;
        return { ...q, showPose: false, prompt: `Setup / starting position for ${name}?`, ...asOptions(e.setup, wrong), explain: esc(e.setup) };
      }
      case "breathing": {
        const txt = e.breathing.join(" → ");
        const wrong = distractors(txt, same.filter((x) => x.breathing.length).map((x) => x.breathing.join(" → ")));
        if (wrong.length < 2) return null;
        return { ...q, showPose: false, prompt: `Breathing pattern for ${name}?`, ...asOptions(txt, wrong), explain: esc(txt) };
      }
      case "muscles":
      case "objectives": {
        const mine = e[f].map((s) => s.toLowerCase());
        const correct = pick(e[f]);
        const others = allExercises().flatMap((x) => x[f] || []).filter((s) => !mine.includes(s.toLowerCase()));
        const wrong = distractors(correct, others);
        if (wrong.length < 3) return null;
        const label = f === "muscles" ? "a muscle focus" : "an objective";
        return { ...q, showPose: false, prompt: `Which is ${label} of ${name}?`, ...asOptions(correct, wrong), explain: `${FIELDS[f].label}: ${esc(e[f].join(", "))}` };
      }
    }
    return null;
  }

  function seriesExplain(e) {
    const m = seriesMembers(e);
    return `${esc(e.series)}: ` + m.map((x) => (x.id === e.id ? `<b>${esc(x.label)}</b>` : esc(x.label))).join(" → ");
  }

  // Renders one question into `host`; calls onDone(ok) after the user answers.
  function renderQuestion(host, e, qn, { onAnswer, header = "", nextLabel = "Next ➜", onNext } = {}) {
    const box = boxOf(`${e.id}|${qn.f}`);
    const pose = qn.showPose || qn.f === "name" ? window.PP_FIG.svg(e) : "";
    host.innerHTML = `
      <div class="card qcard">
        <div class="qtop"><span>${header}</span><span class="boxdots" title="Leitner box">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= box ? "on" : ""}"></i>`).join("")}</span></div>
        ${pose}
        <div class="prompt">${qn.prompt}</div>
        <div class="options ${qn.chips ? "chipgrid" : ""}">
          ${qn.options.map((o, i) => `<button class="opt ${qn.chips ? "chiplike" : ""}" data-i="${i}">${esc(o)}</button>`).join("")}
        </div>
        <div class="after"></div>
      </div>`;
    host.querySelectorAll(".opt").forEach((btn) =>
      btn.addEventListener("click", () => {
        const i = +btn.dataset.i;
        const ok = i === qn.answer;
        host.querySelectorAll(".opt").forEach((b) => (b.disabled = true));
        host.querySelector(`.opt[data-i="${qn.answer}"]`).classList.add("correct");
        if (!ok) btn.classList.add("wrong");
        sound(ok);
        if (ok) say(pick(CHEERS), "cheer", 1100);
        else say(pick(OOPS), "oops", 1600);
        onAnswer && onAnswer(ok);
        host.querySelector(".after").innerHTML = `
          <div class="explain">${ok ? "✅" : "💡"} ${qn.explain}
            <div class="row" style="margin-top:6px"><a class="small" href="#/ex/${esc(e.id)}">Open card</a></div></div>
          ${onNext ? `<button class="btn block" style="margin-top:12px" data-next>${nextLabel}</button>` : ""}`;
        const n = host.querySelector("[data-next]");
        if (n) {
          n.addEventListener("click", onNext);
          n.focus({ preventScroll: true });
        }
        // Shrink the picture and bring the explanation + Next into view, so answering
        // never needs a manual scroll. Wait for the shrink transition so we scroll to the final layout.
        const card = host.querySelector(".qcard");
        card.classList.add("answered");
        let revealed = false;
        const reveal = () => {
          if (revealed) return;
          revealed = true;
          host.querySelector(".after").scrollIntoView({ behavior: "smooth", block: "end" });
        };
        const pose = card.querySelector(".pose");
        if (pose) pose.addEventListener("transitionend", reveal, { once: true });
        setTimeout(reveal, pose ? 320 : 0); // fallback: no picture, reduced motion, or nothing to shrink
      })
    );
  }

  // ---------------------------------------------------------------- exercise card
  function fieldRow(e, f, label, value, hide) {
    if (!hasValue(e, f)) {
      return `<div class="field"><div class="k">${label}</div><div class="v muted">❓ unknown — tap ✏️ to add</div></div>`;
    }
    const unsure = e.conf[f] !== "c" ? ` <span class="badge unsure" title="Inferred, not confirmed by a source">❓ unverified</span>` : "";
    let v;
    if (f === "breathing") v = `<ul>${e.breathing.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;
    else if (Array.isArray(value)) v = esc(value.join(", "));
    else v = esc(value);
    return `<div class="field ${hide ? "hidden-answer" : ""}" data-reveal><div class="k">${label}${unsure}</div><div class="v">${v}</div></div>`;
  }

  function exerciseCard(e, { hide = false } = {}) {
    const detail = (e.springsDetail || []).filter((d) => d.toLowerCase() !== (e.springs || "").toLowerCase());
    const springsText = e.springs ? e.springs + (detail.length ? ` (${detail.join(" · ")})` : "") : null;
    const m = seriesMembers(e);
    const seriesText = e.series ? `${e.series}${e.seriesOrder ? ` · #${e.seriesOrder}${m.length ? ` of ${m.length}` : ""}` : ""}` : null;
    return `
      <div class="card excard">
        ${window.PP_FIG.svg(e)}
        <div class="excard-head">
          <div class="row between" style="flex-wrap:nowrap">
            <div class="title">${esc(e.label)}</div>
            <button class="iconbtn" data-edit="${esc(e.id)}" title="Edit / verify">✏️</button>
          </div>
          <div class="row">
            <span class="badge app">${esc(e.apparatus)}</span>
            <span class="badge ${esc(e.level)}">${esc(e.level || "level ?")}</span>
            <span class="badge">${blockEmoji(e.block)} ${e.blockNo}. ${esc(e.block)}${e.conf.block !== "c" ? " ❓" : ""}</span>
          </div>
        </div>
        <div class="fields">
          ${fieldRow({ ...e, series: seriesText }, "series", "Series", seriesText, hide)}
          ${fieldRow({ ...e, springs: springsText }, "springs", "Springs", springsText, hide)}
          ${fieldRow(e, "reps", "Repetitions", e.reps, hide)}
          ${fieldRow(e, "setup", "Setup", e.setup, hide)}
          ${fieldRow(e, "breathing", "Breathing", e.breathing, hide)}
          ${fieldRow(e, "muscles", "Muscle focus", e.muscles, hide)}
          ${fieldRow(e, "objectives", "Objectives", e.objectives, hide)}
        </div>
        ${e.notes?.length ? `<details class="small" style="margin-top:10px"><summary>Data notes</summary>${e.notes.map((n) => `<p>${esc(n)}</p>`).join("")}</details>` : ""}
        <details class="sources" style="margin-top:8px"><summary>Sources (${e.sources.length})</summary>
          ${e.sources.map((s) => `<div><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></div>`).join("")}
        </details>
      </div>`;
  }

  function wireCard(root) {
    root.querySelectorAll("[data-reveal].hidden-answer").forEach((el) => el.addEventListener("click", () => el.classList.remove("hidden-answer")));
    root.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => openEditor(b.dataset.edit)));
  }

  // ---------------------------------------------------------------- sheet (bottom modal)
  function openSheet(html, wire) {
    const s = $("#sheet");
    s.innerHTML = html;
    s.hidden = false;
    $("#sheet-backdrop").hidden = false;
    wire && wire(s);
  }
  function closeSheet() {
    $("#sheet").hidden = true;
    $("#sheet-backdrop").hidden = true;
  }

  const EDIT_FIELDS = ["block", "level", "series", "seriesOrder", "springs", "reps", "setup", "breathing", "muscles", "objectives"];

  function openEditor(id) {
    const e = ex(id);
    const verified = (f) => (e.conf[f] === "c" ? "checked" : "");
    const vbox = (f) => `<span class="verify"><input type="checkbox" data-verify="${f}" ${verified(f)}> verified</span>`;
    const lab = (f, text) => `<label class="fld"><span class="row between">${text}${vbox(f)}</span>`;
    openSheet(
      `<h2>✏️ ${esc(e.label)}</h2>
       <p class="small muted">Fix anything that differs from your manual. Edited or ticked fields become “verified” and are used in quizzes. Saved on this device — export from Settings.</p>
       <form id="editform">
        ${lab("block", "Block")}<select name="block">${BLOCKS.map((b) => `<option ${b.name === e.block ? "selected" : ""}>${esc(b.name)}</option>`).join("")}</select></label>
        ${lab("level", "Level")}<select name="level">${Object.keys(LEVEL_RANK).map((l) => `<option ${l === e.level ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        ${lab("series", "Series / group")}<input type="text" name="series" value="${esc(e.series || "")}"></label>
        ${lab("seriesOrder", "Position in series")}<input type="number" name="seriesOrder" min="1" value="${esc(e.seriesOrder ?? "")}"></label>
        ${lab("springs", "Springs")}<select name="springs"><option value="">—</option>${DATA.springCategories.map((c) => `<option ${c === e.springs ? "selected" : ""}>${esc(c)}</option>`).join("")}</select>
          <input type="text" name="springsDetail" placeholder="detail, e.g. 1 red + 1 blue" value="${esc((e.springsDetail || []).join(" · "))}"></label>
        ${lab("reps", "Repetitions")}<input type="text" name="reps" value="${esc(e.reps || "")}"></label>
        ${lab("setup", "Setup")}<textarea name="setup">${esc(e.setup || "")}</textarea></label>
        ${lab("breathing", "Breathing (one step per line)")}<textarea name="breathing">${esc(e.breathing.join("\n"))}</textarea></label>
        ${lab("muscles", "Muscle focus (comma separated)")}<input type="text" name="muscles" value="${esc(e.muscles.join(", "))}"></label>
        ${lab("objectives", "Objectives (comma separated)")}<input type="text" name="objectives" value="${esc(e.objectives.join(", "))}"></label>
        <div class="row" style="margin-top:14px">
          <button class="btn" type="submit">Save 💾</button>
          <button class="btn secondary" type="button" data-close>Cancel</button>
          ${state.overrides[id] ? `<button class="btn secondary small" type="button" data-reset>Undo my edits</button>` : ""}
        </div>
       </form>`,
      (s) => {
        s.querySelector("[data-close]").onclick = closeSheet;
        const reset = s.querySelector("[data-reset]");
        if (reset)
          reset.onclick = () => {
            delete state.overrides[id];
            save();
            closeSheet();
            route();
          };
        s.querySelector("#editform").onsubmit = (ev) => {
          ev.preventDefault();
          const fd = new FormData(ev.target);
          const val = {
            block: fd.get("block"),
            level: fd.get("level"),
            series: fd.get("series").trim() || null,
            seriesOrder: fd.get("seriesOrder") ? +fd.get("seriesOrder") : null,
            springs: fd.get("springs") || null,
            reps: fd.get("reps").trim() || null,
            setup: fd.get("setup").trim() || null,
            breathing: fd.get("breathing").split("\n").map((x) => x.trim()).filter(Boolean),
            muscles: fd.get("muscles").split(",").map((x) => x.trim()).filter(Boolean),
            objectives: fd.get("objectives").split(",").map((x) => x.trim()).filter(Boolean),
          };
          const base = BY_ID[id];
          const o = {};
          for (const f of EDIT_FIELDS) {
            const changed = JSON.stringify(val[f]) !== JSON.stringify(base[f]);
            const ticked = s.querySelector(`[data-verify="${f}"]`).checked;
            if (changed || (ticked && base.conf[f] !== "c")) o[f] = val[f];
          }
          const detail = fd.get("springsDetail").split("·").map((x) => x.trim()).filter(Boolean);
          if (JSON.stringify(detail) !== JSON.stringify(base.springsDetail)) o.springsDetail = detail;
          if (Object.keys(o).length) state.overrides[id] = o;
          else delete state.overrides[id];
          save();
          closeSheet();
          say("Saved! Thanks for fixing 💕");
          route();
        };
      }
    );
  }

  // ---------------------------------------------------------------- sortable (pointer based, works with touch)
  function makeSortable(list, onChange) {
    let drag = null;
    list.addEventListener("pointerdown", (ev) => {
      const item = ev.target.closest(".sortitem");
      if (!item || ev.target.closest("button")) return;
      ev.preventDefault();
      drag = { item, startY: ev.clientY, pid: ev.pointerId };
      item.classList.add("dragging");
      item.setPointerCapture(ev.pointerId);
    });
    list.addEventListener("pointermove", (ev) => {
      if (!drag || ev.pointerId !== drag.pid) return;
      const { item } = drag;
      item.style.transform = `translateY(${ev.clientY - drag.startY}px)`;
      const siblings = [...list.children].filter((x) => x !== item);
      const rect = item.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      for (const s of siblings) {
        const r = s.getBoundingClientRect();
        const sMid = r.top + r.height / 2;
        const before = s.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING;
        if (before && mid < sMid) {
          const old = item.getBoundingClientRect().top;
          list.insertBefore(item, s);
          drag.startY += item.getBoundingClientRect().top - old;
          item.style.transform = `translateY(${ev.clientY - drag.startY}px)`;
          break;
        }
        if (!before && mid > sMid) {
          const old = item.getBoundingClientRect().top;
          list.insertBefore(item, s.nextSibling);
          drag.startY += item.getBoundingClientRect().top - old;
          item.style.transform = `translateY(${ev.clientY - drag.startY}px)`;
        }
      }
    });
    const end = () => {
      if (!drag) return;
      drag.item.classList.remove("dragging");
      drag.item.style.transform = "";
      drag = null;
      renumber();
      onChange && onChange();
    };
    list.addEventListener("pointerup", end);
    list.addEventListener("pointercancel", end);
    // Keyboard / tap fallback: ▲ ▼ buttons.
    list.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-move]");
      if (!b) return;
      const item = b.closest(".sortitem");
      if (b.dataset.move === "up" && item.previousElementSibling) list.insertBefore(item, item.previousElementSibling);
      if (b.dataset.move === "down" && item.nextElementSibling) list.insertBefore(item.nextElementSibling, item);
      renumber();
    });
    function renumber() {
      [...list.children].forEach((li, i) => {
        li.querySelector(".idx").textContent = i + 1;
        li.classList.remove("correct", "wrong");
      });
    }
  }

  const sortItem = (key, text) =>
    `<li class="sortitem" data-key="${esc(key)}"><span class="handle">⠿</span><span class="idx"></span><span class="grow">${text}</span>
      <button class="iconbtn" data-move="up" aria-label="Move up">▲</button><button class="iconbtn" data-move="down" aria-label="Move down">▼</button></li>`;

  // ---------------------------------------------------------------- views
  const view = () => $("#view");

  function renderStreak() {
    $("#streak").textContent = `🔥 ${state.streak.count || 0}`;
  }

  function ring(pct) {
    const r = 22;
    const c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 54 54"><circle cx="27" cy="27" r="${r}" fill="none" stroke="#ffe4ef" stroke-width="6"/>
      ${pct ? `<circle cx="27" cy="27" r="${r}" fill="none" stroke="url(#rg)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(c * pct) / 100} ${c}" transform="rotate(-90 27 27)"/>` : ""}
      <defs><linearGradient id="rg"><stop offset="0" stop-color="#ff8fb3"/><stop offset="1" stop-color="#b79cf5"/></linearGradient></defs></svg>`;
  }

  function homeView() {
    const exs = filtered();
    const all = items(exs);
    const done = all.filter((it) => boxOf(it.key) >= MASTERED_BOX).length;
    const pct = all.length ? Math.round((done / all.length) * 100) : 0;
    const due = all.filter((it) => state.srs[it.key] && state.srs[it.key].due <= Date.now() && boxOf(it.key) < 5).length;
    const greeting = pct === 0 ? "Let's start hopping through the 12 blocks!" : pct < 50 ? "You're warming up nicely 🌸" : pct < 90 ? "Look at that control & flow! ✨" : "Exam-ready bunny! 🏆";
    view().innerHTML = `
      <div class="stack">
        <div class="card soft-pink hero">
          <div class="hero-bunny">${BUNNY(pct >= 50 ? "cheer" : "happy")}</div>
          <div class="grow">
            <h1>Hi! 🐰</h1>
            <p>${greeting}</p>
            <div class="progressbar"><div style="width:${pct}%"></div></div>
            <p class="small muted" style="margin-top:6px">${done} / ${all.length} facts mastered · ${due} due for review · ${exs.length} exercises in your set</p>
          </div>
        </div>
        <a class="btn block" href="#/exam">🎯 Continue practising</a>
        <h2>Mastery map</h2>
        <div class="blockgrid">
          ${BLOCKS.map((b) => {
            const m = blockMastery(b.no, exs);
            return `<a class="blocktile ${m.total && m.pct >= 90 ? "mastered" : ""}" href="#/block/${b.no}">
              <span class="no">${b.no}</span>${ring(m.pct)}<div class="name">${b.emoji} ${esc(b.name)}</div><div class="pct">${m.pct}% · ${m.done}/${m.total}</div></a>`;
          }).join("")}
        </div>
        <h2>Ways to practise</h2>
        ${modeGrid()}
      </div>`;
  }

  function modeGrid() {
    const modes = [
      ["📖", "Learn cards", "Flip through cards, hide details to self-test", "#/learn", "soft-pink"],
      ["🧠", "Recall", "Go through a block, fill each detail", "#/recall", "soft-lilac"],
      ["🧩", "Rebuild order", "Drag blocks & series into order", "#/rebuild", "soft-mint"],
      ["🎯", "Mixed exam", "Spaced repetition, weakest first", "#/exam", "soft-peach"],
      ["⏱️", "Timed quiz", "20 questions · 10 minutes · 70% to pass", "#/timed", "soft-pink"],
      ["🗣️", "Teach-back", "See it, say it out loud, then check", "#/teach", "soft-lilac"],
      ["🏗️", "Build a workout", "Plan a Block System session", "#/build", "soft-mint"],
    ];
    return `<div class="modegrid">${modes.map(([em, t, d, h, c]) => `<a class="modecard card ${c}" href="${h}"><span class="emoji">${em}</span><b>${t}</b><small>${d}</small></a>`).join("")}</div>`;
  }

  function practiceView() {
    view().innerHTML = `<div class="stack"><h1>🎯 Practice</h1>${modeGrid()}</div>`;
  }

  function blockView(no) {
    const b = BLOCKS[no - 1];
    if (!b) return homeView();
    const exs = filtered().filter((e) => e.blockNo === no);
    const m = blockMastery(no);
    const byApp = APPARATUS.map((a) => [a, exs.filter((e) => e.apparatus === a)]).filter(([, l]) => l.length);
    view().innerHTML = `
      <div class="stack">
        <div class="subhead"><a href="#/" class="backlink">← Mastery map</a></div>
        <div class="card soft-lilac"><h1>${b.emoji} ${b.no}. ${esc(b.name)}</h1>
          <div class="progressbar"><div style="width:${m.pct}%"></div></div>
          <p class="small muted" style="margin-top:6px">${m.done}/${m.total} facts mastered · ${exs.length} exercises</p>
          <div class="row">
            <a class="btn small" href="#/learn?block=${no}">📖 Learn</a>
            <a class="btn small lilac" href="#/recall?block=${no}">🧠 Recall</a>
            <a class="btn small mint" href="#/exam?block=${no}">🎯 Quiz</a>
          </div>
        </div>
        ${byApp
          .map(
            ([a, l]) => `<h3>${esc(a)} <span class="muted small">(${l.length})</span></h3>
          <div class="picklist" style="max-height:none">${l
            .map(
              (e) => `<a class="pickitem" href="#/ex/${esc(e.id)}" style="text-decoration:none">${window.PP_FIG.svg(e)}<span class="grow"><b>${esc(e.label)}</b><br>
                <span class="badge ${esc(e.level)}">${esc(e.level)}</span> ${e.series ? `<span class="small muted">${esc(e.series)}</span>` : ""}</span></a>`
            )
            .join("")}</div>`
          )
          .join("") || `<div class="empty">${BUNNY("oops")}<p>No exercises in this block for your filters. Adjust them in ⚙️ Settings.</p></div>`}
      </div>`;
  }

  function exView(id) {
    const e = BY_ID[id] && ex(id);
    if (!e) return homeView();
    view().innerHTML = `<div class="stack"><div class="subhead"><a href="javascript:history.back()" class="backlink">← Back</a></div>${exerciseCard(e)}</div>`;
    wireCard(view());
  }

  // ---- Learn
  function learnView(params) {
    const blockNo = +params.get("block") || 0;
    const appSel = params.get("app") || "";
    let list = filtered()
      .filter((e) => !blockNo || e.blockNo === blockNo)
      .filter((e) => !appSel || e.apparatus === appSel)
      .sort((a, b) => a.blockNo - b.blockNo || a.apparatus.localeCompare(b.apparatus) || (a.order ?? 99) - (b.order ?? 99));
    let i = Math.min(+params.get("i") || 0, Math.max(0, list.length - 1));
    const apps = uniq(filtered().map((e) => e.apparatus));

    let filtersOpen = false;

    // Learn uses an app-shell layout: the page itself never scrolls, only the card does.
    // That keeps the header and ◀ ▶ in place and stops mobile browsers from collapsing
    // and re-expanding their address bar under the pinned elements.
    function draw() {
      const e = list[i];
      const blockLabel = blockNo ? `${blockEmoji(blockName(blockNo))} ${esc(blockName(blockNo))}` : "All blocks";
      view().innerHTML = `
        <div class="learn-shell">
          <div class="learn-top">
            <div class="row between" style="flex-wrap:nowrap">
              <button class="learn-filterbtn" data-filters aria-expanded="${filtersOpen}">
                <b>📖 ${blockLabel}</b><span class="muted"> · ${esc(appSel || "All apparatus")}</span> <span class="caret">${filtersOpen ? "▴" : "▾"}</span>
              </button>
              <button class="iconbtn ${state.settings.hideDetails ? "on" : ""}" data-hide title="Hide details (tap to reveal)" aria-pressed="${state.settings.hideDetails}">🙈</button>
            </div>
            <div class="learn-filters" ${filtersOpen ? "" : "hidden"}>
              <div class="chips">
                <button class="chip ${!blockNo ? "on" : ""}" data-block="0">All blocks</button>
                ${BLOCKS.map((b) => `<button class="chip ${blockNo === b.no ? "on" : ""}" data-block="${b.no}">${b.emoji} ${b.no}. ${esc(b.name)}</button>`).join("")}
              </div>
              <div class="chips">
                <button class="chip ${!appSel ? "on" : ""}" data-app="">All apparatus</button>
                ${apps.map((a) => `<button class="chip ${appSel === a ? "on" : ""}" data-app="${esc(a)}">${esc(a)}</button>`).join("")}
              </div>
            </div>
          </div>
          <div class="learn-scroll" id="cardhost">
            ${e ? exerciseCard(e, { hide: state.settings.hideDetails }) : `<div class="empty">${BUNNY("oops")}<p>No exercises match. Try another block or adjust ⚙️ Settings filters.</p></div>`}
          </div>
          ${
            e
              ? `<div class="learnnav">
                   <button class="btn secondary" data-prev ${i === 0 ? "disabled" : ""} aria-label="Previous">◀</button>
                   <span class="muted small center">${i + 1} / ${list.length}<br>${blockEmoji(e.block)} ${esc(e.block)}</span>
                   <button class="btn" data-next ${i >= list.length - 1 ? "disabled" : ""} aria-label="Next">▶</button>
                 </div>`
              : ""
          }
        </div>`;
      const v = view();
      wireCard(v);
      v.querySelector("[data-filters]").onclick = () => {
        filtersOpen = !filtersOpen;
        draw();
      };
      v.querySelectorAll("[data-block]").forEach((b) => (b.onclick = () => go(`#/learn?block=${b.dataset.block}${appSel ? `&app=${encodeURIComponent(appSel)}` : ""}`)));
      v.querySelectorAll("[data-app]").forEach((b) => (b.onclick = () => go(`#/learn?block=${blockNo}&app=${encodeURIComponent(b.dataset.app)}`)));
      v.querySelector("[data-hide]").onclick = () => {
        state.settings.hideDetails = !state.settings.hideDetails;
        save();
        draw();
      };
      const prev = v.querySelector("[data-prev]");
      const next = v.querySelector("[data-next]");
      if (prev) prev.onclick = () => move(-1);
      if (next) next.onclick = () => move(1);
      swipe(v.querySelector("#cardhost"), (dir) => move(dir));
    }
    function move(d) {
      const n = i + d;
      if (n < 0 || n >= list.length) return;
      i = n;
      history.replaceState(null, "", `#/learn?block=${blockNo}${appSel ? `&app=${encodeURIComponent(appSel)}` : ""}&i=${i}`);
      draw();
    }
    draw();
  }

  function swipe(el, cb) {
    let x0 = null;
    let y0 = null;
    el.addEventListener("touchstart", (e) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) cb(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  // ---- Recall: walk through one block, every field of every exercise
  function recallView(params) {
    const blockNo = +params.get("block") || 0;
    if (!blockNo) {
      view().innerHTML = `<div class="stack"><h1>🧠 Recall</h1><p>Pick a block. We'll go exercise by exercise and you fill in each detail.</p>
        <div class="blockpick">${BLOCKS.map((b) => {
          const n = items(filtered().filter((e) => e.blockNo === b.no), { includeExamOnly: false }).length;
          return `<button data-b="${b.no}" ${n ? "" : "disabled"}>${b.emoji} ${b.no}. ${esc(b.name)}<br><span class="muted">${n} facts</span></button>`;
        }).join("")}</div></div>`;
      view().querySelectorAll("[data-b]").forEach((b) => (b.onclick = () => go(`#/recall?block=${b.dataset.b}`)));
      return;
    }
    const exs = filtered()
      .filter((e) => e.blockNo === blockNo)
      .sort((a, b) => a.apparatus.localeCompare(b.apparatus) || (a.order ?? 99) - (b.order ?? 99));
    const queue = items(exs, { includeExamOnly: false });
    let k = 0;
    let right = 0;
    function draw() {
      if (k >= queue.length) {
        const pct = queue.length ? Math.round((right / queue.length) * 100) : 0;
        if (pct >= 80) confetti();
        view().innerHTML = `<div class="stack center"><div class="empty">${BUNNY(pct >= 80 ? "cheer" : "happy")}</div>
          <h1>${blockEmoji(blockName(blockNo))} ${esc(blockName(blockNo))} done!</h1><p>${right} / ${queue.length} correct (${pct}%)</p>
          <div class="row" style="justify-content:center"><a class="btn" href="#/recall?block=${blockNo}&r=${Date.now()}">Again 🔁</a><a class="btn secondary" href="#/recall">Other block</a></div></div>`;
        return;
      }
      const it = queue[k];
      const e = ex(it.id);
      const qn = makeQuestion(e, it.f);
      if (!qn) {
        k++;
        return draw();
      }
      view().innerHTML = `<div class="stack"><div class="subhead"><div class="row between"><a href="#/recall" class="backlink">← Blocks</a><span class="small muted">${k + 1} / ${queue.length}</span></div>
        <div class="progressbar"><div style="width:${(k / queue.length) * 100}%"></div></div></div><div id="q"></div></div>`;
      renderQuestion($("#q"), e, qn, {
        header: `${blockEmoji(e.block)} ${esc(FIELDS[it.f].short)}`,
        onAnswer: (ok) => {
          record(it.key, ok);
          if (ok) right++;
        },
        onNext: () => {
          k++;
          draw();
        },
      });
    }
    draw();
  }

  // ---- Mixed exam (spaced repetition)
  function examView(params) {
    const blockNo = +params.get("block") || 0;
    const pool = items(filtered().filter((e) => !blockNo || e.blockNo === blockNo));
    if (!pool.length) {
      view().innerHTML = `<div class="empty">${BUNNY("oops")}<p>Nothing to quiz with the current filters and fields. Check ⚙️ Settings.</p></div>`;
      return;
    }
    const recent = [];
    let n = 0;
    let right = 0;
    function draw() {
      let it;
      let qn;
      for (let tries = 0; tries < 20 && !qn; tries++) {
        it = nextItem(pool, recent);
        qn = makeQuestion(ex(it.id), it.f);
      }
      recent.push(it.key);
      if (recent.length > 8) recent.shift();
      view().innerHTML = `<div class="stack">
        <div class="subhead"><div class="row between" style="flex-wrap:nowrap"><h2>🎯 Mixed exam${blockNo ? ` · ${blockEmoji(blockName(blockNo))} ${esc(blockName(blockNo))}` : ""}</h2>
        <button class="btn secondary small" data-end>Finish</button></div>
        <p class="small muted">${n} answered · ${right} correct${n ? ` (${Math.round((right / n) * 100)}%)` : ""}</p></div>
        <div id="q"></div></div>`;
      view().querySelector("[data-end]").onclick = finish;
      renderQuestion($("#q"), ex(it.id), qn, {
        header: `${blockEmoji(ex(it.id).block)} ${esc(FIELDS[it.f].short)}`,
        onAnswer: (ok) => {
          record(it.key, ok);
          n++;
          if (ok) right++;
        },
        onNext: draw,
      });
    }
    function finish() {
      const pct = n ? Math.round((right / n) * 100) : 0;
      if (n >= 10 && pct >= 80) confetti();
      view().innerHTML = `<div class="stack center"><div class="empty">${BUNNY(pct >= 70 ? "cheer" : "happy")}</div>
        <h1>Session done!</h1><p>${right} / ${n} correct${n ? ` (${pct}%)` : ""}</p>
        <div class="row" style="justify-content:center"><a class="btn" href="#/exam?block=${blockNo}&r=${Date.now()}">Keep going 🔁</a><a class="btn secondary" href="#/">Home</a></div></div>`;
    }
    draw();
  }

  // ---- Timed quick quiz: 20 questions, 10 minutes
  const TIMED_Q = 20;
  const TIMED_MS = 10 * 60 * 1000;
  let timedTimer;
  function timedView(params) {
    clearInterval(timedTimer);
    if (!params.get("go")) {
      view().innerHTML = `<div class="stack center"><div class="empty">${BUNNY()}</div><h1>⏱️ Timed quiz</h1>
        <p>${TIMED_Q} questions from your whole set, ${TIMED_MS / 60000} minutes. 70% to pass — just like the BASI written exams.</p>
        <a class="btn" href="#/timed?go=${Date.now()}">Start ▶</a></div>`;
      return;
    }
    const pool = shuffle(items(filtered()));
    const qs = [];
    for (const it of pool) {
      if (qs.length >= TIMED_Q) break;
      if (qs.some((q) => q.it.id === it.id)) continue;
      const qn = makeQuestion(ex(it.id), it.f);
      if (qn) qs.push({ it, qn });
    }
    if (!qs.length) {
      view().innerHTML = `<div class="empty">${BUNNY("oops")}<p>Nothing to quiz with the current filters.</p></div>`;
      return;
    }
    const endAt = Date.now() + TIMED_MS;
    const results = [];
    let k = 0;
    const tick = () => {
      const left = Math.max(0, endAt - Date.now());
      const t = $("#timer");
      if (t) {
        t.textContent = `${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, "0")}`;
        t.classList.toggle("low", left < 60000);
      }
      if (!left) finish();
    };
    timedTimer = setInterval(tick, 500);
    function draw() {
      if (k >= qs.length) return finish();
      const { it, qn } = qs[k];
      view().innerHTML = `<div class="stack"><div class="subhead"><div class="row between"><h2>⏱️ ${k + 1} / ${qs.length}</h2><span class="timer" id="timer"></span></div>
        <div class="progressbar"><div style="width:${(k / qs.length) * 100}%"></div></div></div><div id="q"></div></div>`;
      tick();
      renderQuestion($("#q"), ex(it.id), qn, {
        header: esc(FIELDS[it.f].short),
        onAnswer: (ok) => {
          record(it.key, ok);
          results.push({ it, qn, ok });
        },
        onNext: () => {
          k++;
          draw();
        },
        nextLabel: k === qs.length - 1 ? "See results 🏁" : "Next ➜",
      });
    }
    function finish() {
      clearInterval(timedTimer);
      const right = results.filter((r) => r.ok).length;
      const pct = Math.round((right / qs.length) * 100);
      const pass = pct >= 70;
      if (pass) confetti();
      const missed = results.filter((r) => !r.ok);
      view().innerHTML = `<div class="stack">
        <div class="card ${pass ? "soft-mint" : "soft-peach"} center"><div class="empty" style="padding:0">${BUNNY(pass ? "cheer" : "oops")}</div>
          <h1>${pass ? "PASS 🎉" : "Not yet 💪"}</h1><p><b>${pct}%</b> · ${right} / ${qs.length} correct${results.length < qs.length ? ` · ${qs.length - results.length} unanswered` : ""}</p>
          <a class="btn" href="#/timed?go=${Date.now()}">Try again 🔁</a></div>
        ${missed.length ? `<h2>Review your misses</h2>${missed.map((r) => `<div class="card"><p>${r.qn.prompt}</p><div class="explain">✅ ${esc(r.qn.options[r.qn.answer])}</div></div>`).join("")}` : ""}
      </div>`;
    }
    draw();
  }

  // ---- Rebuild order
  function rebuildView(params) {
    const game = params.get("game");
    if (game === "blocks") return rebuildBlocks();
    if (game === "series") return rebuildSeries(params.get("app"), params.get("series"));
    if (game === "sort") return blockSort();
    const series = seriesList();
    view().innerHTML = `<div class="stack"><h1>🧩 Rebuild order</h1>
      <a class="card soft-pink modecard" href="#/rebuild?game=blocks"><span class="emoji">🔢</span><b>The 12 blocks</b><small>Drag the Block System into order</small></a>
      <a class="card soft-mint modecard" href="#/rebuild?game=sort"><span class="emoji">🗂️</span><b>Block sort</b><small>Tap the right block for each exercise</small></a>
      <h2>Series order</h2><p class="small muted">Only series whose order is confirmed by a source.</p>
      <div class="picklist" style="max-height:none">${series
        .map(
          (s) => `<a class="pickitem" style="text-decoration:none" href="#/rebuild?game=series&app=${encodeURIComponent(s.app)}&series=${encodeURIComponent(s.series)}">
            <span class="badge app">${esc(s.app)}</span><span class="grow"><b>${esc(s.series)}</b><br><span class="small muted">${s.n} exercises · ${blockEmoji(s.block)} ${esc(s.block)}</span></span>
            <span class="small">${state.srs[`series:${s.app}:${s.series}`]?.b >= MASTERED_BOX ? "⭐" : ""}</span></a>`
        )
        .join("")}</div></div>`;
  }

  function seriesList() {
    const map = new Map();
    for (const e of filtered()) {
      if (!e.series || e.conf.series !== "c" || e.seriesOrder == null) continue;
      const k = `${e.apparatus}|${e.series}`;
      if (!map.has(k)) map.set(k, { app: e.apparatus, series: e.series, block: e.block, n: 0 });
      map.get(k).n++;
    }
    return [...map.values()].filter((s) => s.n >= 3).sort((a, b) => a.app.localeCompare(b.app) || a.series.localeCompare(b.series));
  }

  function sortGame({ title, back, entries, srsKey }) {
    // entries: [{key, text}] in the correct order.
    let order = shuffle(entries);
    while (entries.length > 1 && order.every((x, i) => x.key === entries[i].key)) order = shuffle(entries);
    view().innerHTML = `<div class="stack"><div class="subhead"><a class="backlink" href="${back}">← Back</a></div><h1>${title}</h1>
      <p class="small muted">Drag ⠿ (or use ▲▼) into the right order, then check.</p>
      <ul class="sortlist" id="sl">${order.map((x) => sortItem(x.key, esc(x.text))).join("")}</ul>
      <div class="row"><button class="btn" data-check>Check ✔</button><button class="btn secondary" data-reveal-order>Show answer</button></div></div>`;
    const list = $("#sl");
    [...list.children].forEach((li, i) => (li.querySelector(".idx").textContent = i + 1));
    makeSortable(list);
    let attempts = 0;
    view().querySelector("[data-check]").onclick = () => {
      attempts++;
      const keys = [...list.children].map((li) => li.dataset.key);
      let good = 0;
      [...list.children].forEach((li, i) => {
        const ok = li.dataset.key === entries[i].key;
        li.classList.toggle("correct", ok);
        li.classList.toggle("wrong", !ok);
        if (ok) good++;
      });
      const all = good === entries.length;
      sound(all);
      if (all) {
        confetti();
        say(attempts === 1 ? "First try! 🌟" : "All in order! 🎉", "cheer", 2200);
        if (srsKey) record(srsKey, attempts === 1);
      } else {
        say(`${good} / ${entries.length} in place — keep going!`, "oops", 2000);
        if (srsKey && attempts === 1) record(srsKey, false);
      }
      return keys;
    };
    view().querySelector("[data-reveal-order]").onclick = () => {
      list.innerHTML = entries.map((x) => sortItem(x.key, esc(x.text))).join("");
      [...list.children].forEach((li, i) => {
        li.querySelector(".idx").textContent = i + 1;
        li.classList.add("correct");
      });
    };
  }

  function rebuildBlocks() {
    sortGame({
      title: "🔢 The 12 blocks",
      back: "#/rebuild",
      entries: BLOCKS.map((b) => ({ key: String(b.no), text: `${b.emoji} ${b.name}` })),
      srsKey: "game|blocks",
    });
  }

  function rebuildSeries(app, series) {
    const members = filtered()
      .filter((e) => e.apparatus === app && e.series === series && e.seriesOrder != null)
      .sort((a, b) => a.seriesOrder - b.seriesOrder);
    if (members.length < 2) return rebuildView(new URLSearchParams());
    sortGame({
      title: `${esc(series)} <span class="badge app">${esc(app)}</span>`,
      back: "#/rebuild",
      entries: members.map((e) => ({ key: e.id, text: e.label })),
      srsKey: `series:${app}:${series}`,
    });
  }

  function blockSort() {
    const pool = shuffle(filtered().filter((e) => e.conf.block === "c")).slice(0, 8);
    let k = 0;
    let right = 0;
    function draw() {
      if (k >= pool.length) {
        if (right >= 7) confetti();
        view().innerHTML = `<div class="stack center"><div class="empty">${BUNNY(right >= 6 ? "cheer" : "happy")}</div><h1>${right} / ${pool.length} sorted!</h1>
          <div class="row" style="justify-content:center"><a class="btn" href="#/rebuild?game=sort&r=${Date.now()}">Again 🔁</a><a class="btn secondary" href="#/rebuild">Back</a></div></div>`;
        return;
      }
      const e = pool[k];
      view().innerHTML = `<div class="stack"><div class="subhead"><div class="row between"><a class="backlink" href="#/rebuild">← Back</a><span class="small muted">${k + 1} / ${pool.length}</span></div></div>
        <div class="card qcard">${window.PP_FIG.svg(e)}<div class="prompt">${esc(e.label)} <span class="badge app">${esc(e.apparatus)}</span> → which block?</div>
        <div class="blockpick">${BLOCKS.map((b) => `<button data-b="${b.no}">${b.emoji}<br>${esc(b.name)}</button>`).join("")}</div><div class="after"></div></div></div>`;
      view().querySelectorAll("[data-b]").forEach(
        (btn) =>
          (btn.onclick = () => {
            const ok = +btn.dataset.b === e.blockNo;
            view().querySelectorAll("[data-b]").forEach((b) => (b.disabled = true));
            view().querySelector(`[data-b="${e.blockNo}"]`).classList.add("correct");
            if (!ok) btn.classList.add("wrong");
            sound(ok);
            ok ? say(pick(CHEERS), "cheer", 1000) : say(`It's ${e.block}`, "oops", 1500);
            if (ok) right++;
            record(`${e.id}|block`, ok);
            view().querySelector(".after").innerHTML = `<button class="btn block" style="margin-top:12px">Next ➜</button>`;
            view().querySelector(".after button").onclick = () => {
              k++;
              draw();
            };
          })
      );
    }
    draw();
  }

  // ---- Teach-back
  const TEACH_CHECKLIST = ["Name", "Block", "Springs", "Setup / starting position", "Breathing", "Repetitions", "Muscle focus & objectives", "A key cue"];

  function teachView(params) {
    const wid = params.get("workout");
    const blockNo = +params.get("block") || 0;
    let list;
    let title = "🗣️ Teach-back";
    if (wid) {
      const w = state.workouts.find((x) => x.id === wid);
      if (!w) return go("#/teach");
      list = w.items.map((id) => ex(id)).filter(Boolean);
      title += ` · ${esc(w.name)}`;
    } else if (params.get("go")) {
      list = shuffle(filtered().filter((e) => !blockNo || e.blockNo === blockNo)).slice(0, 15);
    } else {
      view().innerHTML = `<div class="stack"><h1>${title}</h1>
        <p>You see the picture (or name). Say out loud — like teaching a client — everything you know. Then reveal and grade yourself honestly.</p>
        <a class="btn block" href="#/teach?go=1">🎲 Random 15 from my set</a>
        <div class="blockpick">${BLOCKS.map((b) => `<button data-b="${b.no}">${b.emoji} ${b.no}. ${esc(b.name)}</button>`).join("")}</div>
        ${state.workouts.length ? `<h2>Your workouts</h2>${state.workouts.map((w) => `<a class="btn secondary block" href="#/teach?workout=${w.id}">🏗️ ${esc(w.name)} (${w.items.length})</a>`).join("")}` : ""}
      </div>`;
      view().querySelectorAll("[data-b]").forEach((b) => (b.onclick = () => go(`#/teach?go=1&block=${b.dataset.b}`)));
      return;
    }
    let k = 0;
    const grades = [];
    function draw() {
      if (k >= list.length) {
        const score = grades.reduce((a, b) => a + b, 0) / (grades.length || 1);
        if (score >= 0.8) confetti();
        view().innerHTML = `<div class="stack center"><div class="empty">${BUNNY(score >= 0.6 ? "cheer" : "happy")}</div><h1>Class taught! 👏</h1>
          <p>${grades.filter((g) => g === 1).length} nailed · ${grades.filter((g) => g === 0.5).length} almost · ${grades.filter((g) => g === 0).length} missed</p>
          <a class="btn" href="#/teach">Back to Teach-back</a></div>`;
        return;
      }
      const e = list[k];
      const posed = window.PP_FIG.hasPose(e.id);
      view().innerHTML = `<div class="stack"><div class="subhead"><div class="row between"><a class="backlink" href="#/teach">← Teach-back</a><span class="small muted">${k + 1} / ${list.length}</span></div><h2>${title}</h2></div>
        <div class="card qcard">
          ${window.PP_FIG.svg(e)}
          <div class="prompt">${posed && !wid ? "Which exercise is this? Teach it! 🗣️" : `Teach: <b>${esc(e.label)}</b> <span class="badge app">${esc(e.apparatus)}</span>`}</div>
          <div class="chips">${TEACH_CHECKLIST.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
          <button class="btn block lilac" style="margin-top:12px" data-show>Reveal 👀</button>
        </div><div id="rev"></div></div>`;
      view().querySelector("[data-show]").onclick = () => {
        view().querySelector("[data-show]").remove();
        const rev = $("#rev");
        rev.innerHTML = exerciseCard(e) + `<div class="row" style="justify-content:center;margin-top:12px">
          <button class="btn mint" data-g="1">🌟 Nailed it</button><button class="btn lilac" data-g="0.5">🙂 Almost</button><button class="btn" data-g="0">😅 Missed</button></div>`;
        wireCard(rev);
        rev.querySelectorAll("[data-g]").forEach(
          (b) =>
            (b.onclick = () => {
              const g = +b.dataset.g;
              grades.push(g);
              record(`${e.id}|teach`, g === 1);
              k++;
              draw();
              view().scrollTo({ top: 0 });
            })
        );
        rev.scrollIntoView({ behavior: "smooth" });
      };
    }
    draw();
  }

  // ---- Build a workout
  // Rough minutes per exercise and per transition, used only for the 60-minute estimate.
  const MIN_PER_EXERCISE = 2.5;
  const MIN_PER_APPARATUS_CHANGE = 1.5;
  const MIN_PER_SPRING_CHANGE = 0.3;

  let draft = null;
  const newDraft = () => ({ id: "w" + Date.now(), name: "My session", level: "Intermediate", items: [] });

  function analyze(w) {
    const exs = w.items.map((id) => ex(id)).filter(Boolean);
    const missing = BLOCKS.filter((b) => !exs.some((e) => e.blockNo === b.no));
    const tooHard = exs.filter((e) => (LEVEL_RANK[e.level] || 0) > LEVEL_RANK[w.level]);
    let appChanges = 0;
    let springChanges = 0;
    const springChangeAt = [];
    for (let i = 1; i < exs.length; i++) {
      if (exs[i].apparatus !== exs[i - 1].apparatus) appChanges++;
      else if (exs[i].springs && exs[i - 1].springs && exs[i].springs !== exs[i - 1].springs) {
        springChanges++;
        springChangeAt.push(exs[i].id);
      }
    }
    const minutes = exs.length * MIN_PER_EXERCISE + appChanges * MIN_PER_APPARATUS_CHANGE + springChanges * MIN_PER_SPRING_CHANGE;
    return { exs, missing, tooHard, appChanges, springChanges, springChangeAt, minutes: Math.round(minutes) };
  }

  // Suggest a session: per block, 1–2 exercises at or below the client level,
  // preferring to stay on the previous apparatus to keep transitions smooth.
  function suggest(level, apparatus) {
    const ok = allExercises().filter((e) => (LEVEL_RANK[e.level] || 9) <= LEVEL_RANK[level] && apparatus.includes(e.apparatus));
    const out = [];
    let lastApp = null;
    for (const b of BLOCKS) {
      const cands = ok.filter((e) => e.blockNo === b.no);
      if (!cands.length) continue;
      const sameApp = cands.filter((e) => e.apparatus === lastApp);
      const want = b.name === "Warm-up" || b.name === "Stretches" ? 1 : 2;
      const first = pick(sameApp.length && Math.random() < 0.7 ? sameApp : cands);
      out.push(first.id);
      lastApp = first.apparatus;
      if (want > 1) {
        const more = cands.filter((e) => e.apparatus === lastApp && e.id !== first.id);
        if (more.length) out.push(pick(more).id);
      }
    }
    return out;
  }

  function buildView(params) {
    const wid = params.get("w");
    if (wid) {
      const w = state.workouts.find((x) => x.id === wid);
      draft = w ? JSON.parse(JSON.stringify(w)) : draft;
    }
    if (!draft || params.get("new")) draft = newDraft();
    drawBuilder();
  }

  function drawBuilder() {
    const w = draft;
    const a = analyze(w);
    const appsInSet = uniq(filtered().map((e) => e.apparatus));
    const check = (ok, text) => `<li>${ok ? "✅" : "⚠️"} ${text}</li>`;
    view().innerHTML = `
      <div class="stack">
        <h1>🏗️ Build a workout</h1>
        <div class="card">
          <label class="fld">Name<input type="text" id="wname" value="${esc(w.name)}"></label>
          <label class="fld">Client level<select id="wlevel">${["Fundamental", "Intermediate", "Advanced"].map((l) => `<option ${l === w.level ? "selected" : ""}>${l}</option>`).join("")}</select></label>
          <div class="row" style="margin-top:12px">
            <button class="btn small lilac" data-suggest>🎲 Suggest a session</button>
            <button class="btn small" data-save>💾 Save</button>
            <button class="btn small secondary" data-new>✨ New</button>
          </div>
        </div>
        <div class="card soft-lilac">
          <h3>Checks</h3>
          <ul class="checks">
            ${check(!a.missing.length, a.missing.length ? `Missing blocks: ${a.missing.map((b) => `${b.emoji} ${esc(b.name)}`).join(", ")}` : "All 12 blocks covered, in Block System order")}
            ${check(!a.tooHard.length, a.tooHard.length ? `Above ${w.level} level: ${a.tooHard.map((e) => esc(e.label)).join(", ")}` : `Everything fits ${/^[AEIOU]/.test(w.level) ? "an" : "a"} ${w.level} client`)}
            ${check(a.appChanges <= 6, `${a.appChanges} apparatus change${a.appChanges === 1 ? "" : "s"}${a.appChanges > 6 ? " — group exercises by apparatus within blocks for smoother flow" : ""}`)}
            ${check(a.springChanges <= 8, `${a.springChanges} spring change${a.springChanges === 1 ? "" : "s"} on the same apparatus${a.springChanges > 8 ? " — try ordering by spring load (heavy → light)" : ""}`)}
            ${check(a.minutes >= 50 && a.minutes <= 65, `≈ ${a.minutes} min of a 60-minute session${a.minutes < 50 ? " — add exercises" : a.minutes > 65 ? " — too long, trim some" : ""}`)}
          </ul>
        </div>
        ${BLOCKS.map((b) => {
          const mine = a.exs.filter((e) => e.blockNo === b.no);
          return `<div class="wblock ${mine.length ? "" : "missing"}">
            <div class="row between"><h3>${b.emoji} ${b.no}. ${esc(b.name)}</h3><button class="btn small secondary" data-add="${b.no}">+ Add</button></div>
            ${mine
              .map(
                (e) => `<div class="witem">${window.PP_FIG.svg(e)}<div class="info"><b>${esc(e.label)}</b>
                  <span class="badge app">${esc(e.apparatus)}</span> <span class="badge ${esc(e.level)}">${esc(e.level)}</span>
                  ${e.springs ? `<span class="small muted">· ${esc(e.springs)}${a.springChangeAt.includes(e.id) ? " 🔁" : ""}</span>` : ""}</div>
                  <button class="iconbtn" data-up="${esc(e.id)}">▲</button><button class="iconbtn" data-del="${esc(e.id)}">✕</button></div>`
              )
              .join("")}
          </div>`;
        }).join("")}
        ${state.workouts.length ? `<h2>Saved workouts</h2>${state.workouts.map((x) => `<div class="row witem"><span class="grow"><b>${esc(x.name)}</b> <span class="small muted">${x.items.length} exercises · ${x.level}</span></span>
            <a class="btn small secondary" href="#/build?w=${x.id}">Open</a><a class="btn small lilac" href="#/teach?workout=${x.id}">🗣️</a><button class="iconbtn" data-delw="${x.id}">🗑️</button></div>`).join("")}` : ""}
      </div>`;
    const v = view();
    v.querySelector("#wname").oninput = (ev) => (w.name = ev.target.value);
    v.querySelector("#wlevel").onchange = (ev) => {
      w.level = ev.target.value;
      drawBuilder();
    };
    v.querySelector("[data-suggest]").onclick = () => {
      w.items = suggest(w.level, appsInSet);
      say("Here's a session idea! Tweak it 🌷");
      drawBuilder();
    };
    v.querySelector("[data-new]").onclick = () => go(`#/build?new=${Date.now()}`);
    v.querySelector("[data-save]").onclick = () => {
      const i = state.workouts.findIndex((x) => x.id === w.id);
      const copy = JSON.parse(JSON.stringify(w));
      if (i >= 0) state.workouts[i] = copy;
      else state.workouts.push(copy);
      save();
      say("Workout saved! 💾", "cheer");
      drawBuilder();
    };
    v.querySelectorAll("[data-add]").forEach((b) => (b.onclick = () => openPicker(+b.dataset.add)));
    v.querySelectorAll("[data-del]").forEach(
      (b) =>
        (b.onclick = () => {
          w.items = w.items.filter((id) => id !== b.dataset.del);
          drawBuilder();
        })
    );
    v.querySelectorAll("[data-up]").forEach(
      (b) =>
        (b.onclick = () => {
          const i = w.items.indexOf(b.dataset.up);
          const e = ex(b.dataset.up);
          // Move up only within the same block so Block System order is kept.
          let j = i - 1;
          while (j >= 0 && ex(w.items[j]).blockNo !== e.blockNo) j--;
          if (j >= 0) [w.items[i], w.items[j]] = [w.items[j], w.items[i]];
          drawBuilder();
        })
    );
    v.querySelectorAll("[data-delw]").forEach(
      (b) =>
        (b.onclick = () => {
          if (!confirm("Delete this workout?")) return;
          state.workouts = state.workouts.filter((x) => x.id !== b.dataset.delw);
          save();
          drawBuilder();
        })
    );
  }

  function openPicker(blockNo) {
    const b = BLOCKS[blockNo - 1];
    let appSel = "";
    const all = allExercises().filter((e) => e.blockNo === blockNo && state.settings.apparatus.includes(e.apparatus));
    const apps = uniq(all.map((e) => e.apparatus));
    function draw(s) {
      const list = all.filter((e) => !appSel || e.apparatus === appSel).sort((x, y) => (LEVEL_RANK[x.level] || 9) - (LEVEL_RANK[y.level] || 9));
      s.innerHTML = `<div class="row between"><h2>${b.emoji} ${esc(b.name)}</h2><button class="iconbtn" data-close>✕</button></div>
        <div class="chips" style="margin-bottom:8px"><button class="chip ${!appSel ? "on" : ""}" data-app="">All</button>${apps.map((a) => `<button class="chip ${appSel === a ? "on" : ""}" data-app="${esc(a)}">${esc(a)}</button>`).join("")}</div>
        <div class="picklist">${list
          .map(
            (e) => `<button class="pickitem" data-pick="${esc(e.id)}" ${draft.items.includes(e.id) ? "disabled" : ""}>${window.PP_FIG.svg(e)}
              <span class="grow"><b>${esc(e.label)}</b><br><span class="badge app">${esc(e.apparatus)}</span> <span class="badge ${esc(e.level)}">${esc(e.level)}</span>
              ${e.springs ? `<span class="small muted">${esc(e.springs)}</span>` : ""}</span></button>`
          )
          .join("")}</div>`;
      s.querySelector("[data-close]").onclick = closeSheet;
      s.querySelectorAll("[data-app]").forEach(
        (c) =>
          (c.onclick = () => {
            appSel = c.dataset.app;
            draw(s);
          })
      );
      s.querySelectorAll("[data-pick]").forEach(
        (p) =>
          (p.onclick = () => {
            // Insert after the last exercise of this block (or the nearest earlier block) to keep block order.
            const id = p.dataset.pick;
            let at = draft.items.length;
            for (let i = 0; i < draft.items.length; i++) {
              if (ex(draft.items[i]).blockNo > blockNo) {
                at = i;
                break;
              }
            }
            draft.items.splice(at, 0, id);
            closeSheet();
            drawBuilder();
          })
      );
    }
    openSheet("", draw);
  }

  // ---- Settings
  function settingsView() {
    const s = state.settings;
    const nOverrides = Object.keys(state.overrides).length;
    view().innerHTML = `
      <div class="stack">
        <h1>⚙️ Settings</h1>
        <div class="card">
          <h3>Apparatus in my practice set</h3>
          <div class="chips">${APPARATUS.map((a) => `<button class="chip ${s.apparatus.includes(a) ? "on" : ""}" data-app="${esc(a)}">${esc(a)}</button>`).join("")}</div>
          <h3 style="margin-top:12px">Levels</h3>
          <div class="chips">${Object.keys(LEVEL_RANK).map((l) => `<button class="chip ${s.levels.includes(l) ? "on" : ""}" data-level="${l}">${l}</button>`).join("")}</div>
          <p class="small muted" style="margin-top:8px">${filtered().length} exercises in your set.</p>
        </div>
        <div class="card">
          <h3>Quizzed fields</h3>
          <p class="small muted">Only values confirmed by a source (or verified by you ✏️) are ever quizzed. Muscle focus & objectives appear in the mixed and timed exam only.</p>
          ${Object.entries(FIELDS).map(([k, f]) => `<label class="toggle"><span>${f.label}${f.examOnly ? ' <span class="small muted">(exam only)</span>' : ""}</span><input type="checkbox" data-field="${k}" ${s.fields[k] ? "checked" : ""}></label>`).join("")}
          <label class="toggle"><span>🔊 Sounds</span><input type="checkbox" id="snd" ${s.sound ? "checked" : ""}></label>
        </div>
        <div class="card">
          <h3>My corrections</h3>
          <p class="small">${nOverrides} exercise${nOverrides === 1 ? "" : "s"} corrected on this device.</p>
          <div class="row">
            <button class="btn small" data-export>⬇️ Export corrections</button>
            <label class="btn small secondary">⬆️ Import<input type="file" accept="application/json" id="imp" hidden></label>
          </div>
          <p class="small muted" style="margin-top:8px">Merge exported corrections into the data file with <code>python3 tools/build_data.py --overrides corrections.json</code>.</p>
        </div>
        <div class="card">
          <h3>About the data</h3>
          <p class="small">The exercise list was compiled from public BASI student study decks and is <b>not</b> official BASI material. Values marked ❓ are unverified and never quizzed — check them against your manual and fix with ✏️. Block order used: ${BLOCKS.map((b) => b.name).join(" → ")}.</p>
          <button class="btn small secondary" data-reset>Reset all progress</button>
        </div>
      </div>`;
    const v = view();
    v.querySelectorAll("[data-app]").forEach(
      (b) =>
        (b.onclick = () => {
          const a = b.dataset.app;
          s.apparatus = s.apparatus.includes(a) ? s.apparatus.filter((x) => x !== a) : [...s.apparatus, a];
          save();
          settingsView();
        })
    );
    v.querySelectorAll("[data-level]").forEach(
      (b) =>
        (b.onclick = () => {
          const l = b.dataset.level;
          s.levels = s.levels.includes(l) ? s.levels.filter((x) => x !== l) : [...s.levels, l];
          save();
          settingsView();
        })
    );
    v.querySelectorAll("[data-field]").forEach(
      (c) =>
        (c.onchange = () => {
          s.fields[c.dataset.field] = c.checked;
          save();
        })
    );
    v.querySelector("#snd").onchange = (ev) => {
      s.sound = ev.target.checked;
      save();
      sound(true);
    };
    v.querySelector("[data-export]").onclick = () => {
      const blob = new Blob([JSON.stringify(state.overrides, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `bunny-pilates-corrections-${today()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    };
    v.querySelector("#imp").onchange = async (ev) => {
      const file = ev.target.files[0];
      if (!file) return;
      try {
        const o = JSON.parse(await file.text());
        state.overrides = { ...state.overrides, ...o };
        save();
        say("Corrections imported! 💕", "cheer");
        settingsView();
      } catch {
        say("That file didn't look right 😅", "oops");
      }
    };
    v.querySelector("[data-reset]").onclick = () => {
      if (!confirm("Reset all progress (corrections and workouts are kept)?")) return;
      state.srs = {};
      state.mastered = {};
      state.streak = { last: null, count: 0 };
      save();
      renderStreak();
      say("Fresh start! 🌱");
    };
  }

  // ---------------------------------------------------------------- router
  function go(hash) {
    location.hash = hash;
  }

  function route() {
    clearInterval(timedTimer);
    closeSheet();
    const [path, qs] = location.hash.replace(/^#/, "").split("?");
    const params = new URLSearchParams(qs || "");
    const parts = (path || "/").split("/").filter(Boolean);
    const name = parts[0] || "home";
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const nav = a.dataset.nav;
      const practice = ["practice", "recall", "rebuild", "exam", "timed", "teach"];
      a.classList.toggle("active", nav === name || (nav === "practice" && practice.includes(name)) || (nav === "home" && ["block", "ex"].includes(name)));
    });
    const views = {
      home: homeView,
      block: () => blockView(+parts[1]),
      ex: () => exView(decodeURIComponent(parts[1] || "")),
      learn: () => learnView(params),
      practice: practiceView,
      recall: () => recallView(params),
      rebuild: () => rebuildView(params),
      exam: () => examView(params),
      timed: () => timedView(params),
      teach: () => teachView(params),
      build: () => buildView(params),
      settings: settingsView,
    };
    document.body.classList.toggle("shell-mode", name === "learn");
    (views[name] || homeView)();
    view().scrollTo({ top: 0 });
  }

  $("#brand-bunny").innerHTML = BUNNY("happy");
  $("#sheet-backdrop").addEventListener("click", closeSheet);
  addEventListener("hashchange", route);
  renderStreak();
  route();
})();
