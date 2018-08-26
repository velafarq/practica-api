const { getTasks, createTask, deleteTask } = require("./task.controller");

module.exports = app => {
  app.get("/tasks", getTasks);
  app.post("/tasks", createTask);
  app.delete("/tasks/:id", deleteTask);
};
