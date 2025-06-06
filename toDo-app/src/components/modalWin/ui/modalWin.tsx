import {FieldErrors, UseFormRegister} from 'react-hook-form';
import style from './modalWin.module.css'
import ModalWinAddTask from "./modalWinAddTask/modalWinAddTask.tsx";
import {Task} from "../model/modalWinType.ts";


interface ModalWinProps {
    active: boolean;
    setActive: (active: boolean) => void;
    handleClose: () => void;
    todoId?: string;
    onSubmit: () => void;
    register: UseFormRegister<{ title: string }>;
    errors: FieldErrors<{ title: string }>;
    taskList: Task[];
    completedTask: (args: {
        todolistId: string;
        taskId: string;
        completed: boolean;
    }) => void;
    onDelete: (args: {
        todolistId: string
        taskId: string;
    }) => void;
    isFetching: boolean;
}

const ModalWin: React.FC<ModalWinProps> = ({
                                               active,
                                               handleClose,
                                               onSubmit,
                                               register,
                                               errors,
                                               taskList,
                                               completedTask,
                                               todoId,
                                               onDelete,
                                               isFetching
                                           }) => {
    return (
        <div className={`${style.modal} ${active ? style.active : ''}`}
             onClick={handleClose}>
            <div className={style.modal_content} onClick={(e => e.stopPropagation())}>
                <div className={style.btnHolder}>
                    <button className={style.close} onClick={handleClose}></button>
                </div>
                <div className={style.taskBody}>
                    {isFetching ? (
                        <img src='/load.gif' alt="Loading..." />
                    ) : taskList.length > 0 ? (
                        taskList.map((task: Task) => (
                            <div className={`${style.taskElem} ${task.status ? style.active : ''}`} key={task.id}>
                                <div className={style.taskElemLeft}>
                                    <input
                                        type="checkbox"
                                        checked={task.status === 2}
                                        onChange={() => completedTask({
                                            todolistId: todoId!,
                                            taskId: task.id,
                                            completed: task.status !== 2
                                        })}
                                        disabled={isFetching}
                                    />
                                    <p>{task.title}</p>
                                </div>
                                <button
                                    onClick={() => onDelete({ todolistId: todoId!, taskId: task.id })}
                                    disabled={isFetching}
                                ></button>
                            </div>
                        ))
                    ) : (
                        <p className={style.nullTask}>Задачи отсутствуют</p>
                    )}
                </div>

                <div className={style.addTask}>
                    <ModalWinAddTask onSubmit={onSubmit} register={register} errors={errors}/>
                </div>
            </div>
        </div>
    )
}

export default ModalWin;