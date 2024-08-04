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

      model.addTodoToServer(newTodo); // Call to server to add new todo
      taskInput.value = '';
  }
});

// Model
const model = {
  todos: [],

  init: async function() {
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


  updateTodo: function (id) {
    const todo = this.getTodos().find(todo => todo.id === id);


    if (todo) {
      console.log('Todo to update:', todo); // Debugging prnnnttt

      fetch(`http://127.0.0.1:8000/api/todos/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },

        body: JSON.stringify({ completed: !todo.completed }),
        mode: 'cors',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Updated todo:', data); // Debugging
        if (data.todo) {
          this.updateTodoInModel(data.todo); // Update model with the latest data
        }
      })
      .catch(error => console.error('Error:', error));
    }
  },











  updateTodoInModel: function(updatedTodo) {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      view.handleselectors(updatedTodo.id); // Update view
    }
  },





  fetchTodos: function () {
    return fetch("http://127.0.0.1:8000/api/todos", {
      method: "GET",
    })
    .then(res => res.json())
    .then(data => {
      console.log('Fetched todos:', data); // Debugging
      this.todos = data.todos.map(todo => {
        todo.title = todo.title || 'New Task';
        return todo;
      });
      view.renderTodos(); 
    })
    .catch(error => console.log('Error:', error));
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
      console.log('Created todo:', data); // Debugging prrrrnttt
      this.addTodo(data.todo); 
    })
    .catch(error => console.log('Error:', error.message));
  }
};












// View
const view = {
  init: function () {
    model.init(); // Initialize model
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
