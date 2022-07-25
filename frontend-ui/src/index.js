import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { ProtectedRoute } from "./component/router/protected";
import { Provider } from 'react-redux';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import Register  from './Screens/Register';
import AdminLogin from './Admin/Screens/AdminLogin';
import Dashboard from './Screens/Dashboard';
import NotFound from './Screens/NotFound';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
