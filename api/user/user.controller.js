const jsonwebtoken = require("jsonwebtoken");
const User = require("./user.model");
const JWT_SECRET = "12345";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const login = (req, res) => {
  const user = req.body;

  User.findOne({
    email: user.email
  })
    .then(response => {
      const userFound = response;
      if (!userFound) {
        return res.status(400).json({
          message: "User cannot be found!"
        });
      } else {
        bcrypt.compare(user.password, userFound.password, function(
          err,
          result
        ) {
          if (result == true) {
            const token = jsonwebtoken.sign(
              { email: userFound.email, _id: userFound._id },
              JWT_SECRET
            );
            return res.status(200).json({
              token
            });
          }
          return res.status(401).json({
            message: "Password mismatch"
          });
        });
      }
    })

    .catch(error => {
      res.status(401).json({
        message: "Password mismatch"
      });
    });
};

const register = (req, res) => {
  const newUser = req.body;

  User.findOne({
    email: newUser.email
  })
    .then(response => {
      const userFound = response;
      if (userFound) {
        return res.status(400).json({
          message: "Email already in use"
        });
      } else {
        bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
          User.create({
            email: newUser.email,
            password: hash
          }).then(response => {
            const token = jsonwebtoken.sign(
              { email: response.email, _id: response._id },
              JWT_SECRET
            );
            return res.status(200).json({
              token
            });
          });
        });
      }
    })
    .catch(error => {
      res.status(401).json({
        message: "Did not work"
      });
    });
};

module.exports = { login, register };
