# BASI Comprehensive repertoire: initial dataset notes

Companion to `exercises-draft.json` (315 exercises). This is a first draft built from public study material. It still needs checking against the BASI manuals.

## How much of this can realistically be found online

- **Exercise names, block, and level: most of them, for the core apparatus.** Students post their BASI flashcard decks publicly. Several of these decks copy the BASI manual almost word for word, including the *Set Up / Resistance / Inhale–Exhale / MUSCLE FOCUS / OBJECTIVES / CUES* layout and manual page references. The Reformer, Cadillac, Wunda Chair and Mat are well covered at the Fundamental and Intermediate levels and partly at Advanced.
- **Setup, breathing, and muscle focus/objectives: good coverage** (about 85–90% of records), for the same reason.
- **Springs: partial.** The BASI manuals give resistance in words ("light to medium", "all springs"), not colours. The colour and number settings online are mostly guesses that students wrote in their decks ("1 yellow?"). One paywalled exam dump (Docsity) gives BASI-style codes (`R`, `RB`, `RY`) for about 20 Reformer exercises, and only its search-engine snippets were readable. For Wunda Chair, the exam decks give settings written as `x/y` (for example `2/3`, `0/3`, `1 on 2`). I did not find a definition of that notation (it looks like spring position plus count). For Cadillac, there are a few settings like `2Y Short w Handles` and `1 green`.
- **Repetitions: rarely findable** (28 of 315). The BASI manual excerpts students transcribe usually leave reps out. Where reps exist they come from inside the movement text ("5 repetitions", "10 breath cycles", "3–5 breaths") or from one exam card ("Wunda footwork 8–10 reps").
- **Order within a block: only partly confirmed.** Sequence lists ("Reformer Foot Work Sequence", "Short Box Series", "Up Stretch Group", and so on) confirm the order *inside a series* for 132 exercises (`order_in_series`). The `order` within a whole block is **always inferred** from the order of the source deck. Samya D.'s decks seem to follow the manual and group exercises by series.
- **Not found at all:** the complete Advanced and Master repertoire for every apparatus, Arm Chair (F2 chair), Electric/High Chair, Spine Corrector/Arc as a separate apparatus, the Ped-a-Pul footwork and leg work beyond the arm series, Jump Board details beyond the Jumping Series, and any official BASI repertoire list. BASI does not publish the manuals. Quizlet decks exist but are blocked to automated fetching (captcha / HTTP 410). Scribd documents are blocked, and Docsity/Stuvia/DocMerit are paywalled.

## Sources

### Primary sources used (data extracted)

| Source | What it gave | Quality |
|---|---|---|
| Samya D., *Basi Reformer Repertoire* (Brainscape) – https://www.brainscape.com/packs/basi-reformer-repertoire-18870797 | About 95 Reformer exercises, one deck per block (Foot Work, Abdominal, Hip, Spinal Articulation, Stretches, FBI, Arm, Leg, Lat Flex/Rot, Back Ext) with setup, resistance, breathing, muscle focus, objectives, and cues | **Best.** Near-verbatim manual text with page refs. Treated as the highest-priority source. Some advanced FBI cards are hidden. |
| Samya D., *Basi Cadillac Repertoire* – https://www.brainscape.com/packs/basi-cadillac-repertoire-18974713 | About 60 Cadillac exercises, per block | Same quality |
| Samya D., *Basi Wunda Chair Repertoire* – https://www.brainscape.com/packs/basi-wunda-chair-repertoire-18987850 | About 35 Wunda Chair exercises, per block | Same quality |
| Amelia Crabtree, *Basi Pilates Certification* – https://www.brainscape.com/packs/basi-pilates-certification-11251584 | Practical-exam decks for Mat, Reformer, Cadillac/Tower, Wunda Chair/Ladder Barrel, and Auxiliary (Step Barrel, Pole, Ped-a-Pul, leg weights), plus a "Series" deck of sequences | Good. Adds student spring-colour guesses (often marked "?"). About a third of the cards are hidden, so only the names are known. |
| Einav Cohen, *Basi Pilates Certification 2024* – https://www.brainscape.com/packs/basi-pilates-certification-2024-22519395 | Mostly a copy of Amelia's decks, with more Wunda/Ladder Barrel and Spine Corrector cards and Wunda `x/y` spring settings | Good. Not an independent source for conflicts. |
| Anna Strickland, *BASI Pilates* – https://www.brainscape.com/packs/basi-pilates-21026238 | Fundamental Reformer and Mat, Intermediate Mat, Pole + Ped-a-Pul, and the Comprehensive block list and warm-up sequences | Good where the cards are filled in. Many Reformer cards are empty. |
| Natalie Claire Allan, *BASI pilates* (Mat) – https://www.brainscape.com/flashcards/basi-mat-14882786/packs/21815728 | 85 Mat cards, including Magic Circle and leg weights. Uses the BASI Mat blocks (Foundation, Abdominal, Spinal Articulation, Bridging/FBI, Lat Flex/Rot, Back Ext) | Paraphrased student notes. Good for block/level, weaker on muscle focus. |

