import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './app/routers/App.tsx'
import store from "./store/redux-store.ts";
import {Provider} from "react-redux";
import './index.css';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
