import { createSignal, createContext, useContext, createRoot, createResource, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { apiPost, apiGet } from './api'

const loginUrl = "http://localhost:8080/login"
const registerUrl = "http://localhost:8080/register"
const detailUrl = "http://localhost:8080/user"
const logoutUrl = "http://localhost:8080/logout"
const updateUrl = "http://localhost:8080/update"

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

	const login = async (username: string, password: string) => apiPost<IUser>(loginUrl, { name: username, password: password }).then(user => {
		setUser(user)
		setLoggedIn(true)
	})
	const register = async (user: IUser) => apiPost<IUser>(registerUrl, user).then(user => {
		setLoggedIn(true)
		setUser(user)
	})
	const logout = async () => apiGet<boolean>(logoutUrl).then(response => {
		setLoggedIn(false)
		setUser(undefined)
	})
	const pullUser = async () => apiGet<IUser>(detailUrl).then(user => {
		setUser(user)
		setLoggedIn(true)
	})

	const save = async (notice: string, tags: string[]) => apiPost<IUser>(updateUrl, { Notice: notice, Tags: tags }).then(user => setUser(user))

	return { user, login, register, logout, save, loggedIn, pullUser }
}


export default createRoot(createApi)
