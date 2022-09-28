import { Component, createSignal, For } from "solid-js";

const Login: Component = () => {
    const [name, setName] = createSignal<string>("");
    const [tags, setTags] = createSignal<string[]>([], { equals: false });
    const [tag, setTag] = createSignal<string>("");

    const login = async (e: SubmitEvent) => {
        e.preventDefault()

        fetch("http://127.0.0.1:8080/api").then((r: Response) => {
            console.log(r)
        })
    }

    const removeTag = () => {

    }
    const addTag = (e: SubmitEvent) => {
        e.preventDefault()
        console.log(tags())
    }

    return <div class="w-screen flex h-screen">
        <div class="bg-primary border-primary w-64 p-8 m-auto border-4 rounded-lg shadow-lg">
            <h1 class="text-secondary text-lg w-full pb-5 text-center font-bold">WICHTELBOT 2.0</h1>
            <div class="flex w-full h-32 border">
                <For each={tags()}>
                    {(tag, i) => (
                        <p class="text-lg">{tag}</p>
                    )}
                </For>
            </div>
            <form onSubmit={addTag}>
                <input
                    type="text"
                    class="w-full border-2 mt-2 rounded-md border-accent bg-accent text-secondary p-1"
                    id="pref"
                    value={tag()}
                    onChange={(e) => setTag(e.currentTarget.value)}
                    required
                    placeholder="Deine Wünsche" />

                <input type="submit" hidden />
            </form>
            <form onSubmit={login}>
                <input
                    type="text"
                    class="w-full border-2 rounded-md border-accent bg-accent text-secondary p-1"
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
        </div>
    </div>;
}

export default Login;
