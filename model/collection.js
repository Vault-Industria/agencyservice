const mongoose = require("mongoose");

const collections = new mongoose.Schema({
 
  owner: { type: String, unique: null },
  category: { type: String, default: null },
  description: {type: String, default: null },
  links: {type: Array, default: null },
  nft: { type: Array ,default:null},
  name: { type: String ,default:null},
  likes:{type:Array,default:[]},
  banner: { type: String ,default:null},
  creator: { type: String ,default:null},
  address: { type: String ,default:null},
  views:{type:Number,default:0}




},
{ collections: 'Collections' }
);

module.exports = mongoose.model("collections",collections);