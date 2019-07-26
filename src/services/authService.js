import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndPoint = `${apiUrl}/auth`;

const tokenKey = 'token';

// to remove bidirectional dependency
// i.e authService - dependent to - httpService
// and httpService - dependent to - authService
http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndPoint, { email, password });

	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (error) {
		return null;
	}
}
export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default {
	login,
	logout,
	getCurrentUser,
	loginWithJwt,
	getJwt,
};
