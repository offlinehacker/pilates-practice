// Cute bunny stick-figure renderer + apparatus drawings.
// Poses live in poses/*.js and register via PP_POSE(id, pose).
//
// Coordinate system: SVG viewBox 0 -15 240 165 (15px headroom above y=0 for ears), floor at y=135.
// Angles are ABSOLUTE degrees, math style: 0 = right, 90 = up, 180 = left, -90 = down.
// Absolute angles (not relative to the parent bone) keep static poses easy to author:
// changing the torso never silently moves the arms.
//
// Pose fields:
//   app      apparatus drawing: mat | reformer | cadillac | chair | ladder | barrel | pedapul | floor
//   x, y     hip joint position
//   t        torso angle (hip -> shoulders); c = torso curve in px (+ bulges to the left of the
//            hip->shoulder direction, i.e. counter-clockwise normal)
//   h        head angle (shoulders -> top of head; ears point this way); look = angle the face looks
//   a1, a2   near / far arm: [upperArm, forearm]
//   l1, l2   near / far leg: [thigh, shin, foot]
//            Any limb may instead be {to:[x,y], bend:1|-1, foot:angle} (IK: pin the hand/ankle to a point;
//            bend picks which way the elbow/knee points, foot is the foot angle for legs).
// Apparatus props:
//   reformer: carriage (px the carriage has moved away from the footbar, 0-60; at rest it spans x 108-188,
//             headrest at its left end, shoulder rests at x 125), footbar ('up'|'down'),
//             box ('long'|'short'; long top y=70, short top y=72), straps (array of joint names connected
//             to the pulleys), jumpboard (bool: board at x≈200, use with footbar 'down'),
//             platform (bool: standing platform x 190-228, top y=88), footstrap (bool: loop at x 186-202)
//   cadillac: ptb (push-through bar angle, pivot near the right post), ptbSpring ('top'|'bottom'),
//             rollbar ([x,y] of the roll-down bar, springs to left post), trapeze (bool).
//             Frame top rail is y=4 (topLeft/topRight anchors follow) so sitting/kneeling heads fit.
//   chair:    pedal (0 = pressed down .. 1 = up), handles (bool), pedal2 (split pedal: far half's
//             position, defaults to pedal; anchor "pedal2"), mat (bool: draw a mat for floor work).
//             Seat top y=95 spanning x 110-162, front face x=160; pedal end runs (178,128) .. (173,104).
//             shift (px to move the chair sideways, e.g. -60 for floor work), box ([x1, x2, top] small
//             sitting box on the floor).
// Generic extras (endpoints are [x,y] or a joint/anchor name):
//   springs: [[from,to]], ropes: [[from,to]], bars: [[from,to]], ring: [x,y] (magic circle),
//   weights: ['foot1'], move: [[x1,y1,x2,y2]] dashed motion arrows
// Joint names: pelvis, shoulder, head, elbow1, hand1, knee1, ankle1, foot1 (and ...2 for far side).
// Anchor names: pulley, footbar, ptb, pedal, pedal2, rollbar, topLeft, topRight.
(function () {
  const POSES = (window.PP_POSES = window.PP_POSES || {});
  window.PP_POSE = (id, pose) => {
    POSES[id] = pose;
  };

  const L = { torso: 34, neck: 7, headR: 8.5, upper: 17, fore: 16, thigh: 25, shin: 24, foot: 8 };
  const COLORS = {
    torso: "#b79cf5",
    legNear: "#ff8fb3",
    legFar: "#ffc2d6",
    armNear: "#f7b58f",
    armFar: "#fbd7c2",
    line: "#5b4a6b",
    wood: "#e9c9a8",
    woodDark: "#c99d76",
    metal: "#a9a3b8",
    pad: "#9ad9c9",
    padDark: "#6fbfac",
    mat: "#ffd6e5",
    spring: "#f4a259",
  };

  const rad = (d) => (d * Math.PI) / 180;
  const step = (p, angle, len) => [p[0] + len * Math.cos(rad(angle)), p[1] - len * Math.sin(rad(angle))];
  const f = (n) => Math.round(n * 10) / 10;
  const pt = (p) => `${f(p[0])},${f(p[1])}`;

  function joints(p) {
    const j = {};
    const A = anchors(p);
    const pin = (spec) => (spec && !Array.isArray(spec) && typeof spec.to === "string" ? { ...spec, to: A[spec.to] || [0, 0] } : spec);
    j.pelvis = [p.x, p.y];
    j.shoulder = step(j.pelvis, p.t ?? 90, L.torso);
    const h = p.h ?? p.t ?? 90;
    j.neck = step(j.shoulder, h, L.neck);
    j.head = step(j.shoulder, h, L.neck + L.headR);
    for (const s of ["1", "2"]) {
      const a = limbAngles(pin(p["a" + s]) || [-90, -90], j.shoulder, L.upper, L.fore);
      j["elbow" + s] = step(j.shoulder, a[0], L.upper);
      j["hand" + s] = step(j["elbow" + s], a[1], L.fore);
      const l = limbAngles(pin(p["l" + s]) || [-90, -90, 0], j.pelvis, L.thigh, L.shin);
      j["knee" + s] = step(j.pelvis, l[0], L.thigh);
      j["ankle" + s] = step(j["knee" + s], l[1], L.shin);
      j["foot" + s] = step(j["ankle" + s], l[2] ?? l[1] + 90, L.foot);
    }
    return j;
  }

  // A limb is either explicit angles or {to:[x,y], bend:1|-1, foot}: two-bone IK so hands and
  // feet can be pinned to a bar or pedal. bend=1 bends the middle joint counter-clockwise.
  function limbAngles(spec, root, a, b) {
    if (Array.isArray(spec)) return spec;
    const dx = spec.to[0] - root[0];
    const dy = root[1] - spec.to[1];
    const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(a - b) + 0.01), a + b - 0.01);
    const base = Math.atan2(dy, dx);
    const off = Math.acos((a * a + d * d - b * b) / (2 * a * d)) * (spec.bend ?? 1);
    const upper = base + off;
    const mid = [root[0] + a * Math.cos(upper), root[1] - a * Math.sin(upper)];
    const lower = Math.atan2(mid[1] - spec.to[1], spec.to[0] - mid[0]);
    const deg = (r) => (r * 180) / Math.PI;
    return [deg(upper), deg(lower), spec.foot ?? deg(lower) + 90];
  }

  function anchors(p) {
    const a = { topLeft: [18, 10], topRight: [222, 10] };
    if (p.app === "reformer") {
      a.pulley = [16, 66];
      a.footbar = [208, 66];
    }
    if (p.app === "cadillac") Object.assign(a, { topLeft: [18, 4], topRight: [222, 4] });
    if (p.app === "cadillac" && p.ptb != null) a.ptb = step([220, 54], p.ptb, 62);
    if (p.app === "cadillac" && p.rollbar) a.rollbar = p.rollbar;
    if (p.app === "chair") {
      a.pedal = pedalEnd(p.pedal ?? 1, p.shift);
      a.pedal2 = pedalEnd(p.pedal2 ?? p.pedal ?? 1, p.shift);
    }
    return a;
  }

  // The pedal arm hinges low at the back of the box, runs along its side and sticks out of the front face.
  const pedalEnd = (v, dx = 0) => step([118 + dx, 127], -1 + 24 * v, 60);

  function resolve(ref, j, a) {
    if (Array.isArray(ref)) return ref;
    return j[ref] || a[ref] || [0, 0];
  }

  function zigzag(from, to, w = 3) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const len = Math.hypot(dx, dy) || 1;
    const n = Math.max(4, Math.round(len / 5));
    const nx = -dy / len;
    const ny = dx / len;
    let d = `M${pt(from)}`;
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const s = i % 2 ? w : -w;
      d += ` L${f(from[0] + dx * t + nx * s)},${f(from[1] + dy * t + ny * s)}`;
    }
    d += ` L${pt(to)}`;
    return `<path d="${d}" fill="none" stroke="${COLORS.spring}" stroke-width="1.6" stroke-linejoin="round"/>`;
  }

  // ---------- apparatus ----------
  function drawMat() {
    return `<rect x="16" y="128" width="208" height="6" rx="3" fill="${COLORS.mat}" stroke="#f3a6c4" stroke-width="1"/>`;
  }

  function drawReformer(p) {
    const cx = 108 - (p.carriage || 0);
    let s = "";
    // frame + legs
    s += `<rect x="10" y="100" width="220" height="9" rx="4" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    s += `<rect x="16" y="109" width="7" height="26" rx="2" fill="${COLORS.woodDark}"/><rect x="217" y="109" width="7" height="26" rx="2" fill="${COLORS.woodDark}"/>`;
    // risers + pulley
    s += `<rect x="13" y="66" width="5" height="34" rx="2" fill="${COLORS.metal}"/><circle cx="16" cy="66" r="4" fill="#fff" stroke="${COLORS.metal}" stroke-width="2"/>`;
    // springs under carriage to the foot end
    s += zigzag([cx + 80, 97], [214, 97], 2.5);
    // carriage
    s += `<rect x="${cx}" y="88" width="80" height="11" rx="4" fill="${COLORS.pad}" stroke="${COLORS.padDark}"/>`;
    s += `<rect x="${cx}" y="${p.headrest === "down" ? 85 : 81}" width="13" height="${p.headrest === "down" ? 4 : 8}" rx="3" fill="${COLORS.padDark}"/>`;
    s += `<rect x="${cx + 17}" y="74" width="5" height="15" rx="2" fill="${COLORS.padDark}"/>`;
    // footbar
    if (p.footbar !== "down") {
      s += `<path d="M204,100 L208,66" stroke="${COLORS.metal}" stroke-width="3" stroke-linecap="round"/><circle cx="208" cy="66" r="3.5" fill="${COLORS.padDark}"/>`;
    } else {
      s += `<path d="M204,100 L224,106" stroke="${COLORS.metal}" stroke-width="3" stroke-linecap="round"/>`;
    }
    if (p.box === "long") s += `<rect x="${cx + 4}" y="70" width="74" height="18" rx="4" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    if (p.box === "short") s += `<rect x="${cx + 22}" y="72" width="38" height="16" rx="4" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    if (p.jumpboard) s += `<rect x="200" y="50" width="7" height="52" rx="3" fill="${COLORS.pad}" stroke="${COLORS.padDark}"/>`;
    if (p.platform) s += `<rect x="190" y="88" width="38" height="12" rx="3" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    if (p.footstrap) s += `<path d="M186,100 Q194,78 202,100" fill="none" stroke="${COLORS.padDark}" stroke-width="3" stroke-linecap="round"/>`;
    return s;
  }

  function drawCadillac(p) {
    let s = "";
    s += `<path d="M18,135 L18,4 L222,4 L222,135" fill="none" stroke="${COLORS.metal}" stroke-width="4" stroke-linejoin="round"/>`;
    s += `<rect x="12" y="86" width="216" height="10" rx="4" fill="${COLORS.pad}" stroke="${COLORS.padDark}"/>`;
    s += `<rect x="24" y="96" width="6" height="39" fill="${COLORS.woodDark}"/><rect x="210" y="96" width="6" height="39" fill="${COLORS.woodDark}"/>`;
    if (p.trapeze) s += `<path d="M105,4 L105,40 M135,4 L135,40" stroke="${COLORS.metal}" stroke-width="1.5"/><rect x="102" y="38" width="36" height="5" rx="2.5" fill="${COLORS.padDark}"/>`;
    if (p.ptb != null) {
      const piv = [220, 54];
      const end = step(piv, p.ptb, 62);
      const mid = step(piv, p.ptb, 40);
      if (p.ptbSpring === "bottom") s += zigzag(mid, [215, 96]);
      else s += zigzag(mid, [176, 4]);
      s += `<path d="M${pt(piv)} L${pt(end)}" stroke="${COLORS.line}" stroke-width="3.5" stroke-linecap="round"/>`;
    }
    if (p.rollbar) {
      s += zigzag([18, 46], p.rollbar);
      s += `<circle cx="${f(p.rollbar[0])}" cy="${f(p.rollbar[1])}" r="3.5" fill="${COLORS.line}"/>`;
    }
    return s;
  }

  function drawChair(p) {
    const v = p.pedal ?? 1;
    const hinge = [118, 127];
    const arm = (val, color, w) => `<path d="M${pt(hinge)} L${pt(pedalEnd(val))}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
    let s = `<path d="M10,135 L230,135" stroke="${COLORS.woodDark}" stroke-width="2"/>`;
    if (p.mat) s += drawMat();
    if (p.box) s += `<rect x="${p.box[0]}" y="${p.box[2]}" width="${p.box[1] - p.box[0]}" height="${134 - p.box[2]}" rx="3" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    s += `<g transform="translate(${p.shift || 0} 0)">`;
    // split pedal: the far half only shows where it sticks out past the front face
    if (p.pedal2 != null) s += arm(p.pedal2, COLORS.pad, 4);
    s += `<rect x="112" y="99" width="48" height="35" rx="4" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    s += `<rect x="110" y="95" width="52" height="6" rx="3" fill="${COLORS.pad}" stroke="${COLORS.padDark}"/>`;
    if (p.handles) s += `<path d="M114,95 L114,62 M158,95 L158,62" stroke="${COLORS.metal}" stroke-width="3" stroke-linecap="round"/>`;
    // spring hooks to a peg on the box side above the arm, so it stretches as the pedal is pressed
    s += zigzag([146, 104], step(hinge, -1 + 24 * v, 36), 2.5);
    s += arm(v, COLORS.padDark, 4.5);
    s += `<circle cx="${hinge[0]}" cy="${hinge[1]}" r="2.2" fill="${COLORS.metal}"/>`;
    return s + "</g>";
  }

  function drawLadder() {
    let s = `<path d="M40,135 L40,55 M58,135 L58,55" stroke="${COLORS.woodDark}" stroke-width="3"/>`;
    for (let y = 62; y < 135; y += 13) s += `<path d="M40,${y} L58,${y}" stroke="${COLORS.woodDark}" stroke-width="2.5"/>`;
    s += `<rect x="58" y="128" width="100" height="7" rx="2" fill="${COLORS.woodDark}"/>`;
    s += `<path d="M118,135 L118,98 A32,32 0 0 1 182,98 L182,135 Z" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>`;
    s += `<path d="M118,98 A32,32 0 0 1 182,98" fill="none" stroke="${COLORS.pad}" stroke-width="5"/>`;
    return s;
  }

  function drawBarrel() {
    return (
      drawMat() +
      `<path d="M92,128 Q100,92 130,92 Q160,92 168,110 L176,128 Z" fill="${COLORS.wood}" stroke="${COLORS.woodDark}"/>` +
      `<path d="M92,128 Q100,92 130,92 Q160,92 168,110" fill="none" stroke="${COLORS.pad}" stroke-width="4"/>`
    );
  }

  function drawPedapul() {
    return (
      drawMat() +
      `<path d="M120,128 L120,14 M108,14 L132,14" stroke="${COLORS.metal}" stroke-width="4" stroke-linecap="round"/>` +
      `<ellipse cx="120" cy="130" rx="22" ry="4" fill="${COLORS.metal}"/>`
    );
  }

  const APPARATUS = {
    mat: drawMat,
    floor: () => `<path d="M10,135 L230,135" stroke="${COLORS.woodDark}" stroke-width="2"/>`,
    reformer: drawReformer,
    cadillac: drawCadillac,
    chair: drawChair,
    ladder: drawLadder,
    barrel: drawBarrel,
    pedapul: drawPedapul,
  };

  const APPARATUS_OF = {
    Mat: "mat",
    Reformer: "reformer",
    Cadillac: "cadillac",
    "Wunda Chair": "chair",
    "Ladder Barrel": "ladder",
    "Step Barrel / Spine Corrector": "barrel",
    "Ped-a-Pul": "pedapul",
    "Magic Circle": "mat",
    "Leg Weights": "mat",
    Pole: "mat",
  };

  // ---------- bunny figure ----------
  const limb = (pts, color, w) =>
    `<polyline points="${pts.map(pt).join(" ")}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  function figure(p, j) {
    let s = "";
    s += limb([j.elbow2 && j.shoulder, j.elbow2, j.hand2], COLORS.armFar, 5);
    s += limb([j.pelvis, j.knee2, j.ankle2, j.foot2], COLORS.legFar, 6.5);
    // torso as a curve so flexion / extension reads at a glance
    const mid = [(j.pelvis[0] + j.shoulder[0]) / 2, (j.pelvis[1] + j.shoulder[1]) / 2];
    const ta = rad(p.t ?? 90);
    const c = p.c || 0;
    const ctrl = [mid[0] - Math.sin(ta) * c * 2, mid[1] - Math.cos(ta) * c * 2];
    s += `<path d="M${pt(j.pelvis)} Q${pt(ctrl)} ${pt(j.shoulder)}" fill="none" stroke="${COLORS.torso}" stroke-width="10" stroke-linecap="round"/>`;
    s += limb([j.pelvis, j.knee1, j.ankle1, j.foot1], COLORS.legNear, 7);
    s += limb([j.shoulder, j.neck], COLORS.torso, 5);
    s += head(p, j);
    s += limb([j.shoulder, j.elbow1, j.hand1], COLORS.armNear, 5.5);
    s += `<circle cx="${f(j.hand1[0])}" cy="${f(j.hand1[1])}" r="2.6" fill="${COLORS.armNear}"/>`;
    return s;
  }

  function head(p, j) {
    const h = p.h ?? p.t ?? 90;
    const look = p.look ?? h - 90;
    const c = j.head;
    let s = "";
    for (const off of [-22, 16]) {
      const base = step(c, h + off, L.headR - 2);
      const tip = step(c, h + off, L.headR + 13);
      const ang = -(h + off);
      const mx = (base[0] + tip[0]) / 2;
      const my = (base[1] + tip[1]) / 2;
      s += `<ellipse cx="${f(mx)}" cy="${f(my)}" rx="8.5" ry="3.6" transform="rotate(${f(ang)} ${f(mx)} ${f(my)})" fill="#fff" stroke="${COLORS.line}" stroke-width="1.3"/>`;
      s += `<ellipse cx="${f(mx)}" cy="${f(my)}" rx="5.5" ry="1.5" transform="rotate(${f(ang)} ${f(mx)} ${f(my)})" fill="#ffc2d6"/>`;
    }
    s += `<circle cx="${f(c[0])}" cy="${f(c[1])}" r="${L.headR}" fill="#fff" stroke="${COLORS.line}" stroke-width="1.4"/>`;
    const eye = step(c, look, 4.5);
    const eye2 = step(c, look + 38, 4.8);
    const blush = step(c, look - 30, 5);
    s += `<circle cx="${f(blush[0])}" cy="${f(blush[1])}" r="1.9" fill="#ffb3c9"/>`;
    s += `<circle cx="${f(eye[0])}" cy="${f(eye[1])}" r="1.3" fill="${COLORS.line}"/>`;
    s += `<circle cx="${f(eye2[0])}" cy="${f(eye2[1])}" r="1.1" fill="${COLORS.line}" opacity=".7"/>`;
    return s;
  }

  function extras(p, j, a) {
    let s = "";
    for (const [from, to] of p.springs || []) s += zigzag(resolve(from, j, a), resolve(to, j, a));
    for (const [from, to] of p.ropes || []) s += `<path d="M${pt(resolve(from, j, a))} L${pt(resolve(to, j, a))}" stroke="${COLORS.line}" stroke-width="1" opacity=".7"/>`;
    for (const [from, to] of p.bars || []) s += `<path d="M${pt(resolve(from, j, a))} L${pt(resolve(to, j, a))}" stroke="${COLORS.line}" stroke-width="3.5" stroke-linecap="round"/>`;
    for (const name of p.straps || []) s += `<path d="M${pt(a.pulley || [16, 66])} L${pt(j[name])}" stroke="${COLORS.line}" stroke-width="1" opacity=".75"/>`;
    for (const name of p.weights || []) {
      const w = j[name.replace("foot", "ankle")] || j[name];
      s += `<rect x="${f(w[0] - 4)}" y="${f(w[1] - 3)}" width="8" height="6" rx="2" fill="${COLORS.padDark}"/>`;
    }
    return s;
  }

  function overlay(p, j) {
    let s = "";
    if (p.ring) {
      const r = resolve(p.ring, j, {});
      s += `<circle cx="${f(r[0])}" cy="${f(r[1])}" r="10" fill="none" stroke="#7c5cd6" stroke-width="2.5"/>`;
    }
    for (const m of p.move || []) {
      s += `<path d="M${f(m[0])},${f(m[1])} L${f(m[2])},${f(m[3])}" stroke="#7c5cd6" stroke-width="1.6" stroke-dasharray="3 2.5" marker-end="url(#pp-arrow)" opacity=".85"/>`;
    }
    return s;
  }

  const DEFS = `<defs><marker id="pp-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="#7c5cd6"/></marker></defs>`;

  function renderPose(p) {
    const j = joints(p);
    const a = anchors(p);
    const draw = APPARATUS[p.app] || APPARATUS.mat;
    return DEFS + draw(p) + extras(p, j, a) + figure(p, j) + overlay(p, j);
  }

  function placeholder(app) {
    const draw = APPARATUS[app] || APPARATUS.mat;
    const p = app === "chair" ? { pedal: 1 } : {};
    return (
      `<g opacity=".55">${draw(p)}</g>` +
      `<g transform="translate(120 60)">` +
      `<ellipse cx="-6" cy="-22" rx="4" ry="11" fill="#fff" stroke="${COLORS.line}" stroke-width="1.3" transform="rotate(-12 -6 -22)"/>` +
      `<ellipse cx="6" cy="-22" rx="4" ry="11" fill="#fff" stroke="${COLORS.line}" stroke-width="1.3" transform="rotate(12 6 -22)"/>` +
      `<circle r="12" fill="#fff" stroke="${COLORS.line}" stroke-width="1.4"/>` +
      `<circle cx="-4" cy="-1" r="1.5" fill="${COLORS.line}"/><circle cx="4" cy="-1" r="1.5" fill="${COLORS.line}"/>` +
      `<circle cx="-7" cy="4" r="2" fill="#ffb3c9"/><circle cx="7" cy="4" r="2" fill="#ffb3c9"/>` +
      `<path d="M-2,4 Q0,6 2,4" fill="none" stroke="${COLORS.line}" stroke-width="1"/></g>` +
      `<text x="120" y="93" text-anchor="middle" font-size="9" fill="${COLORS.line}" opacity=".8">pose coming soon</text>`
    );
  }

  window.PP_FIG = {
    hasPose: (id) => !!POSES[id],
    // Returns a full <svg> string for an exercise; falls back to an apparatus placeholder.
    svg(ex, { cls = "pose" } = {}) {
      const p = POSES[ex.id];
      const body = p ? renderPose(p) : placeholder(APPARATUS_OF[ex.apparatus] || "mat");
      // Extra 15px headroom above y=0 so upright kneeling/standing bunnies keep their ear tips.
      return `<svg class="${cls}" viewBox="0 -15 240 165" role="img" aria-label="${ex.name}">${body}</svg>`;
    },
    renderPose,
    joints,
  };
})();
