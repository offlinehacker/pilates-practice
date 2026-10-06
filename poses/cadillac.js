// Cadillac poses. Table surface y=86 (lying hip y≈80), top rail y=4. Push-through bar pivots at (220,54).
// Bar ends (ptb angle -> end): 145 (169,18), 150 (166,23), 160 (162,33), 165 (160,38), 170 (159,43),
// 175 (158,49), 180 (158,54), 185 (158,59), 190 (159,65), 195 (160,70).

// Supine Series (footwork): head toward the roll-down end, feet on the bottom-loaded PTB.
PP_POSE("cadillac-parallel-heels", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 114, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [156, 63], bend: 1, foot: 80 }, l2: { to: [157, 64], bend: 1, foot: 80 },
  move: [[130, 50, 152, 42]],
});
PP_POSE("cadillac-parallel-toes", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 114, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [155, 69], bend: 1, foot: 70 }, l2: { to: [156, 70], bend: 1, foot: 70 },
  move: [[130, 50, 152, 42]],
});
PP_POSE("cadillac-v-position-toes", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 120, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [155, 69], bend: 1, foot: 65 }, l2: { to: [156, 70], bend: 1, foot: 65 },
  move: [[130, 50, 152, 42]],
});
PP_POSE("cadillac-open-v-position-heels", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 122, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [156, 63], bend: 1, foot: 85 }, l2: { to: [157, 64], bend: 1, foot: 85 },
  move: [[130, 50, 152, 42]],
});
PP_POSE("cadillac-open-v-position-toes", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 122, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [155, 69], bend: 1, foot: 65 }, l2: { to: [156, 70], bend: 1, foot: 65 },
  move: [[130, 50, 152, 42]],
});
PP_POSE("cadillac-calf-raises", {
  app: "cadillac", ptb: 170, ptbSpring: "bottom", x: 120, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [156, 49], bend: 1, foot: 60 }, l2: { to: [157, 50], bend: 1, foot: 60 },
  move: [[146, 42, 150, 32]],
});
PP_POSE("cadillac-prances", {
  app: "cadillac", ptb: 170, ptbSpring: "bottom", x: 120, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [153, 53], bend: 1, foot: 95 }, l2: { to: [156, 49], bend: 1, foot: 60 },
  move: [[142, 44, 146, 34]],
});
PP_POSE("cadillac-single-leg-heel", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 114, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [156, 63], bend: 1, foot: 80 }, l2: [0, 0, -5],
  move: [[130, 50, 152, 42]],
});
PP_POSE("cadillac-single-leg-toes", {
  app: "cadillac", ptb: 190, ptbSpring: "bottom", x: 114, y: 80, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [155, 69], bend: 1, foot: 70 }, l2: [0, 0, -5],
  move: [[130, 50, 152, 42]],
});
// side-lying, head toward the posts, top hand on the pole, top knee bent with toes on the bar
PP_POSE("cadillac-hip-opener", {
  app: "cadillac", ptb: 170, ptbSpring: "bottom", x: 150, y: 80, t: 0, h: 0, look: 60,
  a1: { to: [219, 68], bend: 1 }, a2: [0, 0],
  l1: { to: [156, 47], bend: 1, foot: 75 }, l2: [180, 180, 180],
  move: [[164, 44, 172, 26]],
});

