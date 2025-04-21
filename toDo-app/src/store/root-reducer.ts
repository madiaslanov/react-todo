import {combineReducers} from "@reduxjs/toolkit";
import todosReducer from "../components/homePage/module/todosReducer.ts";
import authReducer from "../features/login/module/authReducer.ts";


const rootReducer = combineReducers({
    todos: todosReducer,
    auth: authReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;