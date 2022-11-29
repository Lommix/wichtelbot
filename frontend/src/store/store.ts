import { createSignal, createContext, useContext, createRoot, createResource } from 'solid-js'
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


function createAuth() {
	const [loggedIn, setLoggedIn] = createSignal<boolean>(false)
	const [user, { mutate, refetch }] = createResource<IUser>(() => apiGet<IUser>(detailUrl))

	const login = async (username: string, password: string) => apiPost<IUser>(loginUrl, { name: username, password: password }).then(user => {
		mutate(user)
		setLoggedIn(true)
	})
	const register = async (user: IUser) => apiPost<IUser>(registerUrl, user).then(user => {
		setLoggedIn(true)
		mutate(user)
	})
	const logout = async () => apiGet<boolean>(logoutUrl).then(response => {
		setLoggedIn(false);
		mutate(undefined);
	})

	const save = async (notice: string, tags: string[]) => apiPost<IUser>(updateUrl, { notice: notice, tags: tags }).then(user => mutate(user))
	return { user, login, register, logout, save, loggedIn }
}


export default createRoot(createAuth)
