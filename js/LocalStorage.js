import { removeEditModal } from "./TodoList.js";

function getTodosLocal() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodoLocal(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoLocal(id, todos) {
  todos = todos.filter((todo) => todo.id != id);

  saveTodoLocal(todos);
}

function checkTodoLocal(todoTitle, todoTag, todos) {
  if (todoTag.classList.contains("check-opacity")) {
    const textTodo = todoTitle.textContent;

    const todo = todos.find((todo) => todo.text === textTodo);

    todo.checked = true;

    saveTodoLocal(todos);
  } else {
    const textTodo = todoTitle.textContent;

    const todo = todos.find((todo) => todo.text === textTodo);

    todo.checked = false;

    saveTodoLocal(todos);
  }
}

function editTodoLocal(inputEdit, todoTitle, todos) {
  const todo = todos.find((todo) => todo.text === todoTitle.textContent);

  todo.text = inputEdit.value;

  saveTodoLocal(todos);

  todoTitle.innerHTML = inputEdit.value;

  // Remove modal :
  removeEditModal(inputEdit);
}

export {
  getTodosLocal,
  saveTodoLocal,
  deleteTodoLocal,
  checkTodoLocal,
  editTodoLocal,
};
