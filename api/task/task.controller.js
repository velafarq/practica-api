const { Task } = require("./task.model");

const getTasks = (req, res) => {
  const { user } = req;
  Task.find({
    user: user._id
  })
    .then(tasks => {
      res.json(tasks.map(task => task.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

const createTask = (req, res) => {
  const requiredFields = ["task"];
  const { user } = req;

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Task.create({
    user: user._id,
    task: req.body.task
  })
    .then(task =>
      res.status(201).json({
        _id: task._id
      })
    )
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

module.exports = { getTasks, createTask, deleteTask };
