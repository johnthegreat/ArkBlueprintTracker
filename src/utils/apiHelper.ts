// SPDX-License-Identifier: MIT
export default function helper<T>(promise: Promise<Response>) {
	return promise.then(function(response) {
		if (response.status === 204) {
			return null;
		} else if (response.body) {
			return response.json();
		}
	}).then(function(json) {
		if (!json) {
			return json;
		}
		return json as T;
	});
};