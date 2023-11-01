import React, { useEffect, useState } from "react";
import "../../css/Modal.css";
import { api } from "../../api/api";
import UIkit from "uikit";

const ModalCompany = ({ isOpen, toggleModal }) => {
	const [company, setCompany] = useState({
		company_name: "",
	});
	const [allCompany, setAllCompany] = useState([]);
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [data, setData] = useState({});
	const [activeTab, setActiveTab] = useState("addCompany");

	useEffect(() => {
		getCompany();
	}, [isOpen]);

	useEffect(() => {
		getCompanyById();
	}, [selectedCompany]);

	async function getCompanyById() {
		if (selectedCompany) {
			const res = await api().get(`/company/${selectedCompany}`);
			setData(res.data);
		}
	}

	async function getCompany() {
		const res = await api().get("/company");
		setAllCompany(res.data);
	}

	async function addCompany() {
		try {
			await api().post("/company", company);
			UIkit.notification({
				message: "Company added successfully!",
				status: "success",
			});
			setCompany({
				company_name: "",
			});
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}

	async function editCompany() {
		try {
			await api().patch(`/company/${selectedCompany}`, data);

			getCompany();
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
	}

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setCompany({ ...company, [id]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		addCompany();
		toggleModal();
	};

	const handleCompanySelect = (event) => {
		setSelectedCompany(event.target.value);
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "addCompany":
				return (
					<div className="tab-content">
						<form onSubmit={handleSubmit}>
							<div className="uk-margin">
								<label className="uk-form-label" htmlFor="company">
									Company Name:
								</label>
								<div className="uk-form-controls">
									<input
										className="uk-input"
										type="text"
										id="company_name"
										value={company.company_name}
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
			case "editCompany":
				return (
					<div className="tab-content">
						<div className="uk-margin">
							<label className="uk-form-label">Company</label>
							<select
								className="uk-select"
								id="company_name"
								placeholder="Choose Company"
								onChange={handleCompanySelect}
								required
							>
								<option value="" disabled>
									Select a company
								</option>
								{allCompany.length
									? allCompany.map((val) => (
											<option key={val.id} value={val.id}>
												{val.company_name}
											</option>
									  ))
									: null}
							</select>
							<label className="uk-form-label" htmlFor="company_name">
								Company Name:
							</label>
							<div className="uk-form-controls">
								<input
									className="uk-input"
									type="text"
									id="company_name"
									defaultValue={data.company_name}
									onChange={(e) =>
										setData({ ...data, company_name: e.target.value })
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
									onClick={editCompany}
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
							<li className={activeTab === "addCompany" ? "uk-active" : ""}>
								<a href="#" onClick={() => handleTabClick("addCompany")}>
									Add Company
								</a>
							</li>
							<li className={activeTab === "editCompany" ? "uk-active" : ""}>
								<a href="#" onClick={() => handleTabClick("editCompany")}>
									Edit Company
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

export default ModalCompany;
