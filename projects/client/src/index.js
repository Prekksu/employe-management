import React from "react";
import ReactDOM from "react-dom/client";
import "uikit/dist/css/uikit.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/store";
import thunk from "redux-thunk";
import AuthProvider from "./hoc/authProvider";

UIkit.use(Icons);

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
