"use client";

import { useState } from "react";

import EditTodo from "@/components/todo/EditTodo";

import { todosStore } from "@/todosStore";

export default function TodoListItem({ data, updateTodos }) {
  const [isEditing, setIsEditing] = useState(false);

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
    setIsEditing(true);
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
    <li className="flex items-center gap-3 border-b-2 border-neutral-300 px-4 py-3 ">
      <button
        onClick={handleSelect}
        aria-label={`Mark as ${data.done ? "Incomplete" : "Complete"}`}
        className={`aspect-square w-5 rounded-full bg-center bg-no-repeat ${data.done ? doneTodoStyle : undoneTodoStyle}`}
      ></button>
      {isEditing ? (
        <EditTodo text={data.text} actions={{ onSave, onChange }} />
      ) : (
        <p>{data.text}</p>
      )}
      <div className="ml-auto">
        <button onClick={handleDeleteTodo}>Delete</button>
        {!isEditing && <button onClick={onEdit}>Edit</button>}
      </div>
    </li>
  );
}
