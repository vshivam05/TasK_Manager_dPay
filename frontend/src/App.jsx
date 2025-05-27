import React from "react";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Task Manager
        </h1>
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
