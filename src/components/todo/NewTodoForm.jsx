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
    setTodo(event.target.value.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-x-3 rounded-md bg-neutral-200 px-4">
        <button
          type="submit"
          aria-label="Add todo"
          className="bg-cross aspect-square w-5 rotate-45 rounded-sm bg-center bg-no-repeat"
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
            className="w-full bg-transparent py-2"
          />
        </FormControl>
      </div>
    </form>
  );
}
