import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import style from "./addToDoForm.module.css";
import {UseAppDispatch} from "../../../../services/reactHooks/hooks.ts";
import {postTodos} from "../../module/todosReducer.ts";

type Inputs = {
    title: string;
};

const AddToDoForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
    });
    const dispatch = UseAppDispatch();

    const onSubmit = (data: Inputs) => {
        dispatch(postTodos(data.title))
    };

    return (
        <div className={style.formContainer}>
            <form className={style.formView} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Введи название списка"
                    {...register("title", { required: true })}
                />
                {errors.title && <h3>Ошибка, пустое поле!</h3>}
                <button className={style.addButton} type="submit">
                    Создать Список
                </button>
            </form>
        </div>
    );
};

export default AddToDoForm;
