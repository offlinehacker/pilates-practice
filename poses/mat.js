// Mat poses. Mat surface is y=128; a lying body's hip/shoulder sit at y≈122, a sitting hip at y≈123.
// Supine/prone bodies lie head-left (t≈180); seated bodies face right.

// Warm-up: supine, knees bent or in tabletop
PP_POSE("mat-pelvic-curl", {
  app: "mat", x: 113, y: 108, t: 204, h: 180, look: 90,
  a1: [-4, -2], a2: [-6, -3],
  l1: { to: [141, 122], bend: 1, foot: 0 }, l2: { to: [143, 122], bend: 1, foot: 0 },
  move: [[113, 120, 113, 104]],
});
PP_POSE("mat-spine-twist-supine", {
  app: "mat", x: 135, y: 122, t: 180, h: 172, look: 90,
  a1: [-6, -2], a2: [-8, -3],
  l1: [90, -2, -2], l2: [92, 0, 0],
  move: [[166, 92, 172, 110]],
});
PP_POSE("mat-chest-lift", {
  app: "mat", x: 135, y: 122, t: 158, c: 5, h: 145, look: 50,
  a1: { to: [86, 106], bend: -1 }, a2: { to: [88, 104], bend: -1 },
  l1: { to: [167, 124], bend: 1, foot: 0 }, l2: { to: [169, 124], bend: 1, foot: 0 },
  move: [[96, 90, 106, 84]],
});
PP_POSE("mat-chest-lift-with-rotation", {
  app: "mat", x: 135, y: 122, t: 155, c: 5, h: 140, look: 40,
  a1: { to: [87, 104], bend: -1 }, a2: [40, 140],
  l1: { to: [167, 124], bend: 1, foot: 0 }, l2: { to: [169, 124], bend: 1, foot: 0 },
  move: [[104, 92, 124, 86]],
});
PP_POSE("mat-single-leg-lift", {
  app: "mat", x: 135, y: 122, t: 180, h: 172, look: 90,
  a1: [-3, -2], a2: [-5, -3],
  l1: [90, -2, -2], l2: { to: [167, 124], bend: 1, foot: 0 },
  move: [[172, 118, 172, 102]],
});
PP_POSE("mat-leg-changes", {
  app: "mat", x: 135, y: 122, t: 180, h: 172, look: 90,
  a1: [-3, -2], a2: [-5, -3],
  l1: [90, -2, -2], l2: { to: [162, 116], bend: 1, foot: -15 },
  move: [[176, 104, 176, 118]],
});
PP_POSE("mat-rest-position", {
  app: "mat", x: 150, y: 110, t: 190, c: -4, h: 192, look: 240,
  a1: [184, 180], a2: [186, 182],
  l1: { to: [153, 124], bend: -1, foot: 0 }, l2: { to: [154, 123], bend: -1, foot: 0 },
});

// Abdominal work: supine, head and chest lifted
PP_POSE("mat-hundred-prep", {
  app: "mat", x: 135, y: 122, t: 180, h: 172, look: 90,
  a1: [166, 170], a2: [164, 168],
  l1: [90, -2, -2], l2: [92, 0, 0],
});
PP_POSE("mat-leg-circles", {
  app: "mat", x: 135, y: 122, t: 180, h: 172, look: 90,
  a1: [-3, -2], a2: [-5, -3],
  l1: [90, 90, 180], l2: [-1, -1, -1],
  move: [[120, 64, 132, 56], [148, 58, 152, 72]],
});
PP_POSE("mat-roll-up", {
  app: "mat", x: 112, y: 123, t: 140, c: 6, h: 105, look: 15,
  a1: [8, 2], a2: [10, 4],
  l1: [-1, -1, -1], l2: [0, 0, 0],
  move: [[68, 118, 74, 98]],
});
PP_POSE("mat-hundred", {
  app: "mat", x: 135, y: 122, t: 158, c: 5, h: 148, look: 40,
  a1: [-10, -6], a2: [-8, -4],
  l1: [38, 38, 38], l2: [40, 40, 40],
  move: [[118, 96, 118, 104], [126, 104, 126, 96]],
});
PP_POSE("mat-double-leg-stretch", {
  app: "mat", x: 135, y: 122, t: 158, c: 5, h: 148, look: 40,
  a1: [150, 150], a2: [148, 148],
  l1: [32, 32, 32], l2: [34, 34, 34],
  move: [[82, 88, 70, 80], [178, 90, 192, 82]],
});
PP_POSE("mat-single-leg-stretch", {
  app: "mat", x: 135, y: 122, t: 155, c: 5, h: 145, look: 40,
  a1: { to: [136, 97], bend: 1 }, a2: { to: [128, 97], bend: 1 },
  l1: [115, 0, 0], l2: [28, 28, 28],
  move: [[180, 84, 160, 90]],
});
PP_POSE("mat-criss-cross", {
  app: "mat", x: 135, y: 122, t: 152, c: 5, h: 138, look: 30,
  a1: { to: [88, 104], bend: -1 }, a2: [30, 150],
  l1: [115, 0, 0], l2: [28, 28, 28],
  move: [[100, 90, 120, 82]],
});
PP_POSE("mat-hamstring-pull-1", {
  app: "mat", x: 135, y: 122, t: 150, c: 5, h: 140, look: 40,
  a1: { to: [131, 86], bend: 1 }, a2: { to: [133, 84], bend: 1 },
  l1: [95, 95, 95], l2: [12, 12, 12],
  move: [[150, 66, 166, 80], [190, 104, 180, 90]],
});
PP_POSE("mat-hamstring-pull-2", {
  app: "mat", x: 135, y: 122, t: 158, c: 5, h: 145, look: 50,
  a1: { to: [86, 106], bend: -1 }, a2: { to: [88, 104], bend: -1 },
  l1: [90, 90, 90], l2: [92, 92, 92],
  move: [[146, 66, 168, 84]],
});
PP_POSE("mat-hamstring-pull-3", {
  app: "mat", x: 135, y: 122, t: 152, c: 5, h: 138, look: 30,
  a1: { to: [88, 104], bend: -1 }, a2: [35, 140],
  l1: [95, 95, 95], l2: [8, 8, 8],
  move: [[100, 90, 120, 82]],
});

