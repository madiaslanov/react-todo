import {Route, Routes, useLocation} from "react-router-dom";
import HomePageContainer from "../../components/homePage/homePageContainer.tsx";
import styles from "../style/App.module.css"
import LoginContainer from "../../features/login/loginContainer.tsx";
import ModalWinContainer from "../../components/modalWin/modalWinContainer.tsx";

function App() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
            <div className={styles.content}>
                <Routes location={state?.backgroundLocation || location}>
                    <Route path="/" element={<HomePageContainer />} />
                    <Route path="/login" element={<LoginContainer />} />
                </Routes>

                {state?.backgroundLocation && (
                    <Routes>
                        <Route path="/modal/:id" element={<ModalWinContainer />} />
                    </Routes>
                )}

            </div>
    )
}

export default App
