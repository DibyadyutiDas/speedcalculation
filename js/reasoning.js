/**
 * SpeedBanker Reasoning Speed Engine
 * Authentic bank exam speed reasoning drills & cheat codes for SBI PO, IBPS PO/Clerk, RRB, and RBI.
 * Covers: Inequalities, Syllogisms, Alpha-Numeric Series, Alphabet Positions (EJOTY), Blood Relations, Direction Sense & Coding.
 */

const REASONING_RULES = [
  {
    id: "inequality_king_rule",
    title: "1. The King-Queen-Soldier Law (Inequalities in 2s)",
    badge: "5 Qs in 60s in SBI PO",
    category: "Inequalities",
    summary: "Solve any statement chain without pen or paper using symbol precedence hierarchy.",
    rules: [
      "Priority 1: KING (> or <). If present between two elements in an open path, King ALWAYS wins.",
      "Priority 2: QUEEN (>= or <=). Can only follow if EVERY symbol in the path is Queen or Soldier.",
      "Priority 3: SOLDIER (=). Passive connector; carries whatever sign is ahead.",
      "BLOCKED PATH (Opposite signs > < or < >): If signs face opposite directions between elements, conclusion is DEFINITELY FALSE (No relationship)."
    ],
    example: {
      statement: "A > B >= C = D < E",
      conclusions: [
        "I. A > D (Path A->D has '>', '>=', '=': King '>' is present, path open -> TRUE)",
        "II. A < E (Path A->E has '>' and '<': Blocked path -> FALSE)"
      ]
    }
  },
  {
    id: "syllogism_only_few",
    title: "2. 'Only a Few' & Possibility Theorems",
    badge: "Must-Know for 2026",
    category: "Syllogisms",
    summary: "Master the most asked pattern in bank prelims & mains with 100% precision.",
    rules: [
      "'Only a few A are B' means BOTH: 1. Some A are B (True), AND 2. Some A are NOT B (True).",
      "'All A can never be B' is identical to saying 'Some A are NOT B' definitely.",
      "'Some A can be B' means check if A and B have NO direct negative relation. If independent, possibility is TRUE.",
      "EITHER-OR Golden Trinity: 1. Both conclusions must be individually false, 2. Subject & Predicate must be same, 3. One conclusion positive, one negative (Some + No or All + Some Not)."
    ],
    example: {
      statement: "Only a few Banks are FinTechs. All FinTechs are Tech.",
      conclusions: [
        "I. All Banks being FinTech is a possibility (FALSE - 'Only a few' forbids All Banks from being FinTech)",
        "II. All FinTechs being Bank is a possibility (TRUE - FinTech can completely enter Bank)"
      ]
    }
  },
  {
    id: "alphabet_matrix",
    title: "3. EJOTY & 13 Opposite Letter Pairs",
    badge: "Coding & Series Hack",
    category: "Alphabet Series",
    summary: "Instant letter position recall forward (1-26) and backward (27-n) plus opposite letter pairs.",
    rules: [
      "EJOTY Anchor: E=5, J=10, O=15, T=20, Y=25. Use neighbors: G=7 (E+2), M=13 (O-2), S=19 (T-1).",
      "Opposite Letter Sum = 27 (e.g. A(1) + Z(26) = 27, D(4) + W(23) = 27).",
      "Mnemonics: A-Z (AZad), B-Y (BoY), C-X (CruX), D-W (Dew), E-V (EVening), F-U (FUll), G-T (GT Road), H-S (High School), I-R (Indian Railway), J-Q (Jungle Queen), K-P (Kurta Pajama), L-O (LOve), M-N (MaN)."
    ],
    example: {
      statement: "Find code for BOMBAY if each letter is replaced by its opposite pair:",
      conclusions: [
        "B->Y, O->L, M->N, B->Y, A->Z, Y->B => YLNYZB!"
      ]
    }
  },
  {
    id: "direction_cardinal",
    title: "4. Cardinal Facing & Shortest Distance",
    badge: "Direction & Distance",
    category: "Direction Sense",
    summary: "Pythagorean triples and shadow direction rules for rapid deduction.",
    rules: [
      "Shortest Distance Displacement = sqrt(dx^2 + dy^2). Remember triples: (3, 4, 5), (5, 12, 13), (6, 8, 10), (8, 15, 17), (7, 24, 25).",
      "Shadow Rules: At Sunrise (Sun in East), Shadow falls to WEST. At Sunset (Sun in West), Shadow falls to EAST.",
      "Facing North: Right is East, Left is West. Facing South: Right is West, Left is East."
    ],
    example: {
      statement: "A car travels 9 km East, turns right and drives 12 km South.",
      conclusions: [
        "Displacement from start = sqrt(9^2 + 12^2) = sqrt(81 + 144) = sqrt(225) = 15 km South-East!"
      ]
    }
  },
  {
    id: "blood_relations_symbols",
    title: "5. Standard Family Tree Generation Grid",
    badge: "Blood Relations",
    category: "Blood Relations",
    summary: "Draw family links in 10 seconds without confusing genders or relations.",
    rules: [
      "Male = [+] or Square | Female = [-] or Circle.",
      "Married Couple = Double horizontal line [A = B].",
      "Siblings / Brother / Sister = Single horizontal line [A - B].",
      "Generational shift = Vertical line [Parent | Child].",
      "Maternal relations = Mother's side (Maternal Uncle/Aunt). Paternal = Father's side."
    ],
    example: {
      statement: "P is father of Q. Q is sister of R. R is married to S.",
      conclusions: [
        "P[+] is father of Q[-] and R. S is spouse of R. P is father-in-law of S!"
      ]
    }
  },
  {
    id: "puzzle_phrasing_rules",
    title: "6. Puzzle & Seating Clue Phrasing ('N Places Away', 'N Between', 'Immediately')",
    badge: "15-20 Marks in Prelims",
    category: "Puzzle Foundations",
    summary: "Eliminate common interpretation traps in floor, box, and linear seating arrangements.",
    rules: [
      "'B is N places before/after A' (or 'N places away'): Means pos(A) - pos(B) = N. Exactly (N - 1) persons/boxes sit between them! (e.g. 'B is 2 places before A' => B [ ] A, exactly 1 person between them).",
      "'N people sit between B and A': Means difference in position is (N + 1)! (e.g. '2 people sit between B and A' => B [ ] [ ] A, gap = 2, position difference = 3).",
      "'B sits immediately before A' (Adjacent, 0 gap) vs 'B sits before A' (Anywhere before A, 0, 1, 2 or more elements in between).",
      "'At most N' means <= N (0, 1, ... up to N). 'At least N' means >= N.",
      "Circular Table: Facing Center => Right is Anti-Clockwise, Left is Clockwise. Facing Outside => Right is Clockwise, Left is Anti-Clockwise."
    ],
    example: {
      statement: "Box B is kept 2 boxes above Box A. Exactly 2 boxes are kept between Box A and Box C.",
      conclusions: [
        "1. 'B is 2 boxes above A' => B is at pos(A) + 2 with exactly 1 box between them (Layout: B [ ] A).",
        "2. '2 boxes between A and C' => |pos(A) - pos(C)| = 3 (Layout: A [ ] [ ] C or C [ ] [ ] A)."
      ]
    }
  }
];

