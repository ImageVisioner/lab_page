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

    "multi-sensor-fusion"(el) {
      el.innerHTML = `
        <div style="display:flex; justify-content:center; margin:12px 0;">
          <div style="background:#0f172a; border-radius:6px; padding:4px; display:flex; align-items:center; justify-content:center;">
            <canvas width="420" height="320" data-fusion-canvas style="max-width:100%; height:auto; border-radius:4px;"></canvas>
          </div>
        </div>
        <div class="demo-controls" style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" data-play-btn>▶ 滚动播放</button>
          <button type="button" data-invert-btn>应用反演增强</button>
          <button type="button" data-reset-btn>重置</button>
        </div>
      `;
      const canvas = el.querySelector("[data-fusion-canvas]");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const imgA = new Image();
      const imgB = new Image();
      let invertMode = false;
      let playTimer = null;
      let playDir = 1;
      let alpha = 50; // 当前融合权重

      const resizeCanvasToAspect = () => {
        if (imgA.naturalWidth && imgA.naturalHeight) {
          const aspect = imgA.naturalWidth / imgA.naturalHeight;
          const targetW = 420;
          const targetH = Math.round(targetW / aspect);
          canvas.width = targetW;
          canvas.height = Math.min(targetH, 360);
        }
      };

      const drawFused = (a, doInvert) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        ctx.drawImage(imgA, 0, 0, w, h);
        ctx.globalAlpha = (100 - a) / 100;
        ctx.drawImage(imgB, 0, 0, w, h);
        ctx.globalAlpha = 1;

        if (doInvert) {
          const imgData = ctx.getImageData(0, 0, w, h);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            d[i] = Math.min(255, d[i] * 1.15 + 10);
            d[i + 1] = Math.min(255, d[i + 1] * 1.15 + 10);
            d[i + 2] = Math.min(255, d[i + 2] * 1.15 + 10);
          }
          ctx.putImageData(imgData, 0, 0);
        }
      };

      const loadAndDraw = () => {
        let loaded = 0;
        const check = () => {
          loaded++;
          if (loaded === 2) {
            resizeCanvasToAspect();
            drawFused(alpha, invertMode);
          }
        };
        imgA.onload = check;
        imgB.onload = check;
        imgA.src = "assets/rearch/1/1.png";
        imgB.src = "assets/rearch/1/2.png";
      };

      const playBtn = el.querySelector("[data-play-btn]");
      playBtn.addEventListener("click", () => {
        if (playTimer) {
          clearInterval(playTimer);
          playTimer = null;
          playBtn.textContent = "▶ 滚动播放";
          return;
        }
        playBtn.textContent = "⏸ 暂停播放";
        playTimer = setInterval(() => {
          alpha += playDir * 4;
          if (alpha >= 100) { alpha = 100; playDir = -1; }
          if (alpha <= 0) { alpha = 0; playDir = 1; }
          drawFused(alpha, invertMode);
        }, 80);
      });

      el.querySelector("[data-invert-btn]").addEventListener("click", () => {
        invertMode = !invertMode;
        drawFused(alpha, invertMode);
      });
      el.querySelector("[data-reset-btn]").addEventListener("click", () => {
        if (playTimer) { clearInterval(playTimer); playTimer = null; playBtn.textContent = "▶ 滚动播放"; }
        invertMode = false;
        alpha = 50;
        drawFused(alpha, false);
      });

      loadAndDraw();
    },

    "spectrum-analysis"(el) {
      el.innerHTML = `
        <p class="demo-hint">拖动滑块或点击图像区域，对比红外图像非均匀性校正前后效果（左：原始含固定图案噪声，右：深度学习校正后）。鼠标悬停在图像上可查看 15×15 像素局部对比。</p>
        <div class="pixel-repair-wrap" data-repair-container>
          <div class="ir-compare" data-ir-compare>
            <div class="ir-compare-inner" data-main-area>
              <img src="assets/rearch/2/noise.jpg" alt="校正前（含非均匀性噪声）" class="ir-img ir-before" data-main-img>
              <div class="ir-after-wrap" data-ir-after>
                <img src="assets/rearch/2/denoise.png" alt="校正后" class="ir-img">
              </div>
              <div class="ir-handle" data-ir-handle>
                <span class="ir-handle-label">拖动</span>
              </div>
            </div>
            <input type="range" class="ir-range" min="0" max="100" value="50" data-ir-range aria-label="校正前后对比滑块">
            <div class="ir-label-row">
              <span class="ir-label">校正前</span>
              <span class="ir-label">校正后</span>
            </div>
          </div>

          <div class="pixel-popup" data-pixel-popup hidden>
            <div class="pixel-compare">
              <div class="pixel-side">
                <div class="pixel-label">Noise</div>
                <canvas class="pixel-canvas" data-noise-canvas width="60" height="60"></canvas>
              </div>
              <div class="pixel-side">
                <div class="pixel-label">Denoise</div>
                <canvas class="pixel-canvas" data-denoise-canvas width="60" height="60"></canvas>
              </div>
            </div>
          </div>
        </div>
      `;

      const wrap = el.querySelector("[data-ir-compare]");
      const afterWrap = el.querySelector("[data-ir-after]");
      const handle = el.querySelector("[data-ir-handle]");
      const range = el.querySelector("[data-ir-range]");
      const mainArea = el.querySelector("[data-main-area]");
      const mainImg = el.querySelector("[data-main-img]");
      const popup = el.querySelector("[data-pixel-popup]");
      const noiseCanvas = el.querySelector("[data-noise-canvas]");
      const denoiseCanvas = el.querySelector("[data-denoise-canvas]");
      const noiseCtx = noiseCanvas.getContext("2d", { willReadFrequently: true });
      const denoiseCtx = denoiseCanvas.getContext("2d", { willReadFrequently: true });

      const setPos = (p) => {
        const val = Math.max(0, Math.min(100, p));
        afterWrap.style.width = `${val}%`;
        handle.style.left = `${val}%`;
      };

      range.addEventListener("input", () => setPos(+range.value));

      // Click on image area
      wrap.addEventListener("click", (e) => {
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      });

      // Drag handle
      let dragging = false;
      const onMove = (e) => {
        if (!dragging) return;
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      };
      handle.addEventListener("mousedown", () => { dragging = true; document.body.style.userSelect = "none"; });
      window.addEventListener("mouseup", () => { dragging = false; document.body.style.userSelect = ""; });
      window.addEventListener("mousemove", onMove);

      // Touch support
      wrap.addEventListener("touchstart", (e) => {
        dragging = true;
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      }, { passive: true });
      window.addEventListener("touchend", () => { dragging = false; });
      window.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      }, { passive: true });

      // init at 50%
      setPos(50);

      // Pixel local comparison (15x15 hover)
      const noiseImg = new Image();
      const denoiseImg = new Image();
      let imagesLoaded = 0;
      const checkReady = () => { imagesLoaded++; };
      noiseImg.onload = checkReady;
      denoiseImg.onload = checkReady;
      noiseImg.src = "assets/rearch/2/noise.jpg";
      denoiseImg.src = "assets/rearch/2/denoise.png";

      const SIZE = 15;
      const updatePixelPopup = (clientX, clientY) => {
        if (imagesLoaded < 2) return;
        const rect = mainImg.getBoundingClientRect();
        const x = Math.max(0, Math.min(mainImg.width - 1, Math.floor(((clientX - rect.left) / rect.width) * mainImg.width)));
        const y = Math.max(0, Math.min(mainImg.height - 1, Math.floor(((clientY - rect.top) / rect.height) * mainImg.height)));

        const half = Math.floor(SIZE / 2);
        let sx = x - half;
        let sy = y - half;
        if (sx < 0) sx = 0;
        if (sy < 0) sy = 0;
        if (sx + SIZE > mainImg.width) sx = mainImg.width - SIZE;
        if (sy + SIZE > mainImg.height) sy = mainImg.height - SIZE;

        noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
        noiseCtx.imageSmoothingEnabled = false;
        noiseCtx.drawImage(noiseImg, sx, sy, SIZE, SIZE, 0, 0, noiseCanvas.width, noiseCanvas.height);

        denoiseCtx.clearRect(0, 0, denoiseCanvas.width, denoiseCanvas.height);
        denoiseCtx.imageSmoothingEnabled = false;
        denoiseCtx.drawImage(denoiseImg, sx, sy, SIZE, SIZE, 0, 0, denoiseCanvas.width, denoiseCanvas.height);

        popup.hidden = false;
        const popupRect = popup.getBoundingClientRect();
        let left = clientX - rect.left + 20;
        let top = clientY - rect.top - 30;
        if (left + 140 > mainArea.clientWidth) left = clientX - rect.left - 150;
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
      };

      mainArea.addEventListener("mousemove", (e) => {
        if (imagesLoaded < 2) return;
        updatePixelPopup(e.clientX, e.clientY);
      });

      mainArea.addEventListener("mouseleave", () => {
        popup.hidden = true;
      });

      popup.hidden = true;
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
      const images = [
        "assets/rearch/4/1.png",
        "assets/rearch/4/2.png",
        "assets/rearch/4/3.png",
        "assets/rearch/4/4.png",
        "assets/rearch/4/5.png",
        "assets/rearch/4/6.png"
      ];
      el.innerHTML = `
        <div style="max-width:620px; margin:0 auto;">
          <div style="position:relative; background:#0f172a; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
            <img data-carousel-img style="width:100%; height:auto; max-height:420px; display:block; object-fit:contain; background:#0f172a;" />
            <div style="position:absolute; top:8px; right:8px; background:rgba(15,23,42,0.7); color:#e2e8f0; font-size:12px; padding:2px 8px; border-radius:4px;" data-carousel-index>1 / 6</div>
          </div>
          <div style="display:flex; justify-content:center; align-items:center; gap:12px; margin-top:12px; flex-wrap:wrap;">
            <button type="button" data-prev style="padding:6px 14px;">◀ 上一张</button>
            <button type="button" data-play style="padding:6px 14px;">▶ 自动轮播</button>
            <button type="button" data-next style="padding:6px 14px;">下一张 ▶</button>
          </div>
          <div style="display:flex; justify-content:center; gap:6px; margin-top:8px;" data-dots></div>
        </div>
      `;

      const imgEl = el.querySelector("[data-carousel-img]");
      const indexEl = el.querySelector("[data-carousel-index]");
      const dotsContainer = el.querySelector("[data-dots]");
      const prevBtn = el.querySelector("[data-prev]");
      const playBtn = el.querySelector("[data-play]");
      const nextBtn = el.querySelector("[data-next]");

      let current = 0;
      let timer = null;
      let isPlaying = false;

      const renderDots = () => {
        dotsContainer.innerHTML = "";
        images.forEach((_, i) => {
          const dot = document.createElement("span");
          dot.style.cssText = "width:8px;height:8px;border-radius:50%;background:" + (i === current ? "#1a4f8c" : "#cbd5e1") + ";cursor:pointer;display:inline-block;";
          dot.addEventListener("click", () => { goTo(i); });
          dotsContainer.appendChild(dot);
        });
      };

      const update = () => {
        imgEl.src = images[current];
        indexEl.textContent = `${current + 1} / ${images.length}`;
        renderDots();
      };

      const goTo = (idx) => {
        current = (idx + images.length) % images.length;
        update();
      };

      const next = () => goTo(current + 1);
      const prev = () => goTo(current - 1);

      prevBtn.addEventListener("click", prev);
      nextBtn.addEventListener("click", next);

      playBtn.addEventListener("click", () => {
        if (isPlaying) {
          clearInterval(timer);
          isPlaying = false;
          playBtn.textContent = "▶ 自动轮播";
        } else {
          isPlaying = true;
          playBtn.textContent = "⏸ 暂停";
          timer = setInterval(() => {
            next();
          }, 1600);
        }
      });

      // keyboard support
      el.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      });
      el.setAttribute("tabindex", "0");

      // init
      update();
      // preload next images
      images.forEach((src) => { const p = new Image(); p.src = src; });
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

    "spectrum-repair"(el) {
      el.innerHTML = `
        <p class="demo-hint">拖动滑块或点击图像区域，对比红外全波段光谱像素阵列损失修复前后效果（左：含噪声/损毁，右：修复后）。鼠标悬停在图像上可查看 15×15 像素局部对比。</p>
        <div class="pixel-repair-wrap" data-repair-container>
          <div class="ir-compare" data-ir-compare>
            <div class="ir-compare-inner" data-main-area>
              <img src="assets/rearch/3/noise.png" alt="修复前（含噪声/损毁）" class="ir-img ir-before" data-main-img>
              <div class="ir-after-wrap" data-ir-after>
                <img src="" alt="修复后" class="ir-img" data-after-img>
              </div>
              <div class="ir-handle" data-ir-handle>
                <span class="ir-handle-label">拖动</span>
              </div>
            </div>
            <input type="range" class="ir-range" min="0" max="100" value="50" data-ir-range aria-label="修复前后对比滑块">
            <div class="ir-label-row">
              <span class="ir-label">修复前</span>
              <span class="ir-label">修复后</span>
            </div>
          </div>

          <div class="pixel-popup" data-pixel-popup hidden>
            <div class="pixel-compare">
              <div class="pixel-side">
                <div class="pixel-label">Noise</div>
                <canvas class="pixel-canvas" data-noise-canvas width="60" height="60"></canvas>
              </div>
              <div class="pixel-side">
                <div class="pixel-label">Denoise</div>
                <canvas class="pixel-canvas" data-denoise-canvas width="60" height="60"></canvas>
              </div>
            </div>
          </div>
        </div>
      `;

      const wrap = el.querySelector("[data-ir-compare]");
      const afterWrap = el.querySelector("[data-ir-after]");
      const handle = el.querySelector("[data-ir-handle]");
      const range = el.querySelector("[data-ir-range]");
      const mainArea = el.querySelector("[data-main-area]");
      const mainImg = el.querySelector("[data-main-img]");
      const afterImg = el.querySelector("[data-after-img]");
      const popup = el.querySelector("[data-pixel-popup]");

      // 动态设置 afterImg 路径，兼容 png / bmp
      afterImg.onerror = () => {
        afterImg.src = "assets/rearch/3/denoise.bmp";
      };
      afterImg.src = "assets/rearch/3/denoise.png";
      const noiseCanvas = el.querySelector("[data-noise-canvas]");
      const denoiseCanvas = el.querySelector("[data-denoise-canvas]");
      const noiseCtx = noiseCanvas.getContext("2d", { willReadFrequently: true });
      const denoiseCtx = denoiseCanvas.getContext("2d", { willReadFrequently: true });

      const setPos = (p) => {
        const val = Math.max(0, Math.min(100, p));
        afterWrap.style.width = `${val}%`;
        handle.style.left = `${val}%`;
      };

      range.addEventListener("input", () => setPos(+range.value));

      wrap.addEventListener("click", (e) => {
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      });

      let dragging = false;
      const onMove = (e) => {
        if (!dragging) return;
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      };
      handle.addEventListener("mousedown", () => { dragging = true; document.body.style.userSelect = "none"; });
      window.addEventListener("mouseup", () => { dragging = false; document.body.style.userSelect = ""; });
      window.addEventListener("mousemove", onMove);

      wrap.addEventListener("touchstart", (e) => {
        dragging = true;
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      }, { passive: true });
      window.addEventListener("touchend", () => { dragging = false; });
      window.addEventListener("touchmove", (e) => {
        if (!dragging) return;
        const rect = wrap.getBoundingClientRect();
        const percent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPos(percent);
        range.value = percent;
      }, { passive: true });

      setPos(50);

      // Pixel local comparison (15x15 hover)
      const noiseImg = new Image();
      const denoiseImg = new Image();
      let imagesLoaded = 0;
      const checkReady = () => { imagesLoaded++; };
      noiseImg.onload = checkReady;
      denoiseImg.onload = checkReady;
      noiseImg.src = "assets/rearch/3/noise.png";
      denoiseImg.onerror = () => { denoiseImg.src = "assets/rearch/3/denoise.bmp"; };
      denoiseImg.src = "assets/rearch/3/denoise.png";

      const SIZE = 15;
      const updatePixelPopup = (clientX, clientY) => {
        if (imagesLoaded < 2) return;
        const rect = mainImg.getBoundingClientRect();
        const x = Math.max(0, Math.min(mainImg.width - 1, Math.floor(((clientX - rect.left) / rect.width) * mainImg.width)));
        const y = Math.max(0, Math.min(mainImg.height - 1, Math.floor(((clientY - rect.top) / rect.height) * mainImg.height)));

        const half = Math.floor(SIZE / 2);
        let sx = x - half;
        let sy = y - half;
        if (sx < 0) sx = 0;
        if (sy < 0) sy = 0;
        if (sx + SIZE > mainImg.width) sx = mainImg.width - SIZE;
        if (sy + SIZE > mainImg.height) sy = mainImg.height - SIZE;

        noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
        noiseCtx.imageSmoothingEnabled = false;
        noiseCtx.drawImage(noiseImg, sx, sy, SIZE, SIZE, 0, 0, noiseCanvas.width, noiseCanvas.height);

        denoiseCtx.clearRect(0, 0, denoiseCanvas.width, denoiseCanvas.height);
        denoiseCtx.imageSmoothingEnabled = false;
        denoiseCtx.drawImage(denoiseImg, sx, sy, SIZE, SIZE, 0, 0, denoiseCanvas.width, denoiseCanvas.height);

        popup.hidden = false;
        let left = clientX - rect.left + 20;
        let top = clientY - rect.top - 30;
        if (left + 140 > mainArea.clientWidth) left = clientX - rect.left - 150;
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
      };

      mainArea.addEventListener("mousemove", (e) => {
        if (imagesLoaded < 2) return;
        updatePixelPopup(e.clientX, e.clientY);
      });

      mainArea.addEventListener("mouseleave", () => {
        popup.hidden = true;
      });

      popup.hidden = true;
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
    // 搜索与分页逻辑已整合到 renderNews 中，此处不再重复绑定
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
