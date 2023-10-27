const init = {
	email: "",
	password: "",
};

function userReducer(state = init, action) {
	// if (action.type === "login") {
	// 	return {
	// 		...state,
	// 		id: action.payload.id,
	// 	};
	// } else if (action.type === "logout") {
	// 	return init;
	// }
	return state;
}

export default userReducer;
