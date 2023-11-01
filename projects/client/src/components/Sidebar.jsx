import React from "react";
import "../css/Sidebar.css";

const Sidebar = ({
	admin,
	toggleAddUserModal,
	togglePositionModal,
	toggleCompanyModal,
	toggleDeletePositionModal,
	toggleDeleteCompanyModal,
}) => {
	return (
		<div
			className="uk-width-1-6@m uk-visible@m uk-position-fixed uk-position-top-left sidebar"
			style={{ backgroundColor: "#f1f1f1" }}
		>
			<h1 style={{ paddingTop: "100px" }}>Manage Data</h1>
			<h4>Add / Edit data</h4>
			<ul class="uk-list uk-list-disc uk-list-muted">
				<li style={{ cursor: "pointer" }} onClick={toggleAddUserModal}>
					Add User
				</li>
				{admin.role !== "S_ADMIN" ? null : (
					<>
						<li style={{ cursor: "pointer" }} onClick={togglePositionModal}>
							Add / Edit Position
						</li>
						<li style={{ cursor: "pointer" }} onClick={toggleCompanyModal}>
							Add / Edit Company
						</li>
					</>
				)}
			</ul>
			{admin.role !== "S_ADMIN" ? null : (
				<>
					<h4>Delete data</h4>
					<ul class="uk-list uk-list-disc uk-list-muted">
						<li
							style={{ cursor: "pointer" }}
							onClick={toggleDeletePositionModal}
						>
							Delete Position
						</li>
						<li
							style={{ cursor: "pointer" }}
							onClick={toggleDeleteCompanyModal}
						>
							Delete Company
						</li>
					</ul>
				</>
			)}
		</div>
	);
};

export default Sidebar;
