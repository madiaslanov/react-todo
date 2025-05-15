import  {useEffect, useState} from "react";
import {deleteTodos, getTodos, putTodos} from "./module/todosReducer.ts";
import HomePage from "./ui/homePage.tsx";
import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";
import {useNavigate} from "react-router-dom";
import {getAuth} from "../../features/login/module/authReducer.ts";
import HeaderContainer from "../../features/header/headerContainer.tsx";

const HomePageContainer = () => {
    const dispatch = UseAppDispatch();
    const todoData = UseAppSelector((state) => state.todos.todos);
    const isAuthToDo = UseAppSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState<string | null>(null);

    const onDelete = async (id: string) => {
        await dispatch(deleteTodos(id));
        dispatch(getTodos());
    };


    const onEdit = (id: string) => {
        setEditMode(id);
    };

    useEffect(() => {
        if(!isAuthToDo){
            navigate("/login");
        }
    }, [dispatch, navigate]);

    const handleTitleChange = async (newTitle: string, id: string) => {
        await dispatch(putTodos({ title: newTitle, id }));
        await dispatch(getTodos());
        setEditMode(null);
    };



    return (
        <div>
            <HeaderContainer/>
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
