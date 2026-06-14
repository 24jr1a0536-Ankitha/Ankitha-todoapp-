
import React, { useState, useEffect } from "react";
import "./TodoApp.jsx";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
      const [editId, setEditId] = useState(null);

        // Load from localStorage
          useEffect(() => {
              const saved = JSON.parse(localStorage.getItem("tasks")) || [];
                  setTasks(saved);
                    }, []);

                      // Save to localStorage
                        useEffect(() => {
                            localStorage.setItem("tasks", JSON.stringify(tasks));
                              }, [tasks]);

                                // Add / Update task
                                  const handleSubmit = (e) => {
                                      e.preventDefault();
                                          if (!input.trim()) return;

                                              if (editId) {
                                                    setTasks(
                                                            tasks.map((t) =>
                                                                      t.id === editId ? { ...t, text: input } : t
                                                                              )
                                                                                    );
                                                                                          setEditId(null);
                                                                                              } else {
                                                                                                    const newTask = {
                                                                                                            id: Date.now(),
                                                                                                                    text: input,
                                                                                                                            completed: false,
                                                                                                                                  };
                                                                                                                                        setTasks([...tasks, newTask]);
                                                                                                                                            }

                                                                                                                                                setInput("");
                                                                                                                                                  };

                                                                                                                                                    // Delete
                                                                                                                                                      const deleteTask = (id) => {
                                                                                                                                                          setTasks(tasks.filter((t) => t.id !== id));
                                                                                                                                                            };

                                                                                                                                                              // Edit
                                                                                                                                                                const editTask = (task) => {
                                                                                                                                                                    setInput(task.text);
                                                                                                                                                                        setEditId(task.id);
                                                                                                                                                                          };

                                                                                                                                                                            // Complete toggle
                                                                                                                                                                              const toggleTask = (id) => {
                                                                                                                                                                                  setTasks(
                                                                                                                                                                                        tasks.map((t) =>
                                                                                                                                                                                                t.id === id ? { ...t, completed: !t.completed } : t
                                                                                                                                                                                                      )
                                                                                                                                                                                                          );
                                                                                                                                                                                                            };

                                                                                                                                                                                                              return (
                                                                                                                                                                                                                  <div className="container">
                                                                                                                                                                                                                        <h1>Todo List</h1>

                                                                                                                                                                                                                              <form onSubmit={handleSubmit}>
                                                                                                                                                                                                                                      <input
                                                                                                                                                                                                                                                value={input}
                                                                                                                                                                                                                                                          onChange={(e) => setInput(e.target.value)}
                                                                                                                                                                                                                                                                    placeholder="Enter task"
                                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                                                    <button>{editId ? "Update" : "Add"}</button>
                                                                                                                                                                                                                                                                                          </form>

                                                                                                                                                                                                                                                                                                <ul>
                                                                                                                                                                                                                                                                                                        {tasks.map((task) => (
                                                                                                                                                                                                                                                                                                                  <li key={task.id}>
                                                                                                                                                                                                                                                                                                                              <input
                                                                                                                                                                                                                                                                                                                                            type="checkbox"
                                                                                                                                                                                                                                                                                                                                                          checked={task.completed}
                                                                                                                                                                                                                                                                                                                                                                        onChange={() => toggleTask(task.id)}
                                                                                                                                                                                                                                                                                                                                                                                    />

                                                                                                                                                                                                                                                                                                                                                                                                <span className={task.completed ? "done" : ""}>
                                                                                                                                                                                                                                                                                                                                                                                                              {task.text}
                                                                                                                                                                                                                                                                                                                                                                                                                          </span>

                                                                                                                                                                                                                                                                                                                                                                                                                                      <button onClick={() => editTask(task)}>Edit</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                            </li>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </ul>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                export default TodoApp;
