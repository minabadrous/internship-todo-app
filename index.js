const model = {
  todos: [],

  init: async function() {
    await this.fetchTodos();
    view.renderTodos(this.todos);
  },

  getTodos: function() {
    return this.todos;
  },

  fetchTodos: async function() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/todos");
      const data = await res.json();
      this.todos = data.todos || [];
    } catch (error) {
      console.log(error);
      this.todos = [];
    }
  },

  updateTodo: function(id, completed) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = completed;
      view.updateTodoView(id, completed);
    }
  },
};

const view = {
  init: function() {
    this.setupContextMenu();
    this.setupNetworkStatus();
  },

  renderTodo: function(todo) {
    const todoElem = `
      <li data-uid="${todo.id}" class="task-item ${todo.completed ? 'done' : ''}">
        <p>${todo.title}</p>
        <button onclick="controller.handleCheck(${todo.id})" class="circle complete-task">
          <i class="fas fa-check-circle"></i>
        </button>
        <button onclick="controller.handleDeleteTodo(${todo.id})" class="circle delete-task">
          <i class="fas fa-trash"></i>
        </button>
      </li>`;
    const todoListElem = document.getElementById("todosList");

    todoListElem.innerHTML += todoElem;
  },

  renderTodos: function(todos) {
    const todoListElem = document.getElementById("todosList");
    todoListElem.innerHTML = '';
    todos.forEach(todo => this.renderTodo(todo));
  },

  updateTodoView: function(id, completed) {
    const todoElem = document.querySelector(`li[data-uid='${id}']`);
    if (todoElem) {
      todoElem.classList.toggle('done', completed);
    }
  },

  setupContextMenu: function() {
    document.getElementById("todosList").addEventListener('contextmenu', function(e) {
      e.preventDefault();
      const listItem = e.target.closest('li');
      if (listItem) {
        const id = parseInt(listItem.getAttribute('data-uid'), 10);
        controller.handleCheck(id);
      }
    });
  },

  setupNetworkStatus: function() {
    const statusElem = document.getElementById("networkStatus");

    const updateNetworkStatus = () => {
      if (!navigator.onLine) {
        statusElem.textContent = "You are offline. Some features may not be available.";
        statusElem.style.display = "block";
      } else {
        statusElem.textContent = "";
        statusElem.style.display = "none";
      }
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    updateNetworkStatus(); 
  }
};

const controller = {
  init: function() {
    this.handleAddTodo();
  },

  handleAddTodo: function() {
    const formElem = document.querySelector("form");
    formElem.addEventListener("submit", async function(e) {
      e.preventDefault();
      const inputElemVal = document.getElementById("in").value;
      if (inputElemVal.trim()) {
        const newTodo = {
          title: inputElemVal,
          completed: false,
        };
        await controller.postMethod(newTodo);
        document.getElementById("in").value = '';
      }
    });
  },

  handleCheck: async function(id) {
    const todo = model.todos.find(todo => todo.id === id);
    if (todo) {
      const buttonElem = document.querySelector(`li[data-uid='${id}'] .complete-task`);
      buttonElem.disabled = true;
      await controller.handleUpdateTodo(id, { completed: !todo.completed });
      buttonElem.disabled = false;
    }
  },

  handleUpdateTodo: async function(id, updatedProperties) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProperties)
      });
      if (res.ok) {
        const data = await res.json();
        model.updateTodo(id, data.completed);
      }
    } catch (error) {
      console.log(error);
    }
  },

  handleDeleteTodo: async function(id) {
    const isDeleted = await this.deleteMethod(id);
    if (isDeleted) {
      model.todos = model.todos.filter(todo => todo.id !== id);
      view.renderTodos(model.todos);
    }
  },

  postMethod: async function(todo) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      });
      const data = await res.json();

      if (data.todo) {
        model.todos.push(data.todo);
        view.renderTodo(data.todo);
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteMethod: async function(id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "DELETE"
      });
      return res.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  view.init();
  controller.init();
});
