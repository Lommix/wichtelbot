import { Component, createSignal, For } from "solid-js";
import { createStore } from 'solid-js/store'
import { IUser } from "../store/store";
import context from '../store/store'

const MIN_TAGS: number = 2
const MAX_TAGS: number = 3

const Register: Component = () => {

	const [user, setUser] = createStore<IUser>({
		Name: "",
		Tags: [],
		Notice: "",
		Password: "",
	})

	const [tag, setTag] = createSignal<string>("")
	const [error, setError] = createSignal<string>("")

	const removeTag = (tag: string) => {
		const next = user.Tags.filter((t) => t != tag)
		setUser("Tags", next)
	}

	const addTag = (e: SubmitEvent) => {
		e.preventDefault()
		const next = [...user.Tags, tag()]
		setUser("Tags", next)
		setTag("")
	}

	const register = (e: SubmitEvent) => {
		e.preventDefault()

		if(user.Tags.length < MIN_TAGS){
			return
		}

		context.register(user).catch(response => {
			console.log(response)
		})
	}

	return <div>
		<form onSubmit={register}>
			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="name"
				value={user.Name}
				required
				onChange={(e) => setUser("Name", e.currentTarget.value)}
				placeholder="Name" />
			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="name"
				value={user.Name}
				required
				onChange={(e) => setUser("Password", e.currentTarget.value)}
				placeholder="Password" />
			{context.error() != "" && <p class="text-secondary bg-error text-center border-4 mt-2 p-1 rounded-lg text-sm border-error">{context.error()}</p>}
			<input
				type="submit"
				class="text-accent bg-secondary shadow-xl border-secondary border-2 rounded-md text-center w-full mt-2"
				value="Registrieren" />
		</form>
		<div class="flex flex-wrap gap-1 mt-2 w-full h-fit">
			<For each={user.Tags}>
				{(tag, i) => (
					<button
						class="transition transform w-full ease-in-out duration-300 hover:rounded-md hover:bg-error active:bg-secondary active:text-error text-md rounded-xl bg-accent border-1 border-accent h-fit p-2 text-secondary"
						onClick={() => removeTag(tag)} >
						{tag}
					</button>
				)}
			</For>
		</div>
		{user.Tags.length < MIN_TAGS && <div class="text-error bg-accent p-1 mt-3 rounded-lg text-sm font-bold text-center">mindestens {MIN_TAGS} Themen!</div>}
		{
			user.Tags.length < MAX_TAGS && <form onSubmit={addTag} class="flex flex-row mt-1">
				<input
					type="text"
					class="w-full border-2 inline-block rounded-tl-lg rounded-bl-lg border-accent bg-accent text-secondary p-1"
					id="pref"
					value={tag()}
					onChange={(e) => setTag(e.currentTarget.value)}
					required
					placeholder="Nenne ein Thema" />
				<input type="submit" class="text-accent rounded-br-lg rounded-tr-lg font-bold p-2  bg-secondary" value=">" />
			</form>
		}

		<input
			type="text"
			class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
			value={user.Notice}
			required
			onChange={(e) => setUser("Notice", e.currentTarget.value)}
			placeholder="Hinweis / Allergie" />
	</div>;
}
export default Register;
