import * as types from './types';

export const apiStart = () => ({
	type: types.API_START,
});

export const apiEnd = () => ({
	type: types.API_END,
});

export const apiSubmitStart = () => ({
	type: types.API_SUBMIT_START,
});

export const apiSubmitEnd = () => ({
	type: types.API_SUBMIT_END,
});

export const apiError = error => ({
	type: types.API_ERROR,
	error,
});

export const apiSuccess = success => ({
	type: types.API_SUCCESS,
	success,
});

export const setQueryFilter = query => ({
	type: types.SET_QUERY,
	query,
});

export const toogleModal = () => ({
	type: types.TOGGLE_MODAL,
});

export const toogleFilter = () => ({
	type: types.TOGGLE_FILTER,
});

export const setTab = tab => ({
	type: types.SET_TAB,
	tab,
});

export const setRefresh = refresh => {
	return {
		type: types.SET_REFRESH,
		refresh,
	};
};

export default {
	apiStart,
	apiEnd,
	apiError,
	apiSuccess,
	setQueryFilter,
	apiSubmitStart,
	apiSubmitEnd,
	toogleModal,
	toogleFilter,
	setTab,
	setRefresh,
};
