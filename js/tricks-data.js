/**
 * SpeedBanker Vedic Math Tricks & Knowledge Base
 * 20 High-yield calculation shortcuts specifically asked in SBI, IBPS, RBI, RRB exams.
 */

const VEDIC_TRICKS = [
  // --- 1. MULTIPLICATION SHORTCUTS ---
  {
    id: "base_100_mult",
    title: "1. Base 100 Multiplication (Numbers Near 100)",
    category: "Multiplication",
    badge: "High Frequency in SBI PO",
    description: "Multiply numbers like 96 × 94 or 104 × 107 mentally in under 3 seconds using the deviation from 100 method.",
    example: {
      problem: "96 × 94 = ?",
      steps: [
        "1. Find deviations from 100: 96 is (-4), 94 is (-6).",
        "2. Cross-subtract: 96 - 6 = 90 (or 94 - 4 = 90). Write: 90",
        "3. Multiply deviations: (-4) × (-6) = +24.",
        "4. Combine both parts: 9024!"
      ],
      result: "9024"
    }
  },
  {
    id: "criss_cross_2x2",
    title: "2. Vedic Criss-Cross 2×2 (Urdhva Tiryagbhyam)",
    category: "Multiplication",
    badge: "Universal 2-Digit Rule",
    description: "Calculate any 2-digit by 2-digit multiplication in a single straight line from right to left without scratchwork.",
    example: {
      problem: "43 × 21 = ?",
      steps: [
        "Step 1 (Vertical Right): 3 × 1 = 3 (Unit digit is 3)",
        "Step 2 (Cross-Multiply & Add): (4×1) + (3×2) = 4 + 6 = 10 (Write 0, carry 1)",
        "Step 3 (Vertical Left + Carry): (4×2) + 1 = 8 + 1 = 9",
        "Combine: 903!"
      ],
      result: "903"
    }
  },
  {
    id: "criss_cross_3x3",
    title: "3. Vedic Criss-Cross 3×3 Multiplication",
    category: "Multiplication",
    badge: "PO Mains & DI Essential",
    description: "5-step vertical & crosswise method to multiply any two 3-digit numbers directly in a single horizontal line.",
    example: {
      problem: "213 × 124 = ?",
      steps: [
        "Step 1: Vertical right: 3 × 4 = 12 (Write 2, carry 1)",
        "Step 2: Cross right 2 columns: (1×4) + (3×2) + 1 = 4 + 6 + 1 = 11 (Write 1, carry 1)",
        "Step 3: Star across all 3: (2×4) + (3×1) + (1×2) + 1 = 8 + 3 + 2 + 1 = 14 (Write 4, carry 1)",
        "Step 4: Cross left 2 columns: (2×2) + (1×1) + 1 = 4 + 1 + 1 = 6 (Write 6)",
        "Step 5: Vertical left: 2 × 1 = 2 (Write 2)",
        "Result: 26412!"
      ],
      result: "26412"
    }
  },
  {
    id: "multiply_by_9s",
    title: "4. Multiply by 9, 99, 999, 9999 (Ekanyunena Purvena)",
    category: "Multiplication",
    badge: "1-Second Calculation",
    description: "Whenever multiplying by a series of 9s, subtract 1 from the number, then append its 9's complement!",
    example: {
      problem: "647 × 999 = ?",
      steps: [
        "1. Subtract 1 from 647: 647 - 1 = 646 (First part)",
        "2. Subtract 646 from 999 (9's complement): 9-6=3, 9-4=5, 9-6=3 -> 353",
        "3. Combine: 646353!",
        "Try 58 × 99: (58-1=57) | (99-57=42) = 5742!"
      ],
      result: "646353"
    }
  },
  {
    id: "multiply_by_11",
    title: "5. Multiplication by 11 (Neighbor Addition Rule)",
    category: "Multiplication",
    badge: "Speed Booster",
    description: "To multiply any number by 11, write unit digit, then add adjacent pairs and write the leading digit.",
    example: {
      problem: "534 × 11 = ?",
      steps: [
        "Write last digit: 4",
        "Add adjacent: 3 + 4 = 7",
        "Add adjacent: 5 + 3 = 8",
        "Write first digit: 5",
        "Result: 5874!"
      ],
      result: "5874"
    }
  },
  {
    id: "multiply_by_12_to_19",
    title: "6. Multiplication by 12, 13, 14 ... 19",
    category: "Multiplication",
    badge: "Direct Line Rule",
    description: "Never write out tables! Double (or triple) each digit and add its right-hand neighbor.",
    example: {
      problem: "432 × 12 = ?",
      steps: [
        "Multiply by 12 means: (Digit × 2) + Right Neighbor:",
        "1. Last digit: 2 × 2 = 4",
        "2. Tens: (3 × 2) + 2 = 8",
        "3. Hundreds: (4 × 2) + 3 = 11 (Write 1, carry 1)",
        "4. Thousands: (0 × 2) + 4 + 1 = 5",
        "Result: 5184!"
      ],
      result: "5184"
    }
  },
  {
    id: "multiply_by_25_50",
    title: "7. Multiplying by 25, 50, 125 (Power of 10 Split)",
    category: "Multiplication",
    badge: "Simplification Hack",
    description: "Replace hard multiplication with simple division: ×50 = (÷2)×100, ×25 = (÷4)×100, ×125 = (÷8)×1000.",
    example: {
      problem: "64 × 25 = ?",
      steps: [
        "1. Replace ×25 with (÷4) × 100",
        "2. 64 ÷ 4 = 16",
        "3. Append two zeros: 1600!",
        "Try 72 × 125: 72 ÷ 8 = 9, so 9000!"
      ],
      result: "1600"
    }
  },
  {
    id: "consecutive_mult",
    title: "8. Consecutive Numbers Product (N × (N+1) & N × (N+2))",
    category: "Multiplication",
    badge: "Clerk & PO Favorite",
    description: "Multiply consecutive numbers using squares: N × (N+1) = N² + N, and N × (N+2) = (N+1)² - 1.",
    example: {
      problem: "35 × 36 = ?",
      steps: [
        "1. Notice they are consecutive: 35 × (35 + 1) = 35² + 35",
        "2. Recall 35² = 1225",
        "3. Add 35: 1225 + 35 = 1260!",
        "For 24 × 26: (25² - 1) = 625 - 1 = 624!"
      ],
      result: "1260"
    }
  },
  {
    id: "antyayor_dashakepi",
    title: "9. Antyayor Dashakepi (Units Sum 10, Tens Same)",
    category: "Multiplication",
    badge: "2-Second Rule",
    description: "When tens digits are identical and units sum to 10: [Tens × (Tens+1)] | [Units × Units].",
    example: {
      problem: "74 × 76 = ?",
      steps: [
        "1. Verify: Tens are both 7, units sum: 4 + 6 = 10.",
        "2. First part: 7 × (7 + 1) = 7 × 8 = 56",
        "3. Second part: 4 × 6 = 24",
        "Combine: 5624!",
        "Works for 114 × 116: (11×12) | (4×6) = 13224!"
      ],
      result: "5624"
    }
  },
  {
    id: "sub_base_50_200",
    title: "10. Sub-Base 50 and 200 Multiplication (Anurupyena)",
    category: "Multiplication",
    badge: "Advanced Base Method",
    description: "Multiply numbers near 50 by taking base 100/2, or numbers near 200 by taking base 100×2.",
    example: {
      problem: "48 × 54 = ?",
      steps: [
        "1. Deviations from 50: 48 is (-2), 54 is (+4).",
        "2. Cross-add: 48 + 4 = 52.",
        "3. Since base is 50 (100 ÷ 2), divide by 2: 52 ÷ 2 = 26 -> 2600",
        "4. Multiply deviations: (-2) × (+4) = -8.",
        "5. 2600 - 8 = 2592!"
      ],
      result: "2592"
    }
  },

  // --- 2. SQUARES & POWERS ---
  {
    id: "square_ending_5",
    title: "11. Square of Numbers Ending in 5 (Ekadhikena Purvena)",
    category: "Squares",
    badge: "1-Second Formula",
    description: "Instant formula for any number ending in 5: (N5)² = [N × (N+1)] | 25.",
    example: {
      problem: "65² = ?",
      steps: [
        "1. Identify tens digit: 6",
        "2. Multiply by its successor: 6 × 7 = 42",
        "3. Append 25 at the end: 4225!",
        "Works for 35² (3×4=12 -> 1225), 85² (8×9=72 -> 7225), 115² (11×12=132 -> 13225)."
      ],
      result: "4225"
    }
  },
  {
    id: "square_base_50",
    title: "12. Squares of Numbers Near 50 (30 to 70)",
    category: "Squares",
    badge: "Bank Exam Essential",
    description: "Any number (50 ± x)² = (25 ± x) | x² (as 2 digits).",
    example: {
      problem: "46² = ?",
      steps: [
        "1. Deviation from 50: 46 is (50 - 4), so x = 4.",
        "2. Subtract from 25: 25 - 4 = 21 (First two digits)",
        "3. Square the deviation: 4² = 16 (Last two digits)",
        "Combine: 2116!"
      ],
      result: "2116"
    }
  },
  {
    id: "square_base_100",
    title: "13. Squares of Numbers Near 100 (75 to 125)",
    category: "Squares",
    badge: "Mental Power",
    description: "Any number (100 ± x)² = (Number ± x) | x² (as 2 digits).",
    example: {
      problem: "97² = ?",
      steps: [
        "1. Deviation from 100: 97 is (-3), so x = 3.",
        "2. Subtract deviation from the number itself: 97 - 3 = 94",
        "3. Square the deviation: 3² = 09 (always 2 digits)",
        "Combine: 9409!"
      ],
      result: "9409"
    }
  },
  {
    id: "universal_2digit_sq",
    title: "14. Universal 2-Digit Square Formula (a|b)²",
    category: "Squares",
    badge: "Any Number 1-99",
    description: "Square any two-digit number mentally: (ab)² = a² | 2ab | b² with carry.",
    example: {
      problem: "73² = ?",
      steps: [
        "Let a = 7, b = 3:",
        "1. b² = 3² = 9",
        "2. 2ab = 2 × 7 × 3 = 42 (Write 2, carry 4)",
        "3. a² + carry = 7² + 4 = 49 + 4 = 53",
        "Combine: 5329!"
      ],
      result: "5329"
    }
  },

  // --- 3. ROOTS & APPROXIMATIONS ---
  {
    id: "approx_sqrt_formula",
    title: "15. Square Root of Non-Perfect Squares (Approximation Formula)",
    category: "Approximation",
    badge: "Crucial for PO Prelims",
    description: "Formula for instant square roots of non-perfect numbers: √(X ± Y) ≈ √X ± Y / (2√X).",
    example: {
      problem: "√67 ≈ ?",
      steps: [
        "1. Find nearest perfect square: 64, so 67 = 64 + 3 (X=64, Y=3).",
        "2. √64 = 8.",
        "3. Add Y / (2√X): 8 + 3 / (2 × 8) = 8 + 3/16",
        "4. Since 3/16 = 0.1875, √67 ≈ 8.19!",
        "Try √85: √81 + 4/(2×9) = 9 + 4/18 = 9.22!"
      ],
      result: "8.19"
    }
  },
  {
    id: "cube_root_unit_trick",
    title: "16. Instant Cube Root (Vilokanam Unit Digit Method)",
    category: "Cube Roots",
    badge: "Solved in 2 Seconds",
    description: "Since every single-digit cube ends in a unique unit digit (1->1, 2->8, 3->7, 4->4, 5->5, 6->6, 7->3, 8->2, 9->9, 0->0), you can extract cube roots instantly!",
    example: {
      problem: "∛(50653) = ?",
      steps: [
        "1. Split the last 3 digits: 50 | 653",
        "2. Look at the last digit '3'. Only 7³ ends in 3, so unit digit is 7.",
        "3. Now look at '50'. Find the largest cube ≤ 50: 3³ = 27 ≤ 50 < 4³ (64). Tens digit is 3.",
        "Result: 37!"
      ],
      result: "37"
    }
  },

  // --- 4. PERCENTAGES & DIVISION ---
  {
    id: "pct_split_method",
    title: "17. Percentage Splitting Method (10%, 1%, 5%, 50% Blocks)",
    category: "Percentages",
    badge: "#1 Used in Bank DI",
    description: "Never calculate complex percentages with formulas! Break down any percentage into friendly 50%, 25%, 10%, 5%, 1% blocks.",
    example: {
      problem: "63% of 420 = ?",
      steps: [
        "Break 63% into: 50% + 10% + 3% (3 × 1%):",
        "1. 50% of 420 = 210",
        "2. 10% of 420 = 42",
        "3. 1% of 420 = 4.2 -> 3% = 12.6",
        "Sum: 210 + 42 + 12.6 = 264.6!"
      ],
      result: "264.6"
    }
  },
  {
    id: "interchange_pct",
    title: "18. Percentage Interchange Rule (x% of y = y% of x)",
    category: "Percentages",
    badge: "Simplification Game Changer",
    description: "Whenever an awkward percentage is given like 64% of 25, flip it to 25% of 64!",
    example: {
      problem: "64% of 25 = ?",
      steps: [
        "1. Flip the percentage: 25% of 64",
        "2. 25% is simply 1/4",
        "3. 64 ÷ 4 = 16!",
        "Another example: 84% of 50 = 50% of 84 = 42!"
      ],
      result: "16"
    }
  },
  {
    id: "digital_root_check",
    title: "19. Digital Root (Digit Sum Method / Navasesh)",
    category: "Simplification",
    badge: "Option Elimination Secret",
    description: "Verify long calculation equations in 3 seconds by taking sum of digits mod 9 to pick the right option among 5 choices without full calculation!",
    example: {
      problem: "432 × 18 = 7776 (Check validity)",
      steps: [
        "1. Digit sum of 432: 4 + 3 + 2 = 9 (or 0)",
        "2. Digit sum of 18: 1 + 8 = 9 (or 0)",
        "3. Left hand side: 0 × 0 = 0",
        "4. Digit sum of 7776: 7+7+7+6 = 27 -> 2+7 = 9 (or 0)",
        "Both match! In bank exams, eliminate options whose digit sum doesn't match."
      ],
      result: "Matched"
    }
  },
  {
    id: "nikhilam_division",
    title: "20. Nikhilam Division (Rapid Division by 9, 8, 98)",
    category: "Division",
    badge: "Quotient in Seconds",
    description: "Divide numbers by 9 or 98 without writing long division using the Vedic complement addition method.",
    example: {
      problem: "231 ÷ 9 = ?",
      steps: [
        "1. Bring down first digit: 2 (First digit of Quotient)",
        "2. Add to next digit: 2 + 3 = 5 (Second digit of Quotient)",
        "3. Quotient is 25.",
        "4. Add to last digit: 5 + 1 = 6 (Remainder)",
        "Result: Quotient = 25, Remainder = 6 (25 6/9 = 25.66)!"
      ],
      result: "25 R 6"
    }
  },
  {
    id: "base_1000_mult",
    title: "21. Base 1000 Multiplication (Deviation Method)",
    category: "Multiplication",
    badge: "PO Mains & RRB High Yield",
    description: "Multiply numbers like 996 × 992 or 1008 × 1015 instantly using deviations from 1000 with 3-digit product balancing.",
    example: {
      problem: "996 × 992 = ?",
      steps: [
        "1. Deviations from 1000: 996 is (-004), 992 is (-008).",
        "2. Cross-subtract: 996 - 8 = 988 (or 992 - 4 = 988). Write left part: 988",
        "3. Multiply deviations: (-4) × (-8) = +32. Since base 1000 has 3 zeros, write as 3 digits: 032.",
        "4. Combine: 988032!",
        "Try 1006 × 1007: (1006 + 7 = 1013) | (6 × 7 = 042) = 1013042!"
      ],
      result: "988032"
    }
  },
  {
    id: "midpoint_diff_squares",
    title: "22. Midpoint Average Difference Rule ((A - d)(A + d) = A² - d²)",
    category: "Multiplication",
    badge: "Elite Mental Hack",
    description: "Whenever multiplying two numbers equidistant from a round number, use difference of squares instead of multiplying.",
    example: {
      problem: "67 × 73 = ?",
      steps: [
        "1. Identify midpoint: Average of 67 and 73 is 70.",
        "2. Distance d from 70 is 3: (70 - 3) × (70 + 3).",
        "3. Apply A² - d²: 70² - 3² = 4900 - 9 = 4891!",
        "Try 84 × 96: Midpoint is 90, d = 6. 90² - 6² = 8100 - 36 = 8064!"
      ],
      result: "4891"
    }
  },
  {
    id: "yavadunam_cubing",
    title: "23. Yavadunam Cubing for Numbers Near 100",
    category: "Cubes",
    badge: "Instant 3-Step Cube",
    description: "Calculate cubes of numbers near 100 (e.g. 102³, 103³, 104³) using the Vedic expansion: (100 + d)³ = (100 + 3d) | 3d² | d³.",
    example: {
      problem: "104³ = ?",
      steps: [
        "Base = 100, deviation d = +4:",
        "1. Left part: 100 + 3×d = 100 + 12 = 112",
        "2. Middle part: 3 × d² = 3 × 16 = 48 (2 digits)",
        "3. Right part: d³ = 4³ = 64 (2 digits)",
        "Combine: 1124864!",
        "Try 103³: (100 + 9 = 109) | (3 × 9 = 27) | (3³ = 27) = 1092727!"
      ],
      result: "1124864"
    }
  },
  {
    id: "successive_pct_formula",
    title: "24. Successive Percentage Net Change (A + B + AB/100)",
    category: "Percentages",
    badge: "Compound Interest & DI Lifesaver",
    description: "Calculate two successive percentage increases or discounts into a single combined percentage in 2 seconds.",
    example: {
      problem: "Successive increase of 20% and 15% = ?",
      steps: [
        "1. Formula: Net Change = A + B + (A × B) / 100",
        "2. A + B = 20 + 15 = 35%",
        "3. (A × B) / 100 = (20 × 15) / 100 = 300 / 100 = 3%",
        "4. Total Net Increase: 35% + 3% = 38%!",
        "For discounts 20% and 10%: (-20) + (-10) + ((-20)(-10))/100 = -30 + 2 = -28% (28% flat discount)!"
      ],
      result: "38%"
    }
  },
  {
    id: "fraction_multiplier_division",
    title: "25. Reciprocal Fraction Multipliers for Division",
    category: "Division",
    badge: "Bypasses Heavy Division",
    description: "Never do heavy long division by decimals or percentages! Multiply by their exact fraction reciprocals.",
    example: {
      problem: "Divide 432 by 0.375 = ?",
      steps: [
        "1. Recognize 0.375 is 37.5%, which is exactly 3/8.",
        "2. Division by 3/8 equals multiplication by 8/3: 432 × (8/3)",
        "3. Simplify first: 432 ÷ 3 = 144",
        "4. Multiply by 8: 144 × 8 = 1152!",
        "Try 625 ÷ 0.625: 0.625 = 5/8 -> 625 × (8/5) = 125 × 8 = 1000!"
      ],
      result: "1152"
    }
  }
];

