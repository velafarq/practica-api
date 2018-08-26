const { Practice } = require("./practice.model");

const getPracticeSessions = (req, res) => {
  const { user } = req;
  Practice.find({
    user: user._id
  })
    .then(practiceSessions => {
      res.json(practiceSessions.map(session => session.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

const getPracticeSessionById = (req, res) => {
  const { user } = req;
  Practice.findOne({
    _id: req.params.id,
    user: user._id
  })
    .then(session => {
      res.json(session.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "something went wrong"
      });
    });
};

const createPracticeSession = (req, res) => {
  const { user } = req;

  Practice.create({
    user: user._id,
    practiceStatus: req.body.practiceStatus,
    practiceDuration: req.body.practiceDuration
  })
    .then(practice =>
      res.status(201).json({
        _id: practice._id
      })
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "Something went wrong"
      });
    });
};

const updatePracticeSession = (req, res) => {
  const { user } = req;

  if (!(req.params.id && req.body._id && req.params.id === req.body._id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = ["practiceStatus", "practiceDuration"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  Practice.findOneAndUpdate(
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
    .then(updatedPractice => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "Something went wrong"
      });
    });
};

module.exports = {
  getPracticeSessions,
  createPracticeSession,
  updatePracticeSession,
  getPracticeSessionById
};
