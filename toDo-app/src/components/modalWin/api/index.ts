import {CreateTaskPayload, Task} from "../model/modalWinType.ts";
import {baseUrl} from "../../../services/api";

export const getTasksApi = async (todolistId: string): Promise<Task[]> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists/${todolistId}/tasks`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b"
            },
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        return data.items ?? [];
    }
    catch (error) {
        console.error('Ошибка при загрузке задач:', error);
        return [];
    }
}



export const postTasksApi = async ({todolistId, title} : CreateTaskPayload) : Promise<Task> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists/${todolistId}/tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b"
                },
                body: JSON.stringify({ title }),
                credentials: "include"
            })
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        return data.data.item as Task;
    }
    catch (error) {
        console.error('Ошибка при посте задач:', error);
        throw error;
    }
}



export const updateTasksApi = async ({ status, todolistId, id, task }: {
    status: number;
    todolistId: string;
    id: string;
    task: Task;
}) : Promise<Task> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists/${todolistId}/tasks/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b"
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                }),
                credentials: "include"
            });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        return data.data.item as Task;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}