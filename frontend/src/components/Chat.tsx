import { Input } from "postcss";
import { Component, For, createSignal } from "solid-js";



interface IComPackage {
	Action: string,
	Args: string
}

const Chat: Component<{}> = (props) => {

	const [chat, setChat] = createSignal<string[]>([])
	const [input, setInput] = createSignal("")

	const socket = new WebSocket("ws://localhost:8080/chat")

	socket.onopen = (e: Event) => {
		console.log(e);
	}

	socket.onmessage = (e: MessageEvent) => {

		const com : IComPackage= JSON.parse(e.data)
		console.log(com.Args)
		switch (com.Args) {
			case "say":
				setChat([...chat(), com.Args])
				break;
			default:
				setChat([...chat(), com.Args])
				break;
		}
	}

	const say = (e: SubmitEvent) => {
		e.preventDefault()
		const cp: IComPackage = {
			Action: "say",
			Args: input()
		}
		socket.send(JSON.stringify(cp))
		setInput("")
	}

	return <div class="">
		<ul class="p-2 border bg-accent h-48 rounded-lg">
			<For each={chat()}>{
				(line, i) =>
					<li class="text-secondary text-sm"><span>{line}</span></li>
			}</For>
		</ul>
		<form onSubmit={say} class="flex flex-row mt-1">
			<input
				class="w-full border-2 inline-block rounded-tl-lg rounded-bl-lg border-accent bg-accent text-secondary p-1"
				type="text"
				value={input()}
				onChange={(e) => setInput(e.currentTarget.value)}
				required
				placeholder="Chat" />
			<input type="submit" class="text-accent rounded-br-lg rounded-tr-lg font-bold p-2  bg-secondary" value=">" />
		</form>
	</div>;
};


export default Chat