// High-frequency Fraction to Percentage Reciprocals for Bank Exams
const FRACTION_PERCENTAGE_TABLE = [
  { fraction: "1/2", decimal: "50%", note: "Half" },
  { fraction: "1/3", decimal: "33.33%", note: "33 1/3%" },
  { fraction: "2/3", decimal: "66.66%", note: "66 2/3%" },
  { fraction: "1/4", decimal: "25%", note: "Quarter" },
  { fraction: "3/4", decimal: "75%", note: "Three quarters" },
  { fraction: "1/5", decimal: "20%", note: "One fifth" },
  { fraction: "2/5", decimal: "40%", note: "Two fifths" },
  { fraction: "3/5", decimal: "60%", note: "Three fifths" },
  { fraction: "4/5", decimal: "80%", note: "Four fifths" },
  { fraction: "1/6", decimal: "16.66%", note: "16 2/3%" },
  { fraction: "5/6", decimal: "83.33%", note: "83 1/3% (Frequent in SBI)" },
  { fraction: "1/7", decimal: "14.28%", note: "14 2/7%" },
  { fraction: "2/7", decimal: "28.57%", note: "28 4/7%" },
  { fraction: "3/7", decimal: "42.85%", note: "42 6/7%" },
  { fraction: "4/7", decimal: "57.14%", note: "57 1/7%" },
  { fraction: "1/8", decimal: "12.5%", note: "12 1/2%" },
  { fraction: "3/8", decimal: "37.5%", note: "37 1/2% (Crucial for DI)" },
  { fraction: "5/8", decimal: "62.5%", note: "62 1/2%" },
  { fraction: "7/8", decimal: "87.5%", note: "87 1/2%" },
  { fraction: "1/9", decimal: "11.11%", note: "11 1/9%" },
  { fraction: "2/9", decimal: "22.22%", note: "22 2/9%" },
  { fraction: "4/9", decimal: "44.44%", note: "44 4/9%" },
  { fraction: "1/10", decimal: "10%", note: "One tenth" },
  { fraction: "1/11", decimal: "9.09%", note: "9 1/11%" },
  { fraction: "2/11", decimal: "18.18%", note: "18 2/11%" },
  { fraction: "3/11", decimal: "27.27%", note: "27 3/11%" },
  { fraction: "1/12", decimal: "8.33%", note: "8 1/3%" },
  { fraction: "5/12", decimal: "41.66%", note: "41 2/3%" },
  { fraction: "7/12", decimal: "58.33%", note: "58 1/3%" },
  { fraction: "11/12", decimal: "91.66%", note: "91 2/3%" },
  { fraction: "1/13", decimal: "7.69%", note: "7 9/13%" },
  { fraction: "1/14", decimal: "7.14%", note: "7 1/7%" },
  { fraction: "1/15", decimal: "6.66%", note: "6 2/3%" },
  { fraction: "1/16", decimal: "6.25%", note: "6 1/4% (Very High Frequency)" },
  { fraction: "3/16", decimal: "18.75%", note: "18 3/4%" },
  { fraction: "1/20", decimal: "5%", note: "One twentieth" },
  { fraction: "1/24", decimal: "4.16%", note: "4 1/6%" },
  { fraction: "1/25", decimal: "4%", note: "4%" }
];

window.VEDIC_TRICKS = VEDIC_TRICKS;
window.FRACTION_PERCENTAGE_TABLE = FRACTION_PERCENTAGE_TABLE;
