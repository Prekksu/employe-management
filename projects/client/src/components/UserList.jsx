import React, { useState } from "react";
import { api } from "../api/api";
import UIkit from "uikit";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalEditUSer from "./ModalEditUSer";

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
		<div className="uk-child-width-expand@s" uk-grid="true">
			<div>
				<ul className="uk-list">
					<li>
						<img
							className="uk-border-circle"
							style={{ width: "50px", height: "50px" }}
							src={`${process.env.REACT_APP_API_BASE_URL}/${val?.avatar_url}`}
							alt="Avatar"
						/>
						{val?.fullname}
					</li>
				</ul>
			</div>

			<div>
				<ul className="uk-list ">
					<li>{val?.email}</li>
				</ul>
			</div>

			<div>
				<ul className="uk-list ">
					<li>{val?.phone_number}</li>
				</ul>
			</div>

			<div>
				<ul className="uk-list">
					<li>{val?.company?.company_name}</li>
				</ul>
			</div>

			<div>
				<ul className="uk-list">
					<li>{val?.position?.position}</li>
				</ul>
			</div>
			<div>
				<ul className="uk-list">
					<li>{val?.role}</li>
				</ul>
			</div>
			<div>
				<ul class="uk-subnav uk-subnav-pill" uk-margin>
					<li>
						<a href>
							<span uk-icon="icon: more"></span>
						</a>
						<div uk-dropdown="mode: click">
							<ul class="uk-nav uk-dropdown-nav">
								{admin?.role !== "S_ADMIN" ? null : (
									<li style={{ marginBottom: "10px" }}>
										<div
											style={{ cursor: "pointer" }}
											onClick={toggleEditUserModal}
										>
											Edit
										</div>
									</li>
								)}
								<li class="uk-nav-divider"></li>

								<li style={{ marginBottom: "10px" }}>
									<div
										style={{ cursor: "pointer" }}
										onClick={toggleDeleteUserModal}
									>
										Delete{" "}
									</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
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
	);
};

export default UserList;
