require("dotenv").config();
require("./config/database").connect();
const cors = require('cors')
const auth = require("./middleware/auth");
const express = require("express");
const mint = require('./model/minted');
const asset = require("./routes/allRoutes")
const authRoute = require('./routes/auth')
const collection = require('./routes/collection')
const nfts = require('./routes/nfts')
const invite = require('./routes/invite')


// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
//}


const app = express();
app.use(cors({ origin: true })); // enable origin cors
// app.use((req, res, next) => {
//   const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000',
//   'http://localhost:3001', 'http://127.0.0.1:3001',
//   "https://immense-spire-43596.herokuapp.comm","https://vault-service.herokuapp.com",
//   "https://immense-spire-43596.herokuapp.com"];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// })
// var whitelist = ["http://localhost:3000","http://localhost:3001","*"]
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions))


app.use(express.json());


// Register & Login

app.use('/auth',authRoute);

// Asset management
app.use("/api",asset);

//Collection management
app.use("/collection",collection);
app.use("/nfts",nfts);
app.use("/userinvite",invite)




// app.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });
  

// Logic goes here

module.exports = app;