import React, { useEffect, useState } from "react";
import "../../css/Modal.css";
import { api } from "../../api/api";
import UIkit from "uikit";

const ModalDeletePosition = ({ isOpen, toggleModal }) => {
	const [position, setPosition] = useState([]);
	const [selectedPositionId, setSelectedPositionId] = useState("");

	useEffect(() => {
		getPosition();
	}, [isOpen]);

	async function getPosition() {
		const res = await api().get("/position");
		setPosition(res.data);
	}

	async function deletePosition(positionId) {
		try {
			await api().delete(`/position/${positionId}`);

			getPosition();
			toggleModal();
			UIkit.notification({
				message: "Position deleted successfully!",
				status: "success",
			});
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}

	const handlePositionSelect = (event) => {
		setSelectedPositionId(event.target.value);
	};

	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h3 className="uk-text-center">Delete Position</h3>
					<div className="uk-margin">
						<label className="uk-form-label">Position</label>
						<select
							className="uk-select"
							id="position"
							value={selectedPositionId}
							onChange={handlePositionSelect}
							required
						>
							<option value="" selected>
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
							onClick={() => deletePosition(selectedPositionId)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalDeletePosition;
