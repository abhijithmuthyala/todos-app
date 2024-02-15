"use client";

import { useState } from "react";

import FormControl from "@/components/FormControl";

import { todosStore } from "@/todosStore";

export default function NewTodoForm({ updateTodos }) {
  const [todo, setTodo] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (todo === "") return;

    const newTodos = todosStore.addTodo(todo);

    updateTodos(newTodos);
    setTodo("");
  }

  function handleChange(event) {
    setTodo(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex min-h-12 items-center justify-between gap-x-3 rounded-md bg-neutral-200 pl-4 sm:min-h-16">
        <button
          type="submit"
          aria-label="Add todo"
          className="bg-plus aspect-square w-5 rotate-45 rounded-sm bg-center bg-no-repeat"
        ></button>
        <FormControl>
          <label htmlFor="todo" className="sr-only">
            Add a new todo
          </label>
          <input
            type="text"
            id="todo"
            placeholder="Create a new todo..."
            value={todo}
            onChange={handleChange}
            className="w-full bg-transparent py-2 placeholder:text-neutral-700 focus-visible:outline-none"
          />
        </FormControl>
      </div>
    </form>
  );
}
