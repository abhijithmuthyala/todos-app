"use client";

import { useState } from "react";

import TabButton from "../TabButton";
import { ContentWrapper } from "../utils";
import NewTodoForm from "./NewTodoForm";
import TodosList from "./TodosList";

import { useTodos } from "./hooks";

import { todosStore } from "@/todosStore";

const filters = {
  all() {
    return true;
  },
  active(todo) {
    return !todo.done;
  },
  done(todo) {
    return todo.done;
  },
};

const filterStates = {
  all: "all",
  active: "active",
  completed: "done",
};

export default function TodosFormAndList() {
  const [todos, setTodos] = useTodos();
  const [todosFilter, setTodosFilter] = useState(filterStates.all);

  const filteredTodos = todos.filter(filters[todosFilter]);
  const undoneTodos = todos.reduce(function completedTodosCountReducer(
    count,
    todo,
  ) {
    return count + Number(!todo.done);
  }, 0);
  const doneTodos = todos.length - undoneTodos;

  function updateTodos(todos) {
    setTodos(todos);
  }

  function clearCompletedTodos() {
    const newTodos = todos.filter(function filterCompletedTodos(todo) {
      return !todo.done;
    });
    todosStore.setTodos(newTodos);
    setTodos(todosStore.getTodos()); // source of truth is local storage

    if (todosFilter === filterStates.completed) {
      setTodosFilter(filterStates.all);
    }
  }

  function handleFilterChange(event) {
    const filter = event.target.dataset.filter;
    setTodosFilter(filter);
  }

  return (
    <div className="relative -top-20 grid gap-y-6">
      <section>
        <ContentWrapper>
          <NewTodoForm updateTodos={updateTodos} />
        </ContentWrapper>
      </section>
      <section>
        <ContentWrapper>
          <div className="mb-3 overflow-hidden rounded-md bg-neutral-200">
            <h2 className="sr-only">List of your todos</h2>
            <TodosList updateTodos={updateTodos} todos={filteredTodos} />
            <div className="flex flex-wrap items-center justify-between gap-x-3  bg-neutral-200 px-4 py-4">
              {todosFilter !== filterStates.completed && (
                <p>{undoneTodos} tasks left</p>
              )}
              {todosFilter === filterStates.completed && (
                <p>{doneTodos} tasks done</p>
              )}
              <button
                onClick={clearCompletedTodos}
                className="rounded-md bg-destructive px-3 py-1 font-bold transition-all duration-actions hover:bg-opacity-75"
              >
                Clear completed
              </button>
            </div>
          </div>

          {/* filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-md bg-neutral-200 px-4 py-3">
            <TabButton
              onClick={handleFilterChange}
              data-filter={filterStates.all}
              isActive={todosFilter === filterStates.all}
            >
              All
            </TabButton>
            <TabButton
              onClick={handleFilterChange}
              data-filter={filterStates.active}
              isActive={todosFilter === filterStates.active}
            >
              Active
            </TabButton>
            <TabButton
              onClick={handleFilterChange}
              data-filter={filterStates.completed}
              isActive={todosFilter === filterStates.completed}
            >
              Completed
            </TabButton>
          </div>
        </ContentWrapper>
      </section>
    </div>
  );
}
