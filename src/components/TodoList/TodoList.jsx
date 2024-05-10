import React, { useEffect } from "react";
import TodoForm from "../TodoForm/TodoForm";
import Todo from "../Todo/Todo";
import useLocalStorage from "../hooks/useLocalStorage";
const TodoList = () => {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);

  const addTodo = (el) => {
    if (!el.text || /^\s*$s/.test(el.text)) {
      return;
    }
    const newTodos = [el, ...storedTodos];
    setStoredTodos(newTodos);
  };

  const updateTodo = (id, newValue) => {
    if (!newValue.text || /^\s*$s/.test(newValue.text)) {
      return;
    }
    setStoredTodos((prev) => prev.map((item) => (item.id === id ? newValue : item)));
  };
  const removeTodo = (id) => {
    const removeArr = [...storedTodos].filter((el) => el.id !== id);
    setStoredTodos(removeArr);
  };
  const completeTodo = (id) => {
    let upDatedTodos = storedTodos.map((el) => {
      if (el.id === id) {
        el.isComplete = !el.isComplete;
      }
      return el;
    });
    setStoredTodos(upDatedTodos);
  };
  useEffect(() => {
    console.log(storedTodos);
  }, [storedTodos]);
  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />

      <Todo
        todos={storedTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
