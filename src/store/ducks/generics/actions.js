import * as types from './types';

export const getRepresentatives = () => ({
	type: types.GET_REPRESENTATIVES_ERP,
});

export const setRepresentatives = representatives => ({
	type: types.SET_REPRESENTATIVES_ERP,
	representatives,
});

export const getAddress = cep => ({
	type: types.GET_ADDRESS,
	cep,
});

export const setAddress = address => ({
	type: types.SET_ADDRESS,
	address,
});

export const getClient = (value, docType) => ({
	type: types.GET_CLIENT,
	value,
	docType,
});

export const setClient = client => ({
	type: types.SET_CLIENT,
	client,
});

export const getContactForm = () => ({
	type: types.GET_CONTACT_FORM,
});

export const setContactForm = contactForm => ({
	type: types.SET_CONTACT_FORM,
	contactForm,
});

export const getClientList = () => ({
	type: types.GET_CLIENT_LIST,
});

export const setClietList = clientList => ({
	type: types.SET_CLIENT_LIST,
	clientList,
});

export const getCarrier = () => ({
	type: types.GET_CARRIER,
});

export const setCarrier = carrier => ({
	type: types.SET_CARRIER,
	carrier,
});

export const getOptionalsGrid = () => ({
	type: types.GET_OPTIONALS_GRID,
});

export const setOptionalsGrid = optionalsGrid => ({
	type: types.SET_OPTIONALS_GRID,
	optionalsGrid,
});

export const sideBar = data => ({
	type: types.OPEN_SIDEBAR,
	data
})

export default {
	getRepresentatives,
	setRepresentatives,
	getAddress,
	setAddress,
	getClient,
	setClient,
	getContactForm,
	setContactForm,
	getClientList,
	setClietList,
	getCarrier,
	setCarrier,
	getOptionalsGrid,
	setOptionalsGrid,
	sideBar
};
