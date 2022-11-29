import { Component, createSignal, Match, onMount, Show, Switch } from 'solid-js';
import Register from './components/Register'
import Detail from './components/Detail'
import Login from './components/Login'
import context from './store/store'


const App: Component = () => {

	const [showLogin, setShowLogin] = createSignal<boolean>(true)

	onMount(() => {
		context.pullUser()
	})

	return (
		<div>
			<div class="w-screen h-screen flex origin-center bg-accent">
				<div class="m-auto">
					<img src="assets/gogopresent.png" class="w-54 -mb-4 ml-auto mr-auto " />
					<div class="bg-primary border-primary w-64 p-8 border-6 rounded-lg shadow-lg">
						<Show when={context.loggedIn()}>
							<Detail user={context.user} />
						</Show>
						<Show when={!context.loggedIn()}>
							<Switch>
								<Match when={showLogin()}>
									<Login />
									<button onClick={() => setShowLogin(false)}>Registrieren</button>
								</Match>
								<Match when={!showLogin()}>
									<Register />
									<button onClick={() => setShowLogin(true)}>Einloggen</button>
								</Match>
							</Switch>
						</Show>
					</div>
				</div>
			</div>
		</div >
	)
}

export default App;
