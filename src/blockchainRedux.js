import Block from "./Block";
import { create } from "domain";

function createStore(reducer, preloadedState, enhancer) {
    if (
        typeof preloadedState === "function" &&
        typeof enhancer === "undefined"
    ) {
        enhancer = preloadedState;
        preloadedState = undefined;
    }

    if (typeof enhancer === "function") {
        return enhancer(createStore)(reducer, preloadedState);
    }

    let blockchain = [
        new Block({
            previousBlock: {
                index: 0,
                hash: "0",
                data: {},
                timestamp: new Date().getTime()
            },
            data: preloadedState
        })
    ];
    let listeners = [];

    function getLastBlock() {
        return blockchain[blockchain.length - 1];
    }

    function dispatch(action) {
        const lastBlock = getLastBlock();
        const nextData = reducer(lastBlock.data, action);

        addBlock(new Block({ previousBlock: lastBlock, data: nextData }));

        listeners.forEach(listener => listener());
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            listeners.splice(listeners.indexOf(listener), 1);
        };
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

    function isValidChain(blockchain) {
        for (let i = 0; i < blockchain.length - 1; i++) {
            if (!isValidNewBlock(blockchain[i + 1], blockchain[i])) {
                return false;
            }
        }
        return true;
    }

    function replaceChain(newBlocks) {
        if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
            blockchain = newBlocks;
        }
    }

    dispatch({ type: "INIT" });

    return {
        getState: () => getLastBlock().data,
        getLastBlock: getLastBlock,
        dispatch: dispatch,
        subscribe: subscribe,

        addBlock: addBlock,
        replaceChain: replaceChain, // primarily used when starting up to take latest available blockchain
        _blockchain: blockchain
    };
}

export default createStore;
