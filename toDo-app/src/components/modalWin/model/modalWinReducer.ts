import {CreateTaskPayload, Task, Tasks, UpdateTaskPayload} from "./modalWinType.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteTasksApi, getTasksApi, postTasksApi, updateTasksApi} from "../api";

const initialState: Tasks = {
    tasks: [],
    error: null,
    isFetching: false
}


export const getTasks = createAsyncThunk<Task[], string, { rejectValue: string }>(
    'tasks/getTasks',
    async (id, {rejectWithValue}) => {
        try {
            const response = await getTasksApi(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const postTasks = createAsyncThunk<Task, CreateTaskPayload, { rejectValue: string }>(
    'tasks/postTasks',
    async ({todolistId, title}, {rejectWithValue}) => {
        try {
            const response = await postTasksApi({todolistId, title});
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload, { rejectValue: string }>(
    'tasks/updateTask',
    async ({todolistId, id, status, task}, {rejectWithValue}) => {
        try {
            const response = await updateTasksApi({todolistId, id, status, task});
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTasks = createAsyncThunk<void, { todolistId: string; id: string }, { rejectValue: string }>(
    'tasks/deleteTasks',
    async ({todolistId, id}, {rejectWithValue}) => {
        try {
            const response = await deleteTasksApi({todolistId, id});
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
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
                state.isFetching = false;
            })
            .addCase(getTasks.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка при загрузке';
                state.isFetching = false;
            })
            .addCase(postTasks.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(postTasks.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.isFetching = false;
            })
            .addCase(postTasks.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка при создании задачи';
                state.isFetching = false;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map(task =>
                    task.id === action.payload.id
                        ? {...task, ...action.payload}
                        : task
                );
                state.isFetching = false
            })
            .addCase(updateTask.pending, (state) => {
                state.isFetching = true
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка обновлении'
                state.isFetching = false
            })
            .addCase(deleteTasks.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(deleteTasks.fulfilled, (state, action) => {
                const deletedTaskId = action.meta.arg.id;
                state.tasks = state.tasks.filter(task => task.id !== deletedTaskId);
                state.isFetching = false;
            })
            .addCase(deleteTasks.rejected, (state, action) => {
                state.error = action.payload ?? 'Ошибка при удалении';
                state.isFetching = false;
            })

});

export default tasksSlice.reducer;