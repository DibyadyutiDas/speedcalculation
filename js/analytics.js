/**
 * SpeedBanker Performance Analytics & Score Tracker Engine
 * Tracks speed (CPM), previous session comparison, speed consistency, diagnostics, and visual trend bars.
 */

class AnalyticsManager {
  constructor() {
    this.STORAGE_KEY = 'speedbanker_analytics_v1';
    this.data = this.loadData();
    this.currentGraphType = 'trend';
    this.init();
  }

  init() {
    this.initGraphListeners();
    this.renderDashboard();
    this.renderPreviousScoreTracker();
    this.renderGraphAnalysis();
  }

  loadData() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Failed to load analytics data:', e);
    }

    return {
      totalSolved: 0,
      totalCorrect: 0,
      totalTimeSeconds: 0,
      bestCPM: 0,
      allTimeMaxStreak: 0,
      categoryStats: {
        'Multiplication': { solved: 0, correct: 0, totalTime: 0 },
        'Tables (Pahade)': { solved: 0, correct: 0, totalTime: 0 },
        'Addition': { solved: 0, correct: 0, totalTime: 0 },
        'Subtraction': { solved: 0, correct: 0, totalTime: 0 },
        'Division': { solved: 0, correct: 0, totalTime: 0 },
        'Squares': { solved: 0, correct: 0, totalTime: 0 },
        'Square Roots': { solved: 0, correct: 0, totalTime: 0 },
        'Cubes': { solved: 0, correct: 0, totalTime: 0 },
        'Cube Roots': { solved: 0, correct: 0, totalTime: 0 },
        'Fraction to %': { solved: 0, correct: 0, totalTime: 0 },
        'Simplification': { solved: 0, correct: 0, totalTime: 0 },
        'Approximation': { solved: 0, correct: 0, totalTime: 0 },
        'Number Series': { solved: 0, correct: 0, totalTime: 0 }
      },
      sessions: []
    };
  }

  saveData() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save analytics data:', e);
    }
  }

  recordSession(session) {
    // session: { category, mode, difficulty, total, correct, durationSec, cpm, maxStreak, mistakes, fastestTime, slowestTime }
    this.data.totalSolved += session.total;
    this.data.totalCorrect += session.correct;
    this.data.totalTimeSeconds += session.durationSec;

    if (session.cpm > this.data.bestCPM) {
      this.data.bestCPM = session.cpm;
    }

    if (session.maxStreak > this.data.allTimeMaxStreak) {
      this.data.allTimeMaxStreak = session.maxStreak;
    }

    // Update Category Stats
    const cat = session.category;
    if (this.data.categoryStats[cat]) {
      this.data.categoryStats[cat].solved += session.total;
      this.data.categoryStats[cat].correct += session.correct;
      this.data.categoryStats[cat].totalTime += session.durationSec;
    }

    // Compare with previous attempt
    const previousAttempt = this.data.sessions.length > 0 ? this.data.sessions[0] : null;
    const cpmDelta = previousAttempt ? (session.cpm - previousAttempt.cpm) : 0;
    const acc = Math.round((session.correct / Math.max(1, session.total)) * 100);
    const accDelta = previousAttempt ? (acc - previousAttempt.accuracy) : 0;

    // Speed-Accuracy Efficiency Quotient: (CPM * (Acc / 100)) scaled to 100 target of 50 CPM with 100% acc
    const efficiencyScore = Math.min(100, Math.round((session.cpm * (acc / 100) / 45) * 100));

    const newSessionEntry = {
      id: Date.now(),
      date: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      category: session.category,
      mode: session.mode,
      difficulty: session.difficulty,
      total: session.total,
      correct: session.correct,
      durationSec: session.durationSec,
      cpm: session.cpm,
      accuracy: acc,
      cpmDelta: cpmDelta,
      accDelta: accDelta,
      fastestTime: session.fastestTime || 0.8,
      slowestTime: session.slowestTime || 2.5,
      efficiencyScore: efficiencyScore,
      grade: this.getGrade(session.cpm, acc)
    };

    // Keep up to 50 recent sessions
    this.data.sessions.unshift(newSessionEntry);

    if (this.data.sessions.length > 50) {
      this.data.sessions.pop();
    }

    this.saveData();
    this.renderDashboard();
    this.renderPreviousScoreTracker();
    this.renderScoreAnalysis(newSessionEntry, previousAttempt);
  }

  getGrade(cpm, accuracy) {
    if (accuracy < 70) return 'Needs Accuracy Focus';
    if (cpm >= 50 && accuracy >= 90) return '🔥 Top 1% Banker';
    if (cpm >= 35 && accuracy >= 85) return '⚡ SBI PO Ready';
    if (cpm >= 25 && accuracy >= 80) return 'Clerk Prelims Ready';
    return 'Developing Speed';
  }

  getOverallAccuracy() {
    if (this.data.totalSolved === 0) return 0;
    return Math.round((this.data.totalCorrect / this.data.totalSolved) * 100);
  }

  // ==========================================
  // PREVIOUS SCORE TRACKER & TREND VISUALIZER
  // ==========================================
  renderPreviousScoreTracker() {
    const prevScoreVal = document.getElementById('prev-score-val');
    const scoreTrendVal = document.getElementById('score-trend-val');
    const scoreDeltaPill = document.getElementById('score-delta-pill');
    const trendBarsWrapper = document.getElementById('trend-bars-wrapper');
    const previousAttemptsTbody = document.getElementById('previous-attempts-tbody');

    if (!prevScoreVal || !trendBarsWrapper) return;

    const sessions = this.data.sessions;

    if (sessions.length === 0) {
      prevScoreVal.textContent = '-- CPM';
      if (scoreTrendVal) scoreTrendVal.textContent = 'No prior session';
      if (scoreDeltaPill) scoreDeltaPill.className = 'quick-stat-pill delta-pill';
      trendBarsWrapper.innerHTML = `
        <div class="empty-trend-placeholder">
          <span>Start a drill above to track your calculation speed progression!</span>
        </div>
      `;
      if (previousAttemptsTbody) {
        previousAttemptsTbody.innerHTML = '<tr><td colspan="6" class="text-muted" style="text-align: center; padding: 1.5rem; color: var(--text-muted);">Complete your first drill to start tracking session-by-session score progression!</td></tr>';
      }
      return;
    }

    // 1. Last Score Pill
    const last = sessions[0];
    prevScoreVal.textContent = `${last.cpm} CPM`;

    // 2. Trend Pill (Comparison with the one before last)
    if (sessions.length > 1) {
      const prev = sessions[1];
      const diff = last.cpm - prev.cpm;
      if (diff > 0) {
        scoreTrendVal.textContent = `+${diff} CPM (↑ ${Math.round((diff / Math.max(1, prev.cpm)) * 100)}% faster)`;
        scoreDeltaPill.className = 'quick-stat-pill delta-pill trend-up';
      } else if (diff < 0) {
        scoreTrendVal.textContent = `${diff} CPM (↓ slower)`;
        scoreDeltaPill.className = 'quick-stat-pill delta-pill trend-down';
      } else {
        scoreTrendVal.textContent = `Steady (0 CPM change)`;
        scoreDeltaPill.className = 'quick-stat-pill delta-pill';
      }
    } else {
      scoreTrendVal.textContent = `Baseline attempt set`;
      scoreDeltaPill.className = 'quick-stat-pill delta-pill';
    }

    // 3. Visual Performance Trend Bars (Last 8 sessions, chronological left to right)
    const recent8 = sessions.slice(0, 8).reverse();
    const maxCpmInSet = Math.max(50, ...recent8.map(s => s.cpm));

    trendBarsWrapper.innerHTML = recent8.map((s, idx) => {
      const heightPct = Math.min(100, Math.max(15, (s.cpm / maxCpmInSet) * 100));
      const isRecord = s.cpm === this.data.bestCPM;
      const isImprovement = idx > 0 && s.cpm > recent8[idx - 1].cpm;

      let barClass = 'trend-bar-fill';
      if (isRecord) barClass += ' bar-record';
      else if (isImprovement) barClass += ' bar-up';

      return `
        <div class="trend-bar-column" title="${s.category} (${s.date}): ${s.cpm} CPM, ${s.accuracy}% accuracy">
          <span class="bar-value-top">${s.cpm}</span>
          <div class="trend-bar-track">
            <div class="${barClass}" style="height: ${heightPct}%;"></div>
          </div>
          <span class="bar-label-bottom">#${idx + 1}</span>
        </div>
      `;
    }).join('');

    // 4. Previous Attempts History Table
    if (previousAttemptsTbody) {
      previousAttemptsTbody.innerHTML = sessions.slice(0, 6).map((s, i) => {
        let vsPrevHtml = '<span class="delta-tag neutral">Baseline</span>';
        if (i < sessions.length - 1) {
          const prev = sessions[i + 1];
          const diff = s.cpm - prev.cpm;
          if (diff > 0) {
            vsPrevHtml = `<span class="delta-tag positive">+${diff} CPM ↗</span>`;
          } else if (diff < 0) {
            vsPrevHtml = `<span class="delta-tag negative">${diff} CPM ↘</span>`;
          } else {
            vsPrevHtml = `<span class="delta-tag neutral">0 CPM =</span>`;
          }
        }

        return `
          <tr>
            <td><span style="color: var(--text-secondary); font-size: 0.8rem;">${s.date}</span></td>
            <td><strong>${s.category}</strong></td>
            <td><span class="diff-chip ${s.difficulty.toLowerCase()}">${s.difficulty}</span></td>
            <td><strong style="color: var(--accent-cyan); font-family: var(--font-mono);">${s.cpm}</strong></td>
            <td><span style="color: ${s.accuracy >= 85 ? 'var(--accent-green)' : 'var(--accent-gold)'}">${s.accuracy}%</span></td>
            <td>${vsPrevHtml}</td>
          </tr>
        `;
      }).join('');
    }
  }

  // ==========================================
  // DEEP SCORE ANALYSIS & DIAGNOSTICS
  // ==========================================
  renderScoreAnalysis(current, previous) {
    const deltaEl = document.getElementById('ana-cpm-delta');
    const deltaSub = document.getElementById('ana-delta-sub');
    const deltaIcon = document.getElementById('ana-delta-icon');
    const effScoreEl = document.getElementById('ana-efficiency-score');
    const effSub = document.getElementById('ana-efficiency-sub');
    const fastestEl = document.getElementById('ana-fastest-time');
    const slowestEl = document.getElementById('ana-slowest-time');
    const cutoffGapEl = document.getElementById('ana-cutoff-gap');
    const cutoffSub = document.getElementById('ana-cutoff-sub');
    const planBody = document.getElementById('diagnostic-plan-body');

    if (!deltaEl) return;

    // 1. Delta vs Previous
    if (previous) {
      const diff = current.cpm - previous.cpm;
      if (diff > 0) {
        deltaEl.textContent = `+${diff} CPM`;
        deltaEl.style.color = 'var(--accent-green)';
        deltaSub.textContent = `↑ ${Math.round((diff / Math.max(1, previous.cpm)) * 100)}% faster than previous attempt`;
        if (deltaIcon) deltaIcon.textContent = '🚀';
      } else if (diff < 0) {
        deltaEl.textContent = `${diff} CPM`;
        deltaEl.style.color = 'var(--accent-red)';
        deltaSub.textContent = `↓ Slower than previous attempt (${previous.cpm} CPM)`;
        if (deltaIcon) deltaIcon.textContent = '📉';
      } else {
        deltaEl.textContent = `0 CPM`;
        deltaEl.style.color = 'var(--text-main)';
        deltaSub.textContent = `Matched previous drill pace exactly`;
        if (deltaIcon) deltaIcon.textContent = '⚖️';
      }
    } else {
      deltaEl.textContent = `${current.cpm} CPM`;
      deltaEl.style.color = 'var(--accent-cyan)';
      deltaSub.textContent = `Initial baseline drill registered`;
      if (deltaIcon) deltaIcon.textContent = '🏁';
    }

    // 2. Efficiency Score
    if (effScoreEl) {
      effScoreEl.innerHTML = `${current.efficiencyScore}<span class="metric-unit">/100</span>`;
      if (current.efficiencyScore >= 80) {
        effScoreEl.style.color = 'var(--accent-green)';
        effSub.textContent = 'High speed & exceptional accuracy';
      } else if (current.efficiencyScore >= 55) {
        effScoreEl.style.color = 'var(--accent-cyan)';
        effSub.textContent = 'Balanced speed with steady precision';
      } else {
        effScoreEl.style.color = 'var(--accent-gold)';
        effSub.textContent = 'Accuracy drag: focus on error elimination';
      }
    }

    // 3. Pace Consistency
    if (fastestEl) fastestEl.textContent = `${current.fastestTime.toFixed(1)}s`;
    if (slowestEl) slowestEl.textContent = `${current.slowestTime.toFixed(1)}s`;

    // 4. SBI PO Cutoff Gap (Standard prelims requirement: 35-40 CPM)
    if (cutoffGapEl) {
      const targetCpm = 38;
      const gap = current.cpm - targetCpm;
      if (gap >= 5) {
        cutoffGapEl.textContent = `+${gap} CPM Ahead`;
        cutoffGapEl.style.color = 'var(--accent-green)';
        cutoffSub.textContent = 'Exceeds SBI PO Prelims speed requirement';
      } else if (gap >= 0) {
        cutoffGapEl.textContent = `At PO Target`;
        cutoffGapEl.style.color = 'var(--accent-cyan)';
        cutoffSub.textContent = 'On track for clearing Quant cutoffs';
      } else {
        cutoffGapEl.textContent = `${Math.abs(gap)} CPM Short`;
        cutoffGapEl.style.color = 'var(--accent-gold)';
        cutoffSub.textContent = `Target is 38+ CPM to finish 35 Qs in 20 min`;
      }
    }

    // 5. Tailored Diagnostic Plan
    if (planBody) {
      let advice = '';
      if (current.accuracy < 80) {
        advice = `⚠️ <strong>Accuracy Alert:</strong> Your accuracy was ${current.accuracy}%. In bank exams, negative marking (-0.25) destroys percentiles. Slow down by 0.3s per question to verify unit digits before pressing Enter.`;
      } else if (current.cpm < 28) {
        advice = `⚡ <strong>Speed Acceleration Needed:</strong> Your pace is ${current.cpm} CPM. Practice <strong>Tables 12-25</strong> and <strong>Squares 1-50</strong> in the Speed Arena to eliminate pen-and-paper scratchwork.`;
      } else if (current.cpm < 40) {
        advice = `📈 <strong>Approaching PO Benchmark:</strong> Solid session (${current.cpm} CPM, ${current.accuracy}% Acc). To break into the 45+ CPM tier, use the <strong>Vedic Criss-Cross</strong> and <strong>Base 100</strong> shortcuts in Tab 4.`;
      } else {
        advice = `🏆 <strong>Elite Speed & Precision:</strong> Exceptional ${current.cpm} CPM at ${current.accuracy}% accuracy! You are operating at the top 1% topper pace. Maintain this tempo in the <strong>Bank Mock Simulator</strong>!`;
      }
      planBody.innerHTML = advice;
    }
  }

  // ==========================================
  // PERFORMANCE DASHBOARD TAB
  // ==========================================
  renderDashboard() {
    const bestCpmEl = document.getElementById('kpi-best-cpm');
    const totalSolvedEl = document.getElementById('kpi-total-solved');
    const overallAccEl = document.getElementById('kpi-overall-acc');
    const maxStreakEl = document.getElementById('kpi-max-streak');

    if (bestCpmEl) bestCpmEl.textContent = this.data.bestCPM || 0;
    if (totalSolvedEl) totalSolvedEl.textContent = this.data.totalSolved || 0;
    if (overallAccEl) overallAccEl.textContent = `${this.getOverallAccuracy()}%`;
    if (maxStreakEl) maxStreakEl.textContent = this.data.allTimeMaxStreak || 0;

    const catBarsContainer = document.getElementById('category-bars');
    if (catBarsContainer) {
      catBarsContainer.innerHTML = '';
      const categories = Object.keys(this.data.categoryStats);
      let hasData = false;

      categories.forEach(cat => {
        const stat = this.data.categoryStats[cat];
        if (stat.solved > 0) {
          hasData = true;
          const acc = Math.round((stat.correct / stat.solved) * 100);
          const avgTime = (stat.totalTime / stat.solved).toFixed(1);

          const barRow = document.createElement('div');
          barRow.className = 'cat-bar-row';
          barRow.innerHTML = `
            <div class="cat-bar-header">
              <span><strong>${cat}</strong> (${stat.solved} solved, avg ${avgTime}s)</span>
              <span style="color: ${acc >= 85 ? 'var(--accent-green)' : (acc >= 70 ? 'var(--accent-gold)' : 'var(--accent-red)')}">
                ${acc}% Accuracy
              </span>
            </div>
            <div class="cat-bar-track">
              <div class="cat-bar-fill" style="width: ${acc}%; background: ${acc >= 85 ? 'var(--accent-green)' : (acc >= 70 ? 'var(--accent-gold)' : 'var(--accent-red)')}"></div>
            </div>
          `;
          catBarsContainer.appendChild(barRow);
        }
      });

      if (!hasData) {
        catBarsContainer.innerHTML = '<p class="text-muted" style="color: var(--text-muted); font-size: 0.9rem;">Practice in the Speed Arena to generate diagnostic performance data across operations!</p>';
      }
    }

    const tableBody = document.getElementById('sessions-table-body');
    if (tableBody) {
      if (this.data.sessions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-muted" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No drills completed yet. Start your first drill in the Speed Arena!</td></tr>';
      } else {
        tableBody.innerHTML = this.data.sessions.map(s => `
          <tr>
            <td>${s.date}</td>
            <td><strong>${s.category}</strong> <span style="font-size: 0.75rem; color: var(--text-muted);">(${s.difficulty})</span></td>
            <td>${s.mode}</td>
            <td>${s.correct} / ${s.total}</td>
            <td><strong style="color: var(--accent-cyan); font-family: var(--font-mono);">${s.cpm}</strong></td>
            <td><span style="color: ${s.accuracy >= 85 ? 'var(--accent-green)' : 'var(--accent-gold)'}">${s.accuracy}%</span></td>
            <td><span class="badge-ribbon" style="font-size: 0.7rem; padding: 0.2rem 0.6rem; margin: 0;">${s.grade}</span></td>
          </tr>
        `).join('');
      }
    }

    this.renderGraphAnalysis();
  }

  // ==========================================
  // GRAPH ANALYSIS STUDIO IMPLEMENTATION
  // ==========================================
  initGraphListeners() {
    const btns = document.querySelectorAll('.graph-tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentGraphType = btn.dataset.graph;
        this.renderGraphAnalysis();
      });
    });
  }

  showTooltip(e, html) {
    const tooltip = document.getElementById('graph-tooltip');
    const container = document.getElementById('graph-canvas-container');
    if (!tooltip || !container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tooltip.innerHTML = html;
    tooltip.style.display = 'block';
    tooltip.style.left = `${Math.min(rect.width - 240, Math.max(10, x + 15))}px`;
    tooltip.style.top = `${Math.min(rect.height - 80, Math.max(10, y - 45))}px`;
  }

  hideTooltip() {
    const tooltip = document.getElementById('graph-tooltip');
    if (tooltip) tooltip.style.display = 'none';
  }

  renderGraphAnalysis() {
    const container = document.getElementById('graph-canvas-container');
    const legendGroup = document.getElementById('graph-legend-group');
    const badge = document.getElementById('graph-benchmark-badge');
    if (!container) return;

    const sessions = this.data.sessions || [];
    this.updateGraphInsights(sessions);

    if (this.currentGraphType === 'trend') {
      if (legendGroup) {
        legendGroup.innerHTML = `
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1a73e8;"></span> Your Speed (CPM)</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#d93025;"></span> Cutoff (38 CPM)</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1e8e3e;"></span> Topper Benchmark (45 CPM)</div>
        `;
      }
      if (badge) badge.style.display = 'inline-flex';
      this.renderTrendGraph(sessions, container);
    } else if (this.currentGraphType === 'speed-acc') {
      if (legendGroup) {
        legendGroup.innerHTML = `
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1e8e3e;"></span> PO Qualified</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1a73e8;"></span> Accurate but Slow</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#f9ab00;"></span> Fast but Error-Prone</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#d93025;"></span> Needs Foundation</div>
        `;
      }
      if (badge) badge.style.display = 'none';
      this.renderSpeedAccGraph(sessions, container);
    } else if (this.currentGraphType === 'category') {
      if (legendGroup) {
        legendGroup.innerHTML = `
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1a73e8;"></span> Speed (CPM)</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1e8e3e;"></span> Accuracy %</div>
        `;
      }
      if (badge) badge.style.display = 'none';
      this.renderCategoryGraph(container);
    } else if (this.currentGraphType === 'pace') {
      if (legendGroup) {
        legendGroup.innerHTML = `
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1e8e3e;"></span> Fastest Response</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#1a73e8;"></span> Average Pace</div>
          <div class="legend-chip"><span class="legend-dot-sq" style="background:#d93025;"></span> Slowest Response</div>
        `;
      }
      if (badge) badge.style.display = 'none';
      this.renderPaceGraph(sessions, container);
    }
  }

  renderTrendGraph(sessions, container) {
    const W = 800, H = 300;
    const padL = 50, padR = 30, padT = 30, padB = 40;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    if (sessions.length === 0) {
      container.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}">
          <!-- Reference Lines -->
          <line x1="${padL}" y1="${padT + plotH * 0.4}" x2="${W - padR}" y2="${padT + plotH * 0.4}" stroke="#1e8e3e" stroke-dasharray="4,4" stroke-width="1.5" />
          <text x="${W - padR}" y="${padT + plotH * 0.4 - 6}" fill="#1e8e3e" font-size="11" text-anchor="end" font-weight="600">Topper Target: 45 CPM</text>

          <line x1="${padL}" y1="${padT + plotH * 0.55}" x2="${W - padR}" y2="${padT + plotH * 0.55}" stroke="#d93025" stroke-dasharray="4,4" stroke-width="1.5" />
          <text x="${W - padR}" y="${padT + plotH * 0.55 - 6}" fill="#d93025" font-size="11" text-anchor="end" font-weight="600">SBI PO Cutoff: 38 CPM</text>

          <!-- Axes -->
          <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
          <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />

          <text x="${W / 2}" y="${H / 2 + 10}" fill="var(--text-secondary)" font-size="13" font-weight="500" text-anchor="middle">
            No drill sessions recorded yet. Complete a 60s drill in Speed Arena to generate your CPM velocity trend!
          </text>
        </svg>
      `;
      return;
    }

    const set = sessions.slice(0, 16).reverse();
    const maxVal = Math.max(55, ...set.map(s => s.cpm) + 5);
    const minVal = 0;

    const getY = (val) => padT + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;
    const getX = (idx) => set.length === 1 ? padL + plotW / 2 : padL + (idx / (set.length - 1)) * plotW;

    // Grid lines
    let gridSvg = '';
    [0, 20, 40, maxVal].forEach(t => {
      const y = getY(t);
      gridSvg += `
        <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--border-subtle)" stroke-width="1" />
        <text x="${padL - 10}" y="${y + 4}" fill="var(--text-tertiary)" font-size="11" text-anchor="end">${t}</text>
      `;
    });

    // 38 CPM Cutoff Line
    const cutoffY = getY(38);
    const cutoffSvg = `
      <line x1="${padL}" y1="${cutoffY}" x2="${W - padR}" y2="${cutoffY}" stroke="#d93025" stroke-dasharray="6,4" stroke-width="2" />
      <text x="${W - padR}" y="${cutoffY - 6}" fill="#d93025" font-size="11" font-weight="700" text-anchor="end">SBI PO Cutoff (38 CPM)</text>
    `;

    // 45 CPM Topper Line
    const topperY = getY(45);
    const topperSvg = `
      <line x1="${padL}" y1="${topperY}" x2="${W - padR}" y2="${topperY}" stroke="#1e8e3e" stroke-dasharray="4,4" stroke-width="1.5" />
      <text x="${W - padR}" y="${topperY - 6}" fill="#1e8e3e" font-size="11" font-weight="700" text-anchor="end">RBI Benchmark (45 CPM)</text>
    `;

    // Points and Path
    const points = set.map((s, i) => `${getX(i)},${getY(s.cpm)}`).join(' ');
    const areaPoints = `${getX(0)},${padT + plotH} ${points} ${getX(set.length - 1)},${padT + plotH}`;

    let nodesSvg = '';
    set.forEach((s, i) => {
      const cx = getX(i);
      const cy = getY(s.cpm);
      const tip = `<strong>${s.category}</strong> (${s.difficulty})<br>Speed: <strong>${s.cpm} CPM</strong><br>Accuracy: <strong>${s.accuracy}%</strong><br>Date: ${s.date}`;
      nodesSvg += `
        <circle cx="${cx}" cy="${cy}" r="5" fill="#1a73e8" stroke="#ffffff" stroke-width="2" style="cursor:pointer;"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />
        <text x="${cx}" y="${padT + plotH + 20}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">#${i + 1}</text>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}">
        ${gridSvg}
        ${cutoffSvg}
        ${topperSvg}
        <polygon points="${areaPoints}" fill="rgba(26, 115, 232, 0.12)" />
        <polyline points="${points}" fill="none" stroke="#1a73e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        ${nodesSvg}
        <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
      </svg>
    `;
  }

  renderSpeedAccGraph(sessions, container) {
    const W = 800, H = 300;
    const padL = 50, padR = 30, padT = 30, padB = 40;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const minX = 0, maxX = 60;
    const minY = 40, maxY = 100;

    const getX = (cpm) => padL + ((Math.min(maxX, Math.max(minX, cpm)) - minX) / (maxX - minX)) * plotW;
    const getY = (acc) => padT + plotH - ((Math.min(maxY, Math.max(minY, acc)) - minY) / (maxY - minY)) * plotH;

    const midX = getX(38);
    const midY = getY(85);

    if (sessions.length === 0) {
      container.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}">
          <!-- Quadrants -->
          <rect x="${midX}" y="${padT}" width="${W - padR - midX}" height="${midY - padT}" fill="rgba(30, 142, 62, 0.08)" />
          <text x="${(midX + W - padR) / 2}" y="${padT + 25}" fill="#1e8e3e" font-size="12" font-weight="700" text-anchor="middle">PO QUALIFIED (38+ CPM, 85%+ Acc)</text>

          <rect x="${padL}" y="${padT}" width="${midX - padL}" height="${midY - padT}" fill="rgba(26, 115, 232, 0.05)" />
          <text x="${(padL + midX) / 2}" y="${padT + 25}" fill="#1a73e8" font-size="12" font-weight="700" text-anchor="middle">ACCURATE BUT SLOW</text>

          <rect x="${midX}" y="${midY}" width="${W - padR - midX}" height="${padT + plotH - midY}" fill="rgba(249, 171, 0, 0.08)" />
          <text x="${(midX + W - padR) / 2}" y="${padT + plotH - 15}" fill="#f9ab00" font-size="12" font-weight="700" text-anchor="middle">HIGH SPEED, HIGH RISK</text>

          <rect x="${padL}" y="${midY}" width="${midX - padL}" height="${padT + plotH - midY}" fill="rgba(217, 48, 37, 0.05)" />
          <text x="${(padL + midX) / 2}" y="${padT + plotH - 15}" fill="#d93025" font-size="12" font-weight="700" text-anchor="middle">NEEDS FOUNDATION</text>

          <!-- Axes -->
          <line x1="${midX}" y1="${padT}" x2="${midX}" y2="${padT + plotH}" stroke="#dadce0" stroke-width="2" stroke-dasharray="4,4" />
          <line x1="${padL}" y1="${midY}" x2="${W - padR}" y2="${midY}" stroke="#dadce0" stroke-width="2" stroke-dasharray="4,4" />

          <text x="${W / 2}" y="${H / 2}" fill="var(--text-secondary)" font-size="13" font-weight="500" text-anchor="middle">Complete drills to plot your session scatter distribution across the 4 exam quadrants!</text>
        </svg>
      `;
      return;
    }

    let dotsSvg = '';
    sessions.slice(0, 25).forEach((s) => {
      const cx = getX(s.cpm);
      const cy = getY(s.accuracy);
      let dotColor = '#1a73e8';
      if (s.cpm >= 38 && s.accuracy >= 85) dotColor = '#1e8e3e';
      else if (s.cpm >= 38 && s.accuracy < 85) dotColor = '#f9ab00';
      else if (s.cpm < 38 && s.accuracy < 85) dotColor = '#d93025';

      const tip = `<strong>${s.category}</strong><br>Speed: <strong>${s.cpm} CPM</strong><br>Accuracy: <strong>${s.accuracy}%</strong><br>Grade: ${s.grade}`;
      dotsSvg += `
        <circle cx="${cx}" cy="${cy}" r="6" fill="${dotColor}" stroke="#ffffff" stroke-width="2" style="cursor:pointer;"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}">
        <!-- Quadrant Fills -->
        <rect x="${midX}" y="${padT}" width="${W - padR - midX}" height="${midY - padT}" fill="rgba(30, 142, 62, 0.08)" />
        <rect x="${padL}" y="${padT}" width="${midX - padL}" height="${midY - padT}" fill="rgba(26, 115, 232, 0.05)" />
        <rect x="${midX}" y="${midY}" width="${W - padR - midX}" height="${padT + plotH - midY}" fill="rgba(249, 171, 0, 0.08)" />
        <rect x="${padL}" y="${midY}" width="${midX - padL}" height="${padT + plotH - midY}" fill="rgba(217, 48, 37, 0.05)" />

        <!-- Quadrant Dividers -->
        <line x1="${midX}" y1="${padT}" x2="${midX}" y2="${padT + plotH}" stroke="#dadce0" stroke-width="2" stroke-dasharray="4,4" />
        <line x1="${padL}" y1="${midY}" x2="${W - padR}" y2="${midY}" stroke="#dadce0" stroke-width="2" stroke-dasharray="4,4" />

        <!-- Quadrant Labels -->
        <text x="${W - padR - 10}" y="${padT + 18}" fill="#1e8e3e" font-size="11" font-weight="700" text-anchor="end">PO QUALIFIED ZONE</text>
        <text x="${padL + 10}" y="${padT + 18}" fill="#1a73e8" font-size="11" font-weight="700">ACCURATE BUT SLOW</text>
        <text x="${W - padR - 10}" y="${padT + plotH - 10}" fill="#f9ab00" font-size="11" font-weight="700" text-anchor="end">SPEED OVER ACCURACY</text>
        <text x="${padL + 10}" y="${padT + plotH - 10}" fill="#d93025" font-size="11" font-weight="700">NEEDS FOUNDATION</text>

        <!-- Axes labels -->
        <text x="${padL - 10}" y="${padT + 15}" fill="var(--text-tertiary)" font-size="11" text-anchor="end">100%</text>
        <text x="${padL - 10}" y="${midY + 4}" fill="var(--text-tertiary)" font-size="11" text-anchor="end">85%</text>
        <text x="${padL - 10}" y="${padT + plotH}" fill="var(--text-tertiary)" font-size="11" text-anchor="end">40%</text>

        <text x="${padL}" y="${padT + plotH + 20}" fill="var(--text-tertiary)" font-size="11" text-anchor="middle">0 CPM</text>
        <text x="${midX}" y="${padT + plotH + 20}" fill="#d93025" font-size="11" font-weight="700" text-anchor="middle">38 CPM</text>
        <text x="${W - padR}" y="${padT + plotH + 20}" fill="var(--text-tertiary)" font-size="11" text-anchor="middle">60 CPM</text>

        ${dotsSvg}
      </svg>
    `;
  }

  renderCategoryGraph(container) {
    const W = 800, H = 300;
    const padL = 120, padR = 40, padT = 25, padB = 30;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const stats = this.data.categoryStats;
    const keys = Object.keys(stats).filter(k => stats[k].solved > 0);
    const displayKeys = keys.length > 0 ? keys : ['Multiplication', 'Squares', 'Addition', 'Division', 'Simplification', 'Approximation'];

    const rowH = plotH / displayKeys.length;
    let barsSvg = '';

    displayKeys.forEach((cat, idx) => {
      const st = stats[cat] || { solved: 0, correct: 0, totalTime: 0 };
      const y = padT + idx * rowH;
      const acc = st.solved > 0 ? Math.round((st.correct / st.solved) * 100) : 0;
      const avgTime = st.solved > 0 ? (st.totalTime / st.solved) : 0;
      const cpm = avgTime > 0 ? Math.round(60 / avgTime) : 0;

      const cpmW = (Math.min(60, cpm) / 60) * (plotW / 2);
      const accW = (acc / 100) * (plotW / 2);

      let accColor = '#1e8e3e';
      if (acc < 70) accColor = '#d93025';
      else if (acc < 85) accColor = '#f9ab00';

      const tip = `<strong>${cat}</strong><br>Speed: <strong>${cpm} CPM</strong> (Avg ${avgTime.toFixed(1)}s)<br>Accuracy: <strong>${acc}%</strong> (${st.correct}/${st.solved} correct)`;

      barsSvg += `
        <!-- Category Label -->
        <text x="${padL - 10}" y="${y + rowH * 0.6}" fill="var(--text-primary)" font-size="11" font-weight="600" text-anchor="end">${cat.slice(0, 14)}</text>
        
        <!-- CPM Bar (Blue) -->
        <rect x="${padL}" y="${y + 4}" width="${Math.max(2, cpmW)}" height="${rowH * 0.35}" fill="#1a73e8" rx="2"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />
        <text x="${padL + cpmW + 6}" y="${y + rowH * 0.3}" fill="#1a73e8" font-size="10" font-weight="700">${cpm} CPM</text>

        <!-- Accuracy Bar -->
        <rect x="${padL}" y="${y + rowH * 0.45}" width="${Math.max(2, accW)}" height="${rowH * 0.35}" fill="${accColor}" rx="2"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />
        <text x="${padL + accW + 6}" y="${y + rowH * 0.72}" fill="${accColor}" font-size="10" font-weight="700">${acc}%</text>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}">
        <!-- Axes -->
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
        ${barsSvg}
      </svg>
    `;
  }

  renderPaceGraph(sessions, container) {
    const W = 800, H = 300;
    const padL = 50, padR = 30, padT = 30, padB = 40;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    if (sessions.length === 0) {
      container.innerHTML = `
        <svg viewBox="0 0 ${W} ${H}">
          <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
          <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
          <text x="${W / 2}" y="${H / 2}" fill="var(--text-secondary)" font-size="13" font-weight="500" text-anchor="middle">Complete drills to analyze your per-question fastest, average, and slowest pace stability!</text>
        </svg>
      `;
      return;
    }

    const set = sessions.slice(0, 15).reverse();
    const maxTime = Math.max(8, ...set.map(s => s.slowestTime || 4));

    const getY = (sec) => padT + plotH - (Math.min(maxTime, Math.max(0, sec)) / maxTime) * plotH;
    const getX = (idx) => padL + (idx / Math.max(1, set.length - 1)) * plotW;

    let svgs = '';
    set.forEach((s, idx) => {
      const cx = getX(idx);
      const yFast = getY(s.fastestTime || 1);
      const ySlow = getY(s.slowestTime || 3.5);
      const avgSec = s.durationSec / Math.max(1, s.total);
      const yAvg = getY(avgSec);

      const isErratic = (s.slowestTime - s.fastestTime) > 4;
      const lineColor = isErratic ? '#d93025' : '#dadce0';

      const tip = `<strong>${s.category} (${s.date})</strong><br>Fastest: <strong>${(s.fastestTime||0).toFixed(1)}s</strong><br>Average: <strong>${avgSec.toFixed(1)}s</strong><br>Slowest: <strong>${(s.slowestTime||0).toFixed(1)}s</strong><br>Latency Gap: ${(s.slowestTime - s.fastestTime).toFixed(1)}s ${isErratic ? '(Hesitation Trap)' : '(Smooth Rhythm)'}`;

      svgs += `
        <!-- Vertical Latency Range Line -->
        <line x1="${cx}" y1="${yFast}" x2="${cx}" y2="${ySlow}" stroke="${lineColor}" stroke-width="3" stroke-linecap="round" />

        <!-- Fastest Point (Green) -->
        <circle cx="${cx}" cy="${yFast}" r="4" fill="#1e8e3e"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />

        <!-- Average Point (Blue) -->
        <circle cx="${cx}" cy="${yAvg}" r="5" fill="#1a73e8" stroke="#ffffff" stroke-width="1.5"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />

        <!-- Slowest Point (Red) -->
        <circle cx="${cx}" cy="${ySlow}" r="4" fill="#d93025"
          onmouseenter="window.analyticsManager.showTooltip(event, '${tip}')"
          onmousemove="window.analyticsManager.showTooltip(event, '${tip}')"
          onmouseleave="window.analyticsManager.hideTooltip()" />

        <text x="${cx}" y="${padT + plotH + 20}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">#${idx + 1}</text>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}">
        <!-- Grid lines for seconds -->
        <line x1="${padL}" y1="${getY(2)}" x2="${W - padR}" y2="${getY(2)}" stroke="var(--border-subtle)" stroke-width="1" />
        <text x="${padL - 8}" y="${getY(2) + 4}" fill="var(--text-tertiary)" font-size="10" text-anchor="end">2s</text>

        <line x1="${padL}" y1="${getY(4)}" x2="${W - padR}" y2="${getY(4)}" stroke="var(--border-subtle)" stroke-width="1" />
        <text x="${padL - 8}" y="${getY(4) + 4}" fill="var(--text-tertiary)" font-size="10" text-anchor="end">4s</text>

        <line x1="${padL}" y1="${getY(6)}" x2="${W - padR}" y2="${getY(6)}" stroke="var(--border-subtle)" stroke-width="1" />
        <text x="${padL - 8}" y="${getY(6) + 4}" fill="var(--text-tertiary)" font-size="10" text-anchor="end">6s</text>

        <!-- Base axes -->
        <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-color)" stroke-width="1.5" />

        ${svgs}
      </svg>
    `;
  }

  updateGraphInsights(sessions) {
    const velEl = document.getElementById('insight-velocity');
    const velSub = document.getElementById('insight-velocity-sub');
    const cutEl = document.getElementById('insight-cutoff');
    const cutSub = document.getElementById('insight-cutoff-sub');
    const stabEl = document.getElementById('insight-stability');
    const stabSub = document.getElementById('insight-stability-sub');
    const focEl = document.getElementById('insight-focus');
    const focSub = document.getElementById('insight-focus-sub');

    if (!velEl) return;

    if (sessions.length < 2) {
      velEl.textContent = 'Calibrating';
      velSub.textContent = 'Needs 2+ drills';
      cutEl.textContent = `${this.data.bestCPM} / 38 CPM`;
      cutSub.textContent = 'Target: 38 CPM';
      stabEl.textContent = 'Baseline Mode';
      stabSub.textContent = 'Tracking variance';
      focEl.textContent = 'Multiplication 2x2';
      focSub.textContent = 'Vedic Step 1';
      return;
    }

    // 1. Speed Velocity
    const recent = sessions.slice(0, 5);
    const diff = recent[0].cpm - recent[recent.length - 1].cpm;
    if (diff > 0) {
      velEl.textContent = `+${diff} CPM`;
      velEl.style.color = '#1e8e3e';
      velSub.textContent = 'Accelerating tempo ↑';
    } else if (diff < 0) {
      velEl.textContent = `${diff} CPM`;
      velEl.style.color = '#d93025';
      velSub.textContent = 'Pace dipped slightly ↓';
    } else {
      velEl.textContent = `0 CPM`;
      velEl.style.color = 'var(--text-primary)';
      velSub.textContent = 'Stable momentum =';
    }

    // 2. Cutoff Readiness
    const best = this.data.bestCPM;
    if (best >= 45) {
      cutEl.textContent = 'RBI / Mains Tier';
      cutEl.style.color = '#1e8e3e';
      cutSub.textContent = 'Exceeds all prelim cutoffs';
    } else if (best >= 38) {
      cutEl.textContent = 'PO Prelims Ready';
      cutEl.style.color = '#1e8e3e';
      cutSub.textContent = '35 Qs in 20 min feasible';
    } else if (best >= 30) {
      cutEl.textContent = 'Clerk Qualified';
      cutEl.style.color = '#1a73e8';
      cutSub.textContent = `${38 - best} CPM to PO standard`;
    } else {
      cutEl.textContent = `${38 - best} CPM Gap`;
      cutEl.style.color = '#f9ab00';
      cutSub.textContent = 'Accelerate foundations';
    }

    // 3. Accuracy Stability
    const accuracies = recent.map(s => s.accuracy);
    const avgAcc = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
    const variance = accuracies.reduce((sum, a) => sum + Math.pow(a - avgAcc, 2), 0) / accuracies.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev < 5) {
      stabEl.textContent = `${Math.round(avgAcc)}% Solid`;
      stabEl.style.color = '#1e8e3e';
      stabSub.textContent = 'Ultra-low error variance';
    } else if (stdDev < 12) {
      stabEl.textContent = `±${Math.round(stdDev)}% Steady`;
      stabEl.style.color = '#1a73e8';
      stabSub.textContent = 'Moderate variance';
    } else {
      stabEl.textContent = `High Volatility`;
      stabEl.style.color = '#f9ab00';
      stabSub.textContent = 'Erratic accuracy spread';
    }

    // 4. Optimal Focus Recommendation
    const stats = this.data.categoryStats;
    let worstCat = null;
    let lowestAcc = 101;
    Object.keys(stats).forEach(k => {
      if (stats[k].solved >= 3) {
        const acc = Math.round((stats[k].correct / stats[k].solved) * 100);
        if (acc < lowestAcc) {
          lowestAcc = acc;
          worstCat = k;
        }
      }
    });

    if (worstCat) {
      focEl.textContent = worstCat.slice(0, 15);
      focSub.textContent = `Accuracy: ${lowestAcc}% (Bottleneck)`;
    } else {
      focEl.textContent = 'Tables 12-30';
      focSub.textContent = 'Memory reinforcement';
    }
  }

  exportData() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SpeedBanker_Analytics_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  clearData() {
    if (confirm('Are you sure you want to reset all your calculation history and stats?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.data = this.loadData();
      this.renderDashboard();
      this.renderPreviousScoreTracker();
      this.renderGraphAnalysis();
    }
  }
}

// Global analytics instance
window.analyticsManager = new AnalyticsManager();
