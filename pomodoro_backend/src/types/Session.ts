export default interface Session{
    id: string,
    duration: number,
    tag: string,
    completedAt: string,
    type: "work" | "short-break" | "long-break",
    pomodoroCount: number;
}