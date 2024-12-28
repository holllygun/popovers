import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(90000);

describe("page start", () => {
  let browser = null;
  let page = null;
  let server = null;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // headless: true,
      // slowMo: 100,
      // devtools: true,
      // args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    page = await browser.newPage();
    await page.goto("http://localhost:8080");
  });

  test("new popover", async () => {
    const btn = await page.$(".popover_btn");
    await btn.click();
    const popover = await page.waitForSelector(".popover");
    expect(popover).not.toBeNull();
  });

  test("delete existing popover", async () => {
    const btn = await page.$(".popover_btn");

    await btn.click();
    const popover = await page.$(".popover");
    expect(popover).toBeNull();

    await btn.click();

    const allPopovers = await page.$$(".popover");
    expect(allPopovers.length).toBe(1);
  });
  afterAll(async () => {
    if (browser) {
      await browser.close();
    } else {
      console.error("browser was not initialized");
    }
    server.kill();
  });
});
