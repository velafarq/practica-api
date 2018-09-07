const { Task } = require("./task.model");

const getTasks = (req, res) => {
  const { user } = req;
  Task.find({
    user: user._id
  })
    .then(tasks => {
      res.json(tasks.reverse().map(task => task.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

const createTask = (req, res) => {
  const { user } = req;

  Task.create({
    user: user._id,
    task: req.body.task
  })
    .then(task => res.status(201).json(task.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "Something went wrong"
      });
    });
};

const updateTask = (req, res) => {
  const { user } = req;

  if (!(req.params.id && req.body._id && req.params.id === req.body._id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = ["status", "practiceDuration"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Task.findOneAndUpdate(
    {
      _id: req.params.id,
      user: user._id
    },
    {
      $set: updated
    },
    {
      new: true
    }
  )
    .then(updatedTask => res.status(204).json(updatedTask))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "Something went wrong"
      });
    });
};

const getTaskById = (req, res) => {
  const { user } = req;
  Task.findOne({
    _id: req.params.id,
    user: user._id
  })
    .then(task => {
      res.json(task.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};
const pushNote = (req, res) => {
  const { user } = req;
  Task.findOne({
    _id: req.params.id,
    user: user._id
  })
    .then(task => {
      task.notes.push({ title: req.body.title, body: req.body.body });
      task.save(function(err) {
        if (!err) console.log("Success!");
      });
      res.json(task.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

// const deleteNote = (req, res) => {
//   const { user } = req;
//   Task.findOne({
//     _id: req.params.id,
//     user: user._id
//   })
//     .then(task => {
//       task.notes.id("5b901616a649d96e73cacbab").remove();
//       task.save(function(err) {
//         if (!err) console.log("Success!");
//       });
//       // res.json(task.serialize());
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({
//         error: "something went wrong"
//       });
//     });
// };
const deleteTask = (req, res) => {
  const { user } = req;
  Task.findOneAndRemove({
    _id: req.params.id,
    user: user._id
  })
    .then(() => {
      res.status(200).json({
        message: "Post successfully deleted"
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
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  pushNote
};
