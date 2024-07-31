
const model = {
    todos: [
        {
            id: 1,
            title: "play",
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
    }

};

const view = {
    init: function (){
        const todos = model.getTodos();
        todos.forEach(todo => this.renderTodo(todo));
    },

    renderlistElement: function () {
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
            console.log("clicked");
            input.readOnly = false;
            input.focus();
        });
    
    
        // Action when out of focus
        input.addEventListener('blur', () => {
            input.readOnly = true;
        })

        return input;
    },

    renderButtons: function (input,listElement,todo){
    
        // Create and append the delete button and icon

        // Create icons 
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt delete-icon';

        const doneIcon = document.createElement('i');
        doneIcon.className = 'fas fa-check-circle done-icon';



        // Create Buttons
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';

        const doneBtn = document.createElement('button');
        doneBtn.className = 'doneBtn';



        // Adding event listeners to buttons 
        deleteBtn.addEventListener('click', () =>{
            listElement.remove();
            controller.handleDelteTodo(todo.id);
        });

        doneBtn.addEventListener('click', () =>{
            if (input.style.textDecoration != 'line-through'){
                input.style.textDecoration = 'line-through';
                input.style.backgroundColor = 'green';
                input.style.color = 'white';
                todo.completed = true;

            }
            else{
                input.style.textDecoration = 'none';
                input.style.backgroundColor = '#FFFFFF';
                input.style.color = 'black';
                todo.completed = false;
            }
        });
    
        
    
        // Adding icons to the buttons 
        deleteBtn.appendChild(deleteIcon);

        doneBtn.appendChild(doneIcon);

        const buttons = [deleteBtn, doneBtn];

        return buttons;
    },

    renderTodo: function(todo){

        const listElement = this.renderlistElement();

        const inputField = this.renderInput(todo);

        const buttons = this.renderButtons(inputField,listElement,todo);
        

        listElement.appendChild(inputField);
        buttons.forEach(button => listElement.appendChild(button));

        // Append the <li> to an existing element in the DOM
        const parent = document.getElementById('taskList');
        parent.insertBefore(listElement,parent.firstChild);

        console.log(model.getTodos());
    }
}

const controller = {
    init: function (){
        this.handleAddTodo();
    },
    handleAddTodo: function (){
        const formElement = document.getElementById("taskForm");

        formElement.addEventListener("submit",(event => {

            event.preventDefault();
        
            const formData = new FormData(event.target);
            const taskTitle = formData.get("textInput");

            model.addTodo({
                id: model.getTodos()[model.getTodos().length -1].id +1,
                title: taskTitle,
                completed: false,
                created_at: Date().toString(),
                updated_at: Date().toString(),
            });
        
            document.getElementById("mainInput").value = "";
        }));
    },

    handleDelteTodo: function (todoId){
        model.deleteTodo(todoId)
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    controller.init();
    view.init()
})