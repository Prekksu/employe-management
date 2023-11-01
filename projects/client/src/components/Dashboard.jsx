import React, { useEffect, useRef, useState } from "react";
import "../css/Modal.css";
import { api } from "../api/api";
import UserList from "./UserList";
import ModalAddUser from "./modal/ModalAddUser";
import ModalPosition from "./modal/ModalPosition";
import ModalCompany from "./modal/ModalCompany";
import ModalDeletePosition from "./modal/ModalDeletePosition";
import ModalDeleteCompany from "./modal/ModalDeleteCompany";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import GridTitle from "./GridTitle";
import Sidebar from "./Sidebar";

const Dashboard = () => {
	const admin = useSelector((state) => state.auth);
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
			setTotalPage(Math.ceil(res.data.count / 4));
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
		<div>
			<div className="uk-flex  uk-position-relative" style={{ zIndex: 0 }}>
				<Sidebar
					admin={admin}
					toggleAddUserModal={toggleAddUserModal}
					togglePositionModal={togglePositionModal}
					toggleCompanyModal={toggleCompanyModal}
					toggleDeletePositionModal={toggleDeletePositionModal}
					toggleDeleteCompanyModal={toggleDeleteCompanyModal}
				/>
				<div className="uk-flex-1 uk-padding" style={{ paddingLeft: "400px" }}>
					<div>
						<div className="uk-flex uk-flex-middle uk-flex-center uk-margin-bottom ">
							<div className="uk-flex uk-flex-middle uk-search uk-search-default">
								<input
									className="uk-search-input uk-search uk-search-default"
									type="text"
									placeholder="Search..."
									ref={inputFileRef}
								/>
							</div>
							<div
								uk-icon="icon:  search "
								onClick={() => {
									setPage(1);
									setSearch(inputFileRef.current.value);
								}}
								style={{ cursor: "pointer" }}
							/>
							<div class="uk-margin" className="uk-margin-right uk-margin-left">
								<div uk-form-custom="target: > * > span:first-child">
									<select
										aria-label="Custom controls"
										value={selectedCompany}
										onChange={(event) => {
											setPage(1);
											setSelectedCompany(event.target.value);
										}}
									>
										<option value="">Choose company...</option>
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
										<option value="">Choose position...</option>
										{position.length
											? position.map((val) => (
													<option key={val.id} value={val.id}>
														{val.position}
													</option>
											  ))
											: null}
									</select>
									<button
										class="uk-button uk-button-default "
										type="button"
										tabindex="-1"
									>
										<span></span>
										<span uk-icon="icon: chevron-down"></span>
									</button>
								</div>
							</div>
						</div>
					</div>
					<GridTitle handleSortChange={handleSortChange} sort={sort} />
					<div style={{ height: "300px" }}>
						{user.map((val) => {
							return (
								<UserList
									key={val.id}
									val={val}
									getUser={getUser}
									admin={admin}
								/>
							);
						})}
					</div>
					<div className="uk-flex uk-flex-center">
						<Pagination
							currentPage={page}
							totalPage={totalPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
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
