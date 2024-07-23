const form = document.querySelector("form");
const ul = document.querySelector("ul");
const input = document.querySelector("input");

const delFunc = (elem) => {
  elem.parentNode.remove();
};

const checkFunc = (elem) => {
  elem.parentNode.childNodes[0].classList.toggle("done");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(input.value);
  const li = document.createElement("li");

  const innerContent = `<p>${input.value}</p>
          <button class="check-mark" onclick = "checkFunc(this)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="28"
              viewBox="0 0 448 512"
            >
              <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                fill="#74C0FC"
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
          </button>

          <button class="trash-can" onclick = "delFunc(this)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="28"
              viewBox="0 0 448 512"
            >
              <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                fill="#747981"
                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </button>`;

  li.innerHTML = innerContent;
  ul.appendChild(li);
});
