import React from "react";

const UserList = ({ val, getUser }) => {
	return (
		<div className="uk-child-width-expand@s" uk-grid="true">
			<div>
				<ul className="uk-list uk-list-disc">
					<li>{val?.fullname}</li>
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
					<li>{val?.fullname}</li>
				</ul>
			</div>

			<div>
				<ul className="uk-list">
					<li>{val.fullname}</li>
				</ul>
			</div>
			<div uk-navbar="true">
				<ul className="uk-navbar-nav">
					<li>
						<span uk-navbar-parent-icon="true"></span>
						<div className="uk-navbar-dropdown">
							<ul className="uk-nav uk-navbar-dropdown-nav">
								<li>
									<div>Edit</div>
								</li>
								<br />
								<li>
									<div>Delete</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserList;
