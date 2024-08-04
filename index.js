const model = {
  init: async function (){
    await this.fetchTodos();
  },
  todos: [],
  addTodo: async function (todo) {
    await controller.postTodo(todo); 
  },
  removeTodo: async function (id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    view.renderAllTodos();
    console.log(id)
    await this.deleteTodo(id); 
  },
  getTodos: function () {
    return this.todos;
  },
  toggleTodo: async function (id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      view.updateTodoStatus(id, todo.completed);
      await controller.updateTodoOnServer(todo);
    }
  },
  fetchTodos: async function () {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "GET",
      });
      const data = await response.json();
      this.todos = data.todos;
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async function (id) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        view.removeTodo(id)
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },
 /* updateTodoOnServer: async function (todo) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  },*/
};

const view = {
  todoListElem: null,

  init: function () {
    this.todoListElem = document.querySelector(".todo-list");
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo));
  },

  renderTodo: function (todo) {
    const completedClass = todo.completed ? 'completed' : '';
    const todoElem = `<li data-id="${todo.id}" class="${completedClass}">
                           <p>${todo.title}</p>
                           <button class="circle check">
                           <i class="fas fa-check-circle"></i>
                           </button>
                           <button onclick="model.removeTodo(${todo.id})" class="circle delete">
                           <i class="fas fa-trash"></i>
                           </button></li>`;
    this.todoListElem.innerHTML += todoElem;
  },

  renderAllTodos: function () {
    this.todoListElem.innerHTML = '';
    model.getTodos().forEach(todo => this.renderTodo(todo));
  },

  updateTodoStatus: function (id, completed) {
    const todoElem = document.querySelector(`li[data-id='${id}']`);
    if (todoElem) {
      if (completed) {
        todoElem.classList.add('completed');
      } else {
        todoElem.classList.remove('completed');
      }
    }
  },

  removeTodo: function (id) {
    const todoElem = document.querySelector(`[data-id="${id}"]`);
    if (todoElem) {
      todoElem.remove();
    }
  }
};

const controller = {
  init: function () {
    this.handleAddTodo();
    this.handleToggleComplete();
  },

  handleAddTodo: function () {
    const formElem = document.querySelector("form");
    formElem.addEventListener("submit", async function (e) {
      e.preventDefault();
      const inputElemVal = document.querySelector("input").value;
      if (inputElemVal.trim() === "") return;

      await model.addTodo({
        title: inputElemVal,
        completed: false,
      });
      formElem.reset();
    });
  },
// dina 
  handleToggleComplete: function () {
    document.querySelector(".todo-list").addEventListener("click", async function (e) {
      if (e.target.closest(".check")) {

        e.target.closest(".check").disabled = true
        
        const todoId = parseInt(e.target.closest("li").getAttribute("data-id"));
        await model.toggleTodo(todoId);

        e.target.closest(".check").disabled = false

      }
    });
  },

  postTodo: async function (todo) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      model.todos.push(data.todo);
      view.renderTodo(data.todo);
      return data;
    } catch (error) {
      console.error("Error posting todo:", error);
    }
  },

  updateTodoOnServer: async function (todo) {
    
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        
      });

      if (!response.ok) {
        
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
      
    } catch (error) {
      console.error("Error updating todo:", error);
    }

    document.querySelector(".todo-list").addEventListener("click", function (e) {
    
      e.target.closest(".check").disabled= false;
    });
  }

};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init();
  view.init();
  controller.init();
});
