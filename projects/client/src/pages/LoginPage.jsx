import React from "react";

const LoginPage = () => {
	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">Login</h3>
				<form className="uk-form-stacked">
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="username">
							Username:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="text"
								id="username"
								placeholder="Enter your username"
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="password">
							Password:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="password"
								id="password"
								placeholder="Enter your password"
							/>
						</div>
					</div>
					<p>
						<a href="/forgot-password">Forgot password?</a>
					</p>
					<div className="uk-margin uk-text-center">
						<button className="uk-button uk-button-primary" type="submit">
							Login
						</button>
					</div>
					<div className="uk-text-center">
						Don't have an account? Click <a href="/register">Here</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
