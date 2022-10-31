const mongoose = require("mongoose");

const invite = new mongoose.Schema({
  deliverables: { type: String, default: null },
  waiver: { type: Boolean, default: null },
  email: { type:String,  unique: true, default: null },
  role: { type:String,  unique: true, default: null },
  revenueshare: { type: Number, default: null },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("invite", invite);
