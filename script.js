const form = document.querySelector("form");
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");



function addTask() {
    var taskTitle = taskInput.value;

    //************************creating elements********************************//
    // the list item itself
    const newLi = document.createElement("li");
    newLi.classList.add("taskItem");

    const liContent = `<p class="taskTitle">${taskTitle}</p>
       <button class="checkBtn actionBtn"><i class="fas fa-check-circle" style="color: #ffffff;"></i></i></button>
                    <button class="delBtn actionBtn"><i class="fas fa-trash" style="color: #ffffff;"></i></button>`;

    newLi.innerHTML = liContent;

    todoList.appendChild(newLi);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("IN EVENT LISTENER.....");
    addTask();
    taskInput.value = null;
});


todoList.addEventListener("click", (event) => {

    if (event.target.matches(".delBtn, .fa-trash")) {
        const taskItem = event.target.closest('li');
        taskItem.remove();
        console.log("DELETE");
    }
    else if (event.target.matches(".checkBtn, .fa-check-circle")) {
        const taskItem = event.target.closest('li');
        const taskText = taskItem.querySelector('p');
        taskText.classList.toggle('done');
        console.log("DONE");
    }
});




