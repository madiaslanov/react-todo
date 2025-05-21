import style from './modalWin.module.css'
import {ModalWinProps} from "../modalWinContainer.tsx";
import ModalWinAddTask from "./modalWinAddTask/modalWinAddTask.tsx";
import {useNavigate} from "react-router-dom";



const ModalWin:React.FC<ModalWinProps> = ({active,setActive}) => {
    const navigate = useNavigate();
    const handleClose = () => {
        setActive(false);
        navigate(-1);
    };

    return (
        <div className={`${style.modal} ${active ? style.active : ''}`} onClick={() => setActive(false)}>
            <div className={style.modal_content} onClick={(e => e.stopPropagation())}>
                <div>
                    <button onClick={handleClose}>Закрыть</button>
                </div>

                <div className={style.addTask}>
                    <ModalWinAddTask/>
                </div>
            </div>
        </div>
    )
}

export default ModalWin;