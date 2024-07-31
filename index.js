const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");



form.addEventListener("submit", function (event) {
    event.preventDefault();
console.log(input.value);

const newElement = document.createElement("li"); // <li></li>
newElement.classList.add('TasksContainer')

const elementInnerHTML = `<p class="listPara">${input.value}</p>
                            <button class = "check" type= "submit"><i class="fas fa-check"></i></button>
                            <button class = "deletee" type= "submit"><i class="fas fa-trash"></i></button>`

    newElement.innerHTML = elementInnerHTML;
    ul.appendChild(newElement);
    deletebutton(newElement);
    checkbutton(newElement);

    

}


)

function deletebutton(taskItem){

    const deleteVar = taskItem.querySelector(".deletee");
    deleteVar.onclick= function(){
        taskItem.remove();
    }
}

function checkbutton(taskItem){
    const checkVar = taskItem.querySelector(".check");
    checkVar.onclick= function(){
        const text = taskItem.querySelector(".listPara")
        text.style.textDecoration= "line-through";
        taskItem.style.opacity=0.5;
    }
}



