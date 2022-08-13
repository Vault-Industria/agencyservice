const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  
  firstName: { type: String, default: null },
  lastName: { type: String,default:null}, 
  email: { type: String,unique: true  },
  discord: { type: String ,default:null},
  hotdrops:{type:String,default:null},

  
});

module.exports = mongoose.model("member", memberSchema);