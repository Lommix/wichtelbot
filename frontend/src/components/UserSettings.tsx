import { Component, For, createSignal, FlowProps, children } from "solid-js";
import { IUser } from "../store/auth";
import { useStore } from '../store'

const MAX_TAGS = 10
const MIN_TAGS = 3

const UserSettings: Component<{ user: IUser }> = (props) => {

	const [{ logout, getUser }] = useStore()

	const [tag, setTag] = createSignal<string>("");
	const removeTag = (tag: string) => {
		getUser().Tags = getUser().Tags.filter((t) => t != tag)
	}

	const addTag = (e: SubmitEvent) => {
		e.preventDefault()
		getUser().Tags.push(tag())
	}

	const setNotice = (e) => {
		getUser().Notice = e.currentTarget.value
	}

	return <div>
		<div class="flex flex-wrap gap-1 w-full content-start h-fit">
			<For each={getUser().Tags}>
				{(tag: string) => (
					<button
						class="transition transform ease-in-out duration-300 hover:rounded-md hover:bg-error active:bg-secondary active:text-error text-md rounded-xl bg-accent border-1 border-accent h-fit p-2 text-secondary"
						onClick={() => removeTag(tag)} >
						{tag}
					</button>
				)}
			</For>
		</div>
		{getUser().Tags.length < MIN_TAGS && <div class="text-error bg-accent p-1 mt-3 rounded-lg text-sm font-bold text-center">mindestens {MIN_TAGS} Wünsche!</div>}
		{
			getUser().Tags.length < MAX_TAGS && <form onSubmit={addTag} class="flex flex-row mt-1">
				<input
					type="text"
					class="w-full border-2 inline-block rounded-tl-lg rounded-bl-lg border-accent bg-accent text-secondary p-1"
					id="pref"
					value={tag()}
					onChange={(e) => setTag(e.currentTarget.value)}
					required
					placeholder="Deine Wünsche" />
				<input type="submit" class="text-accent rounded-br-lg rounded-tr-lg font-bold p-2  bg-secondary" value=">" />
			</form>
		}
		<input
			type="text"
			class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
			value={getUser().Notice}
			required
			onChange={(e) => { setNotice(e) }}
			placeholder="Hinweis" />
	</div>;
};

export default UserSettings
