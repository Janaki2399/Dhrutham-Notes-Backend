const express = require("express");

const loginRouter = require("./routes/login-router.js");
const signupRouter = require("./routes/signup-router.js");
const notesRouter = require("./routes/notes-router.js");
const labelsRouter = require("./routes/labels-router.js");
const mongoose = require("mongoose");
const { mongoDBConnection } = require("./db/db.connect.js");

const app = express();
var cors = require("cors");
const authenticateUser = require("./middlewares/authenticateUser.js");
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoDBConnection();

app.use("/notes", authenticateUser, notesRouter);
app.use("/labels", authenticateUser, labelsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.get("/", (req, res) => {
  res.json({ text: "hello world" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, errorMessage: "No page found" });
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(PORT, () => {
  console.log("server started");
});
