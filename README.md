# Task Manager Application

This is a full-stack Task Manager application with a backend API and a React frontend. It supports creating, updating, deleting, and filtering tasks, including file attachments.

---

## Project Structure

- `backend/`: Contains the backend Express.js API server.
- `frontend/`: Contains the React frontend application.

---

## Backend

### Technologies

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Multer for file uploads

### Setup and Run

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure MongoDB connection in `backend/src/config` as needed.

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:8082`.

### API Endpoints

- `GET /tasks`: Fetch all tasks.
- `POST /tasks`: Create a new task. Supports file upload via multipart/form-data.
- `PATCH /tasks/:id`: Update a task by ID. Supports file upload via multipart/form-data.
- `DELETE /tasks/:id`: Delete a task by ID.

---

## Frontend

### Technologies

- React
- Axios for API calls
- Tailwind CSS for styling

### Setup and Run

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000` (or as configured).

### Features

- View list of tasks with filtering options (All, Completed, Pending).
- Create new tasks with optional file attachments.
- Update existing tasks, including changing details and file attachments.
- Delete tasks.
- Mark tasks as completed or pending.
- Edit and cancel edits on tasks.
- Error handling and loading states during API operations.

---

## Important Notes

- The backend uses Multer middleware to handle file uploads for both creating and updating tasks.
- The frontend sends FormData when uploading files during create or update operations.
- Ensure the backend server is running before starting the frontend to avoid API errors.
- The frontend and backend communicate via `http://localhost:8082/tasks`.

---

## Troubleshooting

- If create, update, or delete operations fail, check the browser console and network tab for errors.
- Check backend server logs for error messages.
- Verify MongoDB connection and backend server status.
- Ensure CORS is properly configured if accessing backend from a different origin.

---

## Development Notes

- The task management logic is separated into a `TaskManager` component in the frontend for clarity.
- The `TaskForm` component handles both creating and updating tasks with conditional rendering.
- API calls are centralized in `frontend/src/api/api.js`.
- Backend routes and controllers are organized under `backend/src/routes` and `backend/src/controllers`.

---

## Running Tests

Currently, no automated tests are included. Manual testing is recommended by interacting with the UI and API endpoints.

---

## License

This project is open source and free to use.
