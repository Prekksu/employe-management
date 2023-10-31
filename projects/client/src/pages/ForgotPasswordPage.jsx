import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import UIkit from "uikit";

const ForgotPasswordPage = () => {
	const nav = useNavigate();

	const [userEmail, setUserEmail] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const resetPassword = async () => {
		try {
			await api().post(`/auth/reset-password`, { email: userEmail });
			UIkit.notification({
				message: "Please check your email",
				status: "success",
			});

			nav("/login");
		} catch (error) {
			UIkit.notification({
				message: error.response.data,
				status: "success",
			});
		}
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setUserEmail(value);
		setIsButtonDisabled(value === "");
	};

	return (
		<div className="uk-container uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">Reset Password</h3>
				<div className="uk-margin">
					<label className="uk-form-label" htmlFor="username">
						Email:
					</label>
					<div className="uk-form-controls">
						<input
							className="uk-input"
							type="text"
							id="email"
							placeholder="Enter your email"
							required
							value={userEmail}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="uk-margin uk-text-center">
					<button
						className="uk-button uk-button-primary"
						type="button"
						onClick={resetPassword}
						disabled={isButtonDisabled}
					>
						Submit
					</button>
				</div>
				<div className="uk-text-center">
					Remembered password? Click <a href="/login">Here</a>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
