import { SET_LIST_GROUPS, SET_GROUP, SET_GROUP_PERMISSION } from './types';

const initialState = {
	list: false,
	group: false,
	permission: false,
};

const groupsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LIST_GROUPS:
			return {
				...state,
				list: action.groups,
			};
		case SET_GROUP:
			return {
				...state,
				group: action.group,
			};
		case SET_GROUP_PERMISSION:
			return {
				...state,
				permission: action.permission,
			};
		default:
			return state;
	}
};

export default groupsReducer;
