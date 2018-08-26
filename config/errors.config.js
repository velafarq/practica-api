module.exports = app => {
  app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res
        .status(401)
        .json({ message: `You don't have access to that resource!` });
    }
  });
};
