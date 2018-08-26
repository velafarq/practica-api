"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const noteSchema = mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  content: String,
  date: { type: Date, default: Date.now }
});

noteSchema.virtual("dateString").get(function() {
  return this.date.toDateString();
});

noteSchema.methods.serialize = function() {
  return {
    _id: this._id,
    user: this.user,
    content: this.content,
    date: this.dateString
  };
};

const Note = mongoose.model("Note", noteSchema);

module.exports = { Note, noteSchema };
