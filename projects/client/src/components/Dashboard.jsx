import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import { api } from "../api/api";
import UserList from "./UserList";
import ModalAddUser from "./ModalAddUser";
import ModalPosition from "./ModalPosition";
import ModalCompany from "./ModalCompany";
import ModalDeletePosition from "./ModalDeletePosition";
import ModalDeleteCompany from "./ModalDeleteCompany";

const Dashboard = () => {
	const [user, setUser] = useState([]);
	const [addUserModal, setAddUserModal] = useState(false);
	const [positionModal, setPositionModal] = useState(false);
	const [companyModal, setCompanyModal] = useState(false);
	const [deletePositionModal, setDeletePositionModal] = useState(false);
	const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);

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
	}, []);

	const getUser = async () => {
		try {
			const res = await api().get(`/user`);
			setUser(res.data.rows);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<div>
				<ul class="uk-subnav uk-subnav-pill" uk-margin>
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

			<div className="uk-child-width-expand@s" uk-grid="true">
				<div>
					<h4>Fullname</h4>
				</div>

				<div>
					<h4>Email</h4>
				</div>

				<div>
					<h4>Phone number</h4>
				</div>

				<div>
					<h4>Company</h4>
				</div>

				<div>
					<h4>Position</h4>
				</div>
				<div>
					<h4>Manage User</h4>
				</div>
			</div>
			{user.map((val) => {
				return <UserList val={val} getUser={getUser} />;
			})}
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
		</>
	);
};

export default Dashboard;
