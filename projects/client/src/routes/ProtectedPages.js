import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPages = ({ children, needLogin, needLoginAdmin }) => {
	const user = useSelector((state) => state.auth);
	const nav = useNavigate();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, [isLoading]);

	useEffect(() => {
		if (needLogin && user.role) {
			return nav("/");
		} else if (needLogin && !user.role) {
			return nav("/login");
		} else if (
			needLogin &&
			needLoginAdmin &&
			user.role !== "S_ADMIN" &&
			user.role !== "HR_ADMIN"
		) {
			return nav("/");
		}
	}, []);

	return children;
};

export default ProtectedPages;
