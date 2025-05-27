import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks to display.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Description
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
