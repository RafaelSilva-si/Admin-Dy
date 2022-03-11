import api from './api';

export const get = query => {
	return api.get(`/user${query}`);
};

export const getCollaborator = query => {
	return api.get(`/user/collaborator${query}`);
};

export const getUser = id => {
	return api.get(`/user/${id}`);
};

export const getUserPermission = id => {
	return api.get(`/permission/user/${id}`);
};

export const activeDesactiveUser = (id, condition) => {
	return api.patch(`/user/${id}`, condition);
};

export const updateUserPermission = data => {
	return api.post(`/permission/user`, data);
};

export const addUser = data => {
	return api.post(`/user`, data);
};

export const changePassword = (data, id) => {
	return api.put(`/user/${id}/set_password`, data);
};

export const editUser = (data, id) => {
	return api.patch(`/user/${id}`, data);
};
