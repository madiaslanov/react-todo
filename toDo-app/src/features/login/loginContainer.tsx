import Login from "./ui/login.tsx";
import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";
import {login} from "./module/authReducer.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginContainer = () => {
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    const isAuthData = UseAppSelector((state) => state.auth.isAuth)

    const onSubmit = (data: { email: string; password: string }) => {
        dispatch(login(data))
        navigate("/login");
    };

    useEffect(() => {
        if(isAuthData){
            navigate("/");
        }
    },[isAuthData])

    return (
        <>
        <Login onSubmit={onSubmit} />
        </>
    )
}

export default LoginContainer;