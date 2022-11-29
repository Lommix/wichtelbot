import { Component, createSignal, For, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { IUser } from '../store/store'
import context from '../store/store'
import Settings from "./Settings"
import Partner from "./Partner"


const MAX_TAGS = 10
const MIN_TAGS = 3

const Detail: Component<{ user: IUser }> = (props) => {
	return <div>
		{props.user &&
			<div>

				<Settings notice={props.user.Notice} tags={props.user.Tags} />

				<Show when={props.user.Partner}>
					<Partner name={props.user.Partner.Name} notice={props.user.Partner.Notice} tags={props.user.Partner.Tags} />
				</Show>

				<Show when={!props.user.Partner}>
					<p>Hier steht bald dein Partner</p>
				</Show>

				<button
					onClick={() => context.logout()}
					class="text-accent bg-secondary shadow-xl border-secondary border-2 rounded-md text-center w-full mt-2">
					logout
				</button>
			</div>
		}
	</div >
}

export default Detail
