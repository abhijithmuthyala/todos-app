"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import EditTodo from "@/components/todo/EditTodo";

import { todosStore } from "@/todosStore";
import { useReveal } from "./hooks";

const revealStyles = {
  0: "opacity-0 -translate-y-4",
  1: "opacity-100 translate-y-0",
};

/*
TODO:
this should ideally be a css custom prop, but how to
integrate css prop with tailwind to make the dalay work?
*/
const transitionDelay = 150;

export default function TodoListItem({ data, updateTodos, index, children }) {
  const [isEditing, setIsEditing] = useState(false);
  const reveal = useReveal();
  const inputRef = useRef(null);

  const revealStyle = revealStyles[Number(reveal)];
  const doneTodoStyle = "bg-select";
  const undoneTodoStyle = "outline outline-2 outline-neutral-300";

  function onChange(text) {
    const newTodos = todosStore.updateTodo(data.id, "text", text);
    updateTodos(newTodos);
  }

  function onSave() {
    setIsEditing(false);
  }

  function onEdit() {
    flushSync(function updateEditState() {
      setIsEditing(true);
    });
    inputRef.current.focus();
  }

  function handleSelect() {
    const newTodos = todosStore.updateTodo(data.id, "done", !data.done);
    updateTodos(newTodos);
  }

  function handleDeleteTodo() {
    const newTodos = todosStore.deleteTodo(data.id);
    updateTodos(newTodos);
  }

  return (
    <div
      className={`flex min-h-13 -translate-y-3 items-center gap-3 border-b-2 border-neutral-300 px-5 py-4 transition-all duration-200 ease-in sm:min-h-16 sm:px-6 ${revealStyle}`}
      style={{
        transitionDelay: index * transitionDelay + "ms",
      }}
    >
      {children}
      <button
        onClick={handleSelect}
        aria-label={`Mark as ${data.done ? "Incomplete" : "Complete"}`}
        className={`aspect-square w-5 shrink-0 rounded-full bg-center bg-no-repeat ${data.done ? doneTodoStyle : undoneTodoStyle}`}
      ></button>
      {isEditing ? (
        <EditTodo
          text={data.text}
          actions={{ onChange, onSave }}
          ref={inputRef}
        />
      ) : (
        <p>{data.text}</p>
      )}
      <div className="ml-auto flex items-center gap-4">
        {isEditing ? (
          <button
            onClick={onSave}
            aria-label="Save changes"
            className="bg-save aspect-square w-4 bg-contain bg-center bg-no-repeat"
          ></button>
        ) : (
          <button
            onClick={onEdit}
            aria-label="Edit task"
            className="bg-edit aspect-square w-5 bg-contain bg-center bg-no-repeat"
          ></button>
        )}
        <button
          onClick={handleDeleteTodo}
          aria-label="Delete task"
          className="bg-cross aspect-square w-4 bg-contain bg-center bg-no-repeat"
        ></button>
      </div>
    </div>
  );
}
