import CryptoJS from "crypto-js";

class Block {
    constructor({ previousBlock, data }) {
        this.index = previousBlock.index + 1;
        this.previousHash = previousBlock.hash.toString();
        this.timestamp = new Date().getTime() / 1000;
        this.data = data;

        this.hash = Block.calculateHash(this);
    }

    set data(data) {
        this._data = JSON.stringify(data);
    }

    get data() {
        return typeof this._data !== "undefined"
            ? JSON.parse(this._data)
            : undefined;
    }

    // this is where a Proof-of-Work or Proof-of-Stake algo comes in, I think
    static calculateHash(block) {
        return CryptoJS.SHA256(
            block.index + block.previousHash + block.timestamp + block._data
        ).toString();
    }
}

export default Block;
