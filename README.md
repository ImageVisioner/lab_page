# 智能计算摄影成像课题组主页

面向**国内高校课题组**风格的静态学术主页：顶部校名栏、中文导航、简介/论文列表/成员分组/招生/新闻/资源等常见栏目，**全部内容由 `data/` 目录 JSON 驱动**，无需改 HTML 即可日常维护。

## 快速开始

### 1. 本地预览（推荐）

**方式 A（推荐）**：双击 `preview.bat`，浏览器访问 `http://127.0.0.1:8080`（使用 PowerShell 内置服务，**无需 Node.js**）。改 `data/*.json` 后保存并刷新即可。

**方式 B**：直接双击 `index.html` 也能正常浏览（自动使用 `data/lab-data.js` 内嵌数据）。

**方式 C**：若已安装 Node / Python，也可自行启动 HTTP 服务：

```bash
npx --yes serve -l 8080
# 或: python -m http.server 8080
```

### 2. 修改 JSON 后如何生效

| 打开方式 | 操作 |
|----------|------|
| `preview.bat` / 本地服务器 | 保存 JSON 后 **刷新页面** 即可 |
| 直接双击 `index.html` | 保存 JSON 后，双击 **`sync-data.bat`** 同步到 `lab-data.js`，再 **刷新页面** |

同步命令（任选其一）：

```powershell
# 双击 sync-data.bat，或命令行：
powershell -ExecutionPolicy Bypass -File scripts\sync-lab-data.ps1
```

### 3. 部署

将整个目录上传到 **GitHub Pages**、学院服务器、Nginx 静态目录等即可。确保 `index.html`、`app.js`、`styles.css`、`data/`、`assets/` 路径不变。

---

## 目录结构

| 路径 | 说明 |
|------|------|
| `index.html` | 页面骨架（栏目占位，一般不需改） |
| `styles.css` | 课题组风格样式（蓝主色、简介首行缩进、论文列表等） |
| `app.js` | 读取 JSON 并渲染；可改 `endpoints` 对接远程 API |
| `data/site.json` | **站点总配置**：名称、导航、简介、联系方式、栏目标题 |
| `data/research.json` | 研究方向卡片 |
| `data/outcomes.json` | 论文 + 项目（按 `type` 字段分流展示） |
| `data/people.json` | 团队成员（按 `group` 分组） |
| `data/news.json` | 新闻通知 |
| `data/recruitment.json` | 招生/招聘 |
| `data/resources.json` | 数据集、代码、组内资料链接 |
| `data/lab-data.js` | JSON 内嵌副本（`file://` 打开时用；由同步脚本生成） |
| `sync-data.bat` | 一键同步 JSON → `lab-data.js`（双击打开 `index.html` 时用） |
| `scripts/sync-lab-data.ps1` | 同上（PowerShell 脚本） |
| `preview.bat` | 本地 HTTP 预览（无需 Node） |
| `demos.js` | 各栏目交互演示（光谱曲线、分类、评测表、资源下载等） |
| `assets/` | 图片（如 `lab-hero.png`、成果配图，可自行增删） |

---

## 数据接口说明

### 总配置 `data/site.json`

修改后影响全站标题、顶栏、导航、首页横幅、简介、页脚与「更多论文/更多动态」链接：

```json
{
  "lab": {
    "name": "智能计算摄影成像课题组",
    "mark": "影",
    "university": "某某大学",
    "college": "计算机学院"
  },
  "nav": [{ "label": "研究方向", "href": "#research" }],
  "archives": {
    "publications": "https://你的完整论文页",
    "news": "https://你的新闻归档页"
  },
  "personGroupOrder": ["导师", "博士后", "博士生", "硕士生", "本科生", "已毕业"]
}
```

- `personGroupOrder`：成员分组显示顺序；`people.json` 里出现但未列出的分组会排在最后。
- `sections.*`：各栏目的中文小标题与说明文字。
- `hero.image`：留空或删除则首页不显示配图（适合暂无照片时）。

### 研究方向 `data/research.json`

数组，每项字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 方向名称 |
| `summary` | 是 | 简要介绍 |
| `tags` | 否 | 关键词标签数组 |

### 成果 `data/outcomes.json`

| 字段 | 说明 |
|------|------|
| `type` | **`论文`** → 显示在「代表性论文」卡片（含缩略图）；**其他**（如 `项目`）→ 显示在「代表性项目」 |
| `year` / `venue` | 年份、期刊或会议 |
| `title` | 论文题目 |
| `authors` | 作者行（建议用 `*` 标注通讯作者） |
| `description` | 可选，简短摘要 |
| `image` | **论文/项目缩略图**路径（如 `assets/paper-xxx.png`，建议 16:9 或 4:3 示意图、方法框图或论文配图） |
| `links` | 对象，如 `{ "PDF": "url", "代码": "url" }`；有 `PDF` 时点击缩略图可跳转 |

新增论文示例：

```json
{
  "type": "论文",
  "year": "2026",
  "venue": "CVPR 2026",
  "title": "论文完整题目",
  "authors": "张三, 李四*, 等",
  "description": "一两句工作简介。",
  "image": "assets/paper-cvpr2026.png",
  "links": { "PDF": "https://...", "代码": "https://..." }
}
```

未填写 `image` 时显示占位块；图片加载失败时自动回退为占位。

