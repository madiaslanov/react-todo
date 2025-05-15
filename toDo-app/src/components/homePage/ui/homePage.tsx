import AddToDoForm from "./addToDoForm/addToDoForm.tsx";
import style from "./homePage.module.css";
import {TodosType} from "../module/todosType.ts";
import Todos from "./todos/todos.tsx";
import ModalWin from "../../modalWin/modalWin.tsx";
import {useState} from "react";


interface HomePageProps {
    todos: TodosType[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    editMode: string | null;
    handleTitleChange: (newTitle: string, id: string) => void;
}



const HomePage: React.FC<HomePageProps> = ({ todos, onDelete, onEdit, editMode, handleTitleChange }) => {

    const [modalActive, setModalActive]= useState(false);

    return (
        <div>
            <div className={style.homePage}>
                <AddToDoForm todos={todos} />
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
                                onClick={ () =>  setModalActive(true)}
                            />

                        ))}
                        <ModalWin active={modalActive} setActive={setModalActive}/>
                    </div>
                ) : (
                    <p>Нету Задач</p>
                )}
            </div>
        </div>
    );
};



export default HomePage;
