"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const moment = require("moment");
require("mongodb-moment")(moment);

const taskSchema = mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  task: String,
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

taskSchema.virtual("dateString").get(function() {
  return this.date.toDateString();
});

taskSchema.methods.serialize = function() {
  return {
    _id: this._id,
    user: this.user,
    task: this.task,
    completed: this.completed,
    date: this.dateString
  };
};

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, taskSchema };
