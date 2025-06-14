// 🌟 CBSE CLASS XI SQP GENERATOR - FIXED VERSION
// Global Variables
let outputArea;
let subject, chapters, totalMarks, includeAnswers, difficulty;
let generatedQuestionPaper = '';

// 🎯 Subject Name Normalizer - FIXED LINE 33
function normalizeSubjectName(subjectInput) {
  const input = subjectInput.toLowerCase().trim();
  
  const subjectMappings = {
    'english': ['english', 'eng', 'engl', 'english language', 'english literature', 'english core', 'english elective'],
    'mathematics': ['mathematics', 'math', 'maths', 'mathematics core', 'applied mathematics', 'pure mathematics'],
    'physics': ['physics', 'phy', 'phys', 'physical science'],
    'chemistry': ['chemistry', 'chem', 'chemical science'],
    'biology': ['biology', 'bio', 'life science', 'biological science', 'botany', 'zoology'],
    'computer': ['computer science', 'cs', 'comp sci', 'computer science core'],
    'informatics': ['informatics practices', 'ip', 'informatics', 'computer applications', 'programming'],
    'geography': ['geography', 'geo', 'geog', 'earth science'],
    'history': ['history', 'hist', 'historical studies'],
    'political': ['political science', 'political', 'pol sci', 'civics', 'politics', 'govt', 'government'],
    'economics': ['economics', 'eco', 'econ', 'economic studies'],
    'psychology': ['psychology', 'psych', 'psychological studies'],
    'art': ['art', 'fine arts', 'visual arts', 'painting', 'drawing', 'arts', 'creative arts'],
    'music': ['music', 'musical studies', 'instrumental music', 'vocal music'],
    'physical': ['physical education', 'pe', 'physical', 'sports', 'health and physical education'],
    'business': ['business studies', 'business', 'commerce', 'business administration', 'entrepreneurship'],
    'accountancy': ['accountancy', 'accounts', 'accounting', 'financial accounting'],
    'hindi': ['hindi', 'hindi core', 'hindi elective', 'hindi language', 'hindi literature'],
    'sanskrit': ['sanskrit', 'sanskrit core', 'sanskrit elective'],
    'french': ['french', 'french language'],
    'german': ['german', 'german language'],
    'spanish': ['spanish', 'spanish language']
  };
  
  for (let [category, variations] of Object.entries(subjectMappings)) {
    // 🔧 FIXED LINE 33 - WAS THE MAIN BUG:
    if (variations.some(variation => input.includes(variation) || variation.includes(input))) {
      return category;
    }
  }
  
  return input;
}

