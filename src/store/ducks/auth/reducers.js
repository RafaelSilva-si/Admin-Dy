import {
	RESET_USER,
	SET_ALLOWED_MODULES,
	SET_TOKEN,
	SET_USER_AUTH,
} from './types';

const initialState = {
	token: null,
	user: false,
	modules: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_AUTH:
			return {
				...state,
				user: action.user,
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.token,
			};
		case RESET_USER:
			return {
				...state,
				token: null,
				user: null,
				modules: null,
			};
		case SET_ALLOWED_MODULES:
			return {
				...state,
				modules: action.modules,
			};
		default:
			return state;
	}
};

export default authReducer;
