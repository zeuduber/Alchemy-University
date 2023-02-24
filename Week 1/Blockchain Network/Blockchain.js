const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [ new Block() ];
    }

    addBlock(block) {
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }

    isValid() {
        for(let i = this.chain.length - 1; i > 0; i--) {
            const hash = this.chain[i];
            const hashPrev = this.chain[i-1];

            if (hash.previousHash.toString() !== hashPrev.toHash().toString()) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;