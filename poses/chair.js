// Wunda Chair poses. Seat top y=95 (sitting hip y≈91), seat spans x 110-162, front face x=160, floor y=135.
// The pedal sticks out of the front face: pedal 0 = pressed down (end ≈ (178,128)), 0.5 ≈ (177,116),
// 1 = up (end ≈ (173,104)); anchor "pedal" = pedal end. Floor work uses shift (chair moved left) + mat.

// Foot work: seated facing the pedal, hands on the seat behind the hips
PP_POSE("wunda-chair-parallel-heels", {
  app: "chair", pedal: 0.6, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: { to: "pedal", bend: 1, foot: 75 }, l2: { to: "pedal", bend: 1, foot: 75 },
  move: [[186, 104, 188, 120]],
});
PP_POSE("wunda-chair-parallel-toes", {
  app: "chair", pedal: 0.5, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: { to: [171.8, 109.5], bend: 1, foot: -50 }, l2: { to: [171.8, 109.5], bend: 1, foot: -50 },
  move: [[186, 106, 188, 122]],
});
PP_POSE("wunda-chair-v-position-toes", {
  app: "chair", pedal: 0.3, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: { to: [172.5, 114.4], bend: 1, foot: -50 }, l2: { to: [172.5, 114.4], bend: 1, foot: -50 },
  move: [[186, 106, 188, 122]],
});
PP_POSE("wunda-chair-open-v-position-heels", {
  app: "chair", pedal: 0.35, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: { to: "pedal", bend: 1, foot: 75 }, l2: { to: "pedal", bend: 1, foot: 75 },
  move: [[186, 108, 188, 124]],
});
PP_POSE("wunda-chair-open-v-position-toes", {
  app: "chair", pedal: 0.2, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: { to: [172.8, 116.9], bend: 1, foot: -50 }, l2: { to: [172.8, 116.9], bend: 1, foot: -50 },
  move: [[186, 104, 188, 96]],
});
PP_POSE("wunda-chair-calf-raises", {
  app: "chair", pedal: 0.8, x: 189, y: 90, t: 130, h: 135, look: 200,
  a1: { to: [155, 93], bend: 1 }, a2: { to: [153, 93], bend: 1 },
  l1: [-156.5, -29.7, 155], l2: { to: [222, 126], bend: 1, foot: 180 },
  move: [[190, 116, 190, 102]],
});
PP_POSE("wunda-chair-single-leg-heel", {
  app: "chair", pedal: 0.5, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: [0, 0, 0], l2: { to: "pedal", bend: 1, foot: 75 },
  move: [[186, 106, 188, 122]],
});
PP_POSE("wunda-chair-single-leg-toes", {
  app: "chair", pedal: 0.5, x: 148, y: 92, t: 102, h: 96, look: 0,
  a1: { to: [135, 92], bend: -1 }, a2: { to: [133, 92], bend: -1 },
  l1: [0, 0, 0], l2: { to: [171.8, 109.5], bend: 1, foot: -50 },
  move: [[186, 106, 188, 122]],
});