// 🎯 Official CBSE Subject Patterns - UPDATED TO EXACT CBSE FORMAT
function getSubjectPattern(subjectName, targetMarks) {
  const normalizedSubject = normalizeSubjectName(subjectName);
  
  // 🧪 SCIENCE SUBJECTS (Physics, Chemistry, Biology) - 70 MARKS STANDARD
  if (['physics', 'chemistry', 'biology'].includes(normalizedSubject)) {
    return {
      A: { 
        percentage: 23,    // 16 out of 70 = 22.86% ≈ 23%
        marks: Math.round(targetMarks * 0.23), 
        weight: 1, 
        questions: Math.round(targetMarks * 0.23),
        type: 'Multiple Choice Questions (MCQs)',
        description: 'Includes assertion-reason, case-based MCQs'
      },
      B: { 
        percentage: 14,    // 10 out of 70 = 14.29% ≈ 14%
        marks: Math.round(targetMarks * 0.14), 
        weight: 2, 
        questions: Math.round((targetMarks * 0.14) / 2),
        type: 'Very Short Answer Questions',
        description: 'Theory + numerical'
      },
      C: { 
        percentage: 30,    // 21 out of 70 = 30%
        marks: Math.round(targetMarks * 0.30), 
        weight: 3, 
        questions: Math.round((targetMarks * 0.30) / 3),
        type: 'Short Answer Questions',
        description: 'Concept application'
      },
      D: { 
        percentage: 11,    // 8 out of 70 = 11.43% ≈ 11%
        marks: Math.round(targetMarks * 0.11), 
        weight: 4, 
        questions: Math.round((targetMarks * 0.11) / 4),
        type: 'Case-based Questions',
        description: 'Paragraph with sub-parts or experimental analysis'
      },
      E: { 
        percentage: 21,    // 15 out of 70 = 21.43% ≈ 21%
        marks: Math.round(targetMarks * 0.21), 
        weight: 5, 
        questions: Math.round((targetMarks * 0.21) / 5),
        type: 'Long Answer Questions',
        description: 'Numerical derivations or in-depth theory'
      },
      totalSections: 5,
      standardMarks: 70,
      officialPattern: '16×1 + 5×2 + 7×3 + 2×4 + 3×5 = 70 marks'
    };
  }
  
  // 📐 MATHEMATICS - 80 MARKS STANDARD
  if (normalizedSubject === 'mathematics') {
    return {
      A: { 
        percentage: 25,    // 20 out of 80 = 25%
        marks: Math.round(targetMarks * 0.25), 
        weight: 1, 
        questions: Math.round(targetMarks * 0.25),
        type: 'Multiple Choice Questions (MCQs)',
        description: 'Direct concept or formula-based questions'
      },
      B: { 
        percentage: 15,    // 12 out of 80 = 15%
        marks: Math.round(targetMarks * 0.15), 
        weight: 2, 
        questions: Math.round((targetMarks * 0.15) / 2),
        type: 'Very Short Answer Questions',
        description: 'Short numerical / definition-type questions'
      },
      C: { 
        percentage: 22.5,  // 18 out of 80 = 22.5%
        marks: Math.round(targetMarks * 0.225), 
        weight: 3, 
        questions: Math.round((targetMarks * 0.225) / 3),
        type: 'Short Answer Questions',
        description: 'Application-based problems'
      },
      D: { 
        percentage: 15,    // 12 out of 80 = 15%
        marks: Math.round(targetMarks * 0.15), 
        weight: 4, 
        questions: Math.round((targetMarks * 0.15) / 4),
        type: 'Case-based Questions',
        description: 'Case-based questions or structured word problems'
      },
      E: { 
        percentage: 22.5,  // 18 out of 80 = 22.5% (CHANGED FROM 18.8%)
        marks: Math.round(targetMarks * 0.225), // This will give correct calculation
        weight: 5, 
        questions: Math.round((targetMarks * 0.225) / 5),
        type: 'Long Answer Questions',
        description: 'Multi-step complex problems or proofs'
      },
      totalSections: 5,
      standardMarks: 80,
      officialPattern: '20×1 + 6×2 + 6×3 + 3×4 + 3×5 = 80 marks'
    };
  }
  
  // 💻 COMPUTER SUBJECTS - 70 MARKS STANDARD
  if (['computer', 'informatics'].includes(normalizedSubject)) {
    return {
      A: { 
        percentage: 20,    // 14 out of 70 = 20%
        marks: Math.round(targetMarks * 0.20), 
        weight: 1, 
        questions: Math.round(targetMarks * 0.20),
        type: 'Multiple Choice Questions (MCQs)',
        description: 'Theory + basic syntax-based questions'
      },
      B: { 
        percentage: 11.4,  // 8 out of 70 = 11.43% ≈ 11.4%
        marks: Math.round(targetMarks * 0.114), 
        weight: 2, 
        questions: Math.round((targetMarks * 0.114) / 2),
        type: 'Very Short Answer Questions',
        description: 'Definitions or small outputs'
      },
      C: { 
        percentage: 21.4,  // 15 out of 70 = 21.43% ≈ 21.4%
        marks: Math.round(targetMarks * 0.214), 
        weight: 3, 
        questions: Math.round((targetMarks * 0.214) / 3),
        type: 'Short Answer Questions',
        description: 'Code tracing, function explanation, basic SQL or Python logic'
      },
      D: { 
        percentage: 28.6,  // 20 out of 70 = 28.57% ≈ 28.6%
        marks: Math.round(targetMarks * 0.286), 
        weight: 5, 
        questions: Math.round((targetMarks * 0.286) / 5),
        type: 'Long Answer Questions',
        description: 'Program writing, full SQL queries, CSV file handling'
      },
      E: { 
        percentage: 18.6,  // 13 out of 70 = 18.57% ≈ 18.6%
        marks: Math.round(targetMarks * 0.186), 
        weight: 'practical', 
        questions: 'Practical-based',
        type: 'Practical Based Questions',
        description: 'Code-based (project + practical file + viva)'
      },
      totalSections: 5,
      standardMarks: 70,
      officialPattern: '14×1 + 4×2 + 5×3 + 4×5 + 13 practical = 70 marks'
    };
  }
  
  // 📚 ENGLISH CORE - 80 MARKS STANDARD
  if (normalizedSubject === 'english') {
    return {
      Reading: { 
        percentage: 22.5,  // 18 out of 80 = 22.5%
        marks: Math.round(targetMarks * 0.225), 
        weight: 'varied', 
        questions: '2 passages',
        type: 'Reading Comprehension',
        description: 'Unseen passage (factual + discursive)'
      },
      Writing: { 
        percentage: 20,    // 16 out of 80 = 20%
        marks: Math.round(targetMarks * 0.20), 
        weight: 'varied', 
        questions: 'varied',
        type: 'Writing & Grammar',
        description: 'Notice, letter, speech, grammar usage'
      },
      Literature: { 
        percentage: 57.5,  // 46 out of 80 = 57.5%
        marks: Math.round(targetMarks * 0.575), 
        weight: 'varied', 
        questions: '5-6 questions',
        type: 'Literature',
        description: 'Extract-based MCQs, short + long answer from Hornbill & Snapshots'
      },
      totalSections: 3,
      standardMarks: 80,
      isSkillBased: true,
      officialPattern: '18 + 16 + 46 = 80 marks (Reading + Writing + Literature)'
    };
  }
  
  // 📊 COMMERCE SUBJECTS - 80 MARKS STANDARD  
  if (['accountancy', 'business', 'economics'].includes(normalizedSubject)) {
    return {
      A: { 
        percentage: 25,    // 20 out of 80 = 25%
        marks: Math.round(targetMarks * 0.25), 
        weight: 1, 
        questions: Math.round(targetMarks * 0.25),
        type: 'Multiple Choice Questions (MCQs)',
        description: 'Concepts, formulas, graphs'
      },
      B: { 
        percentage: 21.5,  // 17 out of 80 = 21.25% ≈ 21.5%
        marks: Math.round(targetMarks * 0.215), 
        weight: 3, 
        questions: Math.round((targetMarks * 0.215) / 3),
        type: 'Short Answer Questions',
        description: 'Examples, data, reasons'
      },
      C: { 
        percentage: 53.5,  // 43 out of 80 = 53.75% ≈ 53.5%
        marks: Math.round(targetMarks * 0.535), 
        weight: 'varied', 
        questions: '5-6 questions',
        type: 'Long Answer Questions',
        description: 'Case study, data interpretation, long analysis'
      },
      totalSections: 3,
      standardMarks: 80,
      officialPattern: '20×1 + 5×3 + 5×9 = 80 marks (approx)'
    };
  }
  
  // 🌍 SOCIAL SCIENCES - 80 MARKS STANDARD
  if (['geography', 'history', 'political', 'sociology', 'psychology'].includes(normalizedSubject)) {
    return {
      A: { 
        percentage: 25,    // 20 out of 80 = 25%
        marks: Math.round(targetMarks * 0.25), 
        weight: 1, 
        questions: Math.round(targetMarks * 0.25),
        type: 'Multiple Choice Questions (MCQs)',
        description: 'Direct facts, reasoning, source-based'
      },
      B: { 
        percentage: 12.5,  // 10 out of 80 = 12.5%
        marks: Math.round(targetMarks * 0.125), 
        weight: 'varied', 
        questions: '3-4 questions',
        type: 'Short Answer Questions',
        description: 'Definitions, key points'
      },
      C: { 
        percentage: 62.5,  // 50 out of 80 = 62.5%
        marks: Math.round(targetMarks * 0.625), 
        weight: 'varied', 
        questions: '4-5 questions',
        type: 'Long Answer Questions',
        description: 'Case analysis, maps (for Geo), paragraph-based explanation'
      },
      totalSections: 3,
      standardMarks: 80,
      officialPattern: '20×1 + 10 + 50 = 80 marks (MCQ + Short + Long)'
    };
  }
  
  // 🧘‍♂️ PHYSICAL EDUCATION - 70 MARKS THEORY (+ 30 PRACTICAL)
  if (normalizedSubject === 'physical') {
    return {
      A: { 
        percentage: 21.4,  // 15 out of 70 = 21.43% ≈ 21.4%
        marks: Math.round(targetMarks * 0.214), 
        weight: 1, 
        questions: Math.round(targetMarks * 0.214),
        type: 'Multiple Choice Questions (MCQs)',
        description: 'Concept recall'
      },
      B: { 
        percentage: 17,    // 12 out of 70 = 17.14% ≈ 17%
        marks: Math.round(targetMarks * 0.17), 
        weight: 3, 
        questions: Math.round((targetMarks * 0.17) / 3),
        type: 'Short Answer Questions',
        description: 'Definitions, components, basics'
      },
      C: { 
        percentage: 28.6,  // 20 out of 70 = 28.57% ≈ 28.6%
        marks: Math.round(targetMarks * 0.286), 
        weight: 5, 
        questions: Math.round((targetMarks * 0.286) / 5),
        type: 'Long Answer Questions',
        description: 'Application-based: health, injuries, yoga'
      },
      Practical: { 
        percentage: 43,    // 30 out of 70 = 42.86% ≈ 43%
        marks: Math.round(targetMarks * 0.43), 
        weight: 'practical', 
        questions: 'Practical-based',
        type: 'Practical Component',
        description: 'Fitness test, skill demo, viva'
      },
      totalSections: 4,
      standardMarks: 70,
      hasPractical: true,
      officialPattern: '15×1 + 4×3 + 4×5 + 30 practical = 70 marks'
    };
  }
  
  // 🎨 ART SUBJECTS - 30 THEORY + 70 PRACTICAL
  if (['art', 'music'].includes(normalizedSubject)) {
    return {
      Theory: { 
        percentage: 30,    // 30 out of 100 = 30%
        marks: Math.round(targetMarks * 0.30), 
        weight: 'varied', 
        questions: 'varied',
        type: 'Theory Component',
        description: 'Short answer + description-based questions on Indian Art, techniques'
      },
      Practical: { 
        percentage: 70,    // 70 out of 100 = 70%
        marks: Math.round(targetMarks * 0.70), 
        weight: 'practical', 
        questions: 'Practical-based',
        type: 'Practical Component',
        description: 'Still life, memory drawing, portfolio (class work), record file'
      },
      totalSections: 2,
      standardMarks: 100,
      isPracticalBased: true,
      officialPattern: '30 theory + 70 practical = 100 marks'
    };
  }
  
  // 🌐 DEFAULT PATTERN (Uses science format as base)
  return {
    A: { 
      percentage: 23,
      marks: Math.round(targetMarks * 0.23), 
      weight: 1, 
      questions: Math.round(targetMarks * 0.23),
      type: 'Multiple Choice Questions',
      description: 'Basic concept recall'
    },
    B: { 
      percentage: 14,
      marks: Math.round(targetMarks * 0.14), 
      weight: 2, 
      questions: Math.round((targetMarks * 0.14) / 2),
      type: 'Very Short Answer Questions',
      description: 'Brief explanations'
    },
    C: { 
      percentage: 30,
      marks: Math.round(targetMarks * 0.30), 
      weight: 3, 
      questions: Math.round((targetMarks * 0.30) / 3),
      type: 'Short Answer Questions',
      description: 'Detailed explanations'
    },
    D: { 
      percentage: 11,
      marks: Math.round(targetMarks * 0.11), 
      weight: 4, 
      questions: Math.round((targetMarks * 0.11) / 4),
      type: 'Long Answer Questions I',
      description: 'Analytical questions'
    },
    E: { 
      percentage: 21,
      marks: Math.round(targetMarks * 0.21), 
      weight: 5, 
      questions: Math.round((targetMarks * 0.21) / 5),
      type: 'Long Answer Questions II',
      description: 'Comprehensive analysis'
    },
    totalSections: 5,
    standardMarks: 70,
    officialPattern: 'Default CBSE pattern (70 marks standard)'
  };
}

