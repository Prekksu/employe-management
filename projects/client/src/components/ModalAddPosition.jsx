import React, { useState } from "react";
import { api } from "../api/api";

const ModalAddPosition = () => {
	const [position, setPosition] = useState({
		position: "",
	});

	async function addUser() {
		try {
			await api().post("/position", position);
		} catch (error) {
			alert(error.response.data.message);
		}
	}

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setPosition({ ...position, [id]: value });
	};

	return (
		<div>
			<h2>Add Position</h2>
			<form className="uk-form-stacked" onSubmit={addUser}>
				<div className="uk-margin">
					<label className="uk-form-label" htmlFor="position">
						Position Name:
					</label>
					<div className="uk-form-controls">
						<input
							className="uk-input"
							type="text"
							id="position"
							value={position.position}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>
				<div className="uk-margin uk-text-right">
					<button
						className="uk-button uk-button-default uk-margin-right uk-modal-close"
						type="button"
					>
						Cancel
					</button>
					<button className="uk-button uk-button-primary" type="submit">
						Add User
					</button>
				</div>
			</form>
		</div>
	);
};

export default ModalAddPosition;
