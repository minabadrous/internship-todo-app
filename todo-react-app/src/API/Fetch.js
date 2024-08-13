async function fetchTodos(options) {
    const url = `http://127.0.0.1:8000/api/todos/${options?.filter ? "history" : ""}`;

    try {
        const fetchedData = await fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((error) => error);
        return fetchedData;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default fetchTodos;