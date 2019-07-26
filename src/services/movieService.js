import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndPoint = `${apiUrl}/movies`;
export function getMovies() {
	return http.get(apiEndPoint);
}

export function deleteMovie(id) {
	return http.delete(movieUrl(id));
}

export function getMovie(id) {
	return http.get(movieUrl(id));
}

export function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;

		return http.put(`${movieUrl(movie._id)}`, body);
	}

	return http.post(apiEndPoint, movie);
}

function movieUrl(id) {
	return `${apiEndPoint}/${id}`;
}
