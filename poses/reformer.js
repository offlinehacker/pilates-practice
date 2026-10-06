// Reformer poses. Carriage surface y=88 (lying hip/shoulder y≈82), footbar top at (208,66),
// pulley at (16,66). carriage: px moved away from the footbar.

// Footwork (supine, feet on footbar)
PP_POSE("reformer-parallel-heels", {
  app: "reformer", carriage: 0, x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [206, 63], bend: 1, foot: 75 }, l2: { to: [207, 64], bend: 1, foot: 75 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-parallel-toes", {
  app: "reformer", carriage: 0, x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-v-position-toes", {
  app: "reformer", carriage: 0, x: 166, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [203, 71], bend: 1, foot: 58 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-open-v-position-heels", {
  app: "reformer", carriage: 0, x: 166, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [206, 63], bend: 1, foot: 75 }, l2: { to: [205, 62], bend: 1, foot: 72 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-open-v-position-toes", {
  app: "reformer", carriage: 0, x: 166, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [203, 71], bend: 1, foot: 58 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-calf-raises", {
  app: "reformer", carriage: 8, x: 158, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [206, 74], bend: 1, foot: 80 }, l2: { to: [207, 74], bend: 1, foot: 80 },
  move: [[217, 88, 217, 62]],
});
PP_POSE("reformer-prances", {
  app: "reformer", carriage: 6, x: 158, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [206, 74], bend: 1, foot: 80 }, l2: { to: [200, 61], bend: 1, foot: -15 },
  move: [[217, 88, 217, 62]],
});
PP_POSE("reformer-prehensile", {
  app: "reformer", carriage: 0, x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [202, 73], bend: 1, foot: 40 }, l2: { to: [203, 73], bend: 1, foot: 40 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-single-leg-heel", {
  app: "reformer", carriage: 0, x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [206, 63], bend: 1, foot: 75 }, l2: [90, 0, 10],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-single-leg-toes", {
  app: "reformer", carriage: 0, x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: [90, 0, 10],
  move: [[150, 104, 120, 104]],
});

// Hundred / Coordination (supine, hands in straps)
PP_POSE("reformer-hundred-prep", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [90, 90], a2: [92, 92], l1: [90, 0, 10], l2: [92, 2, 12],
  straps: ["hand1", "hand2"], move: [[142, 48, 156, 70]],
});
PP_POSE("reformer-hundred", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 160, c: 3, h: 140, look: 50,
  a1: [-8, -8], a2: [-6, -6], l1: [42, 42, 42], l2: [44, 44, 44],
  straps: ["hand1", "hand2"], move: [[172, 64, 172, 76]],
});
PP_POSE("reformer-coordination", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 160, c: 3, h: 140, look: 50,
  a1: [-12, -12], a2: [-10, -10], l1: [28, 28, 28], l2: [30, 30, 30],
  straps: ["hand1", "hand2"], move: [[205, 60, 188, 52]],
});

// Short Box Series (sitting on box, feet under the foot strap)
PP_POSE("reformer-short-box-series-round-back", {
  app: "reformer", box: "short", footstrap: true, x: 162, y: 66, t: 120, c: 7, h: 85, look: -10,
  a1: { to: [154, 40], bend: -1 }, a2: { to: [152, 41], bend: -1 },
  l1: { to: [192, 94], bend: 1, foot: 10 }, l2: { to: [193, 94], bend: 1, foot: 10 },
  move: [[138, 30, 122, 46]],
});
PP_POSE("reformer-short-box-series-flat-back", {
  app: "reformer", box: "short", footstrap: true, x: 162, y: 66, t: 125, h: 125, look: 35,
  a1: { to: [128, 29], bend: -1 }, a2: { to: [129, 30], bend: -1 },
  l1: { to: [192, 94], bend: 1, foot: 10 }, l2: { to: [193, 94], bend: 1, foot: 10 },
  move: [[150, 24, 128, 42]],
});
PP_POSE("reformer-tilt", {
  app: "reformer", box: "short", footstrap: true, x: 162, y: 66, t: 115, h: 115, look: 25,
  a1: [115, 115], a2: [117, 117],
  l1: { to: [192, 94], bend: 1, foot: 10 }, l2: { to: [193, 94], bend: 1, foot: 10 },
  move: [[118, 16, 104, 32]],
});
PP_POSE("reformer-twist", {
  app: "reformer", box: "short", footstrap: true, x: 162, y: 66, t: 110, h: 105, look: 15,
  a1: { to: [139, 22], bend: -1 }, a2: { to: [140, 23], bend: -1 },
  l1: { to: [192, 94], bend: 1, foot: 10 }, l2: { to: [193, 94], bend: 1, foot: 10 },
  move: [[176, 40, 160, 46]],
});
PP_POSE("reformer-side-over-on-box", {
  app: "reformer", box: "short", footstrap: true, x: 156, y: 66, t: 145, h: 145, look: 55,
  a1: [55, 190], a2: [235, 97],
  l1: { to: [192, 95], bend: 1, foot: 55 }, l2: [-10, 195, 180],
  move: [[104, 46, 110, 70]],
});

