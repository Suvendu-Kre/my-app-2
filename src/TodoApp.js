import React, { useState } from 'react';

function Todo({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <span>{todo.text}</span>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTask, completed: false },
    ]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-app-container">
      <h1>KRE Todo App</h1>
      <div className="task-input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <p className="task-count">
        {remainingTasks} task{remainingTasks !== 1 ? 's' : ''} remaining
      </p>
    </div>
  );
}

export default TodoApp;