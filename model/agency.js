const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema({
  agency_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  wallet:{type:String,default:null},
  role:{type:String,default:null},
  mycreators:{type:Array,default:null},
  physical_address:{type:String,default:null},
  website:{type:String,default:null},
  phone:{type:String,default:null},
  city:{type:String,default:null},
  country:{type:String,default:null},
  postal_code:{type:String,default:null},
  bio:{type:String,default:null}

});

module.exports = mongoose.model("agency", agencySchema);