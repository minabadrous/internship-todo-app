// Form submission event handler
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const taskInput = document.getElementById('myTextBox');
  const taskText = taskInput.value.trim();

  if (taskText) {
    const newTodo = {
      title: taskText,
      completed: false,
    };

    controller.addTodoToServer(newTodo);
    taskInput.value = '';
  }
});

// Model
const model = {
  todos: [],

  init: async function () {
    await this.fetchTodos(); // Fetch and initialize todos
  },

  addTodo: function (todo) {
    todo.title = todo.title || 'New Task';

    this.todos.push(todo);
    view.renderTodo(todo);
  },

  getTodos: function () {
    return this.todos;
  },

  removeTodo: function (id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  },



  updateTodo: function (id, completed) {
    this.todos.filter((todo) => todo.id === id).completed = completed

  },



  fetchTodos: function () {
    return fetch("http://127.0.0.1:8000/api/todos", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        console.log('Fetched todos:', data); // Debugging
        this.todos = data.todos
        view.renderTodos();
      })
      .catch(error => console.log('Error:', error));
  },
};



// View
const view = {
  init: function () {
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
      <button onclick="controller.updateTodoServer(${todo.id})" class="mark-btn"><i class="fas fa-check"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;

    todoElem.querySelector('.mark-btn').addEventListener('click', () => {
      controller.handleMarkTodoAsCompleted(todo.id);
    });

    todoElem.querySelector('.delete-btn').addEventListener('click', () => {
      controller.handleDeleteTodo(todo.id);
    });
    document.querySelector('#todosList').appendChild(todoElem);

    console.log(todo)
  },

  handleselectors: function (id) {
    document.querySelectorAll('#todosList .task').forEach((taskElem) => {
      if (parseInt(taskElem.dataset.id) === id) {
        const todo = model.getTodos().find(todo => todo.id === id);
        taskElem.classList.toggle('completed', todo.completed);
      }
    });
  },


  removeTodoElem: function (id) {
    const todoElem = document.querySelector(`[data-id="${id}"]`);
    todoElem.remove()
  },




  UpdateTodoelem: function (id) {
    const todoElem = document.querySelector(`[data-id="${id}"]`);
    todoElem.classList.toggle('completed')

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

  addTodoToServer: function (todo) {
    fetch("http://127.0.0.1:8000/api/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(todo),
      mode: 'cors',
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json();
      })
      .then(data => {
        console.log('Created todo:', data); // Debugging
        model.addTodo(data.todo);
      })
      .catch(error => console.log('Error:', error.message));
  },







  handleDeleteTodo: function (id) {
    this.deleteTodoFromServer(id);
  },





  deleteTodoFromServer: function (id) {

    const todo = model.getTodos().find(todo => todo.id === id);
    const elem=document.querySelector(".delete-btn");
    elem.disabled="true";




    fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        elem.disabled = "";
        if (response.ok) {
          model.removeTodo(id);
          view.removeTodoElem(id);
        }
      })
      .catch(error => {
        elem.disabled = "";
        console.log('Error:', error.message)
  })
  },





  handleDeleteTodo: function (id) {
    this.deleteTodoFromServer(id);
  },












  updateTodoServer: function (id) {
    const todo = model.getTodos().find(todo => todo.id === id);
    const elem=document.querySelector(".mark-btn");
    elem.disabled="true";



    fetch(`http://127.0.0.1:8000/api/todos/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ completed: !todo.completed }),

    })
      .then(response => {
        elem.disabled="";
        response.json()
  })
      .then(data => {
        model.updateTodo(id)
        view.UpdateTodoelem(id)
        return data.todo
      })
      .catch(error => {
        elem.disabled="";
  });

  // document.querySelector(`[data-id="${id}"]`).disabled = false



  },





};



document.addEventListener('DOMContentLoaded', () => {
  model.init(); // Initialize model
  view.init()
  controller.init();
});
