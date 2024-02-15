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

export function useReveal() {
  const [reveal, setReveal] = useState(false);

  useEffect(function revealListItem() {
    setReveal(true);

    return function hideListItem() {
      setReveal(false);
    };
  }, []);

  return reveal;
}
