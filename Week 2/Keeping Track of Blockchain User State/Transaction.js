class Transaction {
    constructor(inputUTXOs, outputUTXOs, fee) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        
    }
    execute() {
        const anySpent = this.inputUTXOs.some((x) => x.spent);
        if (anySpent) {
            throw new Error("Cannot include a spent UTXO");
        }

        const inputAmount = this.inputUTXOs.reduce((p, c) => {
            return p + c.amount;
        }, 0);

        const outputAmount = this.outputUTXOs.reduce((k, w) => {
            return k + w.amount;
        }, 0);

        if (inputAmount < outputAmount) {
            throw new Error("Not enough bitcoin to spend :(");
        }

        const final = this.inputUTXOs.forEach(element => {
            element.spent = true;
        });

        this.fee = (inputAmount - outputAmount);

        
    }
}

module.exports = Transaction;