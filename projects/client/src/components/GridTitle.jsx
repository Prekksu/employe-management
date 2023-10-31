import React from "react";
import "../css/Grid.css";

const GridTitle = ({ handleSortChange, sort }) => {
	return (
		<div className="uk-child-width-expand@s grid-container" uk-grid="true">
			<div>
				<h4
					onClick={() =>
						handleSortChange(
							"fullname" + (sort === "fullnameAsc" ? "Desc" : "Asc")
						)
					}
				>
					Fullname{" "}
					<div
						uk-icon="icon:  code"
						style={{ cursor: "pointer", transform: "rotate(90deg)" }}
					/>
					{sort === "fullnameAsc" ? sort === "fullnameDesc" : null}
				</h4>
			</div>

			<div>
				<h4
					onClick={() =>
						handleSortChange("email" + (sort === "emailAsc" ? "Desc" : "Asc"))
					}
				>
					Email{" "}
					<div
						uk-icon="icon:  code"
						style={{ cursor: "pointer", transform: "rotate(90deg)" }}
					/>
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
					Phone Number{" "}
					<div
						uk-icon="icon:  code"
						style={{ cursor: "pointer", transform: "rotate(90deg)" }}
					/>
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
					Company{" "}
					<div
						uk-icon="icon:  code"
						style={{ cursor: "pointer", transform: "rotate(90deg)" }}
					/>
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
					Position{" "}
					<div
						uk-icon="icon:  code"
						style={{ cursor: "pointer", transform: "rotate(90deg)" }}
					/>
					{sort === "positionAsc" ? sort === "positionDesc" : null}
				</h4>
			</div>
			<div>
				<h4
					onClick={() =>
						handleSortChange("role" + (sort === "roleAsc" ? "Desc" : "Asc"))
					}
				>
					Role{" "}
					<div
						uk-icon="icon:  code"
						style={{ cursor: "pointer", transform: "rotate(90deg)" }}
					/>
					{sort === "roleAsc" ? sort === "roleDesc" : null}
				</h4>
			</div>
			<div>
				<h4>Manage User</h4>
			</div>
		</div>
	);
};

export default GridTitle;
