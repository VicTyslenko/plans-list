import React, { useState, useEffect, useRef } from "react";
import { Task } from "../types/TaskType";
import { v4 as uuidv4 } from "uuid";

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

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (edit) {
      onSubmitForm(edit, input);
    } else {
      onSubmitForm(
        {
          id: uuidv4(),
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
