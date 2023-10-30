import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import { api } from "../api/api";
import UIkit from "uikit";

const ModalPosition = ({ isOpen, toggleModal }) => {
	const [position, setPosition] = useState({
		position: "",
	});
	const [allPosition, setAllPosition] = useState([]);
	const [selectedPosition, setSelectedPosition] = useState(null);
	const [data, setData] = useState({});
	const [activeTab, setActiveTab] = useState("addPosition");

	useEffect(() => {
		getPosition();
	}, [isOpen]);

	useEffect(() => {
		getCategoryById();
	}, [selectedPosition]);

	async function getCategoryById() {
		if (selectedPosition) {
			const res = await api().get(`/position/${selectedPosition}`);
			setData(res.data);
		}
	}

	async function getPosition() {
		const res = await api().get("/position");
		setAllPosition(res.data);
	}

	async function addPosition() {
		try {
			await api().post("/position", position);
			UIkit.notification({
				message: "Position added successfully!",
				status: "success",
			});
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}

	async function editPosition() {
		try {
			await api().patch(`/position/${selectedPosition}`, data);

			getPosition();
			toggleModal();
			UIkit.notification({
				message: "Position edited successfully!",
				status: "success",
			});
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setPosition({ ...position, [id]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		addPosition();
		toggleModal();
	};

	const handlePositionSelect = (event) => {
		setSelectedPosition(event.target.value);
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "addPosition":
				return (
					<div className="tab-content">
						<form onSubmit={handleSubmit}>
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
				);
			case "editPosition":
				return (
					<div className="tab-content">
						<div className="uk-margin">
							<label className="uk-form-label">Position</label>
							<select
								className="uk-select"
								id="position"
								placeholder="Choose Category"
								onChange={handlePositionSelect}
								required
							>
								<option value="" disabled>
									Select a position
								</option>
								{allPosition.length
									? allPosition.map((val) => (
											<option key={val.id} value={val.id}>
												{val.position}
											</option>
									  ))
									: null}
							</select>
							<label className="uk-form-label" htmlFor="position">
								Position Name:
							</label>
							<div className="uk-form-controls">
								<input
									className="uk-input"
									type="text"
									id="position"
									defaultValue={data.position}
									onChange={(e) =>
										setData({ ...data, position: e.target.value })
									}
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
									type="button"
									onClick={editPosition}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<div className="uk-margin-medium-top">
						<ul className="uk-flex-center" uk-tab="true">
							<li className={activeTab === "addPosition" ? "uk-active" : ""}>
								<a href="#" onClick={() => handleTabClick("addPosition")}>
									Add Position
								</a>
							</li>
							<li className={activeTab === "editPosition" ? "uk-active" : ""}>
								<a href="#" onClick={() => handleTabClick("editPosition")}>
									Edit Position
								</a>
							</li>
						</ul>
					</div>
					{renderTabContent()}
				</div>
			</div>
		)
	);
};

export default ModalPosition;
