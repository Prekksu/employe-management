import { Route } from "react-router-dom";
import Homepage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";

const routes = [
	<Route path="/" element={<Homepage />}></Route>,
	<Route path="/dashboard" element={<DashboardPage />}></Route>,
	<Route path="/profile" element={<ProfilePage />}></Route>,
	<Route path="/login" element={<LoginPage />}></Route>,
	<Route path="/register" element={<RegisterPage />}></Route>,
];

export default routes;
