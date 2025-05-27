// import React from "react";

// const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
//   return (
//     <li
//       className={`flex items-center justify-between p-2 border-b border-gray-200 ${
//         task.completed ? "bg-green-100" : "bg-white"
//       }`}
//     >
//       <div className="flex items-center space-x-3">
//         <input
//           type="checkbox"
//           checked={task.completed}
//           onChange={() => onToggleComplete(task._id, !task.completed)}
//           className="w-5 h-5"
//         />
//         <span
//           className={`select-none ${
//             task.completed ? "line-through text-gray-500" : ""
//           }`}
//         >
//           {task.title}
//         </span>
//       </div>
//       <div className="space-x-2">
//         <button
//           onClick={() => onEdit(task)}
//           className="text-blue-500 hover:text-blue-700"
//           aria-label="Edit task"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(task._id)}
//           className="text-red-500 hover:text-red-700"
//           aria-label="Delete task"
//         >
//           Delete
//         </button>
//       </div>
//     </li>
//   );
// };

// export default TaskItem;
import React from "react";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isDone = task.status === "DONE";

  return (
    <li
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-2 rounded-lg shadow-sm border ${
        isDone ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3
            className={`text-lg font-semibold ${
              isDone ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              isDone
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {task.status}
          </span>
        </div>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
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
    </li>
  );
};

export default TaskItem;