// Abdominal work: pikes and floor work
PP_POSE("wunda-chair-pike-standing", {
  app: "chair", pedal: 0, x: 210, y: 80, t: 200, c: -6, h: 255, look: 300,
  a1: { to: [178, 125] }, a2: { to: [177, 125] },
  l1: [-90, -90, 180], l2: [-91, -91, 179],
  move: [[190, 104, 190, 90]],
});
PP_POSE("wunda-chair-pike-standing-reverse", {
  app: "chair", pedal: 1.1, x: 112, y: 79, t: -5, h: -10, look: -60,
  a1: { to: [171.8, 100] }, a2: { to: [170.8, 100] },
  l1: { to: [106, 128], bend: 1, foot: 0 }, l2: { to: [107, 128], bend: 1, foot: 1 },
  move: [[182, 96, 184, 112]],
});
PP_POSE("wunda-chair-pike-sitting", {
  app: "chair", mat: true, pedal: 0.6, x: 209, y: 123, t: 112, c: -6, h: 150, look: 210,
  a1: { to: [176.4, 111], bend: 1 }, a2: { to: [175.4, 111], bend: 1 },
  l1: { to: [168, 100], bend: 1, foot: 165 }, l2: { to: [169, 101], bend: 1, foot: 165 },
  move: [[218, 118, 218, 104]],
});
PP_POSE("wunda-chair-pelvic-curl", {
  app: "chair", mat: true, shift: -60, pedal: 0, x: 148, y: 106, t: -25, h: 8, look: 90,
  a1: [186, 180], a2: [184, 180],
  l1: { to: [124, 122], bend: -1, foot: 200 }, l2: { to: [125, 122], bend: -1, foot: 200 },
  move: [[148, 120, 148, 102]],
});
PP_POSE("wunda-chair-cat-stretch-kneeling", {
  app: "chair", pedal: 1, x: 141, y: 68, t: 0, c: 7, h: -70, look: -100,
  a1: { to: [173.2, 101] }, a2: { to: [172.2, 101] },
  l1: [-95, 180, 180], l2: [-94, 181, 181],
  move: [[182, 100, 184, 114]],
});

// Arm work
PP_POSE("wunda-chair-shrugs", {
  app: "chair", pedal: 0.75, box: [182, 206, 117], x: 190, y: 112, t: 100, h: 95, look: 0,
  a1: { to: [175.4, 107] }, a2: { to: [174.4, 107] },
  l1: { to: [216, 129], bend: 1, foot: 0 }, l2: { to: [218, 129], bend: 1, foot: 0 },
  move: [[198, 84, 198, 74]],
});
PP_POSE("wunda-chair-triceps-press-sit", {
  app: "chair", pedal: 1, box: [182, 206, 117], x: 190, y: 112, t: 100, h: 95, look: 0,
  a1: { to: [173.2, 101], bend: -1 }, a2: { to: [172.2, 101], bend: -1 },
  l1: { to: [216, 129], bend: 1, foot: 0 }, l2: { to: [218, 129], bend: 1, foot: 0 },
  move: [[166, 100, 168, 114]],
});
PP_POSE("wunda-chair-triceps-prone", {
  app: "chair", pedal: 0.6, x: 144, y: 90, t: 0, h: 0, look: -60,
  a1: { to: [176.4, 110.5], bend: -1 }, a2: { to: [175.4, 110.5], bend: -1 },
  l1: [180, 180, 180], l2: [181, 181, 181],
  move: [[186, 104, 188, 118]],
});
PP_POSE("wunda-chair-frog-back", {
  app: "chair", pedal: 0.6, x: 171, y: 99, t: 95, h: 92, look: 0,
  a1: { to: [163, 93], bend: -1 }, a2: { to: [161, 93], bend: -1 },
  l1: { to: [171.3, 107], bend: 1, foot: -50 }, l2: { to: [171.8, 107.5], bend: 1, foot: -50 },
  move: [[184, 106, 186, 120]],
});
PP_POSE("wunda-chair-side-arm-kneeling", {
  app: "chair", pedal: 0.6, x: 200, y: 106, t: 125, c: -5, h: 140, look: 230,
  a1: { to: [176.4, 110.5] }, a2: [80, 150],
  l1: [-90, 0, 0], l2: [-91, -1, -1],
  move: [[186, 108, 188, 122]],
});
PP_POSE("wunda-chair-leg-press-standing", {
  app: "chair", pedal: 0, x: 200, y: 81, t: 90, h: 90, look: 180,
  a1: [-75, -75], a2: [-105, -105],
  l1: { to: [182, 125], bend: -1, foot: -150 }, l2: [-90, -90, 180],
  move: [[170, 120, 170, 106]],
});

