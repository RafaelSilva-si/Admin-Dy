import {
	SET_COMPANIES,
	SET_MODULES_COMPANY,
	SET_SELECT_COMPANY,
} from './types';

const initialState = {
	companies: false,
	selecCompany: null,
	modulesCompany: [],
	permissionsMenu: [],
	permissionsRoutes: [],
};

const enterpriseReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COMPANIES:
			return {
				...state,
				companies: action.companies,
			};
		case SET_SELECT_COMPANY:
			return {
				...state,
				selecCompany: action.company,
			};
		case SET_MODULES_COMPANY:
			return {
				...state,
				modulesCompany: action.modules,
				permissionsMenu: action.permissionsMenu,
				permissionsRoutes: action.permissionsRoutes,
			};
		default:
			return state;
	}
};

export default enterpriseReducer;
