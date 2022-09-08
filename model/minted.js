const mongoose = require("mongoose");

const minted = new mongoose.Schema({
  url: { type: String, default: null },
  owner: { type: String, unique: null },
  strPrice: { type: String ,default:null},
  nftaddress: { type: String, default: null },
  titles: { type: String ,default:null},
  desc: {type: String, default: null },
  userId: { type: String, default: null },
  fileUrl:{type: String, default: null},
  collectionz:{type: String, default: null},

  likes:{type:Array,default:[]},
  like:{type:Array,default:[]},
  views:{type:Number,default:0},
  assetCId:{type:String,default:null},
  traits:{type:Array,default:[]},
  posted_at:{type:Number,default:Date.now}


},
{ collection: 'MintedNFTs' }
);

module.exports = mongoose.model("mint", minted);