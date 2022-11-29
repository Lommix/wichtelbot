import { Component, onMount } from 'solid-js';
import Register from './components/Register'
import Detail from './components/Detail'
import Login from './components/Login'
import context from './store/store'


const App: Component = () => {
	return (
		<div>
			<div class="w-screen h-screen flex origin-center bg-accent">
				<div class="m-auto">
					<img src="assets/gogopresent.png" class="w-54 -mb-4 ml-auto mr-auto " />
					<div class="bg-primary border-primary w-64 p-8 border-6 rounded-lg shadow-lg">
						<div>{context.loggedIn() ? (<Detail />) : <div>(<Login /><Register />)</div>}</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default App;
