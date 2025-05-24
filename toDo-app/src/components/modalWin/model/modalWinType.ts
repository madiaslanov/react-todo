
export interface Task{
    id: string;
    title: string;
    completed?: boolean;
    todolistId: string;
    description?: (string)
    status: number;
    priority?: (number);
    startDate?: (number);
    deadline?: number;
}

export interface Tasks {
    tasks: Task[];
    error: string | null;
    isFetching: boolean;
}

export interface CreateTaskPayload {
    todolistId: string;
    title: string;
}

export interface UpdateTaskPayload {
    todolistId : string;
    status : number;
    id: string;
    task: Task;
}