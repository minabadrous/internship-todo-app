const fetchTodos = async (options) => {
  return await fetch(
    `http://127.0.0.1:8000/api/todos/${options?.filter ? "history" : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((err) => console.error(err));
};

export default fetchTodos;
