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
     - Missing Number Series (multiplication + constant, squares/cubes diff, double diff)
     - Mixed Comprehensive Bank Drill
   - **Workout Modes**:
     - 60-Second Sprint, 2-Minute Blitz, 5-Minute Marathon
     - Sudden Death Streak (1 Life)
     - 25-Question Time Trial
     - Zen Endless Practice

2. **👁️ Flash Calculation (Sub-Second Mental Addition)**:
   - Flashes numbers rapidly on the screen (configurable speed: 350ms to 1200ms).
   - Trains automatic subconscious addition reflexes without paper.

3. **📝 TCS iON Bank Exam Mock Simulator**:
   - 15 authentic bank prelims questions in 10 minutes.
   - Exact exam scoring ($+1$ for correct, $-0.25$ for wrong answers).
   - Interactive Question Palette (Answered, Not Answered, Marked for Review, Not Visited).
   - Cutoff benchmark feedback comparing your score to real SBI PO Prelims cutoffs.

4. **🧠 High-Yield Vedic Shortcuts Sandbox**:
   - Explains the exact mental shortcuts used by toppers (Base 100, Ekadhikena Purvena, Criss-Cross, Power of 10 Split, Percentage Interchange Rule).
   - "Practice This Pattern in Arena" button for immediate reinforcement.

5. **📊 Reference Tables & % Reciprocals**:
   - Fraction to Percentage chart ($1/2$ through $1/25$).
   - Squares table ($1$ to $60$).
   - Cubes table ($1$ to $30$).
   - Speed Tables ($12$ to $25$).

6. **📈 Diagnostic Performance Dashboard**:
   - Tracks Calculations Per Minute (CPM), overall accuracy, max streaks.
   - Weak spot diagnostics showing which operations take longest.
   - Mistake Notebook to review wrong answers with explanations.
   - Export analytics to JSON or reset history.

7. **Tactile Sound & Theme Engine**:
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
