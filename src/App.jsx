import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleComplete } from "./features/todo/todoSlice";

function App() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const handleAdd = () => {
    if (input.trim() === "") return;
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📝 Todo App
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2">
                
                {/* ✅ Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleComplete(todo.id))}
                  className="w-4 h-4"
                />

                {/* ✅ Text with strike */}
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              {/* Delete */}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No tasks yet 🚀
          </p>
        )}
      </div>
    </div>
  );
}

export default App;