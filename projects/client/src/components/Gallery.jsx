import React from "react";
import photo1 from "../assets/light.jpg";
import photo2 from "../assets/dark.jpg";
import photo3 from "../assets/photo.jpg";
import photo4 from "../assets/photo2.jpg";

const Gallery = () => {
	const photos = [photo1, photo2, photo3, photo4];

	return (
		<div className="uk-container ">
			<h1 className="uk-text-center">Gallery</h1>
			<div
				className="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-small uk-grid-match uk-flex uk-flex-center"
				data-uk-grid="true"
			>
				{photos.map((photo, index) => (
					<div key={index}>
						<div className="uk-card uk-card-default uk-card-body">
							<img
								src={photo}
								alt={`Item ${index + 1}`}
								className="uk-width-1-1"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Gallery;
