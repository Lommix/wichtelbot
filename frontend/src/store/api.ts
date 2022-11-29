function apiGet<T>(url: string) {
	return fetch(url, {
		method: "GET",
		credentials: "include",
	}).then(response => {
		return response.json() as Promise<T>
	})
}

function apiPost<T>(url: string, args: {}) {
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(args),
		credentials: "include",
	}).then(response => {
		return response.json() as Promise<T>
	})
}

export { apiGet, apiPost }
