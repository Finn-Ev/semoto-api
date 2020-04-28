const express = require("express");
const taskController = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(auth, taskController.createTask);

router.route("/:sortBy").get(auth, taskController.getAllTasks);

router
  .route("/:taskId")
  .put(auth, taskController.updateTask)
  .delete(auth, taskController.deleteTask);

module.exports = router;
