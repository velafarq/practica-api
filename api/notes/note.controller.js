const { Note } = require("./note.model");

const getNotes = (req, res) => {
  const { user } = req;
  Note.find({
    user: user._id
  })
    .then(notes => {
      res.json(notes.map(note => note.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

const getNoteById = (req, res) => {
  const { user } = req;
  Note.findOne({
    _id: req.params.id,
    user: user._id
  })
    .then(note => {
      res.json(note.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

const createNote = (req, res) => {
  const { user } = req;

  Note.create({
    user: user._id,
    content: req.body.content
  })
    .then(note => res.status(201).json(note.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "Something went wrong"
      });
    });
};

const deleteNote = (req, res) => {
  const { user } = req;
  Note.findOneAndRemove({
    _id: req.params.id,
    user: user._id
  })
    .then(() => {
      res.status(200).json({
        message: "Note successfully deleted"
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  deleteNote
};
