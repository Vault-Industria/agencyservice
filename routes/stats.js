const axios = require("axios");
const ethers = require("ethers");
const { promises } = require("nodemailer/lib/xoauth2");
const minted = require("../model/minted");
const creators = require("../model/user");
const coos = require("../model/user");
require("../config/database").connect();
const router = require("express").Router();
const contractAddress = process.env.CONTRACT;
const web3ApiKey =MORALIS_API_KEY;




router.post("/topcreators", async (req, res) => {
  creators.find(
    { $and: [{ role: "1" }, { wallet: { $ne: null } }] },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        // res.send(result)

        result.forEach((element) => {
          let options = {
            method: "GET",
            url: `https://deep-index.moralis.io/api/v2/${element.wallet}/nft/transfers?chain=mumbai&format=decimal&direction=both`,
            headers: { accept: "application/json", "X-API-Key": web3ApiKey },
          };

          axios
            .request(options)
            .then(function (response) {
              res.send(response.data);
            })
            .catch(function (error) {
              res.send(error);
            });
        });
      }
    }
  );
});

router.post("/transfers1", async (req, res) => {
  const {owner} = req.body
  const promises = [];
  const returnItem = [];
  let id = [];
  const tops = [];
  const creators = [];
  const wallets = [];

  minted.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      result.forEach((element) => {
        id.push(element.assetCId);
      });
  

      for (let i = 0; i <= id.length; i++) {
        let options = {
          method: "GET",
          url: `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${id[i]}/transfers?chain=mumbai&format=decimal`,
          headers: { accept: "application/json", "X-API-Key": web3ApiKey },
        };

        promises.push(
          axios
            .request(options)
            .then(function (response) {
              returnItem.push(response.data);
            })

            .catch(function (error) {})
        );
      }
      Promise.all(promises).then(() => {
        let filtered = returnItem.filter((item) => item.total === 3);
        let result = filtered
          .map((item) => item.result)
          .flat()
          .filter((arr) => arr.value !== "0");

        result.forEach((item) => {
          tops.push({
            wallet: item.to_address,
            value: ethers.utils.formatEther(item.value),
          });
          wallets.push(item.to_address);
        });
        let query = coos.find({ wallet: { $in: wallets } });
        query.exec(function (err, result) {
          if (err) {
            res.send(err);
          }

          const combinedArray = tops.map(function (item) {
            let newItem = Object.assign({}, item);
            let match = result.find(function (item2) {
              return item2.wallet === item.wallet;
            });
            return Object.assign(newItem, match);
          });
          const toSend = [];

          combinedArray.forEach((item) => {
            toSend.push({
              wallet: item.wallet,
              value: item.value,
              username: item._doc.user_name,
              fname: item._doc.first_name,
              lname: item._doc.last_name,
              company: item._doc.company,
            });
          });

          res.send(toSend);
        });
      });
    }
  });
});

router.post("/simle", async (req, res) => {
  let ids = [];
  let myres = [];
  
  const promises = [];
  const config = {
    headers: { accept: "application/json", "X-API-Key": web3ApiKey },
  };

  for (i = 0; i < ids.length; i++) {
    promises.push(
      axios
        .get(
          `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${ids[i]}/transfers?chain=mumbai&format=decimal`,
          config
        )
        .then((response) => {
          myres.push(response);
        })
    );
  }

  Promise.all(promises).then(() => console.log(myres));
});

router.post("/puli", async (req, res) => {
  const toReturn = [];
  const ids = [];
  let requests = ids.map((id) => {
    //create a promise for each api
    return new Promise((resolve, reject) => {
      
      let options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${id}/transfers?chain=mumbai&format=decimal`,
        headers: { accept: "application/json", "X-API-Key": web3ApiKey },
      };

      axios.request(options, (err, res, body) => {
        if (err) {
          reject(err);
        }
        //call the resolve function
        resolve(body);
      });
    });
  });

  Promise.all(requests)
    .then((body) => {
      //this gets called when all the promises have resolved/rejected.
      body
        .forEach((res) => {
          if (res) toReturn.push(JSON.parse(res).data);
        })
        .then(() => {
          res.send(toReturn);
        });
    })
    .catch((err) => res.send(err));
});

router.post("/geoviews", async (req, res) => {
  const { owner } = req.body;
  const promises = [];
  let myres = [];
  minted.find({ owner: owner }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let coordinates = result
        .map((item) => item.views)
        .flat()
        .filter((item) => item !== null);

      coordinates.map((item) => {
        promises.push(
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${item.latitude}+${item.longitude}&key=d437203532ad46199d7bde410b37689b`
            )
            .then((response) => {
              myres.push(response.data?.results[0]?.components.country);
            })
        );
      });

      Promise.all(promises).then(() => {
        const count = {};

        for (const element of myres) {
          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }
        let darray = Object.entries(count);
        res.send(darray);
      });
    }
  });
});

