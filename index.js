const model = {
  init: async function () {
    const todos = await this.fetchTodos();
    this.todos = todos;
    view.renderAllTodos();
  },
  todos: [],
  addTodo: async function (todo) {
    const newTodo = await this.saveTodoToServer(todo);
    if (newTodo) {
      this.todos.push(newTodo);
      await this.fetchTodos();
      view.renderAllTodos();
    }
  },
  removeTodo: async function (id) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index > -1) {
      this.todos.splice(index, 1);

      view.renderAllTodos();
    }
  },
  markAsCompleted: async function (id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.Completed = true;

      view.renderAllTodos();
    }
  },
  getTodos: function () {
    return this.todos;
  },
  fetchTodos: async function () {
    return await fetch("http://127.0.0.1:8000/api/todos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data.todos)
      .catch((error) => console.log(error));
  },
};

const view = {
  init: function () {
    this.renderAllTodos();
  },
  renderTodo: function (todo) {
    const completedClass = todo.Completed ? "completed" : "";
    const todoElem = `<li class="text-Slot ${completedClass}" data-id="${todo.id}">
      <div class="small-txt-Field">${todo.Title}</div>
      <button class="done-Btn" type="button">
        <i class="fas fa-check"></i>
      </button>
      <button class="delete-Btn" type="button">
        <i class="fas fa-trash-alt"></i>
      </button></li>`;
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.innerHTML += todoElem;
  },
  renderAllTodos: function () {
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.innerHTML = "";
    model.fetchTodos();
    model.getTodos().forEach((todo) => this.renderTodo(todo));
  },
};

const controller = {
  init: function () {
    this.handleAddTodo();
    this.handleTodoActions();
  },
  handleAddTodo: function () {
    const formElem = document.getElementById("task-Form");
    formElem.addEventListener("submit", async function (e) {
      e.preventDefault();
      const inputElemVal = document.getElementById("task-Input").value;
      const newTodo = {
        Title: inputElemVal,
        Completed: false,
        created_at: "",
        updated_at: "",
      };
      await model.addTodo(newTodo);
    });
  },
  handleTodoActions: function () {
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.addEventListener("click", async function (e) {
      if (e.target.closest(".delete-Btn")) {
        const todoId = parseInt(e.target.closest("li").dataset.id);
        await model.removeTodo(todoId);
      } else if (e.target.closest(".done-Btn")) {
        const todoId = parseInt(e.target.closest("li").dataset.id);
        await model.markAsCompleted(todoId);
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  view.init();
  controller.init();
});
