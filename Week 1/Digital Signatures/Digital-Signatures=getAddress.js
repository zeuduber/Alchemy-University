const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    console.log(publicKey);
    let x = publicKey.slice(1);
    let y = publicKey.slice(-20);
    console.log(x);
    console.log(y);

    return keccak256(x).slice(-20);
}

module.exports = getAddress;