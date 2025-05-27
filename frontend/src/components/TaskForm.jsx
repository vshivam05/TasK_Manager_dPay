import React, { useState, useEffect } from "react";

const TaskForm = ({ onAdd, onUpdate, editingTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [linkedFile, setLinkedFile] = useState(null);
  

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setDeadline(
        editingTask.deadline ? editingTask.deadline.split("T")[0] : ""
      );
      setLinkedFile(null);
    } else {
      setTitle("");
      setDescription("");
      setDeadline("");
      setLinkedFile(null);
    }
  }, [editingTask]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd({ title: title.trim(), description, deadline, linkedFile });
    setTitle("");
    setDescription("");
    setDeadline("");
    setLinkedFile(null);
  };

  const handleUpdate = (e) => {
    console.log(e);
    e.preventDefault();
    if (title.trim() === "") return;
    onUpdate({ title: title.trim(), description, deadline });
    setTitle("");
    setDescription("");
    setDeadline("");
    setLinkedFile(null);
  };

  const handleFileChange = (e) => {
    setLinkedFile(e.target.files[0]);
  };

  return (
    <form onSubmit={editingTask ? handleUpdate : handleAdd} className="mb-4 space-y-3">
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <input
        type="date"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <input
        type="file"
        className="w-full"
        onChange={handleFileChange}
        accept="*"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingTask ? "Update" : "Add"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
