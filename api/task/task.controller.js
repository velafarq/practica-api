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

const completeTask = (req, res) => {
  const { user } = req;

  if (!(req.params.id && req.body._id && req.params.id === req.body._id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = ["status"];

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

module.exports = { getTasks, createTask, deleteTask, completeTask };
