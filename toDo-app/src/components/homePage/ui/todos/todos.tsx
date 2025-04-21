import style from "./todos.module.css";
import { TodosType } from "../../module/todosType.ts";
import React, { useState } from "react";



interface TodosProps {
    todo: TodosType;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    editMode: string | null;
    handleTitleChange: (newTitle: string, id: string) => void;
}

const Todos: React.FC<TodosProps> = ({ todo, onDelete, onEdit, editMode, handleTitleChange }) => {
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleSave = () => {
        handleTitleChange(newTitle, todo.id);
    };

    return (
        <div className={style.todoItem}>
            <div className={style.leftSide}>
                {editMode === todo.id ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={handleTitleInputChange}
                    />
                ) : (
                    <h2>{todo.title}</h2>
                )}
                <span>{todo.addedDate}</span>
            </div>
            <div className={style.rightSide}>
                <button onClick={() => onDelete(todo.id)}><i className="bx bx-trash"></i></button>
                {editMode === todo.id ? (
                    <button onClick={handleSave}><i className="bx bx-save"></i></button>
                ) : (
                    <button onClick={() => onEdit(todo.id)}><i className="bx bx-edit"></i></button>
                )}
            </div>
        </div>
    );
};

export default React.memo(Todos);
