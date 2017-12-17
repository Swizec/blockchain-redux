import Block from "./Block";

function createStore(initialState, reducer) {
    let blockchain = [
        new Block({
            previousBlock: {
                index: 0,
                hash: "0",
                timestamp: new Date().getTime()
            },
            data: "genesis block!"
        })
    ];

    function getLastBlock() {
        return blockchain[blockchain.length - 1];
    }

    function dispatch(action) {
        const lastBlock = getLastBlock();
        const nextData = reducer(lastBlock.data, action);

        blockchain.push(new Block({ previousBlock: lastBlock, data: data }));
    }

    return {
        getState: () => getLastBlock().data,
        dispatch: dispatch
    };
}

export default createStore();
