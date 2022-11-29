import { Component, createSignal, For } from "solid-js"
import { createStore } from "solid-js/store"
import { IUser } from '../store/store'
import context from '../store/store'


const MAX_TAGS = 10
const MIN_TAGS = 3

const Detail: Component = () => {

	const logoutAction = () => {
		console.log("you are loggin out")
		console.log(context.user())
		context.logout()
	}

	const [user, setUser] = createStore<IUser>({} as IUser)

	console.log(user.Name)
	const [tag, setTag] = createSignal<string>("");
	const [notice, setNotice] = createSignal<string>("");

	const removeTag = (tag: string) => {
		// user.Tags = user.Tags.filter((t) => t != tag)
	}

	const addTag = (e: SubmitEvent) => {
		e.preventDefault()
	}

	return <div>
		<button
			onClick={logoutAction}
			class="text-accent bg-secondary shadow-xl border-secondary border-2 rounded-md text-center w-full mt-2">
			logout
		</button>
		{!context.user.loading && <div><p>Hallo {context.user().Name}, logged in!</p>
			<div>
				Dein Partner: {context.user().Partner.Name}
			</div>
			<div>
				Themen: {context.user().Partner.Tags}
			</div>
			<div>
				Hinweis/Allergien: {context.user().Partner.Notice}
			</div>
			<p>Hier steht bald dein Partner</p></div>}
	</div >
}


export default Detail


		// <div>
		// 	<div class="flex flex-wrap gap-1 w-full content-start h-fit">
		// 		<For each={user.Tags}>
		// 			{(tag: string) => (
		// 				<button
		// 					class="transition transform ease-in-out duration-300 hover:rounded-md hover:bg-error active:bg-secondary active:text-error text-md rounded-xl bg-accent border-1 border-accent h-fit p-2 text-secondary"
		// 					onClick={() => removeTag(tag)} >
		// 					{tag}
		// 				</button>
		// 			)}
		// 		</For>
		// 	</div>
		// 	{user.Tags.length < MIN_TAGS && <div class="text-error bg-accent p-1 mt-3 rounded-lg text-sm font-bold text-center">mindestens {MIN_TAGS} Wünsche!</div>}
		// 	{
		// 		user.Tags.length < MAX_TAGS && <form onSubmit={addTag} class="flex flex-row mt-1">
		// 			<input
		// 				type="text"
		// 				class="w-full border-2 inline-block rounded-tl-lg rounded-bl-lg border-accent bg-accent text-secondary p-1"
		// 				id="pref"
		// 				value={tag()}
		// 				onChange={(e) => setTag(e.currentTarget.value)}
		// 				required
		// 				placeholder="Deine Wünsche" />
		// 			<input type="submit" class="text-accent rounded-br-lg rounded-tr-lg font-bold p-2  bg-secondary" value=">" />
		// 		</form>
		// 	}
		// 	<input
		// 		type="text"
		// 		class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
		// 		value={user.Notice}
		// 		required
		// 		onChange={(e) => { setNotice(e) }}
		// 		placeholder="Hinweis" />
		//
		// </div>
