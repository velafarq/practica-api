"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const moment = require("moment");
require("mongodb-moment")(moment);

const noteSchema = mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

noteSchema.virtual("dateString").get(function() {
  return this.date.toDateString();
});
noteSchema.methods.serialize = function() {
  return {
    title: this.title,
    body: this.body,
    date: this.dateString
  };
};
const taskSchema = mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  task: String,
  status: { type: Boolean, default: false },
  notes: [noteSchema],
  practiceDuration: { type: Number, default: 0 },
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
    notes: this.notes,
    practiceDuration: this.practiceDuration,
    status: this.status,
    date: this.dateString
  };
};

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, taskSchema };
