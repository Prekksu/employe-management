import React, { useState } from "react";
import { api } from "../api/api";
import UIkit from "uikit";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalEditUSer from "./ModalEditUSer";
import "../css/Grid.css";

const UserList = ({ val, getUser, admin }) => {
	const [editUserModal, setEditUserModal] = useState(false);
	const [deleteUserModal, setDeleteUserModal] = useState(false);

	const toggleEditUserModal = () => {
		setEditUserModal(!editUserModal);
	};

	const toggleDeleteUserModal = () => {
		setDeleteUserModal(!deleteUserModal);
	};

	async function deleteUser() {
		try {
			await api().delete(`/user/${val.id}`);

			UIkit.notification({
				message: "User deleted successfully!",
				status: "success",
			});
			getUser();
			toggleDeleteUserModal();
		} catch (error) {
			UIkit.notification({
				message: error.response.data.message,
				status: "danger",
			});
		}
	}
	return (
		<div className="user-list-container">
			<div className="uk-child-width-expand@s grid-container " uk-grid="true">
				<div>
					<img
						className="uk-border-circle"
						style={{ width: "50px", height: "50px" }}
						src={`${process.env.REACT_APP_API_BASE_URL}/${val?.avatar_url}`}
						alt="Avatar"
					/>
					{"  "}
					{val?.fullname}
				</div>

				<div>{val?.email}</div>

				<div>{val?.phone_number}</div>

				<div>{val?.company?.company_name}</div>

				<div>{val?.position?.position}</div>
				<div>{val?.role}</div>
				<div>
					<a href>
						<span uk-icon="icon: more"></span>
					</a>
					<div uk-dropdown="mode: click">
						<ul class="uk-nav uk-dropdown-nav">
							<li style={{ marginBottom: "10px" }}>
								<div
									style={{ cursor: "pointer" }}
									onClick={toggleEditUserModal}
								>
									Edit
								</div>
							</li>

							{admin?.role !== "S_ADMIN" ? null : (
								<>
									<li class="uk-nav-divider"></li>
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={toggleDeleteUserModal}
										>
											Delete{" "}
										</div>
									</li>
								</>
							)}
						</ul>
					</div>
					<ModalEditUSer
						isOpen={editUserModal}
						toggleModal={toggleEditUserModal}
						val={val}
						getUser={getUser}
						admin={admin}
					/>
					<ModalDeleteUser
						isOpen={deleteUserModal}
						toggleModal={toggleDeleteUserModal}
						deleteUser={deleteUser}
						val={val}
					/>
				</div>
			</div>
		</div>
	);
};

export default UserList;
