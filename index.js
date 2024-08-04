const model = {
  init:async function(){
    const todos=await this.fetchTodos();
    this.todos=todos
  },
    todos: [],

    addTodo:function (todo) {
    console.log(todo),
    this.todos.push(todo);
    view.renderTodo(todo);

},


    getTodos: function () {
      return this.todos;
    },


    deleteTodo: function (uid) {
      this.todos=this.todos.filter((todo)=>todo.id!== parseInt(uid));
      view.removeTodo(uid);
      console.log(this.todos);
    },
    checkTodo: function (uid) {
      const todo = this.todos.find((todo) => todo.id === parseInt(uid));
      todo.completed = !todo.completed;
      console.log(this.todos);
      view.updateTodo(uid);
    },
    fetchTodos: async function () {
      return await  fetch("http://127.0.0.1:8000/api/todos", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => data.todos)
          .catch((error) => console.log(error));
      },
    
  };
  
  const view = {
    init: function () {
      const todos = model.getTodos();
      todos.forEach((todo) => this.renderTodo(todo));
    },
    renderTodo: function (todo) {
      const todoElem = `<li class="${todo.completed? "done" : " "}" data-uid="${todo.id}"><p>${todo.title}</p>
            <button class="check-mark" onclick = "controller.handleCheckTodo(${todo.id})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="28"
                viewBox="0 0 448 512"
              >
                <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  fill="#74C0FC"
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            </button>
  
            <button class="trash-can" onclick="controller.handleDeleteTodo(${todo.id})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="28"
                viewBox="0 0 448 512"
              >
                <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                  fill="#747981"
                  d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                />
              </svg>
            </button></li>`;
      const todoListElem = document.getElementById("todosList");
  
      todoListElem.innerHTML += todoElem;
      return;
    },
    removeTodo: function (uid) {
      const todo = document.querySelector(`[data-uid="${uid}"]`);
      todo.remove();
    },
    updateTodo: function (uid) {
      const todo = document.querySelector(`[data-uid="${uid}"]`);
      todo.classList.toggle("done");
    },
  };
  
  const controller = {
    init: function () {

      this.handleAddTodo();
    },

    disableButton:function (uid){
      const todo=document.querySelector(`[data-uid="${uid}"]`);
      const deleteButtoon=todo.querySelector(".trash-can");
      deleteButtoon.disabled=!deleteButtoon.disabled;
      const checkMarkButton=todo.querySelector(".check-mark");
      checkMarkButton.disabled=!checkMarkButton.disabled;
      

    },
    handleAddTodo: function () {
      const formElem = document.getElementById("myForm");
      formElem.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputElem = document.getElementById("in");
        const newTodo = {
          title: inputElem.value,
          completed: false,
        }

        inputElem.value ="";
        controller.handlePostTodo(newTodo);
      });
    },
    handleDeleteTodo:async function (uid) {
      this.disableButton(uid);
     fetch(`http://127.0.0.1:8000/api/todos/${uid}`,{
      method:"DELETE",
     })
     .then((res)=>{
      if(res.ok){
        model.deleteTodo(uid);
        return res.json();
      }
    })
    .then ((data)=>{
      console.log(data);

    })
      
    .catch((error)=> console.log(error));
    this.disableButton(uid);
    },
    handleCheckTodo: async function (uid) {
      this.disableButton(uid);
     return await  fetch(`http://127.0.0.1:8000/api/todos/${uid}`,{
       method:"PATCH",
       body:JSON.stringify({
completed:!model.todos.filter((todo)=> todo.id ===uid )[0].completed,
       }),
       headers:{"Content-Type":"application/json"},
    })
    .then((res)=>{
      if(res.ok) return res.json();
    })

     .then((data)=>{
      model.checkTodo(data.id);
      this.disableButton(uid);
     })
    
    .catch((error)=>console.log(error));
    
      },


    handlePostTodo: async function(todo){
      return await fetch ("http://127.0.0.1:8000/api/todos",{
        method:"POST",
        body:JSON.stringify(todo),
     headers:{"Content-Type":"application/json"},
})
    .then((res)=>{
      if(res.ok) return res.json();
    })

     .then((data)=>{
      model.addTodo(data.todo);
     })
    
    .catch((error)=>console.log(error));
      this.disableButton(uid); 
    
      },
      
    };
  document.addEventListener("DOMContentLoaded",async () => {
   await model.init()
    controller.init();
    view.init();
  });