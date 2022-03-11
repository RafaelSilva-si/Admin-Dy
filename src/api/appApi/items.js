import api from './api';

export const get = query => api.get('/auxiliaries/product', { params: query });

export const activeDesactive = item => api.post('/auxiliaries/product', item);

export const deleteItem = id => {
	return api.delete(`/auxiliaries/product/${id}`);
};
