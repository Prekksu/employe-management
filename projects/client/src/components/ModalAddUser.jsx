import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const ModalAddUser = () => {
	const [userData, setUserData] = useState({
		fullname: "",
		email: "",
		phone_number: "",
		password: "",
		company_id: "",
		position_id: "",
	});
	const [company, setCompany] = useState([]);
	const [position, setPosition] = useState([]);

	useEffect(() => {
		getCompany();
		getPosition();
	}, []);

	const addUser = async () => {
		try {
			await api().post("/user", userData);
			alert("User Added");
		} catch (error) {
			alert(error.response.data.message);
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return (
		<div>
			<h2>Add User</h2>
			<div className="uk-margin">
				<label className="uk-form-label">Fullname:</label>
				<input
					className="uk-input"
					type="text"
					name="fullname"
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
					name="email"
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
					name="phone_number"
					value={userData.phone_number}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className="uk-margin">
				<label className="uk-form-label">Company</label>
				<select
					className="uk-select"
					name="company_id"
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
					name="position_id"
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
					name="password"
					value={userData.password}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className="uk-margin uk-text-right">
				<button
					className="uk-button uk-button-default uk-margin-right uk-modal-close"
					type="button"
				>
					Cancel
				</button>
				<button
					className="uk-button uk-button-primary"
					type="submit"
					onClick={addUser}
				>
					Add User
				</button>
			</div>
		</div>
	);
};

export default ModalAddUser;
