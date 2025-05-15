import style from './modalWin.module.css'

const ModalWin = ({active,setActive}) => {
    return (
        <div className={`${style.modal} ${active ? style.active : ''}`} onClick={() => setActive(false)}>
            <div className={style.modal_content} onClick={(e => e.stopPropagation())}>

            </div>
        </div>
    )
}

export default ModalWin;