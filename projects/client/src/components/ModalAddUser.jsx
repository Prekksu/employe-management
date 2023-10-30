import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import { api } from "../api/api";
import UIkit from "uikit";

const ModalAddUser = ({ isOpen, toggleModal, getUser }) => {
	const [userData, setUserData] = useState({
		fullname: "",
		email: "",
		phone_number: "",
		password: "",
		role: "",
		company_id: "",
		position_id: "",
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
			await api().post("/user", userData);
			UIkit.notification({
				message: "User added successfully!",
				status: "success",
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
		const { id, value } = event.target;
		setUserData({ ...userData, [id]: value });
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
								<option>S_ADMIN</option>
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