### Secondary sources (sequences, spring codes, block list), seen only as search-engine snippets
- Docsity, *BASI PILATES LATEST REFORMER* (paywalled): spring codes R / RB / RY, Up Stretch Group order, and the Teaser/Teaser Prep block – https://www.docsity.com/en/docs/basi-pilates-latest-reformer-basi-pilates-latest-reformer/16636442/
- Docsity, *Basi Pilates Exercise Series/Sequences*: Reformer, Cadillac and Chair foot-work sequences, Short Box, Knee Stretch, Up Stretch, and Push Through – https://www.docsity.com/en/docs/basi-pilates-exercise-series-sequences-questions-and-answers-2026-cadillac-foot-work/19660426/
- Docsity, *BASI Pilates Series Modules 1-6*: Reformer series lists – https://www.docsity.com/en/docs/basi-pilates-series-modules-1-6-questions-and-answers-already-graded-aor-updated-and-verifi/13297436/
- Docsity, *BASI Pilates Cadillac Exercises final exam*: Cadillac series order and muscle focus – https://www.docsity.com/en/docs/basi-pilates-cadillac-exercises-complete-latest-final-exam-updated-for-2026-2027-actual/17323658/
- DocMerit, *BASI Pilates Reformer Exam* (preview page): Arms Supine Series with `R` springs – https://docmerit.com/doc/show/basi-pilates-reformer-exam-newest-actual-exam-questions-and-correct-detailed-answers
- Quizlet, *Basi Block System* (snippet only): the 12-block Comprehensive list – https://quizlet.com/87715460/basi-block-system-flash-cards/
- BASI UK and Reformerise block-system articles, and Pilatesology's BASI spring colour key (Red = heavy, Blue = medium, Yellow = light) – https://pilatesology.com/2025/04/what-reformer-springs-do-i-use/

### Leads I did not use (blocked, or the data could not be verified)
- Quizlet BASI decks: captcha/410, so not fetchable.
- Rael Isacowitz, *Pilates* (Human Kinetics, 2nd/3rd ed.). This is the best published source for springs, levels and blocks for Mat and the apparatus, but it is not freely available online. **Recommended for the manual correction pass.**
- Stuvia/DocMerit BASI exam dumps: paywalled.
- Brainscape "Pilates Training" by Naomi Nagaya (Cadillac/Wunda/Ladder Barrel by level): this may not be BASI-specific, so I left it out.

## Field semantics in the JSON

- `block`: one of the 12 Comprehensive blocks. `block_number` follows this order: 1 Warm-up, 2 Foot Work, 3 Abdominal Work, 4 Hip Work, 5 Spinal Articulation, 6 Stretches, 7 FBI I, 8 Arm Work, 9 Leg Work, 10 Lateral Flexion/Rotation, 11 Back Extension, 12 FBI II.
  - **The sources disagree on the block order after Stretches.** The Quizlet snippet gives *FBI (F/I), Arm Work, FBI (A/M), Leg Work, Lat Flex/Rot, Back Ext*. Reformerise gives *FBI I, Arm, Leg, FBI II, Lat Flex, Back Ext*. The order you supplied puts FBI II last. `block_number` uses your order.
  - The sources only say "Full Body Integration". I split it into **FBI I for Fundamental/Intermediate and FBI II for Advanced/Master**, following the Quizlet block list, and marked the block `inferred`.
  - Mat cards use the 6 Mat blocks. I mapped *Foundation* to Warm-up and *Bridging/FBI* to FBI I/II.
- `order`: position inside (apparatus, block). **Always inferred.** For Samya-covered apparatus it follows Samya's deck order. For Mat and the small apparatus it is sorted by level, then by deck order. Series members are kept together in their confirmed order.
- `series` and `order_in_series`: the BASI series or group name (Supine Series, Short Box Series, Up Stretch Group, and so on) and the position inside it. `confirmed-by-source` when a sequence list exists.
- `springs`: the value from the highest-priority source, usually the manual's words. `springs_claims` lists every claim with its source and confidence. Student guesses containing "?" or "prob" are marked `inferred`. Notation:
  - Reformer codes: `R` = 1 red, `RB` = red + blue, `RY` = red + yellow.
  - Wunda Chair settings like `2/3` or `1 on 2` are copied as-is (meaning unverified).
  - Cadillac: "top loaded" / "bottom loaded" refers to where the push-through bar springs attach.
- `reps`: only where a source states it.
- `setup`, `breathing`: source text, lightly cleaned. In `breathing`, " | " separates the steps.
- `focus`: `{muscles, objectives}` from the MUSCLE FOCUS / OBJECTIVES sections.
- `confidence`: per field, `confirmed-by-source` (some source states it) or `inferred` (derived by me). A field missing from `confidence` is null.
- `notes`: conflicts between sources, mapping decisions, and hidden cards.

Source priority when sources conflict: Samya (manual transcription) > Anna > Natalie > Amelia/Einav. One override goes against Samya: Reformer Teaser Prep and Teaser go in **Abdominal Work**, because the exam decks, Docsity and DocMerit all agree.

