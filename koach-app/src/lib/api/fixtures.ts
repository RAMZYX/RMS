import type {
  UnitOverview,
  ProgramOverview,
  Question,
  FeedbackItem,
  LearnerResponse,
  FeedbackResponse,
} from '@/features/training-program/types/training-program.types';

const unit: UnitOverview = {
  id: 'unit_cgtf_001',
  programTitle: 'Cell Growth and Tumor Formation',
  unitName: 'Cell Growth and Tumor Formation',
  topic: 'Basic of oncology',
  area: 'Advanced Oncology Nursing Program',
  unitType: 'Classroom',
  duration: '02:10',
  createdBy: 'Arun kumar (192320)',
  createdAt: '25/05/2026, 03:00 PM',
  updatedBy: 'Arun kumar (192320)',
  updatedAt: '25/05/2026, 04:00 PM',
};

const overview: ProgramOverview = {
  details: {
    thumbnailTitle: 'Post Basic Diploma in Oncology Nursing (PBDON)',
    thumbnailSubtitle: 'DETAILS · FREE · ONGOING · IMPORTANT DATES · SALARY',
    thumbnailTags: ['Oncology course', 'nursing course'],
    overviewText:
      'This course provides a comprehensive introduction to the field of oncology, focusing on the biology, diagnosis, treatment, and management of cancer. It is designed for healthcare professionals, students, and anyone interested in understanding how cancer develops and how it is treated across different stages of care.',
    programCode: 'KH-MOD-FC-V1.0',
    duration: '01:10',
    previousSequence: 'Cell Growth and Tumor Formation',
    knowledgeTags: ['Oncology course', 'nursing course'],
    competencyImpact: [
      'Improve patient safety',
      'Enhance clinical skills',
      'Regulatory & Legal Compliance',
      'Quality improvement',
      'Professional development',
    ],
  },
  source: {
    programSme: 'Arun kumar - 192320',
    department: 'Biomedical',
    division: 'Engineering',
    businessUnit: 'KCH',
  },
  classroom: {
    nominationType: 'Self nomination with HOD & trainer approval',
    uploadedFiles: [
      { id: 'f1', name: 'BLS_Guidelines_2026.pdf', size: '5.3MB' },
      { id: 'f2', name: 'Oncology.ppt', size: '3.1MB' },
      { id: 'f3', name: 'Oncology.ppt', size: '5.3MB' },
      { id: 'f4', name: 'Oncology.ppt', size: '5.3MB' },
    ],
  },
  types: {
    mandatory: 'Yes',
    mandatoryTypes: ['NABH', 'NABL', 'JCIA', 'ISO'],
    mandatorySubtype: 'Leadership / Managerial / Executive Development Program',
    clinicalType: 'Clinical',
    trainingCategoryType: 'Behavioral programs',
    contentProviderType: 'Internal',
  },
  validity: {
    hasValidity: 'Yes',
    validityMonths: '24',
  },
  certification: {
    onCompletion: 'Yes',
    template: 'Certificate template 1',
    validityMonths: '6',
    signatureImage1: 'signature.png',
    signatureImage2: 'image.png',
    imageOnCertificate: 'image.png',
  },
  preTest: {
    enabled: 'Yes',
    passPercentage: '50',
    easyQuestions: '10',
    mediumQuestions: '5',
    hardQuestions: '4',
    duration: '00:30',
  },
  postTest: {
    enabled: 'Yes',
    passPercentage: '50',
    easyQuestions: '10',
    mediumQuestions: '5',
    hardQuestions: '4',
    duration: '00:30',
  },
  flashcards: {
    enabled: 'Yes',
    passPercentage: '50',
    dueAfterDays: '30',
    completionPeriodDays: '7',
    numberOfRetakes: '2',
    easyQuestions: '2',
    mediumQuestions: '10',
    hardQuestions: '10',
  },
};

const questions: ReadonlyArray<Question> = [
  {
    id: 'q1',
    order: 1,
    text: 'Which cellular process is primarily responsible for uncontrolled tumor growth?',
    type: 'Single choice',
    difficulty: 'Medium',
    marks: 2,
    options: ['Apoptosis', 'Mitosis dysregulation', 'Necrosis', 'Autophagy'],
    correctAnswer: 'Mitosis dysregulation',
  },
  {
    id: 'q2',
    order: 2,
    text: 'A benign tumor is characterised by which of the following?',
    type: 'Single choice',
    difficulty: 'Easy',
    marks: 1,
    options: ['Metastasis', 'Encapsulation', 'Invasion', 'Rapid spread'],
    correctAnswer: 'Encapsulation',
  },
  {
    id: 'q3',
    order: 3,
    text: 'Select the tumor suppressor genes from the list below.',
    type: 'Multiple choice',
    difficulty: 'Hard',
    marks: 3,
    options: ['TP53', 'RB1', 'MYC', 'RAS'],
    correctAnswer: 'TP53, RB1',
  },
  {
    id: 'q4',
    order: 4,
    text: 'Angiogenesis supports tumor growth by forming new blood vessels.',
    type: 'True / False',
    difficulty: 'Easy',
    marks: 1,
    options: ['True', 'False'],
    correctAnswer: 'True',
  },
  {
    id: 'q5',
    order: 5,
    text: 'Which staging system is most commonly used for solid tumors?',
    type: 'Single choice',
    difficulty: 'Medium',
    marks: 2,
    options: ['TNM', 'FIGO', 'Gleason', 'Ann Arbor'],
    correctAnswer: 'TNM',
  },
];