// Seated balance / rolling
PP_POSE("mat-teaser-prep", {
  app: "mat", x: 118, y: 123, t: 120, h: 105, look: 15,
  a1: [8, 8], a2: [10, 10],
  l1: [50, 0, 0], l2: [52, 2, 2],
  move: [[78, 92, 84, 76]],
});
PP_POSE("mat-rolling-like-a-ball", {
  app: "mat", x: 120, y: 122, t: 115, c: 7, h: 70, look: -10,
  a1: { to: [133, 105], bend: 1 }, a2: { to: [131, 103], bend: 1 },
  l1: [85, -40, -40], l2: [87, -38, -38],
  move: [[96, 132, 80, 120]],
});
PP_POSE("mat-spine-stretch", {
  app: "mat", x: 100, y: 123, t: 62, c: 6, h: 15, look: -40,
  a1: [-5, -5], a2: [-3, -3],
  l1: [0, 0, 90], l2: [1, 1, 91],
  move: [[150, 80, 166, 86]],
});
PP_POSE("mat-roll-over", {
  app: "mat", x: 122, y: 90, t: 253, h: 172, look: 70,
  a1: [-2, -1], a2: [-4, -2],
  l1: [182, 182, 182], l2: [184, 184, 184],
  move: [[66, 98, 68, 116]],
});
PP_POSE("mat-open-leg-rocker", {
  app: "mat", x: 112, y: 123, t: 112, h: 100, look: 20,
  a1: { to: [129, 82], bend: 1 }, a2: { to: [127, 80], bend: 1 },
  l1: [66, 66, 66], l2: [70, 70, 70],
  move: [[96, 132, 80, 120]],
});
PP_POSE("mat-crab", {
  app: "mat", x: 120, y: 122, t: 112, c: 8, h: 40, look: -40,
  a1: { to: [143, 113], bend: 1 }, a2: { to: [141, 111], bend: 1 },
  l1: [80, -30, -50], l2: [84, -26, -46],
  move: [[96, 132, 80, 120]],
});
PP_POSE("mat-seal-puppy", {
  app: "mat", x: 120, y: 122, t: 118, c: 7, h: 75, look: -5,
  a1: { to: [143, 116], bend: -1 }, a2: { to: [141, 114], bend: -1 },
  l1: [72, -45, -40], l2: [96, -32, -30],
  move: [[96, 132, 80, 120]],
});

