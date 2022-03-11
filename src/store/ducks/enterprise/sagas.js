import { call, put, takeLatest } from 'redux-saga/effects';
import * as enterprise from '../../../api/authApi/enterprise';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions } from '../api';
import * as types from './types';
import { authActions } from '../auth';

export function* getCompanies(payload) {
	yield put(apiActions.apiStart());

	const { company } = payload;

	try {
		const response = yield call(enterprise.get);

		yield put(actions.setListCompanies(response.data.companies));

		if (company === null) {
			yield put(actions.setSelectCompany(response.data.companies[0]));

			localStorage.setItem(
				'company',
				JSON.stringify(response.data.companies[0]),
			);

			yield put(
				authActions.getAllowedModules(response.data.companies[0]),
			);
		} else {
			yield put(authActions.getAllowedModules(company));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar empresas.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* changeCompany(payload) {
	const value = payload.company;

	yield put(actions.setSelectCompany(value));

	localStorage.setItem('company', JSON.stringify(value));

	yield put(authActions.getAllowedModules(value));
}

export default function* watchEnterprise() {
	yield takeLatest(types.GET_COMPANIES, getCompanies);
	yield takeLatest(types.CHANGE_COMPANY, changeCompany);
}
