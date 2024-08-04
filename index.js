const model = {
  init: async function () {
    this.todos = await this.fetchTodos();
    view.renderAllTodos(this.todos);
  },
  todos: [],
  addTodo: function (newTodo) {
    this.todos.push(newTodo);
    view.renderAllTodos(this.todos);
  },
  removeTodo: async function (id, button) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index > -1) {
      this.todos.splice(index, 1);
      view.disableButton(button);
      try {
        await controller.deleteTodoFromServer(id);
        view.renderAllTodos(this.todos);
        view.enableButton(button);
      } catch (error) {
        console.error(error);
      }
    }
  },
  toggleCompleted: async function (id, button) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.Completed = !todo.Completed;
      view.disableButton(button);
      try {
        await controller.updateTodoOnServer(todo);
        view.renderAllTodos(this.todos);
        view.enableButton(button);
      } catch (error) {
        console.error(error);
      }
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
  filterTodos: function (filter) {
    if (filter === "all") {
      return this.todos;
    } else if (filter === "completed") {
      return this.todos.filter((todo) => todo.Completed);
    } else if (filter === "pending") {
      return this.todos.filter((todo) => !todo.Completed);
    }
  },
};

const view = {
  init: function () {
    this.renderAllTodos(model.getTodos());
    this.setupDropdownListeners();
  },
  renderTodo: function (todo) {
    const completedClass = todo.Completed ? "completed" : "";
    const todoElem = `<li class="text-Slot ${completedClass}" data-id="${todo.id}">
      <div class="small-txt-Field">${todo.Title}</div>
      <button class="done-Btn" type="button" data-id="${todo.id}">
        <i class="fas fa-check"></i>
      </button>
      <button class="delete-Btn" type="button" data-id="${todo.id}">
        <i class="fas fa-trash-alt"></i>
      </button></li>`;
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.innerHTML += todoElem;
  },
  renderAllTodos: function (todos) {
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.innerHTML = "";
    todos.forEach((todo) => this.renderTodo(todo));
  },
  setupDropdownListeners: function () {
    document.querySelectorAll(".dropdown-content a").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = e.target.className;
        const filteredTodos = model.filterTodos(filter);
        this.renderAllTodos(filteredTodos);
      });
    });
  },
  disableButton: function (button) {
    button.disabled = true;
  },
  enableButton: function (button) {
    button.disabled = false;
  },
};

const controller = {
  init: async function () {
    await this.handleAddTodo();
    this.handleTodoActions();
  },
  handleAddTodo: async function () {
    const formElem = document.getElementById("task-Form");
    formElem.addEventListener("submit", async function (e) {
      e.preventDefault();
      const inputElemVal = document.getElementById("task-Input").value;
      const newTodo = {
        Title: inputElemVal,
        Completed: false,
      };
      await controller.saveTodoToServer(newTodo);
      formElem.reset();
    });
  },
  saveTodoToServer: async function (todo) {
    return await fetch("http://127.0.0.1:8000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        model.addTodo(data);
      })
      .catch((error) => console.log(error));
  },
  deleteTodoFromServer: async function (id) {
    return await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network error");
      })
      .catch((error) => {
        throw new Error("Network error");
      });
  },
  updateTodoOnServer: async function (todo) {
    return await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Network error");
      })
      .catch((error) => {
        throw new Error("Network error");
      });
  },
  handleTodoActions: function () {
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.addEventListener("click", async function (e) {
      const todoId = parseInt(e.target.closest("li").dataset.id);
      const button = e.target.closest("button");
      if (button && button.classList.contains("delete-Btn")) {
        await model.removeTodo(todoId, button);
      } else if (button && button.classList.contains("done-Btn")) {
        await model.toggleCompleted(todoId, button);
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  view.init();
  await controller.init();
});
