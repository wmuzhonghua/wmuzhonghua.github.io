import fs from 'node:fs';
import assert from 'node:assert/strict';
const source = fs.readFileSync(new URL('../docs/publications-source-2026-11-04.md', import.meta.url), 'utf8');
const clean = value => value.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
const blocks = source.split(/<a id="paper-\d+"><\/a>/).slice(1).map(s => s.split('## 四、')[0]);
const publications = blocks.map((block, index) => {
  const field = label => {
    const line = block.split('\n').find(line => line.includes(`**${label}：**`));
    assert(line, `Missing ${label} in ${index + 1}`);
    return line.split(`**${label}：**`)[1].trim();
  };
  const abstract = (heading, end) => {
    const value = block.split(heading)[1]?.split(end)[0]?.trim();
    assert(value, `Missing abstract ${index + 1}`);
    return value;
  };
  const metrics = [...block.matchAll(/^- \*\*((?:中科院|主影响因子|主 JCR|发表当年|JCR 历史)[^\n]+?)：\*\* (.+)$/gm)].map(m => ({ label: clean(m[1]), value: clean(m[2]) }));
  const pmid = field('PMID').match(/\[(\d+)\]/)[1];
  const doi = field('DOI').match(/\[([^\]]+)\]/)[1];
  const dates = clean(field('论文发表年与日期'));
  const metricId = field('历史指标来源与说明').match(/\(#([^)]*)\)/)[1];
  const evidence = source.split(`<a id="${metricId}"></a>`)[1]?.split(/<a id="metrics-|## 五、/)[0];
  assert(evidence, `Missing evidence ${metricId}`);
  const sources = evidence.split('\n').filter(line => line.startsWith('- **')).map(line => ({
    label: clean(line.match(/^- \*\*(.*?)\*\*/)[1]).replace(/：$/, ''),
    links: [...line.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)].map(m => ({ label: m[1], url: m[2] }))
  }));
  const corrections = [...block.matchAll(/\*\*指标更正说明：\*\* (.+)/g)].map(m => clean(m[1]));
  const notes = block.split('**书目与数据说明**')[1]?.trim().split('\n').filter(l=>l.startsWith('- ')).map(l=>l.slice(2)) || [];
  assert(metrics.length >= 4 && sources.length >= 4);
  return { id: index + 1, title: clean(field('English Title')), titleZh: clean(field('中文标题')), year: dates.slice(0,4), citation: clean(field('期刊及卷页')), dates, pmid, doi, url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, metrics, sources, corrections, notes, abstractZh: abstract('**中文摘要（归纳）**', '**English Abstract (Summary)**'), abstractEn: abstract('**English Abstract (Summary)**', '**书目与原始摘要：**') };
});
assert.equal(publications.length, 18);
assert.equal(new Set(publications.map(p=>p.pmid)).size, 18);
assert.equal(new Set(publications.map(p=>p.doi)).size, 18);
fs.writeFileSync(new URL('../src/data/research-papers.json', import.meta.url), JSON.stringify(publications, null, 2)+'\n');
console.log(`Imported ${publications.length} bilingual papers with metrics, provenance, PMID and DOI.`);
