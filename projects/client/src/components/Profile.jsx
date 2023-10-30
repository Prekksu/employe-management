import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import UIkit from "uikit";

const Profile = () => {
	const user = useSelector((state) => state.auth);
	const inputFileRef = useRef(null);
	const [fullname, setFullName] = useState(user.fullname);
	const [phone_number, setPhoneNumber] = useState(user.phone_number);
	const [email, setEmail] = useState(user.email);
	const [selectedFile, setSelectedFile] = useState(null);
	const [users, setUsers] = useState("");
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (selectedFile) {
			uploadAvatar();
		}
	}, [selectedFile]);

	useEffect(() => {
		if (
			fullname !== users.fullname ||
			phone_number !== users.phone_number ||
			email !== users.email
		) {
			setIsDirty(true);
		} else {
			setIsDirty(false);
		}
	}, [fullname, phone_number, email, users]);

	async function uploadAvatar() {
		const formData = new FormData();
		formData.append("userImg", selectedFile);

		try {
			await api().post(`/user/${users.id}`, formData);
			fetchData();
			UIkit.notification({ message: "New Photo Saved", status: "success" });
		} catch (error) {
			UIkit.notification({
				message: "File is to large",
				status: "danger",
			});
		}
	}

	const saveUser = async () => {
		try {
			await api().patch(`/user/${users.id}`, {
				fullname: fullname,
				phone_number: phone_number,
				email: email,
			});

			fetchData();
			UIkit.notification({ message: "Profile Saved", status: "success" });
		} catch (error) {
			fetchData();
		}
	};

	const fetchData = async () => {
		try {
			const response = await api().get(`/user/${user.id}`);
			setUsers(response.data);
		} catch (error) {
			alert(error);
		}
	};

	const handleFile = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-width-1-3@m uk-card-body uk-box-shadow-large">
				<div className="uk-card-media-top uk-text-center">
					<img
						className="uk-border-circle uk-align-center"
						style={{ width: "100px", height: "100px", cursor: "pointer" }}
						src={`${process.env.REACT_APP_API_BASE_URL}/${users?.avatar_url}`}
						alt="Avatar"
						onClick={() => {
							inputFileRef.current.click();
						}}
					/>
					<input
						accept="image/png, image/jpeg"
						ref={inputFileRef}
						type="file"
						style={{ display: "none" }}
						onChange={handleFile}
					/>
					<h3 className="uk-card-title uk-margin-remove-top">
						{users?.fullname}
					</h3>
					<p className="uk-card-title uk-margin-remove-top">
						{`${users?.company?.company_name} - ${users?.position?.position}`}
					</p>
				</div>
				<div className="uk-card-body">
					<div>
						<form>
							<div className="uk-margin">
								<label className="uk-form-label">Name:</label>
								<input
									className="uk-input"
									type="text"
									id="fullname"
									value={fullname}
									onChange={(e) => setFullName(e.target.value)}
									required
								/>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label">Email:</label>
								<input
									className="uk-input"
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="uk-margin">
								<label className="uk-form-label">Phone Number:</label>
								<input
									className="uk-input"
									type="tel"
									id="phone_number"
									value={phone_number}
									onChange={(e) => setPhoneNumber(e.target.value)}
									required
								/>
							</div>
						</form>
					</div>
					<a href="/change-password">Change Password</a>
					<button
						className="uk-button uk-align-center uk-button-primary"
						type="button"
						onClick={saveUser}
						disabled={!isDirty}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
