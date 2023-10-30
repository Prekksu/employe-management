import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import UIkit from "uikit";

const ChangePasswordPage = () => {
	const user = useSelector((state) => state.auth);
	const [password, setPassword] = useState(user.fullname);
	const [users, setUsers] = useState("");

	console.log(users);

	useEffect(() => {
		fetchData();
	}, []);

	const changePassword = async () => {
		try {
			await api().patch(`/user/${users.id}`, {
				password: password,
			});

			fetchData();
			UIkit.notification({ message: "Password Changed", status: "success" });
		} catch (error) {
			fetchData();
		}
	};

	const fetchData = async () => {
		try {
			const response = await api().get(`/user/${user.id}`);
			setUsers(response.data);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			<Navbar />
			<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
				<div className="uk-card uk-card-default uk-width-1-3@m uk-card-body uk-box-shadow-large">
					<h3>Change Password</h3>
					<div className="uk-margin">
						<label className="uk-form-label">Old Password:</label>
						<input
							className="uk-input"
							type="password"
							id="oldPassword"
							required
						/>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label">New Password:</label>
						<input
							className="uk-input"
							type="password"
							id="newPassword"
							required
						/>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label">Confirm New Password:</label>
						<input
							className="uk-input"
							type="password"
							id="confirmPassword"
							required
						/>
					</div>
					<div className="uk-margin uk-text-right">
						<a href="/profile">
							<button
								className="uk-button uk-button-default uk-margin-right uk-modal-close"
								type="button"
							>
								Cancel
							</button>
						</a>
						<button
							className="uk-button uk-button-primary"
							type="submit"
							onClick={changePassword}
						>
							Change Password
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePasswordPage;
