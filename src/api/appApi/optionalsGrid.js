import api from './api';

export const get = query =>
	api.get('/auxiliaries/optionals-grid', { params: query });
