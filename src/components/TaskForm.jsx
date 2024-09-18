import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ addTask }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      addTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskInput}
        onChange={handleInputChange}
        style={{
          width: "40vw",
          padding: "8px",
          borderRadius: "4px",
        }}
      />
      <button onClick={handleAddTask}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default TaskForm;
