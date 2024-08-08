function toggleCheckBtnState(id) {
    const todo = document.querySelector(`[data-uid = "${id}"]`);
    const checkBtn = todo.querySelector(".checkBtn");
    console.log(checkBtn.disabled);
    checkBtn.disabled = !checkBtn.disabled;
    console.log(checkBtn.disabled);
}
async function patchTodo({ todo }) {
    console.log(`IN PATCH ${todo}`);

    //toggleCheckBtnState(id);
    const editRequest = await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",//to know that the data is of type json
        },
        body: JSON.stringify({ completed: !todo.completed }),//turning json to string 
    })
        .then((res) => {
            if (res.ok) {
                //toggleCheckBtnState(id);
                return res.json()
            }
        })
        .catch((error) => {
            //toggleCheckBtnState(id);
            return error;
        });
    return editRequest;
}

export default patchTodo;

