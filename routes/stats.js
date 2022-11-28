const axios = require("axios");
const { promises } = require("nodemailer/lib/xoauth2");
const minted = require("../model/minted");
creators = require("../model/user");
require("../config/database").connect();
const router = require("express").Router();
const contractAddress = process.env.CONTRACT;
const web3ApiKey =
  "AKGGfa9EKXXIPdRLov2CnhaZ7zQGMrlumKwa9LkhfU2GOgcu8t2ctBFtxXpMtZz0";

const address = "0x47973b9B9515A816f2bB0f13F2463f6adBE1A791";

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
              console.error(error);
            });
        });
      }
    }
  );
});

router.post("/transfers1", async (req, res) => {
  const promises = [];
  const returnItem = [];
  let id = ["1", "2", "3", "4"];

  const contract = "0xAa78c4c839bB199b69b89489Fb8d80Dc3B80d839";
  // let json = JSON.stringify(id);

  for (let i = 0; i <= id.length; i++) {
    let options = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/nft/${contract}/${id[i]}/transfers?chain=mumbai&format=decimal`,
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

    res.send(result);
  });
});

router.post("/simle", async (req, res) => {
  let ids = ["2", "3", "4"];
  let myres = [];
  const contract = "0xAa78c4c839bB199b69b89489Fb8d80Dc3B80d839";
  const promises = [];
  const config = {
    headers: { accept: "application/json", "X-API-Key": web3ApiKey },
  };

  for (i = 0; i < ids.length; i++) {
    promises.push(
      axios
        .get(
          `https://deep-index.moralis.io/api/v2/nft/${contract}/${ids[i]}/transfers?chain=mumbai&format=decimal`,
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
  const ids = ["1", "2", "3", "4"];
  let requests = ids.map((id) => {
    //create a promise for each api
    return new Promise((resolve, reject) => {
      let contract = "0xAa78c4c839bB199b69b89489Fb8d80Dc3B80d839";
      let options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/nft/${contract}/${id}/transfers?chain=mumbai&format=decimal`,
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
    .catch((err) => console.log(err));
});

router.post("/geoviews", async (req, res) => {
  const {owner} = req.body
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
  const {owner} = req.body
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
  const {owner} = req.body
 
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



router.post("/actual", async (req, res) => {
  axios
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${" -1.25909"}+${"36.7858"}&key=d437203532ad46199d7bde410b37689b`
    )
    .then((response) => {
      myres.push(response.data?.results[0]?.components.country);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
