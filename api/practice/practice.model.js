"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const practiceSchema = mongoose.Schema({
  user: mongoose.Schema.ObjectId,

  practiceDuration: { type: Number, default: 0 }
});

practiceSchema.methods.serialize = function() {
  return {
    _id: this._id,
    user: this.user,

    practiceDuration: this.practiceDuration
  };
};

const Practice = mongoose.model("Practice", practiceSchema);

module.exports = { Practice, practiceSchema };
