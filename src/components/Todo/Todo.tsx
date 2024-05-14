import React, { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { Task } from "../types/TaskType";

type Todos = {
  todos: Task[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, task: Task) => void;
};

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }: Todos) => {
  const [edit, setEdit] = useState<{ id: number | null; text: string }>({ id: null, text: "" });

  const submitUpdate = (task: Task, newText: string) => {
    if (task && task.id !== null) {
      const updatedTask = {
        ...task,
        text: newText,
      };

      updateTodo(task.id, updatedTask);
    }

    setEdit({
      id: null,
      text: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmitForm={submitUpdate} />;
  }
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index} className={todo.isComplete ? "todo-row complete" : "todo-row"}>
          <p
            onClick={() => {
              if (todo.id !== null) {
                completeTodo(todo.id);
              }
            }}
            className="todo-text"
          >
            {todo.text}
          </p>
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => {
                if (todo.id !== null) {
                  removeTodo(todo.id);
                }
              }}
              className="delete-icon"
            />
            <TiEdit
              onClick={() => {
                if (todo.id !== null) {
                  setEdit({ id: todo.id, text: todo.text });
                }
              }}
              className="edit-icon"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
