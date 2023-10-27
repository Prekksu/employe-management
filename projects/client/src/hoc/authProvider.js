import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import Loading from "../components/Loading";

export default function AuthProvider({ children }) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetch();
	}, []);

	async function fetch() {
		// try {
		// 	const token = JSON.parse(localStorage.getItem("auth"));
		// 	const user = await api()
		// 		.get("/authentication/v2", {
		// 			headers: {
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 		})
		// 		.then((res) => res.data);
		// 	if (user) {
		// 		dispatch({
		// 			type: "login",
		// 			payload: user,
		// 		});
		// 	}
		// } catch (err) {
		// 	setMessage(err);
		// } finally {
		// 	setIsLoading(false);
		// }
	}
	return <>{isLoading ? <Loading /> : children}</>;
}
