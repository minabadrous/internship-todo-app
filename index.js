const model = {
  init: async function () {
    const todos = await this.fetchTodos()
    this.todos = todos
  },


  todos: [],
  addTodo: async function (todo) {
    const val = await this.postTodos(todo);
    console.log(val)
    this.todos.push(val);
    view.renderTodo(val);
  },

  
  getTodos: function () {
    return this.todos;
  },
  deleteTodo: function (uid) {
    this.todos=this.todos.filter((todo) => todo.id !== parseInt(uid));
    console.log(model.todos);
    view.delteObject(uid);
  },
  checkTodo: function(uid) {
    const todo =this.todos.find((todo) => todo.id === parseInt(uid));
    todo.completed = !todo.completed;
    console.log(this.todos);
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

  postTodos: async function (todo) {
    return await fetch("http://127.0.0.1:8000/api/todos", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json',
        
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then(data => data.todo)
      .catch((error) => console.log(error));
  },
};






const view = {
  init: async function () {
    model.todos.forEach((todo) => this.renderTodo(todo))
  },
  renderTodo: function (todo) {
    const todoElem = `<li data-uid="${todo.id}"><p>${todo.title}</p>
                           <button onclick="controller.handleCheck(this)" class="circle check">
                           <i class="fas fa-check-circle"></i>
                           </button>

                           <button onclick="controller.handleDelete(this)" class="circle delete">
                           <i class="fas fa-trash"></i>
                           </button></li>`;
    const todoListElem = document.getElementById("todosList");

    todoListElem.innerHTML += todoElem;
    return;
  },
  delteObject: function(uid) {
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
      model.addTodo({
        id: (model.getTodos()[model.getTodos().length - 1]?.id ?? 0) + 1,
        title: inputElemVal,
        completed: false,
        created_at: "",
        updated_at: "",
      });
    });
  },
  handleDelete: function(element) {
    const uid = element.parentNode.getAttribute("data-uid");
    model.deleteTodo(uid);
  },
  handleCheck: function(element) {
    const uid = element.parentNode.getAttribute("data-uid");
    model.checkTodo(uid);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await model.init()
  view.init();
  controller.init();
});
