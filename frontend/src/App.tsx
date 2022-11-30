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
					<img src="/images/gogopresent.png" class="w-54 -mb-4 ml-auto mr-auto " />
					<div class="bg-primary border-primary w-64 p-6 border-6 rounded-lg shadow-lg">
						<h1 class="text-secondary text-lg w-full pb-5 text-center font-bold">GOGO-WICHTELBOT</h1>
						<Show when={context.loggedIn()}>
							<Detail user={context.user} />
						</Show>
						<Show when={!context.loggedIn()}>
							<Switch>
								<Match when={showLogin()}>
									<Login />
									<button class="text-center mt-8 w-full border rounded-lg" onClick={() => setShowLogin(false)}>Zum Registrieren</button>
								</Match>
								<Match when={!showLogin()}>
									<Register />
									<button class="text-center mt-8 w-full border rounded-lg" onClick={() => setShowLogin(true)}>Zum Login</button>
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