class ReasoningEngine {
  constructor() {
    this.currentQuestion = null;
    this.questionStartTime = 0;
    this.sessionActive = false;
    this.stats = {
      solved: 0,
      correct: 0,
      streak: 0,
      maxStreak: 0,
      totalTimeSec: 0
    };
  }

  // Generate Bank Reasoning Questions
  generateQuestion(category = 'puzzle_basics') {
    if (category === 'puzzle_basics') return this.generatePuzzleBasics();
    if (category === 'inequalities') return this.generateInequality();
    if (category === 'syllogisms') return this.generateSyllogism();
    if (category === 'alphabet') return this.generateAlphabet();
    if (category === 'direction') return this.generateDirection();
    if (category === 'blood_relations') return this.generateBloodRelation();
    return this.generatePuzzleBasics();
  }

  // 1. Inequalities Generator (Authentic Bank Pattern)
  generateInequality() {
    const banks = [
      {
        statement: "P > Q >= R = S < T <= U",
        conc1: "P > S",
        conc2: "U >= S",
        ansIndex: 0, // A: Only I
        explanation: "Between P and S: P > Q >= R = S. Signs are '>', '>=', '='. Since King '>' is present and path is open, P > S definitely holds (I is TRUE). Between U and S: S < T <= U, which means U > S (not U >= S, because King '<' is present between S and U). Hence II is FALSE."
      },
      {
        statement: "M <= N < O = P <= Q < R",
        conc1: "R > N",
        conc2: "M < P",
        ansIndex: 4, // E: Both follow
        explanation: "Between R and N: N < O = P <= Q < R. All signs point right and King '<' is present, so N < R holds, meaning R > N is TRUE (I follows). Between M and P: M <= N < O = P, King '<' is present, meaning M < P is TRUE (II follows). Both follow!"
      },
      {
        statement: "K >= L = M >= N >= O = P",
        conc1: "K >= P",
        conc2: "L >= O",
        ansIndex: 4, // E: Both
        explanation: "Between K and P: K >= L = M >= N >= O = P. All signs are '>=' and '=', Queen '>=' wins, so K >= P is TRUE. Between L and O: L = M >= N >= O. All signs are '>=' and '=', so L >= O is TRUE. Both follow!"
      },
      {
        statement: "A > B >= C = D; D < E <= F",
        conc1: "A > D",
        conc2: "B < E",
        ansIndex: 0, // Only I follows
        explanation: "Path A->D: A > B >= C = D. King '>' is present without opposite signs -> A > D is TRUE. Path B->E: B >= C = D < E. Signs between B and E are '>=' and '<' (Opposite signs) -> Blocked path! B < E cannot be determined (FALSE)."
      },
      {
        statement: "W >= X > Y = Z; Z >= T < U",
        conc1: "W > Z",
        conc2: "Y < U",
        ansIndex: 0, // Only I
        explanation: "Path W->Z: W >= X > Y = Z. King '>' is present -> W > Z is TRUE. Path Y->U: Y = Z >= T < U. Signs '>=' and '<' face opposite directions -> Blocked path. Hence Y < U is FALSE."
      },
      {
        statement: "G <= H < I = J <= K < L",
        conc1: "L > H",
        conc2: "G < J",
        ansIndex: 4, // Both follow
        explanation: "Path H->L: H < I = J <= K < L. All signs '<' and '<='. King '<' is present -> H < L, meaning L > H is TRUE. Path G->J: G <= H < I = J. King '<' is present -> G < J is TRUE. Both I and II follow!"
      },
      {
        statement: "D >= E > F = G <= H < I",
        conc1: "D > G",
        conc2: "E <= I",
        ansIndex: 0, // Only I
        explanation: "Path D->G: D >= E > F = G. All open, King '>' present -> D > G is TRUE. Path E->I: E > F = G <= H. Signs '>' and '<=' face opposite directions -> Blocked path. Hence E <= I is FALSE."
      },
      {
        statement: "R > S >= T = U; U > V >= W",
        conc1: "R > V",
        conc2: "T > W",
        ansIndex: 4, // Both follow
        explanation: "Path R->V: R > S >= T = U > V. All signs forward, King '>' present -> R > V is TRUE. Path T->W: T = U > V >= W. King '>' present -> T > W is TRUE. Both follow!"
      }
    ];

    const item = banks[Math.floor(Math.random() * banks.length)];
    const options = [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Either Conclusion I or II follows",
      "Neither Conclusion I nor II follows",
      "Both Conclusions I and II follow"
    ];

    return {
      type: "inequalities",
      title: "Bank Exam Inequality Drill",
      statement: item.statement,
      conclusions: [
        `Conclusion I: ${item.conc1}`,
        `Conclusion II: ${item.conc2}`
      ],
      options: options,
      correctIndex: item.ansIndex,
      correctAnswer: options[item.ansIndex],
      explanation: item.explanation
    };
  }

