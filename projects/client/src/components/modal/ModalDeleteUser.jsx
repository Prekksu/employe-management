import React, { useEffect, useState } from "react";

const ModalDeleteUser = ({ isOpen, toggleModal, deleteUser, val }) => {
	const [confirmationText, setConfirmationText] = useState("");

	useEffect(() => {
		if (!isOpen) {
			setConfirmationText("");
		}
	}, [isOpen]);

	const handleConfirmationTextChange = (event) => {
		setConfirmationText(event.target.value);
	};

	const isDeleteButtonEnabled = confirmationText.trim() === "DELETE";

	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h3 className="uk-text-center">Delete User {val.fullname}?</h3>
					<div className="uk-margin">
						<label className="uk-form-label">Type "DELETE" to confirm:</label>
						<input
							className="uk-input"
							type="text"
							value={confirmationText}
							onChange={handleConfirmationTextChange}
							placeholder="Type 'DELETE' here"
							required
						/>
					</div>
					<div className="uk-margin uk-text-center">
						<button
							className="uk-button uk-button-default uk-margin-right"
							onClick={toggleModal}
						>
							Cancel
						</button>
						<button
							className="uk-button uk-button-danger"
							type="submit"
							onClick={deleteUser}
							disabled={!isDeleteButtonEnabled}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalDeleteUser;
