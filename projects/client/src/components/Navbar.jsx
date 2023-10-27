import React from "react";

const Navbar = () => {
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
								<a href="/">
									Profile Name <span uk-navbar-parent-icon="true"></span>
								</a>
								<div className="uk-navbar-dropdown">
									<ul className="uk-nav uk-navbar-dropdown-nav">
										<li>
											<a href="/dashboard">Dashboard</a>
										</li>
										<li>
											<a href="/profile">Profile</a>
										</li>
										<li className="uk-nav-divider"></li>
										<li>
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
