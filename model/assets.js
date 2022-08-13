const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  nft: { type: String, default: null },
  price: { type: String, default: null },
  bids: { type: String, unique: null },
  status: { type: String },

});

module.exports = mongoose.model("nft", nftSchema);