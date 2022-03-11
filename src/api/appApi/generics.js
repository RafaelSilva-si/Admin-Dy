import api from './api';

export const getRepresentativeERP = () =>
	api.get('/generic/trade-representative');

export const searchCEP = cep => {
	return api.get(`/generic/regional/cep/${cep}`);
};

export const clientByDocument = (value, type) => {
	return api.get(`/generic/customer/${type}/${value}`);
};

export const getContactForm = () => {
	return api.get(`/generic/utils/contact-form`);
};

export const newClient = data => api.post('/generic/customer', data);

export const editClient = (id, data) =>
	api.put(`/generic/customer/${id}`, data);

export const getClientList = () => api.get('/generic/customer');

export const getCarrier = () => api.get('/generic/utils/carrier');
