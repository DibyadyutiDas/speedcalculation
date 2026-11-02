# SpeedBanker — Bank Exam Mental Math & Speed Calculation Engine

A modern web application specifically engineered to boost calculation speed for Banking Aspirants targeting **SBI PO/Clerk, IBPS PO/Clerk, RRB Office Assistant/Scale 1, and RBI Grade B**.

## 🌟 Key Features

1. **⚡ Speed Arena (Core Drill Engine)**:
   - **Target Categories**:
     - Multiplication ($2\times2$, $3\times2$, Base 100, Ending in 5, Vedic Criss-Cross)
     - Speed Tables (12 to 30 recall drills)
     - Rapid Addition (2-digit, 3-digit, left-to-right mental split)
     - Fast Subtraction & Complements (Nikhilam from 1000)
     - Division & Quotient estimation
     - Squares ($1-50$ and $51-125$ using $(50\pm x)^2$ & $(100\pm x)^2$)
     - Square Roots & Cube Roots (Unit digit elimination in 2 seconds)
     - Fraction to % Reciprocals ($1/2$ to $1/25$ with crucial multiples: $3/8$, $5/8$, $4/7$, $5/6$, $11/12$)
     - Authentic Bank Simplifications (BODMAS with missing variable `?`)
     - Approximations with 5 TCS iON-style multiple choice options
     - ⚖️ **Quadratic Equations Comparison ($x$ vs $y$)** (RRB PO mandatory 5 Qs with 2-second constant sign shortcuts)
     - Missing Number Series (multiplication + constant, squares/cubes diff, double diff)
     - ❌ **Wrong Number Series** (Intruder detection using dual difference triangulation)
     - Mixed Comprehensive Bank Drill
   - **Workout Modes**:
     - 60-Second Sprint, 2-Minute Blitz, 5-Minute Marathon
     - Sudden Death Streak (1 Life)
     - 25-Question Time Trial
     - Zen Endless Practice

2. **👁️ Flash Calculation (Sub-Second Mental Addition)**:
   - Flashes numbers rapidly on the screen (configurable speed: 350ms to 1200ms).
   - Trains automatic subconscious addition reflexes without paper.

3. **📝 TCS iON Bank Exam Mock Simulator (RRB PO Composite + SBI PO)**:
   - 🌾 **RRB PO 40-Q Composite Simulator (22 Mins)**: 20 Quant + 20 Reasoning with real-time section switching (⚡ Quant ⇄ 🧠 Reasoning), replicating the exact RRB Officer Scale 1 composite environment.
   - 🏛️ **SBI/IBPS 15-Q Quant Speed Drill (10 Mins)**: Strict 10-minute speed math sprint.
   - Exact exam scoring ($+1$ for correct, $-0.25$ for wrong answers).
   - Interactive Question Palette with section indicators (`sec-quant`, `sec-reasoning`).
   - Cutoff benchmark feedback comparing your projected score to real **RRB PO State Cutoffs (54–62 / 80)**.

4. **🧠 High-Yield Vedic Shortcuts Sandbox**:
   - Explains the exact mental shortcuts used by toppers (Base 100, Ekadhikena Purvena, Criss-Cross, Power of 10 Split, Percentage Interchange Rule, 2-Second Quadratic Sign Inversion).
   - "Practice This Pattern in Arena" button for immediate reinforcement.

5. **🧠 Bank Reasoning Ability Speed Engine (Partitioned by Topic & Level)**:
   - **Topics Covered**:
     - 🧩 Puzzle Clue Basics ("N Away", "N Between", Floor/Box Gaps, Circular Clockwise/Counter-Clockwise)
     - 🎯 Exam Phrasing Traps (Tricky, Repeated & Normal: Pronoun "Who" vs "And", Same Flat vs Different Flat, Consecutive restrictions, "% More than" vs "% Of", Relative Speed, "Only" Syllogism locks)
     - 👑 Inequalities (King-Queen-Soldier Priority, Definite False Blocked Paths, Either-Or)
     - ⭕ Syllogisms ("Only a few", "All can never be", Possibility overlap, Either-Or)
     - 🔤 Alphabet & Series (Forward/Reverse, EJOTY Anchors, Opposite Pairs, Relative Shift, Alphanumerics)
     - 🧭 Direction & Distance (Pythagorean Triples, Coordinate Displacement, Sunrise/Sunset Shadows, Coded paths)
     - 👥 Blood Relations (Family Tree Generation Grid, Direct Introductions, Coded Relations)
   - **Multi-Tier Difficulty Levels**:
     - 🟢 **Level 1: Easy (Clerk Prelims)** — Rapid single-step deduction drills for high velocity.
     - 🟡 **Level 2: Moderate (SBI/IBPS PO Prelims)** — Standard prelims traps, dual-statement linkages, and possibility tests.
     - 🔴 **Level 3: Hard (PO Mains & Advanced)** — Multi-statement combinations, coded variations, and complex conditions.
   - **Interactive Live Drill & Cheat Codes**:
     - Real-time pace per question (CPM) and streak multiplier.
     - Immediate step-by-step logical proof after answering.
     - Save & Log Drill Session directly into performance tracking.

6. **📈 Advanced Data Analytics & RRB PO Performance Telemetry Studio**:
   - **Interactive Multi-Mode Graphs**:
     - 📈 **Speed (CPM) Progression Trend**: Chronological velocity curve with SBI PO cutoff (38 CPM) and RBI benchmark (45 CPM) reference lines, with Quant vs Reasoning color-coded nodes.
     - 🎯 **Speed vs Accuracy (Quadrant Scatter)**: Plots sessions across 4 key exam zones (PO Qualified, Accurate but Slow, Speed over Accuracy, Needs Foundation).
     - 🌾 **RRB PO Score Predictor & State Cutoff Matrix**: Projects your 45-minute exam performance onto the real 80-mark RRB PO scale and evaluates status across major states (UP 62.5, Rajasthan 60.25, Haryana 61.75, Bihar 56.75, MP 55.25, Maharashtra 51.5, Gujarat 50.0).
     - 📊 **Category Proficiency**: Horizontal speed and accuracy bars across all 15 Quant and Reasoning categories.
     - ⏱️ **Pace Consistency**: Fastest, average, and slowest response latency range analysis.
   - **Section Filter**: View Unified performance across all drills, or filter by ⚡ Quant Speed or 🧠 Reasoning Speed independently.
   - **Deep Diagnostics**: Speed Velocity, RRB PO Cutoff Readiness (80M projection), Accuracy Stability (Standard deviation & error variance), and Priority Focus recommendations.
   - **Mistake Notebook & History**: Session breakdown with date, category, difficulty level, CPM, and grade.
   - **Data Management**: Export analytics to JSON or reset history.

7. **📊 Reference Tables & % Reciprocals**:
   - Fraction to Percentage chart ($1/2$ through $1/25$).
   - Squares table ($1$ to $60$).
   - Cubes table ($1$ to $30$).
   - Speed Tables ($12$ to $25$).

8. **Tactile Sound & Theme Engine**:
   - Web Audio API synthesizer for zero-latency auditory feedback (chimes, streak escalation, buzzer, timer ticks, fanfare).
   - Sleek Dark / Light theme toggle.

---

## 🚀 Running Locally

The local server is running at:
```
http://localhost:8080/
```

Or you can start it anytime with:
```bash
npx serve .
# or
python -m http.server 8080
# or simply double click index.html
```
