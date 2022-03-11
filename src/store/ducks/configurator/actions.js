import * as types from './types';

export const toogleModalConfigurator = () => ({
	type: types.TOGGLE_MODAL_CONFIGURATOR,
});

export const getConfigurator = data => {
	return {
		type: types.GET_CONFIGURATOR,
		data,
	};
};

export const openConfigurator = value => {
	return {
		type: types.OPEN_CONFIGURATOR,
		value
	};
};

export const setItem = item => {
	return {
		type: types.SET_ITEM_CONFIGURATOR,
		item,
	};
};

export const setOptions = options => {
	return {
		type: types.SET_OPTIONS_CONFIGURATOR,
		options,
	};
};

export const setCharacteristics = characteristics => {
	return {
		type: types.SET_CHARACTERISTICS,
		characteristics,
	};
};

export const setLoading = data => {
	return {
		type: types.LOADING_CONFIGURATOR,
		data,
	};
};

export const setHash = hash => {
	return {
		type: types.SET_HASH,
		hash,
	};
};

export const selectConfigurator = index => {
	return {
		type: types.SELECT_CONFIGURATOR,
		index,
	};
};

export const newConfigurator = () => ({
	type: types.NEW_CONFIGURATOR,
});

export const setMask = mask => {
	return {
		type: types.SET_MASK,
		mask,
	};
};

export const setValueBase = value => {
	return {
		type: types.SET_VALUE_BASE,
		value,
	};
};

export const setValueOptional = value => {
	return {
		type: types.SET_VALUE_OPTIONAL,
		value,
	};
};

export const setResponseValues = response => {
	return {
		type: types.SET_RESPONSE_VALUES,
		response,
	};
};

export const setResponseBody = response => {
	return {
		type: types.SET_RESPONSE_BODY,
		response,
	};
};

export const setVant = vant => {
	return {
		type: types.SET_VANT,
		vant,
	};
};

export const setSelectResponse = response => {
	return {
		type: types.SET_SELECT_RESPONSE,
		response,
	};
};

export default {
	toogleModalConfigurator,
	getConfigurator,
	setItem,
	setOptions,
	openConfigurator,
	setCharacteristics,
	setLoading,
	setHash,
	selectConfigurator,
	newConfigurator,
	setMask,
	setValueBase,
	setResponseValues,
	setResponseBody,
	setValueOptional,
	setVant,
	setSelectResponse,
};
