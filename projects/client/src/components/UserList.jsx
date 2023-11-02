import React, { useState } from "react";
import { api } from "../api/api";
import UIkit from "uikit";
import ModalDeleteUser from "./modal/ModalDeleteUser";
import ModalEditUSer from "./modal/ModalEditUSer";
import "../css/Grid.css";
import photo from "../assets/blank-profile-picture-973460_960_720.webp";

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
		<>
			<div className="user-list-container">
				<div className="uk-child-width-expand@s grid-container " uk-grid="true">
					<div>
						<img
							className="uk-border-circle"
							style={{ width: "50px", height: "50px" }}
							src={
								val?.avatar_url === null
									? photo
									: `${process.env.REACT_APP_API_BASE_URL}/${val?.avatar_url}`
							}
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
						{admin.role === "HR_ADMIN" && val.role === "S_ADMIN" ? null : (
							<>
								<button
									class="uk-button uk-button-primary uk-button-small"
									onClick={toggleEditUserModal}
									style={{ marginRight: "5px" }}
								>
									Edit
								</button>

								{admin?.role !== "S_ADMIN" ? null : (
									<button
										class="uk-button uk-button-danger uk-button-small"
										onClick={toggleDeleteUserModal}
									>
										Delete
									</button>
								)}
							</>
						)}
					</div>
				</div>
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
		</>
	);
};

export default UserList;
