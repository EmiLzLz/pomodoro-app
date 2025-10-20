import type { Tag } from './Tag';

export interface Session {
  id: string;
  duration: number;
  tag: Tag; 
  completedAt?: string;
  type: "work" | "short-break" | "long-break";
  pomodoroCount: number;
}