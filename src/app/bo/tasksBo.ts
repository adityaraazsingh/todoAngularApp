export interface TaskDetails{
    id: number;
    userId: number;
    title: string;
    description: string;
    date?: string;
    completed: boolean;
}