// Quadruped and supports
PP_POSE("mat-cat-stretch", {
  app: "mat", x: 134, y: 99, t: 168, c: -6, h: 212, look: 260,
  a1: [-90, -90], a2: [-92, -92],
  l1: [-90, 0, 0], l2: [-88, 1, 1],
  move: [[118, 82, 118, 70]],
});
PP_POSE("mat-front-support", {
  app: "mat", x: 122, y: 102.6, t: 162, h: 165, look: 220,
  a1: [-90, -90], a2: [-92, -92],
  l1: [-18, -18, -75], l2: [-17, -17, -74],
});
PP_POSE("mat-back-support", {
  app: "mat", x: 120, y: 104, t: 159, h: 160, look: 70,
  a1: [-90, -90], a2: [-92, -92],
  l1: [-20, -20, -35], l2: [-21, -21, -36],
  move: [[120, 122, 120, 106]],
});
PP_POSE("mat-leg-pull-back", {
  app: "mat", x: 120, y: 104, t: 159, h: 160, look: 70,
  a1: [-90, -90], a2: [-92, -92],
  l1: [50, 50, 50], l2: [-21, -21, -36],
  move: [[176, 84, 166, 60]],
});
PP_POSE("mat-leg-pull-front", {
  app: "mat", x: 122, y: 102.6, t: 162, h: 165, look: 220,
  a1: [-90, -90], a2: [-92, -92],
  l1: [-4, -4, -10], l2: [-18, -18, -75],
  move: [[178, 108, 180, 96]],
});
PP_POSE("mat-shoulder-bridge-prep", {
  app: "mat", x: 113, y: 108, t: 204, h: 180, look: 90,
  a1: [-4, -2], a2: [-6, -3],
  l1: [72, -2, -2], l2: { to: [143, 122], bend: 1, foot: 0 },
  move: [[150, 98, 150, 86]],
});

// Lateral flexion / rotation (side view; arrows hint at the motion)
PP_POSE("mat-side-lifts", {
  app: "mat", x: 135, y: 122, t: 180, h: 168, look: 60,
  a1: { to: [118, 125], bend: 1 }, a2: [178, 180],
  l1: [8, 8, 8], l2: [10, 10, 10],
  move: [[192, 118, 194, 102]],
});
PP_POSE("mat-saw", {
  app: "mat", x: 100, y: 123, t: 58, c: 4, h: 15, look: -50,
  a1: { to: [150, 112], bend: 1 }, a2: [185, 195],
  l1: [0, 0, 90], l2: [1, 1, 91],
  move: [[132, 90, 152, 104]],
});
PP_POSE("mat-spine-twist", {
  app: "mat", x: 110, y: 123, t: 90, h: 90, look: 10,
  a1: [0, 0], a2: [180, 180],
  l1: [0, 0, 90], l2: [1, 1, 91],
  move: [[136, 80, 124, 72], [84, 98, 96, 106]],
});
PP_POSE("mat-corkscrew", {
  app: "mat", x: 135, y: 122, t: 180, h: 172, look: 90,
  a1: [-3, -2], a2: [-5, -3],
  l1: [100, 100, 100], l2: [102, 102, 102],
  move: [[116, 68, 134, 60], [146, 62, 152, 80]],
});
PP_POSE("mat-side-kick", {
  app: "mat", x: 135, y: 122, t: 157, h: 150, look: 60,
  a1: { to: [91, 104], bend: -1 }, a2: [-92, 122],
  l1: [8, 8, 0], l2: [0, -1, -1],
  move: [[196, 104, 210, 94]],
});

// Back extension: prone
PP_POSE("mat-back-extension", {
  app: "mat", x: 135, y: 122, t: 172, h: 168, look: 220,
  a1: [-4, -2], a2: [-5, -3],
  l1: [-1, -1, -1], l2: [0, 0, 0],
  move: [[106, 110, 104, 100]],
});
PP_POSE("mat-single-leg-kick", {
  app: "mat", x: 135, y: 122, t: 152, h: 160, look: 210,
  a1: [-90, 180], a2: [-88, 178],
  l1: [-2, 118, 118], l2: [1, 1, 1],
  move: [[164, 98, 152, 92]],
});
PP_POSE("mat-double-leg-kick", {
  app: "mat", x: 135, y: 122, t: 180, h: 170, look: 230,
  a1: { to: [128, 114], bend: 1 }, a2: { to: [126, 112], bend: 1 },
  l1: [-1, 125, 125], l2: [0, 122, 122],
  move: [[160, 96, 150, 92]],
});
PP_POSE("mat-swimming", {
  app: "mat", x: 135, y: 122, t: 168, h: 160, look: 210,
  a1: [158, 160], a2: [172, 174],
  l1: [8, 8, 8], l2: [2, 2, 2],
  move: [[64, 100, 64, 112], [194, 106, 194, 116]],
});
PP_POSE("mat-rocking-prep", {
  app: "mat", x: 140, y: 121, t: 152, h: 150, look: 200,
  a1: { to: [143, 104] }, a2: { to: [141, 102] },
  l1: [6, 140, 140], l2: [8, 142, 142],
  move: [[118, 96, 118, 84]],
});
