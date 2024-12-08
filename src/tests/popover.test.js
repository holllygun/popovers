const puppeteer = require('puppeteer');

describe("page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
    await page.goto("http://localhost:8080");
  });

  test('new popover', async () => {
    const btn= await page.$(".popover_btn");

    await btn.click();
    await page.waitForSelector(".popover")
  })

  test('delete existing popover', async () => {
    const btn= await page.$(".popover_btn");

    await btn.click();
    const popover = await page.$('.popover');
    expect(popover).not.toBeNull();

    await btn.click();

    const allPopovers = await page.$$('.popover')
    expect(allPopovers.length).toBe(1)


  });
  afterEach(async () => {
    await browser.close();
  });
});