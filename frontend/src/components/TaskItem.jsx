import React from "react";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isDone = task.status === "DONE";

  return (
    <tr
      className={`${
        isDone ? "bg-green-50" : "bg-white"
      } border-b border-gray-200`}
    >
      {/* Title */}
      <td className="px-4 py-2 font-medium text-gray-900">{task.title}</td>

      {/* Description */}
      <td className="px-4 py-2 text-gray-600 text-center">
        {task.description}
      </td>

      {/* Status */}
      <td className="px-4 py-2">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            isDone
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => onToggleComplete(task._id, task.status)}
            className="w-5 h-5 text-blue-600"
          />
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskItem;
