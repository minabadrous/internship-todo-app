const model = {
  todos: [],

  init: async function() {
    await this.fetchTodos();
    view.renderTodos(this.todos);
  },

  addTodo: async function(todo) {
    const addedTodo = await this.postMethod(todo);
    if (addedTodo) {
      this.todos.push(addedTodo);
      view.renderTodos(this.todos);
    }
  },

  getTodos: function() {
    return this.todos;
  },

  updateTodo: function(id, updatedProperties) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      Object.assign(todo, updatedProperties);
      todo.updated_at = new Date().toISOString();
      view.renderTodos(this.todos);
    }
  },

  deleteTodo: async function(id) {
    const isDeleted = await this.deleteMethod(id);
    if (isDeleted) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      view.renderTodos(this.todos);
    }
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
      return data.todo;
    } catch (error) {
      console.log(error);
      return null;
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

const view = {
  init: function() {
    // Not needed as todos are rendered in model.init
  },

  renderTodo: function(todo) {
    const todoListElem = document.getElementById("task-list");
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.dataset.id = todo.id;

    const taskText = document.createElement('span');
    taskText.textContent = todo.title;
    if (todo.completed) {
      taskText.style.textDecoration = 'line-through';
    }

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-task';
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener('click', function() {
      model.updateTodo(todo.id, { completed: !todo.completed });
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-task';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', function() {
      model.deleteTodo(todo.id);
    });

    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    todoListElem.appendChild(listItem);
  },

  renderTodos: function(todos) {
    const todoListElem = document.getElementById("task-list");
    todoListElem.innerHTML = '';
    todos
      .filter(todo => todo.title !== "test2")
      .forEach(todo => this.renderTodo(todo));
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
      const inputElemVal = document.getElementById("new-task").value;
      if (inputElemVal.trim()) {
        const newTodo = {
          title: inputElemVal,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await model.addTodo(newTodo);
        document.getElementById("new-task").value = '';
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  controller.init();
});
