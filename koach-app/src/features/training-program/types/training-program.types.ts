import type { ID } from '@/types/common';

/** Top "Unit overview" bar shown on every tab. */
export interface UnitOverview {
  readonly id: ID;
  readonly programTitle: string;
  readonly unitName: string;
  readonly topic: string;
  readonly area: string;
  readonly unitType: string;
  readonly duration: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedBy: string;
  readonly updatedAt: string;
}

export interface UploadedFile {
  readonly id: ID;
  readonly name: string;
  readonly size: string;
}

export interface ProgramDetails {
  readonly thumbnailTitle: string;
  readonly thumbnailSubtitle: string;
  readonly thumbnailTags: ReadonlyArray<string>;
  readonly overviewText: string;
  readonly programCode: string;
  readonly duration: string;
  readonly previousSequence: string;
  readonly knowledgeTags: ReadonlyArray<string>;
  readonly competencyImpact: ReadonlyArray<string>;
}

export interface ProgramSource {
  readonly programSme: string;
  readonly department: string;
  readonly division: string;
  readonly businessUnit: string;
}

export interface ClassroomRequirements {
  readonly nominationType: string;
  readonly uploadedFiles: ReadonlyArray<UploadedFile>;
}

export interface ProgramTypes {
  readonly mandatory: string;
  readonly mandatoryTypes: ReadonlyArray<string>;
  readonly mandatorySubtype: string;
  readonly clinicalType: string;
  readonly trainingCategoryType: string;
  readonly contentProviderType: string;
}

export interface UnitValidity {
  readonly hasValidity: string;
  readonly validityMonths: string;
}

export interface CertificationDetails {
  readonly onCompletion: string;
  readonly template: string;
  readonly validityMonths: string;
  readonly signatureImage1: string;
  readonly signatureImage2: string;
  readonly imageOnCertificate: string;
}

export interface TestConfig {
  readonly enabled: string;
  readonly passPercentage: string;
  readonly easyQuestions: string;
  readonly mediumQuestions: string;
  readonly hardQuestions: string;
  readonly duration: string;
}

export interface FlashcardConfig {
  readonly enabled: string;
  readonly passPercentage: string;
  readonly dueAfterDays: string;
  readonly completionPeriodDays: string;
  readonly numberOfRetakes: string;
  readonly easyQuestions: string;
  readonly mediumQuestions: string;
  readonly hardQuestions: string;
}

export interface ProgramOverview {
  readonly details: ProgramDetails;
  readonly source: ProgramSource;
  readonly classroom: ClassroomRequirements;
  readonly types: ProgramTypes;
  readonly validity: UnitValidity;
  readonly certification: CertificationDetails;
  readonly preTest: TestConfig;
  readonly postTest: TestConfig;
  readonly flashcards: FlashcardConfig;
}

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  readonly id: ID;
  readonly order: number;
  readonly text: string;
  readonly type: string;
  readonly difficulty: QuestionDifficulty;
  readonly marks: number;
  readonly options: ReadonlyArray<string>;
  readonly correctAnswer: string;
}

export interface FeedbackItem {
  readonly id: ID;
  readonly order: number;
  readonly question: string;
  readonly responseType: string;
  readonly required: boolean;
}

export type ResponseStatus = 'Completed' | 'In progress' | 'Not started';

export interface LearnerResponse {
  readonly id: ID;
  readonly learnerName: string;
  readonly employeeId: string;
  readonly department: string;
  readonly score: string;
  readonly status: ResponseStatus;
  readonly attempts: number;
  readonly submittedAt: string;
}

export interface FeedbackResponse {
  readonly id: ID;
  readonly learnerName: string;
  readonly employeeId: string;
  readonly rating: string;
  readonly sentiment: 'Positive' | 'Neutral' | 'Negative';
  readonly comment: string;
  readonly submittedAt: string;
}
