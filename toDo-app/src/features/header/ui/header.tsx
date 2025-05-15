import styles from './header.module.css';
import {FC} from "react";

interface HeaderProps {
    login: string | null;
    countOfTodo: number | null;
    logOutEvent: () => void;
    isAuthToDo: boolean | null
}

const header: FC<HeaderProps> = ({login, countOfTodo,logOutEvent}) => {
    return (
        <div>
            <div className={styles.headerBox}>
                <h1>To Do List</h1>
                <button onClick={logOutEvent}>Log Out</button>
            </div>
            <div className={styles.headerDescription}>
                <p>Привет, {login}!</p>
                <span>Количество ваших задач: {countOfTodo}</span>
            </div>
        </div>
    )
}

export default header;