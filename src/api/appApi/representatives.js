import api from './api';

export const uploadFile = file =>
	api.post('/auxiliaries/trade-representative/upload', file);

export const importTable = table =>
	api.post('/auxiliaries/trade-representative/table', table);

export const deleteTable = id => {
	return api.delete(`/auxiliaries/trade-representative/table/${id}`);
};

export const newLink = link =>
	api.post('/auxiliaries/trade-representative/link', link);

export const getLink = id => {
	return api.get(`/auxiliaries/trade-representative/link/${id}`);
};

export const editLink = (link, id) => {
	return api.put(`/auxiliaries/trade-representative/link/${id}`, link);
};
