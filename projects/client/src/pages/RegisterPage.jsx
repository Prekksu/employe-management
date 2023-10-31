import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import UIkit from "uikit";

const RegisterPage = () => {
	const nav = useNavigate();

	const [userData, setUserData] = useState({
		fullname: "",
		email: "",
		phone_number: "",
		password: "",
	});

	const isFormValid = () => {
		return Object.values(userData).every((value) => value.trim() !== "");
	};

	async function addUser() {
		try {
			await api().post("/auth", userData);
			nav("/login");
			UIkit.notification({ message: "Register success", status: "success" });
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setUserData({ ...userData, [id]: value });
	};

	const handleSubmit = () => {
		if (isFormValid()) {
			addUser();
		} else {
			alert("Please fill out all fields.");
		}
	};
	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">Register</h3>
				<form className="uk-form-stacked">
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="fullname">
							Full Name:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="text"
								id="fullname"
								placeholder="Enter your full name"
								value={userData.fullname}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="email">
							Email:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="email"
								id="email"
								placeholder="Enter your email"
								value={userData.email}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="phone">
							Phone Number:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="tel"
								id="phone_number"
								placeholder="Enter your phone number"
								value={userData.phone_number}
								onChange={handleInputChange}
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
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>
					<div className="uk-margin uk-text-center">
						<button
							className="uk-button uk-button-primary"
							type="button"
							onClick={handleSubmit}
							disabled={!isFormValid()}
						>
							Register
						</button>
					</div>
					<div className="uk-text-center">
						Already have account? Click <a href="/login">Here</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
