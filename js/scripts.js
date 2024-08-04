document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(todoInput.value);
        todoInput.value = '';
    });

    function addTask(task) {
        if (task === '') return;

        const li = document.createElement('li');
        const elemInner = `<p>${task}</p>
                            <button><i class="fas fa-check-circle"></i></button>
                            <button><i class="fas fa-trash-alt"></i></button>`
        li.innerHTML = elemInner;
        todoList.appendChild(li);
    }
    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('fa-check-circle')) {
            const taskItem = event.target.closest('li');
            const taskText = taskItem.querySelector('p');
            taskText.classList.toggle('completed');
        }
        
        if (event.target.classList.contains('fa-trash-alt')) {
            const taskItem = event.target.closest('li');
            taskItem.remove();
        }
    });
});