  // 2. Syllogisms Generator ("Only a Few" & Possibility)
  generateSyllogism() {
    const syllogisms = [
      {
        statement: "Statements:\n• Only a few Doctors are Engineers.\n• All Engineers are Scientists.\n• No Scientist is Teacher.",
        conc1: "Some Doctors are not Scientists.",
        conc2: "No Engineer is Teacher.",
        ansIndex: 1, // Only II follows
        explanation: "Since All Engineers are inside Scientists, and No Scientist is Teacher, therefore No Engineer can touch Teacher (Conclusion II is definitely TRUE). For Conclusion I: Only a few Doctors are Engineers means Some Doctors are not Engineers, but Doctors could still all be Scientists. Hence I is not definite."
      },
      {
        statement: "Statements:\n• Only a few Coins are Notes.\n• All Notes are Cards.\n• Some Cards are Cash.",
        conc1: "All Coins being Notes is a possibility.",
        conc2: "Some Cash being Coins is a possibility.",
        ansIndex: 1, // Only II follows
        explanation: "Conclusion I is FALSE: 'Only a few Coins are Notes' strictly forbids ALL Coins from ever becoming Notes. Conclusion II is TRUE: There is no negative statement between Cash and Coins, so a possibility overlap is valid."
      },
      {
        statement: "Statements:\n• Some Red are Blue.\n• All Blue are Green.\n• No Green is Yellow.",
        conc1: "No Blue is Yellow.",
        conc2: "Some Red are not Yellow.",
        ansIndex: 4, // Both follow
        explanation: "Conclusion I: Blue is completely inside Green, and No Green is Yellow, so No Blue is Yellow is TRUE. Conclusion II: The part of Red that is Blue/Green can never be Yellow, so Some Red are not Yellow is definitely TRUE. Both follow!"
      },
      {
        statement: "Statements:\n• Only a few Apples are Mangoes.\n• All Mangoes are Grapes.\n• Only a few Grapes are Oranges.",
        conc1: "All Mangoes being Oranges is a possibility.",
        conc2: "Some Apples are definitely not Mangoes.",
        ansIndex: 4, // Both follow
        explanation: "Conclusion I: There is no direct negative restriction between Mangoes and Oranges, so All Mangoes can be Oranges (TRUE). Conclusion II: 'Only a few Apples are Mangoes' directly implies Some Apples are NOT Mangoes (TRUE). Both follow!"
      },
      {
        statement: "Statements:\n• All Pens are Pencils.\n• Only a few Pencils are Erasers.\n• No Eraser is Scale.",
        conc1: "All Pencils being Erasers is a possibility.",
        conc2: "Some Pencils are not Scales.",
        ansIndex: 1, // Only II follows
        explanation: "Conclusion I: 'Only a few Pencils are Erasers' means All Pencils can NEVER be Erasers (FALSE). Conclusion II: The portion of Pencils that is Erasers can never be Scales, so Some Pencils are not Scales is definitely TRUE."
      }
    ];

    const item = syllogisms[Math.floor(Math.random() * syllogisms.length)];
    const options = [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Either Conclusion I or II follows",
      "Neither Conclusion I nor II follows",
      "Both Conclusions I and II follow"
    ];

    return {
      type: "syllogisms",
      title: "Bank Exam Syllogism Drill (Only a Few)",
      statement: item.statement,
      conclusions: [
        `Conclusion I: ${item.conc1}`,
        `Conclusion II: ${item.conc2}`
      ],
      options: options,
      correctIndex: item.ansIndex,
      correctAnswer: options[item.ansIndex],
      explanation: item.explanation
    };
  }

