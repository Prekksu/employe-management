import React, { useRef, useEffect } from "react";
import UIkit from "uikit";
import photo1 from "../assets/light.jpg";
import photo2 from "../assets/dark.jpg";
import photo3 from "../assets/photo.jpg";
import photo4 from "../assets/photo2.jpg";
import photo5 from "../assets/photo3.jpg";

const Slider = () => {
	const sliderRef = useRef(null);

	const slides = [
		{ img: photo1, title: "Slide 1", caption: "Description Slide 1" },
		{ img: photo2, title: "Slide 2", caption: "Description Slide 2" },
		{ img: photo3, title: "Slide 3", caption: "Description Slide 3" },
		{ img: photo4, title: "Slide 4", caption: "Description Slide 4" },
		{ img: photo5, title: "Slide 5", caption: "Description Slide 5" },
	];

	useEffect(() => {
		UIkit.slider(sliderRef.current, {
			clsActivated: "uk-transition-active",
			center: true,
		});
	}, []);

	const goToPreviousSlide = () => {
		UIkit.slider(sliderRef.current).show(
			UIkit.slider(sliderRef.current).getIndex() - 1
		);
	};

	const goToNextSlide = () => {
		UIkit.slider(sliderRef.current).show(
			UIkit.slider(sliderRef.current).getIndex() + 1
		);
	};

	return (
		<div
			className="uk-position-relative uk-visible-toggle uk-light"
			tabIndex="-1"
			ref={sliderRef}
		>
			<ul className="uk-slider-items uk-grid">
				{slides.map((slide, index) => (
					<li className="uk-width-3-4" key={index}>
						<div className="uk-panel">
							<img src={slide.img} width="1800" height="1200" alt="" />
							<div className="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
								<h3 className="uk-margin-remove">{slide.title}</h3>
								<p className="uk-margin-remove">{slide.caption}</p>
							</div>
						</div>
					</li>
				))}
			</ul>

			<div
				className="uk-position-center-left uk-position-small uk-hidden-hover"
				onClick={goToPreviousSlide}
				style={{ cursor: "pointer" }}
			>
				{`<`}
			</div>
			<div
				className="uk-position-center-right uk-position-small uk-hidden-hover"
				onClick={goToNextSlide}
				style={{ cursor: "pointer" }}
			>
				{`>`}
			</div>
		</div>
	);
};

export default Slider;
