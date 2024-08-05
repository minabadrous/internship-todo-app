const model = {
  init: async function () {
    this.todos = await this.fetchTodos();
  },

  todos: [
    {
      id: 1,
      title: "task 1",
      completed: false,
      created_at: "",
      updated_at: "",
    },
    {
      id: 2,
      title: "task 2",
      completed: false,
      created_at: "",
      updated_at: "",
    },
    {
      id: 39,
      title: "task 3",
      completed: false,
      created_at: "",
      updated_at: "",
    },
  ],

  getTodos: function () {
    return this.todos;
  },

  deleteTodo: function (id) {
    fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete the todo');
        }

        this.todos = this.todos.filter(todo => todo.id !== id);
      })
      .catch((error) => console.log(error));
  },

  fetchTodos: async function () {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data.todos;
    } catch (error) {
      console.log("error fetching todos: " + error);
    }
  },

  toggleTodoCompletion: async function (id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      await controller.updateTodo(id, todo.completed);
    }
  },
};

const view = {
  init: function () {
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo));
  },

  renderTodo: function (todo) {
    const todoElem = document.createElement('li');

    // Create the title paragraph
    const titleElement = document.createElement('p');
    titleElement.textContent = todo.title;
    if (todo.completed) {
      titleElement.style.textDecoration = "line-through";
    }
    todoElem.appendChild(titleElement);

    // Create the check button
    const checkButton = document.createElement('button');
    checkButton.className = 'circle check';
    checkButton.setAttribute('data-id', `${todo.id}-check`);
    checkButton.disabled = false;  

      // Create the check icon
      const checkIcon = document.createElement('i');
      checkIcon.className = 'fas fa-check-circle';
      checkButton.appendChild(checkIcon);
      checkButton.addEventListener("click", async () => {
        try {
          checkButton.disabled = true;  
          const response = await controller.handleToggleTodoCompletion(todo.id);
          if (!response.ok){
            throw new Error();
          }
          titleElement.style.textDecoration = todo.completed ? "line-through" : "none";
          checkButton.disabled = false;  
        } catch (error) {
          console.error("Error toggling todo completion:", error);
          checkButton.disabled = false;
        }
      });
    todoElem.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'circle delete';
    deleteButton.setAttribute('data-id', `${todo.id}-delete`);

    deleteButton.addEventListener("click", () => {
      controller.handleDeleteTodo(todo.id);
      todoElem.remove();
    });

    // Create the delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash';
    deleteButton.appendChild(deleteIcon);
    todoElem.appendChild(deleteButton);

    const todoListElem = document.getElementById("todo-list");
    todoListElem.appendChild(todoElem);

    console.log(`${String(todo.id)}-delete`);
  },

  removeTodo: function (id) {
    const todoListElem = document.getElementById("todo-list");
    const todoElem = todoListElem.querySelector(`.delete[data-id="${id}"]`).closest('li');
    todoListElem.removeChild(todoElem);
  }
};

const controller = {
  init: function () {
    this.handleAddTodo();
    model.fetchTodos();
  },

  handleAddTodo: function () {
    const formElem = document.getElementById("todo-form");
    formElem.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputElemVal = document.getElementById("todo-input").value;
      await this.handlePostTodo({
        title: inputElemVal,
        completed: false,
      });
    });
  },

  handlePostTodo: async function (newTodo) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "title": newTodo.title,
          "completed": newTodo.completed
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      model.todos.push(data.todo);
      view.renderTodo(data.todo);
      return data.todo;
    } catch (error) {
      console.log("error posting todo: " + error);
    }
  },

  handleDeleteTodo: function (id) {
    model.deleteTodo(id);
  },

  handleToggleTodoCompletion: async function (id) {
    await model.toggleTodoCompletion(id);
  },

  updateTodo: async function (id, completed) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data.todo;
    } catch (error) {
      console.log("error updating todo: " + error);
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  controller.init();
  view.init();
});
