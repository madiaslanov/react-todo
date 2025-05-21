import style from './modalWinAddTask.module.css'
import {useForm} from "react-hook-form";

const ModalWinAddTask = () => {
    const {register,handleSubmit, reset, formState: {errors}} = useForm()


    const onSubmit = (values:any) => {

    }
    return (
            <>
                <div className={style.modalForm}>
                    <form className={style.modalFormStyle} onClick={handleSubmit(onSubmit)}>
                        <input placeholder='Введи имя задачи' type="text" {...register('name', { required: true })} />
                        <button type='submit'>
                            Добавить задачу
                        </button>
                    </form>
                </div>
            </>
    )
}

export default ModalWinAddTask;