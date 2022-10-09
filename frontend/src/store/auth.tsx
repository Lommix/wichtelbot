import { createSignal, createContext, useContext, createResource } from 'solid-js'
import { createStore, Store, StoreNode, StoreSetter } from 'solid-js/store'
import { IUser } from './index'

const loginUrl = "http://localhost:8080/login"
const getUserUrl = "http://localhost:8080/user"
const defaultUser: IUser = {
    name: "guest",
    tags: [],
}

export default function createAuth(actions: Object) {
    const [loggedIn, setLoggedIn] = createSignal(false)
    const [user, setUser] = createSignal<IUser>()

    Object.assign(actions, {
		login: async ( user : IUser) => {
            actions.apiPost<{ message: string }>(loginUrl, { name: user.name, tags: user.tags, notice: user.notice }).then(data => {
                console.log(data)
            })
			// let currentUser: IUser = {
			// 	name = data.name,
			// 	tags = data.tags,
			// 	notice = data.notice
			// }
			// setUser(currentUser)
        },
		getUser: () => {
			actions.apiGet<{message: string}>(getUserUrl).then(data => {
                console.log(data)
            })
		},
        logout: () => {
            setUser(undefined)
            setLoggedIn(false)
        },
        isLoggedIn: loggedIn,
    })

    return user
}
