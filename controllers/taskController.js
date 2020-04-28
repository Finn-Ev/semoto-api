const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.getAllTasks = async (req, res) => {
  let tasks = [];

  try {
    if (req.params.sortBy === "createdAt")
      tasks = await Task.find({ user: req.user.id }).sort("-createdAt");
    else if (req.params.sortBy === "importance")
      tasks = await Task.find({ user: req.user.id }).sort({
        importanceValue: 1,
      });
    else
      tasks = await Task.find({ user: req.user.id }).sort(
        `${req.params.sortBy}`
      );

    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const { taskName, notes, importance, dueDate } = req.body;

    const newTask = new Task({
      user: user.id,
      taskName,
      notes,
      importance,
      dueDate,
    });

    const task = await newTask.save();

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (req.user.id !== task.user.toString()) {
      return res.status(401).json({ msg: "Nutzer ist nicht authorisiert" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true }
    );

    res.send(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (req.user.id !== task.user.toString()) {
      return res.status(401).json({ msg: "Nutzer ist nicht authorisiert" });
    }

    await Task.findByIdAndDelete(req.params.taskId);

    res.json({ msg: "Aufgabe wurde gelöscht" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
