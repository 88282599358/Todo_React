import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    // in app.jsx we are spreading prev value and as well as object too
    // that why we will pass object
    // addTodo({id: Date.now() , todo:todo , completed: false})

    // if we remove id because we already give it in app.jsx
    // We also remove todo: todo because of same name of key and value we can do only once
    addTodo({ todo, completed: false });

    // after that do empty
    setTodo("");
  };
  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo} // wiring with the state

        // now if something change put it into state
        onChange={(e) => setTodo(e.target.value)}   
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-cyan-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
