import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodosContainer from "../../components/to-do/todosContainer.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/todos" element={<TodosContainer/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
