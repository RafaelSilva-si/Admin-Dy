import {
	TOGGLE_MODAL_CONFIGURATOR,
	SET_ITEM_CONFIGURATOR,
	SET_OPTIONS_CONFIGURATOR,
	SET_CHARACTERISTICS,
	LOADING_CONFIGURATOR,
	SET_HASH,
	SET_MASK,
	SET_VALUE_BASE,
	SET_RESPONSE_VALUES,
	SET_RESPONSE_BODY,
	SET_VALUE_OPTIONAL,
	SET_VANT,
	SET_SELECT_RESPONSE,
} from './types';

const initialState = {
	modal: false,
	characteristics: [],
	options: [],
	item: null,
	loading: false,
	hash: null,
	mask: {
		name: '',
		id: null,
	},
	valueBase: false,
	valueOptional: false,
	responseValues: [],
	responseBody: [],
	vant: null,
	selectResponse: [],
};

const configuratorReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_MODAL_CONFIGURATOR:
			return {
				...state,
				modal: !state.modal,
			};
		case SET_ITEM_CONFIGURATOR:
			return {
				...state,
				item: action.item,
			};
		case SET_OPTIONS_CONFIGURATOR:
			return {
				...state,
				options: action.options,
			};
		case SET_CHARACTERISTICS:
			return {
				...state,
				characteristics: action.characteristics,
			};
		case LOADING_CONFIGURATOR:
			return {
				...state,
				loading: action.data,
			};
		case SET_HASH:
			return {
				...state,
				hash: action.hash,
			};
		case SET_MASK:
			return {
				...state,
				mask: action.mask,
			};
		case SET_VALUE_BASE:
			return {
				...state,
				valueBase: action.value,
			};
		case SET_VALUE_OPTIONAL:
			return {
				...state,
				valueOptional: action.value,
			};
		case SET_RESPONSE_VALUES:
			return {
				...state,
				responseValues: action.response,
			};
		case SET_VANT:
			return {
				...state,
				vant: action.vant,
			};
		case SET_SELECT_RESPONSE:
			return {
				...state,
				selectResponse: action.response,
			};
		case SET_RESPONSE_BODY:
			return {
				...state,
				responseBody: action.response,
			};
		default:
			return state;
	}
};

export default configuratorReducer;
