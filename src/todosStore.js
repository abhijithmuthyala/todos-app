export const TODOS_LOCAL_STORAGE_KEY = "todos";

let nextId = 0;

function initLocalStorage() {
  const initialTodos = [
    "Do laundry",
    "Walk dog",
    "Make dinner",
    "Clean house",
    "Pay bills",
  ];
  clearTodos();
  initialTodos.forEach(addTodo);
}

if (
  typeof window !== "undefined" &&
  !localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
) {
  initLocalStorage();
}

function getTodos() {
  const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
  return JSON.parse(todos);
}

function addTodo(text) {
  const todo = {
    id: ++nextId,
    text,
    done: false,
  };
  const todos = getTodos() ?? [];
  todos.push(todo);
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
  return todos;
}

function updateTodo(id, key, value) {
  const todos = getTodos();
  const todo = todos.find(function findTodoById(todo) {
    return todo.id === id;
  });
  todo[key] = value;
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));

  return todos;
}

function deleteTodo(id) {
  const todos = getTodos();
  const filteredTodos = todos.filter(function filterTodoById(todo) {
    return todo.id !== id;
  });
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(filteredTodos));

  return filteredTodos;
}

function clearTodos() {
  localStorage.removeItem(TODOS_LOCAL_STORAGE_KEY);
}

function setTodos(todos) {
  localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

export const todosStore = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  setTodos,
};
