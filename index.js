const model = {
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
  addTodo: function (todo) {
    this.todos.push(todo);
    view.renderTodo(todo);
  },
  removeTodo: function (id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    view.renderAllTodos();
  },
  getTodos: function () {
    return this.todos;
  },
  toggleTodo: function (id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      view.updateTodoStatus(id, todo.completed);
    }
  },
};

const view = {
  todoListElem: null, // Define the property

  init: function () {
    this.todoListElem = document.querySelector(".todo-list"); // Initialize the property
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo));
  },

  renderTodo: function (todo) {
    const completedClass = todo.completed ? 'completed' : '';
    const todoElem = `<li data-id="${todo.id}"><p>${todo.title}</p>
                           <button class="circle check">
                           <i class="fas fa-check-circle"></i>
                           </button>
                           <button data-id="${todo.id}" class="circle delete">
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
};

const controller = {
  init: function () {
    this.handleAddTodo();
    this.handleDelete();
    this.handleToggleComplete();
  },

  handleAddTodo: function () {
    const formElem = document.querySelector("form");
    formElem.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputElemVal = document.querySelector("input").value;
      model.addTodo({
        id: model.getTodos().length ? model.getTodos()[model.getTodos().length - 1].id + 1 : 1,
        title: inputElemVal,
        completed: false,
        created_at: "",
        updated_at: "",
      });
    });
  },

  handleDelete: function () {
    document.querySelector(".todo-list").addEventListener("click", function (e) {
      if (e.target.closest(".delete")) {
        const todoId = parseInt(e.target.closest(".delete").getAttribute("data-id"));
        model.removeTodo(todoId);
      }
    });
  },

  handleToggleComplete: function () {
    document.querySelector(".todo-list").addEventListener("click", function (e) {
      if (e.target.closest(".check")) {
        const todoId = parseInt(e.target.closest("li").getAttribute("data-id"));
        model.toggleTodo(todoId);
      }
    });
  }
  
};

document.addEventListener("DOMContentLoaded", () => {
  controller.init();
  view.init();
});

