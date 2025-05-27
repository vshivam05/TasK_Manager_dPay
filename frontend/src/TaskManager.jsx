import React, { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";

const TaskManager = () => {
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
      console.log("fetched tasks data", data);
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
      console.log("from the taskManager", task);
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, data) => {
    console.log("from the update logic in taskmanager", id, data);
    setLoading(true);
    setError(null);
    try {
      const updatedTask = await updateTask(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      loadTasks();
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
      loadTasks();
    } catch (err) {
      setError(err.message || "Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

 const handleToggleComplete = (id, currentStatus) => {
  const newStatus = currentStatus === "DONE" ? "TODO" : "DONE";
  handleUpdateTask(id, { status: newStatus });
};


  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.status === "DONE";
    if (filter === "Pending") return task.status === "TODO";
    return true;
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>
      )}
      <TaskForm
        onAdd={handleAddTask}
        onUpdate={(data) => handleUpdateTask(editingTask._id, data)}
        editingTask={editingTask}
        onCancel={handleCancelEdit}
      />
      <FilterButtons currentFilter={filter} onChangeFilter={setFilter} />
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskManager;
