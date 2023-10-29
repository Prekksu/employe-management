import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import UserList from "./UserList";
import ModalAddUser from "./ModalAddUser";

const Dashboard = () => {
	const [user, setUser] = useState([]);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		try {
			const res = await api().get(`/user`);
			setUser(res.data);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<button
				className="uk-button uk-button-primary"
				uk-toggle="target: #add-user-modal"
			>
				Add User
			</button>
			<div id="add-user-modal" uk-modal="true">
				<div className="uk-modal-dialog uk-modal-body">
					<ModalAddUser />
				</div>
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
		</>
	);
};

export default Dashboard;
