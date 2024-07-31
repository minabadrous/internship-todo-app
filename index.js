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