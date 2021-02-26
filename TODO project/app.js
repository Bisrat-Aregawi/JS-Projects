const addForm = document.querySelector(".add");

const list = document.querySelector(".todos");

const search = document.querySelector(".search input ");

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", (e) => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

const generateTemplate = (todo) => {
  list.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
};

list.addEventListener("click", (e) => {
  e.target.nodeName === "I" ? e.target.parentElement.remove() : null;
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addForm.add.value.trim() !== ""
    ? generateTemplate(addForm.add.value.trim())
    : null;
});
