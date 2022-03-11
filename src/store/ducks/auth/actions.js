import * as types from './types';

export const loginUserAction = user => ({
	type: types.LOGIN_USER,
	user,
});

export const checkUserStorage = () => ({
	type: types.CHECK_USER,
});

export const logoutUser = () => ({
	type: types.LOGOUT,
});

export const setUser = user => ({
	type: types.SET_USER_AUTH,
	user,
});

export const setToken = token => ({
	type: types.SET_TOKEN,
	token,
});

export const resetUser = () => ({
	type: types.RESET_USER,
});

export const getAllowedModules = company => ({
	type: types.GET_ALLOWED_MODULES,
	company,
});

export const setAllowedModules = modules => ({
	type: types.SET_ALLOWED_MODULES,
	modules,
});

export default {
	loginUserAction,
	checkUserStorage,
	logoutUser,
	setUser,
	setToken,
	resetUser,
	getAllowedModules,
	setAllowedModules,
};
