
const model = {
    init: async function () {
        this.todos = await controller.fetchTodos();
    },

    todos: [
        {
            id: 1,
            title: "play",
            completed: false,
            created_at: "",
            updated_at: "",
        },

    ],


    addTodo: function (todo){
        this.todos.push(todo);
        view.renderTodo(todo);
    },

    deleteTodo: function(todoId){
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    },

    getTodos: function (){
        return this.todos;
    },

};


const view = {
    init: function (){
        const todos = model.getTodos();
        todos.forEach(todo => this.renderTodo(todo));
    },

    renderListElement: function () {
        const li = document.createElement('li');
        li.className = 'taskElement';

        return li;

    },

    renderInput: function (todo){
        const input = document.createElement('input');
        input.name = "taskInput";
        input.type = 'text';
        input.className = 'changeText';
        input.value = todo.title;
        input.readOnly = true;

        input.addEventListener('click', () => {
            
            input.readOnly = false;
            input.focus();
        });
    
    
        // Action when out of focus
        input.addEventListener('blur', () => {
            input.readOnly = true;
            todo.title = input.value;
            controller.handleUpdateTodo(todo);
        })

        return input;
    },

    renderButtons: function (input,listElement,todo){
    
        // Create and append the delete button and icon

        // Create icons 
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt deleteIcon';

        const doneIcon = document.createElement('i');
        doneIcon.className = 'fas fa-check-circle doneIcon';



        // Create Buttons
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';

        const doneBtn = document.createElement('button');
        doneBtn.className = 'doneBtn';



        // Adding event listeners to buttons 
        deleteBtn.addEventListener('click', () =>{
            listElement.remove();
            controller.handleDeleteTodo(todo.id);
        });

        doneBtn.addEventListener('click', async () => {
            
            doneBtn.disabled = "true"; // Disable the button
        
            try {
                if (input.style.textDecoration != 'line-through') {
                    const response = await controller.handleUpdateTodo(todo);
                    if(!response.ok){
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    todo.completed = true;
                    input.style.textDecoration = 'line-through';
                    input.style.backgroundColor = 'green';
                    input.style.color = 'white';
                } else {
                    const response = await controller.handleUpdateTodo(todo);
                    if(!response.ok){
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    todo.completed = false;
                    input.style.textDecoration = 'none';
                    input.style.backgroundColor = '#FFFFFF';
                    input.style.color = 'black';
                }
            } catch (error) {
                console.error('Error updating todo:', error);
            } finally {
                
                doneBtn.disabled = ''; // Re-enable the button
            }
        });
    
        
    
        // Adding icons to the buttons 
        deleteBtn.appendChild(deleteIcon);

        doneBtn.appendChild(doneIcon);

        const buttons = [deleteBtn, doneBtn];

        return buttons;
    },

    renderTodo: function(todo){

        const listElement = this.renderListElement();

        const inputField = this.renderInput(todo);

        const buttons = this.renderButtons(inputField,listElement,todo);
        
        todo.completed ? buttons[1].click() : null;

        listElement.appendChild(inputField);
        buttons.forEach(button => listElement.appendChild(button));

        // Append the <li> to an existing element in the DOM
        const parent = document.getElementById('taskList');
        parent.insertBefore(listElement,parent.firstChild);

        
    }
}

const controller = {
    init: function (){
        this.handleAddTodo();
    },
    handleAddTodo: function (){
        const formElement = document.getElementById("taskForm");

        formElement.addEventListener("submit", (async event => {

            event.preventDefault();
        
            const formData = new FormData(event.target);
            const taskTitle = formData.get("textInput");

            const dbTodo = await this.saveTodo(taskTitle, false);
            

            const newTodo = {
                    id: dbTodo.id,
                    title: dbTodo.title,
                    completed: dbTodo.completed,
                    created_at: dbTodo.created_at,
                    updated_at: dbTodo.updated_at,
                };
                model.addTodo(newTodo);
                

                document.getElementById("mainInput").value = "";
        }
    
        ));},

    handleDeleteTodo: function (todoId){
        model.deleteTodo(todoId);
        this.deleteTodoFromDB(todoId);
    },

    handleUpdateTodo: function (todo){
        return this.updateTodo(todo)

    },

    fetchTodos: async function () {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/todos", {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data.todos;
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    },

    saveTodo: async function (title,completed) {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/todos", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "title": title,
                    "completed": completed
                })
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data.todo;
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    },

    deleteTodoFromDB : async function (todoId){
        try {
            const url = `http://127.0.0.1:8000/api/todos/${todoId}`;
            
            const res = await fetch(url, {
                method: "DELETE",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Methods" :"GET, PUT, POST, UPDATE, DELETE, OPTIONS"
            }});
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            return data;

        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    },

    updateTodo: async function (todo){
        
        try {
            const url = `http://127.0.0.1:8000/api/todos/${todo.id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "title": todo.title,
                    "completed": todo.completed
                })
            });
            return response;
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    },
}

document.addEventListener("DOMContentLoaded", async ()=> {
    await model.init();
    controller.init();
    view.init()
})