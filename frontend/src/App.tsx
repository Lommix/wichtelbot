import { Component, createSignal } from 'solid-js';
import Chat from './components/Chat'
import Login from './components/Login'
import Room from './components/Room';


interface User {
    name: string
    tags: string[]
    notice?: string
}

const App: Component = () => {

    const [user, setUser] = useS<User>()

    return (
        <div>
            <div class="w-screen h-screen flex origin-center bg-accent">
                <div class="m-auto">
                    <img src="assets/gogopresent.png" class="w-54 -mb-4 ml-auto mr-auto " />
                    <div class="bg-primary border-primary w-64 p-8 border-6 rounded-lg shadow-lg">
                        

                        <Login />
                        <Room />



                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
