import { useEffect, useState } from "react";

import { todosStore } from "@/todosStore";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(function syncTodosWithLocalStorage() {
    async function loadTodos() {
      const todos = todosStore.getTodos();
      setTodos(todos);
    }
    loadTodos();
  }, []);

  return [todos, setTodos];
}
