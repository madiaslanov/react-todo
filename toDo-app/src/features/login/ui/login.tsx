import {useForm} from "react-hook-form";
import style from "./login.module.css"

interface LoginPage {
    email: string;
    password: string;
}

interface LoginResponse {
    onSubmit: (data: LoginPage) => void;
}


const Login:React.FC<LoginResponse>  = ({onSubmit}) => {
    const {register, handleSubmit } = useForm<LoginPage>();



    return (
        <>
            <div className={style.login}>
                <form className={style.formStyle} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.formElem}>
                    <label>Email</label>
                    <input type="text" {...register('email', {required: true}
                    )} />
                    </div>

                    <div className={style.formElem}>
                        <label>Password</label>
                        <input type="password" {...register('password', {required: true}
                        )}/>
                    </div>

                    <button type="submit">
                    Войти
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;