export interface TodosType {
    id: string;
    addedDate: number;
    order: number;
    title: string;
}


export interface TodoState {
    todos: TodosType[];
}