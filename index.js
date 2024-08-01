const model = {
  todos: [
    {
      id: 1,
      title: "task 1",
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "task 2",
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "task 3",
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  nextId: 4, // Next ID to be used

  addTodo: function (todo) {
    this.todos.push(todo);
    this.nextId++; // Increment the next ID
    view.renderTodos(this.todos); // Render all todos to reflect new addition
  },
  getTodos: function () {
    return this.todos;
  },
  updateTodo: function (id, updatedProperties) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      Object.assign(todo, updatedProperties);
      todo.updated_at = new Date().toISOString();
      view.renderTodos(this.todos);
    }
  },
  deleteTodo: function (id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    view.renderTodos(this.todos);
  },
};

const view = {
  init: function () {
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo));
  },
  renderTodo: function (todo) {
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
    completeButton.addEventListener('click', function () {
      model.updateTodo(todo.id, { completed: !todo.completed });
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-task';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', function () {
      model.deleteTodo(todo.id);
    });

    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    todoListElem.appendChild(listItem);
  },
  renderTodos: function (todos) {
    const todoListElem = document.getElementById("task-list");
    todoListElem.innerHTML = '';
    todos.forEach((todo) => this.renderTodo(todo));
  },
};

const controller = {
  init: function () {
    this.handleAddTodo();
  },
  handleAddTodo: function () {
    const formElem = document.querySelector("form");
    formElem.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputElemVal = document.getElementById("new-task").value;
      if (inputElemVal.trim()) {
        const newTodo = {
          id: model.nextId,
          title: inputElemVal,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        model.addTodo(newTodo);
        document.getElementById("new-task").value = '';
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  controller.init();
  view.init();
});
