import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";

const ResetPasswordPage = () => {
	const [token, setToken] = useState("");
	const [password, setPassword] = useState("");
	const nav = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const tokenFromPath = location.pathname.split("/")[2];
		setToken(tokenFromPath);
	}, [location.pathname]);

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await api().patch(
				`/password/verify-password?token=${token}`,
				{
					password,
				},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);

			nav("/login");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="uk-container uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">
					Password Reset Confirmation
				</h3>
				<form onSubmit={handleFormSubmit}>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="newPassword">
							New Password:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="password"
								id="password"
								placeholder="Enter your new password"
								required
								value={password}
								onChange={handlePasswordChange}
							/>
						</div>
					</div>
					<div className="uk-margin uk-text-center">
						<button className="uk-button uk-button-primary" type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
