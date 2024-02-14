"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import EditTodo from "@/components/todo/EditTodo";

import { todosStore } from "@/todosStore";

export default function TodoListItem({ data, updateTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

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
    <li className="flex items-center gap-3 border-b-2 border-neutral-300 px-4 py-3">
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
    </li>
  );
}
