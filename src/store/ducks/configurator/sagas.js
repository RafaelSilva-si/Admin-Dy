import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as configurator from '../../../api/appApi/configurator';
import { notificationActions } from '../notification';
import { salesFlowSelectors } from '../sales-flow';
import * as actions from './actions';
import * as types from './types';
import { generateHash } from '../../../lib/utils/functions';
import * as selectors from './selectors';

export function* getConfigurator(payload) {
	const { data } = payload;

	try {
		const response = yield call(configurator.list, { productId: data });
		yield put(actions.setItem(data));

		yield put(actions.setOptions(response.data.data.return));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar configurador.',
				'error',
			),
		);
	}
}

export function* openConfigurator(payload) {
	yield put(actions.toogleModalConfigurator());
	yield put(actions.setLoading(true));

	const { value } = payload;
	const hash = generateHash();

	yield put(actions.setHash(hash));
	yield put(actions.setItem(value));

	const data = {
		arvore: true,
		empresaId: 4,
		hashValue: hash,
		caracteristicas: true,
		produtoId: value,
		mascaraId: null,
		respostas: [],
		resposta: null,
		vant: null,
		next: null,
	};

	try {
		const response = yield call(configurator.next, data);

		if (!response.data.data.error) {
			const list = response.data.data.caracteristicas;

			if (list.length) {
				const responseValues = new Array(list.length).fill('');
				const selectResponse = new Array(list.length).fill(null);
				const responseBody = [];
				list.forEach((item, index) => {
					responseBody.push({ carac_id: item.id, resp_id: null });
					if (item.resposta) {
						responseValues[index] = item.respostas.find(
							option =>
								option.mnemonico.trim() ===
								item.resposta.descricao.trim(),
						);
					}
				});
				yield put(actions.setResponseBody(responseBody));
				yield put(actions.setResponseValues(responseValues));
				yield put(actions.setSelectResponse(selectResponse));
			}

			yield put(actions.setCharacteristics(list));
		} else {
			yield put(
				notificationActions.addNotification(
					response.data.data.msg,
					'error',
				),
			);
		}
	} catch (error) {
		yield put(actions.toogleModalConfigurator());
		yield put(
			notificationActions.addNotification(
				'Erro ao carregar configurador.',
				'error',
			),
		);
	}

	yield put(actions.setLoading(false));
}

export function* selectConfigurator(payload) {
	yield put(actions.setLoading(true));

	const { index } = payload;
	const hash = yield select(selectors.getHash);
	const item = yield select(selectors.getItem);
	const vant = yield select(selectors.getVant);

	const responseValues = yield select(selectors.getResponseValues);
	const body = yield select(selectors.getResponseBody);

	const values = {
		arvore: '',
		empresaId: 4,
		hashValue: hash,
		caracteristicas: true,
		produtoId: item,
		mascaraId: null,
		respostas: body,
		resposta: body[index].resp_id,
		vant: vant !== null ? vant : null,
		next: index + 1 < body.length ? body[index + 1].carac_id : null,
	};

	try {
		const response = yield call(configurator.next, values);
		if (!response.data.data.error) {
			const list = response.data.data.caracteristicas;
			const responseData = response.data.data.respostas;

			list.forEach((itemList, key) => {
				if (
					itemList.tipo === 'ME' ||
					itemList.tipo === 'ES' ||
					itemList.tipo === 'OP'
				) {
					if (responseData[itemList.id] !== null) {
						responseValues[key] = itemList.respostas.find(
							option =>
								option.tvar_id === responseData[itemList.id],
						);
					} else if (itemList.resposta) {
						responseValues[key] = itemList.respostas.find(
							option =>
								option.mnemonico.trim() ===
								itemList.resposta.descricao.trim(),
						);
					}
				}
			});

			yield put(actions.setResponseValues(responseValues));

			yield put(actions.setCharacteristics(list));
		} else {
			yield put(
				notificationActions.addNotification(
					response.data.data.msg,
					'error',
				),
			);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao selecionar opção configurador.',
				'error',
			),
		);
	}

	yield put(actions.setLoading(false));
}

export function* newConfigurator() {
	yield put(actions.setLoading(true));

	const hash = yield select(selectors.getHash);
	const item = yield select(selectors.getItem);
	const flowId = yield select(salesFlowSelectors.getId);

	const values = {
		empresaId: 4,
		hashValue: hash,
		produtoId: item,
		orcamento: 456,
		codPreven: 1,
		validaConfigurado: true,
		flowId,
	};

	try {
		const response = yield call(configurator.next, values);

		if (!response.data.data.error) {
			yield put(
				actions.setMask({
					name: response.data.data.mascara,
					id: response.data.data.mascaraId,
				}),
			);

			yield put(actions.setValueBase(response.data.data.valorBase));
			yield put(
				actions.setValueOptional(response.data.data.valorOptional),
			);
			yield put(actions.toogleModalConfigurator());
			yield put(actions.setCharacteristics([]));
		} else {
			yield put(
				notificationActions.addNotification(
					response.data.data.msg,
					'error',
				),
			);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar configurador.',
				'error',
			),
		);
	}

	yield put(actions.setLoading(false));
}

export default function* watchConfigurator() {
	yield takeLatest(types.GET_CONFIGURATOR, getConfigurator);
	yield takeLatest(types.OPEN_CONFIGURATOR, openConfigurator);
	yield takeLatest(types.SELECT_CONFIGURATOR, selectConfigurator);
	yield takeLatest(types.NEW_CONFIGURATOR, newConfigurator);
}
