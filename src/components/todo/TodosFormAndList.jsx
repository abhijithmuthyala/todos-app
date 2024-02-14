"use client";

import { ContentWrapper } from "../utils";
import NewTodoForm from "./NewTodoForm";
import TodosList from "./TodosList";

import { useTodos } from "./hooks";

import { todosStore } from "@/todosStore";

export default function TodosFormAndList() {
  const [todos, setTodos] = useTodos();
  const undoneTodos = todos.reduce(function completedTodosCountReducer(
    count,
    todo,
  ) {
    return count + Number(!todo.done);
  }, 0);

  function updateTodos(todos) {
    setTodos(todos);
  }

  function clearCompletedTodos() {
    const newTodos = todos.filter(function filterCompletedTodos(todo) {
      return !todo.done;
    });
    todosStore.setTodos(newTodos);
    setTodos(todosStore.getTodos()); // source of truth is local storage
  }

  return (
    <div className="grid -translate-y-20 gap-y-6">
      <section>
        <ContentWrapper>
          <NewTodoForm updateTodos={updateTodos} />
        </ContentWrapper>
      </section>
      <section>
        <ContentWrapper>
          <div className="overflow-hidden rounded-md bg-neutral-200">
            <h2 className="sr-only">List of your todos</h2>
            <TodosList updateTodos={updateTodos} todos={todos} />
            <div className="flex flex-wrap items-center justify-between gap-x-3  bg-neutral-200 px-4 py-4">
              <p>{undoneTodos} tasks left</p>
              <button
                onClick={clearCompletedTodos}
                className="rounded-md bg-destructive px-2 py-1 transition-all duration-actions hover:bg-opacity-75"
              >
                Clear completed
              </button>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </div>
  );
}
