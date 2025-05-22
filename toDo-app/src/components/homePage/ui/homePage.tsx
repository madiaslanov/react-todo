import AddToDoForm from "./addToDoForm/addToDoForm.tsx";
import style from "./homePage.module.css";
import {TodosType} from "../module/todosType.ts";
import Todos from "./todos/todos.tsx";
import {useLocation, useNavigate} from "react-router-dom";


interface HomePageProps {
    todos: TodosType[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    editMode: string | null;
    handleTitleChange: (newTitle: string, id: string) => void;
}


const HomePage: React.FC<HomePageProps> = ({todos, onDelete, onEdit, editMode, handleTitleChange}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = (id: string) => {
        navigate(`/modal/${id}`, {
            state: {backgroundLocation: location},
        });
    }

    return (
        <div>
            <div className={style.homePage}>
                <AddToDoForm todos={todos}/>
                {todos.length > 0 ? (
                    <div className={style.todoList}>
                        {todos.map((todo) => (
                            <Todos
                                todo={todo}
                                key={todo.id}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                editMode={editMode}
                                handleTitleChange={handleTitleChange}
                                onClick={onClick}
                            />

                        ))}
                    </div>
                ) : (
                    <p>Нету Задач</p>
                )}
            </div>
        </div>
    );
};


export default HomePage;
