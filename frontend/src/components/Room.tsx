import { Component, For, createSignal } from "solid-js";
import { apiGet } from "../Api";
import Chat from "./Chat";


const Room: Component = () => {
    return <div>
        <Chat />
    </div>;
};

export default Room
