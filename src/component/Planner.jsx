// Planner.js
import React, { useState, useEffect } from 'react';
import './Planner.css';

const Planner = () => {
  const [subject, setSubject] = useState('');
  const [hour, setHour] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const handleAdd = () => {
    if (subject && hour) {
      const newTask = { subject, hour: parseInt(hour, 10) };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setSubject('');
      setHour('');
    }
  };

  const handleIncrease = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, hour: task.hour + 1 } : task
    ));
    setTasks(updatedTasks);
  };

  const handleDecrease = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index && task.hour > 1 ? { ...task, hour: task.hour - 1 } : task
    ));
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="planner">
      <h1>Geekster Education Planner</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hour"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task.subject} - {task.hour} hour(s)
            <button className="increase" onClick={() => handleIncrease(index)}>+</button>
            <button className="decrease" onClick={() => handleDecrease(index)}>-</button>
            <button className="delete" onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planner;