// Abdominals Legs in Straps (head toward footbar, straps above knees)
PP_POSE("reformer-double-leg", {
  app: "reformer", footbar: "down", x: 136, y: 82, t: 18, c: -3, h: 40, look: 120,
  a1: { to: [176, 58], bend: 1 }, a2: { to: [177, 59], bend: 1 },
  l1: [90, 180, 190], l2: [92, 182, 192],
  straps: ["knee1", "knee2"], move: [[120, 40, 105, 62]],
});
PP_POSE("reformer-double-leg-with-rotation", {
  app: "reformer", footbar: "down", x: 136, y: 82, t: 20, c: -3, h: 45, look: 120,
  a1: { to: [178, 56], bend: 1 }, a2: { to: [176, 60], bend: 1 },
  l1: [90, 180, 190], l2: [92, 182, 192],
  straps: ["knee1", "knee2"], move: [[150, 46, 176, 38]],
});

// Long Box Group
PP_POSE("reformer-teaser-prep", {
  app: "reformer", box: "long", x: 150, y: 64, t: 135, h: 120, look: 30,
  a1: [15, 15], a2: [17, 17], l1: [70, 0, 10], l2: [72, 2, 12],
  straps: ["hand1", "hand2"], move: [[100, 76, 110, 58]],
});
PP_POSE("reformer-hamstring-curl", {
  app: "reformer", box: "long", x: 140, y: 64, t: 8, h: 20, look: -20,
  a1: { to: [185, 78], bend: -1 }, a2: { to: [184, 80], bend: -1 },
  l1: [176, 176, 180], l2: [178, 178, 182],
  straps: ["ankle1", "ankle2"], move: [[88, 54, 100, 38]],
});
PP_POSE("reformer-breaststroke-prep-1", {
  app: "reformer", box: "long", x: 146, y: 64, t: 2, h: 30, look: -30,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: [180, 180, 180], l2: [182, 182, 182],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-breaststroke-prep-2", {
  app: "reformer", box: "long", carriage: 6, x: 142, y: 64, t: 6, c: -2, h: 40, look: -10,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: [180, 180, 180], l2: [182, 182, 182],
  move: [[144, 104, 114, 104]],
});
PP_POSE("reformer-breaststroke", {
  app: "reformer", box: "long", footbar: "down", carriage: 6, x: 140, y: 64, t: 10, c: -2, h: 30, look: -10,
  a1: [10, 10], a2: [12, 12], l1: [180, 180, 180], l2: [182, 182, 182],
  straps: ["hand1", "hand2"], move: [[210, 46, 220, 40]],
});
PP_POSE("reformer-pulling-straps-1", {
  app: "reformer", box: "long", footbar: "down", carriage: 10, x: 150, y: 64, t: 176, h: 175, look: 200,
  a1: [195, 195], a2: [193, 193], l1: [0, 0, 0], l2: [-2, -2, -2],
  straps: ["hand1", "hand2"], move: [[84, 84, 104, 84]],
});
PP_POSE("reformer-pulling-straps-2", {
  app: "reformer", box: "long", footbar: "down", carriage: 14, x: 146, y: 64, t: 170, c: 2, h: 160, look: 190,
  a1: [-12, -10], a2: [-14, -12], l1: [0, 0, 0], l2: [-2, -2, -2],
  straps: ["hand1", "hand2"], move: [[112, 42, 134, 50]],
});