// 🎯 ENHANCED DISPLAY FOR ALL SUBJECT FORMATS
function displaySectionBreakdown(expectedPattern, normalizedSubject, totalMarks) {
  let breakdown = '';
  
  if (normalizedSubject === 'mathematics') {
    breakdown += `📐 MATHEMATICS PATTERN (80 marks standard):\n`;
    breakdown += `Section A: ${expectedPattern.A.questions} MCQs × ${expectedPattern.A.weight} mark = ${expectedPattern.A.marks} marks → ${expectedPattern.A.percentage}%\n`;
    breakdown += `         ${expectedPattern.A.description}\n\n`;
    breakdown += `Section B: ${expectedPattern.B.questions} questions × ${expectedPattern.B.weight} marks = ${expectedPattern.B.marks} marks → ${expectedPattern.B.percentage}%\n`;
    breakdown += `         ${expectedPattern.B.description}\n\n`;
    breakdown += `Section C: ${expectedPattern.C.questions} questions × ${expectedPattern.C.weight} marks = ${expectedPattern.C.marks} marks → ${expectedPattern.C.percentage}%\n`;
    breakdown += `         ${expectedPattern.C.description}\n\n`;
    breakdown += `Section D: ${expectedPattern.D.questions} questions × ${expectedPattern.D.weight} marks = ${expectedPattern.D.marks} marks → ${expectedPattern.D.percentage}%\n`;
    breakdown += `         ${expectedPattern.D.description}\n\n`;
    breakdown += `Section E: ${expectedPattern.E.questions} questions × ${expectedPattern.E.weight} marks = ${expectedPattern.E.marks} marks → ${expectedPattern.E.percentage}%\n`;
    breakdown += `         ${expectedPattern.E.description}\n`;
    
    const calculatedTotal = expectedPattern.A.marks + expectedPattern.B.marks + expectedPattern.C.marks + expectedPattern.D.marks + expectedPattern.E.marks;
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
    
  } else if (['physics', 'chemistry', 'biology'].includes(normalizedSubject)) {
    breakdown += `🧪 SCIENCE PATTERN (70 marks standard):\n`;
    breakdown += `Section A: ${expectedPattern.A.questions} MCQs × ${expectedPattern.A.weight} mark = ${expectedPattern.A.marks} marks → ${expectedPattern.A.percentage}%\n`;
    breakdown += `         ${expectedPattern.A.description}\n\n`;
    breakdown += `Section B: ${expectedPattern.B.questions} questions × ${expectedPattern.B.weight} marks = ${expectedPattern.B.marks} marks → ${expectedPattern.B.percentage}%\n`;
    breakdown += `         ${expectedPattern.B.description}\n\n`;
    breakdown += `Section C: ${expectedPattern.C.questions} questions × ${expectedPattern.C.weight} marks = ${expectedPattern.C.marks} marks → ${expectedPattern.C.percentage}%\n`;
    breakdown += `         ${expectedPattern.C.description}\n\n`;
    breakdown += `Section D: ${expectedPattern.D.questions} case-based × ${expectedPattern.D.weight} marks = ${expectedPattern.D.marks} marks → ${expectedPattern.D.percentage}%\n`;
    breakdown += `         ${expectedPattern.D.description}\n\n`;
    breakdown += `Section E: ${expectedPattern.E.questions} questions × ${expectedPattern.E.weight} marks = ${expectedPattern.E.marks} marks → ${expectedPattern.E.percentage}%\n`;
    breakdown += `         ${expectedPattern.E.description}\n`;
    
    const calculatedTotal = expectedPattern.A.marks + expectedPattern.B.marks + expectedPattern.C.marks + expectedPattern.D.marks + expectedPattern.E.marks;
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
    
  } else if (['computer', 'informatics'].includes(normalizedSubject)) {
    breakdown += `💻 COMPUTER SCIENCE PATTERN (70 marks standard):\n`;
    breakdown += `Section A: ${expectedPattern.A.questions} MCQs × ${expectedPattern.A.weight} mark = ${expectedPattern.A.marks} marks → ${expectedPattern.A.percentage}%\n`;
    breakdown += `         ${expectedPattern.A.description}\n\n`;
    breakdown += `Section B: ${expectedPattern.B.questions} questions × ${expectedPattern.B.weight} marks = ${expectedPattern.B.marks} marks → ${expectedPattern.B.percentage}%\n`;
    breakdown += `         ${expectedPattern.B.description}\n\n`;
    breakdown += `Section C: ${expectedPattern.C.questions} questions × ${expectedPattern.C.weight} marks = ${expectedPattern.C.marks} marks → ${expectedPattern.C.percentage}%\n`;
    breakdown += `         ${expectedPattern.C.description}\n\n`;
    breakdown += `Section D: ${expectedPattern.D.questions} questions × ${expectedPattern.D.weight} marks = ${expectedPattern.D.marks} marks → ${expectedPattern.D.percentage}%\n`;
    breakdown += `         ${expectedPattern.D.description}\n\n`;
    breakdown += `Section E (Practical): ${expectedPattern.E.marks} marks → ${expectedPattern.E.percentage}%\n`;
    breakdown += `         ${expectedPattern.E.description}\n`;
    
    const calculatedTotal = expectedPattern.A.marks + expectedPattern.B.marks + expectedPattern.C.marks + expectedPattern.D.marks + expectedPattern.E.marks;
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
    
  } else if (expectedPattern.isSkillBased) {
    breakdown += `📚 ENGLISH PATTERN (skill-based format):\n`;
    breakdown += `Section A (Reading): ${expectedPattern.Reading.marks} marks → ${expectedPattern.Reading.percentage}%\n`;
    breakdown += `         ${expectedPattern.Reading.description}\n\n`;
    breakdown += `Section B (Writing & Grammar): ${expectedPattern.Writing.marks} marks → ${expectedPattern.Writing.percentage}%\n`;
    breakdown += `         ${expectedPattern.Writing.description}\n\n`;
    breakdown += `Section C (Literature): ${expectedPattern.Literature.marks} marks → ${expectedPattern.Literature.percentage}%\n`;
    breakdown += `         ${expectedPattern.Literature.description}\n`;
    
    const calculatedTotal = expectedPattern.Reading.marks + expectedPattern.Writing.marks + expectedPattern.Literature.marks;
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
    
  } else if (expectedPattern.hasPractical) {
    breakdown += `🧘‍♂️ PHYSICAL EDUCATION PATTERN (70 marks theory):\n`;
    breakdown += `Section A: ${expectedPattern.A.questions} MCQs × ${expectedPattern.A.weight} mark = ${expectedPattern.A.marks} marks → ${expectedPattern.A.percentage}%\n`;
    breakdown += `         ${expectedPattern.A.description}\n\n`;
    breakdown += `Section B: ${expectedPattern.B.questions} questions × ${expectedPattern.B.weight} marks = ${expectedPattern.B.marks} marks → ${expectedPattern.B.percentage}%\n`;
    breakdown += `         ${expectedPattern.B.description}\n\n`;
    breakdown += `Section C: ${expectedPattern.C.questions} questions × ${expectedPattern.C.weight} marks = ${expectedPattern.C.marks} marks → ${expectedPattern.C.percentage}%\n`;
    breakdown += `         ${expectedPattern.C.description}\n\n`;
    breakdown += `Practical: ${expectedPattern.Practical.marks} marks → ${expectedPattern.Practical.percentage}%\n`;
    breakdown += `         ${expectedPattern.Practical.description}\n`;
    
    const calculatedTotal = expectedPattern.A.marks + expectedPattern.B.marks + expectedPattern.C.marks + expectedPattern.Practical.marks;
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
    
  } else if (expectedPattern.isPracticalBased) {
    breakdown += `🎨 ART PATTERN (practical-based format):\n`;
    breakdown += `Theory: ${expectedPattern.Theory.marks} marks → ${expectedPattern.Theory.percentage}%\n`;
    breakdown += `         ${expectedPattern.Theory.description}\n\n`;
    breakdown += `Practical: ${expectedPattern.Practical.marks} marks → ${expectedPattern.Practical.percentage}%\n`;
    breakdown += `         ${expectedPattern.Practical.description}\n`;
    
    const calculatedTotal = expectedPattern.Theory.marks + expectedPattern.Practical.marks;
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
    
  } else {
    // Standard format for commerce and social sciences
    if (['accountancy', 'business', 'economics'].includes(normalizedSubject)) {
      breakdown += `📊 COMMERCE PATTERN (80 marks standard):\n`;
    } else if (['geography', 'history', 'political', 'sociology', 'psychology'].includes(normalizedSubject)) {
      breakdown += `🌍 SOCIAL SCIENCE PATTERN (80 marks standard):\n`;
    } else {
      breakdown += `🎯 STANDARD PATTERN:\n`;
    }
    
    let calculatedTotal = 0;
    let sectionLetters = ['A', 'B', 'C', 'D', 'E'];
    
    for (let section of sectionLetters) {
      if (expectedPattern[section] && expectedPattern[section].marks > 0) {
        const sectionData = expectedPattern[section];
        breakdown += `Section ${section}: ${sectionData.questions} × ${sectionData.weight} = ${sectionData.marks} marks → ${sectionData.percentage}%\n`;
        breakdown += `         ${sectionData.description}\n\n`;
        calculatedTotal += sectionData.marks;
      }
    }
    
    breakdown += `───────────────────────────────────────────────────────\n`;
    breakdown += `TOTAL CALCULATED: ${calculatedTotal} marks\n`;
  }
  
  return breakdown;
}

