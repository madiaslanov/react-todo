import style from "./todos.module.css";
import { TodosType } from "../../module/todosType.ts";
import React, { useState } from "react";
import dayjs from 'dayjs';


interface TodosProps {
    todo: TodosType;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    editMode: string | null;
    handleTitleChange: (newTitle: string, id: string) => void;
    onClick: (id: string) => void;
}

const Todos: React.FC<TodosProps> = ({ todo, onDelete, onEdit, editMode, handleTitleChange, onClick }) => {
    const [newTitle, setNewTitle] = useState(todo.title);
    const rawDate = todo.addedDate;
    const formatted = dayjs(rawDate).format('DD.MM.YYYY HH:mm');
    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleSave = () => {
        handleTitleChange(newTitle, todo.id);
    };
    const keyDown = (e: React.KeyboardEvent<HTMLInputElement>)  => {
        if (e.key === "Enter") {
            handleSave();
        }
    }

    return (
        <div className={style.todoItem} >
            <div className={style.leftSide} >
                {editMode === todo.id ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={handleTitleInputChange}
                        onKeyDown={keyDown}
                    />
                ) : (
                    <h2 onClick={() => onClick(todo.id)}>{todo.title}</h2>
                )}
                <span>{formatted}</span>
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
