import fetch from "node-fetch";

async function getMMEE(){ 
  let file="https://vaultindustria.infura-ipfs.io/ipfs/QmTo9zBWhk4CknEfDhyEaz7zajdo1e1VUbRu2YgcggaY41";
  var req = await fetch(file, {method:'HEAD'});
  console.log(req.headers.get('content-type'));
  }
  getMMEE()
  