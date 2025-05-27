import axios from "axios";

// const API_BASE_URL = "http://localhost:8082/tasks"; // Adjust the URL to your backend
const API_BASE_URL = "https://task-manager-dpay.onrender.com/tasks"; // Adjust the URL to your backend

export async function fetchTasks() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
}

export async function createTask(task) {
  try {
    console.log(task);
    const formData = new FormData();
    ["title", "description", "deadline"].forEach((key) =>
      formData.append(key, task[key] || "")
    );

    // Add linkedFile to FormData only if it exists
    if (task.linkedFile) {
      formData.append("pdf", task.linkedFile);
    }

    const response = await axios.post(API_BASE_URL, formData);
    return response.data;
  } catch (error) {
    // Handle error when the response is available, or fallback to a general message
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
}

export async function updateTask(id, updates) {
  
  try {
    // const formData = new FormData();
    // ["title", "description", "deadline"].forEach((key) => {
    //   formData.append(key, updates[key] || "");
    // });
    
    // console.log("formData", formData);
    console.log("Updating:", id, updates);
    const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
    
    console.log("Update success:", response);
    return response.data;
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
}

export async function deleteTask(id) {
  console.log(id);
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
}
