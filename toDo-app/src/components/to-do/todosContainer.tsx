import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";
import {useEffect} from "react";
import {getTodos} from "./module/todosReducer.ts";
import Todos from "./ui/todos.tsx";

const TodosContainer = () => {
    const dispatch = UseAppDispatch();
    const todoData = UseAppSelector((state) => state.todos)

    useEffect(() => {
        dispatch(getTodos())
    },[dispatch])

    return(
        <div>
            <Todos todoData={todoData}/>
        </div>
    )
}

export default TodosContainer;