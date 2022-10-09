import { Input } from "postcss";
import { Component, For, createSignal } from "solid-js";


const Chat: Component<{}> = (props) => {

    const [chat, setChat] = createSignal<string[]>(["hello", "this", "test", "dasda dashdashd asd asdhahsd asdhasdhasd ashdhasdhdas"])
    const [input, setInput] = createSignal("")

    const socket = new WebSocket("ws://localhost:8080/chat")

    socket.onopen = (e: Event) => {
        console.log(e);
    }

    socket.onmessage = (e: MessageEvent) => {
        console.log(e);
    }
    const say = (e: SubmitEvent) => {
        e.preventDefault()
        socket.send(input())
        setInput("")
    }

    return <div class="">
        <ul class="p-2 border bg-accent h-48 rounded-lg">
            <For each={chat()}>{
                (line, i) =>
                    <li class="text-secondary text-sm"><span class="font-bold text-success">Lorenz: </span><span>{line}</span></li>
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
