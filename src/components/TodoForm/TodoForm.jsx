import React, { useState, useEffect, useRef } from "react";

const TodoForm = (props) => {
  const { edit, onSubmit } = props;

  const [input, setInput] = useState(edit ? edit.value : "");
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
