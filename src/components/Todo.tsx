"use client";
import React from "react";
import { useState, useEffect } from "react";

export interface todos {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [todoName, setTodoName] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodos = () => {
    const newTodo = {
      id: Math.random(),
      title: todoName,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const checkTodo = (id: number) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const startEditingTodo = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const cancelEditingTodo = () => {
    setEditingTodoId(null);
    setEditingTodoTitle("");
  };

  const saveEditingTodo = () => {
    const newTodos = todos.map((t) => {
      if (t.id === editingTodoId) {
        t.title = editingTodoTitle;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setEditingTodoId(null);
    setEditingTodoTitle("");
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col space-y-10">
      <div className="p-4 flex flex-col space-y-2 text-black">
        <textarea
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="p-10 rounded border border-solid border-gray-800"
        />
        <button
          className="p-4 ml-4 bg-violet-700 rounded hover:bg-violet-900 text-white font-bold"
          onClick={addTodos}
        >
          Add Todo
        </button>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center w-2/3 my-2 bg-gray-600 p-4 bg-opacity-30 border border-solid border-gray-800 rounded"
          >
            <div className="flex flex-row space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => checkTodo(todo.id)}
                className="h-6 w-6"
              />
              {editingTodoId === todo.id ? (
                <div className="flex flex-row space-x-2">
                  <input
                    type="text"
                    value={editingTodoTitle}
                    onChange={(e) => setEditingTodoTitle(e.target.value)}
                    className="rounded border border-solid border-gray-800 text-black"
                  />
                  <button
                    className="bg-green-500 p-2 rounded hover:bg-green-700 text-white font-bold"
                    onClick={saveEditingTodo}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 p-2 rounded hover:bg-gray-700 text-white font-bold"
                    onClick={cancelEditingTodo}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div
                  className={`text-xl font-semibold ml-2 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => startEditingTodo(todo.id, todo.title)}
                className="bg-blue-500 p-2 rounded hover:bg-blue-700 text-white font-bold"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-600 p-2 rounded hover:bg-red-800 text-white font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
