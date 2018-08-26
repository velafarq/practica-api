const { login, register } = require("./user.controller");

module.exports = app => {
  app.post("/auth/login", login);
  app.post("/auth/register", register);
};
