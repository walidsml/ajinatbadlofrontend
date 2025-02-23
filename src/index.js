import React from 'react';
import  {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserService from './services/UserService';
import {BrowserRouter} from "react-router-dom";



// const renderApp = () => createRoot(document.getElementById("app")).render(<App />);

const renderApp = () => {
    createRoot(document.getElementById("app")).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

UserService.initKeycloak(renderApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
