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
    if (task.linkedFile) {
      const formData = new FormData();
      ["title", "description", "deadline"].forEach((key) =>
        formData.append(key, task[key] || "")
      );
      formData.append("linkedFile", task.linkedFile);

      return (await axios.post(API_BASE_URL, formData)).data;
    } else {
      return (await axios.post(API_BASE_URL, task)).data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
}

export async function updateTask(id, updates) {
  const trimmedId = id.trim();  // ✅ REMOVE extra spaces
  console.log(trimmedId, updates);
  try {
    const response = await axios.patch(`${API_BASE_URL}/${trimmedId}`, updates);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error); // 👈 log actual error for debugging
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
