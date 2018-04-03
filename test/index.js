import test from "tape";

import createStore from "../src/blockchainRedux";
import Block from "../src/Block";

function rootReducer(state = { counter: 0 }, action) {
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
    const store = createStore(rootReducer);

    for (let i = 0; i < 5; i++) {
        store.dispatch({ type: "inc" });
    }

    t.equal(store.getState().counter, 5);
    t.end();
});

test("reject bad blocks", t => {
    const store = createStore(rootReducer);

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

test("replaceChain replaces blockchain", t => {
    const store1 = createStore(rootReducer);
    const store2 = createStore(rootReducer);

    for (let i = 0; i < 5; i++) {
        store1.dispatch({ type: "inc" });
    }

    for (let i = 0; i < 10; i++) {
        store2.dispatch({ type: "inc" });
    }

    store1.replaceChain(store2.getWholeChain());

    t.equal(store1.getState().counter, store2.getState().counter);
    t.end();
});

test("subscribe to changes", t => {
    const store = createStore(rootReducer);

    let called = false;

    store.subscribe(() => (called = true));
    store.dispatch({ type: "inc" });

    t.ok(called);
    t.end();
});

test("unsubscribe from changes", t => {
    const store = createStore(rootReducer);

    let called = 0;

    const unsub = store.subscribe(() => (called += 1));

    store.dispatch({ type: "inc" });
    unsub();
    store.dispatch({ type: "inc" });

    t.equal(called, 1);
    t.end();
});

test("can add middleware", t => {
    let called = false;
    function middleware() {
        return createStore => (...args) => {
            const store = createStore(...args);

            return Object.assign(store, {
                addedFunc: () => {
                    called = true;
                }
            });
        };
    }

    const store = createStore(rootReducer, middleware());

    store.addedFunc({});

    t.ok(called);
    t.end();
});
