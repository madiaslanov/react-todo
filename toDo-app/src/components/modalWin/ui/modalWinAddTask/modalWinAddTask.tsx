import style from './modalWinAddTask.module.css'
import {useForm} from "react-hook-form";

interface ModalFormProps {
    onSubmit: (value: { title: string }) => void;
}

const ModalWinAddTask: React.FC<ModalFormProps> = ({onSubmit}) => {
    const {register,handleSubmit, formState: {errors}} = useForm<{ title: string }>()



    return (
            <>
                <div className={style.modalForm}>
                    <form className={style.modalFormStyle} onSubmit={handleSubmit(onSubmit)}>
                        <input placeholder='Введи имя задачи' type="text" {...register('title', { required: true } )} />
                        <button type='submit'>
                            Добавить задачу
                        </button>
                    </form>
                </div>
            </>
    )
}

export default ModalWinAddTask;