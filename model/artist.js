const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  
  artType:{type:Array,default:null},  
  user_name: { type: String, default: null },
  user_email: { type: String, unique: true },
  user_linkedin: { type: String, unique: true },
  user_phone: { type: String,default:null},
  user_port: { type: String },
  user_port1: { type: String },
  user_other: { type: String, default: null },
  review:{type : Boolean, default:false}
  
});

module.exports = mongoose.model("artist", artistSchema);