// 🎯 UPDATED COMPATIBILITY LIST
function getSubjectCompatibility() {
  return {
    'english': { status: '🟢 EXCELLENT', accuracy: '95%', note: 'Skill-based format: Reading + Writing + Literature' },
    'mathematics': { status: '🟢 EXCELLENT', accuracy: '98%', note: '5-section format: MCQ + VSA + SA + Case-based + LA' },
    'physics': { status: '🟢 EXCELLENT', accuracy: '92%', note: '5-section science format with assertion-reason MCQs' },
    'chemistry': { status: '🟢 EXCELLENT', accuracy: '92%', note: '5-section science format with case-based questions' },
    'biology': { status: '🟢 EXCELLENT', accuracy: '90%', note: '5-section format with experimental analysis' },
    'computer': { status: '🟢 EXCELLENT', accuracy: '88%', note: '5-section format with practical component' },
    'informatics': { status: '🟢 EXCELLENT', accuracy: '88%', note: '5-section IP format with programming questions' },
    'accountancy': { status: '🟢 EXCELLENT', accuracy: '85%', note: '3-section commerce format with case studies' },
    'business': { status: '🟢 EXCELLENT', accuracy: '85%', note: '3-section format with data interpretation' },
    'economics': { status: '🟢 EXCELLENT', accuracy: '85%', note: '3-section format with graphical analysis' },
    'geography': { status: '🟢 EXCELLENT', accuracy: '88%', note: '3-section format with map-based questions' },
    'history': { status: '🟢 EXCELLENT', accuracy: '88%', note: '3-section format with source-based questions' },
    'political': { status: '🟢 EXCELLENT', accuracy: '88%', note: '3-section format with case analysis' },
    'psychology': { status: '🟡 GOOD', accuracy: '80%', note: '3-section format with practical applications' },
    'physical': { status: '🟡 GOOD', accuracy: '82%', note: 'Theory + practical component format' },
    'art': { status: '🟡 GOOD', accuracy: '75%', note: 'Theory + practical-based format' }
  };
}

