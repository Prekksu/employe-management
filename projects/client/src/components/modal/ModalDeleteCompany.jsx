import React, { useEffect, useState } from "react";
import "../../css/Modal.css";
import { api } from "../../api/api";
import UIkit from "uikit";

const ModalDeleteCompany = ({ isOpen, toggleModal }) => {
	const [company, setCompany] = useState([]);
	const [selectedCompanyId, setSelectedCompanyId] = useState("");

	useEffect(() => {
		getCompany();
	}, [isOpen]);

	async function getCompany() {
		const res = await api().get("/company");
		setCompany(res.data);
	}

	async function deleteCompany(companyId) {
		try {
			await api().delete(`/company/${companyId}`);

			getCompany();
			toggleModal();
			UIkit.notification({
				message: "Company deleted successfully!",
				status: "success",
			});
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}

	const handleCompanySelect = (event) => {
		setSelectedCompanyId(event.target.value);
	};

	return (
		isOpen && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h3 className="uk-text-center">Delete Company</h3>
					<div className="uk-margin">
						<label className="uk-form-label">Company</label>
						<select
							className="uk-select"
							id="company_name"
							value={selectedCompanyId}
							onChange={handleCompanySelect}
							required
						>
							<option value="" selected>
								Select a company
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
							onClick={() => deleteCompany(selectedCompanyId)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalDeleteCompany;
