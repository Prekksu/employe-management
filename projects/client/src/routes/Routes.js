import { Route } from "react-router-dom";
import ProtectedPages from "./ProtectedPages";
import Homepage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import RestrictedPage from "../pages/redirect/RestrictedPage";
import NotFoundPage from "../pages/redirect/NotFoundPage";

const routes = [
	<Route path="/" element={<Homepage />} />,
	<Route
		path="/profile"
		element={
			<ProtectedPages needLogin={true}>
				<ProfilePage />
			</ProtectedPages>
		}
	/>,
	<Route
		path="/dashboard"
		element={
			<ProtectedPages needLogin={true} needLoginAdmin={true}>
				<DashboardPage />
			</ProtectedPages>
		}
	/>,
	<Route
		path="/register"
		element={
			<ProtectedPages guestOnly={true}>
				<RegisterPage />
			</ProtectedPages>
		}
	/>,
	<Route
		path="/login"
		element={
			<ProtectedPages guestOnly={true}>
				<LoginPage />
			</ProtectedPages>
		}
	/>,
	<Route
		path="/forgot-password"
		element={
			<ProtectedPages guestOnly={true}>
				<ForgotPasswordPage />
			</ProtectedPages>
		}
	/>,
	<Route
		path="/reset-password/:token"
		element={
			<ProtectedPages guestOnly={true}>
				<ResetPasswordPage />
			</ProtectedPages>
		}
	/>,

	<Route path="/not-found" element={<NotFoundPage />}></Route>,
	<Route path="/restricted" element={<RestrictedPage />}></Route>,
];

export default routes;
