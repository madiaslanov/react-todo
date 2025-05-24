import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import style from "./addToDoForm.module.css";
import {UseAppDispatch} from "../../../../services/reactHooks/hooks.ts";
import {postTodos} from "../../module/todosReducer.ts";
import {TodosType} from "../../module/todosType.ts";

type Inputs = {
    title: string;
};
interface addFormProps {
    todos: TodosType[];
}

const AddToDoForm: React.FC<addFormProps> = ({todos}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
    });
    const dispatch = UseAppDispatch();

    const onSubmit = (data: Inputs) => {
        if (todos.length !== 10){
            dispatch(postTodos(data.title))
        }
        else{
            console.log('Вы не можете привысить лимит 10 списков!')
        }
        reset();
    };

    return (
        <div className={style.formContainer}>
            <form className={style.formView} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Введи название списка"
                    {...register("title", { required: "Обязательное поле!" , maxLength: {value: 30, message: "Максимальная длина задачи!"}})}
                />
                {errors.title && <h3>{errors.title.message}</h3>}
                <button className={style.addButton} type="submit">
                    Создать Список
                </button>
            </form>
        </div>
    );
};

export default AddToDoForm;
