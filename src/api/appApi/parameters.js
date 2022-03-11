import api from './api';

export const get = query =>
	api.get('/auxiliaries/parameter', { params: query });

export const editParameter = (id, parameter) =>
	api.post(`/auxiliaries/parameter/value/${id}`, parameter);

export const getById = id => {
	return api.get(`/auxiliaries/parameter/${id}`);
};
