const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controllers");
const upload = require("../config/multerConfig");

router.get("/", taskController.getTask);
router.post("/", upload.single("pdf"), taskController.createTask);
router.put("/:id", upload.single("pdf"), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
