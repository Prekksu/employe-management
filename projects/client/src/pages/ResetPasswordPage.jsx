import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api/api";

const ResetPasswordPage = () => {
	const location = useLocation();
	const nav = useNavigate();
	const [user, setUser] = useState();
	const [token, setToken] = useState();
	const [newPassword, setNewPassword] = useState("");

	const fetchUser = async (data) => {
		try {
			const response = await api().get("/auth/getToken", {
				headers: {
					Authorization: "Bearer " + data,
				},
			});
			setUser(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	async function handlePasswordReset() {
		try {
			await api().patch(
				"/password/verify-password?token=" + token,
				{
					password: newPassword,
				},
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			alert("Password Updated");
			nav("/login");
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const token2 = location.pathname.split("/")[2];
		setToken(token2);
		fetchUser(token2);
	}, [location.pathname]);

	return (
		<div className="uk-container uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">
					Password Reset Confirmation
				</h3>
				<>
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
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className="uk-margin uk-text-center">
						<button
							className="uk-button uk-button-primary"
							type="button"
							onClick={handlePasswordReset}
						>
							Submit
						</button>
					</div>
				</>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
