const init = {
	emailOrPhoneNumber: "",
	password: "",
};

function userReducer(state = init, action) {
	if (action.type === "login") {
		return {
			...state,
			fullname: action.payload.fullname,
			email: action.payload.email,
			phone_number: action.payload.phone_number,
			role: action.payload.role,
			avatar_url: action.payload.avatar_url,
		};
	} else if (action.type === "logout") {
		return init;
	}

	return state;
}

export default userReducer;