// Warm-up Series: roll-down bar (springs to the left post) and push-through bar roll-ups.
PP_POSE("cadillac-roll-up-with-rubar", {
  app: "cadillac", rollbar: [89, 36], x: 112, y: 81, t: 78, c: -5, h: 120, look: 190,
  a1: { to: [89, 36], bend: -1 }, a2: { to: [90, 37], bend: -1 },
  l1: [180, 180, 185], l2: [181, 181, 186],
  move: [[128, 34, 150, 60]],
});
PP_POSE("cadillac-mini-roll-up", {
  app: "cadillac", ptb: 162, x: 125, y: 80, t: 22, c: -3, h: 28, look: 110,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: { to: [89, 81], bend: -1, foot: 180 }, l2: { to: [90, 82], bend: -1, foot: 180 },
  move: [[148, 76, 160, 62]],
});
PP_POSE("cadillac-mini-roll-up-oblique", {
  app: "cadillac", ptb: 162, x: 125, y: 80, t: 25, c: -3, h: 32, look: 110,
  a1: { to: [171, 64], bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: { to: [89, 81], bend: -1, foot: 180 }, l2: { to: [90, 82], bend: -1, foot: 180 },
  move: [[148, 76, 160, 62]],
});
PP_POSE("cadillac-roll-up-with-ptbar", {
  app: "cadillac", ptb: 175, x: 123, y: 80, t: 0, h: 0, look: 90,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: [180, 180, 180], l2: [181, 181, 181],
  move: [[140, 70, 112, 48]],
});
PP_POSE("cadillac-roll-up-bottom-loaded", {
  app: "cadillac", ptb: 185, ptbSpring: "bottom", x: 99, y: 80, t: 0, h: 0, look: 90,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: [180, 180, 180], l2: [181, 181, 181],
  move: [[150, 50, 118, 42]],
});
// feet in straps hanging from the top frame (fuzzies)
PP_POSE("cadillac-bottom-lift-with-rubar", {
  app: "cadillac", rollbar: [56, 48], x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [56, 48], bend: 1 }, a2: { to: [57, 49], bend: 1 },
  l1: { to: [105, 35], bend: 1, foot: 157 }, l2: { to: [106, 36], bend: 1, foot: 157 },
  ropes: [[[105, 4], "ankle1"]],
  move: [[78, 72, 78, 56]],
});
PP_POSE("cadillac-breathing-with-ptbar", {
  app: "cadillac", ptb: 175, x: 117, y: 80, t: 0, h: 0, look: 90,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: { to: [98, 35], bend: -1, foot: 23 }, l2: { to: [97, 36], bend: -1, foot: 23 },
  ropes: [[[98, 4], "ankle1"]],
  move: [[110, 72, 110, 56]],
});

// Hip Supine Series (Basic Leg Springs): head at the left posts, hands on the poles,
// leg springs from the top frame to the feet.
PP_POSE("cadillac-hip-supine-series-basic-leg-springs-frog", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [85, 0, 90], l2: [87, 2, 92],
  springs: [[[38, 4], "ankle1"]],
  move: [[116, 58, 128, 44]],
});
PP_POSE("cadillac-hip-supine-series-basic-leg-springs-circles-down", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [88, 88, 88], l2: [91, 91, 91],
  springs: [[[38, 4], "ankle1"]],
  move: [[98, 30, 118, 50]],
});
PP_POSE("cadillac-hip-supine-series-basic-leg-springs-circles-up", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [38, 38, 38], l2: [40, 40, 40],
  springs: [[[38, 4], "ankle1"]],
  move: [[136, 56, 112, 28]],
});
PP_POSE("cadillac-walking", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [45, 45, 45], l2: [92, 92, 92],
  springs: [[[38, 4], "ankle1"], [[44, 4], "ankle2"]],
  move: [[126, 54, 108, 36]],
});
PP_POSE("cadillac-hip-supine-series-basic-leg-springs-bicycle", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [40, 40, 40], l2: [110, 10, 100],
  springs: [[[38, 4], "ankle1"], [[44, 4], "ankle2"]],
  move: [[104, 46, 124, 34]],
});

// Single Leg Supine Series: one leg in the spring, the other long on the mat.
PP_POSE("cadillac-single-leg-supine-series-frog", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [85, 0, 90], l2: [0, 0, -5],
  springs: [[[38, 4], "ankle1"]],
  move: [[116, 58, 128, 44]],
});
PP_POSE("cadillac-single-leg-supine-series-circles-down", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [88, 88, 88], l2: [0, 0, -5],
  springs: [[[38, 4], "ankle1"]],
  move: [[98, 30, 118, 50]],
});
PP_POSE("cadillac-single-leg-supine-series-circles-up", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [38, 38, 38], l2: [0, 0, -5],
  springs: [[[38, 4], "ankle1"]],
  move: [[136, 56, 112, 28]],
});
PP_POSE("cadillac-hip-extension", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [75, 75, 75], l2: [0, 0, -5],
  springs: [[[38, 4], "ankle1"]],
  move: [[110, 32, 138, 66]],
});
PP_POSE("cadillac-single-leg-supine-series-bicycle", {
  app: "cadillac", x: 86, y: 80, t: 180, h: 180, look: 90,
  a1: { to: [21, 70], bend: -1 }, a2: { to: [22, 71], bend: -1 },
  l1: [110, 10, 100], l2: [0, 0, -5],
  springs: [[[38, 4], "ankle1"]],
  move: [[108, 50, 128, 40]],
});

