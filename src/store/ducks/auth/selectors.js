export const getAuth = state => state.auth;
export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
export const getModules = state => state.auth.modules;

export default {
	getAuth,
	getUser,
	getToken,
	getModules,
};
