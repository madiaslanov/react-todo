import {combineReducers} from "@reduxjs/toolkit";
import todosReducer from "../components/to-do/module/todosReducer.ts";


const rootReducer = combineReducers({
    todos: todosReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;