// Push-through bar, supine with head toward the posts (bar over the body).
PP_POSE("cadillac-monkey", {
  app: "cadillac", ptb: 176, x: 132, y: 80, t: 0, h: 0, look: 90,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: { to: [155, 53], bend: 1, foot: 60 }, l2: { to: [156, 54], bend: 1, foot: 60 },
  move: [[132, 74, 138, 58]],
});
PP_POSE("cadillac-tower-prep", {
  app: "cadillac", ptb: 158, ptbSpring: "bottom", x: 150, y: 80, t: 0, h: 0, look: 90,
  a1: { to: [220, 82], bend: 1 }, a2: { to: [220, 83], bend: 1 },
  l1: { to: [160, 33], bend: 1, foot: 75 }, l2: { to: [161, 34], bend: 1, foot: 75 },
  move: [[150, 74, 150, 58]],
});
PP_POSE("cadillac-shoulder-stretch-prone", {
  app: "cadillac", ptb: 178, x: 130, y: 80, t: 0, h: 0, look: -90,
  a1: { to: "ptb", bend: -1 }, a2: { to: [188, 82], bend: 1 },
  l1: [180, 180, 180], l2: [181, 181, 181],
});

// Seated / kneeling with the push-through bar and roll-down bar.
PP_POSE("cadillac-sitting-forward", {
  app: "cadillac", ptb: 142, x: 170, y: 81, t: 90, h: 90, look: 0,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: [0, 0, 90], l2: [1, 1, 91],
  move: [[160, 30, 180, 58]],
});
PP_POSE("cadillac-side-reach", {
  app: "cadillac", ptb: 142, x: 170, y: 81, t: 96, c: 4, h: 105, look: 10,
  a1: { to: "ptb", bend: 1 }, a2: [-100, -100],
  l1: [0, 0, 90], l2: [1, 1, 91],
  move: [[150, 30, 140, 50]],
});
PP_POSE("cadillac-thigh-stretch-with-rubar", {
  app: "cadillac", rollbar: [110, 33], x: 117.7, y: 64.3, t: 45, h: 50, look: 150,
  a1: { to: [110, 33], bend: -1 }, a2: { to: [111, 34], bend: -1 },
  l1: [-135, 0, -10], l2: [-133, 1, -9],
  move: [[162, 30, 174, 46]],
});
// key position: rounded over with the head between the arms
PP_POSE("cadillac-cat-stretch-kneeling", {
  app: "cadillac", ptb: 165, x: 112, y: 58, t: 50, c: 6, h: -25, look: -40,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: [-90, 180, 185], l2: [-92, 181, 186],
  move: [[166, 30, 172, 50]],
});

// Arms Standing Series: standing on the floor beside the left posts, arm springs from the post.
PP_POSE("cadillac-chest-expansion", {
  app: "cadillac", x: 70, y: 84, t: 90, h: 90, look: 180,
  a1: [-118, -118], a2: [-122, -122],
  l1: [-88, -88, 180], l2: [-92, -92, 180],
  springs: [[[18, 38], "hand1"]],
  move: [[50, 88, 66, 100]],
});
PP_POSE("cadillac-hug-a-tree", {
  app: "cadillac", x: 82, y: 84, t: 80, h: 85, look: 0,
  a1: [172, 178], a2: [168, 174],
  l1: [-80, -80, 0], l2: [-100, -100, 0],
  springs: [[[18, 40], "hand1"]],
  move: [[60, 40, 100, 40]],
});
PP_POSE("cadillac-arms-standing-series-circles-up", {
  app: "cadillac", x: 82, y: 84, t: 80, h: 85, look: 0,
  a1: [-30, -30], a2: [-34, -34],
  l1: [-80, -80, 0], l2: [-100, -100, 0],
  springs: [[[18, 40], "hand1"]],
  move: [[124, 72, 128, 30]],
});
PP_POSE("cadillac-arms-standing-series-circles-down", {
  app: "cadillac", x: 82, y: 84, t: 80, h: 85, look: 0,
  a1: [40, 40], a2: [36, 36],
  l1: [-80, -80, 0], l2: [-100, -100, 0],
  springs: [[[18, 40], "hand1"]],
  move: [[128, 26, 126, 70]],
});
PP_POSE("cadillac-punches", {
  app: "cadillac", x: 82, y: 84, t: 80, h: 85, look: 0,
  a1: [185, 30], a2: [181, 26],
  l1: [-80, -80, 0], l2: [-100, -100, 0],
  springs: [[[18, 40], "hand1"]],
  move: [[100, 38, 124, 38]],
});
PP_POSE("cadillac-biceps", {
  app: "cadillac", x: 82, y: 84, t: 80, h: 85, look: 0,
  a1: [185, 185], a2: [181, 181],
  l1: [-80, -80, 0], l2: [-100, -100, 0],
  springs: [[[18, 40], "hand1"]],
  move: [[54, 62, 70, 40]],
});

