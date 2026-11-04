import { test, expect } from '@playwright/test';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
test.use({ channel: 'chrome' });

for (const [locale, expected] of [['zh-CN', 'zh-CN'], ['zh-TW', 'zh-CN'], ['en-US', 'en'], ['fr-FR', 'en']]) {
  test(`first visit follows browser ${locale}`, async ({ browser }) => {
    const context = await browser.newContext({ locale });
    const page = await context.newPage();
    await page.goto(base);
    await expect(page.locator('html')).toHaveAttribute('lang', expected);
    await expect(page.locator('#language')).toHaveValue('auto');
    await expect(page.locator('.home-institution')).toContainText(expected === 'en' ? 'Wenzhou Medical University' : '温州医科大学');
    await expect(page).toHaveTitle(expected === 'en' ? "Home · Zhonghua Lu" : '首页 · Zhonghua Lu');
    await context.close();
  });
}

test('manual preference persists across routes and reloads, and Browser resets it', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' });
  const page = await context.newPage();
  await page.goto(base);
  await page.selectOption('#language', 'zh');
  await page.getByRole('link', { name: '研究', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('.page-heading h1')).toHaveText('论文发表.');
  await page.reload();
  await expect(page.locator('#language')).toHaveValue('zh');
  await page.selectOption('#language', 'en');
  await expect(page.locator('.page-heading h1')).toHaveText('Publications.');
  await expect(page.locator('.paper-record')).toHaveCount(18);
  await expect(page.locator('.paper-title-zh').first()).toBeHidden();
  await page.locator('.paper-abstract summary').first().click();
  await expect(page.locator('.abstract-columns section[lang="en"]').first()).toBeVisible();
  await expect(page.locator('.abstract-columns section[lang="zh-CN"]').first()).toBeHidden();
  await page.selectOption('#language', 'zh');
  await expect(page.locator('.abstract-columns section[lang="zh-CN"]').first()).toBeVisible();
  await page.selectOption('#language', 'auto');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.evaluate(() => localStorage.getItem('language'))).toBeNull();
  await context.close();
});

test('four routes translate fully and fit desktop and mobile in both themes', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  for (const route of ['/', '/research/', '/project/', '/cv/']) {
    await page.goto(base + route);
    for (const language of ['en', 'zh']) {
      await page.selectOption('#language', language);
      const texts = await page.locator('[data-i18n]').evaluateAll(els => els.map(el => ({actual:el.textContent, expected:el.dataset[document.documentElement.lang === 'en' ? 'en' : 'zh']})));
      expect(texts.every(t => t.actual === t.expected)).toBeTruthy();
      if (language === 'en') {
        const chinese = await page.locator('main').innerText();
        expect(chinese.replaceAll('卢忠华','')).not.toMatch(/\p{Script=Han}/u);
      }
      for (const theme of ['light', 'dark']) {
        await page.selectOption('#theme',theme);
        for (const width of [1440, 900, 390, 320]) {
          await page.setViewportSize({width,height:1000});
          expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), `${route} ${language} ${theme} ${width}`).toBeTruthy();
        }
      }
    }
  }
  expect(errors).toEqual([]);
});

test('language switching works even when localStorage is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ locale:'en-US' });
  await context.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }));
  const page = await context.newPage();
  await page.goto(base);
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await page.selectOption('#language','zh');
  await expect(page.locator('.home-institution')).toContainText('温州医科大学');
  await page.selectOption('#language','en');
  await expect(page.locator('.home-institution')).toContainText('Wenzhou');
  await context.close();
});
