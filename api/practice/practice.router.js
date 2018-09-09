const {
  getTotalPracticeTime,
  createPracticeSession,
  updatePracticeTime
} = require("./practice.controller");

module.exports = app => {
  app.get("/practice", getTotalPracticeTime);
  app.post("/practice", createPracticeSession);
  app.put("/practice/:id", updatePracticeTime);
};
