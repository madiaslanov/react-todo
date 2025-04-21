import {TodoState, TodosType} from "./todosType.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteTodoApi, getTodosApi, postTodosApi, putTodoApi} from "../api";

const initialState: TodoState = {
    todos: []
}

export const getTodos = createAsyncThunk<TodosType[], void, { rejectValue: string }>(
    'todos/getTodos',
    async (_, {rejectWithValue}) => {
        try {
            const response = await getTodosApi()
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const postTodos = createAsyncThunk<TodosType, string, { rejectValue: string }>(
    'todos/postTodos',
    async (title, {rejectWithValue}) => {
        try {
            const response = await postTodosApi(title)
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)
export const deleteTodos = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodos',
    async (id, {rejectWithValue}) => {
        try {
            await deleteTodoApi(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const putTodos = createAsyncThunk<TodosType, {title: string, id: string}, {rejectValue: string}>(
    'todos/putTodos',
    async ({title, id} : {title: string, id: string}, {rejectWithValue})=>{
        try {
            const response = await putTodoApi(title,id)
            return response
        }
        catch (error: any){
            return rejectWithValue(error.message);
        }
    }
)


const todosSlice = createSlice({
        name: 'todos',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(getTodos.fulfilled, (state, action) => {
                    state.todos = action.payload
                })
                .addCase(postTodos.fulfilled, (state, action) => {
                    state.todos.unshift(action.payload);
                })
                .addCase(deleteTodos.fulfilled, (state, action) => {
                    state.todos = state.todos.filter(todo => todo.id !== action.payload);
                })
                .addCase(putTodos.fulfilled, (state, action) => {
                    const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                    if (index !== -1) {
                        state.todos[index].title = action.payload.title;
                    }
                })
                .addCase(getTodos.rejected, (_, action) => {
                    console.error("Ошибка загрузки todo:", action.payload);
                })
                .addCase(postTodos.rejected, (_, action) => {
                    console.error("Ошибка добавления todo:", action.payload);
                });
        }
    }
)


export default todosSlice.reducer;