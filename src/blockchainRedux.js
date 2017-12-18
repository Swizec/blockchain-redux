import Block from "./Block";

function createStore(initialState, reducer) {
    let blockchain = [
        new Block({
            previousBlock: {
                index: 0,
                hash: "0",
                timestamp: new Date().getTime()
            },
            data: initialState
        })
    ];

    function getLastBlock() {
        return blockchain[blockchain.length - 1];
    }

    function dispatch(action) {
        const lastBlock = getLastBlock();
        const nextData = reducer(lastBlock.data, action);

        addBlock(new Block({ previousBlock: lastBlock, data: nextData }));
    }

    function addBlock(newBlock) {
        if (isValidNewBlock(newBlock, getLastBlock())) {
            blockchain.push(newBlock);
        }
    }

    function isValidNewBlock(newBlock, previousBlock) {
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log("invalid index");
            return false;
        } else if (previousBlock.hash !== newBlock.previousHash) {
            console.log("invalid previoushash");
            return false;
        } else if (Block.calculateHash(newBlock) !== newBlock.hash) {
            console.log(
                "invalid hash: ",
                Block.calculateHash(newBlock),
                newBlock.hash
            );
            return false;
        }
        return true;
    }

    return {
        getState: () => getLastBlock().data,
        dispatch: dispatch,
        isValidNewBlock: isValidNewBlock
    };
}

export default createStore;
