import { useState, useEffect } from 'react';

export default function TaskForm({ onSave, taskToEdit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setDeadline(taskToEdit.deadline ? taskToEdit.deadline.slice(0, 16) : '');
      setFile(null);
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setFile(null);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = { title, description, deadline };
    if (file) {
      taskData.linkedFile = file;
    }
    onSave(taskData);
    setTitle('');
    setDescription('');
    setDeadline('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4" encType="multipart/form-data">
      <h2 className="text-xl font-semibold mb-2">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1" htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          rows={3}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1" htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="datetime-local"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-1" htmlFor="linkedFile">Attach File</label>
        <input
          id="linkedFile"
          type="file"
          className="w-full"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {taskToEdit ? 'Update' : 'Add'}
        </button>
        {taskToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