router.post("/geosales", async (req, res) => {
  const { owner } = req.body;
  const promises = [];
  let myres = [];
  minted.find({ owner: owner }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let coordinates = result
        .map((item) => item.sales)
        .flat()
        .filter((item) => item !== null);

      coordinates.map((item) => {
        promises.push(
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${item.latitude}+${item.longitude}&key=d437203532ad46199d7bde410b37689b`
            )
            .then((response) => {
              myres.push(response.data?.results[0]?.components.country);
            })
        );
      });

      Promise.all(promises).then(() => {
        const count = {};

        for (const element of myres) {
          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }
        let darray = Object.entries(count);
        res.send(darray);
      });
    }
  });
});

router.post("/geolikes", async (req, res) => {
  const { owner } = req.body;

  const promises = [];
  let myres = [];
  minted.find({ owner: owner }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let coordinates = result
        .map((item) => item.likes)
        .flat()
        .filter((item) => item !== null);

      coordinates.map((item) => {
        promises.push(
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${item.latitude}+${item.longitude}&key=d437203532ad46199d7bde410b37689b`
            )
            .then((response) => {
              myres.push(response.data?.results[0]?.components.country);
            })
        );
      });

      Promise.all(promises).then(() => {
        const count = {};

        for (const element of myres) {
          if (count[element]) {
            count[element] += 1;
          } else {
            count[element] = 1;
          }
        }
        let darray = Object.entries(count);
        res.send(darray);
      });
    }
  });
});

router.post("/agencyassets", async (req, res) => {
  const {id} = req.body
  coos.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //res.send(result[0].mycreators)
      let query = coos.find({ _id: { $in: result[0]?.mycreators } });
      query.exec(function (err, result) {
        if (err) {
          res.send(err);
        } else {
          const creatorWallets = [];
          result.forEach((element) => {
            creatorWallets.push(element.wallet);
          });

          let query0 = minted.find({ owner: { $in: creatorWallets } });
          query0.exec(function (err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        }
      });
    }
  });
});

router.post("/detailedtrans", async (req, res) => {
  const { owner } = req.body;
  const from_address = "0xbde2516b5740000f073923a7fdbe7cb43a0e390e";

  const options = {
    method: "GET",

    url: `https://deep-index.moralis.io/api/v2/${owner}/nft/transfers?chain=mumbai&format=decimal&direction=both`,
    headers: { accept: "application/json", "X-API-Key": web3ApiKey },
  };

  axios
    .request(options)
    .then(function (response) {
      let filt = response.data?.result;
      let filtered = filt.filter((item) => item.from_address === from_address);
      res.send(filtered);
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.post("/creatorvalue", async (req, res) => {
  const {owner} = req.body

  minted
    .find({ owner: owner })
    .where("sold")
    .equals(true)
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        let sum = result.reduce(function (sum, obj) {
          return sum + Number(obj.strPrice);
        }, 0);
        res.send(`${sum}`);
      }
    });
});

router.post("/agencyvalue", async (req, res) => {
  const {id} = req.body
  coos.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //res.send(result[0].mycreators)
      let query = coos.find({ _id: { $in: result[0]?.mycreators } });
      query.exec(function (err, result) {
        if (err) {
          res.send(err);
        } else {
          const creatorWallets = [];
          result.forEach((element) => {
            creatorWallets.push(element.wallet);
          });

          let query0 = minted.find({ owner: { $in: creatorWallets } });
          query0.exec(function (err, result) {
            if (err) {
              res.send(err);
            } else {
              let sum = result.reduce(function (sum, obj) {
                return sum + Number(obj.strPrice);
              }, 0);
              res.send(`${sum}`);
            }
          });
        }
      });
    }
  });
});

router.post("/totalvalue", async (req, res) => {
  coos.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //res.send(result[0].mycreators)
      let query = coos.find({ _id: { $in: result[0]?.mycreators } });
      query.exec(function (err, result) {
        if (err) {
          res.send(err);
        } else {
          const creatorWallets = [];
          result.forEach((element) => {
            creatorWallets.push(element.wallet);
          });

          let query0 = minted.find({ owner: { $in: creatorWallets } });
          query0.exec(function (err, result) {
            if (err) {
              res.send(err);
            } else {
              let sum = result.reduce(function (sum, obj) {
                return sum + Number(obj.strPrice);
              }, 0);
              res.send(`${sum}`);
            }
          });
        }
      });
    }
  });
});

router.post("/mycreators", async (req, res) => {
  const {id} = req.body
  coos.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //res.send(result[0].mycreators)
      let query = coos.find({ _id: { $in: result[0]?.mycreators } });
      query.exec(function (err, result) {
        if (err) {
          res.send(err);
        } else {
          let creators = result.length;
          res.send(`${creators}`);
        }
      });
    }
  });
});

router.post("/mycreatorviews", async (req, res) => {
  const {id} = req.body
  coos.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //res.send(result[0].mycreators)
      let query = coos.find({ _id: { $in: result[0]?.mycreators } });
      query.exec(function (err, result) {
        if (err) {
          res.send(err);
        } else {
          const creatorWallets = [];
          result.forEach((element) => {
            creatorWallets.push(element.wallet);
          });

          let query0 = minted.find({ owner: { $in: creatorWallets } });
          query0.exec(function (err, result) {
            if (err) {
              res.send(err);
            } else {
              let sum = result.reduce(function (sum, obj) {
                return sum + obj.views.length;
              }, 0);
              res.send(`${sum}`);
            }
          });
        }
      });
    }
  });
});

router.post("/mycreatorlikes", async (req, res) => {
  const {id} = req.body
  coos.find({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      //res.send(result[0].mycreators)
      let query = coos.find({ _id: { $in: result[0]?.mycreators } });
      query.exec(function (err, result) {
        if (err) {
          res.send(err);
        } else {
          const creatorWallets = [];
          result.forEach((element) => {
            creatorWallets.push(element.wallet);
          });

          let query0 = minted.find({ owner: { $in: creatorWallets } });
          query0.exec(function (err, result) {
            if (err) {
              res.send(err);
            } else {
              let sum = result.reduce(function (sum, obj) {
                return sum + obj.likes.length;
              }, 0);
              res.send(`${sum}`);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
