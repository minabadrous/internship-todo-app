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
    view.renderAllTodos();
  },
  removeTodo: function (id) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index > -1) {
      this.todos.splice(index, 1);
      view.renderAllTodos();
    }
  },
  markAsCompleted: function (id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = true;
    }
  },
  getTodos: function () {
    return this.todos;
  },
};

const view = {
  init: function () {
    this.renderAllTodos();
  },
  renderTodo: function (todo) {
    const completedClass = todo.completed ? "completed" : "";
    const todoElem = `<li class="text-Slot ${completedClass}" data-id="${todo.id}">
      <div class="small-txt-Field">${todo.title}</div>
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
    formElem.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputElemVal = document.getElementById("task-Input").value;
      const id = (model.getTodos()[model.getTodos().length - 1]?.id ?? 0) + 1;

      model.addTodo({
        id,
        title: inputElemVal,
        completed: false,
        created_at: "",
        updated_at: "",
      });
    });
  },
  handleTodoActions: function () {
    const todoListElem = document.getElementById("tasks-List");
    todoListElem.addEventListener("click", function (e) {
      if (e.target.closest(".delete-Btn")) {
        const todoId = parseInt(e.target.closest("li").dataset.id);
        model.removeTodo(todoId);
      } else if (e.target.closest(".done-Btn")) {
        const todoId = parseInt(e.target.closest("li").dataset.id);
        model.markAsCompleted(todoId);
        view.renderAllTodos();
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  controller.init();
  view.init();
});
