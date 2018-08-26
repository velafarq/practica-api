module.exports = app => {
  require("../api/user/user.router")(app);
  require("../api/task/task.router")(app);
  require("../api/practice/practice.router")(app);
  require("../api/notes/note.router")(app);
};
