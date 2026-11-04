import { test, expect } from '@playwright/test';
import fs from 'node:fs';
const papers = JSON.parse(fs.readFileSync(new URL('../src/data/research-papers.json', import.meta.url), 'utf8'));
test.use({ channel: 'chrome', locale: 'zh-CN' });
test('research shows a concise author-sorted list with working abstracts and permalinks', async ({ page }) => {
  const errors=[]; page.on('pageerror', error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4321/research/');
  await expect(page.locator('.paper-record')).toHaveCount(18);
  await expect(page.locator('.scholar-metrics dd')).toHaveText(['161', '9', '9']);
  await expect(page.locator('.citation-count')).toHaveText(['1', '3', '20', '57', '80']);
  await expect(page.locator('.citation-year')).toHaveText(['2022', '2023', '2024', '2025', '2026']);
  await expect(page.locator('.scholar-heading time')).toHaveAttribute('datetime', '2026-11-04');
  expect(await page.locator('body').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  expect(await page.locator('.paper-record').evaluateAll(cards => cards.map(card => card.id))).toEqual([
    'pmid-38819024', 'pmid-41045665', 'pmid-37591176', 'pmid-41691569',
    'pmid-39593059',
    'pmid-40615526', 'pmid-39449509', 'pmid-38219541',
    'pmid-41266286', 'pmid-41005528', 'pmid-38729510',
    'pmid-40280061', 'pmid-38461778',
    'pmid-42777345', 'pmid-42606525',
    'pmid-42224848', 'pmid-37673188', 'pmid-35246141',
  ]);
  for (const [pmid, role] of Object.entries({
    '42777345': '第五作者', '42606525': '第五作者',
    '42224848': '第六作者', '41005528': '第三作者',
  })) {
    const card = page.locator(`#pmid-${pmid}`);
    await expect(card.locator('.paper-role')).toHaveText(role);
    await expect(card.locator('.authors')).toContainText(/Zhong-?hua Lu|Zhong-Hua Lu/);
  }
  await expect(page.locator('.paper-role')).toHaveCount(18);
  for(const p of papers){
    const card=page.locator(`#pmid-${p.pmid}`);
    await expect(card.locator('h2')).toHaveText(p.title);
    await expect(card.locator('.paper-title-zh')).toHaveText(p.titleZh);
    await expect(card.locator('.paper-identifiers a').first()).toHaveAttribute('href',p.url);
    await expect(card.locator('.paper-identifiers a').nth(1)).toHaveAttribute('href',`https://doi.org/${p.doi}`);
    await expect(card.locator('.abstract-columns section').first().locator('p')).toHaveText(p.abstractZh);
    await expect(card.locator('.abstract-columns section').last().locator('p')).toHaveText(p.abstractEn);
    const cas = p.metrics.find(m=>m.label.startsWith('中科院历史参考')) ?? p.metrics.find(m=>m.label.startsWith('中科院分区'));
    const jif = p.metrics.find(m=>m.label==='发表当年发布的 JIF（对照口径）');
    await expect(card.locator('.paper-metrics dt')).toHaveText(['中科院分组','影响因子']);
    await expect(card.locator('.paper-metrics dd')).toHaveText([cas.value,jif.value]);
  }
  await expect(page.locator('.paper-sources, .metric-correction, .metrics-explanation')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Sources & notes');
  await expect(page.locator('#pmid-38219541 .paper-metrics dd').last()).toHaveText('10.3（2023 数据年，2024 年发布）。');
  await expect(page.locator('.page-heading h1')).toHaveText('论文发表.');
  await expect(page.locator('.page-heading a')).toHaveCount(0);
  await expect(page.locator('.scholar-heading a')).toContainText('Google Scholar');
  await expect(page.locator('.page-heading .eyebrow, .page-heading p, .research-overview, .paper-controls, #results-count, #no-results, .legacy-manuscripts')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('其他研究稿件');
  await expect(page.locator('.paper-record:visible')).toHaveCount(18);
  await expect(page.locator('.paper-abstract[open]')).toHaveCount(0);
  await page.locator('.paper-abstract summary').first().click();
  await expect(page.locator('.paper-abstract[open]')).toHaveCount(1);
  await page.locator('.paper-abstract summary').first().click();
  await expect(page.locator('.paper-abstract[open]')).toHaveCount(0);
  for(const width of [1440,390,320]){await page.setViewportSize({width,height:1000});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
  await page.screenshot({path:'/tmp/research-bilingual-mobile.png'});
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'/tmp/research-bilingual-desktop.png'});
  await page.selectOption('#theme','dark');await page.screenshot({path:'/tmp/research-bilingual-dark.png'});
  await page.goto('http://127.0.0.1:4321/research/#pmid-41691569');await expect(page.locator('#pmid-41691569 .paper-abstract')).toHaveAttribute('open','');
  await page.goto('http://127.0.0.1:4321/cv/');await expect(page.locator('.cv-publications li')).toHaveCount(4);
  await page.goto('http://127.0.0.1:4321/project/');await expect(page.locator('main')).not.toContainText('返修中');
  for (const route of ['', 'cv/', 'project/']) {
    await page.goto(`http://127.0.0.1:4321/${route}`);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({width, height:1000});
      await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
});
