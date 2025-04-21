import {useEffect} from "react";
import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";
import {getAuth} from "../login/module/authReducer.ts";
import Header from "./ui/header.tsx";

const HeaderContainer = () => {
    const dispatch = UseAppDispatch();
    const profileData = UseAppSelector((state)=> state.auth.login)
    const countOfTodo = UseAppSelector((state)=> state.todos.todos.length)
    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch]);



    return (
        <>
            <Header login={profileData} countOfTodo={countOfTodo} />
        </>
    )
}

export default HeaderContainer;
