import { baseUrl } from "../../../services/api";
import {TodosType} from "../module/todosType.ts";

export const getTodosApi = async (): Promise<TodosType[]> => {
    try {
        const response = await fetch(`${baseUrl}/todo-lists`);

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
        const response = await fetch(`${baseUrl}/todo-lists`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title })
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data as TodosType;
    }
    catch (error) {
        throw new Error(`Ошибка при создании данных ${(error as Error).message}`);
    }
}