const feedback: ReadonlyArray<FeedbackItem> = [
  { id: 'fb1', order: 1, question: 'How would you rate the overall quality of this training program?', responseType: 'Rating (1-5)', required: true },
  { id: 'fb2', order: 2, question: 'Was the content relevant to your role?', responseType: 'Yes / No', required: true },
  { id: 'fb3', order: 3, question: 'How clear were the learning objectives?', responseType: 'Rating (1-5)', required: true },
  { id: 'fb4', order: 4, question: 'What did you find most useful about this program?', responseType: 'Long text', required: false },
  { id: 'fb5', order: 5, question: 'Would you recommend this program to a colleague?', responseType: 'Yes / No', required: true },
  { id: 'fb6', order: 6, question: 'Any additional comments or suggestions?', responseType: 'Long text', required: false },
];

const learnerResponses: ReadonlyArray<LearnerResponse> = [
  { id: 'lr1', learnerName: 'Priya Raman', employeeId: '192401', department: 'Oncology', score: '92%', status: 'Completed', attempts: 1, submittedAt: '24/05/2026, 11:20 AM' },
  { id: 'lr2', learnerName: 'Vignesh S', employeeId: '192412', department: 'Nursing', score: '78%', status: 'Completed', attempts: 2, submittedAt: '24/05/2026, 12:05 PM' },
  { id: 'lr3', learnerName: 'Anitha Mohan', employeeId: '192433', department: 'Radiology', score: '—', status: 'In progress', attempts: 1, submittedAt: '—' },
  { id: 'lr4', learnerName: 'Karthik R', employeeId: '192440', department: 'Biomedical', score: '64%', status: 'Completed', attempts: 3, submittedAt: '23/05/2026, 09:50 AM' },
  { id: 'lr5', learnerName: 'Deepa Nair', employeeId: '192455', department: 'Oncology', score: '—', status: 'Not started', attempts: 0, submittedAt: '—' },
  { id: 'lr6', learnerName: 'Suresh Babu', employeeId: '192461', department: 'Pharmacy', score: '88%', status: 'Completed', attempts: 1, submittedAt: '22/05/2026, 04:10 PM' },
  { id: 'lr7', learnerName: 'Meena Iyer', employeeId: '192470', department: 'Nursing', score: '95%', status: 'Completed', attempts: 1, submittedAt: '22/05/2026, 02:35 PM' },
  { id: 'lr8', learnerName: 'Rahul Verma', employeeId: '192488', department: 'Oncology', score: '—', status: 'In progress', attempts: 2, submittedAt: '—' },
];

const feedbackResponses: ReadonlyArray<FeedbackResponse> = [
  { id: 'fr1', learnerName: 'Priya Raman', employeeId: '192401', rating: '4.6', sentiment: 'Positive', comment: 'Very well structured and clinically relevant.', submittedAt: '24/05/2026, 11:25 AM' },
  { id: 'fr2', learnerName: 'Vignesh S', employeeId: '192412', rating: '3.8', sentiment: 'Neutral', comment: 'Good content, pacing could be improved.', submittedAt: '24/05/2026, 12:10 PM' },
  { id: 'fr3', learnerName: 'Karthik R', employeeId: '192440', rating: '2.4', sentiment: 'Negative', comment: 'Pre-test was harder than the material covered.', submittedAt: '23/05/2026, 10:00 AM' },
  { id: 'fr4', learnerName: 'Suresh Babu', employeeId: '192461', rating: '4.9', sentiment: 'Positive', comment: 'Excellent flashcards, helped retention a lot.', submittedAt: '22/05/2026, 04:15 PM' },
  { id: 'fr5', learnerName: 'Meena Iyer', employeeId: '192470', rating: '5.0', sentiment: 'Positive', comment: 'Best oncology module I have taken so far.', submittedAt: '22/05/2026, 02:40 PM' },
  { id: 'fr6', learnerName: 'Deepa Nair', employeeId: '192455', rating: '3.5', sentiment: 'Neutral', comment: 'Useful but needs more case studies.', submittedAt: '21/05/2026, 06:05 PM' },
];

export const db = {
  unit,
  overview,
  questions,
  feedback,
  learnerResponses,
  feedbackResponses,
} as const;
