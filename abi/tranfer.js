const axios = require('axios').default;



const options = {
  method: 'POST',
  url: 'http://www.geoplugin.net/json.gp?ip=197.217.207.207',
  headers: {Accept: 'application/json'}
};

axios
  .request(options)
  .then(function (response) {
   
  })
  .catch(function (error) {
    console.error(error);
  });




// const axios = require('axios').default;

// const options = {
//   method: 'POST',
//   url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
//   headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
//   data: {
//     id: 1,
//     jsonrpc: '2.0',
//     method: 'alchemy_getAssetTransfers',
//     params: [
//       {
//         fromBlock: '0x0',
//         toBlock: 'latest',
//         category: ['external', 'erc20', 'erc1155'],
//         withMetadata: false,
//         excludeZeroValue: true,
//         maxCount: '0x3e8',
//         contractAddresses: ['0x4b60c4c241100e2ddb0e4af034174e0441a084af',]
//       }
//     ]
//   }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data.result, null, 4));
//   })
//   .catch(function (error) {
//     console.error(error);
//   });




// const axios = require('axios').default;

// const options = {
//   method: 'POST',
//   url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
//   headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
//   data: {
//     id: 1,
//     jsonrpc: '2.0',
//     method: 'alchemy_getAssetTransfers',
//     params: [
//       {
//         fromBlock: '0x0',
//         toBlock: 'latest',
//         category: ['external', 'erc20'],
//         withMetadata: false,
//         excludeZeroValue: true,
//         maxCount: '0x3e8',
//         toAddress: '0xa18c87b9C4558C3e21481CB76eFaa4d491440778'
//       }
//     ]
//   }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data.result, null, 4));
//   })
//   .catch(function (error) {
//     console.error(error);
//   });


// const axios = require('axios').default;

// const options = {
//   method: 'POST',
//   url: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
//   headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
//   data: {
//     id: 1,
//     jsonrpc: '2.0',
//     method: 'alchemy_getAssetTransfers',
//     params: [
//       {
//         fromBlock: '0x0',
//         toBlock: 'latest',
//         category: ['external', 'erc721'],
//         withMetadata: false,
//         excludeZeroValue: true,
//         maxCount: '0x3e8',
//         fromAddress: '0xa18c87b9C4558C3e21481CB76eFaa4d491440778'
//       }
//     ]
//   }
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data.result, null, 4));
//   })
//   .catch(function (error) {
//     console.error(error);
//   });