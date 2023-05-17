import {
  getTodosLocal,
  saveTodoLocal,
  deleteTodoLocal,
  checkTodoLocal,
  editTodoLocal,
} from "./LocalStorage.js";

// Selectors :

const inputTodo = document.querySelector(".form-wrapper__todo-input");
const addTodoBtn = document.querySelector(".form-wrapper__todo-button");
const todoList = document.querySelector(".todo-list");
const selectOption = document.querySelector(".form-wrapper__todos-filter");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const cancelBtn = document.querySelector(".modal__cancel");

let todos = [];

// Functions :

function makeTodo(event) {
  event.preventDefault();

  todos = getTodosLocal();

  // Avoids creating an empty todo :
  if (inputTodo.value === "") return;

  const objectTodo = {
    id: new Date().getTime(),
    text: inputTodo.value,
    checked: false,
  };

  const textTodo = objectTodo.text;

  const repetitiveTodo = findRepetitiveTodo(todos, textTodo);

  // Avoids creating duplicate todo :
  if (repetitiveTodo) return;

  objectTodo.text = inputTodo.value;

  const titleTodo = objectTodo.text;

  createTodoHTML(titleTodo);

  todos = [...todos, objectTodo];

  saveTodoLocal(todos);

  inputTodo.value = "";
}

function createTodoHTML(titleTodo) {
  const todo = document.createElement("li");

  todo.classList.add("todo-list__todo");

  const todoHTML = `<span class="todo-list__title">${titleTodo}</span>
    <div class="todo-list__control">
      <span class="icon"><i class="far fa-check-square"></i></span>
      <span class="icon"><i class="far fa-edit"></i></span>
      <span class="icon"><i class="far fa-trash-alt"></i></span>
    </div>`;

  todo.innerHTML = todoHTML;

  todoList.appendChild(todo);
}

function findRepetitiveTodo(todos, comparisonValue) {
  return todos.find((item) => item.text == comparisonValue);
}

// An action to delete, check and edit todos :
function todoControl(event) {
  const item = event.target;
  const classList = item.classList;
  const todoTag = item.parentElement.parentElement.parentElement;
  const todoTitle = item.parentElement.parentElement.previousElementSibling;

  // Delete todo :
  if (classList.contains("fa-trash-alt")) deleteTodo(todoTitle, todoTag);
  // Check todo :
  else if (classList.contains("fa-check-square")) checkTodo(todoTitle, todoTag);
  // Edit todo :
  else if (classList.contains("fa-edit")) editTodo(todoTitle);
}

function deleteTodo(todoTitle, todoTag) {
  const textTodo = todoTitle.textContent;

  todos = getTodosLocal();

  const todo = todos.find((todo) => todo.text === textTodo);

  const id = todo.id;

  // Delete todo of local storage :
  deleteTodoLocal(id, todos);

  // Remove todo of DOM :
  todoTag.remove();
}

function checkTodo(todoTitle, todoTag) {
  todoTag.classList.toggle("check-opacity");
  todoTitle.classList.toggle("check-text-decoration");

  todos = getTodosLocal();

  // Check todo in local storage :
  checkTodoLocal(todoTitle, todoTag, todos);
}

function editTodo(todoTitle) {
  const editModal = document.querySelector(".modal__edit");

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.setAttribute("placeholder", "Please Edit Your Task ...");
  inputEdit.classList.add("modal__input");

  editModal.insertBefore(inputEdit, cancelBtn);

  showEditModal();

  todos = getTodosLocal();

  inputEdit.addEventListener("change", () => {
    const inputEditValue = inputEdit.value;

    const repetitiveTodo = findRepetitiveTodo(todos, inputEditValue);

    if (repetitiveTodo) return;

    // Edit todo in local storage :
    editTodoLocal(inputEdit, todoTitle, todos);
  });

  // Remove modal :
  backdrop.addEventListener("click", () => removeEditModal(inputEdit));
  cancelBtn.addEventListener("click", () => removeEditModal(inputEdit));
}

function filterTodo(event) {
  const filterOption = event.target.value;
  const todos = [...todoList.children];

  todos.forEach((todo) => {
    switch (filterOption) {
      case "completed":
        if (todo.classList.contains("check-opacity"))
          todo.style.display = "flex";
        else todo.style.display = "none";
        break;
      case "uncompleted":
        if (todo.classList.contains("check-opacity"))
          todo.style.display = "none";
        else todo.style.display = "flex";
        break;
      default:
        todo.style.display = "flex";
    }
  });
}

// DOM :
function DOMTodos() {
  todos = getTodosLocal();

  todos.forEach((todoItem) => {
    if (todoItem.checked) {
      const todo = document.createElement("li");

      todo.classList.add("todo-list__todo");
      todo.classList.add("check-opacity");

      const todoHTML = `<span class="todo-list__title check-text-decoration">${todoItem.text}</span>
      <div class="todo-list__control">
        <span class="icon"><i class="far fa-check-square"></i></span>
        <span class="icon"><i class="far fa-edit"></i></span>
        <span class="icon"><i class="far fa-trash-alt"></i></span>
      </div>`;

      todo.innerHTML = todoHTML;

      todoList.appendChild(todo);
    } else {
      const titleTodo = todoItem.text;

      createTodoHTML(titleTodo);
    }
  });
}

// Modal :

function showEditModal() {
  modal.style.opacity = "1";
  modal.style.transform = "translateY(-40vh)";

  backdrop.style.display = "block";
}

function hideEditModal() {
  modal.style.opacity = "0";
  modal.style.transform = "translateY(10vh)";

  backdrop.style.display = "none";
}

function removeEditModal(inputEdit) {
  hideEditModal();

  inputEdit.remove();
}

export {
  makeTodo,
  todoControl,
  filterTodo,
  DOMTodos,
  addTodoBtn,
  selectOption,
  todoList,
  removeEditModal,
};
