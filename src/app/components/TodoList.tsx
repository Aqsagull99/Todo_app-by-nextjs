
"use client";
import { useState } from "react";
import Confetti from "react-confetti"; // Import Confetti

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti

  // Add a new task
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
    setShowConfetti(true); // Show confetti when a new task is added
    setTimeout(() => setShowConfetti(false), 9000); // Hide confetti after 5 seconds
  };

  // Toggle completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a task
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Confetti Component */}
      {showConfetti && <Confetti colors={['#f00', '#000']} />} {/* Only show confetti in red and black */}
      {/* {showConfetti && <div className="glitter" />} */}
       {/* Add glitter effect */}

      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 to-red-500 text-white py-8 shadow-lg">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold font-serif tracking-wider animate-fadeIn scale-up">
            <span className="text-red-300 animate-pulse">Todo App</span> by{" "}
            <span className="text-red-500">Aqsa Gull</span>
          </h1>
          <p className="font-serif font-medium mt-3 text-xl sm:text-2xl">
            Organize Your Tasks with Style – Built with Next.js
          </p>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-red-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-red-500">
          {/* Input Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow p-3 sm:p-4 text-base sm:text-lg border border-red-600 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-red-300 bg-black text-white transition duration-200"
                placeholder="Add a new task..."
              />
              <button
                onClick={addTodo}
                className="mt-4 sm:mt-0 sm:ml-3 px-4 py-3 sm:px-6 sm:py-2 bg-red-600 text-white text-base sm:text-lg rounded-lg shadow-lg hover:shadow-red-400 hover:bg-red-800 transition-shadow duration-300"
              >
                Add
              </button>
            </div>
          </div>

          {/* Todo List */}
          <ul className="space-y-4">
            {todos.length === 0 ? (
              <li className="text-center text-gray-400">
                No tasks yet. Start by adding a new task!
              </li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-lg transition-all ${
                    todo.completed
                      ? "bg-gradient-to-r from-red-600 to-red-700"
                      : "bg-gradient-to-r from-red-800 to-black"
                  }`}
                >
                  <span
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-grow text-lg cursor-pointer ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    {/* Toggle Status */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`px-4 py-2 text-white text-sm rounded-lg shadow-sm transition-all ${
                        todo.completed
                          ? "bg-red-700 hover:bg-red-900"
                          : "bg-black hover:bg-red-600"
                      }`}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>

                    {/* Delete Task */}
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-4 py-2 bg-red-800 text-white text-sm rounded-lg shadow-sm hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Clear All Button */}
          {todos.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setTodos([])}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-black text-white text-base sm:text-lg rounded-lg shadow-lg hover:shadow-red-500 hover:scale-105 transition-transform duration-200"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black to-red-600 text-white py-6 text-center">
        <p className="text-lg sm:text-xl font-bold">
             <q>Master Your Tasks, Master Your Time.</q>
          <br />
          <span className="text-red-300">© 2024 Todo App by Aqsa Gull.</span> All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TodoList;








