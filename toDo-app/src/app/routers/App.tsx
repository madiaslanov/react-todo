import {BrowserRouter} from "react-router-dom";
import HeaderContainer from "../../features/header/headerContainer.tsx";
import HomePageContainer from "../../components/homePage/homePageContainer.tsx";
import styles from "../style/App.module.css"

function App() {

    return (
        <BrowserRouter>
            <div className={styles.content}>
            <HeaderContainer/>
            <HomePageContainer/>
            </div>
        </BrowserRouter>
    )
}

export default App
