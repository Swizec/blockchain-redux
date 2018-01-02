import test from "tape";
import * as firebase from "firebase";

import createStore from "../src/blockchainRedux";
import firebaseMiddleware from "../src/firebaseMiddleware";

const CONFIG = {
    apiKey: "AIzaSyDq_C2aVd0HKMIHjrq95sf2hiIonR9sSqs",
    databaseURL: "https://blockchain-redux-test.firebaseio.com",
    projectId: "blockchain-redux-test"
};

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

test("announce blocks on firebase", t => {
    const store = createStore(rootReducer, firebaseMiddleware(CONFIG));
    const db = firebase.database();

    store.dispatch({ type: "inc" });

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

// test("initializes from firebase blockchain", t => {
//     const store1 = createStore(rootReducer, firebaseMiddleware(CONFIG));
//     store1.dispatch({ type: "inc" });

//     t.end();
// });
