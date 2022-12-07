import { Component, createSignal, For, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { IUser } from '../store/store'
import context from '../store/store'
import Settings from "./Settings"
import Partner from "./Partner"


const Detail: Component<{ user: IUser }> = (props) => {

	const [showSettings, setShowSettings] = createSignal<boolean>(false)

	return <div>
		{props.user &&
			<div class="relative">
				<span class="w-full block text-center mb-1">Hallo, <span class="font-bold">{props.user.Name}</span></span>

				<Show when={props.user.Partner.Name}>
					<Partner name={props.user.Partner.Name} notice={props.user.Partner.Notice} tags={props.user.Partner.Tags} />
				</Show>

				<Show when={!props.user.Partner.Name}>
					<p class="text-secondary text-lg font-bold text-center rounded-lg bg-accent p-2 mt-1">Hier steht bald dein Partner!</p>
				</Show>

				<button
					onClick={() => context.logout()}
					class="text-accent hover:animate-pulse font-bold text-center w-full mt-4">
					Logout
				</button>
			</div>
		}
	</div >
}

export default Detail