// Push Through Group seated: sitting sideways is drawn face-on (cross-legged, arms out to the sides).
PP_POSE("cadillac-shoulder-adduction-single-arm", {
  app: "cadillac", ptb: 150, x: 148, y: 81, t: 98, h: 95, look: -80,
  a1: { to: "ptb", bend: -1 }, a2: { to: [118, 84], bend: 1 },
  l1: [-5, 185, 175], l2: [185, -5, 5],
  move: [[174, 26, 168, 50]],
});
PP_POSE("cadillac-shoulder-adduction-double-arm", {
  app: "cadillac", ptb: 150, x: 150, y: 81, t: 90, h: 95, look: 5,
  a1: { to: "ptb", bend: 1 }, a2: { to: "ptb", bend: 1 },
  l1: [-50, -90, 0], l2: [-46, -86, 4],
  move: [[174, 26, 168, 50]],
});
PP_POSE("cadillac-scapular-glide", {
  app: "cadillac", ptb: 150, x: 148, y: 81, t: 98, h: 95, look: -80,
  a1: { to: "ptb", bend: -1 }, a2: { to: [118, 84], bend: 1 },
  l1: [-5, 185, 175], l2: [185, -5, 5],
  move: [[176, 18, 172, 30]],
});
PP_POSE("cadillac-sitting-side-prep", {
  app: "cadillac", ptb: 145, x: 146, y: 81, t: 98, h: 95, look: -80,
  a1: { to: "ptb", bend: -1 }, a2: { to: [116, 84], bend: 1 },
  l1: [-5, 185, 175], l2: [185, -5, 5],
  move: [[176, 14, 172, 28]],
});
PP_POSE("cadillac-sitting-side", {
  app: "cadillac", ptb: 160, x: 146, y: 81, t: 115, c: -6, h: 135, look: -50,
  a1: { to: "ptb", bend: -1 }, a2: { to: [112, 84], bend: 1 },
  l1: [-5, 185, 175], l2: [185, -5, 5],
  move: [[140, 30, 118, 44]],
});

// Push Through Group lying: head toward the posts, top-loaded bar overhead.
PP_POSE("cadillac-side-lift", {
  app: "cadillac", ptb: 175, x: 126, y: 80, t: 0, h: 0, look: 60,
  a1: { to: "ptb", bend: 1 }, a2: [0, 0],
  l1: [180, 180, 180], l2: [184, 184, 184],
  move: [[178, 70, 180, 54]],
});
PP_POSE("cadillac-prone-1", {
  app: "cadillac", ptb: 177, x: 113, y: 80, t: 0, h: 0, look: -90,
  a1: { to: "ptb", bend: -1 }, a2: { to: "ptb", bend: -1 },
  l1: [180, 180, 180], l2: [181, 181, 181],
  move: [[150, 72, 142, 60]],
});
PP_POSE("cadillac-prone-2", {
  app: "cadillac", ptb: 185, x: 95, y: 80, t: 25, c: -3, h: 35, look: 0,
  a1: { to: "ptb", bend: -1 }, a2: { to: "ptb", bend: -1 },
  l1: [180, 180, 180], l2: [181, 181, 181],
  move: [[140, 52, 128, 40]],
});
