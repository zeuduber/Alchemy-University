const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    const x = hashMessage(message);
    return secp.recoverPublicKey(x, signature, recoveryBit);
}

module.exports = recoverKey;