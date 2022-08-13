const mongoose = require('mongoose');


const Reviews = new mongoose.Schema({
    url: { type: String, default: null },
    owner: { type: String, unique: null },
    likes: { type: Number ,default:null},
    email: { type: String, default: null },
    minted_at: { type: String ,default:null},
 
  
  },
  { collection: 'Reviews' }
  );
  
  module.exports = mongoose.model("review", Reviews);