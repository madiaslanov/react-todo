import ModalWin from "./ui/modalWin.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {UseAppDispatch} from "../../services/reactHooks/hooks.ts";
import {getTasks, postTasks} from "./model/modalWinReducer.ts";

const ModalWinContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);
    const dispatch = UseAppDispatch();
    const handleClose = () => {
        setActive(false);
        navigate(-1);
    };
    useEffect(() => {
        if (id != null) {
            dispatch(getTasks(id))
        }
    }, [id, dispatch]);

    const onSubmitTask = (values: { title: string }) => {
        if (id != null) {
            dispatch(postTasks({ title: values.title, todolistId: id }));
        }
    };

    if (!id) return null;

    return (
        <ModalWin
            active={active}
            setActive={setActive}
            handleClose={handleClose}
            todoId={id}
            onSubmit={onSubmitTask}
        />
    );
};

export default ModalWinContainer;