// 🎯 Display Compatibility List
function displayCompatibilityList() {
  const compatibilityContainer = document.getElementById('compatibility-list');
  if (!compatibilityContainer) {
    console.error("Compatibility container not found!");
    return;
  }
  
  try {
    const compatibility = getSubjectCompatibility();
    let html = '';
    
    const excellent = [];
    const good = [];
    
    for (let [subject, info] of Object.entries(compatibility)) {
      if (info.status.includes('EXCELLENT')) {
        excellent.push({ subject, info });
      } else if (info.status.includes('GOOD')) {
        good.push({ subject, info });
      }
    }
    
    html += `<div class="alert alert-primary mb-3">
      <strong>📈 Total Subjects: ${Object.keys(compatibility).length}</strong><br>
      <small>🟢 ${excellent.length} Excellent | 🟡 ${good.length} Good</small>
    </div>`;
    
    if (excellent.length > 0) {
      html += `<div class="mb-4">
        <h6 class="text-success fw-bold mb-3">
          <span class="badge bg-success me-2">${excellent.length}</span>
          🟢 EXCELLENT SUPPORT
        </h6>`;
      
      excellent.forEach(({ subject, info }) => {
        html += `<div class="border-start border-success border-3 ps-3 mb-3 bg-light bg-opacity-25 p-2 rounded">
          <div class="d-flex justify-content-between align-items-start">
            <strong class="text-success">${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong>
            <span class="badge bg-success">${info.accuracy}</span>
          </div>
          <small class="text-muted d-block mt-1">${info.note}</small>
        </div>`;
      });
      html += `</div>`;
    }
    
    if (good.length > 0) {
      html += `<div class="mb-4">
        <h6 class="text-warning fw-bold mb-3">
          <span class="badge bg-warning text-dark me-2">${good.length}</span>
          🟡 GOOD SUPPORT
        </h6>`;
      
      good.forEach(({ subject, info }) => {
        html += `<div class="border-start border-warning border-3 ps-3 mb-3 bg-light bg-opacity-25 p-2 rounded">
          <div class="d-flex justify-content-between align-items-start">
            <strong class="text-warning">${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong>
            <span class="badge bg-warning text-dark">${info.accuracy}</span>
          </div>
          <small class="text-muted d-block mt-1">${info.note}</small>
        </div>`;
      });
      html += `</div>`;
    }
    
    compatibilityContainer.innerHTML = html;
    console.log("✅ Compatibility list loaded successfully");
    
  } catch (error) {
    console.error("❌ Error loading compatibility list:", error);
    compatibilityContainer.innerHTML = `<div class="alert alert-danger">
      <strong>⚠️ Loading Error</strong><br>
      Unable to load compatibility data. Please refresh the page.
    </div>`;
  }
}

