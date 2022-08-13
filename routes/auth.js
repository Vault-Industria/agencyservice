const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express');
const User = require('../model/user');

const router = express.Router();

router.post("/register", async (req, res) => {
  const {user_name,email,phone,role,website,password,bio } = req.body;
  
  if (!(email && password && user_name)) {
    return res.status(400).send("All input is required");
  };

  const oldUser = await User.findOne({ email });
  
  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  };
  encryptedPassword = await bcrypt.hash(password, 10);


  var data = {
    user_name,
    email:email.toLowerCase(),
    password:encryptedPassword,
    phone,
    role,
    website,
    bio,
  };
  

  User.create(data, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/getusers", async (req, res) => {
    
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});





  router.post("/getuser", async (req, res) => {

  const {userInfo } = req.body;
  User.find({_id:userInfo }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
  
});

  router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id,
             email,user
             },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      else{
        res.status(400).send("Invalid Credentials");
      }
    
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  

// Update Wallet
// router.put("/updatewallet", async (req, res) => {
//   const { id,wallet } = req.body;
//   const query = {user_id:id}
//   const data = { wallet: wallet };
// //   const resuk = {query,data}
// // res.status(200).send(resuk)

//   mint.updateOne({email:email},{$set:{wallet:wallet}}, (err, result) => {
//     if (err) {
//       res.send('this is an error',err);
//     } else {
//       res.send(result);
//     }
//   });
// });

;

router.post("/addwallet", async (req, res) => {
  const { user_id,wallets } = req.body;
  const filter = { _id:user_id };
  const update = {wallet:wallets}

 let doc = await User.findOneAndUpdate(filter,update);
 res.send(doc)
});




  module.exports=router;