const mongoose = require("mongoose");

const pendingSchema = new mongoose.Schema({
  user_name: { type: String, default: null },
  email: { type: String, unique: true },
  role:{type:String,default:null},
  website:{type:String,default:null},
  phone:{type:String,default:null},
  status:{type:String,dafault:null}
  
  
});

module.exports = mongoose.model("pending", pendingSchema);