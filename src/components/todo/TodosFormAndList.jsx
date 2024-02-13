"use client";

import { ContentWrapper } from "../utils";
import NewTodoForm from "./NewTodoForm";
import TodosList from "./TodosList";

import { useTodos } from "./hooks";

export default function TodosFormAndList() {
  const [todos, setTodos] = useTodos();

  function updateTodos(todos) {
    setTodos(todos);
  }

  return (
    <div className="grid -translate-y-20 gap-y-6">
      <section>
        <ContentWrapper>
          <NewTodoForm updateTodos={updateTodos} />
        </ContentWrapper>
      </section>
      <section>
        <ContentWrapper>
          <h2 className="sr-only">List of your todos</h2>
          <TodosList updateTodos={updateTodos} todos={todos} />
        </ContentWrapper>
      </section>
    </div>
  );
}
