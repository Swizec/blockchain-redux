import test from "tape";

import createStore from "../src/blockchainRedux";
import Block from "../src/Block";

const store = createStore({ counter: 0 }, rootReducer);

function rootReducer(state, action) {
    switch (action.type) {
        case "inc":
            return { counter: state.counter + 1 };
        case "dec":
            return { counter: state.counter - 1 };
        default:
            return state;
    }
}

test("count to 5", t => {
    for (let i = 0; i < 5; i++) {
        store.dispatch({ type: "inc" });
    }

    t.equal(store.getState().counter, 5);
    t.end();
});

test("reject bad blocks", t => {
    const lastBlock = store.getLastBlock();

    store.addBlock(
        new Block({ previousBlock: lastBlock, data: { counter: 10 } })
    );

    // this one should be rejected, same index
    store.addBlock(
        new Block({ previousBlock: lastBlock, data: { counter: 11 } })
    );
    t.equal(store.getState().counter, 10);

    // this one should be rejected, bad previous hash
    const block1 = new Block({
        previousBlock: store.getLastBlock(),
        data: { counter: 12 }
    });
    block1.previousHash = "random";
    store.addBlock(block1);
    t.equal(store.getState().counter, 10);

    // this one should be rejected, bad hash
    const block2 = new Block({
        previousBlock: store.getLastBlock(),
        data: { counter: 13 }
    });
    block2.hash = "random";
    store.addBlock(block2);
    t.equal(store.getState().counter, 10);

    t.end();
});
