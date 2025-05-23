import {CreateTaskPayload, Task, Tasks, UpdateTaskPayload} from "./modalWinType.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTasksApi, postTasksApi, updateTasksApi} from "../api";

const initialState: Tasks = {
    tasks: [],
    error: null,
    isFetching: false
}


export const getTasks = createAsyncThunk<Task[], string, { rejectValue: string }>(
    'tasks/getTasks',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getTasksApi(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const postTasks = createAsyncThunk<Task, CreateTaskPayload, {rejectValue: string}>(
    'tasks/postTasks',
    async ({todolistId, title}, {rejectWithValue}) => {
        try {
            const response = await postTasksApi({todolistId, title});
            return response;
        }
        catch (error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload, {rejectValue: string}>(
    'tasks/updateTask',
    async ({todolistId,id, status, task}, {rejectWithValue}) => {
        try{
            const response = await updateTasksApi({todolistId,id,status, task});
            return response;
        }
        catch (error : any){
            return rejectWithValue(error.message);
        }
    }

)


const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка при загрузке';
            })
            .addCase(postTasks.fulfilled, (state, action)=> {
                state.tasks.push(action.payload)
            })
            .addCase(postTasks.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка при посте'
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task =>
                    task.id === action.payload.id
                        ? { ...task, ...action.payload }
                        : task
                );
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка обновлении'
            })
});

export default tasksSlice.reducer;