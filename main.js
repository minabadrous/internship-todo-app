function addTask(taskText){
    // Create the <li> element
    var li = document.createElement('li');
    li.className = 'taskElement';

    // Create and append the <input> element
    var input = document.createElement('input');
    input.name = "taskInput";
    input.type = 'text';
    input.className = 'changeText';
    input.value = taskText;
    input.readOnly = true;

    // Event Listeners

    //console.log(input);

    // Action when pressed
    input.addEventListener('click', () => {
        console.log("clicked");
        input.readOnly = false;
        input.focus();
    });


    // Action when out of focus
    input.addEventListener('blur', () => {
        input.readOnly = true;
    })


    li.appendChild(input);

    // Create and append the delete button and icon
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener('click', () =>{
        li.remove();
    });

    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt delete-icon';

    deleteBtn.appendChild(deleteIcon);
    li.appendChild(deleteBtn);

    // Create and append the done button and icon
    var doneBtn = document.createElement('button');
    doneBtn.className = 'doneBtn';
    doneBtn.addEventListener('click', () =>{
        if (input.style.textDecoration != 'line-through'){
            input.style.textDecoration = 'line-through';
            input.style.backgroundColor = 'green';
            input.style.color = 'white';
        }
        else{
            input.style.textDecoration = 'none';
            input.style.backgroundColor = '#FFFFFF';
            input.style.color = 'black';
        }
    })

    var doneIcon = document.createElement('i');
    doneIcon.className = 'fas fa-check-circle done-icon';

    doneBtn.appendChild(doneIcon);
    li.appendChild(doneBtn);

    // Append the <li> to an existing element in the DOM
    const parent = document.getElementById('taskList');
    parent.insertBefore(li,parent.firstChild);

}

document.getElementById("taskForm").addEventListener("submit",(event => {

    event.preventDefault();

    const data = new FormData(event.target);
    const task = data.get("textInput");


    addTask(task);

    // alert(task);
    // console.log(task);

    // location.reload(true);

    document.getElementById("mainInput").value = "";
}));