# Images & animations for Pilates exercises — research

Researched 2026-10-05 for a static, non-commercial personal study app on GitHub Pages.
Target repertoire is BASI-style (Mat, Reformer, Cadillac, Chair, Barrels), which comes to hundreds of exercises. The app probably needs visuals for 60–150 of them.

## TL;DR

- **No free source covers the repertoire by exercise name.** Across Wikimedia Commons, Openverse/Flickr, Unsplash, Pexels and Pixabay, about 10–15 photos are labelled with a specific named exercise. The rest are generic shots like "woman on a reformer".
- Icon sets (Flaticon, Noun Project, SVG Repo) have generic "pilates" and "reformer" glyphs, not per-exercise poses.
- GIF sites (Giphy, Tenor) are mostly clips ripped from studio videos with unclear rights.
- **Recommendation:** draw our own SVG stick figures, with joint-angle keyframes animated through nested `<g>` transforms. Add a few CC-licensed photos as optional "real-life reference" images, downloaded into the repo with attribution. For each exercise, link out to video rather than embedding it.

## Source-by-source evaluation

| Source | License | Hotlink? | Exercise-specific coverage | Quality |
|---|---|---|---|---|
| Wikimedia Commons | Per file: CC0, CC BY, CC BY-SA | Technically works, but downloading and attributing is better practice | About 50 files in `Category:Pilates` (+ subcats). Named exercises: Hundred, Single Leg Stretch, hamstring stretch, back stretch, side plank. One Wunda Chair photo, a few generic Reformer photos | Mixed: amateur photos, some very high-res |
| Openverse (aggregates Flickr + Commons) | Per item, mostly CC BY / BY-SA / BY-NC(-SA) / BY-ND | Flickr static URLs hotlink fine; downloading is safer | 240+ hits for "pilates reformer", but nearly all generic. **Best find:** Flickr user *runwaypilates*, 21 reformer photos under **CC BY 2.0** with exercise names (Elephant, Long Spine, Swan Dive, Feet in Straps, Lunge, Box, etc.). "pilates teaser" returns 0 hits; "pilates mermaid" returns 1 (and it's a cartoon mermaid) | runwaypilates: good, professional studio shots, 1024 px |
| Unsplash | Unsplash License: free, no attribution required, no compiling into a competing service. "Unsplash+" images are paid | Downloading is fine for manual use. The API *requires* hotlinking plus attribution | About 270 "reformer pilates" photos, all generic captions. Some poses are identifiable by eye (e.g. footwork, kneeling arm work) but none are labelled | High (professional, 2025 shoots) |
| Pexels | Pexels License: free, attribution appreciated, no reselling unaltered copies | Allowed via API with a "Photos by Pexels" link; downloading is fine | Many generic reformer and "Pilates tower" photos; none labelled by exercise | High |
| Pixabay | Pixabay Content License: free, no attribution | **No permanent hotlinking**, must download | A handful of generic photos and vector illustrations | Medium |
| Flaticon (free tier) | Free with **mandatory attribution**; Premium removes it | Must download (no CDN for free users) | 50-icon "Pilates" packs (Freepik): generic poses, a few reformer/tower glyphs, not mapped to repertoire | Polished but generic |
| Noun Project | Free tier is CC BY with attribution, or paid royalty-free | Must download | Several "reformer" icons (e.g. thenounproject.com/icon/reformer-8020090/); generic | Consistent single-colour glyphs |
| SVG Repo | Mostly CC0/MIT/"SVG Repo license" (per icon); no bulk redistribution | Download | About 50 "pilates" vectors, generic poses (Teaser-like V-sit, bridge, etc.) | Mixed styles |
| Open Icon Library / FreeSVG / libreclipart | CC0, or MIT for unDraw | Download | Single generic "female pilates silhouette", unDraw "Pilates" scene | Decorative only |
| Giphy / Tenor | ToS: content belongs to the original owners. Embedding via their embed is tolerated, but rights are not granted | Embed iframe only | Some reformer GIFs, mostly from studio marketing videos; inconsistent names | Variable, often watermarked |
| Studio/brand libraries (Balanced Body, Pilates Anytime, BASI manuals) | All rights reserved | No | Full coverage | High, but **not usable** |
| *Return to Life Through Contrology* (1945) | Possibly public domain if the copyright was not renewed. **Unverified**: the Stanford renewal DB blocked automated lookup | n/a | 34 original mat exercises, performed by Joseph Pilates himself (photos by George Hornigan Wayne) | Historic B&W, and the classical versions differ from BASI |
| wger / free-exercise-db / ExerciseDB | wger CC BY-SA; free-exercise-db Unlicense; ExerciseDB commercial | — | No Pilates repertoire | — |

### Concrete usable URLs

Wikimedia Commons:
- Hundred (CC BY-SA 4.0, Helisusa): https://commons.wikimedia.org/wiki/File:Pilates-hundred-sata.jpg
- Single leg stretch (Finnish "yhden jalan ojennus"): https://commons.wikimedia.org/wiki/File:Pilates-yhden-jalan-ojennus.jpg
- Back stretch / hamstring stretch / side plank: `File:Pilates-back-stretch.jpg`, `File:Pilates-hamstring-stretch.jpg`, `File:Pilates-sivulankku.jpg`
- Wunda Chair (CC0): https://commons.wikimedia.org/wiki/File:Pilates_Wunda_Chair.jpg
- Reformer (CC BY-SA 4.0): https://commons.wikimedia.org/wiki/File:Pilates_reformer_pic.jpg
- Generic "Pilates" glyph (CC0, from Noun Project): https://commons.wikimedia.org/wiki/File:Pilates_-_The_Noun_Project.svg
- Category: https://commons.wikimedia.org/wiki/Category:Pilates (subcats `Pilates move`, `Reformer Pilates`)

Flickr / runwaypilates (CC BY 2.0; attribute as "runwaypilates, CC BY 2.0"):
- Elephant: https://www.flickr.com/photos/150388148@N02/35315153304
- Swan Dive: https://www.flickr.com/photos/150388148@N02/36022885121
- Long Spine: https://live.staticflickr.com/4327/36154468635_36cb5a39f2_b.jpg
- Feet in Straps: https://live.staticflickr.com/4322/35986177122_2a71c9ee39_b.jpg
- Box exercise: https://live.staticflickr.com/4297/36022987091_9a08aaf753_b.jpg
- Also available: Lunge, Hip Rolls, Abductor, Obliques, Side Stretch, Forward Twist, Fit Circle
- Full set: https://openverse.org/search?q=Reformer%20Pilates%20Photography

Unsplash (generic reformer shots, Unsplash License):
- https://unsplash.com/photos/woman-does-a-pilates-exercise-using-a-reformer-Lmt68LRP71s
- https://unsplash.com/photos/woman-does-pilates-exercise-on-a-reformer-machine-3FdXv58Wsag
- https://unsplash.com/s/photos/reformer-pilates

Pexels:
- https://www.pexels.com/photo/fit-woman-exercising-on-pilates-reformer-25596679/
- https://www.pexels.com/photo/woman-on-a-pilates-tower-25599823/ (Cadillac/tower)

### Hotlinking summary for a GitHub Pages site

- **Download, commit and attribute** works with every source above and is the only option that is compliant everywhere. Exception: images fetched via the Unsplash *API*, which must be hotlinked. Manual downloads from unsplash.com are fine to self-host.
- Never hotlink Pixabay.
- Commons `upload.wikimedia.org` URLs work, but files can be renamed or deleted, so self-hosting is more robust.
- Keep an `ATTRIBUTION.md`, or a caption under each photo, for the CC BY / BY-SA items. BY-SA only applies share-alike to the image itself (and any edits to it), not to the app.

## Prior art

https://github.com/its-kristyc/block-learning is a "BASI block system study app" (Vite/React, 400+ exercise JSON). It ships **no** exercise images (`public/images/` is empty). Its README warns that BASI study material is proprietary, so the deployed site should stay private. The same caution applies here: don't copy images or text from BASI manuals into a public GitHub Pages repo.

## Option: our own animated SVG stick figures

### Why it fits
- It covers 100% of the repertoire, including obscure apparatus exercises with no photos anywhere (Cadillac Tower series, Ladder Barrel Horseback, Chair Pull Up, etc.).
- One consistent, "cute" visual style, with no licensing, attribution or link-rot issues. Each figure is a few KB, works offline/PWA, and can be themed with CSS (dark mode, accent colour).
- Animation shows the *movement*, which photos can't. That matters most for spinal articulation (Short Spine, Elephant) and for the carriage moving (Footwork, Long Stretch).

### How (keep it dependency-free)
1. **Rig = nested `<g>` groups (forward kinematics for free).** Pelvis → lumbar → thoracic → neck → head; pelvis → thigh → shin → foot; thoracic → upper arm → forearm. Each group has `transform-origin` at its joint and is rotated by an angle. A child rotates with its parent, so no IK math is needed.
2. **Pose = a small JSON of angles** (side view, degrees), plus root position:
   ```json
   { "root": [120, 140], "pelvis": 0, "lumbar": -10, "thoracic": -20, "neck": -10,
     "hipR": 90, "kneeR": 0, "hipL": 90, "kneeL": 0, "shoulderR": 170, "elbowR": 0,
     "carriage": 0 }
   ```
   An exercise is `{ apparatus: "reformer", keyframes: [{t:0, pose}, {t:0.5, pose}], loop: true }`.
3. **Apparatus = static SVG per type** (reformer frame, footbar, carriage, springs; Cadillac frame + bars; Chair pedal; Ladder/Spine-corrector barrel). Moving parts like the carriage, chair pedal and push-through bar get their own pose channel, so they interpolate in sync with the body.
4. **Animate** with the Web Animations API, generating one `element.animate()` per joint from the keyframes, or a ~40-line `requestAnimationFrame` lerp. Use ease-in-out timing and a 3–6 s breath cycle. Respect `prefers-reduced-motion` by showing the start pose only.
5. **Authoring tool:** a dev-only page with one slider per joint plus a "copy JSON" button. Posing one keyframe takes about 2–5 minutes, so an exercise with 2–4 keyframes takes about 10–20 minutes. At that rate, 80 core exercises take roughly 15–25 hours. An LLM can draft first-pass angle JSON from the exercise description, then you fix it in the slider tool.

### Limits / risks
- Side view only. Rotation and lateral flexion exercises (Mermaid, Spine Twist, Saw, Side Kneeling) need a front-view rig variant or a stylised cue such as an arrow.
- It's a memory cue, not technique instruction: no detail on scapular placement, spring settings or alignment. Pair each figure with text cues and a link to video.
- Arms holding straps or ropes need simple line elements anchored to the hand and the apparatus. That's doable with one extra "strap" line whose endpoints are computed from the hand position, which costs a few lines of FK math.

### Libraries considered
- Google **Pose Animator** (Apache-2.0): drives SVG from a webcam via PoseNet. It's overkill, but it could *capture* poses from a video of you doing the exercise.
- **Markdy** (stick-figure DSL), **VectorFlow** (SVG state-tweening), **posev**: all young, low-adoption packages. Hand-rolled nested `<g>` + WAAPI is simpler and avoids dependencies.
- Lottie (`lottie-web`, MIT) is great for playback, but authoring needs After Effects or a Lottie editor. That's too heavy for 100+ exercises.

## Recommendation

1. **Primary:** custom SVG stick-figure rig with keyframe JSON per exercise. Start with about 10 exercises (Footwork, Hundred, Short Spine, Long Stretch, Elephant, Knee Stretches, Rowing, Teaser, Swan, Mermaid) to validate the rig, apparatus drawings and authoring workflow.
2. **Secondary, optional:** a "photo reference" slot per exercise filled from the CC sources above (runwaypilates Flickr CC BY, Commons). Download the files into `assets/photos/` and record the license and author in data.
3. **Video:** a per-exercise external link (a YouTube search URL or a hand-picked video) instead of embedding third-party GIFs.
4. **Avoid:** Flaticon/Noun (attribution overhead, generic), Giphy GIFs (unclear rights), anything from BASI or other studio manuals on a public site.
