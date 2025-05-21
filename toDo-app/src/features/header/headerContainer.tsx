import {useEffect} from "react";
import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";
import {getAuth, logOut} from "../login/module/authReducer.ts";
import Header from "./ui/header.tsx";
import {useNavigate} from "react-router-dom";

const HeaderContainer = () => {
    const dispatch = UseAppDispatch();
    const profileData = UseAppSelector((state)=> state.auth.login)
    const countOfTodo = UseAppSelector((state)=> state.todos.todos.length)
    const isAuthToDo = UseAppSelector((state)=> state.auth.isAuth)
    const navigate = useNavigate();


    const logOutEvent = () => {
        dispatch(logOut())
    }

    useEffect(() => {
        dispatch(getAuth());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuthToDo) {
            navigate("/login");
        }
    }, [isAuthToDo, navigate]);


    return (
        <>
            <Header login={profileData} countOfTodo={countOfTodo} isAuthToDo={isAuthToDo} logOutEvent={logOutEvent} />
        </>
    )
}

export default HeaderContainer;