// Hip Supine Series (feet in straps)
PP_POSE("reformer-frog", {
  app: "reformer", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [105, -15, 25], l2: [107, -13, 27],
  straps: ["foot1", "foot2"], move: [[194, 60, 214, 48]],
});
PP_POSE("reformer-hip-supine-series-circles-down", {
  app: "reformer", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [90, 90, 85], l2: [92, 92, 87],
  straps: ["foot1", "foot2"], move: [[178, 30, 206, 60]],
});
PP_POSE("reformer-hip-supine-series-circles-up", {
  app: "reformer", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [50, 50, 45], l2: [52, 52, 47],
  straps: ["foot1", "foot2"], move: [[206, 30, 180, 22]],
});
PP_POSE("reformer-openings", {
  app: "reformer", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [55, 55, 50], l2: [57, 57, 52],
  straps: ["foot1", "foot2"], move: [[206, 54, 216, 44]],
});
PP_POSE("reformer-frog-extended", {
  app: "reformer", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [110, -5, 30], l2: [112, -3, 32],
  straps: ["foot1", "foot2"], move: [[188, 52, 188, 28]],
});
PP_POSE("reformer-frog-extended-reverse", {
  app: "reformer", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [90, 90, 85], l2: [92, 92, 87],
  straps: ["foot1", "foot2"], move: [[176, 28, 176, 52]],
});

// Spinal articulation (supine, headrest down)
PP_POSE("reformer-bottom-lift", {
  app: "reformer", headrest: "down", x: 160, y: 64, t: 211, h: 180, look: 90,
  a1: [-4, -3], a2: [-6, -4],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[176, 76, 176, 54]],
});
PP_POSE("reformer-bottom-lift-with-extension", {
  app: "reformer", headrest: "down", carriage: 6, x: 155, y: 65, t: 210, h: 180, look: 90,
  a1: [-4, -3], a2: [-6, -4],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[144, 104, 114, 104]],
});
PP_POSE("reformer-short-spine", {
  app: "reformer", headrest: "down", x: 140, y: 49, t: 256, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [170, 35, 45], l2: [172, 37, 47],
  straps: ["foot1", "foot2"], move: [[156, 36, 170, 62]],
});
PP_POSE("reformer-long-spine", {
  app: "reformer", headrest: "down", x: 140, y: 49, t: 256, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5], l1: [150, 150, 150], l2: [152, 152, 152],
  straps: ["foot1", "foot2"], move: [[150, 30, 176, 46]],
});
PP_POSE("reformer-semi-circle", {
  app: "reformer", headrest: "down", carriage: 10, x: 161, y: 59, t: 222, c: -3, h: 180, look: 90,
  a1: { to: [118, 75], bend: -1 }, a2: { to: [119, 76], bend: -1 },
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-semi-circle-reverse", {
  app: "reformer", headrest: "down", carriage: 10, x: 161, y: 59, t: 222, c: -3, h: 180, look: 90,
  a1: { to: [118, 75], bend: -1 }, a2: { to: [119, 76], bend: -1 },
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[120, 104, 150, 104]],
});

// Hamstring stretch / Knee Stretch Group (hands on footbar)
PP_POSE("reformer-lunge-standing", {
  app: "reformer", x: 166, y: 62, t: 42, h: 42, look: -20,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [194, 95], bend: 1, foot: 0 }, l2: [-116, 180, 90],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-scooter", {
  app: "reformer", carriage: 20, x: 160, y: 84, t: 55, c: 5, h: 20, look: -40,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [166, 131], bend: 1, foot: 0 }, l2: { to: [113, 82], bend: 1, foot: 90 },
  move: [[140, 104, 110, 104]],
});
PP_POSE("reformer-scooter-flat-back", {
  app: "reformer", carriage: 20, x: 160, y: 84, t: 50, h: 50, look: -20,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [166, 131], bend: 1, foot: 0 }, l2: { to: [113, 82], bend: 1, foot: 90 },
  move: [[140, 104, 110, 104]],
});
PP_POSE("reformer-knee-stretch-group-round-back", {
  app: "reformer", x: 164, y: 60, t: 38, c: 6, h: -10, look: -60,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: [-100, 180, 180], l2: [-102, 180, 180],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-knee-stretch-group-flat-back", {
  app: "reformer", x: 164, y: 60, t: 37, h: 37, look: -30,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: [-100, 180, 180], l2: [-102, 180, 180],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-knee-stretch-reverse", {
  app: "reformer", x: 132, y: 60, t: 192, c: -6, h: 230, look: 250,
  a1: { to: [100, 99], bend: 1 }, a2: { to: [98, 99], bend: 1 },
  l1: [-88, 0, 0], l2: [-90, 0, 0],
  move: [[150, 104, 126, 104]],
});

