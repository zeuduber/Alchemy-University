const axios = require('axios');
const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');
const readline = require('readline');


const serverUrl = 'http://localhost:1225';
const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);

const root = merkleTree.getRoot();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the name to verify: ", function(name) {
  const index = niceList.findIndex(n => n === name);
  if (index === -1) {
    console.log(`${name} were naughty this year ;( No gifts!`);
    rl.close();
    return;
  }
  const proof = merkleTree.getProof(index);
  
  if (verifyProof(proof, name, root) === true ) {
    app.post('/gift', (req, res) => {
        const body = req.body;
        res.send("You got a toy robot!");
    });
    console.log( "You got a toy robot!" );
  }

  rl.close();

});
