import { Component, createSignal, For } from "solid-js";
import { createStore } from 'solid-js/store'
import context from '../store/store'

interface LoginData {
	name: string,
	password: string,
}

const Login: Component = () => {

	const [user, setUser] = createStore<LoginData>({ name: "", password: "" })

	const tryLogin = async (e: SubmitEvent) => {
		e.preventDefault()
		context.login(user.name, user.password)
	}

	return <div>
		<form onSubmit={tryLogin}>
			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="name"
				value={user.name}
				required
				onChange={(e) => setUser("name", e.currentTarget.value)}
				placeholder="Name" />
			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="name"
				value={user.password}
				required
				onChange={(e) => setUser("password", e.currentTarget.value)}
				placeholder="Password" />
			{ context.error() != "" && <p class="text-accent text-center border-4 mt-2 text-sm font-bold border-error">{context.error()}</p>}
			<input
				type="submit"
				class="text-accent bg-secondary shadow-xl border-secondary border-2 rounded-md text-center w-full mt-2"
				value="Anmelden" />
		</form>
	</div>;
}

export default Login;