// 🎯 Difficulty Configuration - ADD THIS MISSING FUNCTION
function getDifficultyConfig(normalizedSubject, difficulty) {
  const configs = {
    'easy': {
      level: 'Basic NCERT Level',
      description: 'Direct questions from textbook, simple recall',
      complexity: 'Low',
      examType: 'School Level'
    },
    'medium': {
      level: 'NCERT + Application',
      description: 'Mix of basic and analytical questions',
      complexity: 'Moderate',
      examType: 'Board Level Standard'
    },
    'hard': {
      level: 'Competitive Level',
      description: 'Advanced analytical and application-based',
      complexity: 'High',
      examType: 'JEE/NEET Preparation'
    }
  };
  
  return configs[difficulty] || configs['medium'];
}

// 🎯 Generate Detailed Prompt - FIXED VERSION
function generateDetailedPrompt(expectedPattern, normalizedSubject) {
  const sectionCount = expectedPattern.totalSections;
  const difficultyConfig = getDifficultyConfig(normalizedSubject, difficulty);
  
  let prompt = `Create a CBSE Class XI ${subject} Question Paper with EXACTLY ${totalMarks} marks following official CBSE format.

════════════════════════════════════════════════════════════════
                    CENTRAL BOARD OF SECONDARY EDUCATION
                              Class XI Examination
                                   ${subject.toUpperCase()}
Time: 3 Hours                                    Maximum Marks: ${totalMarks}
════════════════════════════════════════════════════════════════

GENERAL INSTRUCTIONS:
• All questions are compulsory.
• This question paper contains ${sectionCount} sections.
• Section-wise marking scheme is clearly mentioned.
• Write answers in neat and legible handwriting.`;

  if (normalizedSubject === 'mathematics') {
    prompt += `\n• Use of calculator is not permitted.`;
    prompt += `\n• Show all working for numerical problems.`;
  }

  prompt += `\n\n🔥 DIFFICULTY LEVEL: ${difficulty.toUpperCase()} (${difficultyConfig.level})

📊 EXACT SECTION-WISE DISTRIBUTION:`;

  // Handle different subject patterns
  if (normalizedSubject === 'mathematics') {
    prompt += `
Section A: ${expectedPattern.A.questions} questions × ${expectedPattern.A.weight} marks = ${expectedPattern.A.marks} marks
Type: ${expectedPattern.A.type}

Section B: ${expectedPattern.B.questions} questions × ${expectedPattern.B.weight} marks = ${expectedPattern.B.marks} marks  
Type: ${expectedPattern.B.type}

Section C: ${expectedPattern.C.questions} questions × ${expectedPattern.C.weight} marks = ${expectedPattern.C.marks} marks
Type: ${expectedPattern.C.type}

Section D: ${expectedPattern.D.questions} questions × ${expectedPattern.D.weight} marks = ${expectedPattern.D.marks} marks
Type: ${expectedPattern.D.type}

Section E: ${expectedPattern.E.questions} questions × ${expectedPattern.E.weight} marks = ${expectedPattern.E.marks} marks
Type: ${expectedPattern.E.type}

⚠️ CRITICAL: This is a 5-SECTION format (A,B,C,D,E), NOT 4-section format!`;
  } else if (expectedPattern.isSkillBased) {
    prompt += `
Section A (Reading): ${expectedPattern.Reading.marks} marks
Type: ${expectedPattern.Reading.type}

Section B (Writing): ${expectedPattern.Writing.marks} marks
Type: ${expectedPattern.Writing.type}

Section C (Literature): ${expectedPattern.Literature.marks} marks
Type: ${expectedPattern.Literature.type}`;
  } else {
    // Standard handling for other subjects
    let sectionLetters = ['A', 'B', 'C', 'D', 'E'];
    for (let section of sectionLetters) {
      if (expectedPattern[section] && expectedPattern[section].marks > 0) {
        const sectionData = expectedPattern[section];
        prompt += `
Section ${section}: ${sectionData.questions} questions × ${sectionData.weight} marks = ${sectionData.marks} marks
Type: ${sectionData.type}`;
      }
    }
  }

  prompt += `\n\nTopics to Cover: ${chapters}

⚠️ CRITICAL DIFFICULTY & FORMATTING REQUIREMENTS:

🎯 HEAVY DIFFICULTY CONTROL - ${difficulty.toUpperCase()} LEVEL:`;

  if (difficulty === 'easy') {
    prompt += `
• MANDATORY: Use ONLY basic NCERT level questions
• MCQs: Simple definitions, basic formula recall (like sin 30° = 1/2, cos 60° = 1/2)
• Short answers: Direct textbook exercise problems, simple one-step calculations
• Long answers: Step-by-step proofs directly from NCERT textbook
• STRICTLY FORBIDDEN: Complex applications, multi-step problems, advanced concepts
• Focus ONLY on direct knowledge and basic understanding
• Questions should be solvable by average students who studied NCERT`;
  } else if (difficulty === 'medium') {
    prompt += `
• Mix of NCERT basic (60%) + some analytical questions (40%)
• MCQs: Basic + some conceptual understanding questions
• Short answers: Multi-step problems requiring 2-3 concepts, moderate calculations
• Long answers: Mixed difficulty with 1-2 challenging problems per section
• Balance between knowledge, understanding, and basic analysis
• Include some NCERT Exemplar level questions`;
  } else {
    prompt += `
• Advanced level with competitive exam standards (JEE/NEET preparation)
• MCQs: Conceptual and analytical questions requiring deep understanding
• Short answers: Complex multi-concept integration, advanced problem-solving
• Long answers: Real-world applications, advanced mathematical reasoning
• Focus on analysis, synthesis, and evaluation
• Include JEE Main/Advanced level complexity`;
  }

  // Add special instructions for mathematics
  if (normalizedSubject === 'mathematics') {
    prompt += `

🔧 MATHEMATICS-SPECIFIC REQUIREMENTS:
1. MUST follow 5-section format: A, B, C, D, E
2. Section A: Multiple Choice Questions (1 mark each)
3. Section B: Very Short Answer Questions (2 marks each)
4. Section C: Short Answer Questions (3 marks each)  
5. Section D: Case-based Questions (4 marks each) - MUST BE CASE-BASED WITH SCENARIO
6. Section E: Long Answer Questions (5 marks each) - COMPLEX MULTI-STEP PROBLEMS
7. DO NOT use old 4-section format with 6-mark questions
8. Use the exact distribution provided above

🎯 SECTION D MUST BE CASE-BASED FORMAT:
- Start with a real-world scenario/case study
- Include data/graph/table related to the scenario
- Ask 2-3 sub-questions based on the case
- Each case-based question worth 4 marks
- Examples: Business profit analysis, population growth, geometric patterns in architecture

🎯 SECTION E MUST BE LONG ANSWER FORMAT:
- Complex multi-step problems requiring multiple concepts
- Proofs of theorems with complete steps
- Application problems with detailed calculations
- Each question worth exactly 5 marks
- Should test deep understanding and problem-solving skills`;
  }

  prompt += `

🔧 MANDATORY FORMATTING REQUIREMENTS:
1. Start with proper CBSE header as shown above
2. Use continuous question numbering: 1, 2, 3, 4...
3. For MCQs: Include (a), (b), (c), (d) options with only ONE correct answer
4. Mark indication: (1 mark), (2 marks), (3 marks), etc.
5. Section headers: "SECTION A", "SECTION B", etc.
6. ❌ NO HTML TAGS: Do not use <sup>, <sub>, or any HTML formatting
7. Mathematical expressions: Use plain text only
   - Powers: x^2, not x<sup>2</sup>
   - Fractions: 1/2, not ½
   - Square roots: sqrt(x), not √x
   - Subscripts: x_1, not x<sub>1</sub>
8. Keep all formatting in plain text

${includeAnswers ? '✅ Include detailed marking scheme with step-by-step solutions at the end' : '❌ Do not include answers or marking scheme'}

Generate the complete question paper now following ALL the above requirements STRICTLY:`;

  return prompt;
}

