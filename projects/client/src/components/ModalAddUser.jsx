import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import { api } from "../api/api";
import UIkit from "uikit";
import { useSelector } from "react-redux";

const ModalAddUser = ({ isOpen, toggleModal, getUser }) => {
	const user = useSelector((state) => state.auth);
	const [userData, setUserData] = useState({
		fullname: "",
		email: "",
		phone_number: "",
		password: "",
		role: "",
		company_id: "",
		position_id: "",
		avatar_url: null,
	});
	const [company, setCompany] = useState([]);
	const [position, setPosition] = useState([]);

	useEffect(() => {
		getCompany();
		getPosition();
	}, [isOpen]);

	const addUser = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append("fullname", userData.fullname);
			formData.append("email", userData.email);
			formData.append("phone_number", userData.phone_number);
			formData.append("password", userData.password);
			formData.append("role", userData.role);
			formData.append("company_id", userData.company_id);
			formData.append("position_id", userData.position_id);
			formData.append("userImg", userData.avatar_url);

			await api().post("/user", formData);
			UIkit.notification({
				message: "User added successfully!",
				status: "success",
			});
			setUserData({
				fullname: "",
				email: "",
				phone_number: "",
				password: "",
				role: "",
				company_id: "",
				position_id: "",
				avatar_url: null,
			});
			getUser();
			toggleModal();
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	};

	async function getCompany() {
		const res = await api().get("/company");
		setCompany(res.data);
	}
	async function getPosition() {
		const res = await api().get("/position");
		setPosition(res.data);
	}

	const handleInputChange = (event) => {
		const { id, value, files } = event.target;
		if (id === "avatar_url") {
			setUserData({ ...userData, avatar_url: files[0] }); // Set the avatar file to the state
		} else {
			setUserData({ ...userData, [id]: value });
		}
	};
	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h2>Add User</h2>
					<form onSubmit={addUser}>
						<div className="uk-margin">
							<label className="uk-form-label">Fullname:</label>
							<input
								className="uk-input"
								type="text"
								id="fullname"
								value={userData.fullname}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label">Email:</label>
							<input
								className="uk-input"
								type="email"
								id="email"
								value={userData.email}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label">Phone Number:</label>
							<input
								className="uk-input"
								type="tel"
								id="phone_number"
								value={userData.phone_number}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label">Role</label>
							<select
								className="uk-select"
								id="role"
								value={userData.role}
								onChange={handleInputChange}
								required
							>
								<option value="" disabled>
									Select a role
								</option>
								{user.role !== "S_ADMIN" ? null : <option>S_ADMIN</option>}

								<option>HR_ADMIN</option>
								<option>EMPLOYE</option>
							</select>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label">Company</label>
							<select
								className="uk-select"
								id="company_id"
								value={userData.company_id}
								onChange={handleInputChange}
								required
							>
								<option value="" disabled>
									Select a position
								</option>
								{company.length
									? company.map((val) => (
											<option key={val.id} value={val.id}>
												{val.company_name}
											</option>
									  ))
									: null}
							</select>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label">Position</label>
							<select
								className="uk-select"
								id="position_id"
								value={userData.position_id}
								onChange={handleInputChange}
								required
							>
								<option value="" disabled>
									Select a position
								</option>
								{position.length
									? position.map((val) => (
											<option key={val.id} value={val.id}>
												{val.position}
											</option>
									  ))
									: null}
							</select>
						</div>
						<div className="uk-margin">
							<label className="uk-form-label">Password</label>
							<input
								className="uk-input"
								type="password"
								id="password"
								value={userData.password}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="uk-margin">
							<input
								type="file"
								id="avatar_url"
								onChange={handleInputChange}
								accept="image/*"
							/>
						</div>
						<div className="uk-margin uk-text-right">
							<button
								className="uk-button uk-button-default uk-margin-right"
								onClick={toggleModal}
							>
								CLOSE
							</button>
							<button className="uk-button uk-button-primary" type="submit">
								Add User
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
};

export default ModalAddUser;
