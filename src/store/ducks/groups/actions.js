import * as types from './types';

export const getListGroups = query => {
	return {
		type: types.GET_LIST_GROUPS,
		query,
	};
};

export const setListGroups = groups => {
	return {
		type: types.SET_LIST_GROUPS,
		groups,
	};
};

export const addGroup = group => {
	return {
		type: types.ADD_GROUP,
		group,
	};
};

export const getGroup = group => {
	return {
		type: types.GET_GROUP,
		group,
	};
};

export const setGroup = group => {
	return {
		type: types.SET_GROUP,
		group,
	};
};

export const editGroup = (group, id) => {
	return {
		type: types.EDIT_GROUP,
		group,
		id,
	};
};

export const getGroupPermission = group => {
	return {
		type: types.GET_GROUP_PERMISSION,
		group,
	};
};

export const setGroupPermission = permission => {
	return {
		type: types.SET_GROUP_PERMISSION,
		permission,
	};
};

export const updateGroupPermission = (data, id) => {
	return {
		type: types.UPDATE_GROUP_PERMISSION,
		data,
		id,
	};
};

export const deleteGroup = group => {
	return {
		type: types.DELETE_GROUP,
		group,
	};
};

export default {
	getListGroups,
	setListGroups,
	addGroup,
	getGroup,
	setGroup,
	editGroup,
	getGroupPermission,
	setGroupPermission,
	updateGroupPermission,
	deleteGroup,
};
