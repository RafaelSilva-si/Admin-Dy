import api from './api';

export const get = query =>
	api.get('/generic/utils/payment-condition', { params: query });
