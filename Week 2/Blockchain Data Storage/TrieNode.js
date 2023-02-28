class TrieNode {
    constructor(key) {
        this.key = key; //will be passed to the node, it is the letter stored as a string
        this.children = {}; //an object, containing the children elements, by default set empty object
        this.isWord = false; //a boolean, whether or not the node finishes a word, set it to false by default.
    }
}

module.exports = TrieNode;