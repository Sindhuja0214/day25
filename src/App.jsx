import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not completed');
  const [filter, setFilter] = useState('all');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e, index) => {
    const newTodos = [...todos];
    newTodos[index].status = e.target.value;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    if (taskName.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        taskName: taskName,
        description: description,
        status: status,
      };
      setTodos([...todos, newTodo]);
      setTaskName('');
      setDescription('');
      setStatus('not completed');
    }
  };

  const handleEditTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.status === 'completed';
    } else if (filter === 'not completed') {
      return todo.status === 'not completed';
    } else {
      return true;
    }
  });
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={taskName}
          onChange={handleTaskNameChange}
          placeholder="Enter task name"
          />
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <div>
          <label>Filter:</label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
        </div>
        {filteredTodos.map((todo, index) => (
          <div key={todo.id} style={{ border: '1px solid', padding: '10px', margin: '10px' }}>
            <div>
              <strong>Task Name:</strong> {todo.taskName}
            </div>
            <div>
              <strong>Description:</strong> {todo.description}
              </div>
          <div>
            <strong>Status:</strong>{' '}
            <select value={todo.status} onChange={(e) => handleStatusChange(e, index)}>
              <option value="not completed">Not Completed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button onClick={() => handleEditTodo(todo.id, { ...todo, taskName: prompt('Enter new task name:', todo.taskName) })}>
            Edit
          </button>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;  