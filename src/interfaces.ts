export interface Chapter {
  id: number;
  number: number;
  name: string;
  subject_id: number;
  progress: number;
  cq: boolean;
  mcq: boolean;
}

export interface Subject {
  id: number;
  name: string;
  slug: string;
  group: string;
}
