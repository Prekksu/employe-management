import { Route } from "react-router-dom";
import ProtectedPages from "./ProtectedPages";
import Homepage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const routes = [
	<Route
		path="/"
		element={
			<ProtectedPages needLogin={true}>
				<Homepage />
			</ProtectedPages>
		}
	/>,
	<Route path="/profile" element={<ProfilePage />} />,
	<Route path="/dashboard" element={<DashboardPage />} />,
	<Route
		path="/register"
		element={
			<ProtectedPages needLogin={true}>
				<RegisterPage />
			</ProtectedPages>
		}
	/>,
	<Route
		path="/login"
		element={
			<ProtectedPages needLogin={true}>
				<LoginPage />
			</ProtectedPages>
		}
	/>,
	<Route path="/forgot-password" element={<ForgotPasswordPage />} />,
	<Route path="/reset-password/:token" element={<ResetPasswordPage />} />,
];

export default routes;
