// 内容来源：项目根目录《卢忠华_简历整理.md》及用户于 2026-11-04 补充的现单位与研究主题。
export const profile = {
  name: 'Zhonghua Lu',
  chineseName: '卢忠华',
  initials: '卢',
  role: '医疗可及性与环境健康研究',
  institution: '温州医科大学眼视光学院',
  affiliations: ['视觉健康全国重点实验室', '眼和视光疾病国家临床医学研究中心'],
  greeting: 'Understanding health. Broadening access.',
  bio: '我关注医疗可及性，以及环境暴露如何影响人群健康，重点研究眼健康与生殖健康。结合流行病学与多组学方法，探索人群健康差异及其影响因素。',
  interests: ['医疗可及性', '环境暴露', '眼健康', '生殖健康'],
  email: 'zh_lu@wmu.edu.cn',
  socials: [{ label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=SccPEkEAAAAJ&hl=zh-CN' }],
  education: [
    { title: '医学博士 · 流行病与卫生统计学', institution: '厦门大学', dates: '2021.09 — 2026.06', detail: '' },
    { title: '理学学士 · 卫生检验与检疫', institution: '武汉科技大学', dates: '2017.09 — 2021.06', detail: '' },
  ],
  experience: [
    { title: '空气污染暴露影响人群健康的分子流行病学研究', institution: '人群队列 · 多组学 · 动物实验', dates: '', detail: '利用湖北省精子库与孝感出生队列的健康数据，以及精子、胎盘和胎便样本，结合小鼠实验，通过 UPLC-HRMS 平台开展非靶向代谢组学和蛋白质组学分析，研究空气污染暴露的健康效应及分子机制。' },
    { title: '非靶向小分子化合物全流程分析平台的应用与再开发', institution: 'Metabolomics Expert · MetaboliteAnnotator', dates: '', detail: '覆盖样本前处理、质谱检测、数据处理、分子鉴定和生物信息学分析。主导 Metabolomics Expert 的概念设计、技术验证、软件开发、内部验证、联合试点与产业合作，并开发 AI 辅助代谢物注释 R 程序包 MetaboliteAnnotator。' },
  ],
  skills: [
    { title: '研究方法与数据分析', items: ['环境与分子流行病学、系统流行病学', '人群队列研究与动物实验', '非靶向代谢组学、蛋白质组学及生物信息学分析', 'AI 辅助化合物名称匹配与数据库注释'] },
    { title: '实验平台与工具开发', items: ['生物样本前处理与完整代谢组学数据工作流', 'Thermo Q-Exactive、AB Sciex 6500 QQQ', 'Shimadzu 9050 Q-TOF、UPLC-HRMS', 'R 程序包开发与代谢组学分析软件开发'] },
  ],
  awards: [
    { title: '厦门大学“南强优秀博士生培育计划”', dates: '2024、2025', detail: '厦门大学 · 连续两年入选，学院每年遴选 2 人' },
    { title: '腾讯奖学金（高层次应用型公共卫生人才培养项目）', dates: '2024', detail: '教育部学位管理与研究生教育司 · 全国 250 人，厦门大学 5 人' },
    { title: '黄仲咸奖学金', dates: '2024', detail: '厦门大学' },
    { title: '厦门大学三好学生', dates: '2024', detail: '厦门大学' },
    { title: '十佳优秀学生奖学金', dates: '2024', detail: '厦门大学公共卫生学院 · 全院遴选 10 人' },
    { title: '武汉科技大学优秀学生', dates: '2020', detail: '武汉科技大学' },
    { title: '武汉科技大学学业奖学金', dates: '2019、2020', detail: '武汉科技大学' },
    { title: '湖北省医学虚拟仿真实验技能大赛一等奖', dates: '2019', detail: '湖北省生理学会' },
    { title: '武汉科技大学“互联网+”创新创业大赛金奖', dates: '2019', detail: '武汉科技大学 · 组长' },
    { title: '武汉科技大学第八届化学技能竞赛一等奖', dates: '2019', detail: '武汉科技大学' },
  ],
};
export const grants = [
  { title: '砷致肝脏糖脂代谢紊乱促发/加重妊娠期糖尿病的机理及干预研究', program: '国家自然科学基金面上项目', number: '22076157' },
  { title: '消毒副产物暴露对男性精子发育的影响及 DNA 甲基化的介导作用', program: '国家自然科学基金青年基金项目', number: '81903281' },
  { title: '胆红素-花生四烯酸代谢通路调节炎症介质网络对慢性肾脏病进展影响机制研究', program: '福建省自然科学基金面上项目', number: '2023J011642' },
  { title: '基于老年纵向队列研究 PM2.5 组分与慢性肾病的关联及分子机理', program: '福建省自然科学基金面上项目', number: '2024J01046' },
  { title: '基于厦门灌口老年人队列研究血清 Adropin 水平在糖尿病和糖尿病肾病中的预测价值和早期预测模型', program: '福建省科技厅引导性项目', number: '2023D020' },
];
export const projects = [
  { title: 'Metabolomics Expert', subtitle: '非靶向小分子化合物全流程分析软件', role: '项目负责人 / 主要完成人', description: '将数据导入、谱图格式转换、特征提取、MS/MS 谱图匹配、数据标准化与 AI 辅助分析串联为完整的非靶向分析工作流。', details: ['主导概念设计、关键技术验证、软件开发与内部多轮验证，推进对外联合试点和产业合作。', '与日本岛津、杭州谱育等仪器厂商签订战略合作协议。'], note: '简历记录版本：v0.2.2', tags: ['质谱数据分析', 'MS/MS 匹配', 'AI 辅助分析'], url: '', kind: 'network' },
  { title: 'MetaboliteAnnotator', subtitle: 'AI 辅助代谢物注释 R 程序包', role: '开发与研究 · 相关论文第一作者', description: '支持无偏向输入化合物名称，结合大语言模型进行名称匹配，对接 PubChem、HMDB、KEGG 等数据库，辅助完成全面的代谢物注释。', details: ['将 AI 辅助名称匹配与多数据库注释整合，减少化合物名称差异带来的注释困难。', '相关论文于 2026 年发表于 Journal of Proteome Research，25(3):1775–1780。'], note: '', tags: ['R', '代谢物注释', '大语言模型'], url: '', kind: 'grid' },
];
