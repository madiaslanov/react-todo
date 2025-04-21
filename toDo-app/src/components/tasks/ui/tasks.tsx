import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./addToDoForm.module.css";
import {UseAppDispatch} from "../../../services/reactHooks/hooks.ts";
import {postTodos} from "../../homePage/module/todosReducer.ts";

type Inputs = {
    title: string;
    description: string;
    date: Date | null;
};

const Tasks = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            date: null,
        },
    });
    const dispatch = UseAppDispatch();

    const onSubmit = (data: Inputs) => {
        dispatch(postTodos(data))
    };

    return (
        <div className={style.formContainer}>
            <form className={style.formView} onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Введи название задачи"
                    {...register("title", { required: true })}
                />
                {errors.title && <h3>Ошибка, пустое поле!</h3>}

                <textarea
                    placeholder="Добавить Описние"
                    {...register("description", { required: true })}
                />
                {errors.description && <h3>Ошибка, пустое поле!</h3>}

                <Controller
                    control={control}
                    name="date"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DatePicker
                            className={style.datePicker}
                            placeholderText="ДД.ММ.ГГГГ ЧЧ:ММ"
                            showTimeSelect
                            dateFormat="Pp"
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                        />
                    )}
                />
                {errors.date && <h3>Выберите дату и время!</h3>}

                <button className={style.addButton} type="submit">
                    Добавить Задачу
                </button>
            </form>
        </div>
    );
};

export default Tasks;
