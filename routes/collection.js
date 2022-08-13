require("../config/database").connect();
const router = require("express").Router();
const collections = require("../model/collection");
const minted = require("../model/minted");
const user = require("../model/user");

router.post("/insertcollection", async (req, res) => {
    const { name, description, category, links,userId,img,creator} = req.body;
    var data = {
      owner: userId,
      name,
      description,
      category,
      links,
      banner:img,
      creator
  
    };
  
    collections.create(data, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.get("/getcollections", async (req, res) => {
    
    collections.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  
  router.post("/collectionid", async (req, res) => {
    const { id } = req.body;
    //res.send(id);
    collections.find({_id:id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.patch("/updatecollection", async (req, res) => {
    const { collection, nft } = req.body;
    collections.findByIdAndUpdate(
      collection,
      { $push: { nft: nft } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  router.post("/nftincollection",async(req,res)=>{
    const {nfts}=req.body;
  
    minted.find({_id:{$in :nfts}},function(err,result){
      if(err){
        res.send(err);
      }else{
        res.send(result);
      }
    })
  
  });

  router.post("/getcollectionowner", async (req, res) => {
    const { owner } = req.body;
    user.find({ _id: owner }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  module.exports = router;