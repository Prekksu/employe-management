import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { api } from "../../api/api";
import UIkit from "uikit";
import { useLocation } from "react-router-dom";

const ModalChangePassword = ({ isOpen, toggleModal }) => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [token, setToken] = useState("");

	useEffect(() => {
		const storedToken = localStorage.getItem("auth").replace(/"/g, "");
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const handleChangePassword = async () => {
		try {
			if (newPassword !== confirmPassword) {
				UIkit.notification({
					message: "Passwords do not match!",
					status: "danger",
				});
				return;
			}

			const response = await api().patch(
				`/auth/change-password?token=${token}`,
				{
					password: newPassword,
				}
			);

			UIkit.notification({
				message: response.data.message,
				status: response.status === 200 ? "success" : "danger",
			});

			toggleModal();
		} catch (error) {
			console.error("Error changing password: ", error);
			UIkit.notification({
				message: "Failed to change password.",
				status: "danger",
			});
		}
	};

	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h2>Change Password</h2>

					<div className="uk-margin">
						<label className="uk-form-label">New Password:</label>
						<input
							className="uk-input"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label">Confirm New Password:</label>
						<input
							className="uk-input"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<div className="uk-margin uk-text-right">
						<button
							className="uk-button uk-button-default uk-margin-right"
							onClick={toggleModal}
						>
							Cancel
						</button>
						<button
							className="uk-button uk-button-primary"
							onClick={handleChangePassword}
						>
							Change Password
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalChangePassword;