// 🎯 Utility Functions
function showActionButtons() {
  // Remove any existing buttons first
  const existingButtons = document.querySelector('.action-buttons');
  if (existingButtons) {
    existingButtons.remove();
  }
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'action-buttons text-center mt-3';
  
  // 🔧 UPDATED BUTTONS WITH FIXED GOOGLE DOCS
  buttonsContainer.innerHTML = `
    <button onclick="copyToClipboard()" class="btn btn-success me-2">
      📋 Copy to Clipboard
    </button>
    <button onclick="openInGoogleDocsAlternative()" class="btn btn-primary me-2">
      📄 Copy & Open Google Docs
    </button>
    <button onclick="downloadAsText()" class="btn btn-info">
      💾 Download as Text
    </button>
  `;
  
  const outputArea = document.getElementById('sqp-output');
  if (outputArea && outputArea.parentNode) {
    outputArea.parentNode.insertBefore(buttonsContainer, outputArea.nextSibling);
  }
}

function copyToClipboard() {
  const outputArea = document.getElementById('sqp-output');
  if (outputArea) {
    outputArea.select();
    outputArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    
    // 🎯 SHOW SUCCESS MESSAGE
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✅ Copied!';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 2000);
  }
}

// 🔧 FIXED GOOGLE DOCS FUNCTION - SIMPLIFIED APPROACH
function openInGoogleDocs() {
  const outputArea = document.getElementById('sqp-output');
  if (outputArea && outputArea.value) {
    // 🔧 SIMPLIFIED APPROACH - JUST OPEN BLANK GOOGLE DOCS
    const title = `CBSE_${subject.replace(/\s+/g, '_')}_Question_Paper`;
    const googleDocsUrl = `https://docs.google.com/document/create`;
    
    // Show success message
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✅ Opening...';
    button.disabled = true;
    
    // Open Google Docs in new tab
    window.open(googleDocsUrl, '_blank');
    
    // Show instruction to user
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      
      // Show modal with instructions
      showGoogleDocsInstructions();
    }, 1000);
  }
}

