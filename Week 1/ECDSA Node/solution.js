
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { sha256 } = require("ethereum-cryptography/sha256");

const privateKey = toHex(secp.utils.randomPrivateKey());
const publicKey = toHex(secp.getPublicKey(privateKey));
const address = publicKey.slice(-40);
const sender = address;
const recipient = "recipient address";
const amount = 10;



var hash = sha256(utf8ToBytes(sender + recipient + amount));
const signature = secp.signSync(hash, privateKey, { recovered: true });



let tx  = {
    sender : sender,
    recipient : recipient,
    amount : amount,
    hash :  hash,
    signature : signature
}
let publicKeyRetrieved = secp.recoverPublicKey(tx.hash, tx.signature[0], tx.signature[1]);
let addressRecovered =  toHex(publicKeyRetrieved).slice(-40);
let txIsValid = tx.sender  === addressRecovered;



if(!txIsValid){  
    console.log("Tx Reverted");
}

console.log("Transaction committed");
