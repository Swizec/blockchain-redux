import test from "tape";
import * as firebase from "firebase";

import createStore from "../src/blockchainRedux";
import firebaseMiddleware from "../src/firebaseMiddleware";

const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDq_C2aVd0HKMIHjrq95sf2hiIonR9sSqs",
    databaseURL: "https://blockchain-redux-test.firebaseio.com",
    projectId: "blockchain-redux-test"
});

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

test("announce blocks on firebase", async t => {
    const store = await createStore(
        rootReducer,
        firebaseMiddleware(FirebaseApp)
    );
    const db = firebase.database();

    store.dispatch({ type: "inc" }).then(() => {
        const block = store.getLastBlock();

        db
            .ref(`/blockchain/${block.index}`)
            .once("value")
            .then(snapshot => {
                const fbBlock = snapshot.val();

                t.equal(block.hash, fbBlock.hash);

                t.end();
            });
    });
});

test("initializes from firebase blockchain", async t => {
    const store1 = await createStore(
        rootReducer,
        firebaseMiddleware(FirebaseApp)
    );

    store1.dispatch({ type: "inc" }).then(async () => {
        const store2 = await createStore(
            rootReducer,
            firebaseMiddleware(FirebaseApp)
        );

        const block1 = store1.getLastBlock(),
            block2 = store2.getLastBlock();

        t.equal(block1.hash, block2.hash);

        t.end();
    });
});

test("call subscribers after initialization", async t => {
    let called = false;

    const store1 = await createStore(
        rootReducer,
        firebaseMiddleware(FirebaseApp)
    );
    store1.subscribe(() => (called = true));

    t.ok(called);
    t.end();
});
