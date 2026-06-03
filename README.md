# 智能计算摄影成像课题组主页

面向**国内高校课题组**风格的静态学术主页：顶部校名栏、中文导航、简介/论文列表/成员分组/招生/新闻/资源等常见栏目，**全部内容由 `data/` 目录 JSON 驱动**，无需改 HTML 即可日常维护。

## 快速开始

### 1. 本地预览（推荐）

**方式 A（推荐）**：运行 PowerShell 脚本 `scripts/preview.ps1`，浏览器访问 `http://127.0.0.1:8080`（使用 PowerShell 内置服务，**无需 Node.js**）。修改 `data/*.json` 后保存并刷新即可。

**方式 B**：直接双击 `index.html` 也能正常浏览（自动使用 `data/lab-data.js` 内嵌数据）。

**方式 C**：若已安装 Node / Python，也可自行启动 HTTP 服务：

```bash
npx --yes serve -l 8080
# 或: python -m http.server 8080
```

### 2. 修改 JSON 后如何生效

| 打开方式                  | 操作                                      |
|---------------------------|-------------------------------------------|
| `preview.ps1` / 本地服务器 | 保存 JSON 后 **刷新页面** 即可             |
| 直接双击 `index.html`     | 保存 JSON 后，运行 `scripts/sync-lab-data.ps1` 同步到 `lab-data.js`，再 **刷新页面** |

同步命令：

```powershell
powershell -ExecutionPolicy Bypass -File scripts\sync-lab-data.ps1
```

### 3. 部署

将整个目录上传到 **GitHub Pages**、学院服务器、Nginx 静态目录等即可。确保 `index.html`、`app.js`、`styles.css`、`data/` 路径不变。如需使用图片资源，请在项目根目录创建 `assets/` 文件夹。

---

## 目录结构

| 路径                        | 说明                                                                 |
|-----------------------------|----------------------------------------------------------------------|
| `index.html`                | 页面骨架（栏目占位，一般不需改）                                     |
| `styles.css`                | 课题组风格样式（蓝主色、简介首行缩进、论文列表等）                   |
| `app.js`                    | 读取 JSON 并渲染；可改 `endpoints` 对接远程 API                      |
| `data/site.json`            | **站点总配置**：名称、导航、简介、联系方式、栏目标题                 |
| `data/research.json`        | 研究方向卡片                                                         |
| `data/outcomes.json`        | 论文 + 项目（按 `type` 字段分流展示）                                |
| `data/people.json`          | 团队成员（按 `group` 分组）                                          |
| `data/news.json`            | 新闻通知                                                             |
| `data/recruitment.json`     | 招生/招聘                                                            |
| `data/resources.json`       | 数据集、代码、组内资料链接                                           |
| `data/lab-data.js`          | JSON 内嵌副本（`file://` 打开时用；由同步脚本生成）                  |
| `scripts/sync-lab-data.ps1` | JSON → `lab-data.js` 同步脚本                                        |
| `scripts/preview.ps1`       | 本地 HTTP 预览（无需 Node）                                          |
| `demos.js`                  | 各栏目交互演示（光谱曲线、分类、评测表、资源下载等）                 |
| `assets/`                   | 图片资源文件夹（可选，需自行创建，如 `lab-hero.png`）                |

---

## 数据接口说明

### 总配置 `data/site.json`

修改后影响全站标题、顶栏、导航、首页横幅、简介、页脚与链接：

- `lab`：实验室名称、标记、学校、学院等
- `nav`：导航菜单项
- `hero`：首页横幅内容与按钮
- `about`：实验室简介与亮点
- `contact`：联系方式
- `personGroupOrder`：成员分组显示顺序

### 研究方向 `data/research.json`

数组，每项包含 `title`、`summary`、`tags` 等。

### 成果 `data/outcomes.json`

- `type` 为 `"论文"` 显示在论文区，其他显示在项目区
- 支持 `year`、`venue`、`title`、`authors`、`image`、`links` 等字段
- 年份筛选自动根据数据生成

### 成员 `data/people.json`

按 `group` 分组，支持 `name`、`role`、`focus`、`email`、`destination` 等。

### 其他数据文件

`news.json`、`recruitment.json`、`resources.json` 结构类似，字段自描述性强。

---

## 常见维护任务

1. **改名、换学校**：修改 `data/site.json` 的 `lab` 与 `contact` 部分。
2. **新增论文**：在 `data/outcomes.json` 添加条目，`type` 设为 `"论文"`，图片放入 `assets/`。
3. **新增成员**：在 `data/people.json` 增加对象，运行同步脚本后刷新。
4. **发布新闻**：在 `data/news.json` 数组前添加新条目。
5. **更新首页图**：放置图片到 `assets/` 并更新 `site.json` 中 `hero.image`。

---

## 交互演示

各栏目支持纯前端可操作 Demo，详见 `demos.js`。

---

## 技术说明

- 纯静态站点，无构建步骤，适合课题组自行托管。
- 双击 `index.html` 使用内嵌数据；实时编辑 JSON 请使用 `preview.ps1`。
- 图片缺失时相关区块自动隐藏，不影响其他内容。

如需进一步定制或对接远程 API，请参考 `app.js` 中的 `endpoints` 配置。
