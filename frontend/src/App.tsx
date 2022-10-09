import { Component } from 'solid-js';
import Login from './components/Login'
import Room from './components/Room';
import { useStore } from './store'


const App: Component = () => {
    const [state, { isLoggedIn, getUser }] = useStore();
	console.log(getUser())
    return (
        <div>
            <div class="w-screen h-screen flex origin-center bg-accent">
                <div class="m-auto">
                    <img src="assets/gogopresent.png" class="w-54 -mb-4 ml-auto mr-auto " />
                    <div class="bg-primary border-primary w-64 p-8 border-6 rounded-lg shadow-lg">
                        {isLoggedIn() ? (<Room />) : (<Login />)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default App;
