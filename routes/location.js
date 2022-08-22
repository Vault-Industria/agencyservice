require("../config/database").connect();
const router = require("express").Router();
const location = require("../model/location");


router.get("/getgeodata", async (req, res) => {

    location.find({}, function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });

})

module.exports = router;