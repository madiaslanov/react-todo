import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePageContainer from "../../components/homePage/homePageContainer.tsx";
import styles from "../style/App.module.css"
import Login from "../../features/login/ui/login.tsx";

function App() {

    return (
        <BrowserRouter>
            <div className={styles.content}>
                <Routes>
                    <Route path="/" element={ <HomePageContainer/>}/>
                <Route  path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
