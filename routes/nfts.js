const axios = require("axios");
const minted = require("../model/minted");
require("../config/database").connect();
const router = require("express").Router();
const contractAddress = process.env.CONTRACT

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
 
      //res.status(200).json({ nfts: response.data });
     res.status(200).send(response.data);
    })

    .catch((error) => {
      
        res.status(500).send(error);
    });
});

//getting assets owned by a particular address
router.post('/getmynft', async(req,res)=>{
  let {owner} = req.body;
  const options = {
    method: 'GET',
    url: 'https://polygon-mumbai.g.alchemy.com/nft/v2/Dw_2lYaxcgvVwj3Cd5-WEGBnX5b4NWvW/getNFTs',
    params: {owner: owner, withMetadata: 'false'},
    headers: {accept: 'application/json'}
  };
  
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
      res.send(error);
    });

})


//get transacations with contract value transfer from buyer paying contract

router.post("/buyertocontract", async(req,res)=>{
  let {owner} = req.body;
 

  const options = {
    method: 'POST',
    url: 'https://polygon-mumbai.g.alchemy.com/v2/Dw_2lYaxcgvVwj3Cd5-WEGBnX5b4NWvW',
   
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    data: {
      id: 1,
      jsonrpc: '2.0',
      method: 'alchemy_getAssetTransfers',
      params: [
        {
          fromBlock: '0x0',
          toBlock: 'latest',
          category: ['external','erc20','erc721'],
          toAddress:owner,
          fromAddress:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
          withMetadata: false,
          excludeZeroValue: true,
          maxCount: '0x3e8'
        }
      ]
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
      console.error(error);
    });


});


//value transfer from contract to seller


router.post("/contracttoseller", async(req,res)=>{
  let {owner} = req.body;
 

  const options = {
    method: 'POST',
    url: 'https://polygon-mumbai.g.alchemy.com/v2/Dw_2lYaxcgvVwj3Cd5-WEGBnX5b4NWvW',
   
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    data: {
      id: 1,
      jsonrpc: '2.0',
      method: 'alchemy_getAssetTransfers',
      params: [
        {
          fromBlock: '0x0',
          toBlock: 'latest',
          category: ['erc721'],
          // toAddress:"0xbDE2516B5740000f073923a7FDBe7cb43A0E390E",
          // toAddress:"0x0000000000000000000000000000000000000000",
          fromAddress:"0x71aa474b99926070Ae2AA21c0575835AA6494F79",
          withMetadata: true,
          excludeZeroValue: true,
          maxCount: '0x3e8'
        }
      ]
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
      console.error(error);
    });


})







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

  router.post("/updatesold",async(req,res) =>{
    const {tId} = req.body;
    minted.findOneAndUpdate({assetCId:tId},{sold:true},function(err,result){
      if(err){
        res.send(err);
      }else{
        res.send(result)
      }
    })

  })

  
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

  router.post("/like", async (req, res) => {
    const { userid, imgid } = req.body
    const nft =await minted.findById(imgid,)
    try {
      if(nft.like.includes(userid)){
        minted.findByIdAndUpdate(imgid, { $pull: { like:userid } }, function (err, result) {
          if (err) {
              res.send(err);
          } else {
              res.send(result);
          }
      })
      }else{
        minted.findByIdAndUpdate(imgid, { $push: { like:userid } }, function (err, result) {
          if (err) {
              res.send(err);
          } else {
              res.send(result);
          }
      });

      }
    } catch (error) {
      res.send(error)
    }
    

  });

  
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
        contractAddresses: [`${contractAddress}`,]
      }
    ]
  }
};

axios
  .request(options)
  .then(function (response) {
  
    res.send(response.data.result);
  })
  .catch(function (error) {
    console.error(error);
    res.send(error);
  });

  });

  router.post("/qtransactions", async (req, res) => {

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
        contractAddresses: [`${contractAddress}`,]
      }
    ]
  }
};

axios
  .request(options)
  .then(function (response) {
  
    let item = response.data.result.transfers;
    res.send(item)
    
    // res.send(item.filter((v)=>v.value!==0.025&&v.value!==null));
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
          contractAddresses: [`${contractAddress}`,]
        }
      ]
  }
};

axios
  .request(options)
  .then(function (response) {
   
    res.send(response.data.result);
  })
  .catch(function (error) {
    console.error(error);
    res.send(error);
  });

  })


  router.post("/insert", async (req, res) => {

  })

  router.post("/getagencyassets",async(req,res)=>{

  })


module.exports = router;
