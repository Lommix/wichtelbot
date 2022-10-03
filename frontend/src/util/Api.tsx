function apiGet<T>(url: string) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        })
}

function apiPost<T>(url: string, args: {}) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(args),
        credentials : "include",
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json() as Promise<T>
    })
}

export { apiGet, apiPost }
