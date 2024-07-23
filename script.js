document
  .getElementById("inputForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addToList();
  });

document
  .getElementById("inputForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addToList();
  });

function addToList() {
  const inputField = document.getElementById("inputF");
  const outputList = document.getElementById("outputList");

  const userInput = inputF.value;

  if (userInput) {
    const listItem = document.createElement("li");
    listItem.className = "list-item";

    const inner = `<span>${userInput}</span>
    <button class="listButtons checkbtn""><i class="fas fa-check"></i></button
          ><button class="listButtons delbtns" ><i class="fas fa-trash"></i></button>`;

    listItem.innerHTML = inner;

    outputList.appendChild(listItem);
    inputField.value = "";

    const checkButton = listItem.querySelector(".checkbtn");
    checkButton.addEventListener("click", function () {
      listItem.querySelector("span").classList.toggle("done");
    });

    const deleteButton = listItem.querySelector(".delbtns");
    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });
  }
}
