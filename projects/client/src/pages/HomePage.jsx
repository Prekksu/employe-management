import Articles from "../components/Articles";
import Gallery from "../components/Gallery";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

export default function Homepage() {
	return (
		<>
			<Navbar />
			<Slider />
			<Articles />
			<Gallery />
		</>
	);
}
