import api from './api';

export const get = query => {
	return api.get(`/group${query}`);
};

export const getGroup = id => {
	return api.get(`/group/${id}`);
};

export const getGroupPermission = id => {
	return api.get(`/permission/group/${id}`);
};

export const addGroup = data => {
	return api.post(`/group`, data);
};

export const editGroup = (data, id) => {
	return api.put(`/group/${id}`, data);
};

export const updateGroupPermission = data => {
	return api.post(`/permission/group`, data);
};

export const deleteGroup = id => {
	return api.delete(`/group/${id}`);
};
