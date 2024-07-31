const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const newElement = document.createElement('li'); // <li></li>
    newElement.classList.add('listItem')
    const elementinner = `<p>${input.value}</p>
                        <button><i class="mark-btn"> <i class="fas fa-check"></i></button>
                        <button><i class="trash-btn"><i class="fas fa-trash"></i></button>`
    newElement.innerHTML = elementinner;
    ul.appendChild(newElement);

    newElement.querySelector(".mark-btn").addEventListener('click', function (event) {
        newElement.classList.toggle("isdone");
    });

    newElement.querySelector(".trash-btn").addEventListener('click', function (event) {
        console.log(event)
        newElement.remove();
    });

});
