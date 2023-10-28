import React from "react";
import photo1 from "../assets/photo2.jpg";
import photo2 from "../assets/photo.jpg";
import photo3 from "../assets/light.jpg";

const Articles = () => {
	const articles = [
		{
			title: "Article 1",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis consectetur nisi. Mauris odio ante, vehicula mollis commodo non, dapibus eget ex. Nam quis lectus eu elit posuere pretium. Sed cursus lacinia ligula, ac egestas lacus facilisis ut. Phasellus et quam velit. Suspendisse mauris ipsum, consequat sed mauris sed, elementum convallis tellus. Sed consequat orci dui. Donec eu ligula id orci consequat tristique sed vel nibh. Donec nisi urna, elementum id orci vel, aliquam ultrices mauris.",
			photo: photo1,
		},
		{
			title: "Article 2",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis consectetur nisi. Mauris odio ante, vehicula mollis commodo non, dapibus eget ex. Nam quis lectus eu elit posuere pretium. Sed cursus lacinia ligula, ac egestas lacus facilisis ut. Phasellus et quam velit. Suspendisse mauris ipsum, consequat sed mauris sed, elementum convallis tellus. Sed consequat orci dui. Donec eu ligula id orci consequat tristique sed vel nibh. Donec nisi urna, elementum id orci vel, aliquam ultrices mauris.",
			photo: photo2,
		},
		{
			title: "Article 3",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis consectetur nisi. Mauris odio ante, vehicula mollis commodo non, dapibus eget ex. Nam quis lectus eu elit posuere pretium. Sed cursus lacinia ligula, ac egestas lacus facilisis ut. Phasellus et quam velit. Suspendisse mauris ipsum, consequat sed mauris sed, elementum convallis tellus. Sed consequat orci dui. Donec eu ligula id orci consequat tristique sed vel nibh. Donec nisi urna, elementum id orci vel, aliquam ultrices mauris.",
			photo: photo3,
		},
	];

	return (
		<div className="uk-container">
			<h1 className="uk-text-center">Articles</h1>
			<ul className="uk-list uk-list-divider">
				{articles.map((article, index) => (
					<li key={index}>
						<div className="uk-card uk-card-default uk-card-body uk-margin-bottom uk-flex">
							<img
								src={article.photo}
								alt={article.title}
								className="uk-width-1-2 uk-margin-right"
							/>
							<div className="uk-width-1-2 uk-text-justify">
								<h3 className="uk-card-title">{article.title}</h3>
								<p>{article.content}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Articles;
