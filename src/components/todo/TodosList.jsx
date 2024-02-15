"use client";

import TodoListItem from "@/components/todo/TodoListItem";
import { todosStore } from "@/todosStore";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function TodosList({ todos, updateTodos }) {
  function updateTodosOnDrag(result) {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const [movedTodo] = todos.splice(source.index, 1);
    todos.splice(destination.index, 0, movedTodo);

    todosStore.setTodos(todos);
    updateTodos(todosStore.getTodos());
  }

  return (
    <DragDropContext onDragEnd={updateTodosOnDrag}>
      <Droppable droppableId="todos-list">
        {function renderTodosList(provided) {
          return (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map(function renderTodoListItem(todo, index) {
                return (
                  <DraggableTodoListItem
                    data={todo}
                    key={todo.id}
                    index={index}
                    updateTodos={updateTodos}
                  />
                );
              })}
              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

function DraggableTodoListItem({ data, index, updateTodos }) {
  return (
    <Draggable draggableId={String(data.id)} index={index}>
      {function renderDraggableTodoListItem(provided) {
        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            tabIndex={-1}
            role="listitem" // dnd sets it as a btn, but we want it to be a list item
          >
            <TodoListItem data={data} updateTodos={updateTodos} index={index} />
          </li>
        );
      }}
    </Draggable>
  );
}
