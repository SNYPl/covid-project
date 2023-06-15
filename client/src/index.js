import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./components/store/loginContext";
import { DataProvider } from "./components/store/dataContext";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <LoginProvider>
        <BrowserRouter>
          <Suspense fallback={<div>...Loading</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </LoginProvider>
    </DataProvider>
  </React.StrictMode>
);
