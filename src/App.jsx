import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  // Here we use array so that when we check if value didn't found then it will be on array
  const [todos, setTodos] = useState([]);

  // Here we have array object called todos and we access with prev var
  // Now we have to write object because in context we have object
  // in object we have id, and get all value from todo var
  // after that we take out all prev value from prev
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // Here we have id (for koun si id wale property ko update karna hai) and todo for array
  // we have prev array and using map to iterate
  // we are checking if prevtodo.id is equal to id then add new  todo otherwise leave prevtodo
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      // prevtodo.id :- for all array
      //   id :- for function id
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
    );
  };

  // Here we have array and have to make new array
  // Make new array and tell that put all value (todo var) but don't take value who matched with id
  // Jo match kar jayega id se wo prev array me rah jayega and jo match nahi karega wo new array me hoga
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Here we have prev val and we use map to iterate
  // after we matching in prev array someone matches with id
  // first take out all value using (...prev)
  // if yes then check completed
  // if not then do true and if yes then do false
  // if condition fails then return prev value
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prev) =>
        prev.id === id ? { ...prev, completed: !prev.completed } : prev
      )
    );
  };

  // Now using the useEffect()  because we go to page we can get our previous value

  useEffect(() => {
    // Here value is in string but we have to used on JSON
    const todos = JSON.parse(localStorage.getItem("todos"));

    // check todos is there is or not and also todos length > 0
    // we told todos is JSON but at the end it is array
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Now below useEffect()  because we add new todo then it goes to localStorage
  // Here we get todos as key and now we have todos in JSON format
  // but it is must to have string so that we can store the value in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return ( 
    <TodoProvider  // make sure the function we are taking here has same name while making function in app.jsx (above)
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your TODOs
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
