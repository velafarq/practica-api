const {
  getTasks,
  createTask,
  deleteTask,
  completeTask
} = require("./task.controller");

module.exports = app => {
  app.get("/tasks", getTasks);
  app.post("/tasks", createTask);
  app.put("/tasks/:id", completeTask);
  app.delete("/tasks/:id", deleteTask);
};
