const model = {
  todos: [],
  init: async function () {
    const fetchedTodos = await this.fetchTodos();
    this.todos = fetchedTodos;
  },
  addTodo: function (todo) {
    this.todos.push(todo);
    view.renderTodo(todo);
  },
  getTodos: function () {
    return this.todos;
  },
  deleteTodo: function (id) {
    this.todos = this.todos.filter((todo) => todo.id !== parseInt(id));
    removeTodo(id);
  },
  updateTodo: function (id) {
    let completedTodo = this.todos.filter((todo) => todo.id === parseInt(id))[0];
    if (completedTodo) {
      completedTodo.completed = !completedTodo.completed;
    }
  },
  fetchTodos: async function () {
    const fetchedData = await fetch("http://127.0.0.1:8000/api/todos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data.todos)
      .catch((error) => console.log(`Server Error:${error}`));

    return fetchedData;
  },
  removeTodo: async function (id) {
    const delRequest = await fetch(
      "http://127.0.0.1:8000/api/todos", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(`Server Error:${error}`));
    return delRequest;
  },
  editTodo: async function (id) {
    const editRequest = await fetch("http://127.0.0.1:8000/api/todos", {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(`Server Error:${error}`));
    return editRequest;
  }
};

const view = {
  init: function () {
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo));
  },
  renderTodo: function (todo) {
    const todoElem = `
    <li data-uid="${todo.id}" class="taskItem">
    <p class="taskTitle">${todo.title}</p>
    <button class="checkBtn actionBtn" type="button"><i class="fas fa-check-circle" style="color: #ffffff;"></i></i></button>
    <button class="delBtn actionBtn" type="button"><i class="fas fa-trash" style="color: #ffffff;"></i></button>
    </li>`;
    const todoListElem = document.getElementById("todoList");

    todoListElem.innerHTML += todoElem;
    return;
  }
};

const controller = {
  init: function () {
    this.attachEventListeners();
    this.handleAddTodo();
  },
  handleAddTodo: function () {
    const formElem = document.getElementById("taskAdder");
    const todoInput = document.getElementById("taskInput");
    formElem.addEventListener("submit", function (e) {
      let taskTitle = todoInput.value;
      e.preventDefault();
      model.addTodo({
        id: model.getTodos()[model.getTodos().length - 1].id + 1,
        title: taskTitle,
        completed: false,
        created_at: "",
        updated_at: "",
      });

      todoInput.value = null;
    });
  },

  handleDeleteTodo: function (id) {
    model.deleteTodo(id);
  },

  handleUpdateTodo: function (id) {
    model.updateTodo(id);
  },

  attachEventListeners: function () {
    document.querySelector("ul").addEventListener('click', (event) => {
      const taskItem = event.target.closest('li');
      const uid = taskItem.getAttribute("data-uid");//works

      if (event.target.matches(".delBtn, .fa-trash")) {
        taskItem.remove();
        this.handleDeleteTodo(uid);
      }
      else if (event.target.matches(".checkBtn, .fa-check-circle")) {
        const taskText = taskItem.querySelector('p');
        taskText.classList.toggle('done');
        this.handleUpdateTodo(uid);
      }
    })
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  controller.init();
  view.init();
});
