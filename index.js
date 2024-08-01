// Form submission event handler
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskInput = document.getElementById('myTextBox');
  const taskText = taskInput.value.trim();
  
  if (taskText) {
      const newTodo = {
          id: model.getTodos().length ? model.getTodos()[model.getTodos().length - 1].id + 1 : 1,
          title: taskText,
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
      };

      model.addTodo(newTodo);
      taskInput.value = '';
  }
});

// Model
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


getTodos: function () {
  return this.todos;
},
removeTodo: function (id) {
  this.todos = this.todos.filter(todo => todo.id !== id);
},
updateTodo: function (id) {
  const todo = this.getTodos().find(todo => todo.id === id);
  console.log(` ${todo.completed}`)
  if (todo) {
      todo.completed = !todo.completed;
  }
  view.handleselectors(id); // Update view
}
};

// cake on me 
// kidding
// install VBLock
//it will save you cakes


// View
const view = {
init: function () {
  this.renderTodos();
  this.setupEventListeners();
},
renderTodos: function () {
  const todos = model.getTodos();
  todos.forEach((todo) => this.renderTodo(todo));
},
renderTodo: function (todo) {
  const todoElem = document.createElement('li');
  todoElem.classList.add('task');
  if (todo.completed) {
    todoElem.classList.add('completed');
  }

  todoElem.dataset.id = todo.id;
  todoElem.innerHTML = `
    <p>${todo.title}</p>
    <button class="mark-btn"><i class="fas fa-check"></i></button>
    <button class="delete-btn"><i class="fas fa-trash"></i></button>
  `;
  todoElem.querySelector('.mark-btn').addEventListener('click', () => {
    controller.handleMarkTodoAsCompleted(todo.id);
  });
  todoElem.querySelector('.delete-btn').addEventListener('click', () => {
    controller.handleDeleteTodo(todo.id);
  });
  document.querySelector('#todosList').appendChild(todoElem);
},
setupEventListeners: function () {
  const formElem = document.getElementById('myForm');
  formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputElemVal = document.getElementById('myTextBox').value.trim();
    if (inputElemVal) {
      const newTodo = {
        id: model.getTodos().length ? model.getTodos()[model.getTodos().length - 1].id + 1 : 1,
        title: inputElemVal,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      model.addTodo(newTodo);
      document.getElementById('myTextBox').value = ''; 
    }
  });
},

handleselectors: function (id) {
  document.querySelectorAll('#todosList .task').forEach((taskElem) => {
    if (parseInt(taskElem.dataset.id) === id) {
      const todo = model.getTodos().find(todo => todo.id === id);
      taskElem.classList.toggle('completed', todo.completed);
    }
  });
}
};

// Controller
const controller = {
init: function () {
  view.init();
},

handleMarkTodoAsCompleted: function (id) {
  model.updateTodo(id);
},



handleDeleteTodo: function (id) {
  model.removeTodo(id);
  document.querySelectorAll('#todosList .task').forEach((taskElem) => {
    if (parseInt(taskElem.dataset.id) === id) {
      taskElem.remove();
    }
  });
}
};




document.addEventListener('DOMContentLoaded', () => {
controller.init();
});