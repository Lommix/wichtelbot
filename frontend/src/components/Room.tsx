import { Component, For, createSignal } from "solid-js";
import { useStore } from "../store";
import Chat from "./Chat";


const Room: Component = () => {
	const [state, { logout }] = useStore()

    return <div>
        <Chat />
		<button onclick={logout}>Logout</button>
    </div>;
};

export default Room
