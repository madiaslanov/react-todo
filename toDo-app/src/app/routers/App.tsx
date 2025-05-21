import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePageContainer from "../../components/homePage/homePageContainer.tsx";
import styles from "../style/App.module.css"
import LoginContainer from "../../features/login/loginContainer.tsx";

function App() {

    return (
        <BrowserRouter>
            <div className={styles.content}>
                <Routes>
                    <Route path="/" element={<HomePageContainer/>}/>
                    <Route path="/login" element={<LoginContainer/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
