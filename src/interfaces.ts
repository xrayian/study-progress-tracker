export interface Chapter {
  id: string;
  number: string;
  name: string;
  subject_id: string;
  // progress: number;
  cq: boolean;
  mcq: boolean;
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
