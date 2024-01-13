import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoItem = ({todo}) => {
  // if checked it ticked then editable will not shown
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  // to change the message when someone click on edit button
  // todo come from the TodoContext.js
  // because we use have object
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    // so to update we need id and have to do get whole array
    // after only update todoMsg
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        // if todo completed so change color
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}      // to check it is checked
        onChange={toggleCompleted}   // onchange calling toggleCompleted
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        // onchange setTodoMsg()
        onChange={(e) => setTodoMsg(e.target.value)}
        // it is read only change then it should be editable  isTodoEditable
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
