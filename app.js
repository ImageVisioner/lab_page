/**
 * 实验室主页渲染入口
 * 修改 data/*.json 即可更新页面；部署时可改 endpoints 指向 API/CMS。
 */
const endpoints = {
  site: "data/site.json",
  research: "data/research.json",
  outcomes: "data/outcomes.json",
  people: "data/people.json",
  news: "data/news.json",
  resources: "data/resources.json",
  recruitment: "data/recruitment.json"
};

const fallbackData = {
  site: {
    lab: {
      name: "先进光电成像与智能装备课题组",
      mark: "像",
      university: "示例大学",
      college: "计算机学院",
      subtitle: "Advanced Optoelectronic Imaging and Intelligent Equipment Lab"
    },
    meta: {
      title: "先进光电成像与智能装备课题组",
      description: "实验室学术主页"
    },
    nav: [
      { label: "首页", href: "#home" },
      { label: "研究方向", href: "#research" },
      { label: "团队成员", href: "#people" },
      { label: "校友去向", href: "#alumni" },
      { label: "实验室动态", href: "#news" },
      { label: "论文成果", href: "#publications" },
      { label: "联系我们", href: "#contact" }
    ],
    hero: {
      badge: "示例大学",
      title: "先进光电成像与智能装备课题组",
      lead: "面向光谱智能计算与科学感知的研究团队。",
      keywords: ["计算机视觉"],
      actions: [{ label: "联系我们", href: "#contact", variant: "primary" }]
    },
    about: { 
      title: "实验室简介", 
      paragraphs: [
        "先进光电成像与智能装备课题组隶属于示例大学计算机学院，长期致力于光谱智能计算、计算成像与多模态感知等前沿交叉领域的研究。课题组围绕高光谱成像与反演、智能物质识别、科学数据低秩重建以及光谱仪器系统集成等核心方向，开展理论方法创新与工程原型开发，旨在推动光谱技术在遥感监测、材料分析、生物医学及环境科学等领域的深度应用。实验室坚持严谨求实、开放协作的学术传统，注重算法可复现性与软硬件协同设计，欢迎对光谱计算、人工智能与科学可视化感兴趣的同学加入，也诚挚邀请高校、科研院所及企业开展联合研究与技术合作。"
      ], 
      highlights: [] 
    },
    contact: {
      title: "联系我们",
      intro: "报考硕士研究生的同学请发送简历到邮箱\n想调剂到本课题组的攻读硕士研究生请发邮件给老师确定名额\n本科生申请科研锻炼和毕业设计的同学请到办公室和老师详谈\n联系邮箱： liuchenhua023@163.com",
      organization: "先进光电成像与智能装备课题组",
      address: "",
      email: "liuchenhua023@163.com",
      links: []
    },
    archives: { publications: "#", news: "#" },
    personGroupOrder: ["导师", "在读学生", "已毕业"],
    sections: {},
    footer: { copyright: "© 2026 先进光电成像与智能装备课题组", note: "" }
  },
  research: [
    {
      title: "光谱成像与反演",
      summary: "研究高维光谱数据的获取、校准与物理反演，面向遥感、材料与生物医学等场景。",
      tags: ["高光谱", "成像光谱", "反演重建"],
      demoId: "spectrum-imaging"
    },
    {
      title: "智能光谱分析",
      summary: "结合深度学习与传统光谱分析方法，实现物质识别、成分定量与异常检测。",
      tags: ["光谱识别", "深度学习", "定量分析"],
      demoId: "spectrum-analysis"
    },
    {
      title: "计算光谱学",
      summary: "面向大规模光谱数据的高效算法、仿真与可复现计算平台建设。",
      tags: ["科学计算", "仿真模拟", "高性能计算"],
      demoId: "computing-spectroscopy"
    },
    {
      title: "光谱仪器与系统",
      summary: "光谱仪系统集成、标定方法学与智能感知软硬件协同设计。",
      tags: ["仪器系统", "标定", "嵌入式感知"],
      demoId: "instrument-system"
    }
  ],
  outcomes: [
    {
      type: "论文",
      year: "2026",
      venue: "MICCAI 2026",
      title: "面向鲁棒医学图像分割的结构感知表征学习",
      authors: "陈一帆, 张明*, 等",
      image: "assets/outcome-segmentation.png",
      description: "提出结构先验与深度表征结合的分割框架，提升跨中心数据上的稳定性。",
      links: { PDF: "#", 代码: "#", 项目页: "#" }
    },
    {
      type: "论文",
      year: "2026",
      venue: "CVPR 2026",
      title: "可泛化视觉基础模型在科学影像中的自适应微调",
      authors: "王睿, 徐立, 张明*",
      image: "assets/outcome-benchmark.png",
      description: "研究参数高效微调与域自适应策略，提升基础模型在科学影像任务上的可迁移性。",
      links: { PDF: "#", 代码: "#", 项目页: "#" }
    },
    {
      type: "论文",
      year: "2025",
      venue: "IEEE TMI",
      title: "基于不确定性的医学影像弱监督诊断方法",
      authors: "王睿, 徐立, 张明*",
      image: "assets/outcome-multimodal.png",
      description: "在有限标注条件下建模预测不确定性，服务临床可解释诊断。",
      links: { PDF: "#", 代码: "#" }
    },
    {
      type: "论文",
      year: "2025",
      venue: "NeurIPS 2025",
      title: "因果启发的医学影像域泛化学习",
      authors: "陈一帆, 张明*",
      description: "从因果视角建模域不变特征，缓解医院间设备与人群差异带来的性能下降。",
      links: { PDF: "#", 代码: "#" }
    },
    {
      type: "论文",
      year: "2024",
      venue: "CVPR 2024",
      title: "跨域医学图像分割的自适应特征对齐方法",
      authors: "陈一帆, 张明*",
      image: "assets/outcome-segmentation.png",
      description: "针对源域与目标域分布差异，学习可迁移的分割表征。",
      links: { PDF: "#", 代码: "#" }
    },
    {
      type: "论文",
      year: "2024",
      venue: "NeurIPS 2024",
      title: "多模态临床报告与影像联合推理框架",
      authors: "徐立, 王睿, 张明*",
      description: "联合影像与文本模态，提升临床场景下的可解释推理能力。",
      links: { PDF: "#", 项目页: "#" }
    },
    {
      type: "论文",
      year: "2023",
      venue: "MICCAI 2023",
      title: "面向小样本学习的医学图像分类正则化策略",
      authors: "王睿, 张明*",
      image: "assets/outcome-benchmark.png",
      description: "在标注稀缺条件下引入结构正则，缓解过拟合。",
      links: { PDF: "#" }
    },
    {
      type: "论文",
      year: "2023",
      venue: "IEEE JBHI",
      title: "基于注意力机制的病灶检测与定位网络",
      authors: "陈一帆, 徐立, 张明*",
      description: "结合多尺度注意力，提高早期病灶检出率。",
      links: { PDF: "#", 代码: "#" }
    },
    {
      type: "论文",
      year: "2022",
      venue: "AAAI 2022",
      title: "噪声标注下的鲁棒医学图像训练方法",
      authors: "张明*, 等",
      description: "针对标签噪声设计鲁棒损失与样本筛选机制。",
      links: { PDF: "#" }
    },
    {
      type: "论文",
      year: "2021",
      venue: "ICCV 2021",
      title: "三维医学体数据的高效卷积编码结构",
      authors: "张明*, 等",
      image: "assets/outcome-segmentation.png",
      description: "降低三维卷积计算开销，保持体数据分割精度。",
      links: { PDF: "#", 代码: "#" }
    },
    {
      type: "论文",
      year: "2020",
      venue: "IEEE TMI",
      title: "深度学习在肺部 CT 结节检测中的应用综述与基准",
      authors: "张明*, 等",
      description: "系统梳理结节检测深度学习方法并给出统一评测设置。",
      links: { PDF: "#" }
    },
    {
      type: "论文",
      year: "2019",
      venue: "MICCAI 2019",
      title: "基于图卷积的器官结构约束分割网络",
      authors: "张明*, 等",
      description: "利用解剖结构先验约束分割结果的空间一致性。",
      links: { PDF: "#", 代码: "#" }
    },
    {
      type: "论文",
      year: "2018",
      venue: "IEEE TMI",
      title: "多序列 MRI 脑肿瘤分割的级联卷积网络",
      authors: "张明*, 等",
      description: "级联粗分割与精细分割，融合多序列磁共振信息。",
      links: { PDF: "#" }
    },
    {
      type: "论文",
      year: "2017",
      venue: "ICCV 2017",
      title: "全卷积网络在细胞显微图像分割中的迁移学习",
      authors: "张明*, 等",
      image: "assets/outcome-benchmark.png",
      description: "将自然图像预训练模型迁移至显微细胞分割任务。",
      links: { PDF: "#" }
    },
    {
      type: "论文",
      year: "2016",
      venue: "MICCAI 2016",
      title: "冠状动脉 CTA 血管中心线自动提取方法",
      authors: "张明*, 等",
      description: "结合形态学与深度学习完成血管中心线跟踪。",
      links: { PDF: "#" }
    },
    {
      type: "论文",
      year: "2015",
      venue: "CVPR 2015",
      title: "基于稀疏编码的组织病理图像特征表示",
      authors: "张明*, 等",
      description: "利用稀疏表示提取病理切片判别特征，服务癌症分级。",
      links: { PDF: "#" }
    }
  ],
  people: [
    {
      name: "刘陈华",
      group: "导师",
      role: "教授、硕士生导师",
      title: "实验室负责人",
      focus: "计算凸优化、光谱重建算法",
      email: "liuchenhua023@163.com"
    },
    {
      name: "辛笛",
      group: "导师",
      role: "教授、博士生导师",
      focus: "光谱智能计算、计算成像、可信学习",
      email: "xindi@example.edu"
    },
    {
      name: "邓磊",
      group: "在读学生",
      role: "博士研究生",
      focus: "高光谱反演与不确定性估计",
      year: "2023 级",
      email: "denglei@example.edu"
    },
    {
      name: "祝连庆",
      group: "在读学生",
      role: "硕士研究生",
      focus: "光谱数据集与可复现评测",
      year: "2024 级",
      email: "zhulianqing@example.edu"
    },
    {
      name: "董明利",
      group: "在读学生",
      role: "硕士研究生",
      focus: "光谱仪器标定与系统集成",
      year: "2024 级",
      email: "dongmingli@stu.example.edu"
    },
    {
      name: "黎浩",
      group: "已毕业",
      role: "硕士研究生（外校指导）",
      year: "2022 级",
      focus: "光谱数据分析",
      destination: "东南大学（攻读博士）",
      email: "lihao@example.edu"
    },
    {
      name: "官子愈",
      group: "已毕业",
      role: "硕士研究生（外校指导）",
      year: "2022 级",
      focus: "光谱成像",
      destination: "中国水利水电科学院（攻读博士）",
      email: "guanziyu@example.edu"
    },
    {
      name: "王柯玄",
      group: "已毕业",
      role: "硕士研究生（外校指导）",
      year: "2023 级",
      focus: "光谱算法",
      destination: "上海智辰半导体算法工程师",
      email: "wangkexuan@example.edu"
    },
    {
      name: "刘旭",
      group: "已毕业",
      role: "硕士研究生（外校指导）",
      year: "2022 级",
      focus: "光谱重建",
      destination: "四川大学（攻读博士）",
      email: "liuxu@example.edu"
    },
    {
      name: "王佩凡",
      group: "已毕业",
      role: "本科生（外校指导）",
      year: "2021 级",
      focus: "光谱可视化",
      destination: "江西理工大学（攻读硕士）",
      email: "wangpeifan@example.edu"
    },
    {
      name: "申伟",
      group: "已毕业",
      role: "本科生（外校指导）",
      year: "2023 级",
      focus: "光谱数据处理",
      destination: "湖北工业大学（攻读硕士）",
      email: "shenwei@example.edu"
    }
  ],
  news: [
    { date: "2026-05", title: "示例新闻", body: "请通过本地 HTTP 服务预览完整数据。" }
  ],
  resources: [
    { title: "数据集", summary: "公开数据与访问说明。", links: { 目录: "#" } }
  ],
  recruitment: [
    {
      type: "研究生招生",
      status: "常年招生",
      title: "硕士研究生 / 博士研究生",
      body: "欢迎对计算机视觉、光谱智能计算、多模态学习感兴趣的同学报考。请提前邮件联系并附简历、成绩单与研究计划（如有）。",
      requirements: ["通过 CET-4", "具有一定的编程基础", "热爱生活", "热爱运动"]
    }
  ]
};