// Leg work
PP_POSE("wunda-chair-step-down-back", {
  app: "chair", pedal: 0.4, x: 177, y: 67.5, t: 140, h: 140, look: 200,
  a1: [-120, 40], a2: [-115, 45],
  l1: [180, -90, 180], l2: { to: [183, 114], bend: -1, foot: -140 },
  move: [[190, 112, 192, 126]],
});
PP_POSE("wunda-chair-hamstring-curl", {
  app: "chair", mat: true, shift: -60, pedal: 0.5, x: 163, y: 122, t: 0, h: 8, look: 90,
  a1: [186, 180], a2: [184, 180],
  l1: { to: [118, 113], bend: -1, foot: 100 }, l2: { to: [119, 113], bend: -1, foot: 100 },
  move: [[112, 108, 114, 122]],
});
PP_POSE("wunda-chair-hip-opener", {
  app: "chair", mat: true, shift: -60, pedal: 0.5, x: 152, y: 122, t: 0, h: 8, look: 90,
  a1: [186, 180], a2: [184, 180],
  l1: { to: [120, 113], bend: -1, foot: 170 }, l2: { to: [121, 113], bend: -1, foot: 170 },
  move: [[112, 108, 114, 122]],
});
PP_POSE("wunda-chair-frog-front", {
  app: "chair", pedal: 1, x: 196, y: 80, t: 147.7, h: 160, look: 220,
  a1: { to: [161, 93] }, a2: { to: [159, 93] },
  l1: { to: [178.3, 97.5], bend: -1, foot: -130 }, l2: { to: [179, 98], bend: -1, foot: -130 },
  move: [[186, 104, 188, 118]],
});

// Lateral flexion (side view; arrows hint at the motion)
PP_POSE("wunda-chair-side-stretch", {
  app: "chair", pedal: 0.8, x: 152, y: 90, t: 25, c: 4, h: 20, look: -40,
  a1: { to: [175, 106] }, a2: [80, 20],
  l1: { to: [124, 127], bend: -1, foot: -110 }, l2: [-110, -30, -30],
  move: [[204, 60, 214, 74]],
});
PP_POSE("wunda-chair-side-stretch-kneeling", {
  app: "chair", pedal: 0.3, x: 200, y: 106, t: 145, c: -6, h: 170, look: 240,
  a1: { to: [177.6, 117.5] }, a2: [105, 160],
  l1: [-90, 0, 0], l2: [-91, -1, -1],
  move: [[152, 52, 134, 62]],
});
PP_POSE("wunda-chair-pike-side", {
  app: "chair", pedal: 0, x: 184, y: 76, t: 154, c: -6, h: 240, look: 280,
  a1: { to: [152, 93] }, a2: { to: [150, 93] },
  l1: { to: [182, 124], bend: 1, foot: -170 }, l2: { to: [181, 124], bend: 1, foot: -170 },
  move: [[194, 70, 190, 56]],
});

// Back extension: swan
PP_POSE("wunda-chair-swan", {
  app: "chair", pedal: 0.5, x: 140, y: 90, t: 15, h: 30, look: 10,
  a1: { to: [176.9, 113] }, a2: { to: [175.9, 113] },
  l1: [182, 182, 182], l2: [183, 183, 183],
  move: [[188, 78, 192, 66]],
});
PP_POSE("wunda-chair-swan-on-mat", {
  app: "chair", mat: true, shift: -70, pedal: 0.6, x: 172, y: 122, t: 172, h: 168, look: 200,
  a1: { to: [106.4, 111] }, a2: { to: [105.4, 111] },
  l1: [-1, -1, -1], l2: [0, 0, 0],
  move: [[130, 106, 128, 94]],
});
PP_POSE("wunda-chair-swan-single-arm", {
  app: "chair", pedal: 0.5, x: 140, y: 90, t: 15, h: 30, look: 10,
  a1: [-40, -40], a2: { to: [175.9, 113] },
  l1: [182, 182, 182], l2: [183, 183, 183],
  move: [[188, 78, 192, 66]],
});