**年份筛选**：论文列表上方有下拉框，选项根据 `outcomes.json` 中各条目的 `year` 自动生成（新到旧排序）。文案可在 `data/site.json` → `sections.publications` 中配置：

```json
"yearFilterLabel": "发表年份",
"yearFilterAll": "全部年份"
```

### 成员 `data/people.json`

| 字段 | 说明 |
|------|------|
| `name` | 姓名 |
| `group` | 分组名，需与 `site.json` 的 `personGroupOrder` 一致或自定 |
| `role` | 职称/身份，如「教授、博士生导师」 |
| `title` | 可选，如「实验室负责人」 |
| `year` | 可选，如「2024 级」 |
| `focus` | 研究方向简述 |
| `email` | 联系邮箱，页面显示为可点击的 `mailto:` 链接 |
| `destination` | **毕业去向**（建议用于 `group: "已毕业"` 学生），如「某某大学 副教授」「某企业 算法工程师」 |
| `homepage` | 可选，个人主页链接 |

已毕业学生示例：

```json
{
  "name": "李华",
  "group": "已毕业",
  "role": "博士研究生",
  "year": "2020 级",
  "focus": "医学图像分割",
  "destination": "某某大学 计算机学院 副教授",
  "email": "lihua@university.edu"
}
```

栏目标签可在 `data/site.json` → `sections.people` 中修改 `destinationLabel`、`emailLabel`。

后续可扩展字段：`photo`、`googleScholar` 等（需在 `app.js` 的 `renderPeople` 中增加渲染）。

### 新闻 `data/news.json`

```json
{
  "date": "2026-05",
  "title": "标题",
  "body": "正文",
  "link": { "label": "详情", "href": "https://..." }
}
```

`link` 可省略。

### 招生 `data/recruitment.json`

| 字段 | 说明 |
|------|------|
| `type` | 如「研究生招生」 |
| `status` | 如「常年招生」 |
| `title` / `body` | 标题与说明 |
| `requirements` | 字符串数组，显示为条目列表 |
| `link` | 单个链接对象 |

### 资源 `data/resources.json`

```json
{
  "title": "数据集",
  "summary": "说明文字",
  "links": { "目录": "https://...", "许可": "#" }
}
```

---

## 更换为远程 API / CMS

编辑 `app.js` 顶部 `endpoints`，将路径改为后端地址，**响应体需与对应 JSON 文件结构相同**：

```javascript
const endpoints = {
  site: "/api/site",
  research: "/api/research",
  outcomes: "/api/outcomes",
  people: "/api/people",
  news: "/api/news",
  resources: "/api/resources",
  recruitment: "/api/recruitment"
};
```

若某接口失败，页面会回退到 `app.js` 内 `fallbackData` 中的占位数据（生产环境建议保持 `fallbackData.site` 与真实信息一致）。

---

## 常见维护任务

1. **改名、换学校**：只改 `data/site.json` 的 `lab` 与 `contact`。
2. **增一篇论文**：编辑 `data/outcomes.json`，`type` 设为 `"论文"`，并放入 `assets/` 中的 `image` 缩略图。
3. **新同学入组**：在 `data/people.json` 增加对象，`group` 设为「硕士生」等；若直接双击打开网页，改完后运行 `scripts\sync-lab-data.ps1`。
4. **发通知**：在 `data/news.json` 数组顶部新增一条。
5. **换首页照片**：将图片放入 `assets/`，在 `site.json` 的 `hero.image` 写路径。
6. **隐藏某栏目**：在 `site.json` 的 `nav` 中删除对应项；若需彻底不展示，可再在 `index.html` 注释对应 `<section>`（一般只删导航即可）。

---

## 交互演示

各栏目支持**可操作的 Demo**（纯前端模拟，无需服务器）：

| 栏目 | 演示功能 |
|------|----------|
| 研究方向 | 每条方向卡片下「交互演示」：光谱曲线、分类、评测排序、仪器参数 |
| 科研项目 | 多模态匹配、评测对比、快检系统等 |
| 论文 | 「复制引用」生成 BibTeX |
| 开源资源 | 样例数据下载、复制 pip 命令、文档模板切换 |
| 团队成员 | 顶部分类筛选按钮 |
| 新闻 | 搜索框过滤 |
| 招生 | 「生成咨询邮件」 |
| 联系 | 「复制邮箱」 |

在 JSON 中为条目增加 `"demoId": "spectrum-imaging"` 等字段即可关联，`demoId` 列表见 `demos.js` 中 `LabDemos.templates`。

---

## 后续扩展建议

- **完整论文页**：将 `site.json` → `archives.publications` 指向独立页面或 Zotero/学院列表。
- **英文版**：复制一套 `data/en/*.json`，增加语言切换逻辑（可在 `app.js` 增加 `locale` 参数）。
- **成员照片**：在 `people.json` 增加 `photo` 字段，并修改 `renderPeople` 输出 `<img>`。
- **统计信息**：在 `site.json` 的 `about.highlights` 增加「论文数」「在研项目」等条目。

---

## 技术说明

- 纯静态：无构建步骤，适合课题组自行托管。
- 双击 `index.html` 时使用 `data/lab-data.js`；改 JSON 后运行 `sync-data.bat` 再刷新。需要实时读 JSON 时请用 `preview.bat`。
- 图片缺失时，首页配图与项目配图会自动隐藏，不影响其余内容显示。