function embeddedData(key) {
  const bag = window.LAB_DATA;
  if (!bag || bag[key] == null) return null;
  return bag[key];
}

async function loadJson(key) {
  try {
    const response = await fetch(endpoints[key], { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${key}`);
    const data = await response.json();
    if (Array.isArray(data) || (data && typeof data === "object")) return data;
    throw new Error(`Invalid ${key} payload`);
  } catch (err) {
    const embedded = embeddedData(key);
    if (embedded != null) {
      console.info(`[lab] 使用内嵌数据: ${key}`, err?.message || "");
      return embedded;
    }
    console.warn(`[lab] 使用内置占位数据: ${key}`, err);
    return fallbackData[key];
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTags(tags = []) {
  if (!tags.length) return "";
  return `<div class="tag-list">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function renderLinks(links = {}, className = "link-row") {
  const items = Object.entries(links || {}).filter(([, href]) => href);
  if (!items.length) return "";
  return `<div class="${className}">${items
    .map(([label, href]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`)
    .join("")}</div>`;
}

function initials(name = "") {
  const clean = name.replace(/\s+/g, "");
  return clean.slice(-2) || clean.slice(0, 2) || "—";
}

function applySite(site) {
  const { lab, meta, nav, hero, about, contact, archives, sections, footer } = site;

  document.title = meta?.title || `${lab.name} | ${lab.university}`;
  const desc = document.querySelector("[data-page-description]");
  if (desc) desc.setAttribute("content", meta?.description || "");

  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el && text != null) {
      if (typeof text === "string" && text.includes("\n")) {
        el.innerHTML = text.replace(/\n/g, "<br>");
      } else {
        el.textContent = text;
      }
    }
  };

  setText("[data-university]", lab.university);
  setText("[data-college]", lab.college);
  setText("[data-brand-mark]", lab.mark);
  setText("[data-lab-name]", lab.name);
  setText("[data-lab-subtitle]", lab.subtitle);

  const navEl = document.querySelector("[data-nav]");
  if (navEl) {
    navEl.innerHTML = (nav || [])
      .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
      .join("");
  }

  setText("[data-hero-badge]", hero?.badge);
  setText("[data-hero-title]", hero?.title);
  setText("[data-hero-lead]", hero?.lead);

  const keywordsEl = document.querySelector("[data-hero-keywords]");
  if (keywordsEl) {
    keywordsEl.innerHTML = (hero?.keywords || [])
      .map((k) => `<span>${escapeHtml(k)}</span>`)
      .join("");
  }

  const actionsEl = document.querySelector("[data-hero-actions]");
  if (actionsEl) {
    actionsEl.innerHTML = (hero?.actions || [])
      .map(
        (action) =>
          `<a class="button ${escapeHtml(action.variant || "primary")}" href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>`
      )
      .join("");
  }

  const figure = document.querySelector("[data-hero-figure]");
  if (figure && hero?.image) {
    figure.hidden = false;
    const img = figure.querySelector("[data-hero-image]");
    if (img) {
      img.src = hero.image;
      img.alt = `${hero.title || lab.name} 配图`;
      img.onerror = () => {
        figure.hidden = true;
      };
    }
    setText("[data-hero-caption]", hero.imageCaption);
  } else if (figure) {
    figure.hidden = true;
  }

  const sec = sections || {};
  const bindSection = (key, tagSel, titleSel, introSel) => {
    const block = sec[key];
    if (!block) return;
    setText(tagSel, block.eyebrow);
    setText(titleSel, block.title);
    if (introSel) setText(introSel, block.intro);
  };

  bindSection("about", "[data-about-tag]", "[data-about-title]", null);
  if (!sec.about?.title) setText("[data-about-title]", about?.title || "实验室简介");

  const aboutText = document.querySelector("[data-about-text]");
  if (aboutText) {
    aboutText.innerHTML = (about?.paragraphs || [])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  const highlights = document.querySelector("[data-about-highlights]");
  if (highlights) {
    highlights.innerHTML = (about?.highlights || [])
      .map(
        (item) => `
          <div class="fact-item">
            <span class="fact-label">${escapeHtml(item.label)}</span>
            <span class="fact-value">${escapeHtml(item.value)}</span>
          </div>
        `
      )
      .join("");
  }

  bindSection("research", "[data-research-tag]", "[data-research-title]", "[data-research-intro]");
  bindSection("publications", "[data-pub-tag]", "[data-pub-title]", "[data-pub-intro]");
  bindSection("projects", "[data-proj-tag]", "[data-proj-title]", "[data-proj-intro]");
  bindSection("people", "[data-people-tag]", "[data-people-title]", "[data-people-intro]");
  bindSection("alumni", "[data-alumni-tag]", "[data-alumni-title]", "[data-alumni-intro]");
  bindSection("news", "[data-news-tag]", "[data-news-title]", "[data-news-intro]");
  bindSection("recruitment", "[data-recruit-tag]", "[data-recruit-title]", "[data-recruit-intro]");

  setText("[data-contact-tag]", sec.contact?.eyebrow || "联系我们");
  setText("[data-contact-title]", contact?.title || "联系我们");
  setText("[data-contact-intro]", contact?.intro);

  const archivePub = document.querySelector("[data-archive-publications]");
  if (archivePub) archivePub.href = archives?.publications || "#";
  const archiveNews = document.querySelector("[data-archive-news]");
  if (archiveNews) archiveNews.href = archives?.news || "#";

  const contactEl = document.querySelector("[data-contact]");
  if (contactEl) {
    const email = contact?.email
      ? `<a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>`
      : "";
    const phone = contact?.phone ? `<span>${escapeHtml(contact.phone)}</span>` : "";
    const links = (contact?.links || [])
      .map((l) => `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`)
      .join("");
    const copyBtn = contact?.email
      ? `<button type="button" class="demo-btn demo-btn--small" data-copy-email="${escapeHtml(contact.email)}">复制邮箱</button>`
      : "";
    contactEl.innerHTML = `
      <strong>${escapeHtml(contact?.organization || lab.name)}</strong>
      <span>${escapeHtml(lab.university)} ${escapeHtml(lab.college || "")}</span>
      <span>${escapeHtml(contact?.address || "")}</span>
      ${email}
      ${phone}
      ${copyBtn}
      <div class="contact-links">${links}</div>
    `;
  }

  setText("[data-footer-copyright]", footer?.copyright);
  setText("[data-footer-note]", footer?.note);
}

function groupPeople(people, order = []) {
  const buckets = new Map();
  for (const person of people) {
    const group = person.group || "其他";
    if (!buckets.has(group)) buckets.set(group, []);
    buckets.get(group).push(person);
  }

  const ordered = [];
  for (const name of order) {
    if (buckets.has(name)) {
      ordered.push([name, buckets.get(name)]);
      buckets.delete(name);
    }
  }
  for (const [name, members] of buckets) ordered.push([name, members]);
  return ordered;
}

function demoBlock(demoId, extra = "") {
  if (!demoId || !window.LabDemos) return extra;
  return `${extra}
    <button type="button" class="demo-btn" data-demo-trigger="${escapeHtml(demoId)}" aria-expanded="false">交互演示</button>
    <div class="demo-panel" data-demo-panel hidden></div>`;
}

function renderResearch(items) {
  const el = document.querySelector("[data-research]");
  if (!el) return;
  el.innerHTML = items
    .map(
      (item) => `
        <article class="research-card">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          ${renderTags(item.tags)}
          ${demoBlock(item.demoId)}
        </article>
      `
    )
    .join("");
}

function publicationThumb(item) {
  const pdf = item.links?.PDF || item.links?.论文 || item.links?.pdf;
  const alt = `${item.title} 论文示意图`;
  if (item.image) {
    const href = pdf ? escapeHtml(pdf) : "#";
    const tag = pdf ? "a" : "div";
    return `
      <${tag} class="pub-thumb"${pdf ? ` href="${href}" target="_blank" rel="noopener"` : ""}>
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.parentElement.classList.add('is-fallback'); this.remove();">
        <span class="pub-thumb-fallback" aria-hidden="true">论文</span>
      </${tag}>
    `;
  }
  return `
    <div class="pub-thumb is-fallback" aria-hidden="true">
      <span class="pub-thumb-fallback">论文</span>
    </div>
  `;
}

function bibtexEntry(item) {
  const key = (item.title || "paper").slice(0, 12).replace(/\s/g, "");
  return `@inproceedings{${key}${item.year},
  title={${item.title || ""}},
  author={${item.authors || ""}},
  booktitle={${item.venue || ""}},
  year={${item.year || ""}}
}`;
}

function publicationCardHtml(item) {
  const cite = escapeHtml(bibtexEntry(item).replace(/\s+/g, " ").trim());
  return `
    <article class="pub-card" data-pub-year="${escapeHtml(String(item.year ?? ""))}">
      ${publicationThumb(item)}
      <div class="pub-body">
        <p class="pub-meta"><span class="pub-type">论文</span> · ${escapeHtml(item.venue)} · ${escapeHtml(item.year)}</p>
        <h3 class="pub-title">${escapeHtml(item.title)}</h3>
        ${item.authors ? `<p class="pub-authors">${escapeHtml(item.authors)}</p>` : ""}
        ${item.description ? `<p class="pub-desc">${escapeHtml(item.description)}</p>` : ""}
        ${renderLinks(item.links, "pub-links")}
        <button type="button" class="demo-btn demo-btn--small" data-cite="${cite}">复制引用</button>
      </div>
    </article>
  `;
}

function publicationYears(papers) {
  const years = [...new Set(papers.map((p) => String(p.year ?? "").trim()).filter(Boolean))];
  return years.sort((a, b) => Number(b) - Number(a) || b.localeCompare(a, "zh-CN"));
}

function filterPublicationsByYear(papers, filterValue) {
  if (!filterValue || filterValue === "all") return papers;
  if (filterValue === "before-2025") {
    return papers.filter((p) => Number(p.year) < 2025);
  }
  return papers.filter((p) => String(p.year ?? "") === filterValue);
}

function initPublications(papers, sectionConfig = {}) {
  const grid = document.querySelector("[data-publications]");
  const toolbar = document.querySelector("[data-pub-toolbar]");
  const select = document.querySelector("[data-pub-year-filter]");
  const countEl = document.querySelector("[data-pub-count]");
  const totalEl = document.querySelector("[data-pub-total]");
  const labelEl = document.querySelector("[data-pub-filter-label]");
  if (!grid) return;

  const label = sectionConfig.yearFilterLabel || "发表年份";
  const allLabel = sectionConfig.yearFilterAll || "全部年份";
  if (labelEl) labelEl.textContent = label;

  // Pagination state
  let currentPage = 1;
  const pageSize = 4;
  let currentFiltered = papers;

  const renderGrid = (fullList) => {
    const start = (currentPage - 1) * pageSize;
    const pageItems = fullList.slice(start, start + pageSize);
    if (!pageItems.length) {
      grid.innerHTML = `<p class="section-empty">该筛选条件下暂无论文。</p>`;
      return;
    }
    grid.innerHTML = pageItems.map((item) => publicationCardHtml(item)).join("");
    // Re-attach cite buttons after re-render
    window.LabDemos?.initPublications?.();
  };

  const updateTotals = (list, filterValue) => {
    if (totalEl) {
      let display = `共 ${list.length} 篇论文`;
      if (filterValue === "before-2025") display = `2025 之前共 ${list.length} 篇`;
      else if (filterValue === "2026") display = `2026 年共 ${list.length} 篇`;
      else if (filterValue === "2027") display = `2027 年共 ${list.length} 篇`;
      totalEl.textContent = display;
    }
    if (!countEl) return;
    if (papers.length === list.length) {
      countEl.hidden = true;
      return;
    }
    countEl.hidden = false;
    countEl.textContent = `（已筛选 ${list.length} / ${papers.length}）`;
  };

  const renderPagination = (total) => {
    let pag = document.querySelector("[data-pub-pagination]");
    if (!pag) {
      pag = document.createElement("div");
      pag.className = "pub-pagination";
      pag.setAttribute("data-pub-pagination", "");
      grid.parentNode.appendChild(pag);
    }
    const totalPages = Math.ceil(total / pageSize) || 1;
    pag.innerHTML = `
      <button class="demo-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>上一页</button>
      <span class="pub-page-info">第 ${currentPage} / ${totalPages} 页</span>
      <button class="demo-btn" data-page="next" ${currentPage >= totalPages ? "disabled" : ""}>下一页</button>
    `;
    pag.querySelectorAll("[data-page]").forEach((btn) => {
      btn.onclick = () => {
        if (btn.getAttribute("data-page") === "prev" && currentPage > 1) currentPage--;
        if (btn.getAttribute("data-page") === "next" && currentPage < totalPages) currentPage++;
        renderGrid(currentFiltered);
        renderPagination(currentFiltered.length);
      };
    });
  };

  if (!papers.length) {
    if (toolbar) toolbar.hidden = true;
    grid.innerHTML =
      '<p class="section-empty">暂无论文条目，请在 data/outcomes.json 中添加 type 为「论文」的记录。</p>';
    return;
  }

  // Fixed filter options as requested
  const filterOptions = [
    { value: "all", label: allLabel },
    { value: "before-2025", label: "2025 之前" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" }
  ];

  if (toolbar && select) {
    toolbar.hidden = false;
    select.innerHTML = filterOptions
      .map((opt) => `<option value="${opt.value}">${escapeHtml(opt.label)}</option>`)
      .join("");

    select.onchange = () => {
      currentPage = 1;
      currentFiltered = filterPublicationsByYear(papers, select.value);
      renderGrid(currentFiltered);
      updateTotals(currentFiltered, select.value);
      renderPagination(currentFiltered.length);
    };
  }

  currentFiltered = papers;
  renderGrid(currentFiltered);
  updateTotals(currentFiltered, "all");
  renderPagination(currentFiltered.length);
  window.LabDemos?.initPublications?.();
}

function renderProjects(projects) {
  const el = document.querySelector("[data-projects]");
  if (!el) return;
  if (!projects.length) {
    el.innerHTML = `<p class="section-empty">暂无项目条目。</p>`;
    return;
  }
  el.innerHTML = projects
    .map((item) => {
      const image = item.image
        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} 配图" loading="lazy" onerror="this.remove()">`
        : "";
      return `
        <article class="outcome-card project-card">
          ${image}
          <div class="outcome-body">
            <div class="outcome-type">${escapeHtml(item.type)} · ${escapeHtml(item.venue)} · ${escapeHtml(item.year)}</div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description || "")}</p>
            ${renderLinks(item.links, "outcome-links")}
            ${demoBlock(item.demoId)}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPeople(people, groupOrder, sectionConfig = {}) {
  const el = document.querySelector("[data-people]");
  if (!el) return;
  const destLabel = sectionConfig.destinationLabel || "毕业去向";
  const emailLabel = sectionConfig.emailLabel || "邮箱";
  const groups = groupPeople(people, groupOrder);

  // Helper to render a single person card
  const renderPersonCard = (person) => {
    const meta = [person.role, person.year].filter(Boolean).join(" · ");
    const links = [];
    if (person.homepage) {
      links.push(`<a href="${escapeHtml(person.homepage)}">个人主页</a>`);
    }
    const linkRow = links.length ? `<div class="person-links">${links.join("")}</div>` : "";
    const destination = person.destination
      ? `<p class="person-destination"><span class="person-label">${escapeHtml(destLabel)}</span>${escapeHtml(person.destination)}</p>`
      : "";
    const email = person.email
      ? `<p class="person-email"><span class="person-label">${escapeHtml(emailLabel)}</span><a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a></p>`
      : "";
    const folder = person.group === "导师" ? "teacher" : "student";
    const avatarData = person.photo
      ? ` data-photo="assets/people/${folder}/${escapeHtml(person.photo)}" data-bio="${escapeHtml(person.bio || "")}"`
      : "";
    return `
      <article class="person-card">
        <div class="avatar"${avatarData} aria-hidden="true">${escapeHtml(initials(person.name))}</div>
        <div>
          <h4>${escapeHtml(person.name)}${person.title ? `<span class="person-title">${escapeHtml(person.title)}</span>` : ""}</h4>
          <strong>${escapeHtml(meta)}</strong>
          <p class="person-focus">${escapeHtml(person.focus || "")}</p>
          ${destination}
          ${email}
          ${linkRow}
        </div>
      </article>
    `;
  };

  el.innerHTML = groups
    .filter(([, members]) => members.length)
    .map(([group, members]) => {
      const isStudentGroup = group === "在读学生";
      const pageSize = 6;
      let currentPage = 1;
      let currentMembers = members;

      const buildGridHTML = (pageMembers) => pageMembers.map(renderPersonCard).join("");

      let paginationHTML = "";
      let gridHTML = buildGridHTML(members);

      if (isStudentGroup && members.length > pageSize) {
        const totalPages = Math.ceil(members.length / pageSize);
        const start = (currentPage - 1) * pageSize;
        gridHTML = buildGridHTML(members.slice(start, start + pageSize));
        paginationHTML = `
          <div class="pub-pagination" data-student-pagination>
            <button class="demo-btn" data-page="prev" disabled>上一页</button>
            <span class="pub-page-info">第 ${currentPage} / ${totalPages} 页</span>
            <button class="demo-btn" data-page="next">下一页</button>
          </div>
        `;
      }

      return `
        <section class="people-group">
          <h3 class="people-group-title">${escapeHtml(group)}</h3>
          <div class="people-grid" data-student-grid>
            ${gridHTML}
          </div>
          ${paginationHTML}
        </section>
      `;
    })
    .join("");

  // Attach pagination handlers for 在读学生 group
  const studentSection = Array.from(el.querySelectorAll(".people-group")).find(
    (sec) => sec.querySelector(".people-group-title")?.textContent === "在读学生"
  );

  if (studentSection) {
    const grid = studentSection.querySelector('[data-student-grid]');
    const pag = studentSection.querySelector('[data-student-pagination]');
    if (grid && pag) {
      const allMembers = groups.find(([g]) => g === "在读学生")?.[1] || [];
      const pageSize = 6;
      let currentPage = 1;
      const totalPages = Math.ceil(allMembers.length / pageSize);

      const update = () => {
        const start = (currentPage - 1) * pageSize;
        grid.innerHTML = allMembers.slice(start, start + pageSize).map(renderPersonCard).join("");
        pag.innerHTML = `
          <button class="demo-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>上一页</button>
          <span class="pub-page-info">第 ${currentPage} / ${totalPages} 页</span>
          <button class="demo-btn" data-page="next" ${currentPage >= totalPages ? "disabled" : ""}>下一页</button>
        `;
        attachPersonPopups(grid);
        // re-bind buttons
        bindStudentPagination();
      };

      const bindStudentPagination = () => {
        pag.querySelectorAll("[data-page]").forEach((btn) => {
          btn.onclick = () => {
            const action = btn.getAttribute("data-page");
            if (action === "prev" && currentPage > 1) currentPage--;
            if (action === "next" && currentPage < totalPages) currentPage++;
            update();
          };
        });
      };

      bindStudentPagination();
    }
  }

  // Attach hover popups for people with photo/bio
  attachPersonPopups(el);
}

function attachPersonPopups(rootEl) {
  if (!rootEl) return;
  const popupContainer = document.getElementById("person-popup-root") || (() => {
    const c = document.createElement("div");
    c.id = "person-popup-root";
    c.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:2000;";
    document.body.appendChild(c);
    return c;
  })();

  let activePopup = null;

  rootEl.querySelectorAll(".avatar[data-photo]").forEach((avatar) => {
    const photoSrc = avatar.getAttribute("data-photo");
    const bioText = avatar.getAttribute("data-bio") || "";

    avatar.addEventListener("mouseenter", () => {
      if (activePopup) activePopup.remove();

      const pop = document.createElement("div");
      pop.className = "person-popup";
      pop.style.pointerEvents = "auto";
      pop.innerHTML = `
        <img src="${photoSrc}" alt="照片" onerror="this.style.display='none'">
        ${bioText ? `<div class="bio">${bioText}</div>` : ""}
      `;
      popupContainer.appendChild(pop);
      activePopup = pop;

      const rect = avatar.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const popWidth = 240;
      let left = rect.left + scrollX + rect.width / 2 - popWidth / 2;
      left = Math.max(16, Math.min(left, window.innerWidth - popWidth - 16));
      pop.style.left = `${left}px`;
      pop.style.top = `${rect.bottom + scrollY + 10}px`;
      pop.style.display = "block";

      const hide = () => {
        if (pop && pop.parentNode) pop.parentNode.removeChild(pop);
        if (activePopup === pop) activePopup = null;
        avatar.removeEventListener("mouseleave", hide);
        pop.removeEventListener("mouseleave", hide);
      };
      avatar.addEventListener("mouseleave", hide, { once: true });
      pop.addEventListener("mouseleave", hide, { once: true });
    });
  });
}

function renderAlumni(people) {
  const el = document.querySelector("[data-alumni]");
  if (!el) return;
  const alumni = people.filter((p) => p.destination);
  if (!alumni.length) {
    el.innerHTML = `<p class="section-empty">暂无毕业学生去向记录。</p>`;
    return;
  }
  const folder = "student";
  el.innerHTML = alumni
    .map(
      (person) => {
        const avatarData = person.photo
          ? ` data-photo="assets/people/${folder}/${escapeHtml(person.photo)}" data-bio="${escapeHtml(person.bio || "")}"`
          : "";
        return `
          <article class="alumni-card">
            <div class="avatar"${avatarData} aria-hidden="true">${escapeHtml(initials(person.name))}</div>
            <div>
              <h4>${escapeHtml(person.name)}</h4>
              <strong>${escapeHtml(person.role || "")}</strong>
              <p class="alumni-destination"><span class="person-label">去向</span>${escapeHtml(person.destination)}</p>
              ${person.email ? `<p class="alumni-email"><a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a></p>` : ""}
            </div>
          </article>
        `;
      }
    )
    .join("");

  // Attach hover popups for alumni with photo/bio
  attachPersonPopups(el);
}

function renderNews(items) {
  const el = document.querySelector("[data-news]");
  if (!el) return;

  // Pagination + search state (per render call)
  let currentPage = 1;
  const pageSize = 5;
  let currentFiltered = items || [];
  let searchInput = document.querySelector("[data-news-search]");

  const renderList = (list) => {
    const start = (currentPage - 1) * pageSize;
    const pageItems = list.slice(start, start + pageSize);
    if (!pageItems.length) {
      el.innerHTML = `<li class="news-item"><div class="news-body"><p class="section-empty">暂无匹配的动态。</p></div></li>`;
      return;
    }
    el.innerHTML = pageItems
      .map(
        (item) => `
          <li class="news-item">
            <time class="news-date">${escapeHtml(item.date)}</time>
            <div class="news-body">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.body)}</p>
              ${item.link ? `<a class="news-more" href="${escapeHtml(item.link.href)}">${escapeHtml(item.link.label || "详情")}</a>` : ""}
            </div>
          </li>
        `
      )
      .join("");
  };

  const renderPagination = (total) => {
    let pag = el.parentNode.querySelector("[data-news-pagination]");
    if (!pag) {
      pag = document.createElement("div");
      pag.className = "pub-pagination";
      pag.setAttribute("data-news-pagination", "");
      el.parentNode.appendChild(pag);
    }
    const totalPages = Math.ceil(total / pageSize) || 1;
    pag.innerHTML = `
      <button class="demo-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>上一页</button>
      <span class="pub-page-info">第 ${currentPage} / ${totalPages} 页</span>
      <button class="demo-btn" data-page="next" ${currentPage >= totalPages ? "disabled" : ""}>下一页</button>
    `;
    pag.querySelectorAll("[data-page]").forEach((btn) => {
      btn.onclick = () => {
        if (btn.getAttribute("data-page") === "prev" && currentPage > 1) currentPage--;
        if (btn.getAttribute("data-page") === "next" && currentPage < totalPages) currentPage++;
        renderList(currentFiltered);
        renderPagination(currentFiltered.length);
      };
    });
  };

  // Setup search once
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = "true";
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      currentPage = 1;
      currentFiltered = !q
        ? items
        : items.filter((it) => (it.title + " " + it.body).toLowerCase().includes(q));
      renderList(currentFiltered);
      renderPagination(currentFiltered.length);
    });
  }

  currentFiltered = items || [];
  renderList(currentFiltered);
  renderPagination(currentFiltered.length);
}

function renderRecruitment(items) {
  const el = document.querySelector("[data-recruitment]");
  if (!el) return;
  el.innerHTML = items
    .map(
      (item) => `
        <article class="recruit-card">
          <div class="recruit-head">
            <span class="recruit-type">${escapeHtml(item.type)}</span>
            <span class="recruit-status">${escapeHtml(item.status || "")}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
          ${
            item.requirements?.length
              ? `<ul class="recruit-req">${item.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`
              : ""
          }
          <button type="button" class="demo-btn demo-btn--small" data-mail-template="${escapeHtml(item.title)}">生成咨询邮件</button>
          ${item.link ? `<a class="text-link" href="${escapeHtml(item.link.href)}">${escapeHtml(item.link.label)}</a>` : ""}
        </article>
      `
    )
    .join("");
}

function setupNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function showLoadError(message) {
  const box = document.getElementById("load-error");
  if (!box) return;
  box.hidden = false;
  box.textContent = message;
}

async function init() {
  try {
    const [site, research, outcomes, people, news, recruitment] =
      await Promise.all([
        loadJson("site"),
        loadJson("research"),
        loadJson("outcomes"),
        loadJson("people"),
        loadJson("news"),
        loadJson("recruitment")
      ]);

    if (!site?.lab) throw new Error("site.json 缺少 lab 配置");

    applySite(site);
    renderResearch(Array.isArray(research) ? research : []);

    const list = Array.isArray(outcomes) ? outcomes : [];
    const papers = list.filter((item) => item.type === "论文");
    const projects = list.filter((item) => item.type !== "论文");
    initPublications(papers, site.sections?.publications);
    renderProjects(projects);

    renderPeople(
      Array.isArray(people) ? people : [],
      site.personGroupOrder || [],
      site.sections?.people
    );
    renderAlumni(Array.isArray(people) ? people : []);
    renderNews(Array.isArray(news) ? news : []);
    renderRecruitment(Array.isArray(recruitment) ? recruitment : []);
    setupNavToggle();

    if (window.LabDemos) {
      LabDemos.attachTriggers();
      LabDemos.initPeopleFilter(Array.isArray(people) ? people : []);
      LabDemos.initNewsSearch();
      LabDemos.initContactCopy();
    }
    document.querySelectorAll("[data-mail-template]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const subject = encodeURIComponent(`咨询：${btn.getAttribute("data-mail-template")}`);
        const body = encodeURIComponent(
          "老师您好，\n\n我对贵实验室的招生信息很感兴趣，附上个人简历与研究计划，恳请指正。\n\n此致\n敬礼"
        );
        window.location.href = `mailto:liuchenhua023@163.com?subject=${subject}&body=${body}`;
      });
    });
  } catch (err) {
    console.error("[lab] 页面初始化失败", err);
    showLoadError(
      `页面加载失败：${err.message}。请用本地服务器打开（见 README），或检查 data/lab-data.js 是否存在。`
    );
  }
}

init();
