// 新论文汇编为正式书目来源；作者贡献信息沿用个人简历，缺失时不推断。
import papers from './research-papers.json';
import authorInfo from './publication-authors.json';
export const publications = papers.map(paper => {
  const author = authorInfo[paper.pmid as keyof typeof authorInfo];
  return { ...paper, authors: author?.authors || '', role: author?.role || '', featured: author?.featured || false, status: '已发表', venue: paper.citation.split('. ')[0] };
});
