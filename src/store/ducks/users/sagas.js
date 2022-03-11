import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as users from '../../../api/authApi/users';
import { navigate } from '../../../lib/utils/navigation';
import * as groups from '../../../api/authApi/groups';
import { notificationActions } from '../notification';
import * as actions from './actions';
import * as selectors from './selectors';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import { authActions, authSelectors } from '../auth';

export function* getListUsers(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let query = '';

	if (payload.query !== '') {
		query = `?${payload.query}`;
	}

	yield put(apiActions.setQueryFilter(payload.query));

	try {
		const response = yield call(users.get, query);

		yield put(actions.setListUsers(response.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar usuários.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* getUserById(payload) {
	yield put(apiActions.apiStart());

	const id = payload.user;

	try {
		const response = yield call(users.getUser, id);

		yield put(actions.setUser(response.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar usuário.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* addUser(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.user;

	try {
		const response = yield call(users.addUser, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Usuário cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/usuarios');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar usuário.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* getUserPermission(payload) {
	yield put(apiActions.apiStart());

	const { user } = payload;

	try {
		let userPermission = yield call(users.getUserPermission, user.usuario);

		userPermission = userPermission.data;

		if (user.grupo) {
			let gruposPermission = yield call(
				groups.getGroupPermission,
				user.grupo,
			);

			[gruposPermission] = gruposPermission.data;

			gruposPermission.modules.forEach(moduleGroup => {
				moduleGroup.submodules.forEach(subGroup => {
					userPermission.forEach(company => {
						company.modules.forEach(moduleUser => {
							moduleUser.submodules.forEach(subUser => {
								const subUserConst = subUser;
								if (subGroup.id === subUserConst.id) {
									subUserConst.group = subGroup.status;
								}
							});
						});
					});
				});
			});
		}

		yield put(actions.setUserPermission(userPermission));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar permissões do usuário.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* activeDesactiveUser(payload) {
	const { user } = payload;

	try {
		const data = {
			active: !user.active,
		};

		const response = yield call(users.activeDesactiveUser, user.id, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getListUsers(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do usuário.',
				'error',
			),
		);
	}
}

export function* updateUserPermission(payload) {
	yield put(apiActions.apiSubmitStart());

	const { data } = payload;

	const { id } = payload;

	const permissions = [];

	let include = {};

	let arr = [];

	data.forEach(elem => {
		elem.modules.forEach(mod => {
			mod.submodules.forEach(sub => {
				if (sub.status) {
					arr.push(sub.id);
				}
			});
		});
		include = {
			user: id,
			company: elem.company.id,
			submodule: arr,
		};
		arr = [];
		permissions.push(include);
	});

	try {
		const response = yield call(users.updateUserPermission, permissions);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Permissões do usuário atualizadas com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/usuarios');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao atualizar permissões do usuário.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* changePassword(payload) {
	yield put(apiActions.apiSubmitStart());

	const user = yield select(authSelectors.getUser);

	const data = payload.password;

	try {
		const response = yield call(
			users.changePassword,
			{ password: data.password },
			user.id,
		);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Senha alterarada com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/perfil');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao alterar senha.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* editUserProfile(payload) {
	yield put(apiActions.apiSubmitStart());

	const user = yield select(authSelectors.getUser);

	const { data } = payload;

	try {
		const response = yield call(users.editUser, data, user.id);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Pefil alterarada com sucesso!',
					'success',
				),
			);

			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify(response.data));

			yield put(authActions.setUser(response.data));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao alterar perfil.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* editUser(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.user;

	const { id } = payload;

	try {
		const response = yield call(users.editUser, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Usuário editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/usuarios');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar usuário.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* getUsersFilterbyGroupLogged(payload) {
	const query = `?${payload.query}`;

	try {
		const response = yield call(users.getCollaborator, query);

		const user = yield select(authSelectors.getUser);

		let data = response.data.data.filter(item => {
			return item.extra_id !== null;
		});

		data = data.map(_item => {
			const item = { ..._item };
			item.name = `${item.first_name} ${item.last_name}`;
			item.id = item.extra_id;
			return item;
		});

		const values = data.filter(item => {
			return item.id === user.extra_id;
		});

		if (values.length > 0) {
			yield put(actions.setIsRepresentative(true));
		}

		yield put(actions.setCollaborators(values.length > 0 ? values : data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar usuários.',
				'error',
			),
		);
	}
}

export function* getCoordinators(payload) {
	const query = `?${payload.query}`;

	try {
		const response = yield call(users.getCollaborator, query);

		response.data.data = response.data.data.map(_item => {
			const item = { ..._item };
			item.name = `${item.first_name} ${item.last_name}`;
			return item;
		});

		yield put(actions.setCoordinators(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar coordenadores.',
				'error',
			),
		);
	}
}

export default function* watchUsers() {
	yield takeLatest(types.GET_LIST_USERS, getListUsers);
	yield takeLatest(types.ADD_USER, addUser);
	yield takeLatest(types.GET_USER, getUserById);
	yield takeLatest(types.GET_USER_PERMISSION, getUserPermission);
	yield takeLatest(types.ACTIVE_DESACTIVE_USER, activeDesactiveUser);
	yield takeLatest(types.UPDATE_USER_PERMISSION, updateUserPermission);
	yield takeLatest(types.CHANGE_PASSWORD, changePassword);
	yield takeLatest(types.EDIT_USER_PROFILE, editUserProfile);
	yield takeLatest(types.EDIT_USER, editUser);
	yield takeLatest(
		types.GET_USERS_FILTER_BY_LOGGED,
		getUsersFilterbyGroupLogged,
	);
	yield takeLatest(types.GET_COORDINATORS, getCoordinators);
}
