import styles from './header.module.css';
import { FC, useState } from 'react';

interface HeaderProps {
    login: string | null;
    countOfTodo: number | null;
    logOutEvent: () => void;
    isAuthToDo: boolean | null;
}

const Header: FC<HeaderProps> = ({ login, countOfTodo, logOutEvent }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <div className={styles.headerBox}>
                <h1>To Do List</h1>
                <button onClick={logOutEvent}>Выйти</button>
                <div className={styles.menuIcon} onClick={toggleMenu}>
                    <img src="/menu-icon.png" alt="Меню" />
                </div>
            </div>

            <div className={styles.headerDescription}>
                <p>Привет, {login}!</p>
                <span>Количество ваших списков: {countOfTodo}</span>
            </div>

            {menuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}


            <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <img className={styles.close} onClick={toggleMenu} src="/close.png" alt=""/>
                <ul>
                    <li><a href="#" onClick={logOutEvent}>Выйти</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
