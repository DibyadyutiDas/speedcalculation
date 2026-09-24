/**
 * SpeedBanker Application Controller
 * Handles user interactions, timer loops, drill sessions, mock simulator, and UI rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. STATE & REFERENCES
  // ==========================================
  const state = {
    currentTab: 'shortcuts',
    theme: localStorage.getItem('speedbanker_theme') || 'light',

    // Arena State
    arenaActive: false,
    arenaTimer: null,
    arenaTimeLeft: 60,
    arenaTotalTime: 60,
    currentQuestion: null,
    questionStartTime: 0,
    totalSolved: 0,
    totalCorrect: 0,
    currentStreak: 0,
    maxStreak: 0,
    mistakes: [],
    mode: 'time-60',
    targetCategory: 'multiplication',
    difficulty: 'po',

    // Flash Addition State
    flashActive: false,
    flashNumbers: [],
    flashIndex: 0,
    flashInterval: null,
    flashSpeed: 800,
    flashCorrectSum: 0,

    // Exam Mock State
    examActive: false,
    examTimer: null,
    examTimeLeft: 600, // 10 minutes
    examQuestions: [],
    examCurrentIndex: 0,
    examAnswers: {}, // index -> { selectedOpt, status: 'answered' | 'marked' | 'unanswered' }

    // Reasoning State
    reasoningTopic: 'all',
    reasoningMode: 'drill', // 'drill' or 'rules'
    reasoningCurrentQ: null,
    reasoningStartTime: 0,
    reasoningTimerInterval: null,
    reasoningSolved: 0,
    reasoningCorrect: 0,
    reasoningStreak: 0,
    reasoningMaxStreak: 0,
    reasoningTotalTimeSec: 0,
    reasoningAnswered: false,
  };

  // DOM Elements
  const dom = {
    // Nav & Controls
    navTabs: document.querySelectorAll('.nav-tab'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    hotkeysBtn: document.getElementById('hotkeys-btn'),
    hotkeysModal: document.getElementById('hotkeys-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    toastContainer: document.getElementById('toast-container'),

    // Arena DOM
    moduleSelect: document.getElementById('module-select'),
    difficultySelect: document.getElementById('difficulty-select'),
    modeSelect: document.getElementById('mode-select'),
    startArenaBtn: document.getElementById('start-arena-btn'),
    resetArenaBtn: document.getElementById('reset-arena-btn'),
    arenaSplash: document.getElementById('arena-splash'),
    splashStartBtn: document.getElementById('splash-start-btn'),
    presetChips: document.querySelectorAll('.preset-chip'),
    questionCard: document.getElementById('question-card'),
    sessionSummaryCard: document.getElementById('session-summary-card'),

    // Arena HUD
    hudTimer: document.getElementById('hud-timer'),
    timerBarFill: document.getElementById('timer-bar-fill'),
    hudSolved: document.getElementById('hud-solved'),
    hudTargetDenom: document.getElementById('hud-target-denom'),
    hudCpm: document.getElementById('hud-cpm'),
    hudAcc: document.getElementById('hud-acc'),
    hudStreak: document.getElementById('hud-streak'),

    // Question Card
    qCategoryTag: document.getElementById('q-category-tag'),
    qDifficultyTag: document.getElementById('q-difficulty-tag'),
    qHintBtn: document.getElementById('q-hint-btn'),
    shortcutTipBox: document.getElementById('shortcut-tip-box'),
    shortcutTipContent: document.getElementById('shortcut-tip-content'),
    tipCloseBtn: document.getElementById('tip-close-btn'),
    qExpression: document.getElementById('q-expression'),
    answerInputWrapper: document.getElementById('answer-input-wrapper'),
    answerInput: document.getElementById('answer-input'),
    submitAnswerBtn: document.getElementById('submit-answer-btn'),
    mcqOptionsGrid: document.getElementById('mcq-options-grid'),
    feedbackBanner: document.getElementById('feedback-banner'),
    virtualKeypad: document.getElementById('virtual-keypad'),

    // Summary Card
    summaryGradeBadge: document.getElementById('summary-grade-badge'),
    summarySubtitle: document.getElementById('summary-subtitle'),
    sumCpm: document.getElementById('sum-cpm'),
    sumAcc: document.getElementById('sum-acc'),
    sumTimeAvg: document.getElementById('sum-time-avg'),
    sumMaxStreak: document.getElementById('sum-max-streak'),
    benchmarkFill: document.getElementById('benchmark-fill'),
    benchmarkFeedback: document.getElementById('benchmark-feedback'),
    mistakeCount: document.getElementById('mistake-count'),
    mistakesList: document.getElementById('mistakes-list'),
    summaryRetryBtn: document.getElementById('summary-retry-btn'),
    summaryReviewTricksBtn: document.getElementById('summary-review-tricks-btn'),

    // Flash DOM
    flashRowsSelect: document.getElementById('flash-rows-select'),
    flashDigitsSelect: document.getElementById('flash-digits-select'),
    flashSpeedSelect: document.getElementById('flash-speed-select'),
    startFlashBtn: document.getElementById('start-flash-btn'),
    flashCountIndicator: document.getElementById('flash-count-indicator'),
    flashNumber: document.getElementById('flash-number'),
    flashInputBox: document.getElementById('flash-input-box'),
    flashAnswerInput: document.getElementById('flash-answer-input'),
    flashSubmitBtn: document.getElementById('flash-submit-btn'),
    flashSolutionBreakdown: document.getElementById('flash-solution-breakdown'),

    // Exam Mock DOM
    examWelcome: document.getElementById('exam-welcome'),
    startExamBtn: document.getElementById('start-exam-btn'),
    examInterface: document.getElementById('exam-interface'),
    examClock: document.getElementById('exam-clock'),
    examSubmitFinalBtn: document.getElementById('exam-submit-final-btn'),
    examQNum: document.getElementById('exam-q-num'),
    examQContent: document.getElementById('exam-q-content'),
    examOptionsContainer: document.getElementById('exam-options-container'),
    examPaletteGrid: document.getElementById('exam-palette-grid'),
    examSaveNextBtn: document.getElementById('exam-save-next-btn'),
    examPrevBtn: document.getElementById('exam-prev-btn'),
    examMarkBtn: document.getElementById('exam-mark-btn'),
    examClearBtn: document.getElementById('exam-clear-btn'),
    examResultReport: document.getElementById('exam-result-report'),

    // Shortcuts & Charts & Analytics DOM
    shortcutsGrid: document.getElementById('shortcuts-grid'),
    chartTabBtns: document.querySelectorAll('.chart-tab-btn'),
    chartContentArea: document.getElementById('chart-content-area'),
    exportStatsBtn: document.getElementById('export-stats-btn'),
    clearStatsBtn: document.getElementById('clear-stats-btn'),

    // Reasoning DOM
    reasoningModeDrillBtn: document.getElementById('reasoning-mode-drill-btn'),
    reasoningModeRulesBtn: document.getElementById('reasoning-mode-rules-btn'),
    reasoningDrillView: document.getElementById('reasoning-drill-view'),
    reasoningRulesView: document.getElementById('reasoning-rules-view'),
    reasoningTopicChips: document.querySelectorAll('.reasoning-chip'),
    reasoningHudSolved: document.getElementById('reasoning-hud-solved'),
    reasoningHudAcc: document.getElementById('reasoning-hud-acc'),
    reasoningHudStreak: document.getElementById('reasoning-hud-streak'),
    reasoningHudPace: document.getElementById('reasoning-hud-pace'),
    reasoningNextBtn: document.getElementById('reasoning-next-btn'),
    rqCategoryTag: document.getElementById('rq-category-tag'),
    rqSubTag: document.getElementById('rq-sub-tag'),
    rqTimer: document.getElementById('rq-timer'),
    rqStatementText: document.getElementById('rq-statement-text'),
    rqConclusionsCard: document.getElementById('rq-conclusions-card'),
    rqConclusionsList: document.getElementById('rq-conclusions-list'),
    rqOptionsGrid: document.getElementById('rq-options-grid'),
    rqExplanationCard: document.getElementById('rq-explanation-card'),
    rqExpHeader: document.getElementById('rq-exp-header'),
    rqExpStatusIcon: document.getElementById('rq-exp-status-icon'),
    rqExpStatusText: document.getElementById('rq-exp-status-text'),
    rqExpContent: document.getElementById('rq-exp-content'),
    reasoningRulesGrid: document.getElementById('reasoning-rules-grid')
  };

  // ==========================================
  // 2. THEME & AUDIO SETUP
  // ==========================================
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      dom.themeToggleBtn.textContent = '🌙';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      dom.themeToggleBtn.textContent = '☀️';
    }
    localStorage.setItem('speedbanker_theme', theme);
    state.theme = theme;
  }

  applyTheme(state.theme);

  dom.themeToggleBtn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });


  // Toast Helper
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2200);
  }

  // ==========================================
  // 3. TAB NAVIGATION
  // ==========================================
  function switchTab(tabId) {
    dom.navTabs.forEach(t => {
      const isActive = t.dataset.tab === tabId;
      t.classList.toggle('active', isActive);
      if (isActive) {
        const navContainer = t.parentElement;
        if (navContainer && navContainer.scrollWidth > navContainer.clientWidth) {
          const targetScrollLeft = t.offsetLeft - (navContainer.clientWidth / 2) + (t.offsetWidth / 2);
          navContainer.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        }
      }
    });
    dom.tabPanes.forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
    state.currentTab = tabId;

    // Reset window horizontal scroll to 0 to prevent any page horizontal offset
    window.scrollTo({ left: 0 });

    if (tabId === 'analytics') {
      window.analyticsManager.renderDashboard();
    } else if (tabId === 'shortcuts') {
      renderShortcutsTab();
    } else if (tabId === 'tables') {
      renderChartsTab('fraction-pct');
    } else if (tabId === 'reasoning') {
      if (!state.reasoningCurrentQ) {
        loadNextReasoningQuestion();
      }
      renderReasoningRules();
    }
  }

  window.switchTab = switchTab;

  dom.navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Modal handlers
  dom.hotkeysBtn.addEventListener('click', () => { dom.hotkeysModal.style.display = 'flex'; });
  dom.modalCloseBtn.addEventListener('click', () => { dom.hotkeysModal.style.display = 'none'; });
  window.addEventListener('click', (e) => {
    if (e.target === dom.hotkeysModal) dom.hotkeysModal.style.display = 'none';
  });

  // ==========================================
  // PREFERENCES PERSISTENCE MANAGER
  // ==========================================
  const SETTINGS_KEY = 'speedbanker_user_preferences_v1';

  function loadSavedPreferences() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('Could not load user preferences:', e);
    }
    return {
      difficulty: 'po',
      module: 'multiplication',
      mode: 'time-60',
      flashRows: '6',
      flashDigits: '2',
      flashSpeed: '800'
    };
  }

  function savePreference(key, value) {
    try {
      const current = loadSavedPreferences();
      current[key] = value;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(current));
      flashSavedIndicator();
    } catch (e) {
      console.warn('Could not save user preference:', e);
    }
  }

  function flashSavedIndicator() {
    const ind = document.getElementById('level-saved-indicator');
    if (!ind) return;
    ind.style.transform = 'scale(1.08)';
    ind.style.borderColor = 'rgba(30, 142, 62, 0.6)';
    setTimeout(() => {
      ind.style.transform = 'scale(1)';
      ind.style.borderColor = '';
    }, 400);
  }

  // Modern Config Studio Interactive Controllers
  const diffSegmentedBtns = document.querySelectorAll('#difficulty-segmented .segmented-btn');
  const diffBadgeIndicator = document.getElementById('diff-badge-indicator');
  const modeChipBtns = document.querySelectorAll('#mode-chips .mode-chip-btn');
  const modeBadgeIndicator = document.getElementById('mode-badge-indicator');
  const categoryBadgeHint = document.getElementById('category-badge-hint');

  function updateCategoryBadge() {
    if (!dom.moduleSelect || !categoryBadgeHint) return;
    const selectedOpt = dom.moduleSelect.options[dom.moduleSelect.selectedIndex];
    const optGroup = selectedOpt?.parentElement?.label || 'Bank Exam';
    if (optGroup.includes('Foundations')) categoryBadgeHint.textContent = 'Foundations';
    else if (optGroup.includes('Powers')) categoryBadgeHint.textContent = 'Powers & Roots';
    else categoryBadgeHint.textContent = 'Real Exam Drill';
  }

  function syncDifficultyUI(val, shouldSave = true) {
    if (dom.difficultySelect) dom.difficultySelect.value = val;
    diffSegmentedBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === val);
    });
    if (diffBadgeIndicator) {
      if (val === 'clerk') diffBadgeIndicator.textContent = 'Clerk Prelims Level';
      else if (val === 'po') diffBadgeIndicator.textContent = 'PO Prelims Level';
      else if (val === 'mains') diffBadgeIndicator.textContent = 'Mains & RBI Level';
    }
    if (shouldSave) {
      savePreference('difficulty', val);
    }
  }

  function syncModeUI(val, shouldSave = true) {
    if (dom.modeSelect) dom.modeSelect.value = val;
    modeChipBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.value === val);
    });
    if (modeBadgeIndicator) {
      const modeTitles = {
        'time-60': '60s Sprint',
        'time-120': '2m Blitz',
        'time-300': '5m Marathon',
        'streak': '1-Life Sudden Death',
        'target-25': '25 Questions Target',
        'zen': 'Zen (No Timer)'
      };
      modeBadgeIndicator.textContent = modeTitles[val] || 'Sprint';
    }
    if (shouldSave) {
      savePreference('mode', val);
    }
  }

  diffSegmentedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      syncDifficultyUI(btn.dataset.value, true);
      window.soundEngine.playTick();
    });
  });

  modeChipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      syncModeUI(btn.dataset.value, true);
      window.soundEngine.playTick();
    });
  });

  if (dom.moduleSelect) {
    dom.moduleSelect.addEventListener('change', () => {
      updateCategoryBadge();
      savePreference('module', dom.moduleSelect.value);
    });
  }

  if (dom.flashRowsSelect) {
    dom.flashRowsSelect.addEventListener('change', () => {
      savePreference('flashRows', dom.flashRowsSelect.value);
    });
  }
  if (dom.flashDigitsSelect) {
    dom.flashDigitsSelect.addEventListener('change', () => {
      savePreference('flashDigits', dom.flashDigitsSelect.value);
    });
  }
  if (dom.flashSpeedSelect) {
    dom.flashSpeedSelect.addEventListener('change', () => {
      savePreference('flashSpeed', dom.flashSpeedSelect.value);
    });
  }

  // Preset Chips
  dom.presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.moduleSelect.value = chip.dataset.module;
      updateCategoryBadge();
      syncDifficultyUI(chip.dataset.diff, true);
      savePreference('module', chip.dataset.module);
      startArena();
    });
  });

  // Restore saved preferences on startup
  const savedUserPrefs = loadSavedPreferences();
  if (savedUserPrefs.difficulty) {
    syncDifficultyUI(savedUserPrefs.difficulty, false);
  }
  if (savedUserPrefs.module && dom.moduleSelect) {
    dom.moduleSelect.value = savedUserPrefs.module;
    updateCategoryBadge();
  }
  if (savedUserPrefs.mode) {
    syncModeUI(savedUserPrefs.mode, false);
  }
  if (savedUserPrefs.flashRows && dom.flashRowsSelect) {
    dom.flashRowsSelect.value = savedUserPrefs.flashRows;
  }
  if (savedUserPrefs.flashDigits && dom.flashDigitsSelect) {
    dom.flashDigitsSelect.value = savedUserPrefs.flashDigits;
  }
  if (savedUserPrefs.flashSpeed && dom.flashSpeedSelect) {
    dom.flashSpeedSelect.value = savedUserPrefs.flashSpeed;
  }

  // ==========================================
  // 4. SPEED ARENA LOGIC
  // ==========================================
  function startArena() {
    state.arenaActive = true;
    state.totalSolved = 0;
    state.totalCorrect = 0;
    state.currentStreak = 0;
    state.maxStreak = 0;
    state.mistakes = [];
    state.questionTimes = [];

    state.targetCategory = dom.moduleSelect.value;
    state.difficulty = dom.difficultySelect.value;
    state.mode = dom.modeSelect.value;

    // Reset HUD
    dom.hudSolved.textContent = '0';
    dom.hudCpm.textContent = '0';
    dom.hudAcc.textContent = '100';
    dom.hudStreak.textContent = '0';

    // Parse Mode Timer
    if (state.mode.startsWith('time-')) {
      const seconds = parseInt(state.mode.replace('time-', ''));
      state.arenaTotalTime = seconds;
      state.arenaTimeLeft = seconds;
      dom.hudTargetDenom.textContent = '';
      dom.hudTimer.innerHTML = `${seconds}.0<span class="hud-unit">s</span>`;
    } else if (state.mode === 'target-25') {
      state.arenaTotalTime = 0;
      state.arenaTimeLeft = 0;
      dom.hudTargetDenom.textContent = ' / 25';
      dom.hudTimer.innerHTML = `0.0<span class="hud-unit">s</span>`;
    } else if (state.mode === 'streak') {
      state.arenaTotalTime = 0;
      state.arenaTimeLeft = 0;
      dom.hudTargetDenom.textContent = ' (1 Life)';
      dom.hudTimer.innerHTML = `0.0<span class="hud-unit">s</span>`;
    } else {
      // Zen
      state.arenaTotalTime = 0;
      state.arenaTimeLeft = 0;
      dom.hudTargetDenom.textContent = '';
      dom.hudTimer.innerHTML = `Zen<span class="hud-unit"></span>`;
    }

    // Toggle UI views
    dom.arenaSplash.style.display = 'none';
    dom.sessionSummaryCard.style.display = 'none';
    dom.questionCard.style.display = 'flex';
    dom.startArenaBtn.style.display = 'none';
    dom.resetArenaBtn.style.display = 'inline-flex';

    nextQuestion();
    startArenaTimer();
  }

  function startArenaTimer() {
    if (state.arenaTimer) clearInterval(state.arenaTimer);
    const startTimestamp = performance.now();

    state.arenaTimer = setInterval(() => {
      if (!state.arenaActive) return;

      if (state.mode.startsWith('time-')) {
        state.arenaTimeLeft = Math.max(0, state.arenaTimeLeft - 0.1);
        dom.hudTimer.innerHTML = `${state.arenaTimeLeft.toFixed(1)}<span class="hud-unit">s</span>`;
        const pct = (state.arenaTimeLeft / state.arenaTotalTime) * 100;
        dom.timerBarFill.style.width = `${pct}%`;

        if (state.arenaTimeLeft <= 5 && state.arenaTimeLeft > 0) {
          window.soundEngine.playTick();
        }

        if (state.arenaTimeLeft <= 0) {
          endArenaSession('time_up');
        }
      } else if (state.mode === 'target-25' || state.mode === 'streak') {
        // Count up
        const elapsed = (performance.now() - startTimestamp) / 1000;
        dom.hudTimer.innerHTML = `${elapsed.toFixed(1)}<span class="hud-unit">s</span>`;
      }

      // Update real-time CPM
      const totalElapsedMin = Math.max(0.05, (state.arenaTotalTime - state.arenaTimeLeft) / 60);
      const cpm = Math.round(state.totalCorrect / totalElapsedMin);
      dom.hudCpm.textContent = isFinite(cpm) ? cpm : 0;
    }, 100);
  }

  function nextQuestion() {
    dom.feedbackBanner.className = 'feedback-banner';
    dom.feedbackBanner.textContent = '';
    dom.shortcutTipBox.style.display = 'none';

    state.currentQuestion = window.mathEngine.generate(state.targetCategory, state.difficulty);
    state.questionStartTime = performance.now();

    dom.qCategoryTag.textContent = state.currentQuestion.category;
    dom.qDifficultyTag.textContent = `${state.currentQuestion.difficulty} Level`;
    dom.qExpression.textContent = state.currentQuestion.expression;

    // Hint content
    dom.shortcutTipContent.innerHTML = state.currentQuestion.hint || 'No specific shortcut available.';

    // Mode: MCQ or Input
    if (state.currentQuestion.type === 'mcq' && state.currentQuestion.options) {
      dom.answerInputWrapper.style.display = 'none';
      dom.mcqOptionsGrid.style.display = 'grid';
      dom.virtualKeypad.style.display = 'none';

      dom.mcqOptionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D', 'E'];
      state.currentQuestion.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'mcq-btn';
        btn.innerHTML = `<span class="opt-badge">${letters[idx]}</span> ${opt}`;
        btn.addEventListener('click', () => handleAnswerSubmission(opt, btn));
        dom.mcqOptionsGrid.appendChild(btn);
      });
    } else {
      dom.answerInputWrapper.style.display = 'flex';
      dom.mcqOptionsGrid.style.display = 'none';
      dom.virtualKeypad.style.display = 'grid';
      dom.answerInput.value = '';
      dom.answerInput.focus();
    }
  }

  function handleAnswerSubmission(userVal, mcqBtn = null) {
    if (!state.arenaActive || !state.currentQuestion) return;

    const q = state.currentQuestion;
    const cleanUser = userVal.toString().trim().toLowerCase().replace('%', '');
    const cleanTarget = q.answer.toString().trim().toLowerCase().replace('%', '');

    // Check alternate answers
    let isCorrect = cleanUser === cleanTarget;
    if (!isCorrect && q.altAnswers) {
      isCorrect = q.altAnswers.some(alt => alt.toLowerCase().replace('%', '') === cleanUser);
    }

    state.totalSolved++;
    const questionDuration = (performance.now() - state.questionStartTime) / 1000;
    if (!state.questionTimes) state.questionTimes = [];
    state.questionTimes.push(questionDuration);

    if (isCorrect) {
      state.totalCorrect++;
      state.currentStreak++;
      if (state.currentStreak > state.maxStreak) {
        state.maxStreak = state.currentStreak;
      }

      window.soundEngine.playCorrect();
      if (state.currentStreak % 5 === 0) {
        window.soundEngine.playStreak(state.currentStreak);
      }

      dom.feedbackBanner.className = 'feedback-banner show-correct';
      dom.feedbackBanner.textContent = `✓ Correct! (${questionDuration.toFixed(1)}s)`;

      if (mcqBtn) {
        mcqBtn.classList.add('correct-pulse');
      }
    } else {
      state.currentStreak = 0;
      window.soundEngine.playWrong();

      state.mistakes.push({
        expression: q.expression,
        userAnswer: userVal || 'Blank',
        correctAnswer: q.answer,
        hint: q.hint
      });

      dom.feedbackBanner.className = 'feedback-banner show-wrong';
      dom.feedbackBanner.textContent = `✗ Wrong! Correct answer: ${q.answer}`;

      if (mcqBtn) {
        mcqBtn.classList.add('wrong-pulse');
      }

      if (state.mode === 'streak') {
        setTimeout(() => endArenaSession('streak_failed'), 500);
        return;
      }
    }

    // Update HUD stats
    dom.hudSolved.textContent = state.totalSolved;
    const acc = Math.round((state.totalCorrect / state.totalSolved) * 100);
    dom.hudAcc.textContent = acc;
    dom.hudStreak.textContent = state.currentStreak;

    // Check target 25 completion
    if (state.mode === 'target-25' && state.totalSolved >= 25) {
      setTimeout(() => endArenaSession('target_reached'), 400);
      return;
    }

    // Advance to next question after quick visual feedback
    const delay = isCorrect ? 250 : 750;
    setTimeout(() => {
      if (state.arenaActive) nextQuestion();
    }, delay);
  }

  function endArenaSession(reason) {
    state.arenaActive = false;
    if (state.arenaTimer) clearInterval(state.arenaTimer);
    window.soundEngine.playFanfare();

    dom.questionCard.style.display = 'none';
    dom.sessionSummaryCard.style.display = 'flex';
    dom.startArenaBtn.style.display = 'inline-flex';
    dom.resetArenaBtn.style.display = 'none';

    // Compute Session Stats
    const sessionDuration = state.mode.startsWith('time-')
      ? (state.arenaTotalTime - state.arenaTimeLeft)
      : Math.max(1, state.totalSolved * 2.2);

    const cpm = Math.round((state.totalCorrect / Math.max(0.1, sessionDuration / 60)));
    const acc = Math.round((state.totalCorrect / Math.max(1, state.totalSolved)) * 100);
    const avgTime = (sessionDuration / Math.max(1, state.totalSolved)).toFixed(1);

    dom.sumCpm.textContent = cpm;
    dom.sumAcc.textContent = `${acc}%`;
    dom.sumTimeAvg.textContent = `${avgTime}s`;
    dom.sumMaxStreak.textContent = state.maxStreak;

    // Benchmark comparison
    const grade = window.analyticsManager.getGrade(cpm, acc);
    dom.summaryGradeBadge.textContent = grade;

    let fillWidth = Math.min(100, Math.max(10, (cpm / 55) * 100));
    dom.benchmarkFill.style.width = `${fillWidth}%`;

    if (cpm >= 45 && acc >= 88) {
      dom.benchmarkFeedback.textContent = '🔥 Outstanding! Your calculation speed is in the top 1% of SBI PO aspirants.';
      dom.benchmarkFeedback.style.color = 'var(--accent-green)';
    } else if (cpm >= 30 && acc >= 80) {
      dom.benchmarkFeedback.textContent = '⚡ Solid speed! You have cleared typical Bank PO prelims speed thresholds.';
      dom.benchmarkFeedback.style.color = 'var(--accent-cyan)';
    } else {
      dom.benchmarkFeedback.textContent = '💡 Keep training daily! Aim for 35+ CPM by learning the Vedic shortcuts in Tab 4.';
      dom.benchmarkFeedback.style.color = 'var(--accent-gold)';
    }

    // Populate Mistakes Notebook
    dom.mistakeCount.textContent = state.mistakes.length;
    if (state.mistakes.length === 0) {
      dom.mistakesList.innerHTML = '<div style="color: var(--accent-green); padding: 0.5rem 0;">🎉 Flawless round! Zero mistakes.</div>';
    } else {
      dom.mistakesList.innerHTML = state.mistakes.map(m => `
        <div class="mistake-item">
          <div>
            <div class="mistake-q">${m.expression}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">💡 ${m.hint}</div>
          </div>
          <div class="mistake-answers">
            <span class="mistake-your">${m.userAnswer}</span>
            <span class="mistake-correct">${m.correctAnswer}</span>
          </div>
        </div>
      `).join('');
    }

    // Record in Analytics Manager with Score Diagnostics
    const fastestTime = (state.questionTimes && state.questionTimes.length > 0) ? Math.min(...state.questionTimes) : 1.0;
    const slowestTime = (state.questionTimes && state.questionTimes.length > 0) ? Math.max(...state.questionTimes) : 2.5;

    window.analyticsManager.recordSession({
      category: dom.moduleSelect.options[dom.moduleSelect.selectedIndex].text.split('(')[0].trim(),
      mode: dom.modeSelect.options[dom.modeSelect.selectedIndex].text.split(' ')[1] || 'Drill',
      difficulty: state.difficulty.toUpperCase(),
      total: state.totalSolved,
      correct: state.totalCorrect,
      durationSec: sessionDuration,
      cpm,
      maxStreak: state.maxStreak,
      mistakes: state.mistakes,
      fastestTime,
      slowestTime
    });
  }

  // Arena Listeners
  dom.startArenaBtn.addEventListener('click', startArena);
  dom.splashStartBtn.addEventListener('click', startArena);
  dom.resetArenaBtn.addEventListener('click', () => endArenaSession('user_stopped'));
  dom.summaryRetryBtn.addEventListener('click', startArena);
  dom.summaryReviewTricksBtn.addEventListener('click', () => switchTab('shortcuts'));

  // Hint Toggle
  dom.qHintBtn.addEventListener('click', () => {
    const isVisible = dom.shortcutTipBox.style.display !== 'none';
    dom.shortcutTipBox.style.display = isVisible ? 'none' : 'block';
  });
  dom.tipCloseBtn.addEventListener('click', () => {
    dom.shortcutTipBox.style.display = 'none';
  });

  // Submit Answer via Form
  dom.submitAnswerBtn.addEventListener('click', () => {
    handleAnswerSubmission(dom.answerInput.value);
  });

  // Virtual Keypad Click Handler
  dom.virtualKeypad.addEventListener('click', (e) => {
    const keyBtn = e.target.closest('.key-btn');
    if (!keyBtn) return;
    const key = keyBtn.dataset.key;

    if (key === 'enter') {
      handleAnswerSubmission(dom.answerInput.value);
    } else if (key === 'backspace') {
      dom.answerInput.value = dom.answerInput.value.slice(0, -1);
    } else if (key === 'clear') {
      dom.answerInput.value = '';
    } else {
      dom.answerInput.value += key;
    }
    dom.answerInput.focus();
  });

  // ==========================================
  // 5. FLASH CALCULATION (Mental Addition)
  // ==========================================
  function startFlashCalculation() {
    const rowCount = parseInt(dom.flashRowsSelect.value);
    const digits = parseInt(dom.flashDigitsSelect.value);
    state.flashSpeed = parseInt(dom.flashSpeedSelect.value);

    // Generate random numbers
    state.flashNumbers = [];
    const minVal = Math.pow(10, digits - 1);
    const maxVal = Math.pow(10, digits) - 1;

    for (let i = 0; i < rowCount; i++) {
      state.flashNumbers.push(window.mathEngine.randomInt(minVal, maxVal));
    }
    state.flashCorrectSum = state.flashNumbers.reduce((a, b) => a + b, 0);

    dom.flashInputBox.style.display = 'none';
    dom.startFlashBtn.disabled = true;
    dom.flashCountIndicator.textContent = 'Get ready!';
    dom.flashNumber.textContent = '3...';

    // Countdown 3, 2, 1
    let prepCount = 3;
    const prepInterval = setInterval(() => {
      prepCount--;
      if (prepCount > 0) {
        dom.flashNumber.textContent = `${prepCount}...`;
        window.soundEngine.playTick();
      } else {
        clearInterval(prepInterval);
        dom.flashNumber.textContent = 'GO!';
        setTimeout(runFlashSequence, 400);
      }
    }, 800);
  }

  function runFlashSequence() {
    state.flashIndex = 0;
    const total = state.flashNumbers.length;

    state.flashInterval = setInterval(() => {
      if (state.flashIndex < total) {
        dom.flashCountIndicator.textContent = `Number ${state.flashIndex + 1} of ${total}`;
        dom.flashNumber.textContent = state.flashNumbers[state.flashIndex];
        dom.flashNumber.style.animation = 'none';
        void dom.flashNumber.offsetWidth; // Reflow
        dom.flashNumber.style.animation = 'popIn 0.15s ease-out';
        window.soundEngine.playTick();
        state.flashIndex++;
      } else {
        clearInterval(state.flashInterval);
        dom.flashCountIndicator.textContent = 'Sequence Finished';
        dom.flashNumber.textContent = '?';
        dom.flashInputBox.style.display = 'flex';
        dom.flashAnswerInput.value = '';
        dom.flashSolutionBreakdown.innerHTML = '';
        dom.flashAnswerInput.focus();
        dom.startFlashBtn.disabled = false;
      }
    }, state.flashSpeed);
  }

  dom.startFlashBtn.addEventListener('click', startFlashCalculation);

  dom.flashSubmitBtn.addEventListener('click', () => {
    const userVal = parseInt(dom.flashAnswerInput.value);
    const correct = state.flashCorrectSum;

    if (userVal === correct) {
      window.soundEngine.playCorrect();
      dom.flashSolutionBreakdown.innerHTML = `
        <div style="color: var(--accent-green); font-weight: 700; font-size: 1.15rem;">✓ Brilliant! Correct Sum: ${correct}</div>
        <div style="margin-top: 0.5rem; color: var(--text-secondary);">Sequence: ${state.flashNumbers.join(' + ')} = ${correct}</div>
      `;
    } else {
      window.soundEngine.playWrong();
      dom.flashSolutionBreakdown.innerHTML = `
        <div style="color: var(--accent-red); font-weight: 700; font-size: 1.15rem;">✗ Not quite! Your answer: ${userVal || 0} | Correct Sum: ${correct}</div>
        <div style="margin-top: 0.5rem; color: var(--text-secondary);">Sequence: ${state.flashNumbers.join(' + ')} = ${correct}</div>
      `;
    }
  });

  // ==========================================
  // 6. BANK EXAM MOCK SIMULATOR (15 Questions)
  // ==========================================
  function startBankExam() {
    state.examActive = true;
    state.examTimeLeft = 600; // 10 minutes
    state.examCurrentIndex = 0;
    state.examAnswers = {};

    // Generate 15 Authentic Bank Questions
    state.examQuestions = [];
    for (let i = 0; i < 7; i++) {
      state.examQuestions.push(window.mathEngine.generate('simplification', 'po'));
    }
    for (let i = 0; i < 4; i++) {
      state.examQuestions.push(window.mathEngine.generate('approximation', 'po'));
    }
    for (let i = 0; i < 4; i++) {
      state.examQuestions.push(window.mathEngine.generate('series', 'po'));
    }

    // Ensure all have 5 options (convert input type to 5 MCQ options)
    state.examQuestions.forEach(q => {
      if (!q.options) {
        const correct = parseInt(q.answer) || 45;
        const diffs = [-8, -4, 0, 5, 12].sort(() => Math.random() - 0.5);
        let opts = diffs.map(d => (correct + d).toString());
        opts = Array.from(new Set(opts));
        while (opts.length < 5) opts.push((correct + opts.length * 3).toString());
        opts.sort((a, b) => parseInt(a) - parseInt(b));
        q.options = opts;
      }
    });

    dom.examWelcome.style.display = 'none';
    dom.examResultReport.style.display = 'none';
    dom.examInterface.style.display = 'grid';
    dom.examSubmitFinalBtn.style.display = 'inline-flex';

    buildExamPalette();
    loadExamQuestion(0);
    startExamTimer();
  }

  function startExamTimer() {
    if (state.examTimer) clearInterval(state.examTimer);

    state.examTimer = setInterval(() => {
      if (!state.examActive) return;

      state.examTimeLeft--;
      const mins = Math.floor(state.examTimeLeft / 60);
      const secs = state.examTimeLeft % 60;
      dom.examClock.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      if (state.examTimeLeft <= 60) {
        dom.examClock.style.color = 'var(--accent-red)';
      }

      if (state.examTimeLeft <= 0) {
        finishExam();
      }
    }, 1000);
  }

  function buildExamPalette() {
    dom.examPaletteGrid.innerHTML = '';
    state.examQuestions.forEach((_, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pal-btn not-visited';
      btn.textContent = idx + 1;
      btn.addEventListener('click', () => {
        saveCurrentExamAnswer(state.examAnswers[state.examCurrentIndex]?.status || 'not-answered');
        loadExamQuestion(idx);
      });
      dom.examPaletteGrid.appendChild(btn);
    });
  }

  function updatePaletteStatus(index, status) {
    const btn = dom.examPaletteGrid.children[index];
    if (!btn) return;
    btn.className = `pal-btn ${status}`;
    if (index === state.examCurrentIndex) {
      btn.classList.add('current');
    }
  }

  function loadExamQuestion(index) {
    state.examCurrentIndex = index;
    const q = state.examQuestions[index];

    // Update Palette active indicator
    Array.from(dom.examPaletteGrid.children).forEach((b, i) => {
      b.classList.toggle('current', i === index);
    });

    dom.examQNum.textContent = `Question No. ${index + 1} of ${state.examQuestions.length}`;
    dom.examQContent.textContent = q.expression;

    // Render Options
    dom.examOptionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const currentSaved = state.examAnswers[index]?.selectedOpt;

    q.options.forEach((opt, optIdx) => {
      const row = document.createElement('label');
      row.className = `exam-opt-row ${currentSaved === opt ? 'selected' : ''}`;
      row.innerHTML = `
        <input type="radio" name="exam-opt" class="exam-opt-radio" value="${opt}" ${currentSaved === opt ? 'checked' : ''}>
        <span class="exam-opt-label"><strong>(${letters[optIdx]})</strong> ${opt}</span>
      `;
      row.addEventListener('click', () => {
        document.querySelectorAll('.exam-opt-row').forEach(r => r.classList.remove('selected'));
        row.classList.add('selected');
        row.querySelector('input').checked = true;
      });
      dom.examOptionsContainer.appendChild(row);
    });

    if (dom.examPrevBtn) {
      dom.examPrevBtn.disabled = (index === 0);
    }
    if (dom.examSaveNextBtn) {
      dom.examSaveNextBtn.textContent = (index === state.examQuestions.length - 1) ? 'Save & Review' : 'Save & Next →';
    }
  }

  function saveCurrentExamAnswer(status = 'answered') {
    const selectedRadio = document.querySelector('input[name="exam-opt"]:checked');
    if (selectedRadio) {
      state.examAnswers[state.examCurrentIndex] = {
        selectedOpt: selectedRadio.value,
        status: status
      };
      updatePaletteStatus(state.examCurrentIndex, status);
    } else {
      if (status === 'marked') {
        state.examAnswers[state.examCurrentIndex] = { selectedOpt: null, status: 'marked' };
        updatePaletteStatus(state.examCurrentIndex, 'marked');
      } else {
        updatePaletteStatus(state.examCurrentIndex, 'not-answered');
      }
    }
  }

  if (dom.examPrevBtn) {
    dom.examPrevBtn.addEventListener('click', () => {
      saveCurrentExamAnswer(state.examAnswers[state.examCurrentIndex]?.status || 'not-answered');
      if (state.examCurrentIndex > 0) {
        loadExamQuestion(state.examCurrentIndex - 1);
      }
    });
  }

  dom.examSaveNextBtn.addEventListener('click', () => {
    saveCurrentExamAnswer('answered');
    if (state.examCurrentIndex < state.examQuestions.length - 1) {
      loadExamQuestion(state.examCurrentIndex + 1);
    } else {
      showToast('You are on the last question. Click "Submit Test" when ready!');
    }
  });

  dom.examMarkBtn.addEventListener('click', () => {
    saveCurrentExamAnswer('marked');
    if (state.examCurrentIndex < state.examQuestions.length - 1) {
      loadExamQuestion(state.examCurrentIndex + 1);
    }
  });

  dom.examClearBtn.addEventListener('click', () => {
    delete state.examAnswers[state.examCurrentIndex];
    document.querySelectorAll('.exam-opt-row').forEach(r => r.classList.remove('selected'));
    document.querySelectorAll('input[name="exam-opt"]').forEach(inp => inp.checked = false);
    updatePaletteStatus(state.examCurrentIndex, 'not-answered');
  });

  function finishExam() {
    state.examActive = false;
    if (state.examTimer) clearInterval(state.examTimer);
    window.soundEngine.playFanfare();

    dom.examInterface.style.display = 'none';
    dom.examSubmitFinalBtn.style.display = 'none';
    dom.examResultReport.style.display = 'flex';

    // Calculate score: +1 for correct, -0.25 for incorrect
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    state.examQuestions.forEach((q, idx) => {
      const ansObj = state.examAnswers[idx];
      if (ansObj && ansObj.selectedOpt) {
        if (ansObj.selectedOpt === q.answer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      } else {
        unattemptedCount++;
      }
    });

    const netScore = Math.max(0, (correctCount * 1.0 - incorrectCount * 0.25)).toFixed(2);
    const timeSpentSec = 600 - state.examTimeLeft;
    const mins = Math.floor(timeSpentSec / 60);
    const secs = timeSpentSec % 60;

    dom.examResultReport.innerHTML = `
      <div class="glass-panel" style="max-width: 680px; width: 100%; padding: 2.5rem 2rem;">
        <div class="badge-ribbon">SBI / IBPS PO PRELIMS SCORECARD</div>
        <h2 style="font-size: 2.2rem; font-weight: 800; margin: 0.5rem 0;">Net Score: <span style="color: var(--accent-cyan);">${netScore} / 15.00</span></h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Time Spent: ${mins}m ${secs}s</p>

        <div class="summary-stats-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 2rem;">
          <div class="summary-stat-box">
            <span class="stat-num" style="color: var(--accent-green);">${correctCount}</span>
            <span class="stat-desc">Correct (+${correctCount})</span>
          </div>
          <div class="summary-stat-box">
            <span class="stat-num" style="color: var(--accent-red);">${incorrectCount}</span>
            <span class="stat-desc">Incorrect (-${(incorrectCount * 0.25).toFixed(2)})</span>
          </div>
          <div class="summary-stat-box">
            <span class="stat-num" style="color: var(--text-muted);">${unattemptedCount}</span>
            <span class="stat-desc">Unattempted (0)</span>
          </div>
        </div>

        <div class="bank-benchmark-box" style="margin-bottom: 2rem;">
          <div class="benchmark-title">SBI PO Prelims Quant Speed Analysis:</div>
          <p style="color: ${netScore >= 11 ? 'var(--accent-green)' : (netScore >= 8 ? 'var(--accent-cyan)' : 'var(--accent-gold)')}; font-weight: 700;">
            ${netScore >= 11 
              ? '🏆 Excellent Speed & Accuracy! You comfortably cleared the Quant sectional cutoff (Cutoff is typically 8.5–10 marks in SBI PO Prelims).' 
              : (netScore >= 8 
                ? '⚡ Moderate Performance. You are on the border of the cutoff. Focus on eliminating negative marks.' 
                : '⚠️ Need More Speed Drill. Practice tables, squares, and fraction reciprocals to speed up BODMAS.')}
          </p>
        </div>

        <button id="exam-retry-btn" class="btn btn-primary btn-large">Take Another Mock Test</button>
      </div>
    `;

    document.getElementById('exam-retry-btn').addEventListener('click', startBankExam);
  }

  dom.startExamBtn.addEventListener('click', startBankExam);
  dom.examSubmitFinalBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to submit your Speed Mock Test?')) {
      finishExam();
    }
  });

  // ==========================================
  // 6.5. REASONING SPEED ENGINE & CHEAT CODES CONTROLLER
  // ==========================================
  function initReasoningModule() {
    if (!dom.reasoningModeDrillBtn || !dom.reasoningModeRulesBtn) return;

    // Mode Toggle (Live Drill vs Rules)
    dom.reasoningModeDrillBtn.addEventListener('click', () => {
      state.reasoningMode = 'drill';
      dom.reasoningModeDrillBtn.classList.add('active');
      dom.reasoningModeRulesBtn.classList.remove('active');
      dom.reasoningDrillView.style.display = 'block';
      dom.reasoningRulesView.style.display = 'none';
      if (!state.reasoningCurrentQ) loadNextReasoningQuestion();
    });

    dom.reasoningModeRulesBtn.addEventListener('click', () => {
      state.reasoningMode = 'rules';
      dom.reasoningModeRulesBtn.classList.add('active');
      dom.reasoningModeDrillBtn.classList.remove('active');
      dom.reasoningDrillView.style.display = 'none';
      dom.reasoningRulesView.style.display = 'block';
      renderReasoningRules();
    });

    // Topic Filter Chips
    dom.reasoningTopicChips.forEach(chip => {
      chip.addEventListener('click', () => {
        dom.reasoningTopicChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.reasoningTopic = chip.dataset.topic;
        loadNextReasoningQuestion();
      });
    });

    // Next Question Button
    if (dom.reasoningNextBtn) {
      dom.reasoningNextBtn.addEventListener('click', () => {
        loadNextReasoningQuestion();
      });
    }
  }

  function loadNextReasoningQuestion() {
    if (!window.reasoningEngine) return;

    let targetTopic = state.reasoningTopic;
    if (targetTopic === 'all') {
      const topics = ['puzzle_basics', 'inequalities', 'syllogisms', 'alphabet', 'direction', 'blood_relations'];
      targetTopic = topics[Math.floor(Math.random() * topics.length)];
    }

    const q = window.reasoningEngine.generateQuestion(targetTopic);
    state.reasoningCurrentQ = q;
    state.reasoningAnswered = false;
    state.reasoningStartTime = Date.now();

    // Reset & Start question timer display
    if (state.reasoningTimerInterval) clearInterval(state.reasoningTimerInterval);
    state.reasoningTimerInterval = setInterval(() => {
      if (!state.reasoningAnswered && dom.rqTimer) {
        const sec = ((Date.now() - state.reasoningStartTime) / 1000).toFixed(1);
        dom.rqTimer.textContent = `⏱️ ${sec}s`;
      }
    }, 100);

    // Populate UI elements
    const topicLabels = {
      puzzle_basics: 'Puzzle Clue Basics',
      inequalities: 'Inequalities',
      syllogisms: 'Syllogisms',
      alphabet: 'Alphabet & EJOTY',
      direction: 'Direction Sense',
      blood_relations: 'Blood Relations'
    };
    if (dom.rqCategoryTag) dom.rqCategoryTag.textContent = topicLabels[q.type] || q.type;
    if (dom.rqSubTag) dom.rqSubTag.textContent = q.title || 'Bank Exam Drill';
    if (dom.rqStatementText) dom.rqStatementText.textContent = q.statement;

    // Conclusions
    if (dom.rqConclusionsCard && dom.rqConclusionsList) {
      if (q.conclusions && q.conclusions.length > 0) {
        dom.rqConclusionsCard.style.display = 'block';
        dom.rqConclusionsList.innerHTML = q.conclusions.map(c => `
          <div class="rq-conclusion-item">${c}</div>
        `).join('');
      } else {
        dom.rqConclusionsCard.style.display = 'none';
      }
    }

    // Options
    const optLetters = ['A', 'B', 'C', 'D', 'E'];
    if (dom.rqOptionsGrid) {
      dom.rqOptionsGrid.innerHTML = q.options.map((opt, i) => `
        <button class="reasoning-opt-btn" data-index="${i}">
          <span class="opt-badge">${optLetters[i]}</span>
          <span class="opt-text">${opt}</span>
          <span class="opt-key-hint">[${i + 1}]</span>
        </button>
      `).join('');

      dom.rqOptionsGrid.querySelectorAll('.reasoning-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          handleReasoningOption(parseInt(btn.dataset.index));
        });
      });
    }

    // Hide explanation card
    if (dom.rqExplanationCard) dom.rqExplanationCard.style.display = 'none';
  }

  function handleReasoningOption(chosenIndex) {
    if (state.reasoningAnswered || !state.reasoningCurrentQ) return;
    state.reasoningAnswered = true;

    if (state.reasoningTimerInterval) clearInterval(state.reasoningTimerInterval);

    const elapsed = Math.max(0.5, (Date.now() - state.reasoningStartTime) / 1000);
    state.reasoningTotalTimeSec += elapsed;
    state.reasoningSolved++;

    const isCorrect = (chosenIndex === state.reasoningCurrentQ.correctIndex);
    if (isCorrect) {
      state.reasoningCorrect++;
      state.reasoningStreak++;
      if (state.reasoningStreak > state.reasoningMaxStreak) state.reasoningMaxStreak = state.reasoningStreak;
      window.soundEngine.playCorrect();
    } else {
      state.reasoningStreak = 0;
      window.soundEngine.playWrong();
    }

    // Disable all options & highlight correct/wrong
    const optButtons = dom.rqOptionsGrid.querySelectorAll('.reasoning-opt-btn');
    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === state.reasoningCurrentQ.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === chosenIndex) {
        btn.classList.add('wrong');
      }
    });

    // Reveal Explanation Card
    if (dom.rqExplanationCard) {
      dom.rqExplanationCard.style.display = 'block';
      const letters = ['A', 'B', 'C', 'D', 'E'];
      if (isCorrect) {
        dom.rqExpHeader.className = 'rq-exp-header correct';
        dom.rqExpStatusIcon.textContent = '✓';
        dom.rqExpStatusText.textContent = `CORRECT! Answer is Option ${letters[state.reasoningCurrentQ.correctIndex]}`;
      } else {
        dom.rqExpHeader.className = 'rq-exp-header wrong';
        dom.rqExpStatusIcon.textContent = '✗';
        dom.rqExpStatusText.textContent = `INCORRECT. Correct Option was ${letters[state.reasoningCurrentQ.correctIndex]}`;
      }
      dom.rqExpContent.textContent = state.reasoningCurrentQ.explanation;
    }

    // Update Reasoning HUD
    updateReasoningHUD();
  }

  function updateReasoningHUD() {
    if (dom.reasoningHudSolved) dom.reasoningHudSolved.textContent = state.reasoningSolved;
    if (dom.reasoningHudAcc) {
      const acc = state.reasoningSolved > 0 ? Math.round((state.reasoningCorrect / state.reasoningSolved) * 100) : 100;
      dom.reasoningHudAcc.textContent = `${acc}%`;
    }
    if (dom.reasoningHudStreak) dom.reasoningHudStreak.textContent = `${state.reasoningStreak} 🔥`;
    if (dom.reasoningHudPace) {
      const pace = state.reasoningSolved > 0 ? (state.reasoningTotalTimeSec / state.reasoningSolved).toFixed(1) : '0.0';
      dom.reasoningHudPace.textContent = `${pace}s`;
    }
  }

  function renderReasoningRules() {
    if (!dom.reasoningRulesGrid || !window.REASONING_RULES) return;
    dom.reasoningRulesGrid.innerHTML = window.REASONING_RULES.map(rule => `
      <div class="reasoning-rule-card glass-panel">
        <div class="rule-top">
          <div>
            <h3 class="rule-title">${rule.title}</h3>
            <span class="rule-badge" style="display:inline-block; margin-top: 0.35rem; background: var(--primary-subtle); color: var(--primary);">${rule.category}</span>
          </div>
          <span class="rule-badge">${rule.badge}</span>
        </div>
        <p class="rule-summary">${rule.summary}</p>
        <ul class="rule-points-list">
          ${rule.rules.map(r => `<li>${r}</li>`).join('')}
        </ul>
        <div class="rule-example-box">
          <div class="ex-label">AUTHENTIC EXAM EXAMPLE:</div>
          <div class="ex-statement">Statement: ${rule.example.statement}</div>
          <div class="ex-conclusions">
            ${rule.example.conclusions.map(c => `<div>• ${c}</div>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // 7. VEDIC SHORTCUTS TAB RENDERING
  // ==========================================
  function renderShortcutsTab() {
    if (!dom.shortcutsGrid) return;
    dom.shortcutsGrid.innerHTML = window.VEDIC_TRICKS.map(trick => `
      <div class="trick-card glass-panel">
        <div>
          <span class="trick-badge">${trick.badge}</span>
          <h3>${trick.title}</h3>
          <p class="trick-desc">${trick.description}</p>
        </div>

        <div class="trick-example-box">
          <div class="trick-example-title">Example: ${trick.example.problem}</div>
          <ul class="trick-steps">
            ${trick.example.steps.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <button class="btn btn-secondary btn-sm" onclick="practiceTrickCategory('${trick.category}')">
          ⚡ Practice This Pattern in Arena
        </button>
      </div>
    `).join('');
  }

  window.practiceTrickCategory = function(cat) {
    switchTab('arena');
    if (cat === 'Multiplication') dom.moduleSelect.value = 'multiplication';
    else if (cat === 'Squares') dom.moduleSelect.value = 'squares';
    else if (cat === 'Cubes') dom.moduleSelect.value = 'cubes';
    else if (cat === 'Cube Roots') dom.moduleSelect.value = 'cube_roots';
    else if (cat === 'Percentages') dom.moduleSelect.value = 'fractions_pct';
    else if (cat === 'Division') dom.moduleSelect.value = 'division';
    else if (cat === 'Approximation') dom.moduleSelect.value = 'approximation';
    else if (cat === 'Simplification') dom.moduleSelect.value = 'simplification';
    updateCategoryBadge();
    savePreference('module', dom.moduleSelect.value);
    startArena();
  };

  // ==========================================
  // 8. TABLES & CHARTS TAB RENDERING
  // ==========================================
  function renderChartsTab(chartType) {
    dom.chartTabBtns.forEach(b => b.classList.toggle('active', b.dataset.chart === chartType));

    if (chartType === 'fraction-pct') {
      const list = window.FRACTION_PERCENTAGE_TABLE || [];
      dom.chartContentArea.innerHTML = `
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Fraction to Percentage Reciprocals (Crucial for Bank DI & Simplification)</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Memorize these fractions to solve DI percentage problems in seconds!</p>
        <div class="chart-grid-cards">
          ${list.map(item => `
            <div class="chart-item-card">
              <span class="chart-item-val">${item.fraction}</span>
              <span style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8;">${item.decimal}</span>
              <span class="chart-item-sub">${item.note}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else if (chartType === 'squares-chart') {
      let cards = '';
      for (let i = 1; i <= 60; i++) {
        cards += `
          <div class="chart-item-card">
            <span class="chart-item-sub">${i}²</span>
            <span class="chart-item-val">${i * i}</span>
          </div>
        `;
      }
      dom.chartContentArea.innerHTML = `
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Squares from 1 to 60</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Knowing squares up to 50 saves 25% calculation time in every bank exam.</p>
        <div class="chart-grid-cards">${cards}</div>
      `;
    } else if (chartType === 'cubes-chart') {
      let cards = '';
      for (let i = 1; i <= 30; i++) {
        cards += `
          <div class="chart-item-card">
            <span class="chart-item-sub">${i}³</span>
            <span class="chart-item-val">${i * i * i}</span>
          </div>
        `;
      }
      dom.chartContentArea.innerHTML = `
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Cubes from 1 to 30</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Standard bank questions frequently test cubes of 11, 12, 13, 14, 15, 17, 19, 21, 23, 25.</p>
        <div class="chart-grid-cards">${cards}</div>
      `;
    } else if (chartType === 'tables-chart') {
      let tablesHtml = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;">';
      for (let t = 12; t <= 25; t++) {
        let lines = '';
        for (let m = 1; m <= 10; m++) {
          lines += `<div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.85rem; padding: 0.15rem 0;"><span>${t} × ${m}</span><strong>${t * m}</strong></div>`;
        }
        tablesHtml += `
          <div class="glass-panel" style="padding: 1rem 1.25rem; background: rgba(0,0,0,0.25);">
            <div style="font-weight: 800; color: var(--accent-gold); margin-bottom: 0.5rem; font-size: 1.1rem;">Table of ${t}</div>
            ${lines}
          </div>
        `;
      }
      tablesHtml += '</div>';

      dom.chartContentArea.innerHTML = `
        <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Speed Multiplication Tables (12 to 25)</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Direct recall tables eliminate pen-and-paper scratchwork.</p>
        ${tablesHtml}
      `;
    }
  }

  dom.chartTabBtns.forEach(btn => {
    btn.addEventListener('click', () => renderChartsTab(btn.dataset.chart));
  });

  // Analytics tab actions
  if (dom.exportStatsBtn) dom.exportStatsBtn.addEventListener('click', () => window.analyticsManager.exportData());
  if (dom.clearStatsBtn) dom.clearStatsBtn.addEventListener('click', () => window.analyticsManager.clearData());

  // ==========================================
  // 9. GLOBAL KEYBOARD SHORTCUTS
  // ==========================================
  window.addEventListener('keydown', (e) => {
    // If inside a text input in modal or flash, don't intercept normal typing
    if (e.target.tagName === 'INPUT' && e.target !== dom.answerInput) return;

    // Toggle Shortcut Hint (H)
    if (e.key === 'h' || e.key === 'H') {
      if (state.arenaActive && dom.shortcutTipBox) {
        const isVisible = dom.shortcutTipBox.style.display !== 'none';
        dom.shortcutTipBox.style.display = isVisible ? 'none' : 'block';
      }
    }


    // Escape to end arena session or close modal
    if (e.key === 'Escape') {
      if (dom.hotkeysModal.style.display !== 'none') {
        dom.hotkeysModal.style.display = 'none';
      } else if (state.arenaActive) {
        endArenaSession('user_escaped');
      }
    }

    // Number keys 1-5 for MCQ options during active drill, reasoning, or exam
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      if (state.currentTab === 'reasoning' && state.reasoningMode === 'drill') {
        if (!state.reasoningAnswered) {
          handleReasoningOption(parseInt(e.key) - 1);
          return;
        }
      } else if (state.arenaActive && state.currentQuestion?.type === 'mcq') {
        const idx = parseInt(e.key) - 1;
        const btns = dom.mcqOptionsGrid.querySelectorAll('.mcq-btn');
        if (btns[idx]) {
          btns[idx].click();
        }
      } else if (state.examActive) {
        const idx = parseInt(e.key) - 1;
        const radios = dom.examOptionsContainer.querySelectorAll('.exam-opt-row');
        if (radios[idx]) {
          radios[idx].click();
        }
      }
    }

    // Enter in reasoning tab when answered moves to next question
    if (e.key === 'Enter' && state.currentTab === 'reasoning') {
      if (state.reasoningAnswered) {
        loadNextReasoningQuestion();
        return;
      }
    }

    // Number keys 1-7 for Step navigation when not in an active drill or typing
    if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key) && !state.arenaActive && !state.examActive && !state.flashActive && (state.currentTab !== 'reasoning' || state.reasoningMode === 'rules')) {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const stepTabs = ['shortcuts', 'tables', 'arena', 'reasoning', 'flash', 'exam', 'analytics'];
        const stepIdx = parseInt(e.key) - 1;
        if (stepTabs[stepIdx]) {
          switchTab(stepTabs[stepIdx]);
        }
      }
    }

    // Space or Enter on idle arena screen to start
    if ((e.key === ' ' || e.key === 'Enter') && !state.arenaActive && state.currentTab === 'arena') {
      if (dom.arenaSplash.style.display !== 'none') {
        startArena();
      } else if (dom.sessionSummaryCard.style.display !== 'none') {
        startArena();
      }
    }
  });

  // Initial module and tab render
  initReasoningModule();
  renderShortcutsTab();
});
