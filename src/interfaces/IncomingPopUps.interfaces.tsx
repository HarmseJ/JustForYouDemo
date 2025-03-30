export interface IncomingPopups {
  id: number;
  start_on: string | null
  name: string;
  about: string;
  completed: boolean;
  answers: [] | null;
}