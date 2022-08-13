require("../config/database").connect();
const router = require("express").Router();
const mint = require("../model/minted");
const collections = require("../model/collection");
const minted = require("../model/minted");
const pending = require("../model/pendingusers");
const member = require("../model/member");

router.post("/insertnft", async (req, res) => {
  const { url, strPrice, nftaddress, titles, desc, userId,fileUrl,collection,address} = req.body;
  var data = {
    url,
    owner: address,
    strPrice,
    nftaddress,
    fileUrl,
    titles,
    userId,
    desc,
    collectionz:collection


   
    
  };

  mint.create(data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


router.post("/members", async (req, res) => {
  const {firstName, lastName, email, discord,hotdrops} = req.body;
  var data = {
    firstName,
    lastName,
    email,
    discord,
    hotdrops,
  };
  member.create(data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});



router.post("/insertpending", async (req, res) => {
  const {user_name,email,phone,role,website } = req.body;
  var data = {
    user_name,
    email,
    phone,
    role,
    website,
  };
  pending.create(data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


router.get("/pendingusers", async (req, res) => {
  pending.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/deletepending", async (request, response) => {
  const {ids} = request.body;
  //response.send(ids);
  try {
    const deleted = await pending.findByIdAndDelete(ids);

    if (!deleted) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
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

router.get("/getcollection/:id", async (req, res) => {
  collections.find({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/getcollection-nft", async (req, res) => {
  const {id} = req.body
  collections.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


router.post("/getownercollection/", async (req, res) => {
  const {userInfo} =req.body
  
  collections.find({owner:userInfo }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });


  
});

router.post("/fromcollection", async (req, res) => {
  const {id } = req.body;
  const data = {collectionz:id};

  mint.find(data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});







//Querying minted
router.post("/querynft", async (req, res) => {
  const {id } = req.body;
  const data = {_id:id};

  mint.find(data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/reviews", async (req, res) => {});

module.exports = router;
