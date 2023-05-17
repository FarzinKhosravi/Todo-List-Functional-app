import {
  makeTodo,
  todoControl,
  filterTodo,
  DOMTodos,
  addTodoBtn,
  selectOption,
  todoList,
} from "./TodoList.js";

addTodoBtn.addEventListener("click", makeTodo);
todoList.addEventListener("click", todoControl);
selectOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", DOMTodos);
