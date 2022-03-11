import { ADD_NOTIFICATION } from './types';

const notificationReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return {
				...state,
				message: action.message,
				level: action.level,
			};
		default:
			return state;
	}
};

export default notificationReducer;
