import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const nav = useNavigate();

	return (
		<div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
			<div className="uk-width-medium uk-padding-large uk-background-default uk-box-shadow-large">
				<h2 className="uk-heading-primary uk-text-center uk-margin-remove-bottom">
					<span className="uk-background-gradient uk-text-transparent uk-background-clip-text uk-inline">
						404
					</span>
				</h2>
				<p className="uk-text-large uk-text-center uk-margin-small-top">
					Page Not Found
				</p>
				<p className="uk-text-muted uk-text-center uk-margin-medium-bottom">
					You must login first to use all content{" "}
				</p>
				<button
					className="uk-button uk-button-primary uk-button-large uk-width-1-1"
					onClick={() => nav("/")}
				>
					Go to Home
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
