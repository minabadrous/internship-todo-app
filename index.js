document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const taskInput = document.getElementById('myTextBox');
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        
        const newTask = document.createElement('li');
        newTask.classList.add('task');
        
        
        const elementInnerHTML = `
            <p>${taskText}</p>
            <button class="mark-btn"><i class="fas fa-check"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        
        
        newTask.innerHTML = elementInnerHTML;
        
        
        const taskList = document.querySelector('.to_do_list');
        if (taskList) {
            taskList.appendChild(newTask);
        }
        
        
        taskInput.value = '';
        
        
        newTask.querySelector('.mark-btn').addEventListener('click', function() {
            newTask.classList.toggle('completed');
        });

        newTask.querySelector('.delete-btn').addEventListener('click', function() {
            taskList.removeChild(newTask);
        });
    }
});
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
    view.renderTodo(todo.title);
  },
  getTodos: function () {
    return this.todos;
  },
};

const view = {
  init: function () {
    const todos = model.getTodos();
    todos.forEach((todo) => this.renderTodo(todo.title));
  },
  renderTodo: function (title) {
    const todoElem = `<li><p>${title}</p>
                           <button class="circle check">
                           <i class="fas fa-check-circle"></i>
                           </button>

                           <button class="circle delete">
                           <i class="fas fa-trash"></i>
                           </button></li>`;
    const todoListElem = document.getElementById("todosList");

    todoListElem.innerHTML += todoElem;
    return;
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
        id: model.getTodos()[model.getTodos().length - 1].id + 1,
        title: inputElemVal,
        completed: false,
        created_at: "",
        updated_at: "",
      });
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  controller.init();
  view.init();
});
