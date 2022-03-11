import axios from 'axios';
import { navigate } from '../../lib/utils/navigation';
import * as auth from './auth';

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_AUTH,
});

const token = JSON.parse(localStorage.getItem('token'));

if (token) {
	api.defaults.headers.common.Authorization = `Token ${token}`;
}

api.interceptors.response.use(
	response => response,
	async error => {
		const { response } = error;

		if (response.status !== 401) {
			return Promise.reject(error);
		}

		if (response.data.detail === 'Invalid Token') {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.removeItem('company');

			return navigate('/login');
		}

		if (response.data.detail === 'The Token is expired') {
			const data = {
				token: JSON.parse(localStorage.getItem('token')),
			};

			try {
				const result = await auth.renew(data);

				localStorage.setItem(
					'token',
					JSON.stringify(result.data.token),
				);

				const requestConfig = error.config;

				requestConfig.headers.Authorization = `Token ${result.data.token}`;

				api.defaults.headers.common.Authorization = `Token ${result.data.token}`;

				return await api.request(requestConfig);
			} catch (exception) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				localStorage.removeItem('company');

				return navigate('/login');
			}
		}
		return false;
	},
);

export default api;
