import React from "react";
import { useDispatch, useSelector } from "react-redux";
import photo from "../assets/blank-profile-picture-973460_960_720.webp";

const Navbar = () => {
	const user = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	function logout() {
		localStorage.removeItem("auth");
		dispatch({
			type: "logout",
		});
	}
	return (
		<nav
			className="uk-navbar-container "
			style={{ backgroundColor: "#f1f1f1" }}
		>
			<div className="uk-container">
				<div uk-navbar="true">
					<div className="uk-navbar-left">
						<ul className="uk-navbar-nav">
							<li className="uk-active">
								<a href="/">Home</a>
							</li>
						</ul>
					</div>

					<div className="uk-navbar-right">
						{user.role ? (
							<ul className="uk-navbar-nav">
								<li>
									{user.fullname}{" "}
									<span>
										<img
											className="uk-border-circle"
											style={{ width: "50px", height: "50px" }}
											src={
												user?.avatar_url === null
													? photo
													: `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar_url}`
											}
											alt="Avatar"
										/>
									</span>
									<div className="uk-navbar-dropdown">
										<ul className="uk-nav uk-navbar-dropdown-nav">
											{user.role === "EMPLOYE" ? null : (
												<li>
													<a href="/dashboard">Dashboard</a>
												</li>
											)}

											<li>
												<a href="/profile">Profile</a>
											</li>
											<li className="uk-nav-divider"></li>
											<li onClick={logout}>
												<a href="/">Logout</a>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						) : (
							<ul className="uk-navbar-nav">
								<li className="uk-active">
									<a href="/login">Login</a>
								</li>
							</ul>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
