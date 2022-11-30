import { Component, For } from "solid-js";




const Partner: Component<{ name: string, notice: string, tags: string[] }> = (props) => {
	return <div class="border-2 p-1 rounded-lg mt-2 border-accent bg-accent">
		<p class="relative w-full bg-accent text-secondary text-center font-bold border-b-2 p-4 border-secondary">{props.name}</p>
		<p class="text-center mt-4 text-secondary">Themen:</p>
		<For each={props.tags}>
			{(tag: string) => (
				<p class="bg-success font-bold text-secondary m-1 rounded-lg p-1 text-center">{tag}</p>
			)}
		</For>
		<p class="text-center mt-4 text-secondary">Hinweis:</p>
		<p class="bg-secondary font-bold text-accent m-1 rounded-lg p-1 text-center">{props.notice}</p>
	</div>;
};


export default Partner
