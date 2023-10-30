import { Route } from "react-router-dom";
import ProtectedPages from "./ProtectedPages";
import Homepage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

const routes = [
	<Route path="/" element={<Homepage />} />,
	<Route path="/profile" element={<ProfilePage />} />,
	<Route path="/dashboard" element={<DashboardPage />} />,
	<Route path="/register" element={<RegisterPage />} />,
	<Route path="/login" element={<LoginPage />} />,
	<Route path="/change-password" element={<ChangePasswordPage />} />,
	<Route path="/forgot-password" element={<ForgotPasswordPage />} />,
	<Route path="/reset-password/:token" element={<ResetPasswordPage />} />,
];

export default routes;
