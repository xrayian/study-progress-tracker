export interface Chapter {
  id: string;
  number: string;
  name: string;
  subject_id: string;
  cq: boolean;
  mcq: boolean;
  planned: boolean;
}

export interface User {
  id: string;
  authToken: string;
  name: string;
  email: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  group: string;
}

export interface SubjectDashboardData {
  id: string;
  chapters: number;
  planned: number;
  cqFinished: number;
  mcqFinished: number;
}
