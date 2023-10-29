import React, { useState } from "react";
import { api } from "../api/api";

const ModalEditProfile = ({ fetchData, users }) => {
	const [data, setData] = useState(users);

	const editUserData = async () => {
		console.log("masuk");
		try {
			await api().patch(`/user/${users.id}`, data);
			fetchData();
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	return (
		<div>
			<h2>Edit Profile</h2>
			<form>
				<div className="uk-margin">
					<label className="uk-form-label">Name:</label>
					<input
						className="uk-input"
						type="text"
						id="fullname"
						defaultValue={users.fullname}
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
						defaultValue={users.phone_number}
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
						onClick={editUserData}
						type="submit"
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default ModalEditProfile;
