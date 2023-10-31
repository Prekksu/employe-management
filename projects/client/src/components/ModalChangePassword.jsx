import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import UIkit from "uikit";

const ModalChangePassword = ({ isOpen, toggleModal }) => {
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
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h2>Change Password</h2>
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
						<button
							className="uk-button uk-button-default uk-margin-right"
							onClick={toggleModal}
						>
							Cancel
						</button>
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
		)
	);
};

export default ModalChangePassword;
