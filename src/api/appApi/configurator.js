import api from './api';

export const list = data => api.post('/mask/list', data);

export const next = data => api.post('/mask/next', data);

export const getMask = id => {
	return api.get(`/mask/item/${id}`);
};
