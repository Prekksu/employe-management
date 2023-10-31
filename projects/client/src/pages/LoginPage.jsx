import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { useState } from "react";
import UIkit from "uikit";

const LoginPage = () => {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const [userData, setUserData] = useState({
		emailOrPhoneNumber: "",
		password: "",
	});
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleLogin = async () => {
		try {
			const loginResponse = await api().post("/auth/login", userData);
			const token = loginResponse.data.token;
			const userDetailsResponse = await api().get("/auth/getToken", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const userDetails = userDetailsResponse.data;
			localStorage.setItem("auth", JSON.stringify(token));
			dispatch({
				type: "login",
				payload: userDetails,
			});
			UIkit.notification({ message: "Login success", status: "success" });
			nav("/");
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	};

	const handleEmailOrPhoneNumberChange = (e) => {
		const value = e.target.value;
		setUserData({ ...userData, emailOrPhoneNumber: value });
		setIsButtonDisabled(value === "" || userData.password === "");
	};

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setUserData({ ...userData, password: value });
		setIsButtonDisabled(userData.emailOrPhoneNumber === "" || value === "");
	};

	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">Login</h3>
				<form className="uk-form-stacked">
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="username">
							Email / Phone Number:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="text"
								id="username"
								placeholder="Enter your email/phone number"
								value={userData.emailOrPhoneNumber}
								onChange={handleEmailOrPhoneNumberChange}
								required
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="password">
							Password:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="password"
								id="password"
								placeholder="Enter your password"
								value={userData.password}
								onChange={handlePasswordChange}
								required
							/>
						</div>
					</div>
					<p>
						<a href="/forgot-password">Forgot password?</a>
					</p>
					<div className="uk-margin uk-text-center">
						<button
							className="uk-button uk-button-primary"
							type="button"
							onClick={handleLogin}
							disabled={isButtonDisabled}
						>
							Login
						</button>
					</div>
					<div className="uk-text-center">
						Don't have an account? Click <a href="/register">Here</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
