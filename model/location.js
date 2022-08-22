const mongoose = require("mongoose");

const location = new mongoose.Schema(
  {
    owner: { type: String, unique: null },
    city: { type: String, default: null },
    continent: { type: String, default: null },
    country: { type: String, default: null },
    latitude: { type: String, default: null },
    longitude: { type: String, default: null },
    wallet: { type: String, default: null },
    assetCId: { type: String, default: null },
    bought: { type:Boolean, default: null },
    liked: { type: Boolean, default: null },
    viewed: { type: Boolean, default: null },
    tokenId: { type: String, default: null },
  },
  
);

module.exports = mongoose.model("location", location);
