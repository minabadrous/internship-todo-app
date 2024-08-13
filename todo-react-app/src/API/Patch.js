function toggleCheckBtnState(id) {
    const todo = document.querySelector(`[data-uid = "${id}"]`);
    const checkBtn = todo.querySelector(".checkBtn");
    checkBtn.disabled = !checkBtn.disabled;
}
export async function patchTodo(todo) {
    toggleCheckBtnState(todo.id);
    const editRequest = await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",//to know that the data is of type json
        },
        body: JSON.stringify(todo),
    })
        .then((res) => {
            if (res.ok) {
                toggleCheckBtnState(todo.id);
                return res.json();
            }
        })
        .then((res) => res.data)
        .catch((error) => {
            toggleCheckBtnState(todo.id);
            return error;
        });
    return editRequest;
}

export default patchTodo;

