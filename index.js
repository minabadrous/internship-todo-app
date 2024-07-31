
        document.getElementById('add-task').addEventListener('click', function() {
            const taskInput = document.getElementById('new-task');
            const task = taskInput.value.trim();
            if (task) {
                addTask(task);
                taskInput.value = ''; // Clear the input field
            }
        });

        function addTask(task) {
            const taskList = document.getElementById('task-list');
            const listItem = document.createElement('li');
            listItem.className = 'task-item';

            const taskText = document.createElement('span');
            taskText.textContent = task;

            const completeButton = document.createElement('button');
            completeButton.className = 'complete-task';
            completeButton.innerHTML = '<i class="fas fa-check"></i>';
            completeButton.addEventListener('click', function() {
                taskText.style.textDecoration = 'line-through';
            });

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-task';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener('click', function() {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(taskText);
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        }
    