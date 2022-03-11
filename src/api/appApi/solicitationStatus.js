import api from './api';

export const get = query =>
	api.get('/auxiliaries/flow-status', { params: query });

export const newStatus = status => api.post('/auxiliaries/flow-status', status);

export const editStatus = (id, status) =>
	api.put(`/auxiliaries/flow-status/${id}`, status);

export const deleteStatus = id => {
	return api.delete(`/auxiliaries/flow-status/${id}`);
};

export const getById = id => {
	return api.get(`/auxiliaries/flow-status/${id}`);
};
