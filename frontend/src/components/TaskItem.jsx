import React from "react";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <li
      className={`flex items-center justify-between p-2 border-b border-gray-200 ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, !task.completed)}
          className="w-5 h-5"
        />
        <span
          className={`select-none ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
