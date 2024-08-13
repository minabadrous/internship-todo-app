async function postTodo(taskTitle) {

    const fetchedData = await fetch('http://127.0.0.1:8000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: taskTitle,
            completed: false
        }),
    })
        .then((res) => res.json())
        .then((data) => data.data)
        .catch((error) => error);
    return fetchedData;
}

export default postTodo;