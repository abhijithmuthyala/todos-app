"use client";

import TodoListItem from "@/components/todo/TodoListItem";
import { todosStore } from "@/todosStore";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function mapFilteredIndexToOriginalIndex(items, filterFn, matchIndex) {
  /* 
    Maps the index of an item in the filtered list to the 
    corresponding item in the unfiltered list. This is 
    important because the reorder algorithm uses .splice()
    which requires the original unfiltered indeces. If the 
    indices of the filtered list are used, .splice() _could_
    remove data.

    This wouldn't be needed if the dnd library added the 
    unique identifiers in the onDragEnd callback _result_. It 
    has the relative indeces in the filtered list, which isn't 
    very helpful.
  */

  let originalIndex = 0;
  let currentFilterMatchIndex = 0;
  for (let item of items) {
    if (filterFn(item)) {
      if (matchIndex === currentFilterMatchIndex) {
        return originalIndex;
      }
      currentFilterMatchIndex++;
    }
    originalIndex++;
  }
  return -1;
}

export default function TodosList({ todos, updateTodos, filterFn }) {
  const filteredTodos = todos.filter(filterFn);

  function updateTodosOnDrag(result) {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const originalSourceIndex = mapFilteredIndexToOriginalIndex(
      todos,
      filterFn,
      source.index,
    );
    const originalDestinationIndex = mapFilteredIndexToOriginalIndex(
      todos,
      filterFn,
      destination.index,
    );

    if (originalSourceIndex === -1 || originalDestinationIndex === -1) {
      throw new Error(
        "Error mapping filtered indices to original indices. This could be a bug in the mapping algorithm.",
      );
    }

    const newTodos = todos.slice();
    const [movedTodo] = newTodos.splice(originalSourceIndex, 1);
    newTodos.splice(originalDestinationIndex, 0, movedTodo);

    todosStore.setTodos(newTodos);
    updateTodos(todosStore.getTodos());
  }

  return (
    <DragDropContext onDragEnd={updateTodosOnDrag}>
      <Droppable droppableId="todos-list">
        {function renderTodosList(provided) {
          return (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTodos.map(function renderTodoListItem(todo, index) {
                return (
                  <DraggableTodoListItem
                    data={todo}
                    key={todo.id}
                    index={index} // cannot pass unique id. this has to be successive integer values
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
