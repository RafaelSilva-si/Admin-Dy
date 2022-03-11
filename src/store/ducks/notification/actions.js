import * as types from './types';

export function addNotification(message, level) {
	return {
		type: types.ADD_NOTIFICATION,
		message,
		level,
	};
}

export default {
	addNotification,
};
