import React from "react";
import TodoForm from "../TodoForm/TodoForm";
import Todo from "../Todo/Todo";
import useLocalStorage from "../hooks/useLocalStorage";
import { Task } from "../types/TaskType";

interface TodoListActions {
  addTodo: (task: Task) => void;
  updateTodo: (id: string, task: Task) => void;
  removeTodo: (id: string) => void;
  completeTodo: (id: string) => void;
}

const TodoList = () => {
  const [storedTodos, setStoredTodos] = useLocalStorage<Task[]>("todos", []);

  const addTodo: TodoListActions["addTodo"] = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    const newTodos = [task, ...storedTodos];
    setStoredTodos(newTodos);
  };

  const updateTodo: TodoListActions["updateTodo"] = (id, task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    setStoredTodos((prev) => prev.map((item) => (item.id === id ? task : item)));
  };
  const removeTodo: TodoListActions["removeTodo"] = (id) => {
    const removeArr = [...storedTodos].filter((el) => el.id !== id);
    setStoredTodos(removeArr);
  };
  const completeTodo: TodoListActions["completeTodo"] = (id) => {
    let upDatedTodos = storedTodos.map((el) => {
      if (el.id === id) {
        el.isComplete = !el.isComplete;
      }
      return el;
    });
    setStoredTodos(upDatedTodos);
  };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmitForm={addTodo} />

      <Todo todos={storedTodos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default TodoList;
