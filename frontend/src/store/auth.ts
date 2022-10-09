import { createSignal, createContext, useContext, createResource } from 'solid-js'
import { createStore, Store, StoreNode, StoreSetter } from 'solid-js/store'
import { IUser } from './index'

const loginUrl = "http://localhost:8080/login"
const logoutUrl = "http://localhost:8080/logout"
const getUserUrl = "http://localhost:8080/user"

export default function createAuth(actions: Object) {
	const [user, setUser] = createSignal<IUser>()

	Object.assign(actions, {
		login: async (user: IUser) => {
			actions.apiPost<{ message: string }>(loginUrl, { name: user.name, tags: user.tags, notice: user.notice }).then(data => {
				const currentUser: IUser = {
					name: data.Name,
					tags: data.Tags,
					notice: data.Notice
				}
				setUser(currentUser)
				console.log(currentUser)
			})
		},
		getUser: () => {
			actions.apiGet<{ message: string }>(getUserUrl).then(data => {
				//if user is returned
				const currentUser: IUser = {
					name: data.Name,
					tags: data.Tags,
					notice: data.Notice
				}
				setUser(currentUser)
			})
		},
		logout: () => {
			actions.apiGet<{ message: string }>(logoutUrl).then(data => {
				setUser(undefined)
			})
		},
		isLoggedIn: () => {
			if (user()) {
				return true
			}
			return false
		},
	})

	return user
}
