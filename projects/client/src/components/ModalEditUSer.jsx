import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import UIkit from "uikit";

const ModalEditUSer = ({ isOpen, toggleModal, val, getUser }) => {
	const [user, setUser] = useState(val);
	const [position, setPosition] = useState([]);
	const [company, setCompany] = useState([]);
	console.log(user);

	useEffect(() => {
		setUser(val);
		getPosition();
		getCompany();
	}, [val, isOpen]);

	const editUSer = async () => {
		try {
			await api().patch(`/user/admin/${val.id}`, user);

			getUser();
			toggleModal();
			UIkit.notification({
				message: "Company edited successfully!",
				status: "success",
			});
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	};

	async function getPosition() {
		const res = await api().get("/position");
		setPosition(res.data);
	}
	async function getCompany() {
		const res = await api().get("/company");
		setCompany(res.data);
	}

	function inputHandler(e) {
		const { id, value } = e.target;
		const temp = { ...user };
		temp[id] = value;
		setUser(temp);
	}

	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h2>Edit User</h2>
					<div className="uk-margin">
						<label className="uk-form-label">Fullname:</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="text"
								id="fullname"
								defaultValue={val?.fullname}
								onChange={inputHandler}
								required
							/>
						</div>
						<label className="uk-form-label">Email:</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="email"
								id="email"
								defaultValue={val?.email}
								onChange={inputHandler}
								required
							/>
						</div>
						<label className="uk-form-label">Phone Number:</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="text"
								id="phone_number"
								defaultValue={val?.phone_number}
								onChange={inputHandler}
								required
							/>
						</div>
						<label className="uk-form-label">Company</label>
						<select
							className="uk-select"
							id="company_id"
							placeholder="Choose Company"
							defaultValue={val?.company_id}
							onChange={inputHandler}
							required
						>
							{company.length
								? company.map((val) => (
										<option key={val.id} value={val.id}>
											{val.company_name}
										</option>
								  ))
								: null}
						</select>
						<label className="uk-form-label">Position</label>
						<select
							className="uk-select"
							id="position_id"
							placeholder="Choose Position"
							defaultValue={val?.position_id}
							onChange={inputHandler}
							required
						>
							{position.length
								? position.map((val) => (
										<option key={val.id} value={val.id}>
											{val.position}
										</option>
								  ))
								: null}
						</select>
						<label className="uk-form-label">Role</label>
						<select
							className="uk-select"
							id="role"
							placeholder="Choose Role"
							defaultValue={val?.role}
							onChange={inputHandler}
							required
						>
							<option>S_ADMIN</option>
							<option>HR_ADMIN</option>
							<option>EMPLOYE</option>
						</select>

						<div className="uk-margin uk-text-right">
							<button
								className="uk-button uk-button-default uk-margin-right"
								onClick={toggleModal}
							>
								Cancel
							</button>
							<button
								className="uk-button uk-button-primary"
								type="button"
								onClick={editUSer}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalEditUSer;
