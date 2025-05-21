import ModalWin from "./ui/modalWin.tsx";

export interface ModalWinProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const ModalWinContainer:React.FC<ModalWinProps> = ({active,setActive}) => {
    return (
        <>
        <ModalWin active={active} setActive={setActive}/>
        </>
    )
}
export default ModalWinContainer;