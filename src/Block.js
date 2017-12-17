import CryptoJS from "crypto-js";

class Block {
    constructor({ previousBlock, data }) {
        this.index = previousBlock.index + 1;
        this.previousHash = previousBlock.hash.toString();
        this.timestamp = new Date().getTime() / 1000;
        this.data = data;

        this.hash = this.calculateHash();
    }

    set data(data) {
        this._data = JSON.stringify(data);
    }

    get data() {
        return JSON.parse(this._data);
    }

    calculateHash() {
        return CryptoJS.SHA256(
            this.index + this.previousHash + this.timestamp + this._data
        ).toString();
    }
}

export default Block;
