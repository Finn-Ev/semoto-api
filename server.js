const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Controll-Allow-Origin", "*");
//   res.header("Access-Controll-Allow-Headers", "*");
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

app.get("/", (res) => res.send("API RUNNING"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
