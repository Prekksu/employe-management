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
					<li>{val?.company_id}</li>
				</ul>
			</div>

			<div>
				<ul className="uk-list">
					<li>{val.position_id}</li>
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
								<li>
									<a href="#">Edit</a>
								</li>
								<li class="uk-nav-divider"></li>
								<li>
									<a href="#">Delete</a>
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
