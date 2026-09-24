/**
 * SpeedBanker Calculation Generator Engine
 * Generates bank-exam calibrated mental math problems across all categories.
 */

class MathEngine {
  constructor() {
    this.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generate(category, difficulty = 'po') {
    if (category === 'all_mixed') {
      const bankCategories = [
        'multiplication', 'tables', 'addition', 'subtraction', 'division',
        'squares', 'square_roots', 'cubes', 'cube_roots',
        'fractions_pct', 'simplification', 'approximation', 'series'
      ];
      category = bankCategories[Math.floor(Math.random() * bankCategories.length)];
    }

    switch (category) {
      case 'multiplication':
        return this.generateMultiplication(difficulty);
      case 'tables':
        return this.generateTables(difficulty);
      case 'addition':
        return this.generateAddition(difficulty);
      case 'subtraction':
        return this.generateSubtraction(difficulty);
      case 'division':
        return this.generateDivision(difficulty);
      case 'squares':
        return this.generateSquares(difficulty);
      case 'square_roots':
        return this.generateSquareRoots(difficulty);
      case 'cubes':
        return this.generateCubes(difficulty);
      case 'cube_roots':
        return this.generateCubeRoots(difficulty);
      case 'fractions_pct':
        return this.generateFractionPct(difficulty);
      case 'simplification':
        return this.generateSimplification(difficulty);
      case 'approximation':
        return this.generateApproximation(difficulty);
      case 'series':
        return this.generateNumberSeries(difficulty);
      default:
        return this.generateMultiplication(difficulty);
    }
  }

  // 1. MULTIPLICATION
  generateMultiplication(diff) {
    let a, b, hint = '';
    const patternType = Math.random();

    if (diff === 'clerk') {
      if (patternType < 0.4) {
        // Table based / by 1-digit
        a = this.randomInt(13, 29);
        b = this.randomInt(6, 12);
      } else if (patternType < 0.7) {
        // Multiplied by 11 or 5
        a = this.randomInt(24, 89);
        b = Math.random() < 0.5 ? 11 : 5;
        hint = b === 11 ? 'Use Vedic 11 rule: Add neighbor digits.' : 'Multiply by 10 then divide by 2.';
      } else {
        // Simple 2x2
        a = this.randomInt(14, 35);
        b = this.randomInt(12, 25);
      }
    } else if (diff === 'po') {
      if (patternType < 0.25) {
        // Base 100 method: both close to 100 (e.g. 93 x 97 or 103 x 108)
        const subType = Math.random();
        if (subType < 0.5) {
          a = this.randomInt(91, 99);
          b = this.randomInt(91, 99);
          const devA = 100 - a;
          const devB = 100 - b;
          hint = `Base 100: (-${devA}) × (-${devB}) = ${(devA * devB).toString().padStart(2, '0')}. First part: ${a} - ${devB} = ${a - devB}.`;
        } else {
          a = this.randomInt(102, 112);
          b = this.randomInt(102, 112);
          const devA = a - 100;
          const devB = b - 100;
          hint = `Base 100: (+${devA}) × (+${devB}) = ${(devA * devB).toString().padStart(2, '0')}. First part: ${a} + ${devB} = ${a + devB}.`;
        }
      } else if (patternType < 0.5) {
        // Ending in 5 or unit sum 10
        const tens = this.randomInt(2, 9);
        const u1 = this.randomInt(1, 9);
        const u2 = 10 - u1;
        a = tens * 10 + u1;
        b = tens * 10 + u2;
        hint = `Same tens & units sum to 10: [${tens} × ${tens + 1}] | [${u1} × ${u2}] = ${tens * (tens + 1)}${(u1 * u2).toString().padStart(2, '0')}`;
      } else if (patternType < 0.75) {
        // Multiplying by 25 or 50
        a = this.randomInt(16, 96);
        b = Math.random() < 0.6 ? 25 : 50;
        hint = b === 25 ? `Divide ${a} by 4, then multiply by 100!` : `Half of ${a} (${a/2}), then multiply by 100!`;
      } else {
        // Standard 2x2 Vedic criss-cross
        a = this.randomInt(24, 88);
        b = this.randomInt(21, 79);
        hint = 'Vedic Criss-Cross: 1) Units product, 2) Cross-sum + carry, 3) Tens product + carry.';
      }
    } else {
      // Mains level: 3x2 or 3x3
      if (Math.random() < 0.6) {
        a = this.randomInt(115, 345);
        b = this.randomInt(14, 45);
        hint = `Split: ${a} × ${b} = (${a} × ${(Math.floor(b/10)*10)}) + (${a} × ${b%10})`;
      } else {
        a = this.randomInt(103, 125);
        b = this.randomInt(103, 125);
        const devA = a - 100;
        const devB = b - 100;
        hint = `Base 100 trick: [${a} + ${devB}] | [${devA} × ${devB}]`;
      }
    }

    const answer = a * b;
    return {
      type: 'input',
      category: 'Multiplication',
      difficulty: diff.toUpperCase(),
      expression: `${a} × ${b} = ?`,
      answer: answer.toString(),
      hint: hint || 'Try splitting the numbers into round tens + units mentally.'
    };
  }

  // 2. SPEED TABLES (12 to 30)
  generateTables(diff) {
    let base, mult;
    if (diff === 'clerk') {
      base = this.randomInt(12, 19);
      mult = this.randomInt(3, 9);
    } else if (diff === 'po') {
      base = this.randomInt(16, 29);
      mult = this.randomInt(3, 9);
    } else {
      base = this.randomInt(21, 35);
      mult = this.randomInt(6, 12);
    }

    const answer = base * mult;
    return {
      type: 'input',
      category: 'Tables (Pahade)',
      difficulty: diff.toUpperCase(),
      expression: `${base} × ${mult} = ?`,
      answer: answer.toString(),
      hint: `Bankers must know tables 12-30 by heart! Split: (${Math.floor(base/10)*10} × ${mult}) + (${base%10} × ${mult}).`
    };
  }

  // 3. RAPID ADDITION
  generateAddition(diff) {
    let terms = [];
    let hint = '';

    if (diff === 'clerk') {
      terms = [this.randomInt(24, 89), this.randomInt(26, 95)];
      hint = 'Add tens first, then add units. E.g. (60+70) + (8+9)';
    } else if (diff === 'po') {
      if (Math.random() < 0.5) {
        // 3 terms 2-digit
        terms = [this.randomInt(34, 88), this.randomInt(25, 79), this.randomInt(42, 96)];
      } else {
        // 3-digit + 2-digit
        terms = [this.randomInt(145, 485), this.randomInt(65, 98)];
      }
      hint = 'Rounding trick: add to the nearest 10 or 100, then adjust the difference!';
    } else {
      // Mains: 3-digit + 3-digit + 3-digit
      terms = [this.randomInt(215, 680), this.randomInt(180, 540), this.randomInt(125, 430)];
      hint = 'Left-to-Right addition: Sum the hundreds, then the tens, then the ones!';
    }

    const sum = terms.reduce((acc, val) => acc + val, 0);
    return {
      type: 'input',
      category: 'Addition',
      difficulty: diff.toUpperCase(),
      expression: `${terms.join(' + ')} = ?`,
      answer: sum.toString(),
      hint
    };
  }

  // 4. FAST SUBTRACTION & COMPLEMENTS
  generateSubtraction(diff) {
    let a, b, hint = '';
    if (diff === 'clerk') {
      a = this.randomInt(65, 150);
      b = this.randomInt(18, a - 10);
      hint = 'Complement method: Count up from the subtracted number to the round base.';
    } else if (diff === 'po') {
      if (Math.random() < 0.5) {
        // Complements from 1000 (All from 9 and last from 10)
        a = 1000;
        b = this.randomInt(123, 899);
        hint = 'Vedic: Nikhilam Navatashcaramam Dashatah (All from 9, last from 10)!';
      } else {
        a = this.randomInt(340, 950);
        b = this.randomInt(165, a - 25);
        hint = `Round ${b} up to next 100, subtract, and add back the difference!`;
      }
    } else {
      a = this.randomInt(1250, 4800);
      b = this.randomInt(380, a - 200);
      hint = 'Subtract left to right: thousands, then hundreds, then tens, then units.';
    }

    const diffVal = a - b;
    return {
      type: 'input',
      category: 'Subtraction',
      difficulty: diff.toUpperCase(),
      expression: `${a} - ${b} = ?`,
      answer: diffVal.toString(),
      hint
    };
  }

  // 5. QUICK DIVISION
  generateDivision(diff) {
    let divisor, quotient;
    if (diff === 'clerk') {
      divisor = this.randomInt(4, 9);
      quotient = this.randomInt(14, 45);
    } else if (diff === 'po') {
      divisor = this.randomInt(12, 19);
      quotient = this.randomInt(15, 65);
    } else {
      divisor = this.randomInt(16, 28);
      quotient = this.randomInt(35, 95);
    }

    const dividend = divisor * quotient;
    return {
      type: 'input',
      category: 'Division',
      difficulty: diff.toUpperCase(),
      expression: `${dividend} ÷ ${divisor} = ?`,
      answer: quotient.toString(),
      hint: `Recall the table of ${divisor}: ${divisor} × ? ≈ ${Math.floor(dividend/10)*10}`
    };
  }

  // 6. SQUARES (1 to 50 & 51 to 125)
  generateSquares(diff) {
    let n, hint = '';
    if (diff === 'clerk') {
      n = this.randomInt(11, 35);
      hint = 'Squares up to 30 must be at your fingertips for SBI Prelims!';
    } else if (diff === 'po') {
      // 36 to 65 (Base 50 formula)
      n = this.randomInt(36, 65);
      const dev = n - 50;
      const basePart = 25 + dev;
      const devSq = (Math.abs(dev) * Math.abs(dev)).toString().padStart(2, '0');
      hint = `Base 50: (25 ${dev >= 0 ? '+' : '-'} ${Math.abs(dev)}) | (${Math.abs(dev)}²) = ${basePart}${devSq}`;
    } else {
      // 75 to 115 (Base 100 formula)
      n = this.randomInt(75, 115);
      const dev = n - 100;
      const basePart = n + dev;
      const devSq = (Math.abs(dev) * Math.abs(dev)).toString().padStart(2, '0');
      hint = `Base 100: (${n} ${dev >= 0 ? '+' : '-'} ${Math.abs(dev)}) | (${Math.abs(dev)}²) = ${basePart}${devSq}`;
    }

    const sq = n * n;
    return {
      type: 'input',
      category: 'Squares',
      difficulty: diff.toUpperCase(),
      expression: `${n}² = ?`,
      answer: sq.toString(),
      hint
    };
  }

  // 7. SQUARE ROOTS
  generateSquareRoots(diff) {
    let n;
    if (diff === 'clerk') {
      n = this.randomInt(12, 35);
    } else if (diff === 'po') {
      n = this.randomInt(36, 75);
    } else {
      n = this.randomInt(76, 99);
    }

    const sq = n * n;
    const lastDigit = sq % 10;
    let unitPossibilities = '';
    if (lastDigit === 1) unitPossibilities = '1 or 9';
    else if (lastDigit === 4) unitPossibilities = '2 or 8';
    else if (lastDigit === 9) unitPossibilities = '3 or 7';
    else if (lastDigit === 6) unitPossibilities = '4 or 6';
    else if (lastDigit === 5) unitPossibilities = '5';
    else if (lastDigit === 0) unitPossibilities = '0';

    return {
      type: 'input',
      category: 'Square Roots',
      difficulty: diff.toUpperCase(),
      expression: `√${sq} = ?`,
      answer: n.toString(),
      hint: `Since unit digit is ${lastDigit}, the answer's unit digit must be ${unitPossibilities}. Compare tens with nearest square!`
    };
  }

  // 8. CUBES
  generateCubes(diff) {
    let n;
    if (diff === 'clerk') {
      n = this.randomInt(5, 15);
    } else if (diff === 'po') {
      n = this.randomInt(11, 22);
    } else {
      n = this.randomInt(18, 30);
    }

    const cube = n * n * n;
    return {
      type: 'input',
      category: 'Cubes',
      difficulty: diff.toUpperCase(),
      expression: `${n}³ = ?`,
      answer: cube.toString(),
      hint: 'Bank exams consistently ask cubes from 1 to 25. Learn 11³=1331, 12³=1728, 13³=2197, 14³=2744, 15³=3375!'
    };
  }

  // 9. CUBE ROOTS
  generateCubeRoots(diff) {
    let n;
    if (diff === 'clerk') {
      n = this.randomInt(6, 19);
    } else if (diff === 'po') {
      n = this.randomInt(18, 35);
    } else {
      n = this.randomInt(30, 50);
    }

    const cube = n * n * n;
    const unitMap = { 0:0, 1:1, 2:8, 3:7, 4:4, 5:5, 6:6, 7:3, 8:2, 9:9 };
    const lastD = cube % 10;
    const targetUnit = unitMap[lastD];

    return {
      type: 'input',
      category: 'Cube Roots',
      difficulty: diff.toUpperCase(),
      expression: `∛${cube} = ?`,
      answer: n.toString(),
      hint: `Unit digit is ${lastD} -> answer unit digit MUST be ${targetUnit}! Strip last 3 digits and find nearest smaller cube.`
    };
  }

  // 10. FRACTION TO PERCENTAGE RECIPROCALS
  generateFractionPct(diff) {
    const list = window.FRACTION_PERCENTAGE_TABLE || [];
    const item = list[Math.floor(Math.random() * list.length)];
    const isFractionToPct = Math.random() < 0.65;

    if (isFractionToPct) {
      // Clean percentage value without % sign for easy numeric typing
      const rawPct = item.decimal.replace('%', '');
      return {
        type: 'input',
        category: 'Fraction to %',
        difficulty: diff.toUpperCase(),
        expression: `${item.fraction} = ? %`,
        answer: rawPct,
        altAnswers: [item.decimal, parseFloat(rawPct).toString()],
        hint: `Standard bank reciprocal: ${item.fraction} = ${item.decimal} (${item.note || ''})`
      };
    } else {
      return {
        type: 'input',
        category: 'Fraction to %',
        difficulty: diff.toUpperCase(),
        expression: `${item.decimal} = ? (fraction)`,
        answer: item.fraction,
        hint: `This percentage corresponds to the fraction ${item.fraction}.`
      };
    }
  }

  // 11. SIMPLIFICATION (Bank Prelims Exact Exam Style)
  generateSimplification(diff) {
    const templates = [
      () => {
        // ?% of A + B = C
        const pct = [10, 20, 25, 40, 50, 75][this.randomInt(0, 5)];
        const a = this.randomInt(2, 8) * 50;
        const b = this.randomInt(15, 60);
        const ans = pct;
        const c = (pct * a) / 100 + b;
        return {
          expr: `?% of ${a} + ${b} = ${c}`,
          ans: ans.toString(),
          hint: `${c} - ${b} = ${c - b}. Now ${c - b} is what % of ${a}?`
        };
      },
      () => {
        // sqrt(X) * A - ? = B
        const sqRoot = this.randomInt(12, 35);
        const x = sqRoot * sqRoot;
        const a = this.randomInt(4, 15);
        const prod = sqRoot * a;
        const ans = this.randomInt(10, prod - 15);
        const b = prod - ans;
        return {
          expr: `√${x} × ${a} - ? = ${b}`,
          ans: ans.toString(),
          hint: `√${x} = ${sqRoot}. ${sqRoot} × ${a} = ${prod}. ? = ${prod} - ${b}`
        };
      },
      () => {
        // A^2 - B^2 = ? * C
        const a = this.randomInt(15, 30);
        const b = this.randomInt(5, a - 2);
        const diffSq = a * a - b * b; // (a-b)*(a+b)
        const factors = [2, 3, 4, 5, 8, 10].filter(f => diffSq % f === 0);
        const c = factors.length > 0 ? factors[this.randomInt(0, factors.length - 1)] : 1;
        const ans = diffSq / c;
        return {
          expr: `(${a}² - ${b}²) ÷ ${c} = ?`,
          ans: ans.toString(),
          hint: `Use (a²-b²) = (a+b)(a-b) = (${a+b}) × (${a-b}) = ${(a+b)*(a-b)}. Divide by ${c}.`
        };
      },
      () => {
        // A * B + C * D = ?
        const a = this.randomInt(12, 25);
        const b = this.randomInt(4, 9);
        const c = this.randomInt(15, 30);
        const d = this.randomInt(3, 8);
        const ans = a * b + c * d;
        return {
          expr: `${a} × ${b} + ${c} × ${d} = ?`,
          ans: ans.toString(),
          hint: `Calculate ${a}×${b}=${a*b} and ${c}×${d}=${c*d}, then sum them.`
        };
      }
    ];

    const pick = templates[this.randomInt(0, templates.length - 1)]();
    return {
      type: 'input',
      category: 'Simplification',
      difficulty: diff.toUpperCase(),
      expression: pick.expr,
      answer: pick.ans,
      hint: pick.hint
    };
  }

  // 12. APPROXIMATION (With 5 Bank Exam MCQ Choices)
  generateApproximation(diff) {
    const templates = [
      () => {
        // e.g. 49.89% of 399.98 + (12.04)^2 - sqrt(624.8) = ?
        const pctInt = [20, 25, 40, 50, 75][this.randomInt(0, 4)];
        const pctDec = (pctInt - 0.15 + Math.random() * 0.3).toFixed(2);
        const baseInt = this.randomInt(4, 12) * 50;
        const baseDec = (baseInt - 0.2 + Math.random() * 0.4).toFixed(2);
        const sqInt = this.randomInt(9, 16);
        const sqDec = (sqInt + 0.05).toFixed(2);
        const rootInt = this.randomInt(15, 30);
        const rootDec = (rootInt * rootInt - 0.3 + Math.random() * 0.6).toFixed(1);

        const realVal = Math.round((pctInt * baseInt) / 100 + sqInt * sqInt - rootInt);
        const expr = `${pctDec}% of ${baseDec} + (${sqDec})² - √${rootDec} ≈ ?`;
        const hint = `Round to integers: ${pctInt}% of ${baseInt} (${(pctInt*baseInt)/100}) + ${sqInt}² (${sqInt*sqInt}) - ${rootInt} = ${realVal}`;
        return { expr, realVal, hint };
      },
      () => {
        // e.g. 749.9 ÷ 25.02 * 11.95 = ?
        const d = 25;
        const q = this.randomInt(12, 35);
        const divInt = d * q;
        const divDec = (divInt - 0.1 + Math.random() * 0.2).toFixed(1);
        const multInt = this.randomInt(8, 15);
        const multDec = (multInt - 0.08 + Math.random() * 0.15).toFixed(2);

        const realVal = Math.round(q * multInt);
        const expr = `${divDec} ÷ 24.98 × ${multDec} ≈ ?`;
        const hint = `Round: (${divInt} ÷ 25 = ${q}) × ${multInt} = ${realVal}`;
        return { expr, realVal, hint };
      }
    ];

    const item = templates[this.randomInt(0, templates.length - 1)]();
    // Generate 5 plausible options for bank exam
    const correct = item.realVal;
    const offsets = [-15, -6, 0, 7, 18].sort(() => Math.random() - 0.5);
    const options = offsets.map(off => (correct + off).toString());
    // Ensure uniqueness
    const uniqueOptions = Array.from(new Set(options));
    while (uniqueOptions.length < 5) {
      uniqueOptions.push((correct + uniqueOptions.length * 5).toString());
    }
    uniqueOptions.sort((a, b) => parseInt(a) - parseInt(b));

    return {
      type: 'mcq',
      category: 'Approximation',
      difficulty: diff.toUpperCase(),
      expression: item.expr,
      answer: correct.toString(),
      options: uniqueOptions,
      hint: item.hint
    };
  }

  // 13. NUMBER SERIES (Missing Number)
  generateNumberSeries(diff) {
    const patterns = [
      () => {
        // Difference is +k*i (e.g. +7, +14, +21...)
        const step = this.randomInt(4, 9);
        const start = this.randomInt(12, 45);
        let seq = [start];
        for (let i = 1; i <= 5; i++) {
          seq.push(seq[seq.length - 1] + step * i);
        }
        const missing = seq[seq.length - 1];
        const display = seq.slice(0, -1).join(', ') + ', ?';
        return {
          expr: display,
          ans: missing.toString(),
          hint: `Pattern: Differences are multiples of ${step}: +${step}, +${step*2}, +${step*3}, +${step*4}, +${step*5}`
        };
      },
      () => {
        // Multiplication + constant: x2 + 1, x2 + 2, etc.
        const mult = 2;
        let curr = this.randomInt(3, 8);
        let seq = [curr];
        for (let i = 1; i <= 5; i++) {
          curr = curr * mult + i;
          seq.push(curr);
        }
        const missing = seq[seq.length - 1];
        const display = seq.slice(0, -1).join(', ') + ', ?';
        return {
          expr: display,
          ans: missing.toString(),
          hint: `Pattern: ×2 + 1, ×2 + 2, ×2 + 3, ×2 + 4, ×2 + 5`
        };
      },
      () => {
        // Difference is squares: +1, +4, +9, +16, +25
        let curr = this.randomInt(15, 50);
        let seq = [curr];
        for (let i = 1; i <= 5; i++) {
          curr += i * i;
          seq.push(curr);
        }
        const missing = seq[seq.length - 1];
        const display = seq.slice(0, -1).join(', ') + ', ?';
        return {
          expr: display,
          ans: missing.toString(),
          hint: `Pattern: Differences are squares: +1², +2², +3², +4², +5² (+25)`
        };
      }
    ];

    const pick = patterns[this.randomInt(0, patterns.length - 1)]();
    return {
      type: 'input',
      category: 'Number Series',
      difficulty: diff.toUpperCase(),
      expression: pick.expr,
      answer: pick.ans,
      hint: pick.hint
    };
  }
}

// Global engine instance
window.mathEngine = new MathEngine();
