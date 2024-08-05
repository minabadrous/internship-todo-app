const model = {
  init: async function() {
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

    checkTodo: function (uid) {
      const todo = this.todos.find((todo) => todo.id === parseInt(uid));
      todo.completed = !todo.completed;
      view.updateTodo(uid);
    },

  deleteTodo: function (uid) {
       this.todos = this.todos.filter((todo) => todo.id !== parseInt(uid));
       view.removeTodo(uid);
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


//View
  const view = {
    init: function () {
      const todos = model.getTodos();
      todos.forEach(todo => this.renderTodo(todo));
    },

    updateTodo: function (uid) {
      const todo = document.querySelector(`[data-uid="${uid}"]`);
      todo.classList.toggle("done");
    },

   removeTodo: function (uid) {
    const todo = document.querySelector(`[data-uid="${uid}"]`);
    todo.remove();
  },

    renderTodo: function (todo) {
      const todoElem = `<li data-uid="${todo.id}" class = "${
      todo.completed ? "done" : ""
    }"
                          <p>${todo.title}</p>
                           <button onclick="controller.handleCheckTodo(${todo.id})" class="circle check" data-id="${todo.id}">
                             <i class="fas fa-check-circle"></i>
                           </button>
                           <button onclick="controller.handleDeleteTodo(${todo.id})" class="circle delete" data-id="${todo.id}">
                             <i class="fas fa-trash"></i>
                           </button>
                         </li>`;

      const todoListElem = document.getElementById("todosList");
      todoListElem.innerHTML += todoElem;
      return;
    },
  };


//Controller  
  const controller = {
    init: function () {
      this.handleAddTodo();
    },
    
    enableDisableCheck: function (uid) {
      const todo = document.querySelector(`[data-uid="${uid}"]`);
      const checkButton = todo.querySelector(".check");
      checkButton.disabled = !checkButton.disabled;
    },

    enableDisableDelete: function (uid) {
      const todo = document.querySelector(`[data-uid="${uid}"]`);
      const deleteButton = todo.querySelector(".delete");
      deleteButton.disabled = !deleteButton.disabled;
    },

    handleAddTodo: function () {
      const formElem = document.getElementById("myForm");
      formElem.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputElem = document.getElementById("in");
        
          const newTodo = {
            title: inputElem.value,
            completed: false,
          };
          inputElem.value = "";
          controller.handlePostTodo(newTodo);
        });
      },

    handlePostTodo: async function (todo) {
      const response = await fetch("http://127.0.0.1:8000/api/todos", {
        method: 'POST',
        body: JSON.stringify({title: todo.title, completed: false}),
        headers: {
          'Content-Type': 'application/json', 
        },
      })
      .then((res) => {
        if (res.ok) return res.json(); 
      })
      .then((data) => { 
        model.addTodo(data.todo);
      })
      .catch((error) => console.log(error));
    },

    handleCheckTodo: async function (uid, completed) {
      this.enableDisableCheck(uid);
      return await fetch(`http://127.0.0.1:8000/api/todos/${uid}`, {
        method: "PATCH",
        body: JSON.stringify({
          completed: !model.todos.filter((todo) => todo.id === uid)[0].completed,
        }),
        headers: {
          'Content-Type': 'application/json', 
        },
    })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          model.checkTodo(data.id);
          this.enableDisableCheck(uid);
        })
        .catch((error) => {
          this.enableDisableCheck(uid);
          console.log(error)});
    },   

    handleDeleteTodo: async function (uid) {
      this.enableDisableDelete(uid);
      return await fetch(`http://127.0.0.1:8000/api/todos/${uid}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json', 
      },
    })
        .then((res) => {
          if (res.ok) model.deleteTodo(uid);
        })
        .catch((error) => {
          this.enableDisableDelete(uid);
          console.log(error)});
    },
  };

  document.addEventListener("DOMContentLoaded", async () => {
    await model.init()
    view.init();
    controller.init();
  })

  
