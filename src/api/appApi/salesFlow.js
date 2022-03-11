import api from './api';

export const newSolicitation = data => api.post('/sales/request', data);

export const editSolicitation = (id, data) =>
	api.put(`/sales/request/${id}`, data);

export const getSolicitation = id => api.get(`/sales/request/${id}`);

export const get = data => api.get('/sales', { params: data });

export const edtiSalesFlow = data => api.post(`/sales`, data);

export const getProposal = id => api.get(`/sales/proposal/${id}`);

export const newProposal = (id, data) =>
	api.post(`/sales/proposal/${id}`, data);

export const editProposal = (id, data) =>
	api.put(`/sales/proposal/${id}`, data);

export const newAnalysis = (id, data) =>
	api.post(`/sales/credit-analysis/${id}`, data);

export const editAnalysis = (id, data) =>
	api.put(`/sales/credit-analysis/${id}`, data);

export const getAnalysis = id => api.get(`/sales/credit-analysis/${id}`);

export const newBusinessAnalysis = (id, data) =>
	api.post(`/sales/business-analysis/${id}`, data);

export const editBusinessAnalysis = (id, data) =>
	api.put(`/sales/business-analysis/${id}`, data);

export const getBusinessAnalysis = id =>
	api.get(`/sales/business-analysis/${id}`);

export const finish = (id, emprId) => api.post(`/sales/finish/${id}/${emprId}`);

export const getFinish = id => api.get(`/sales/finish/${id}`);

export const getHistory = id => api.get(`/sales/history/${id}`);

export const getGeneratePdf = id => api.get(`/proposal/generatePdf/${id}`);

export const getStatusChart = filter =>
	api.get(
		`/sales/business-analysis-chart/statusChart?step=${filter.step}&representative=${filter.representative}&dateStart=${filter.dateStart}&dateEnd=${filter.dateEnd}`,
	);

export const getPdvChart = filter =>
	api.get(
		`/sales/business-analysis-chart/pdvChart?representative=${filter.representative}&dateStart=${filter.dateStart}&dateEnd=${filter.dateEnd}`,
	);

export const getSalesChart = filter =>
	api.get(
		`/sales/business-analysis-chart/salesChart?representative=${filter.representative}&dateStart=${filter.dateStart}&dateEnd=${filter.dateEnd}`,
	);
