import {AuthState, AuthTypeResponse} from "./authType.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAuthApi, loginApi, logOutApi} from "../api";

const initialState: AuthState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    messages: []
}


export const getAuth = createAsyncThunk<AuthTypeResponse, undefined, { rejectValue: string }>(
    "auth/getAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAuthApi();
            if (response.resultCode !== 0) {
                return rejectWithValue("Not authorized");
            }
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const login = createAsyncThunk<
    AuthTypeResponse,
    { email: string; password: string; rememberMe: boolean },
    { rejectValue: string }
>(
    "auth/login",
    async ({ email, password, rememberMe }, { dispatch, rejectWithValue }) => {
        try {
            const loginResponse = await loginApi(email, password, rememberMe);

            if (loginResponse.resultCode !== 0) {
                return rejectWithValue(loginResponse.messages[0] || "Login failed");
            }

            const authData = await dispatch(getAuth()).unwrap();

            return authData;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


export const logOut = createAsyncThunk<AuthState , undefined, { rejectValue: string }>(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        try {
            const response: any = await logOutApi();

            if (response.resultCode === 0) {
                return {
                    id: null,
                    email: null,
                    login: null,
                    isAuth: false,
                    messages: []
                };
            } else {
                return rejectWithValue("Ошибка при выходе");
            }
        } catch (error: any) {
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
                state.messages = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.id = action.payload.data.id;
                state.email = action.payload.data.email;
                state.login = action.payload.data.login;
                state.isAuth = true;
                state.messages = null
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isAuth = false;
                state.id = null;
                state.email = null;
                state.login = null;
            })
            .addCase(getAuth.rejected, (state, action) => {
                state.isAuth = false;
                state.id = null;
                state.email = null;
                state.login = null;
                state.messages = action.payload ? [action.payload] : ["Неизвестная ошибка"];
            })

            .addCase(login.rejected, (state, action) => {
                state.isAuth = false;
                state.id = null;
                state.email = null;
                state.login = null;
                state.messages = action.payload ? [action.payload] : ["Неизвестная ошибка"];
            })
    }
})

export default authSlice.reducer;