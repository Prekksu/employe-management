import React from "react";
import { useDispatch } from "react-redux";

const Navbar = () => {
	const dispatch = useDispatch();
	function logout() {
		localStorage.removeItem("auth");
		dispatch({
			type: "logout",
		});
	}
	return (
		<nav className="uk-navbar-container">
			<div className="uk-container">
				<div uk-navbar="true">
					<div className="uk-navbar-left">
						<ul className="uk-navbar-nav">
							<li className="uk-active">
								<a href="/">Logo</a>
							</li>
						</ul>
					</div>

					<div className="uk-navbar-right">
						<ul className="uk-navbar-nav">
							<li>
								Profile Name <span uk-navbar-parent-icon="true"></span>
								<div className="uk-navbar-dropdown">
									<ul className="uk-nav uk-navbar-dropdown-nav">
										<li>
											<a href="/dashboard">Dashboard</a>
										</li>
										<li>
											<a href="/profile">Profile</a>
										</li>
										<li className="uk-nav-divider"></li>
										<li onClick={logout}>
											<a href="/login">Logout</a>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
