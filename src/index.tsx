// src/index.tsx
import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import './custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

document.body.setAttribute('dir', 'rtl');

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
reportWebVitals();
