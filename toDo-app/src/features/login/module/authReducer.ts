import {AuthState, AuthTypeResponse} from "./authType.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAuthApi, loginApi, logOutApi} from "../api";
import {TodosType} from "../../../components/homePage/module/todosType.ts";

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}


export const getAuth = createAsyncThunk<AuthTypeResponse, undefined, { rejectValue: string }>(
    "auth/getAuth",
    async (_, {rejectWithValue}) => {
        try {
            const response = await getAuthApi();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const login = createAsyncThunk<
    AuthTypeResponse,
    { email: string; password: string; rememberMe: boolean  },
    { rejectValue: string }
>(
    "auth/login",
    async ({ email, password, rememberMe }, { dispatch, rejectWithValue }) => {
        try {
            const loginResponse = await loginApi(email, password, rememberMe);

            if (loginResponse.resultCode !== 0) {
                return rejectWithValue(loginResponse.messages[0] || "Login failed");
            }

            await dispatch(getAuth());
            return loginResponse;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk<AuthState , undefined, { rejectValue: string }>(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        try {
            const response = await logOutApi();

            if (response.resultCode === 0) {
                return {
                    id: null,
                    email: null,
                    login: null,
                    isAuth: false,
                };
            } else {
                return rejectWithValue("Ошибка при выходе");
            }
        } catch (error) {
            return rejectWithValue("Серверная ошибка при выходе");
        }
    })



const authSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAuth.fulfilled, (state, action) => {
                state.id = action.payload.data.id;
                state.email = action.payload.data.email;
                state.login = action.payload.data.login;
                state.isAuth = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.id = action.payload.data.id;
                state.email = action.payload.data.email;
                state.login = action.payload.data.login;
                state.isAuth = true;
            })
            .addCase(logOut.fulfilled, (state,action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.login = action.payload.login;
            })
            .addCase(getAuth.rejected, (state)=> {
                state.isAuth = false
            })
            .addCase(login.rejected, (state)=> {
                state.isAuth = false
            })
    }
})


export default authSlice.reducer;