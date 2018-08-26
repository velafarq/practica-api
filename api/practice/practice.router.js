const {
  getPracticeSessions,
  createPracticeSession,
  updatePracticeSession,
  getPracticeSessionById
} = require("./practice.controller");

module.exports = app => {
  app.get("/practice", getPracticeSessions);
  app.get("/practice/:id", getPracticeSessionById);
  app.post("/practice", createPracticeSession);
  app.put("/practice/:id", updatePracticeSession);
};