  // 3. Alphabet Positions & Opposites (EJOTY)
  generateAlphabet() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const subType = Math.floor(Math.random() * 3);

    if (subType === 0) {
      // Direct position
      const charIndex = Math.floor(Math.random() * 26);
      const targetChar = alphabet[charIndex];
      const correctPos = charIndex + 1;
      const options = [
        `${correctPos}`,
        `${correctPos - 1 || 2}`,
        `${correctPos + 1}`,
        `${correctPos + 2}`,
        `${correctPos - 2 || 1}`
      ].sort(() => Math.random() - 0.5);

      return {
        type: "alphabet",
        title: "EJOTY Letter Position Recall",
        statement: `What is the alphabetical position (forward) of letter "${targetChar}"?`,
        conclusions: [
          `Recall EJOTY anchor: E=5, J=10, O=15, T=20, Y=25.`
        ],
        options: options,
        correctIndex: options.indexOf(`${correctPos}`),
        correctAnswer: `${correctPos}`,
        explanation: `Using EJOTY: letter ${targetChar} has forward position ${correctPos}. Reverse position is 27 - ${correctPos} = ${27 - correctPos}.`
      };
    } else if (subType === 1) {
      // Opposite Letter
      const pairs = [
        ['A', 'Z', 'AZad'], ['B', 'Y', 'BoY'], ['C', 'X', 'CruX'], ['D', 'W', 'Dew'],
        ['E', 'V', 'EVening'], ['F', 'U', 'FUll'], ['G', 'T', 'GT Road'], ['H', 'S', 'High School'],
        ['I', 'R', 'Indian Railway'], ['J', 'Q', 'Jungle Queen'], ['K', 'P', 'Kurta Pajama'],
        ['L', 'O', 'LOve'], ['M', 'N', 'MaN']
      ];
      const selected = pairs[Math.floor(Math.random() * pairs.length)];
      const target = Math.random() > 0.5 ? selected[0] : selected[1];
      const opposite = target === selected[0] ? selected[1] : selected[0];

      const allLetters = alphabet.split('');
      const wrong = allLetters.filter(l => l !== opposite && l !== target).sort(() => Math.random() - 0.5).slice(0, 4);
      const options = [opposite, ...wrong].sort(() => Math.random() - 0.5);

      return {
        type: "alphabet",
        title: "Opposite Letter Pair Recall (Sum = 27)",
        statement: `Which letter is opposite to letter "${target}" in the alphabet?`,
        conclusions: [
          `Opposite letters have positions that sum to 27.`
        ],
        options: options,
        correctIndex: options.indexOf(opposite),
        correctAnswer: opposite,
        explanation: `Letter ${target} pairs with ${opposite} (Mnemonic: ${selected[2]}). Sum of their alphabetical values equals 27.`
      };
    } else {
      // Relative shift
      const pos1 = 12 + Math.floor(Math.random() * 8); // 12-20
      const shift = 2 + Math.floor(Math.random() * 4); // 2-5
      const targetPos = pos1 - shift;
      const targetChar = alphabet[targetPos - 1];

      const options = [
        targetChar,
        alphabet[targetPos],
        alphabet[targetPos - 2] || 'A',
        alphabet[targetPos + 1] || 'Z',
        alphabet[targetPos - 3] || 'B'
      ].sort(() => Math.random() - 0.5);

      return {
        type: "alphabet",
        title: "Alphabetical Left/Right Shift",
        statement: `Which letter is ${shift}th to the left of the ${pos1}th letter from the left in English alphabet?`,
        conclusions: [
          `Rule: Left of Left means SUBTRACT (Pos - Shift). Right of Left means ADD.`
        ],
        options: options,
        correctIndex: options.indexOf(targetChar),
        correctAnswer: targetChar,
        explanation: `${shift}th to the left of ${pos1}th from left = (${pos1} - ${shift}) = ${targetPos}th letter, which is "${targetChar}".`
      };
    }
  }

  // 4. Direction & Distance Sense
  generateDirection() {
    const problems = [
      {
        text: "Kavya starts walking from point A and walks 12m North. She turns right and walks 9m, then turns right and walks 12m to reach point B. What is the shortest distance and direction of point B with respect to point A?",
        options: ["9m, East", "9m, West", "15m, North-East", "12m, East", "15m, South"],
        ansIndex: 0,
        explanation: "North 12m, then right (East) 9m, then right (South) 12m. The vertical displacements cancel (+12m - 12m = 0m). She is exactly 9m East of point A."
      },
      {
        text: "Rohan walks 8m South from point P, turns right and walks 6m to reach point Q. What is the shortest displacement distance from point P to point Q?",
        options: ["10m", "14m", "12m", "8m", "15m"],
        ansIndex: 0,
        explanation: "Rohan moves 8m South and 6m West. Shortest distance = sqrt(8^2 + 6^2) = sqrt(64 + 36) = sqrt(100) = 10m."
      },
      {
        text: "One evening before sunset, Rekha and Hema were talking to each other face to face. If Hema's shadow was exactly to the right of Hema, which direction was Rekha facing?",
        options: ["South", "North", "East", "West", "North-East"],
        ansIndex: 0,
        explanation: "Before sunset, Sun is in the West, so shadows fall East. Hema's shadow is to her right, which means her right is East. Facing North has right as East, so Hema is facing North. Since Rekha is talking to Hema face-to-face, Rekha must be facing South!"
      },
      {
        text: "A man walks 5 km East, turns right and walks 12 km South. How far is he from his starting point?",
        options: ["13 km", "17 km", "15 km", "14 km", "12 km"],
        ansIndex: 0,
        explanation: "Displacement = sqrt(5^2 + 12^2) = sqrt(25 + 144) = sqrt(169) = 13 km (Pythagorean Triple 5-12-13)."
      }
    ];

    const item = problems[Math.floor(Math.random() * problems.length)];
    return {
      type: "direction",
      title: "Direction & Distance Speed Drill",
      statement: item.text,
      conclusions: [
        "Visualize cardinal axes: N = +y, S = -y, E = +x, W = -x."
      ],
      options: item.options,
      correctIndex: item.ansIndex,
      correctAnswer: item.options[item.ansIndex],
      explanation: item.explanation
    };
  }

  // 5. Blood Relations (Direct & Family Tree)
  generateBloodRelation() {
    const problems = [
      {
        text: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
        options: ["Father", "Uncle", "Brother", "Grandfather", "Cousin"],
        ansIndex: 0,
        explanation: "'The only son of my mother' = Suresh himself. 'He is the son of Suresh' => Suresh is the father of the boy."
      },
      {
        text: "A is father of B. B is sister of C. C is husband of D. How is A related to D?",
        options: ["Father-in-law", "Uncle", "Father", "Brother-in-law", "Grandfather"],
        ansIndex: 0,
        explanation: "A is father of C. C is husband of D. The father of one's husband is Father-in-law. Hence A is Father-in-law of D."
      },
      {
        text: "Introducing a girl, Vipin said, 'Her mother is the only daughter of my mother-in-law.' How is Vipin related to the girl?",
        options: ["Father", "Uncle", "Brother", "Husband", "Father-in-law"],
        ansIndex: 0,
        explanation: "'The only daughter of my mother-in-law' = Vipin's wife. 'Her mother is Vipin's wife' => Vipin is the father of the girl."
      },
      {
        text: "P is brother of Q. Q is mother of R. S is sister of R. How is P related to S?",
        options: ["Maternal Uncle", "Father", "Brother", "Paternal Uncle", "Nephew"],
        ansIndex: 0,
        explanation: "Q is mother of S. P is brother of mother Q. Mother's brother is Maternal Uncle (Mama)."
      }
    ];

    const item = problems[Math.floor(Math.random() * problems.length)];
    return {
      type: "blood_relations",
      title: "Blood Relations Speed Deduction",
      statement: item.text,
      conclusions: [
        "Break statement from inside out: identify 'my...' first."
      ],
      options: item.options,
      correctIndex: item.ansIndex,
      correctAnswer: item.options[item.ansIndex],
      explanation: item.explanation
    };
  }

  // 6. Puzzle & Seating Clue Phrasing Basics (N Away, N Between, Before vs Immediately)
  generatePuzzleBasics() {
    const problems = [
      {
        title: "Puzzle Foundation: 'N Places Before / Away'",
        text: "In a bank floor/box puzzle, a clue states: 'B is placed 2 places before A' (or 'B is 2 places away from A'). Exactly how many elements/persons sit between B and A?",
        conclusions: [
          "Crucial distinction between 'N places before' vs 'N people between'."
        ],
        options: [
          "Exactly 1 person (Layout: B [ ] A)",
          "Exactly 2 persons (Layout: B [ ] [ ] A)",
          "0 persons (Adjacent: B A)",
          "3 persons",
          "Cannot be determined"
        ],
        ansIndex: 0,
        explanation: "BANK EXAM GOLDEN RULE: 'N places before / away from A' means pos(A) - pos(B) = N. Therefore, exactly (N - 1) elements exist between them! Here N = 2, so (2 - 1) = Exactly 1 person sits between B and A (e.g. if B is at position 1, A is at position 3; slot 2 is between them: B [ ] A)."
      },
      {
        title: "Puzzle Foundation: '2 People Sit Between B and A'",
        text: "Clue states: 'Exactly 2 people sit between B and A in a single row facing North.' If B sits at position 2, what is the position of A (assuming A sits to the right of B)?",
        conclusions: [
          "When N people sit between two elements, their index distance is (N + 1)."
        ],
        options: [
          "Position 5 (Layout: B [3] [4] A)",
          "Position 4 (Layout: B [3] A)",
          "Position 6 (Layout: B [3] [4] [5] A)",
          "Position 3 (Adjacent)",
          "Position 7"
        ],
        ansIndex: 0,
        explanation: "When '2 people sit between B and A', the two slots between them are occupied by other people. Since B is at slot 2, slots 3 and 4 are the two people in between, which puts A at slot 5 (pos = 2 + 2 + 1 = 5). Layout: B [3] [4] A."
      },
      {
        title: "Puzzle Foundation: 'Floor / Box Gap Rule'",
        text: "Statement: 'Box P is kept 3 boxes above Box Q.' How many boxes are kept strictly between Box P and Box Q?",
        conclusions: [
          "Calculate gap between Floor(P) and Floor(Q)."
        ],
        options: [
          "Exactly 2 boxes",
          "Exactly 3 boxes",
          "Exactly 1 box",
          "0 boxes (Adjacent)",
          "Cannot be determined"
        ],
        ansIndex: 0,
        explanation: "'3 boxes above Q' means Box(P) = Box(Q) + 3. The boxes in between are Box(Q)+1 and Box(Q)+2. Thus, there are strictly (3 - 1) = 2 boxes between Box P and Box Q (Layout: P [ ] [ ] Q)."
      },
      {
        title: "Puzzle Foundation: '3rd to the Left' Linear Seating",
        text: "In a straight row facing North: 'A sits 3rd to the left of B.' How many persons sit between A and B?",
        conclusions: [
          "Left/Right counting convention in linear rows."
        ],
        options: [
          "Exactly 2 persons",
          "Exactly 3 persons",
          "Exactly 1 person",
          "0 persons",
          "Either 1 or 2 persons"
        ],
        ansIndex: 0,
        explanation: "Counting leftwards from B: 1st to left is [1], 2nd to left is [2], 3rd to left is A. Layout: A [ ] [ ] B. Exactly 2 persons sit between A and B."
      },
      {
        title: "Puzzle Foundation: 'Before' vs 'Immediately Before'",
        text: "In a box scheduling puzzle, the clue says: 'Box B is kept before Box A.' Does this mean Box B is immediately adjacent to Box A?",
        conclusions: [
          "Differentiating general order vs immediate adjacency."
        ],
        options: [
          "No, B is placed anywhere before A (gap can be 0, 1, 2, or more)",
          "Yes, B must be kept immediately before A with zero gap",
          "Yes, exactly 1 box must be between them",
          "No, B must have at least 3 boxes above A",
          "Only if both are on odd numbered floors"
        ],
        ansIndex: 0,
        explanation: "CRITICAL BANK EXAM TRAP: 'Before / Above' means any position prior to A with 0 or more elements between them. Only when the clue explicitly specifies 'IMMEDIATELY before' or 'Immediately above' does it mean adjacent (0 gap)!"
      },
      {
        title: "Puzzle Foundation: 'At Most' vs 'At Least'",
        text: "Clue states: 'At most two people sit between X and Y.' Which of the following gaps between X and Y are allowed?",
        conclusions: [
          "'At most N' means <= N (less than or equal to N)."
        ],
        options: [
          "0, 1, or 2 persons",
          "Strictly 2 persons only",
          "2 or more persons (2, 3, 4...)",
          "1 or 2 persons only (excluding 0)",
          "0 persons only"
        ],
        ansIndex: 0,
        explanation: "'At most 2' means <= 2. The possible gaps are 0 people (X and Y are adjacent), 1 person between them, or 2 persons between them. 'At least 2' would mean >= 2 (2, 3, 4...)."
      },
      {
        title: "Puzzle Foundation: Symmetric End Position Clue",
        text: "In a row of 8 persons facing North: 'As many persons sit to the left of P as to the right of Q.' If P sits 2nd from the left end, what is Q's position from the right end?",
        conclusions: [
          "Equating count of persons on outer flanks."
        ],
        options: [
          "2nd from the right end (7th from left)",
          "3rd from the right end (6th from left)",
          "1st from the right end (8th from left)",
          "4th from the right end",
          "Cannot be determined without Q's gender"
        ],
        ansIndex: 0,
        explanation: "P is 2nd from the left end, so there is exactly 1 person to P's left. Thus, there must be exactly 1 person to Q's right, which makes Q 2nd from the right end (slot 7 in an 8-person row)."
      },
      {
        title: "Puzzle Foundation: 'N Floors Away' Building Puzzle",
        text: "In a 7-floor building (floors 1 to 7), 'Floor of B is 3 floors away from Floor of A.' If A lives on Floor 2, on which floor must B live?",
        conclusions: [
          "Distance = |Floor(B) - Floor(A)| = 3."
        ],
        options: [
          "Floor 5",
          "Floor 6",
          "Floor 4",
          "Floor 3",
          "Floor 1"
        ],
        ansIndex: 0,
        explanation: "'3 floors away' means |Floor(B) - Floor(A)| = 3. Since A is on Floor 2: Floor(B) = 2 + 3 = Floor 5 (2 - 3 = -1 is invalid). Between Floor 2 and Floor 5, there are exactly 2 floors (Floors 3 & 4)."
      },
      {
        title: "Puzzle Foundation: Circular Table Right vs Left",
        text: "Eight persons sit around a circular table facing towards the CENTER. In which directional sense is a person's 'RIGHT'?",
        conclusions: [
          "Facing Center vs Facing Outside in circular seating."
        ],
        options: [
          "Anti-clockwise direction",
          "Clockwise direction",
          "Always towards North",
          "Always towards South",
          "Depends on even/odd seating positions"
        ],
        ansIndex: 0,
        explanation: "For any person facing the CENTER of a circle: RIGHT is always in the ANTI-CLOCKWISE (counter-clockwise) direction, and LEFT is always in the CLOCKWISE direction. When facing OUTSIDE, the directions reverse!"
      },
      {
        title: "Puzzle Foundation: Days of Week Scheduling Clue",
        text: "Seven persons attend interviews from Monday to Sunday. Clue: 'Person B attends interview 2 days before Person A.' If A's interview is on Friday, when is B's interview?",
        conclusions: [
          "'2 days before' means subtract 2 days."
        ],
        options: [
          "Wednesday (Exactly 1 day, Thursday, between them)",
          "Thursday (Adjacent day)",
          "Tuesday (2 days between them)",
          "Monday",
          "Saturday"
        ],
        ansIndex: 0,
        explanation: "'2 days before Friday' = Friday minus 2 days = Wednesday. Notice there is exactly 1 day (Thursday) between Wednesday and Friday (Layout: Wed (B), Thu [ ], Fri (A))."
      }
    ];

    const item = problems[Math.floor(Math.random() * problems.length)];
    return {
      type: "puzzle_basics",
      title: item.title,
      statement: item.text,
      conclusions: item.conclusions,
      options: item.options,
      correctIndex: item.ansIndex,
      correctAnswer: item.options[item.ansIndex],
      explanation: item.explanation
    };
  }
}

// Global reasoning instance
window.reasoningEngine = new ReasoningEngine();
window.REASONING_RULES = REASONING_RULES;
