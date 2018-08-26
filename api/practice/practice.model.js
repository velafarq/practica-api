"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const practiceSchema = mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  practiceStatus: { type: Boolean, default: false },
  practiceDuration: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

practiceSchema.virtual("dateString").get(function() {
  return this.date.toDateString();
});

practiceSchema.methods.serialize = function() {
  return {
    _id: this._id,
    user: this.user,
    practiceStatus: this.practiceStatus,
    practiceDuration: this.practiceDuration,
    date: this.dateString
  };
};

const Practice = mongoose.model("Practice", practiceSchema);

module.exports = { Practice, practiceSchema };
