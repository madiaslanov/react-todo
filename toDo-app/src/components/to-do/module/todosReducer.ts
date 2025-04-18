import {TodoState, TodosType} from "./todosType.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTodosApi, postTodosApi} from "../api";

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