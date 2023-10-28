import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((state) => state.auth);

	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-width-1-2@m uk-card-body uk-box-shadow-small">
				<div className="uk-card-media-top uk-text-center">
					<img
						className="uk-border-circle uk-align-center"
						width="100"
						height="100"
						src={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar_url}`}
						alt="Avatar"
					/>
				</div>
				<div className="uk-card-body">
					<h3 className="uk-card-title">{user.fullname}</h3>
					<p className="uk-text-meta uk-margin-remove-top">
						Email: {user.email}
					</p>
					<p className="uk-text-meta uk-margin-remove-top">
						Phone: {user.phone_number}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
