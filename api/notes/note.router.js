const {
  getNotes,
  createNote,
  getNoteById,
  deleteNote
} = require("./note.controller");

module.exports = app => {
  app.get("/notes", getNotes);
  app.get("/notes/:id", getNoteById);
  app.post("/notes", createNote);
  app.delete("/notes/:id", deleteNote);
};
