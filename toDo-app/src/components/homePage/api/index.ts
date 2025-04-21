import {baseUrl} from "../../../services/api";
import {TodosType} from "../module/todosType.ts";

export const getTodosApi = async (): Promise<TodosType[]> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b"
                },
                credentials: "include",
            });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        return data as TodosType[];
    } catch (error) {
        throw new Error(`Ошибка при получении todo-листов: ${(error as Error).message}`);
    }
};

export const postTodosApi = async (title: string): Promise<TodosType> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b"
            },
            credentials: "include",
            body: JSON.stringify({title})
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.data.item as TodosType;
    } catch (error) {
        throw new Error(`Ошибка при создании данных ${(error as Error).message}`);
    }
}

export const deleteTodoApi = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b"
            }
            , credentials: "include",
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;

    }
    catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

export const putTodoApi = async (title: string, id: string): Promise<TodosType> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "API-KEY": "115035e9-7031-4bfd-9b30-39b2a23ede3b",
            }
            , credentials: "include",
            body: JSON.stringify({title})
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw new Error(`Error: ${error}`);
    }
}