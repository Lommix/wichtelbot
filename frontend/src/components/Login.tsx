import { Component, createSignal, For } from "solid-js";
import { apiGet, apiPost } from "../Api";

const MIN_TAGS: number = 3
const MAX_TAGS: number = 10
const URL = "http://localhost:8080/login"

const Login: Component = () => {
    const [name, setName] = createSignal<string>("");
    const [tags, setTags] = createSignal<string[]>(["klick mich", "these"]);
    const [notice, setNotice] = createSignal<string>("");
    const [tag, setTag] = createSignal<string>("");

    const login = async (e: SubmitEvent) => {
        e.preventDefault()
        apiPost<{ message: string }>(URL, { name: name(), tags: tags() }).then(data => {
            console.log(data)
        })
    }

    const removeTag = (tag: string) => {
        const next = tags().filter((t) => t != tag)
        setTags(next)
    }

    const addTag = (e: SubmitEvent) => {
        e.preventDefault()
        const next = [...tags(), tag()]
        setTags(next)
        setTag("")
    }

    return <div>
        <h1 class="text-secondary text-lg w-full pb-5 text-center font-bold">GOGO-WICHTELBOT</h1>
        <div class="flex flex-wrap gap-1 w-full content-start h-fit">
            <For each={tags()}>
                {(tag, i) => (
                    <button
                        class="transition transform ease-in-out duration-300 hover:rounded-md hover:bg-error active:bg-secondary active:text-error text-md rounded-xl bg-accent border-1 border-accent h-fit p-2 text-secondary"
                        onClick={() => removeTag(tag)} >
                        {tag}
                    </button>
                )}
            </For>
        </div>
        {tags().length < MIN_TAGS && <div class="text-error bg-accent p-1 mt-3 rounded-lg text-sm font-bold text-center">mindestens {MIN_TAGS} Wünsche!</div>}
        {
            tags().length < MAX_TAGS && <form onSubmit={addTag} class="flex flex-row mt-1">
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
            value={notice()}
            required
            onChange={(e) => setNotice(e.currentTarget.value)}
            placeholder="Hinweis" />
        <form onSubmit={login}>
            <input
                type="text"
                class="w-full border-2 rounded-md border-accent mt-2 bg-accent text-secondary p-1"
                id="name"
                value={name()}
                required
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Name" />
            <input
                type="submit"
                class="text-accent bg-secondary shadow-xl border-secondary border-2 rounded-md text-center w-full mt-2"
                value="Enter" />
        </form>
    </div>;
}

export default Login;
