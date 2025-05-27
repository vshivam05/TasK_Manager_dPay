import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks to display.</p>;
  }
  // console.log("from the tasklist", tasks);
  return (
    <ul className="border border-gray-300 rounded divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
