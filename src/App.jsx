import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, status: 'To-Do' }]);
      setNewTask('');
    }
  };


  const moveTask = (taskId) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, status: nextStatus(task.status) } : task
    ));
  };

  
  const nextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'To-Do': return 'inProgress';
      case 'inProgress': return 'Completed';
      case 'Completed': return 'Completed'; 
      default: return 'To-Do';
    }
  };


  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  const renderTasksByStatus = (status) => {
    return tasks
      .filter(task => task.status === status)
      .map((task) => (
        <li key={task.id}>
          <span className="task-text">{task.text}</span>
          {status !== 'Completed' && (
            <button onClick={() => moveTask(task.id)}>Next Stage</button>
          )}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input 
          type="text" 
          placeholder="Add a new task" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add/Enter</button>
      </div>
      <div className="task-section">
        <h2>To-Do</h2>
        <ul>{renderTasksByStatus('To-Do')}</ul>
      </div>
      <div className="task-section">
        <h2>In Progress</h2>
        <ul>{renderTasksByStatus('inProgress')}</ul>
      </div>
      <div className="task-section">
        <h2>Completed</h2>
        <ul>{renderTasksByStatus('Completed')}</ul>
      </div>
    </div>
  );
}

export default App;
