"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

const EditTodo = forwardRef(function EditTodo({ text, actions }, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, function () {
    return {
      focus() {
        inputRef.current.focus();
      },
    };
  });

  function handleChange(event) {
    const text = event.target.value;
    actions.onChange(text);
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      actions.onSave();
    }
  }

  return (
    <label htmlFor="edit-todo" className="w-full">
      <span className="sr-only">Edit task</span>
      <input
        type="text"
        value={text}
        id="edit-todo"
        onChange={handleChange}
        onKeyDown={handleEnter}
        ref={inputRef}
        className="w-full bg-inherit"
      />
    </label>
  );
});

export default EditTodo;
