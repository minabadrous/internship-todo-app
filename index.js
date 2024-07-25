
function add_task(){
    // Parent container
    const task_container = document.getElementById('parent-container');

    // Input box
    const input_data = document.getElementById('input-box');
    const input_value = input_data.value;

    
    // Create structure
    const new_task = document.createElement('div');
    new_task.classList.add('task');
    
    const task_text = document.createElement('p');
    task_text.classList.add('task-text');
    task_text.textContent = input_value;

    const task_action = document.createElement('div');
    task_action.classList.add('task-action');

    // Done button
    const task_done = document.createElement('button');
    task_done.classList.add('task-done');

    const task_done_icon = document.createElement('i');
    task_done_icon.classList.add('fas','fa-check-circle','check-icon');

    // Delete button
    const task_delete = document.createElement('button');
    task_delete.classList.add('task-delete');

    task_delete.addEventListener('click',()=>{
        task_container.removeChild(new_task);
    })

    const task_delete_icon = document.createElement('i');
    task_delete_icon.classList.add('fas','fa-trash','trash-icon');

    // Appends
    task_delete.appendChild(task_delete_icon);
    task_done.appendChild(task_done_icon);
    
    task_action.appendChild(task_done);
    task_action.appendChild(task_delete);

    new_task.appendChild(task_text);
    new_task.appendChild(task_action);

    task_container.appendChild(new_task);
}