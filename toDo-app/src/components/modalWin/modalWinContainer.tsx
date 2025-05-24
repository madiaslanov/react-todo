import ModalWin from "./ui/modalWin.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {UseAppDispatch, UseAppSelector} from "../../services/reactHooks/hooks.ts";
import {deleteTasks, getTasks, postTasks, updateTask} from "./model/modalWinReducer.ts";
import {useForm} from "react-hook-form";

const ModalWinContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [active, setActive] = useState(true);
    const dispatch = UseAppDispatch();
    const taskList = UseAppSelector( (state) => state.tasks.tasks ?? [])
    const {register,handleSubmit, formState: {errors}, reset} = useForm<{ title: string }>()
    const isFetching = UseAppSelector((state)=> state.tasks.isFetching)

    const handleClose = () => {
        setActive(false);
        navigate(-1);
    };
    useEffect(() => {
        if (id != null) {
            dispatch(getTasks(id))
        }
    }, [id, dispatch]);

    const completedTask = ({ todolistId, taskId }: { todolistId: string; taskId: string }) => {
        const task = taskList.find(t => t.id === taskId);
        if (!task || !todolistId) return;

        const newStatus = task.status === 2 ? 0 : 2;

        dispatch(updateTask({
            todolistId,
            id: taskId,
            status: newStatus,
            task
        }));
    };

    const onSubmitTask = (values: { title: string }) => {
        if (id != null && taskList.length < 5) {
            dispatch(postTasks({ title: values.title, todolistId: id }));
            reset()
        }
        else {
            console.log("Max length of task list")
            reset()
        }
    };

    const onDelete = ({ todolistId, taskId }: { todolistId: string; taskId: string }) => {
        dispatch(deleteTasks({todolistId, id: taskId}));
    }


    if (!id) return null;

    return (
        <ModalWin
            active={active}
            setActive={setActive}
            handleClose={handleClose}
            todoId={id}
            onSubmit={handleSubmit(onSubmitTask)}
            register={register}
            errors={errors}
            taskList={taskList}
            completedTask={completedTask}
            onDelete={onDelete}
            isFetching={isFetching}
        />
    );
};

export default ModalWinContainer;
