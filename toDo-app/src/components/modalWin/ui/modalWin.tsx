import style from './modalWin.module.css'
import ModalWinAddTask from "./modalWinAddTask/modalWinAddTask.tsx";

interface ModalWinProps {
    active: boolean;
    setActive: (active: boolean) => void;
    handleClose: () => void;
    todoId: string;
    onSubmit: (values: {title : string}) => void;
}

const ModalWin:React.FC<ModalWinProps> = ({active,handleClose, todoId, onSubmit}) => {

    return (
        <div className={`${style.modal} ${active ? style.active : ''}`}
             onClick={handleClose}>
            <div className={style.modal_content} onClick={(e => e.stopPropagation())}>
                <div className={style.btnHolder}>
                    <button className={style.close} onClick={handleClose}></button>
                </div>
                <div className={style.taskBody}>
                    <p>{todoId}</p>
                </div>

                <div className={style.addTask}>
                    <ModalWinAddTask onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default ModalWin;