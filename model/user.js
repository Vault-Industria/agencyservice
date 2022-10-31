const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  user_name: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  company: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  wallet:{type:String,default:null},
  role:{type:String,default:null},
  mycreators:{type:Array,default:null},
  agency_name:{type:String,default:null},
  website:{type:String,default:null},
  phone:{type:String,default:null},
  address:{type:String,default:null},
  city:{type:String,default:null},
  country:{type:String,default:null},
  postal_code:{type:String,default:null},
  bio:{type:String,default:null},
  photo:{type:String,default:null},
  agency:{type:String,defaault:null},
  allowAgency:{type:Boolean,default:false},
  under:{type:String,defaault:null},
  paid:{type:Boolean,default:null},
  agreement_date:{type:String,default:null}

  
});

module.exports = mongoose.model("user", userSchema);