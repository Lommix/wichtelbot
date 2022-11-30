import { Component, For, createSignal, FlowProps, children, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import context from '../store/store'

const MAX_TAGS = 4
const MIN_TAGS = 3

const Settings: Component<{ notice: string, tags: string[] }> = (props) => {

	type userSettings = {
		Notice: string,
		Tags: string[],
	}

	const [settings, setSettings] = createStore<userSettings>({ Notice: props.notice, Tags: props.tags })
	const [tag, setTag] = createSignal<string>("");

	const removeTag = (tag: string) => {

		if (settings.Tags.length < MIN_TAGS) {
			return
		}

		const tags = settings.Tags.filter((t) => t != tag)
		setSettings("Tags", tags)
		context.update(settings.Notice, settings.Tags)
	}

	const addTag = (e: SubmitEvent) => {
		e.preventDefault()
		const tags = [...settings.Tags, tag()]
		setSettings("Tags", tags)
		context.update(settings.Notice, settings.Tags)
	}

	const setNotice = (e) => {
		setSettings("Notice", e.currentTarget.value)
		context.update(settings.Notice, settings.Tags)
	}

	onMount(() => {
		setSettings({ Notice: context.user.Notice, Tags: context.user.Tags })
	})

	return <div class="border-4 rounded-lg p-2 transition-all ease-in-out delay-150 transform">
		<div class="flex flex-wrap gap-1 w-full content-start h-fit">
			<For each={settings.Tags}>
				{(tag: string) => (
					<button
						class="transition w-full transform ease-in-out duration-300 hover:rounded-md hover:bg-error active:bg-secondary active:text-error text-md rounded-xl bg-accent border-1 border-accent h-fit p-2 text-secondary"
						onClick={() => removeTag(tag)} >
						{tag}
					</button>
				)}
			</For>
		</div>
		<Show when={settings.Tags}>
			{settings.Tags.length < MIN_TAGS && <div class="text-error bg-accent p-1 mt-3 rounded-lg text-sm font-bold text-center">mindestens {MIN_TAGS} Wünsche!</div>}
			{
				settings.Tags.length < MAX_TAGS && <form onSubmit={addTag} class="flex flex-row mt-1">
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
				value={settings.Notice}
				required
				onChange={(e) => { setNotice(e) }}
				placeholder="Hinweis / Allergien" />
		</Show>


	</div>;
};

export default Settings
