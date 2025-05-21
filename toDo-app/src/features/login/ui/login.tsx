import {useForm} from "react-hook-form";
import style from "./login.module.css"

interface LoginPage {
    email: string;
    password: string;
    rememberMe: boolean;
}

interface LoginResponse {
    onSubmit: (data: LoginPage) => void;
    messages: string[] | null;
}


const Login:React.FC<LoginResponse>  = ({onSubmit, messages}) => {
    const {register, handleSubmit, formState:{errors}} = useForm<LoginPage>();



    return (
        <>
            <div className={style.login}>
                <form className={style.formStyle} onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <div className={style.formElem}>
                        <input type="text" placeholder='Введите почту...' {...register('email', {required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email адрес"
                            }},
                        )} />
                        {errors.email && (<span>{errors.email.message}</span>)}
                    </div>

                    <div className={style.formElem}>
                        <input
                            type="password"
                            placeholder="Введите пароль..."
                            {...register("password", {
                                required: "Пароль обязателен",
                                maxLength: {
                                    value: 20,
                                    message: "Максимум 20 символов"
                                }
                            })}
                        />
                        {errors.password && (<span>{errors.password.message}</span>)}
                    </div>

                    <button className={style.btn} type="submit">
                        Войти
                    </button>
                    {messages?.length ? <p>{messages}</p> : null}
                    <h3>
                        Test-email: free@samuraijs.com <br/>
                        Test-password: free
                    </h3>
                    <a href="https://social-network.samuraijs.com/signUp" target="_blank" rel="noopener noreferrer">
                        Зарегистрироваться
                    </a>
                </form>
            </div>
        </>
    )
}

export default Login;