import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as groups from '../../../api/authApi/groups';
import { navigate } from '../../../lib/utils/navigation';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';

export function* getListGroups(payload) {
	yield put(apiActions.apiStart());

	let query = '?active=true';

	if (payload.query !== '') {
		query += `&${payload.query}`;
	}

	yield put(apiActions.setQueryFilter(payload.query));

	try {
		const response = yield call(groups.get, query);

		yield put(actions.setListGroups(response.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar grupos.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* getGroupPermission(payload) {
	yield put(apiActions.apiStart());

	const id = payload.group;

	try {
		const response = yield call(groups.getGroupPermission, id);

		yield put(actions.setGroupPermission(response.data[0]));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar permissões do grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* addGroup(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.group;

	try {
		const response = yield call(groups.addGroup, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Grupo cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/grupos');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* editGroup(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.group;

	const { id } = payload;

	try {
		const response = yield call(groups.editGroup, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Grupo editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/grupos');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* updateGroupPermission(payload) {
	yield put(apiActions.apiSubmitStart());

	const { data } = payload;

	const { id } = payload;

	const include = [];

	data.modules.forEach(elem => {
		elem.submodules.forEach(mod => {
			if (mod.status) {
				include.push(mod.id);
			}
		});
	});

	const permissions = {
		group: id,
		submodule: include,
	};

	const arr = [];
	arr.push(permissions);

	try {
		const response = yield call(groups.updateGroupPermission, arr);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Permissões do grupo atualizadas com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/grupos');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao atualizar permissões do grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* getGroupById(payload) {
	yield put(apiActions.apiStart());

	const id = payload.group;

	try {
		const response = yield call(groups.getGroup, id);

		yield put(actions.setGroup(response.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* deleteGroup(payload) {
	yield put(apiActions.apiStart());

	const id = payload.group;

	try {
		const response = yield call(groups.deleteGroup, id);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Grupo deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getListGroups(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export default function* watchGroups() {
	yield takeLatest(types.GET_LIST_GROUPS, getListGroups);
	yield takeLatest(types.GET_GROUP_PERMISSION, getGroupPermission);
	yield takeLatest(types.ADD_GROUP, addGroup);
	yield takeLatest(types.GET_GROUP, getGroupById);
	yield takeLatest(types.EDIT_GROUP, editGroup);
	yield takeLatest(types.UPDATE_GROUP_PERMISSION, updateGroupPermission);
	yield takeLatest(types.DELETE_GROUP, deleteGroup);
}
