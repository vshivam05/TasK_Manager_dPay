import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (err) {
      setError(err.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = (id, completed) => {
    handleUpdateTask(id, { completed });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return {
    tasks,
    filter,
    setFilter,
    editingTask,
    loading,
    error,
    filteredTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleComplete,
    handleEdit,
    handleCancelEdit,
  };
}
