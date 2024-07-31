const taskForm = document.getElementById("task-Form");
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const taskInput = document.getElementById("task-Input");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Y3m 7ot Task Y3m");
    return;
  }

  const taskList = document.getElementById("tasks-List");
  const newTask = document.createElement("li");
  newTask.className = "text-Slot";
  newTask.innerHTML = `
    <div class="small-txt-Field">${taskText}</div>
    <button onclick="delFunc(this)" class="done-Btn" type="button">
      <i class="fas fa-check"></i>
    </button>
    <button onclick="delFunc(this)" class="delete-Btn" type="button">
      <i class="fas fa-trash-alt"></i>
    </button>`;
  taskList.appendChild(newTask);
  taskInput.value = "";
  buttonEvents(newTask);
}

const delFunc = (elem) => {
  const parent = elem.parentNode;
  parent.remove();
};

function buttonEvents(taskItem) {
  const deleteBtn = taskItem.querySelector(".delete-Btn");
  deleteBtn.onclick = function () {
    taskItem.remove();
  };

  const doneBtn = taskItem.querySelector(".done-Btn");
  doneBtn.onclick = function () {
    const taskDiv = taskItem.querySelector(".small-txt-Field");
    taskDiv.style.textDecoration = "line-through";
    taskItem.style.opacity = "0.5";
  };
}
