import {
	API_START,
	API_END,
	API_ERROR,
	API_SUCCESS,
	API_SUBMIT_START,
	API_SUBMIT_END,
	SET_QUERY,
	TOGGLE_MODAL,
	TOGGLE_FILTER,
	SET_TAB,
	SET_REFRESH,
} from './types';

const initialState = {
	query: '',
	modal: false,
	filter: true,
	tab: 1,
	loadingSubmit: false,
	refresh: false,
	modalConfigured: false,
	loading: false,
};

const apiReducer = (state = initialState, action) => {
	switch (action.type) {
		case API_START:
			return {
				...state,
				loading: true,
			};
		case API_END:
			return {
				...state,
				loading: false,
			};
		case API_ERROR:
			return {
				...state,
				error: action.error,
			};
		case API_SUCCESS:
			return {
				...state,
				success: action.success,
			};
		case SET_QUERY:
			return {
				...state,
				query: action.query,
			};
		case API_SUBMIT_START:
			return {
				...state,
				loadingSubmit: true,
			};
		case API_SUBMIT_END:
			return {
				...state,
				loadingSubmit: false,
			};
		case TOGGLE_MODAL:
			return {
				...state,
				modal: !state.modal,
			};
		case TOGGLE_FILTER:
			return {
				...state,
				filter: !state.filter,
			};
		case SET_TAB:
			return {
				...state,
				tab: action.tab,
			};
		case SET_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
};

export default apiReducer;
