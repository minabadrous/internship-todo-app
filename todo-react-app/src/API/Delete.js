async function deleteTodo(id) {
    const delRequest = await fetch(
        `http://127.0.0.1:8000/api/todos/${id}`, {
        method: "DELETE",
    })
        .then((res) => {
            return res.ok;
        })
        .catch((error) => {
            return error;
        });

    return delRequest;
}


export default deleteTodo;