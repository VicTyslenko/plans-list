import React, { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import Todo from "../Todo/Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (el) => {
    if (!el.text || /^\s*$s/.test(el.text)) {
      return;
    }
    const newTodos = [el, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (id, newValue) => {
    if (!newValue.text || /^\s*$s/.test(newValue.text)) {
      return;
    }
    setTodos((prev) => prev.map((item) => (item.id === id ? newValue : item)));
  };
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((el) => el.id !== id);
    setTodos(removeArr);
  };
  const completeTodo = (id) => {
    let upDatedTodos = todos.map((el) => {
      if (el.id === id) {
        el.isComplete = !el.isComplete;
      }
      return el;
    });
    setTodos(upDatedTodos);
  };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
