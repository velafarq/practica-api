const {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  pushNote,
  pullNote
} = require("./task.controller");

module.exports = app => {
  app.get("/tasks", getTasks);
  app.get("/tasks/:id", getTaskById);
  app.put("/tasks/:id/notes", pushNote);
  app.post("/tasks", createTask);
  app.put("/tasks/:id", updateTask);
  app.put("/tasks/:id/notes/pull", pullNote);
  app.delete("/tasks/:id", deleteTask);
};
