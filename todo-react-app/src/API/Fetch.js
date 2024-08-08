async function fetchTodos() {
    const fetchedData = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => data.todos)
        .catch((error) => error);

    return fetchedData;
}

export default fetchTodos;