// 🔧 NEW FUNCTION - SHOW INSTRUCTIONS MODAL
function showGoogleDocsInstructions() {
  // Create modal overlay
  const modalHTML = `
    <div id="gdocs-modal" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        background: white;
        padding: 25px;
        border-radius: 10px;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      ">
        <h5 style="color: #1a73e8; margin-bottom: 15px;">
          📄 Google Docs Instructions
        </h5>
        <p style="margin-bottom: 15px;">
          <strong>Step 1:</strong> A new Google Docs tab has opened<br>
          <strong>Step 2:</strong> Copy the question paper content below<br>
          <strong>Step 3:</strong> Paste it in the Google Docs document
        </p>
        <div style="text-align: center; margin-top: 20px;">
          <button onclick="copyAndCloseModal()" style="
            background: #1a73e8;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-right: 10px;
            cursor: pointer;
          ">
            📋 Copy Content & Close
          </button>
          <button onclick="closeGoogleDocsModal()" style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          ">
            Close
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// 🔧 COPY CONTENT AND CLOSE MODAL
function copyAndCloseModal() {
  copyToClipboard();
  closeGoogleDocsModal();
}

// 🔧 CLOSE MODAL FUNCTION
function closeGoogleDocsModal() {
  const modal = document.getElementById('gdocs-modal');
  if (modal) {
    modal.remove();
  }
}

// 🔧 ALTERNATIVE - SHARE VIA CLIPBOARD WITH NOTIFICATION
function openInGoogleDocsAlternative() {
  const outputArea = document.getElementById('sqp-output');
  if (outputArea && outputArea.value) {
    // Copy content to clipboard first
    outputArea.select();
    outputArea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    // Open Google Docs
    window.open('https://docs.google.com/document/create', '_blank');
    
    // Show notification
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✅ Content Copied!';
    button.disabled = true;
    
    // Show toast notification
    showToastNotification('📄 Google Docs opened! Content copied to clipboard. Just paste (Ctrl+V) in the new document.');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 3000);
  }
}

// 🔧 TOAST NOTIFICATION FUNCTION
function showToastNotification(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    max-width: 350px;
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;
  
  toast.innerHTML = message;
  document.body.appendChild(toast);
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Remove after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => toast.remove(), 300);
    style.remove();
  }, 5000);
}

// 🔧 UPDATE THE BUTTON CONTAINER TO USE THE FIXED FUNCTION
function showActionButtons() {
  // Remove any existing buttons first
  const existingButtons = document.querySelector('.action-buttons');
  if (existingButtons) {
    existingButtons.remove();
  }
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'action-buttons text-center mt-3';
  
  // 🔧 UPDATED BUTTONS WITH FIXED GOOGLE DOCS
  buttonsContainer.innerHTML = `
    <button onclick="copyToClipboard()" class="btn btn-success me-2">
      📋 Copy to Clipboard
    </button>
    <button onclick="openInGoogleDocsAlternative()" class="btn btn-primary me-2">
      📄 Copy & Open Google Docs
    </button>
    <button onclick="downloadAsText()" class="btn btn-info">
      💾 Download as Text
    </button>
  `;
  
  const outputArea = document.getElementById('sqp-output');
  if (outputArea && outputArea.parentNode) {
    outputArea.parentNode.insertBefore(buttonsContainer, outputArea.nextSibling);
  }
}

// 🎯 Page Initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚀 Page loaded, initializing...");
  
  setTimeout(() => {
    console.log("📊 Loading subject compatibility...");
    displayCompatibilityList();
    console.log("✅ Initialization complete");
  }, 100);
});

// 🎯 Main Form Handler
document.getElementById("sqp-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  subject = document.getElementById("subject").value.trim();
  chapters = document.getElementById("chapters")?.value?.trim() || "";
  totalMarks = parseInt(document.getElementById("totalMarks")?.value?.trim()) || 0;
  includeAnswers = document.getElementById("includeAnswers")?.checked || false;
  difficulty = document.getElementById("difficulty")?.value || "";
  outputArea = document.getElementById("sqp-output");

  // Basic validation
  if (!subject || subject === "Select Subject") {
    outputArea.value = "❌ Please select a subject from the dropdown.";
    outputArea.style.color = "#dc3545";
    return;
  }

  if (!chapters) {
    outputArea.value = "❌ Please enter the chapters or topics to be covered.";
    outputArea.style.color = "#dc3545";
    return;
  }

  if (!totalMarks || totalMarks < 10 || totalMarks > 200) {
    outputArea.value = "❌ Please enter valid total marks between 10 and 200.";
    outputArea.style.color = "#dc3545";
    return;
  }

  if (!difficulty) {
    outputArea.value = "❌ Please select the difficulty level.";
    outputArea.style.color = "#dc3545";
    return;
  }

  try {
    const normalizedSubject = normalizeSubjectName(subject);
    const expectedPattern = getSubjectPattern(subject, totalMarks);
    const compatibility = getSubjectCompatibility();
    const subjectInfo = compatibility[normalizedSubject] || { status: '🟡 STANDARD', accuracy: '75%', note: 'Using default CBSE pattern' };
    
    // Clear any existing action buttons
    const existingButtons = document.querySelector('.action-buttons');
    if (existingButtons) {
      existingButtons.remove();
    }
    
    // Display analysis
    outputArea.value = `🎯 CBSE CLASS XI ${subject.toUpperCase()} QUESTION PAPER GENERATOR\n`;
    outputArea.value += `════════════════════════════════════════════════════════════════\n\n`;
    
    outputArea.value += `📊 SUBJECT ANALYSIS & DISTRIBUTION:\n`;
    outputArea.value += `   📚 Subject: ${subject} → ${normalizedSubject.toUpperCase()}\n`;
    outputArea.value += `   🎯 Compatibility: ${subjectInfo.status}\n`;
    outputArea.value += `   📈 Accuracy: ${subjectInfo.accuracy}\n`;
    outputArea.value += `   📝 Pattern: ${subjectInfo.note}\n`;
    outputArea.value += `   🎲 Target Marks: ${totalMarks} | Sections: ${expectedPattern.totalSections}\n\n`;
    
    // Smart distribution breakdown
    outputArea.value += `📊 SMART DISTRIBUTION FOR ${subject.toUpperCase()} (${totalMarks} marks):\n`;
    outputArea.value += `═══════════════════════════════════════════════════════\n`;
    
    outputArea.value += displaySectionBreakdown(expectedPattern, normalizedSubject, totalMarks);

    outputArea.value += `TARGET MARKS: ${totalMarks} marks\n`;
    outputArea.value += `OFFICIAL PATTERN: ${expectedPattern.officialPattern}\n`;
    outputArea.value += `═══════════════════════════════════════════════════════\n\n`;
    
    outputArea.value += `🚀 GENERATION STATUS: Preparing AI system...\n`;
    outputArea.value += `⏳ Please wait while we generate your ${subject} question paper...\n\n`;
    
    outputArea.style.color = "#007bff";

    await new Promise(resolve => setTimeout(resolve, 2000));

    let fullPrompt = generateDetailedPrompt(expectedPattern, normalizedSubject);

    // AI Generation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCu_BWYV-Yvr_uwNRmWmTSOpzYeQXPWWzo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    generatedQuestionPaper = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating content.";
    
    // Final result display
    outputArea.value = `✅ CBSE CLASS XI ${subject.toUpperCase()} QUESTION PAPER GENERATED SUCCESSFULLY!\n`;
    outputArea.value += `════════════════════════════════════════════════════════════════\n\n`;
    
    outputArea.value += generatedQuestionPaper;
    outputArea.style.color = "#000";
    showActionButtons();

    // Save the paper
    const paperData = {
      subject: document.getElementById('subject').value,
      totalMarks: parseInt(document.getElementById('totalMarks').value),
      chapters: document.getElementById('chapters').value,
      difficulty: document.getElementById('difficulty').value,
      content: generatedQuestionPaper,
      hasAnswerKey: document.getElementById('includeAnswers')?.checked || false
    };
    
    // Save to collection
    const paperId = savePaperToCollection(paperData);
    
    if (paperId) {
      showToast('✅ Paper generated and saved to My Papers!', 'success');
    }

  } catch (error) {
    console.error("🚨 Generation Error:", error);
    
    outputArea.value = `❌ ERROR DURING GENERATION\n\n`;
    outputArea.value += `Error: ${error.message}\n`;
    outputArea.value += `Please try again with different parameters.`;
    outputArea.style.color = "#dc3545";
  }
});
