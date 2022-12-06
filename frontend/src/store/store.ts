import { createSignal, createContext, useContext, createRoot, createResource, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { apiPost, apiGet } from './api'

const loginUrl = "http://localhost:8080/login"
const registerUrl = "http://localhost:8080/register"
const detailUrl = "http://localhost:8080/user"
const logoutUrl = "http://localhost:8080/logout"
const updateUrl = "http://localhost:8080/update"

// const loginUrl = "/login"
// const registerUrl = "/register"
// const detailUrl = "/user"
// const logoutUrl = "/logout"
// const updateUrl = "/update"

export interface IUser {
	Name: string,
	Tags: string[],
	Notice?: string,
	Password?: string,
	Partner?: {
		Name: string,
		Notice: string,
		Tags: string[],
	}
}

function createApi() {
	const [loggedIn, setLoggedIn] = createSignal<boolean>(false)
	const [user, setUser] = createStore<IUser>(undefined)
	const [error, setError] = createSignal<string>("")

	//register user
	const register = async (user: IUser, key : string) => {
		const promise = await fetch(registerUrl, {
			method: "POST", 
			credentials: "include", 
			body: JSON.stringify(user),
			headers : new Headers({
				'Authorization': key
			})
		})
		
		const response = await promise.json()
		if (promise.ok) {
			setUser(response)
			setLoggedIn(true)
		}

		return response
	}

	//login user
	const login = async (username: string, password: string) => {
		const promise = await fetch(loginUrl, {
			method: "POST", credentials: "include", body: JSON.stringify({
				Name: username,
				password: password,
			})
		})
		const response = await promise.json()
		if (promise.ok) {
			setUser(response)
			setLoggedIn(true)
			setError("")
		} else {
			setError(response.error)
			console.log(response)
		}
	}

	//logout active session
	const logout = async () => {
		const promise = await fetch(logoutUrl, { method: "GET", credentials: "include" })
		const response = await promise.json()
		if (promise.ok) {
			setUser(undefined)
			setLoggedIn(false)
			setError("")
		} else {
			setError(response.error)
		}
	}

	//pull user from session
	const pullUser = async () => {
		const promise = await fetch(detailUrl, { method: "GET", credentials: "include" })
		const response = await promise.json()
		if (promise.ok) {
			setUser(response)
			setLoggedIn(true)
			setError("")
		} else {
			setLoggedIn(false)
		}
	}

	//update user settings
	const update = async (notice: string, tags: string[]) => {
		const promise = await fetch(updateUrl, {
			method: "POST", credentials: "include", body: JSON.stringify({
				Notice: notice,
				Tags: tags,
			})
		})
		const response = await promise.json()
		if (promise.ok) {
			setUser(response)
			setLoggedIn(true)
			setError("")
		} else {
			setLoggedIn(false)
			setError(response.error)
		}
	}

	return { user, login, register, logout, update, loggedIn, pullUser, error }
}


export default createRoot(createApi)
