const Web3 = require('web3');
const router = require("express").Router();
const abi = require("../abi/market.json");
const ALCHEMY_URL ="https://polygon-mumbai.g.alchemy.com/v2/xrnirKG4GiWFNg4F2wwyWqVxpKa7wI1z"

router.post("/getasset", async (req, res) => {

    const{address,blocktime} = req.body;



});