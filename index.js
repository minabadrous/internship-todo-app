const model = {
  init: async function () {
    const todos = await this.fetchTodos()
    this.todos = todos
  },

  todos: [],

  addTodo: async function (todo) {
    this.todos.push(todo);
    view.renderTodo(todo);
  },
  
  getTodos: function () {
    return this.todos;
  },

  deleteTodo: function (uid) {
    this.todos=this.todos.filter((todo) => todo.id !== parseInt(uid));
    view.deleteObject(uid);
  },

  checkTodo: function(uid) {
    const todo = this.todos.find((todo) => todo.id === parseInt(uid));
    todo.completed = !todo.completed;
    view.updateTodo(uid);
  },
  
  fetchTodos: async function () {
    return await fetch("http://127.0.0.1:8000/api/todos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data.todos)
      .catch((error) => console.log(error));
  },
};




const view = {
  init: async function () {
    model.todos.forEach((todo) => this.renderTodo(todo))
  },
  renderTodo: function (todo) {
    const todoElem = `<li data-uid="${todo.id}"><p>${todo.title}</p>
                           <button onclick="controller.updateTodos(${todo.id})" class="circle check">
                           <i class="fas fa-check-circle"></i>
                           </button>

                           <button onclick="controller.deleteTodos(${todo.id})" class="circle delete">
                           <i class="fas fa-trash"></i>
                           </button></li>`;
    const todoListElem = document.getElementById("todosList");

    todoListElem.innerHTML += todoElem;
    return;
  },

  deleteObject: function(uid) {
    const element = document.querySelector(`[data-uid="${uid}"]`);
    element.remove();
  },

  updateTodo: function(uid) {
    const element = document.querySelector(`[data-uid="${uid}"]`);
    element.classList.toggle("done");
  },
};


const controller = {
  init: function () {
    this.handleAddTodo();
  },

  handleAddTodo: function () {
    const formElem = document.getElementById("myForm");
    formElem.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputElemVal = document.getElementById("in").value;

      const newTodo = {
        title: inputElemVal,
        completed: false,
      }

      controller.postTodos(newTodo);
    });
  },



  postTodos: async function (todo) {
    
    return await fetch("http://127.0.0.1:8000/api/todos", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then((res) => {
        if(res.ok) return res.json();
      })
      .then((data) => {
        model.addTodo(data.todo);
      })
      .catch((error) => console.log(error));
  },

  deleteTodos: async function (id) {
    
    const elem = document.querySelector(".circle.delete");
    elem.disabled = "true";

    return await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type' : 'application/json',
      },
    })
    .then((res) => {
      elem.disabled = ''
      if(res.ok) model.deleteTodo(id);
    })
    .catch((error) => {
      console.log(error);
      elem.disabled = "";
  });
  },

  updateTodos: async function (id, completed) {

    const todo = model.todos.find((todo) => todo.id === parseInt(id));
    const elem = document.querySelector(".circle.check");

    elem.disabled = "true";

    return await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({completed: !todo.completed}),
    })
    .then((res) => {
      elem.disabled = ''
      if(res.ok) model.checkTodo(id);
    })
    .catch((error) => {
    console.log(error);
    elem.disabled = "";
  });
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init()
  view.init();
  controller.init();
});
