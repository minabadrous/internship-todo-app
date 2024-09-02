const postTodo = async (todo) => {
  return await fetch("http://127.0.0.1:8000/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

export default postTodo;
