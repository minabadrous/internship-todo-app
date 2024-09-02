const patchTodo = async (todo, onSuccess) => {
  return await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => onSuccess(data.data))
    .catch((error) => {
      console.log(error);
    });
};

export default patchTodo;
