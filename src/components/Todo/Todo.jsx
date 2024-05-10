import React, { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  return todos.map((el, index) => (
    <div className={el.isComplete ? "todo-row complete" : "todo-row"} key={index}>
      <p key={el.id} onClick={() => completeTodo(el.id)} className="todo-text">
        {el.text}
      </p>
      <div className="icons">
        <RiCloseCircleLine
          className="delete-icon"
          onClick={() => {
            removeTodo(el.id);
          }}
        />
        <TiEdit
          className="edit-icon"
          onClick={() => {
            setEdit({ id: el.id, value: el.text });
          }}
        />
      </div>
    </div>
  ));
};

export default Todo;