// Up Stretch Group / Down Stretch
PP_POSE("reformer-up-stretch-1", {
  app: "reformer", x: 150, y: 33, t: -30, h: -50, look: -140,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [132, 77], bend: 1, foot: -55 }, l2: { to: [133, 77], bend: 1, foot: -55 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-elephant", {
  app: "reformer", x: 147, y: 36, t: -27, c: 6, h: -75, look: -160,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [134, 83], bend: 1, foot: 0 }, l2: { to: [135, 83], bend: 1, foot: 0 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-up-stretch-2", {
  app: "reformer", carriage: 16, x: 157, y: 49, t: 14, h: 0, look: -70,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [117, 77], bend: 1, foot: -55 }, l2: { to: [118, 77], bend: 1, foot: -55 },
  move: [[134, 104, 104, 104]],
});
PP_POSE("reformer-long-stretch", {
  app: "reformer", carriage: 18, x: 159, y: 56, t: 27, h: 27, look: -50,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: { to: [115, 78], bend: 1, foot: -55 }, l2: { to: [116, 78], bend: 1, foot: -55 },
  move: [[132, 104, 102, 104]],
});
PP_POSE("reformer-down-stretch", {
  app: "reformer", x: 172, y: 64, t: 48, c: -4, h: 105, look: 50,
  a1: { to: [207, 66], bend: -1 }, a2: { to: [208, 67], bend: -1 },
  l1: [-124, 180, 180], l2: [-126, 180, 180],
  move: [[150, 104, 120, 104]],
});

// Stomach Massage Group (sitting, feet on footbar)
PP_POSE("reformer-stomach-massage-round-back", {
  app: "reformer", x: 170, y: 82, t: 66, c: 7, h: 30, look: -40,
  a1: { to: [187, 84], bend: -1 }, a2: { to: [186, 85], bend: -1 },
  l1: { to: [203, 72], bend: 1, foot: 62 }, l2: { to: [204, 72], bend: 1, foot: 62 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-stomach-massage-flat-back", {
  app: "reformer", x: 158, y: 82, t: 108, h: 100, look: 10,
  a1: { to: [129, 75], bend: 1 }, a2: { to: [128, 76], bend: 1 },
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-stomach-massage-reaching", {
  app: "reformer", x: 160, y: 82, t: 95, h: 95, look: 10,
  a1: [40, 40], a2: [42, 42],
  l1: { to: [204, 72], bend: 1, foot: 62 }, l2: { to: [205, 72], bend: 1, foot: 62 },
  move: [[150, 104, 120, 104]],
});

// Arms Supine Series (legs tabletop, hands in straps)
PP_POSE("reformer-extension", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [90, 90], a2: [92, 92], l1: [90, 0, 10], l2: [92, 2, 12],
  straps: ["hand1", "hand2"], move: [[142, 48, 156, 70]],
});
PP_POSE("reformer-adduction", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [40, 40], a2: [42, 42], l1: [90, 0, 10], l2: [92, 2, 12],
  straps: ["hand1", "hand2"], move: [[160, 58, 166, 74]],
});
PP_POSE("reformer-arms-supine-series-circles-up", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-4, -4], a2: [-6, -6], l1: [90, 0, 10], l2: [92, 2, 12],
  straps: ["hand1", "hand2"], move: [[156, 70, 140, 48]],
});
PP_POSE("reformer-arms-supine-series-circles-down", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [115, 115], a2: [117, 117], l1: [90, 0, 10], l2: [92, 2, 12],
  straps: ["hand1", "hand2"], move: [[124, 44, 150, 64]],
});
PP_POSE("reformer-arms-supine-series-triceps", {
  app: "reformer", footbar: "down", x: 164, y: 82, t: 180, h: 180, look: 90,
  a1: [-4, 95], a2: [-6, 93], l1: [90, 0, 10], l2: [92, 2, 12],
  straps: ["hand1", "hand2"], move: [[154, 58, 164, 76]],
});