## Coverage (exercises per apparatus × block_number)

| Apparatus | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | no block | total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reformer | – | 10 | 14 | 6 | 6 | 3 | 13 | 26 | 7 | 2 | 5 | 7 | – | 99 |
| Mat | 7 | – | 15 | – | 9 | – | 6 | – | – | 11 | 9 | 4 | – | 61 |
| Cadillac | – | 10 | 8 | 14 | 3 | 1 | 4 | 10 | 1 | 3 | 3 | 2 | – | 59 |
| Wunda Chair | – | 8 | 5 | – | 2 | – | 1 | 5 | 7 | 3 | 3 | 1 | – | 35 |
| Magic Circle | – | – | 1 | – | – | – | – | 5 | 10 | – | 2 | – | – | 18 |
| Step Barrel / Spine Corrector | – | – | 1 | 5 | 1 | – | – | – | – | 3 | 2 | – | 3 | 15 |
| Ladder Barrel | – | – | – | – | – | 6 | – | – | – | 2 | 2 | – | – | 10 |
| Leg Weights | – | – | – | – | – | – | – | – | 7 | – | – | – | – | 7 |
| Ped-a-Pul | – | – | – | – | – | – | – | 5 | – | – | – | – | – | 5 |
| Pole | – | – | – | – | – | 4 | – | – | – | – | – | – | – | 4 |
| unknown | – | – | – | – | – | – | – | – | – | – | – | – | 2 | 2 |

Field completeness, out of 315: block 98%, level 88%, breathing 89%, setup 88%, focus 84%, springs (any value) 61%, explicit colour or number spring claim 28% (89 records: Reformer 57/99, Wunda 21/35, Cadillac 13/59), `order_in_series` confirmed 42%, reps 9% (28).

## Known gaps and things to check

- **Reformer:** most Advanced FBI cards are hidden (Tendon Stretch, Balance Control Back, Up Stretch 3 Reverse, Long Back Stretch). Missing entirely: Short Spine variations, Snake/Twist, Star, Control Front/Back, Russian Splits, Front Splits, Rowing details, Jump Board Leg Work beyond the 4 jumping exercises, and the Advanced Back Extension (Swan on the reformer, Grasshopper and similar). Lunge Kneeling and Lunge Forward have no level in the source.
- **Mat:** reps are mostly missing. Boomerang, Swan Dive and Swan Dive with Catch have no level. The Magic Circle and leg-weight exercises have no level.
- **Cadillac:** only one Stretches exercise and one Leg Work exercise were found. The Advanced and Master Cadillac repertoire (Hanging, Airplane, Spread Eagle, Leg Spring side series and so on) is barely covered.
- **Wunda Chair:** the Advanced repertoire is thin (Pike Front, Torso Press Sit, Tendon Stretch, Jackknife, Lunge Forward), and the meaning of the `x/y` spring notation is unverified.
- **Ladder Barrel / Step Barrel / Spine Corrector:** names, setup and breathing exist for some exercises, but there are no springs (not applicable) and no reps. The Fundamental/Intermediate split is partly conflicting. The older deck says "Step Barrel" and the 2024 deck says "Spine Corrector", so the two are merged. Spine Corrector/Arc as a separate apparatus was not found.
- **Ped-a-Pul (Pedi-pole):** only the 5-exercise Arms Standing/Sitting Series, with no detail text.
- **Not covered at all:** Arm Chair, Electric/High Chair, Foot Corrector, and Toe Corrector.
- **Conflicts to resolve by hand (see each record's `notes`):**
  - Mat Jackknife: Spinal Articulation or FBI?
  - Mat Cat Stretch: FBI or Back Extension?
  - Reformer Side Over on Box: Lat Flex/Rot or Abdominal?
  - Level of Reformer Climb-a-Tree, Bottom Lift with Extension, Breaststroke, Pulling Straps 1/2, and Up Stretch 3.
  - Block of Cadillac Changes and Circles Forward (Hip or Leg Work), and of Sitting Side and Butterfly (Lat Flex/Rot or Arm Work).
  - Block of Wunda Torso Press Sit (Abdominal or FBI II).
  - Cadillac Warm-up Series: Abdominal Work block or Warm-up block?
- **Mapping guesses (all marked in `notes`):**
  - Exam "Breaststroke Prep" mapped to Samya "Breaststroke Prep 1".
  - Docsity "Full Lunge" mapped to "Lunge Forward".
  - Wunda "Side Over (Chair)" mapped to "Side Stretch".
  - Cadillac "Roll up top loaded" mapped to "Roll-Up with PTBar".
  - "Monkey Original" mapped to "Monkey".
  - Anna's "Scooter Round Back" merged into "Scooter". "Scooter Flat Back" is kept as its own exercise.

## Reproduction

The raw Brainscape HTML and the extraction scripts (`parse2.py` → `extract.py` → `curate.py` → `finalize.py`) are in `/tmp/opencode/basi/`. That directory is temporary, so copy it if you want to keep it.
