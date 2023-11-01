import React, { useState } from "react";
import Modal from "react-modal";
import photo1 from "../assets/light.jpg";
import photo2 from "../assets/dark.jpg";
import photo3 from "../assets/photo.jpg";
import photo4 from "../assets/photo2.jpg";

Modal.setAppElement("#root"); // Set the root element for accessibility

const customModalStyles = {
	content: {
		width: "1000px", // Set the desired width
		height: "670px", // Set the desired height
		margin: "auto", // Center the modal
	},
};

const Gallery = () => {
	const photos = [photo1, photo2, photo3, photo4];
	const [selectedPhoto, setSelectedPhoto] = useState(null);

	const openModal = (index) => {
		setSelectedPhoto(photos[index]);
	};

	const closeModal = () => {
		setSelectedPhoto(null);
	};

	return (
		<div className="uk-container">
			<h1 className="uk-text-center">Gallery</h1>
			<div
				className="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-small uk-grid-match uk-flex uk-flex-center"
				data-uk-grid="true"
			>
				{photos.map((photo, index) => (
					<div key={index}>
						<div
							className="uk-card uk-card-default uk-card-body"
							onClick={() => openModal(index)}
						>
							<img
								src={photo}
								alt={`Item ${index + 1}`}
								className="uk-width-1-1"
							/>
						</div>
					</div>
				))}
			</div>
			<Modal
				isOpen={selectedPhoto !== null}
				onRequestClose={closeModal}
				contentLabel="Selected Photo"
				style={customModalStyles} // Apply custom styles to the modal
			>
				{selectedPhoto && (
					<img src={selectedPhoto} alt="Selected" className="uk-width-1-1" />
				)}
				{/* <button onClick={closeModal}>Close Modal</button> */}
			</Modal>
		</div>
	);
};

export default Gallery;
