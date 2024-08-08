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
  fetchTodos: async function () {
    const fetchedData = await fetch("http://127.0.0.1:8000/api/todos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data.todos)
      .catch((error) => error);

    return fetchedData;
  }
};

const view = {
  init: function () {
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo));
  },
  renderTodo: function (todo) {
    let todoElem = `
    <li data-uid="${todo.id}" class="taskItem">
    <p class="taskTitle">${todo.title}</p>
    <button class="checkBtn actionBtn" type="button"><i class="fas fa-check-circle" style="color: #ffffff;"></i></button>
    <button class="delBtn actionBtn" type="button"><i class="fas fa-trash" style="color: #ffffff;"></i></button>
    </li>`;
    if (todo.completed) {
      todoElem = todoElem.replace(`class="taskTitle"`, `class="taskTitle done"`);
    }
    //no need for another one to check deleted ones bc it shouldnt render asln 
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
    let taskTitle;
    formElem.addEventListener("submit", function (e) {
      taskTitle = todoInput.value;
      e.preventDefault();
      model.addTodo({
        title: taskTitle,
        completed: false,
      });
      todoInput.value = null;
      controller.addTodo(taskTitle);
    });

  },

  handleDeleteTodo: function (id) {
    this.deleteTodo(id);
  },

  handleUpdateTodo: function (id) {
    this.updateTodo(id);
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
  },
  deleteTodo: async function (id) {
    const delRequest = await fetch(
      `http://127.0.0.1:8000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        return error;
      });
    return delRequest;
  },
  updateTodo: async function (id) {
    this.toggleBtnState("check", id);
    const editRequest = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",//to know that the data is of type json
      },
      body: JSON.stringify({
        completed: !model.todos.filter((todo) => todo.id === parseInt(id))[0].completed,
      }),//turning json to string 
    })
      .then((res) => {
        if (res.ok) {
          this.toggleBtnState("check", id);
          return res.json()
        }
      })
      .catch((error) => {
        this.toggleBtnState("check", id);
        return error;
      });
    return editRequest;
  },
  addTodo: async function (taskTitle) {
    const fetchedData = await fetch("http://127.0.0.1:8000/api/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",//to know that the data is of type json
      },
      body: JSON.stringify({
        title: taskTitle,
        completed: false,
      }),//turning json to string 
    })
      .then((res) => res.json())
      .then((data) => data.todos)
      .catch((error) => error);

    return fetchedData;
  },
  toggleBtnState: function (btnType, id) {
    const todo = document.querySelector(`[data-uid = "${id}"]`);
    if (btnType == "check") {
      const checkBtn = todo.querySelector(".checkBtn");
      checkBtn.disabled = !checkBtn.disabled;
    }
    else if (btnType == "delete") {
      const delBtn = todo.querySelector(".delBtn");
      delBtn.disabled = !delBtn.disabled;
    }

  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  controller.init();
  view.init();
});
