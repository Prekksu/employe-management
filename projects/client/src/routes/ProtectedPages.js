import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPages = ({
	children,
	redirect,
	guestOnly,
	needLogin,
	needLoginAdmin,
}) => {
	const user = useSelector((state) => state.auth);
	const nav = useNavigate();

	useEffect(() => {
		if (redirect) {
			return nav("/restricted");
		} else if (guestOnly && user.role) {
			return nav("/");
		} else if (needLogin && !user.role) {
			return nav("/not-found");
		} else if (
			needLogin &&
			needLoginAdmin &&
			user.role !== "S_ADMIN" &&
			user.role !== "HR_ADMIN"
		) {
			return nav("/restricted");
		}
	}, []);

	return children;
};

export default ProtectedPages;
