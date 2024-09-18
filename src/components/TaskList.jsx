import React, { useState } from "react";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, toggleTaskCompletion, editTask }) => {
  const [editedText, setEditedText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleEditInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleEditTask = (id) => {
    if (editedText.trim() !== "") {
      editTask(id, editedText);
    }
    setEditingTaskId(null);
    setEditedText("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedText("");
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="task-container">
      <div className="toggle-buttons">
        <button
          onClick={() => handleFilterChange("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("incomplete")}
          className={filter === "incomplete" ? "active" : ""}
        >
          Incomplete
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <div
              className="task-status"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed ? (
                <i className="fas fa-check-circle completed"></i>
              ) : (
                <i className="far fa-circle"></i>
              )}
            </div>
            {editingTaskId === task.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editedText}
                  onChange={handleEditInputChange}
                  autoFocus
                />
                <div>
                  <button
                    onClick={() => handleEditTask(task.id)}
                    style={{ color: "green" }}
                  >
                    <i className="fas fa-save"></i>
                  </button>
                  <button onClick={handleCancelEdit} style={{ color: "red" }}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            ) : (
              <span>{task.text}</span>
            )}
            <div>
              {!editingTaskId && (
                <button
                  onClick={() => setEditingTaskId(task.id)}
                  style={{ color: "green" }}
                >
                  <i className="fas fa-edit"></i>
                </button>
              )}
              {!editingTaskId && (
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ color: "red" }}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
