const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null); 
        //This will be an instance of TrieNode that contains a null key. 
        //The null key will indicate that this is the top parent in the list.

    }

    insert(msg) {
        let node = this.root;
        
        for(let i = 0; i < msg.length; i++) {
            if (!node.children[msg[i]]) {
                node.children[msg[i]] = new TrieNode(msg[i]);
            }

            node = node.children[msg[i]];

            if (i == msg.length - 1) {
                node.isWord = true;
            }
        }
    }

    contains(msg) {
        let node = this.root;

        for(let i = 0; i<msg.length; i++) {
            if (node.children[msg[i]]) {
                node = node.children[msg[i]];
            } else {
                return false;
            }
        }

        return node.isWord;
    }

}

module.exports = Trie;