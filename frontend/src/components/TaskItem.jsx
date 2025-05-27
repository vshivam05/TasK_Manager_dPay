export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded shadow mb-2">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <div>
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800 focus:outline-none"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
