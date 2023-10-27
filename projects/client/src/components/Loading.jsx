import LoadingLogo from "../assets/Infinity.svg";

export default function Loading() {
	return (
		<div w={"100vw"} h="100vh">
			<image w="100px" src={LoadingLogo}></image>
		</div>
	);
}
