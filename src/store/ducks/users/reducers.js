import {
	SET_LIST_USERS,
	SET_USER,
	SET_USER_PERMISSION,
	SET_USER_REFRESH,
	SET_COLLABORATORS,
	SET_COORDINATORS,
	SET_IS_REPRESENTATIVE,
} from './types';

const initialState = {
	list: false,
	user: false,
	permission: false,
	refresh: false,
	collaborators: [],
	coordinators: [],
	isRepresentative: false,
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LIST_USERS:
			return {
				...state,
				list: action.users,
			};
		case SET_USER:
			return {
				...state,
				user: action.user,
			};
		case SET_USER_PERMISSION:
			return {
				...state,
				permission: action.permission,
			};
		case SET_USER_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		case SET_COLLABORATORS:
			return {
				...state,
				collaborators: action.collaborators,
			};
		case SET_COORDINATORS:
			return {
				...state,
				coordinators: action.coordinators,
			};
		case SET_IS_REPRESENTATIVE:
			return {
				...state,
				isRepresentative: action.data,
			};
		default:
			return state;
	}
};

export default usersReducer;
