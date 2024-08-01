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
    
    deleteTodo: function (id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      view.renderAllTodos(); 
    },
  };

  
  const view = {
    init: function () {
      this.todoListElem = document.getElementById("todosList");
      this.renderAllTodos();
    },
    renderAllTodos: function () {
      this.todoListElem.innerHTML = ''; 
      model.getTodos().forEach(todo => this.renderTodo(todo));
    },
    renderTodo: function (todo) {
      const todoElem = `<li id="todo-${todo.id}">
                           <p>${todo.title}</p>
                           <button class="circle check">
                             <i class="fas fa-check-circle"></i>
                           </button>
                           <button class="circle delete" data-id="${todo.id}">
                             <i class="fas fa-trash"></i>
                           </button>
                         </li>`;
      this.todoListElem.innerHTML += todoElem;
    },
  };

  const controller = {
    init: function () {
      this.handleAddTodo();
      this.handleDeleteTodo();
    },
    handleAddTodo: function () {
      const formElem = document.getElementById("myForm");
      formElem.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputElemVal = document.getElementById("in").value;
        model.addTodo({
          id: model.getTodos().length ? model.getTodos()[model.getTodos().length - 1].id + 1 : 1,
          title: inputElemVal,
          completed: false,
          created_at: "",
          updated_at: "",
        });
      });
    },
    handleDeleteTodo: function () {
      document.getElementById("todosList").addEventListener("click", function (e) {
        if (e.target.closest(".delete")) {
          const todoId = parseInt(e.target.closest(".delete").getAttribute("data-id"));
          model.deleteTodo(todoId);
        }
      });
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    controller.init();
    view.init();
  });
  
