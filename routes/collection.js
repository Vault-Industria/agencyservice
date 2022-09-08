require("../config/database").connect();
const router = require("express").Router();
const collections = require("../model/collection");
const minted = require("../model/minted");
const user = require("../model/user");

router.post("/insertcollection", async (req, res) => {
  const { name, description, category, links, userId, img, creator,address } = req.body;
  var data = {
    owner: userId,
    name,
    description,
    category,
    links,
    banner: img,
    creator,
    address
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
  collections.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/collectionaddress", async (req, res) => {
  const { address } = req.body;
  //res.send(id);
  collections.find({address:address }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/creatorcollectionaddress", async (req, res) => {
  const { wallets } = req.body;
  collections.find({"address":{$in:wallets}},(err, result) => {
    if (err) {
     res.send('this is an error',err);
    } else {
     res.send(result);
    }
   })

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

router.post("/nftincollection", async (req, res) => {
  const { nfts } = req.body;

  minted.find({ _id: { $in: nfts } }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
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

router.post("/getcreatorcollection", async (req, res) => {
  const { owner } = req.body;
  collections.find({owner: owner }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});




router.post("/getowner", async (req, res) => {
  const { owner } = req.body;
  collections.find({ owner: owner }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/getcreators", async (req, res) => {
  const { _id } = req.body;
  let query = user.find({ _id: _id }).select("mycreators");
  query.exec(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/likecollection", async (req, res) => {
  const { userid, imgid } = req.body;
  const nft = await collections.findById(imgid);
  try {
    if (nft.likes.includes(userid)) {
      collections.findByIdAndUpdate(
        imgid,
        { $pull: { likes: userid } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      collections.findByIdAndUpdate(
        imgid,
        { $push: { likes: userid } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/viewscollection", async (req, res) => {
  const { imgid } = req.body;

  collections.findByIdAndUpdate(
    { _id: imgid },
    { $inc: { views: 1 } },
    { new: true },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
