import test from "tape";

import createStore from "../src/blockchainRedux";

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
