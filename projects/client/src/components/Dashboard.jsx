import React, { useEffect, useRef, useState } from "react";
import "../css/Modal.css";
import { api } from "../api/api";
import UserList from "./UserList";
import ModalAddUser from "./ModalAddUser";
import ModalPosition from "./ModalPosition";
import ModalCompany from "./ModalCompany";
import ModalDeletePosition from "./ModalDeletePosition";
import ModalDeleteCompany from "./ModalDeleteCompany";
import Pagination from "./Pagination";
import UIkit from "uikit";

const Dashboard = () => {
	const inputFileRef = useRef(null);
	const [user, setUser] = useState([]);
	const [addUserModal, setAddUserModal] = useState(false);
	const [positionModal, setPositionModal] = useState(false);
	const [companyModal, setCompanyModal] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState("");
	const [selectedCompany, setSelectedCompany] = useState("");
	const [sort, setSort] = useState("");
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [deletePositionModal, setDeletePositionModal] = useState(false);
	const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
	const [company, setCompany] = useState([]);
	const [position, setPosition] = useState([]);

	const toggleAddUserModal = () => {
		setAddUserModal(!addUserModal);
	};

	const togglePositionModal = () => {
		setPositionModal(!positionModal);
	};
	const toggleCompanyModal = () => {
		setCompanyModal(!companyModal);
	};
	const toggleDeletePositionModal = () => {
		setDeletePositionModal(!deletePositionModal);
	};
	const toggleDeleteCompanyModal = () => {
		setDeleteCompanyModal(!deleteCompanyModal);
	};

	useEffect(() => {
		getUser();
		getCompany();
		getPosition();
	}, [page, sort, search, selectedPosition, selectedCompany]);

	const getUser = async () => {
		try {
			const res = await api().get(`/user`, {
				params: {
					position_id: selectedPosition,
					company_id: selectedCompany,
					search: search,
					sort: sort,
					page: page,
				},
			});
			setUser(res.data.rows);
			setTotalPage(Math.ceil(res.data.count / 5));
		} catch (error) {
			alert(error);
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

	const handleSortChange = (sortOrder) => {
		if (sortOrder === sort) {
			setSort(
				sortOrder.includes("Asc")
					? sortOrder.replace("Asc", "Desc")
					: sortOrder.replace("Desc", "Asc")
			);
		} else {
			setSort(sortOrder);
		}
		setPage(1);
	};

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			setPage(newPage);
		}
	};

	return (
		<div
			style={{
				maxWidth: "1400",
			}}
		>
			<div className="uk-flex uk-flex-middle uk-margin-bottom ">
				<div className="uk-flex uk-flex-middle uk-margin-right uk-search uk-search-default">
					<input
						className="uk-search-input uk-search uk-search-default"
						type="text"
						placeholder="Search..."
						ref={inputFileRef}
					/>
					<div
						uk-icon="icon:  search"
						onClick={() => {
							setPage(1);
							setSearch(inputFileRef.current.value);
						}}
						style={{ cursor: "pointer" }}
					/>
				</div>
				<div class="uk-margin" className="uk-margin-right">
					<div uk-form-custom="target: > * > span:first-child">
						<select
							aria-label="Custom controls"
							value={selectedCompany}
							onChange={(event) => {
								setPage(1);
								setSelectedCompany(event.target.value);
							}}
						>
							<option value="">Please company...</option>
							{company.length
								? company.map((val) => (
										<option key={val.id} value={val.id}>
											{val.company_name}
										</option>
								  ))
								: null}
						</select>
						<button
							class="uk-button uk-button-default"
							type="button"
							tabindex="-1"
						>
							<span></span>
							<span uk-icon="icon: chevron-down"></span>
						</button>
					</div>
				</div>
				<div class="uk-margin" className="uk-margin-right">
					<div uk-form-custom="target: > * > span:first-child">
						<select
							aria-label="Custom controls"
							value={selectedPosition}
							onChange={(event) => {
								setPage(1);
								setSelectedPosition(event.target.value);
							}}
						>
							<option value="">Please position...</option>
							{position.length
								? position.map((val) => (
										<option key={val.id} value={val.id}>
											{val.position}
										</option>
								  ))
								: null}
						</select>
						<button
							class="uk-button uk-button-default"
							type="button"
							tabindex="-1"
						>
							<span></span>
							<span uk-icon="icon: chevron-down"></span>
						</button>
					</div>
				</div>
				<div>
					<ul className="uk-subnav" uk-margin>
						<li>
							<a href>
								<span uk-icon="icon:  plus"></span>
							</a>
							<div uk-dropdown="mode: click">
								<ul class="uk-nav uk-dropdown-nav">
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={toggleAddUserModal}
										>
											Add User
										</div>
									</li>
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={togglePositionModal}
										>
											Add / Edit Position
										</div>
									</li>
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={toggleCompanyModal}
										>
											Add / Edit Company
										</div>
									</li>
								</ul>
							</div>
						</li>

						<li>
							<a href>
								<span uk-icon="icon:  trash"></span>
							</a>
							<div uk-dropdown="mode: click">
								<ul class="uk-nav uk-dropdown-nav">
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={toggleDeletePositionModal}
										>
											Delete Position
										</div>
									</li>
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={toggleDeleteCompanyModal}
										>
											Delete Company
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="uk-child-width-expand@s" uk-grid="true">
				<div>
					<h4
						onClick={() =>
							handleSortChange(
								"fullname" + (sort === "fullnameAsc" ? "Desc" : "Asc")
							)
						}
					>
						Fullname
						{sort === "fullnameAsc" ? sort === "fullnameDesc" : null}
					</h4>
				</div>

				<div>
					<h4
						onClick={() =>
							handleSortChange("email" + (sort === "emailAsc" ? "Desc" : "Asc"))
						}
					>
						Email
						{sort === "emailAsc" ? sort === "emailDesc" : null}
					</h4>
				</div>

				<div>
					<h4
						onClick={() =>
							handleSortChange(
								"phone_number" + (sort === "phone_numberAsc" ? "Desc" : "Asc")
							)
						}
					>
						Phone Number
						{sort === "phone_numberAsc" ? sort === "phone_numberDesc" : null}
					</h4>
				</div>

				<div>
					<h4
						onClick={() =>
							handleSortChange(
								"company" + (sort === "companyAsc" ? "Desc" : "Asc")
							)
						}
					>
						Company
						{sort === "companyAsc" ? sort === "companyDesc" : null}
					</h4>
				</div>

				<div>
					<h4
						onClick={() =>
							handleSortChange(
								"position" + (sort === "positionAsc" ? "Desc" : "Asc")
							)
						}
					>
						Position
						{sort === "positionAsc" ? sort === "positionDesc" : null}
					</h4>
				</div>
				<div>
					<h4>Manage User</h4>
				</div>
			</div>
			{user.map((val) => {
				return <UserList val={val} getUser={getUser} />;
			})}
			<div className="uk-flex uk-flex-center uk-margin-top">
				<Pagination
					currentPage={page}
					totalPage={totalPage}
					onPageChange={handlePageChange}
				/>
			</div>
			<ModalAddUser
				isOpen={addUserModal}
				toggleModal={toggleAddUserModal}
				getUser={getUser}
			/>
			<ModalPosition isOpen={positionModal} toggleModal={togglePositionModal} />
			<ModalCompany isOpen={companyModal} toggleModal={toggleCompanyModal} />
			<ModalDeletePosition
				isOpen={deletePositionModal}
				toggleModal={toggleDeletePositionModal}
			/>
			<ModalDeleteCompany
				isOpen={deleteCompanyModal}
				toggleModal={toggleDeleteCompanyModal}
			/>
		</div>
	);
};

export default Dashboard;
