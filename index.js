const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit",(e) => {
    e.preventDefault();

    const item = document.createElement("li");
    item.className="items";
    const iteminnerhtml = `<p>${input.value}</p>
                           <button class="circle check">
                           <i class="fas fa-check-circle"></i>
                           </button>

                           <button class="circle delete">
                           <i class="fas fa-trash"></i>
                           </button>`;
    
    item.innerHTML=iteminnerhtml;
    ul.appendChild(item);

    const checkbutton = item.querySelector(".check");
    checkbutton.addEventListener("click", function () {
        item.querySelector("p").classList.toggle("done");
    });

    const deletebutton = item.querySelector(".delete");
    deletebutton.addEventListener("click", function () {
        item.remove();
    });
})