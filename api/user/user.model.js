"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  // firstName: { type: String, default: "" },
  // lastName: { type: String, default: "" },
  password: { type: String, required: true },
  email: String
});

// UserSchema.methods.serialize = function() {
//   return {
//     firstname: this.firstName || "",
//     lastName: this.lastName || "",
//     email: this.email,

//   };
// };

// UserSchema.methods.validatePassword = function(password) {
//   return bcrypt.compare(password, this.password);
// };

// UserSchema.statics.hashPassword = function(password) {
//   return bcrypt.hash(password, 10);
// };

const User = mongoose.model("User", UserSchema);
module.exports = User;
