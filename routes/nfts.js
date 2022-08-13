const axios = require("axios");
const minted = require("../model/minted");
require("../config/database").connect();
const router = require("express").Router();

router.post("/getassets", async (req, res) => {
  let {owner} = req.body;
  console.log('owner is',owner)
  //owner = owner.walletaddress;
  const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/xrnirKG4GiWFNg4F2wwyWqVxpKa7wI1z/getNFTs/`; //`https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;

  const config = {
    method: "get",
    url: `${baseURL}?owner=${owner}`,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data, null, 2));
      //res.status(200).json({ nfts: response.data });
     res.status(200).send(response.data);
    })

    .catch((error) => {
      console.log(error);
        res.status(500).send(error);
    });
});



router.get("/getnfts", async (req, res) => {
    minted.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.post("/getbyownernfts", async (req, res) => {
    const {id} = req.body;
    minted.find({owner:id}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  
  router.post("/getbyowneraddress", async (req, res) => {
    const {address} = req.body;
    minted.find({owner:address}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });


  router.put("/like", async (req, res) => {
    const {imgid,userid } = req.body;
    minted.findByIdAndUpdate(imgid, { $push: { likes: userid } }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

  })
  router.post("/views", async (req, res) => {
    const {imgid } = req.body;
    
    minted.findByIdAndUpdate(imgid, { $inc: { views:1 } },{new:true}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
	
  })




router.post("/transactions", async (req, res) => {

    const {address} = req.body;

const axios = require('axios').default;

const options = {
  method: 'POST',
  url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  data: {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromBlock: '0x0',
        toBlock: 'latest',
        category: ['external', 'erc721'],
        withMetadata: false,
        excludeZeroValue: true,
        maxCount: '0x3e8',
        fromAddress: address,
        contractAddresses: ['0x4b60c4c241100e2ddb0e4af034174e0441a084af',]
      }
    ]
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(JSON.stringify(response.data.result, null, 4));
    res.send(response.data.result);
  })
  .catch(function (error) {
    console.error(error);
    res.send(error);
  });

  });

  
router.post("/bought", async (req, res) => {

const {address} = req.body;



const options = {
  method: 'POST',
  url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  data: {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
    params: [
        {
          fromBlock: '0x0',
          toBlock: 'latest',
          category: ['external', 'erc20'],
          withMetadata: false,
          excludeZeroValue: true,
          maxCount: '0x3e8',
          toAddress: address,
          contractAddresses: ['0x4b60c4c241100e2ddb0e4af034174e0441a084af',]
        }
      ]
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(JSON.stringify(response.data.result, null, 4));
    res.send(response.data.result);
  })
  .catch(function (error) {
    console.error(error);
    res.send(error);
  });

  })


  router.post("/insert", async (req, res) => {

  })


module.exports = router;
