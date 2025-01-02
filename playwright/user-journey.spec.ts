import { test, expect } from '@playwright/test';
const baseUrl = process.env.BASE_URL || 'https://webperf.canarytrace.com';

test('webPerf has title', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page).toHaveTitle('Web Performance Training by Canarytrace');
});

test('go to WPO stats', async ({ page, context }) => {
  await page.goto(baseUrl);

  await page.getByRole('link', { name: 'Případové studie jaký má' });
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Případové studie WPO Stats.' }).click(),
  ]);

  await newPage.waitForLoadState();

  await expect(newPage).toHaveTitle('WPO Stats: Case studies on the business impact of web performance');
});