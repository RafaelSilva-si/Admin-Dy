import * as types from './types';

export const getListCompanies = company => ({
	type: types.GET_COMPANIES,
	company,
});

export const setListCompanies = companies => ({
	type: types.SET_COMPANIES,
	companies,
});

export const setSelectCompany = company => ({
	type: types.SET_SELECT_COMPANY,
	company,
});

export const changeCompany = company => ({
	type: types.CHANGE_COMPANY,
	company,
});

export const setModulesCompany = (
	modules,
	permissionsMenu,
	permissionsRoutes,
) => ({
	type: types.SET_MODULES_COMPANY,
	modules,
	permissionsMenu,
	permissionsRoutes,
});

export default {
	getListCompanies,
	setListCompanies,
	setSelectCompany,
	changeCompany,
	setModulesCompany,
};
