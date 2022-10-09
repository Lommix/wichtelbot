import { createSignal, createContext, useContext } from 'solid-js'
import { createStore, Store, StoreNode, StoreSetter } from 'solid-js/store'
import { apiGet, apiPost } from './api'
import createAuth from './auth'
import createRoom from './room'

export interface IUser {
    name: string
    tags: string[]
    notice?: string
}

export interface IRoom {
    name: string
    played: boolean
    user: IUser[]
}

const defaultUser: IUser = { name: "guest", tags: [] }
const StoreContext = createContext<any[]>();

export function Provider(props) {

    const [user, setUser] = createSignal<IUser>(defaultUser)
    const [loggedIn, setLoggedIn] = createSignal(false)

    let currentUser, currentRoom

    const state = createStore({
        get CurrentUser() {
            return currentUser
        },
        get CurrentRoom() {
            // fetch room users
            return currentRoom;
        }
    })

    //base actions
    const actions = {
        apiGet,
        apiPost,
    }

    currentUser = createAuth(actions)
    currentRoom = createRoom(actions)
    const store = [state, actions]

    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export function useStore() {
    return useContext(StoreContext);
}
