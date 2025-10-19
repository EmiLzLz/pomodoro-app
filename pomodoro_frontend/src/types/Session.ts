import type { Tag } from './Tag';

export interface Session {
  id: string;
  duration: number;
  tag: Tag;  // ← Cambio: de string a Tag completo
  completedAt: string;
  type: "work" | "short-break" | "long-break";
  pomodoroCount: number;
}