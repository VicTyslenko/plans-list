import React, { useState, useEffect, useRef } from "react";
import { Task } from "../types/TaskType";

interface TodoFormProps {
  edit?: Task;
  onSubmitForm: (item: Task, newTask: string) => void;
}

const TodoForm = (props: TodoFormProps) => {
  const { edit, onSubmitForm } = props;

  const [input, setInput] = useState(edit ? edit.text : "");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.target.value);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    // inputRef.current.focus();
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (edit) {
      onSubmitForm(edit, input);
    } else {
      onSubmitForm(
        {
          id: Math.floor(Math.random() * 10000),
          text: input,
        },
        input
      );
    }

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        <>
          <input placeholder="Update your item" value={input} onChange={handleChange} name="text" ref={inputRef} className="todo-input edit" />
          <button type="submit" className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input placeholder="Add a todo" value={input} onChange={handleChange} name="text" className="todo-input" ref={inputRef} />
          <button type="submit" className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
