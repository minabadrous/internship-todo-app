const deleteTodo = async (todo, onSuccess) => {
  fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        onSuccess(todo);
        return res.ok;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default deleteTodo;
