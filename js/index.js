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
    },

    fetchTodos: function(){
      fetch("http://127.0.0.1:8000/api/todos",{
        method: "GET",
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then((error) => console.log(error));
    },

    toggleTodoCompletion: function (id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }

  };

  model.fetchTodos();


  const view = {
    init: function () {
      const todos = model.getTodos();
      todos.forEach((todo) => this.renderTodo(todo));
    },
    renderTodo: function (todo) {
      const todoElem = document.createElement('li');
  
      // Create the title paragraph
      const titleElement = document.createElement('p');
      titleElement.textContent = todo.title; 
      if (todo.completed) {
        titleElement.style.textDecoration = "line-through"; 
      }
      todoElem.appendChild(titleElement); 
  
      // Create the check button
      const checkButton = document.createElement('button');
      checkButton.className = 'circle check'; 
      checkButton.setAttribute('data-id', `${todo.id}-check`); 
  
      // Create the check icon
      const checkIcon = document.createElement('i');
      checkIcon.className = 'fas fa-check-circle'; 
      checkButton.appendChild(checkIcon); 
      checkButton.addEventListener("click", () => {
        controller.handleToggleTodoCompletion(todo.id);
        titleElement.style.textDecoration = todo.completed ? "line-through" : "none"; 
      });
      todoElem.appendChild(checkButton); 
  
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'circle delete'; 
      deleteButton.setAttribute('data-id', `${todo.id}-delete`); 
  
      deleteButton.addEventListener("click", () => {
        controller.handleDeleteTodo(todo.id);
        todoElem.remove();
      });
  
      // Create the delete icon
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fas fa-trash'; 
      deleteButton.appendChild(deleteIcon); 
      todoElem.appendChild(deleteButton); 
  
      const todoListElem = document.getElementById("todo-list");
      todoListElem.appendChild(todoElem);
  
      console.log(`${String(todo.id)}-delete`);
    },
    removeTodo: function (id) {
      const todoListElem = document.getElementById("todo-list");
      const todoElem = todoListElem.querySelector(`.delete[data-id="${id}"]`).closest('li');
      todoListElem.removeChild(todoElem);
    },
    
  };

  const controller = {
    init: function () {
      this.handleAddTodo();
    },
    handleAddTodo: function () {
      const formElem = document.getElementById("todo-form");
      formElem.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputElemVal = document.getElementById("todo-input").value;
        model.addTodo({
          id: model.getTodos()[model.getTodos().length - 1].id + 1,
          title: inputElemVal,
          completed: false,
          created_at: "",
          updated_at: "",
        });
      });
    },
    handleDeleteTodo: function (id) {
      model.deleteTodo(id);
    },
    handleToggleTodoCompletion: function (id) {
      model.toggleTodoCompletion(id);
    }
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    controller.init();
    view.init();
  
  });
