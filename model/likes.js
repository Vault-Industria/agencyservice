const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  
  userId:{
    type:Schema.Types.ObjectId,
    ref:'user'
  },

  nftId:{
    type:Schema.Types.ObjectId,
    ref:'mint'
  }

  
},
{timestamps:true});

module.exports = mongoose.model("like", likesSchema);