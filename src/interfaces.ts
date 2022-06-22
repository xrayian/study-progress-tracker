export interface Chapter {
  id: number;
  number: number;
  name: string;
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
