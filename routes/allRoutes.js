require("../config/database").connect();
const router = require("express").Router();
const mint = require("../model/minted");
const collections = require("../model/collection");
const minted = require("../model/minted");
const pending = require("../model/pendingusers");
const member = require("../model/member");
const location = require("../model/location");

router.post("/insertnft", async (req, res) => {
  const { url, strPrice, nftaddress, titles, desc, userId,fileUrl,collection,address,assetCId,traits} = req.body;
  var data = {
    url,
    owner: address,
    strPrice,
    nftaddress,
    fileUrl,
    titles,
    userId,
    desc,
    assetCId,
    collectionz:collection,
    traits


   
    
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
  pending.findByIdAndUpdate(
    { _id: ids },
    {status:"Rejected" },
   
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
  //response.send(ids);



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

router.post("/getbyfile", async (req, res) => {
  const {fileUrl } = req.body;
  const data = {fileUrl:fileUrl};

  mint.find(data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});





router.post("/getip", async (req, res) => {
  const {ip,userId,wallet,assetCId,tokenId,viewed,bought,liked } = req.body;
  const axios = require('axios').default;



const options = {
  method: 'POST',
  url: `http://www.geoplugin.net/json.gp?ip=${ip}`,
  headers: {Accept: 'application/json'}
};

axios
  .request(options)
  .then(function (response) {
    res.send(JSON.stringify(response.data));
    let data ={
      owner:userId,
      liked,
      bought,
      wallet,
      assetCId,
      tokenId,
      viewed,
      country:response.data.geoplugin_countryName,
      city:response.data.geoplugin_city,
     
      continent:response.data.geoplugin_continentName,
      latitude:response.data.geoplugin_latitude,
      longitude:response.data.geoplugin_longitude,
    }
    location.create(data, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log('1');
      }
    });

  })
  .catch(function (error) {
    console.error(error);
  });


})
router.get("/getgeodata", async (req, res) => {

  location.find({}, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });

})

router.post("/reviews", async (req, res) => {});

module.exports = router;