// Arms Sitting Series
PP_POSE("reformer-arms-sitting-series-chest-expansion", {
  app: "reformer", footbar: "down", x: 180, y: 82, t: 90, h: 90, look: 180,
  a1: [240, 240], a2: [238, 238], l1: [180, 180, 90], l2: [182, 182, 92],
  straps: ["hand1", "hand2"], move: [[156, 78, 186, 84]],
});
PP_POSE("reformer-arms-sitting-series-biceps", {
  app: "reformer", footbar: "down", x: 180, y: 82, t: 90, h: 90, look: 180,
  a1: [180, 115], a2: [182, 117], l1: [180, 180, 90], l2: [182, 182, 92],
  straps: ["hand1", "hand2"], move: [[150, 46, 158, 30]],
});
PP_POSE("reformer-rhomboids-1", {
  app: "reformer", footbar: "down", x: 180, y: 82, t: 90, h: 90, look: 180,
  a1: [180, 90], a2: [182, 92], l1: [180, 180, 90], l2: [182, 182, 92],
  straps: ["elbow1", "elbow2"], move: [[158, 54, 178, 54]],
});
PP_POSE("reformer-hug-a-tree", {
  app: "reformer", x: 136, y: 82, t: 90, h: 90, look: 0,
  a1: [-5, 10], a2: [-3, 12], l1: [0, 0, 90], l2: [2, 2, 92],
  straps: ["hand1", "hand2"], move: [[160, 36, 176, 44]],
});
PP_POSE("reformer-salute", {
  app: "reformer", x: 136, y: 82, t: 90, h: 90, look: 0,
  a1: { to: [146, 32], bend: -1 }, a2: { to: [147, 33], bend: -1 },
  l1: [0, 0, 90], l2: [2, 2, 92],
  straps: ["hand1", "hand2"], move: [[156, 30, 172, 16]],
});

// Arms Kneeling Series
PP_POSE("reformer-arms-kneeling-series-chest-expansion", {
  app: "reformer", x: 145, y: 64, t: 96, h: 120, look: 200,
  a1: [235, 235], a2: [233, 233], l1: [-120, 0, 0], l2: [-118, 2, 0],
  straps: ["hand1", "hand2"], move: [[110, 72, 134, 80]],
});
PP_POSE("reformer-arms-kneeling-series-circles-up", {
  app: "reformer", x: 152, y: 64, t: 84, h: 60, look: -20,
  a1: [-45, -45], a2: [-43, -43], l1: [-60, 180, 180], l2: [-62, 180, 180],
  straps: ["hand1", "hand2"], move: [[190, 52, 196, 30]],
});
PP_POSE("reformer-arms-kneeling-series-circles-down", {
  app: "reformer", x: 152, y: 64, t: 84, h: 60, look: -20,
  a1: [45, 45], a2: [47, 47], l1: [-60, 180, 180], l2: [-62, 180, 180],
  straps: ["hand1", "hand2"], move: [[200, 22, 200, 46]],
});
PP_POSE("reformer-arms-kneeling-series-triceps", {
  app: "reformer", x: 152, y: 64, t: 82, h: 60, look: -20,
  a1: { to: [154, 20], bend: -1 }, a2: { to: [155, 21], bend: -1 },
  l1: [-60, 180, 180], l2: [-62, 180, 180],
  straps: ["hand1", "hand2"], move: [[186, 16, 202, 10]],
});
PP_POSE("reformer-arms-kneeling-series-biceps", {
  app: "reformer", x: 152, y: 64, t: 72, h: 60, look: -25,
  a1: [215, 215], a2: [213, 213], l1: [-60, 180, 180], l2: [-62, 180, 180],
  straps: ["hand1", "hand2"], move: [[136, 54, 152, 40]],
});

// Shoulder Push (kneeling, trunk over thighs)
PP_POSE("reformer-shoulder-push", {
  app: "reformer", x: 164, y: 68, t: 12, h: 40, look: 10,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [208, 67], bend: 1 },
  l1: [-43, 180, 180], l2: [-45, 180, 180],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-shoulder-push-single-arm", {
  app: "reformer", x: 164, y: 68, t: 12, h: 40, look: 10,
  a1: { to: [207, 66], bend: 1 }, a2: { to: [172, 84], bend: -1 },
  l1: [-43, 180, 180], l2: [-45, 180, 180],
  move: [[150, 104, 120, 104]],
});

