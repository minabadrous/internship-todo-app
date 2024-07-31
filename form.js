const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
console.log(ul);


form.addEventListener("submit", (c) => {
    c.preventDefault();
    console.log(input.value);


const newElement = document.createElement("li");
newElement.classList.add("TasksListt");

const ElementInnerHtml = `<p class ="List">${input.value} </p>
            <button class="Done" type="submit"><i class="fas fa-check-square"></i></button>
            <button class="Deletee" type="submit"><i class="far fa-trash-alt"></i></button>`

    newElement.innerHTML= ElementInnerHtml;
    console.log(newElement);
    ul.appendChild(newElement);
    deleteButton(newElement);
    checkButton(newElement);
})

function deleteButton(TaskItem) {
    const deletee = TaskItem.querySelector(".Deletee");
    deletee.onclick = function() {
        TaskItem.remove();
    }
}

function checkButton(TaskItem) {
    const check = TaskItem.querySelector(".Done");
    check.onclick = function() {
        const text = TaskItem.querySelector(".List");
        text.style.textDecoration = "line-through";
    }
}