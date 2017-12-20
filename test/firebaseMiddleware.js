import test from "tape";

import createStore from "../src/blockchainRedux";
import firebaseMiddleware from "../src/firebaseMiddleware";

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
    const store = createStore(
        rootReducer,
        firebaseMiddleware({
            apiKey: "AIzaSyDq_C2aVd0HKMIHjrq95sf2hiIonR9sSqs",
            databaseURL: "https://blockchain-redux-test.firebaseio.com",
            projectId: "blockchain-redux-test"
        })
    );

    store.dispatch({ type: "inc" });

    t.end();
});
