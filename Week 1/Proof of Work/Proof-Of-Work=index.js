const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];


function addTransaction(transaction) {
    const output = mempool.push(transaction);
}

function mine() {
    let transactions = [];

    //1: pull transactions from the mempool, remove transaction from mempool
    while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        transactions.push(mempool.pop());
    }

    const block = { id: blocks.length, transactions }
    block.nonce = 0;

    let hash;

    while (true) {
        hash = SHA256(JSON.stringify(block)).toString();

        if (TARGET_DIFFICULTY > BigInt(`0x${hash}`)) {
            
            break;
        }
        block.nonce++;
    }

    blocks.push({ ...block, hash });

    
    
    
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};