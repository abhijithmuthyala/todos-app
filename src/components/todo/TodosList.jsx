"use client";

import TodoListItem from "@/components/todo/TodoListItem";

export default function TodosList({ todos, updateTodos }) {
  return (
    <ul>
      {todos.map(function renderTodoListItem(todo) {
        return (
          <TodoListItem key={todo.id} data={todo} updateTodos={updateTodos} />
        );
      })}
    </ul>
  );
}
