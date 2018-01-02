import * as firebase from "firebase";

export default function(config) {
    const db = firebase.initializeApp(config).database();

    return createStore => (...args) => {
        const store = createStore(...args);
        const _dispatch = store.dispatch;

        function dispatch(action) {
            _dispatch(action);

            const newBlock = store.getLastBlock();

            //db.collection("blockchain").add(newBlock);
            db.ref(`blockchain/${newBlock.index}`).set(newBlock);
        }

        // db.collection("blockchain").onSnapshot(block => {
        //     store.addBlock(block.data());
        // });

        return Object.assign(store, {
            dispatch
        });
    };
}
