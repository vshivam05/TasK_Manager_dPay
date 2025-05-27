import axios from "axios";

const API_BASE_URL = "http://localhost:8082/tasks"; // Adjust the URL to your backend

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
    const response = await axios.post(API_BASE_URL, task);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create task");
  }
}

export async function updateTask(id, updates) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updates);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task");
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
