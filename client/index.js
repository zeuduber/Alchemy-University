const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');
// some problem with verifyProof

const serverUrl = 'http://localhost:1225';

async function main() {
  // // TODO: how do we prove to the server we're on the nice list? 
  // const merkleTree = new MerkleTree(niceList); //creating a merkle tree for the list

  // const name = 'you'; // a name that client should input

  // const root = merkleTree.getRoot();

  // //finding the proof that name is on the list
  // const index = niceList.findIndex(n => n === name);
  // const proof = merkleTree.getProof(index);
  // // verify proof against the Merkle root (not sure what that means)
  // // now not the console.log, but give gift function 



  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    // no idea wtf that means
    // if( verifyProof(proof, name, root) === true) {
    //   //give that gift shit
    // }

  });

  console.log({ gift });
}

main();