// Rowing Series (sitting, hands in straps)
PP_POSE("reformer-rowing-back-1", {
  app: "reformer", footbar: "down", x: 180, y: 82, t: 70, c: -6, h: 110, look: 200,
  a1: [185, 185], a2: [187, 187], l1: [180, 180, 90], l2: [182, 182, 92],
  straps: ["hand1", "hand2"], move: [[160, 40, 176, 54]],
});
PP_POSE("reformer-rowing-back-2", {
  app: "reformer", footbar: "down", x: 180, y: 82, t: 100, h: 105, look: 190,
  a1: [140, 140], a2: [142, 142], l1: [180, 180, 90], l2: [182, 182, 92],
  straps: ["hand1", "hand2"], move: [[150, 14, 136, 30]],
});
PP_POSE("reformer-rowing-front-1", {
  app: "reformer", footbar: "down", x: 136, y: 82, t: 90, h: 90, look: 0,
  a1: [-80, 15], a2: [-82, 13], l1: [0, 0, 90], l2: [2, 2, 92],
  straps: ["hand1", "hand2"], move: [[158, 58, 180, 44]],
});
PP_POSE("reformer-rowing-front-2", {
  app: "reformer", footbar: "down", x: 136, y: 82, t: 48, c: 7, h: 10, look: -50,
  a1: [0, 0], a2: [2, 2], l1: [0, 0, 90], l2: [2, 2, 92],
  straps: ["hand1", "hand2"], move: [[190, 50, 196, 30]],
});

// Standing on the platform
PP_POSE("reformer-skating-single-leg", {
  app: "reformer", footbar: "down", platform: true, carriage: 20, x: 190, y: 74, t: 90, h: 90, look: -60,
  a1: [10, 120], a2: [170, 60],
  l1: { to: [206, 84], bend: 1, foot: 0 }, l2: { to: [166, 84], bend: -1, foot: 180 },
  move: [[160, 104, 140, 104]],
});
PP_POSE("reformer-split-side", {
  app: "reformer", footbar: "down", platform: true, carriage: 18, x: 164, y: 74, t: 90, h: 90, look: -60,
  a1: [0, 0], a2: [180, 180],
  l1: { to: [212, 84], bend: 1, foot: 0 }, l2: { to: [116, 84], bend: -1, foot: 180 },
  move: [[140, 104, 110, 104]],
});

// Jumping Series (jump board)
PP_POSE("reformer-parallel-position", {
  app: "reformer", footbar: "down", jumpboard: true, carriage: 0, x: 162, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [194, 76], bend: 1, foot: 90 }, l2: { to: [195, 76], bend: 1, foot: 90 },
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-v-position", {
  app: "reformer", footbar: "down", jumpboard: true, carriage: 12, x: 150, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [194, 72], bend: 1, foot: 60 }, l2: { to: [193, 72], bend: 1, foot: 58 },
  move: [[130, 104, 160, 104]],
});
PP_POSE("reformer-single-leg-parallel", {
  app: "reformer", footbar: "down", jumpboard: true, carriage: 0, x: 162, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [194, 76], bend: 1, foot: 90 }, l2: [90, 0, 10],
  move: [[150, 104, 120, 104]],
});
PP_POSE("reformer-leg-changes", {
  app: "reformer", footbar: "down", jumpboard: true, carriage: 10, x: 152, y: 82, t: 180, h: 180, look: 90,
  a1: [-3, -3], a2: [-5, -5],
  l1: { to: [192, 70], bend: 1, foot: 60 }, l2: [88, 2, 20],
  move: [[176, 54, 186, 66]],
});

// Mermaid (sitting sideways)
PP_POSE("reformer-mermaid", {
  app: "reformer", carriage: 10, x: 158, y: 80, t: 55, c: -4, h: 50, look: -40,
  a1: { to: [207, 66], bend: -1 }, a2: [65, 40],
  l1: [-8, 190, 175], l2: { to: [117, 83], bend: -1, foot: 180 },
  move: [[140, 104, 110, 104]],
});
