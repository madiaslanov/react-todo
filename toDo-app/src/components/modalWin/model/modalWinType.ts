
export interface Task{
    id: string;
    title: string;
    completed: boolean;
    todoListId: string;
    addedDate: number;
}

export interface Tasks {
    tasks: Task[];
    error: string | null;
}

export interface CreateTaskPayload {
    todolistId: string;
    title: string;
}