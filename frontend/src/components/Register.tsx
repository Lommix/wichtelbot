import { Accessor, Component, createSignal, For } from "solid-js";
import { createStore } from 'solid-js/store'
import { IUser } from "../store/store";
import context from '../store/store'

const MIN_TAGS: number = 2

type Fields = {
	Name: string,
	PasswordOne: string,
	PasswordTwo: string,
	Key: string,
	Notice: string,
	Tags: string[]
}

const Register: Component = () => {

	const [fields, setFields] = createStore<Fields>({
		Name: "",
		PasswordOne: "",
		PasswordTwo: "",
		Key: "",
		Notice: "",
		Tags: [],
	})

	const [error, setError] = createSignal<string>()

	const removeTag = (index: Accessor<number>) => {
		let next = [...fields.Tags]
		next.splice(index(), 1)
		setFields("Tags", next)
	}

	const addTag = () => {
		const next = [...fields.Tags, ""]
		setFields("Tags", next)
	}

	const ChangeTag = (index: Accessor<number>, value: string) => {
		const next = [...fields.Tags]
		next[index()] = value
		setFields("Tags", next)
	}

	const register = async (e: SubmitEvent) => {
		e.preventDefault()

		if (fields.Tags.length < MIN_TAGS) {
			setError("Bitte gib mindestens 2 Themen an")
			return
		}

		if (fields.PasswordOne !== fields.PasswordTwo) {
			setError("Deine Passwörter unterscheiden sich")
			return
		}

		const user: IUser = {
			Name: fields.Name,
			Password: fields.PasswordOne,
			Notice: fields.Notice,
			Tags: fields.Tags,
		}

		const response = await context.register(user, fields.Key)

		if (response.error !== undefined) {
			setError(response.error)
			return
		}
	}

	return <div>
		<form onSubmit={register}>
			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="name"
				value={fields.Name}
				required
				onChange={(e) => setFields("Name", e.currentTarget.value)}
				placeholder="Name*" />
			<input
				type="password"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="password"
				value={fields.Name}
				required
				onChange={(e) => setFields("PasswordOne", e.currentTarget.value)}
				placeholder="Password*" />
			<input
				type="password"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="password"
				value={fields.Name}
				required
				onChange={(e) => setFields("PasswordTwo", e.currentTarget.value)}
				placeholder="Password wiederhohlen*" />

			<div class="mt-2 pt-2 mb-2 border-t-2">
				<div class="flex flex-row border-secondary">
					<p class="font-bold w-fit flex-grow">Themen:</p>
					<a class="bg-success rounded-lg cursor-pointer w-5 text-center font-bold" onClick={() => addTag()}>+</a>
				</div>
				<div class="w-full mt-4">
					<For each={fields.Tags}>
						{(tag: string, index) => (
							<div class="flex flex-grow flex-row w-full mt-1">
								<input
									type="text"
									class="p-1 w-full flex-grow rounded-l-lg"
									id="key"
									value={tag}
									required
									onChange={(e) => ChangeTag(index, e.currentTarget.value)}
									placeholder="" />
								<a class="w-fit text-secondary rounded-r-lg bg-error h-full p-1 cursor-pointer" onClick={() => { removeTag(index) }}>X</a>
							</div>
						)}
					</For>
				</div>
			</div>

			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				id="key"
				value={fields.Key}
				required
				onChange={(e) => setFields("Key", e.currentTarget.value)}
				placeholder="Schlüssel*" />
			<input
				type="text"
				class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
				value={fields.Notice}
				onChange={(e) => setFields("Notice", e.currentTarget.value)}
				placeholder="Hinweis / Allergie" />

			{error() && <p class="text-secondary bg-error text-center border-4 mt-2 p-1 rounded-lg text-sm border-error">{error()}</p>}

			<div class="border-t-2 mt-2 mb-2"></div>
			<input
				type="submit"
				class="text-accent bg-secondary shadow-xl border-secondary border-2 cursor-pointer rounded-md text-center w-full mt-2"
				value="Registrieren" />
		</form>
	</div>;
}
export default Register;
