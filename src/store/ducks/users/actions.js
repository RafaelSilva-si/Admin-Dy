import * as types from './types';

export const getListUsers = query => {
	return {
		type: types.GET_LIST_USERS,
		query,
	};
};

export const setListUsers = users => {
	return {
		type: types.SET_LIST_USERS,
		users,
	};
};

export const addUser = user => {
	return {
		type: types.ADD_USER,
		user,
	};
};

export const getUser = user => {
	return {
		type: types.GET_USER,
		user,
	};
};

export const setUser = user => {
	return {
		type: types.SET_USER,
		user,
	};
};

export const editUser = (user, id) => {
	return {
		type: types.EDIT_USER,
		user,
		id,
	};
};

export const getUserPermission = user => {
	return {
		type: types.GET_USER_PERMISSION,
		user,
	};
};

export const setUserPermission = permission => {
	return {
		type: types.SET_USER_PERMISSION,
		permission,
	};
};

export const activeDesactiveUser = user => {
	return {
		type: types.ACTIVE_DESACTIVE_USER,
		user,
	};
};

export const setRefresh = refresh => {
	return {
		type: types.SET_USER_REFRESH,
		refresh,
	};
};

export const updateUserPermission = (data, id) => {
	return {
		type: types.UPDATE_USER_PERMISSION,
		data,
		id,
	};
};

export const changePassword = password => {
	return {
		type: types.CHANGE_PASSWORD,
		password,
	};
};

export const editUserProfile = data => {
	return {
		type: types.EDIT_USER_PROFILE,
		data,
	};
};

export const getUsersFilterbyGroupLogged = query => {
	return {
		type: types.GET_USERS_FILTER_BY_LOGGED,
		query,
	};
};

export const setCollaborators = collaborators => {
	return {
		type: types.SET_COLLABORATORS,
		collaborators,
	};
};

export const getCoordinators = query => {
	return {
		type: types.GET_COORDINATORS,
		query,
	};
};

export const setCoordinators = coordinators => {
	return {
		type: types.SET_COORDINATORS,
		coordinators,
	};
};

export const setIsRepresentative = data => {
	return {
		type: types.SET_IS_REPRESENTATIVE,
		data,
	};
};

export const uploadImg = data => {
	return {
		type: types.UPLOAD_IMG,
		data,
	};
}

export default {
	getListUsers,
	setListUsers,
	addUser,
	getUser,
	setUser,
	editUser,
	getUserPermission,
	setUserPermission,
	activeDesactiveUser,
	setRefresh,
	updateUserPermission,
	changePassword,
	editUserProfile,
	getUsersFilterbyGroupLogged,
	setCollaborators,
	getCoordinators,
	setCoordinators,
	setIsRepresentative,
	uploadImg
};
