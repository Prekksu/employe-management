import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
									{user.role}
									<span uk-navbar-parent-icon="true"></span>
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
