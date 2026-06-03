/**
 * 各栏目交互 Demo（纯前端，无后端）
 * 在 data/*.json 中用 demoId 关联
 */
const LabDemos = {
  mount(el, id) {
    const fn = this.templates[id];
    if (!fn || !el) return;
    el.innerHTML = "";
    el.className = "demo-panel is-open";
    fn(el);
  },

  attachTriggers(root = document) {
    root.querySelectorAll("[data-demo-trigger]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-demo-trigger");
        const panel = btn.parentElement.querySelector("[data-demo-panel]");
        if (!panel) return;
        const open = !panel.classList.contains("is-open");
        panel.classList.toggle("is-open", open);
        panel.hidden = !open;
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "收起演示" : "交互演示";
        if (open && !panel.dataset.mounted) {
          this.mount(panel, id);
          panel.dataset.mounted = "1";
        }
      });
    });
  },

  templates: {
    "spectrum-imaging"(el) {
      el.innerHTML = `
        <p class="demo-hint">拖动滑块改变中心波长，查看模拟光谱曲线与峰位变化。</p>
        <div class="demo-controls">
          <label>中心波长 (nm) <input type="range" min="400" max="900" value="650" data-d1-range></label>
          <span data-d1-val>650</span>
        </div>
        <canvas class="demo-canvas" width="520" height="160" data-d1-canvas></canvas>
      `;
      const canvas = el.querySelector("[data-d1-canvas]");
      const ctx = canvas.getContext("2d");
      const range = el.querySelector("[data-d1-range]");
      const val = el.querySelector("[data-d1-val]");

      const draw = (center) => {
        val.textContent = center;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f7fafc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#1a4f8c";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const w = 400 + (x / canvas.width) * 500;
          const y =
            80 -
            45 * Math.exp(-Math.pow(w - center, 2) / 800) -
            18 * Math.exp(-Math.pow(w - center - 60, 2) / 400) +
            (Math.random() - 0.5) * 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = "#c8161d";
        ctx.beginPath();
        ctx.arc(((center - 400) / 500) * canvas.width, 35, 5, 0, Math.PI * 2);
        ctx.fill();
      };
      range.addEventListener("input", () => draw(Number(range.value)));
      draw(Number(range.value));
    },

    "spectrum-analysis"(el) {
      const classes = ["矿物 A", "矿物 B", "植被", "水体"];
      el.innerHTML = `
        <p class="demo-hint">点击样本类别，模拟光谱匹配并给出置信度（演示数据）。</p>
        <div class="demo-chip-row">${classes.map((c) => `<button type="button" class="demo-chip" data-d2-class="${c}">${c}</button>`).join("")}</div>
        <div class="demo-result" data-d2-result>请选择一类样本</div>
        <div class="demo-bar-chart" data-d2-bars></div>
      `;
      const result = el.querySelector("[data-d2-result]");
      const bars = el.querySelector("[data-d2-bars]");
      el.querySelectorAll("[data-d2-class]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const name = btn.getAttribute("data-d2-class");
          const scores = classes.map((c) => ({
            label: c,
            v: c === name ? 0.55 + Math.random() * 0.35 : Math.random() * 0.25
          }));
          const sum = scores.reduce((a, b) => a + b.v, 0);
          scores.forEach((s) => (s.v = s.v / sum));
          const top = scores.reduce((a, b) => (b.v > a.v ? b : a));
          result.textContent = `预测类别：${top.label}（置信度 ${(top.v * 100).toFixed(1)}%）`;
          bars.innerHTML = scores
            .map(
              (s) =>
                `<div class="demo-bar"><span>${s.label}</span><i style="width:${(s.v * 100).toFixed(0)}%"></i><em>${(s.v * 100).toFixed(0)}%</em></div>`
            )
            .join("");
        });
      });
    },

    "computing-spectroscopy"(el) {
      const rows = [
        { m: "SpecNet-L", acc: 91.2, speed: 42 },
        { m: "SpecNet-B", acc: 89.8, speed: 78 },
        { m: "Baseline-PCA", acc: 82.4, speed: 120 },
        { m: "Lab-Ours", acc: 93.5, speed: 55 }
      ];
      el.innerHTML = `
        <p class="demo-hint">点击表头排序，模拟评测基准对比（演示数据）。</p>
        <table class="demo-table"><thead><tr>
          <th data-sort="m">模型</th><th data-sort="acc">精度↓</th><th data-sort="speed">耗时(ms)</th>
        </tr></thead><tbody data-d3-body></tbody></table>
      `;
      const body = el.querySelector("[data-d3-body]");
      let key = "acc";
      let asc = false;
      const render = () => {
        const sorted = [...rows].sort((a, b) => (asc ? a[key] - b[key] : b[key] - a[key]));
        body.innerHTML = sorted
          .map(
            (r) =>
              `<tr><td>${r.m}</td><td>${r.acc}%</td><td>${r.speed}</td></tr>`
          )
          .join("");
      };
      el.querySelectorAll("[data-sort]").forEach((th) => {
        th.addEventListener("click", () => {
          const k = th.getAttribute("data-sort");
          if (key === k) asc = !asc;
          else {
            key = k;
            asc = k === "speed";
          }
          render();
        });
      });
      render();
    },

    "instrument-system"(el) {
      el.innerHTML = `
        <p class="demo-hint">调节光谱仪积分时间与信噪比（模拟）。</p>
        <div class="demo-controls">
          <label>积分时间 (ms) <input type="range" min="10" max="500" value="100" data-d4-t></label>
          <span data-d4-tv>100</span>
        </div>
        <p class="demo-metric">估计信噪比 SNR：<strong data-d4-snr>28.5</strong> dB</p>
        <p class="demo-metric">状态：<span data-d4-st>就绪</span></p>
      `;
      const t = el.querySelector("[data-d4-t]");
      const tv = el.querySelector("[data-d4-tv]");
      const snr = el.querySelector("[data-d4-snr]");
      const st = el.querySelector("[data-d4-st]");
      t.addEventListener("input", () => {
        const v = Number(t.value);
        tv.textContent = v;
        const s = 18 + Math.log10(v) * 8 + Math.random() * 2;
        snr.textContent = s.toFixed(1);
        st.textContent = v > 400 ? "饱和预警" : v < 30 ? "信号偏弱" : "采集中";
        st.style.color = v > 400 ? "#c8161d" : "#1a4f8c";
      });
    },

    "project-multimodal"(el) {
      el.innerHTML = `
        <p class="demo-hint">输入简短临床描述，匹配模拟光谱特征向量（演示）。</p>
        <textarea class="demo-input" rows="2" placeholder="例：术后随访，关注炎症指标波动" data-d5-t></textarea>
        <button type="button" class="demo-action">运行匹配</button>
        <pre class="demo-log" data-d5-log>等待输入…</pre>
      `;
      const log = el.querySelector("[data-d5-log]");
      el.querySelector(".demo-action").addEventListener("click", () => {
        const text = el.querySelector("[data-d5-t]").value.trim() || "默认随访场景";
        const vec = Array.from({ length: 8 }, () => (Math.random() * 2 - 0.5).toFixed(2));
        log.textContent = `文本: ${text}\n融合向量: [${vec.join(", ")}]\n相似度 Top-1: 0.${Math.floor(72 + Math.random() * 20)} (${["光谱库-A", "光谱库-C", "光谱库-F"][Math.floor(Math.random() * 3)]})`;
      });
    },

    "project-benchmark"(el) {
      el.innerHTML = `
        <p class="demo-hint">勾选任务查看各模型 F1 对比（演示数据）。</p>
        <label><input type="checkbox" checked data-d6-task> 分类</label>
        <label><input type="checkbox" data-d6-task> 回归</label>
        <label><input type="checkbox" data-d6-task> 去噪</label>
        <div class="demo-bar-chart" data-d6-chart></div>
      `;
      const data = {
        分类: [
          { n: "Ours", v: 92 },
          { n: "M1", v: 88 },
          { n: "M2", v: 85 }
        ],
        回归: [
          { n: "Ours", v: 0.91 },
          { n: "M1", v: 0.86 },
          { n: "M2", v: 0.83 }
        ],
        去噪: [
          { n: "Ours", v: 34.2 },
          { n: "M1", v: 31.5 },
          { n: "M2", v: 29.8 }
        ]
      };
      const chart = el.querySelector("[data-d6-chart]");
      const render = () => {
        const tasks = [...el.querySelectorAll("[data-d6-task]:checked")].map((c) =>
          c.parentElement.textContent.trim()
        );
        chart.innerHTML = tasks
          .map((task) => {
            const unit = task === "去噪" ? " PSNR" : task === "回归" ? "" : "%";
            return `<p class="demo-sub">${task}</p>${data[task]
              .map(
                (r) =>
                  `<div class="demo-bar"><span>${r.n}</span><i style="width:${task === "回归" ? r.v * 100 : r.v}%"></i><em>${r.v}${unit}</em></div>`
              )
              .join("")}`;
          })
          .join("");
      };
      el.querySelectorAll("[data-d6-task]").forEach((c) => c.addEventListener("change", render));
      render();
    },

    "resource-dataset"(el) {
      const sample = [
        { id: "S001", wl: "400-1000", class: "植被" },
        { id: "S002", wl: "900-1700", class: "土壤" },
        { id: "S003", wl: "400-2500", class: "水体" }
      ];
      el.innerHTML = `
        <p class="demo-hint">示例数据集预览（可下载 JSON）。</p>
        <table class="demo-table"><thead><tr><th>ID</th><th>波段</th><th>类别</th></tr></thead>
        <tbody>${sample.map((r) => `<tr><td>${r.id}</td><td>${r.wl}</td><td>${r.class}</td></tr>`).join("")}</tbody></table>
        <button type="button" class="demo-action" data-dl>下载 sample.json</button>
      `;
      el.querySelector("[data-dl]").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "spectrum-sample.json";
        a.click();
        URL.revokeObjectURL(a.href);
      });
    },

    "resource-code"(el) {
      el.innerHTML = `
        <p class="demo-hint">一键复制安装命令（演示）。</p>
        <pre class="demo-code" data-cmd>pip install lab-spectrum-toolkit==0.3.1</pre>
        <button type="button" class="demo-action" data-copy>复制命令</button>
        <p class="demo-result" data-copy-msg></p>
      `;
      const cmd = el.querySelector("[data-cmd]");
      const msg = el.querySelector("[data-copy-msg]");
      el.querySelector("[data-copy]").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(cmd.textContent);
          msg.textContent = "已复制到剪贴板";
        } catch {
          msg.textContent = "请手动选择上方命令复制";
        }
      });
    },

    "resource-docs"(el) {
      el.innerHTML = `
        <p class="demo-hint">组内文档模板预览。</p>
        <select data-d8-s>
          <option>开题报告模板</option>
          <option>周报模板</option>
          <option>实验记录模板</option>
        </select>
        <pre class="demo-log" data-d8-p># 实验记录\n\n- 日期: ____\n- 样本编号: ____\n- 光谱参数: 积分时间 ____ ms\n- 结果: ____</pre>
      `;
      const presets = {
        开题报告模板: "# 开题报告\n\n1. 研究背景\n2. 研究内容\n3. 技术路线\n4. 进度安排",
        周报模板: "# 周报\n\n本周工作:\n- \n\n下周计划:\n- ",
        实验记录模板: "# 实验记录\n\n- 日期:\n- 样本编号:\n- 光谱参数:\n- 结果:"
      };
      const p = el.querySelector("[data-d8-p]");
      el.querySelector("[data-d8-s]").addEventListener("change", (e) => {
        p.textContent = presets[e.target.value] || "";
      });
    },

    // Placeholder demos for new research directions (can be expanded later)
    "lowrank-recon"(el) {
      el.innerHTML = `
        <p class="demo-hint">低秩重建演示（占位）：输入矩阵秩，查看重建误差曲线。</p>
        <div class="demo-controls">
          <label>矩阵秩 <input type="range" min="5" max="50" value="20" data-lr-rank></label>
          <span data-lr-val>20</span>
        </div>
        <canvas class="demo-canvas" width="420" height="120" data-lr-canvas></canvas>
      `;
      const canvas = el.querySelector("[data-lr-canvas]");
      const ctx = canvas.getContext("2d");
      const range = el.querySelector("[data-lr-rank]");
      const val = el.querySelector("[data-lr-val]");
      const draw = (rank) => {
        val.textContent = rank;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#1a4f8c";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = 90 - Math.pow((x - 200) / 80, 2) * (50 / rank);
          if (x === 0) ctx.moveTo(x, Math.max(10, y));
          else ctx.lineTo(x, Math.max(10, y));
        }
        ctx.stroke();
      };
      range.addEventListener("input", () => draw(Number(range.value)));
      draw(Number(range.value));
    },

    "3d-vision"(el) {
      el.innerHTML = `
        <p class="demo-hint">三维视觉演示（占位）：调节视点角度，查看简单立方体投影。</p>
        <div class="demo-controls">
          <label>视角角度 <input type="range" min="0" max="90" value="30" data-3d-angle></label>
          <span data-3d-val>30°</span>
        </div>
        <canvas class="demo-canvas" width="200" height="160" data-3d-canvas></canvas>
      `;
      const canvas = el.querySelector("[data-3d-canvas]");
      const ctx = canvas.getContext("2d");
      const range = el.querySelector("[data-3d-angle]");
      const val = el.querySelector("[data-3d-val]");
      const draw = (angle) => {
        val.textContent = angle + "°";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#1a4f8c";
        ctx.lineWidth = 2;
        const cx = 100, cy = 80, s = 40;
        const rad = (angle * Math.PI) / 180;
        const dx = Math.cos(rad) * 20;
        const dy = Math.sin(rad) * 15;
        ctx.strokeRect(cx - s, cy - s, s * 2, s * 2);
        ctx.beginPath();
        ctx.moveTo(cx + s, cy - s);
        ctx.lineTo(cx + s + dx, cy - s - dy);
        ctx.lineTo(cx + s + dx, cy + s - dy);
        ctx.lineTo(cx + s, cy + s);
        ctx.stroke();
      };
      range.addEventListener("input", () => draw(Number(range.value)));
      draw(Number(range.value));
    }
  },

  wrapCard(demoId, innerHtml) {
    if (!demoId) return innerHtml;
    return `${innerHtml}
      <button type="button" class="demo-btn" data-demo-trigger="${demoId}" aria-expanded="false">交互演示</button>
      <div class="demo-panel" data-demo-panel hidden></div>`;
  },

  initPublications() {
    const grid = document.querySelector("[data-publications]");
    if (!grid || grid.dataset.citeBound) return;
    grid.dataset.citeBound = "1";
    grid.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-cite]");
      if (!btn) return;
      const text = btn.getAttribute("data-cite");
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "已复制";
        setTimeout(() => (btn.textContent = "复制引用"), 1500);
      } catch {
        window.prompt("复制引用：", text);
      }
    });
  },

  initPeopleFilter(people) {
    const wrap = document.querySelector("[data-people-filter]");
    const container = document.querySelector("[data-people]");
    if (!wrap || !container) return;
    const groups = [...new Set(people.map((p) => p.group).filter(Boolean))];
    wrap.innerHTML = `<button type="button" class="demo-chip is-active" data-pf="all">全部</button>${groups
      .map((g) => `<button type="button" class="demo-chip" data-pf="${g}">${g}</button>`)
      .join("")}`;
    wrap.querySelectorAll("[data-pf]").forEach((btn) => {
      btn.addEventListener("click", () => {
        wrap.querySelectorAll("[data-pf]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const g = btn.getAttribute("data-pf");
        container.querySelectorAll(".people-group").forEach((sec) => {
          const title = sec.querySelector(".people-group-title")?.textContent;
          sec.hidden = g !== "all" && title !== g;
        });
      });
    });
  },

  initNewsSearch() {
    const input = document.querySelector("[data-news-search]");
    const list = document.querySelector("[data-news]");
    if (!input || !list) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      list.querySelectorAll(".news-item").forEach((li) => {
        const text = li.textContent.toLowerCase();
        li.hidden = q && !text.includes(q);
      });
    });
  },

  initContactCopy() {
    document.querySelectorAll("[data-copy-email]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const email = btn.getAttribute("data-copy-email");
        try {
          await navigator.clipboard.writeText(email);
          btn.textContent = "邮箱已复制";
        } catch {
          window.location.href = `mailto:${email}`;
        }
      });
    });
  }
};

window.LabDemos = LabDemos;
