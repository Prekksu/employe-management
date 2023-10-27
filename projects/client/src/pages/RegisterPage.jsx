import React from "react";

const RegisterPage = () => {
	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-card uk-card-default uk-card-body uk-width-medium">
				<h3 className="uk-card-title uk-text-center">Register</h3>
				<form className="uk-form-stacked">
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="fullname">
							Full Name:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="text"
								id="fullname"
								placeholder="Enter your full name"
								required
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="email">
							Email:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="email"
								id="email"
								placeholder="Enter your email"
								required
							/>
						</div>
					</div>
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="phone">
							Phone Number:
						</label>
						<div className="uk-form-controls">
							<input
								className="uk-input"
								type="tel"
								id="phone"
								placeholder="Enter your phone number"
								required
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
								required
							/>
						</div>
					</div>
					<div className="uk-margin uk-text-center">
						<button className="uk-button uk-button-primary" type="submit">
							Register
						</button>
					</div>
					<div className="uk-text-center">
						Already have account? Click <a href="/login">Here</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
