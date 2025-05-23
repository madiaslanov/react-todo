import style from './modalWinAddTask.module.css'
import {FieldErrors, UseFormRegister} from "react-hook-form";


interface ModalFormProps {
    onSubmit: () => void;
    register: UseFormRegister<{ title: string }>;
    errors: FieldErrors<{ title: string }>;
}

const ModalWinAddTask: React.FC<ModalFormProps> = ({ onSubmit, register }) => {


    return (
            <>
                <div className={style.modalForm}>
                    <form className={style.modalFormStyle} onSubmit={onSubmit}>
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