const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  taskName: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  importance: {
    type: String,
    required: true,
  },
  importanceValue: {
    type: Number,
    default: function() {
      if (this.importance === "Niedrig") return 0;
      else if (this.importance === "Mittel") return 1;
      else return 2;
    },
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// TaskSchema.virtual("importanceValue").get(function() {
//   return this.importance + "virtuell";
// });

module.exports = Task = mongoose.model("task", TaskSchema);
