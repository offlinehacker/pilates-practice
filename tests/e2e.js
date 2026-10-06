// End-to-end smoke test, run through the Playwright MCP `browser_run_code_unsafe` tool with
// filename "tests/e2e.js" while the app is served at BASE (tmux session "pilates-practice").
// Phone viewport; walks every mode, checks persistence and console errors.
async (page) => {
  const BASE = "http://localhost:8650/index.html";
  const SHOTS = ".playwright-mcp/e2e";
  const errors = [];
  const results = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errors.push(`console: ${m.text()}`));
  const ok = (name, cond, detail = "") => results.push(`${cond ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
  const shot = (n) => page.screenshot({ path: `${SHOTS}/${n}.png`, fullPage: false });
  const state = () => page.evaluate(() => JSON.parse(localStorage.getItem("bunny-pilates-v1") || "{}"));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + "#/");
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE + "?fresh#/");
  await page.waitForSelector(".blocktile");
  ok("home shows 12 block tiles", (await page.locator(".blocktile").count()) === 12);
  await shot("01-home");
  const navY = () => page.evaluate(() => document.querySelector(".bottomnav").getBoundingClientRect().top);
  const y0 = await navY();
  await page.locator("main").evaluate((m) => m.scrollTo(0, 400));
  await page.mouse.wheel(0, 600);
  const layout = await page.evaluate(() => ({
    docScroll: document.scrollingElement.scrollTop,
    docScrollable: document.scrollingElement.scrollHeight - innerHeight,
    mainScroll: document.querySelector("main").scrollTop,
  }));
  ok("document never scrolls, main does", layout.docScroll === 0 && layout.docScrollable <= 0 && layout.mainScroll > 0, JSON.stringify(layout));
  ok("bottom nav stays put while scrolling", Math.abs((await navY()) - y0) < 0.5 && y0 + 60 <= 844 + 1, `y=${y0}`);

  // Mixed exam: answer 6 questions
  await page.goto(BASE + "#/exam");
  for (let i = 0; i < 6; i++) {
    await page.waitForSelector(".opt:not([disabled])");
    await page.locator(".opt").first().click();
    await page.waitForSelector(".explain");
    if (i === 0) await shot("02-exam-answered");
    await page.locator("[data-next]").click();
  }
  let s = await state();
  ok("exam records answers in SRS", Object.keys(s.srs || {}).length >= 5, `${Object.keys(s.srs || {}).length} items`);
  ok("streak started", s.streak && s.streak.count === 1);

  // Recall block 2
  await page.goto(BASE + "#/recall");
  await page.locator('[data-b="2"]').click();
  await page.waitForSelector(".opt");
  await shot("03-recall");
  await page.locator(".opt").nth(1).click();
  ok("recall shows explanation", await page.locator(".explain").isVisible());

  // Learn: hide details then reveal
  await page.goto(BASE + "#/learn?block=3");
  await page.waitForSelector(".excard");
  await page.locator("[data-hide]").click();
  ok("learn hides details", (await page.locator(".hidden-answer").count()) > 0);
  await page.locator(".hidden-answer").first().click();
  await page.locator("[data-next]").click();
  ok("learn next card", page.url().includes("i=1"));
  await page.locator(".learn-scroll").evaluate((el) => (el.scrollTop = 600));
  const shell = await page.evaluate(() => ({
    pageScroll: document.scrollingElement.scrollHeight - innerHeight,
    head: document.querySelector(".learn-top").getBoundingClientRect().top,
    nav: document.querySelector(".learnnav").getBoundingClientRect().bottom,
    bottomnav: document.querySelector(".bottomnav").getBoundingClientRect().top,
  }));
  ok("learn page itself never scrolls", shell.pageScroll <= 0, JSON.stringify(shell));
  ok("learn header + nav stay on screen", shell.head > 0 && shell.nav <= shell.bottomnav + 1);
  await page.locator("[data-filters]").click();
  await page.locator('.learn-filters [data-block="5"]').click();
  ok("learn filter header switches block", page.url().includes("block=5"));
  await shot("04-learn");

  // Rebuild the 12 blocks via ▲ buttons to the right order, then check
  await page.goto(BASE + "#/rebuild?game=blocks");
  await page.waitForSelector(".sortitem");
  for (let target = 1; target <= 12; target++) {
    let idx = await page.locator(".sortitem").evaluateAll((els, t) => els.findIndex((e) => e.dataset.key === String(t)), target);
    while (idx > target - 1) {
      await page.locator(".sortitem").nth(idx).locator('[data-move="up"]').click();
      idx--;
    }
  }
  await page.locator("[data-check]").click();
  ok("rebuild blocks all correct", (await page.locator(".sortitem.correct").count()) === 12);
  // Pointer drag: move the 5th item to the top
  await page.locator("[data-reveal-order]").click();
  await page.locator(".sortitem").first().scrollIntoViewIfNeeded();
  const handles = page.locator(".sortitem .handle");
  const from = await handles.nth(4).boundingBox();
  const to = await handles.nth(0).boundingBox();
  await page.mouse.move(from.x + 5, from.y + 5);
  await page.mouse.down();
  for (let y = from.y; y > to.y - 20; y -= 10) await page.mouse.move(from.x + 5, y);
  await page.mouse.up();
  ok("drag reorders list", (await page.locator(".sortitem").first().getAttribute("data-key")) === "5",
    await page.locator(".sortitem").evaluateAll((els) => els.map((e) => e.dataset.key).join(",")));
  await shot("05-rebuild");

  // Series rebuild
  await page.goto(BASE + "#/rebuild");
  const seriesLinks = page.locator('a[href*="game=series"]');
  ok("series list available", (await seriesLinks.count()) > 5, `${await seriesLinks.count()} series`);
  await seriesLinks.first().click();
  await page.waitForSelector(".sortitem");
  await page.locator("[data-check]").click();

  // Block sort
  await page.goto(BASE + "#/rebuild?game=sort");
  await page.waitForSelector("[data-b]");
  await page.locator('[data-b="1"]').click();
  ok("block sort marks answer", (await page.locator(".blockpick .correct").count()) === 1);
  await shot("06-blocksort");

  // Timed: answer all
  await page.goto(BASE + "#/timed");
  await page.locator("text=Start").click();
  for (let i = 0; i < 20; i++) {
    await page.locator(".opt:not([disabled])").or(page.getByText(/PASS|Not yet/)).first().waitFor();
    const opt = page.locator(".opt:not([disabled])").first();
    if (!(await opt.count())) break;
    await opt.click();
    await page.locator("[data-next]").click();
  }
  await page.waitForSelector("text=/PASS|Not yet/");
  ok("timed quiz shows result", true);
  await shot("07-timed-result");

  // Teach-back
  await page.goto(BASE + "#/teach");
  await page.locator("text=Random 15").click();
  await page.locator("[data-show]").click();
  await page.locator('[data-g="1"]').click();
  s = await state();
  ok("teach-back recorded", Object.keys(s.srs).some((k) => k.endsWith("|teach")));
  await shot("08-teach");

  // Build: suggest + save
  await page.goto(BASE + "#/build?new=1");
  await page.locator("[data-suggest]").click();
  ok("builder suggests exercises", (await page.locator(".witem").count()) >= 10, `${await page.locator(".witem").count()} items`);
  await page.locator("[data-add='1']").click();
  await page.waitForSelector(".pickitem");
  await page.locator(".pickitem:not([disabled])").first().click();
  await page.locator("[data-save]").click();
  s = await state();
  ok("workout saved", s.workouts && s.workouts.length === 1);
  await shot("09-build");

  // Edit an exercise and verify override
  await page.goto(BASE + "#/ex/reformer-parallel-heels");
  await page.locator("[data-edit]").click();
  await page.locator('input[name="reps"]').fill("10 reps");
  await page.locator('#editform button[type="submit"]').click();
  s = await state();
  ok("edit stored override", s.overrides && s.overrides["reformer-parallel-heels"]?.reps === "10 reps");
  ok("edited value shown", await page.locator("text=10 reps").isVisible());

  // Settings: toggle a level
  await page.goto(BASE + "#/settings");
  await page.locator('[data-level="Advanced"]').click();
  s = await state();
  ok("settings toggles level", s.settings.levels.includes("Advanced"));
  await shot("10-settings");

  // Persistence across reload
  await page.reload();
  s = await state();
  ok("state persists after reload", s.workouts.length === 1 && Object.keys(s.srs).length > 5);

  ok("no console/page errors", errors.length === 0, errors.join(" | "));
  return results.join("\n");
}
