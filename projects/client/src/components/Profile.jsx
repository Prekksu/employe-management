import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import ModalEditProfile from "./ModalEditProfile";

const Profile = () => {
	const user = useSelector((state) => state.auth);
	const inputFileRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [users, setUsers] = useState("");

	async function uploadAvatar() {
		const formData = new FormData();
		formData.append("userImg", selectedFile);

		try {
			await api().post(`/user/${user.id}`, formData);
			fetchData();
		} catch (error) {
			alert("File too large");
		}
	}

	const fetchData = async () => {
		try {
			const response = await api().get(`/user/${user.id}`);
			setUsers(response.data);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (selectedFile) {
			uploadAvatar();
		}
	}, [selectedFile]);

	const handleFile = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-width-1-3@m uk-card-body uk-box-shadow-large">
				<div className="uk-card-media-top uk-text-center">
					<img
						className="uk-border-circle uk-align-center"
						width="100"
						height="100"
						src={`${process.env.REACT_APP_API_BASE_URL}/${users?.avatar_url}`}
						alt="Avatar"
						onClick={() => {
							inputFileRef.current.click();
						}}
						style={{ cursor: "pointer" }}
					/>
					<input
						accept="image/png, image/jpeg"
						ref={inputFileRef}
						type="file"
						style={{ display: "none" }}
						onChange={handleFile}
					/>
				</div>
				<div className="uk-card-body">
					<h3 className="uk-card-title">{users?.fullname}</h3>
					<p className="uk-text-meta uk-margin-remove-top">
						Company: {users?.company_id}
					</p>
					<p className="uk-text-meta uk-margin-remove-top">
						Position: {users?.position_id}
					</p>
					<p className="uk-text-meta uk-margin-remove-top">
						Email: {users?.email}
					</p>
					<p className="uk-text-meta uk-margin-remove-top">
						Phone: {users?.phone_number}
					</p>
					<button
						className="uk-button uk-align-center uk-button-primary"
						uk-toggle="target: #edit-profile-modal"
					>
						Edit Profile
					</button>
					<div id="edit-profile-modal" uk-modal="true">
						<div className="uk-modal-dialog uk-modal-body">
							<ModalEditProfile fetchData={fetchData} users={users} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
