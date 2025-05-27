import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/api';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const saveTask = async (task) => {
    console.log("from the savetaks function in frontend update",task);
    try {
      if (editingTask) {
        const { linkedFile, ...taskData } = task; 
        const updated = await updateTask(task._id, taskData);
        setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
      } else {
        const newTask = await createTask({ ...task, completed: false });
        setTasks([...tasks, newTask]);
      }
      setFormVisible(false);
      setEditingTask(null);
    } catch {
      setError('Failed to save task');
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
    } catch {
      setError('Failed to update task');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setFormVisible(true);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setFormVisible(false);
  };

  return (
    <div>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      {!formVisible && (
        <div className="mb-4 text-center">
          <button
            onClick={() => setFormVisible(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </div>
      )}

      {formVisible && (
        <TaskForm
          onSave={saveTask}
          taskToEdit={editingTask}
          onCancel={cancelEdit}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onEdit={startEdit}
          onDelete={deleteTaskById}
        />
      )}
    </div>
  );
}
