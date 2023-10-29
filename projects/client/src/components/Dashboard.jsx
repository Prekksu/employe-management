import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import UserList from "./UserList";
import ModalAddUser from "./ModalAddUser";
import ModalAddPosition from "./ModalAddPosition";

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
										uk-toggle="target: #add-user-modal"
									>
										Add User
									</div>
								</li>
								<li style={{ marginBottom: "10px" }}>
									<div
										style={{ cursor: "pointer" }}
										uk-toggle="target: #add-position-modal"
									>
										Add Position
									</div>
								</li>
								<li style={{ marginBottom: "10px" }}>
									<div style={{ cursor: "pointer" }} href="#">
										Add Company
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li>
						<a href>
							<span
								uk-icon="icon:   pencil
"
							></span>
						</a>
						<div uk-dropdown="mode: click">
							<ul class="uk-nav uk-dropdown-nav">
								<li>
									<a href="#">Edit Position</a>
								</li>
								<li>
									<a href="#">Edit Company</a>
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
								<li>
									<a href="#">Delete Position</a>
								</li>
								<li>
									<a href="#">Delete Company</a>
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
			<div id="add-user-modal" uk-modal="true">
				<div className="uk-modal-dialog uk-modal-body">
					<ModalAddUser />
				</div>
			</div>
			<div id="add-position-modal" uk-modal="true">
				<div className="uk-modal-dialog uk-modal-body">
					<ModalAddPosition />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
