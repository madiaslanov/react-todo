import  {useEffect, useState} from "react";
import {deleteTodos, getTodos, putTodos} from "./module/todosReducer.ts";
import HomePage from "./ui/homePage.tsx";
import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";

const HomePageContainer = () => {
    const dispatch = UseAppDispatch();
    const todoData = UseAppSelector((state) => state.todos.todos);
    const isAuthToDo = UseAppSelector((state) => state.auth.isAuth);

    const [editMode, setEditMode] = useState<string | null>(null);

    const onDelete = async (id: string) => {
        await dispatch(deleteTodos(id));
        dispatch(getTodos());
    };


    const onEdit = (id: string) => {
        setEditMode(id);
    };

    useEffect(() => {
        if (isAuthToDo) {
            dispatch(getTodos());
        }
    }, [dispatch, isAuthToDo]);

    const handleTitleChange = async (newTitle: string, id: string) => {
        await dispatch(putTodos({ title: newTitle, id }));
        await dispatch(getTodos());
        setEditMode(null);
    };

    return (
        <div>
            <HomePage
                todos={todoData}
                onDelete={onDelete}
                onEdit={onEdit}
                editMode={editMode}
                handleTitleChange={handleTitleChange}
            />
        </div>
    );
};

export default HomePageContainer;
