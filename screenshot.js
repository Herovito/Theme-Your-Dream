const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to match portfolio dimensions
  await page.setViewportSize({ width: 1889, height: 1062 });

  // Navigate to local dev server
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

  // Wait a bit for any animations to settle
  await page.waitForTimeout(1000);

  // Take screenshot
  const screenshotPath = path.join(__dirname, 'screenshot-temp.png');
  await page.screenshot({ path: screenshotPath, type: 'png' });

  console.log(`Screenshot saved to: ${screenshotPath}`);

  await browser.close();
})();
