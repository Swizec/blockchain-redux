export default function(firebaseApp) {
    const db = firebaseApp.database();

    return createStore => (...args) => {
        const store = createStore(...args);
        const _dispatch = store.dispatch;

        function dispatch(action) {
            _dispatch(action);

            const newBlock = store.getLastBlock();
            return saveBlock(newBlock);
        }

        function saveBlock(block) {
            block._data = block._data || {};

            return db
                .ref(`blockchain/${block.index}`)
                .once("value")
                .then(snapshot => {
                    if (!snapshot.exists()) {
                        db.ref(`blockchain/${block.index}`).set(block);
                        return true;
                    } else {
                        // collision resolution?
                        return false;
                    }
                });
        }

        function listenForNextBlock() {
            const nextIndex = store.getLastBlock().index + 1;

            console.log("Listening for", nextIndex);

            db
                .ref(`blockchain/${block.index}`)
                .once("value")
                .then(snapshot => {
                    console.log("Received block from outside");

                    // TODO: potential conflict with local last block
                    store.addBlock(snapshot.val());
                    listenForNextBlock();
                });
        }

        function initFromFirebase() {
            return db
                .ref("blockchain")
                .orderByKey()
                .once("value")
                .then(snapshot => snapshot.val())
                .then(blockchain => {
                    blockchain = Object.values(blockchain).map(block => {
                        block.data = block._data ? JSON.parse(block._data) : {};
                        return block;
                    });

                    console.debug("Got blockchain", blockchain.length);

                    store.replaceChain(blockchain);

                    listenForNextBlock();

                    return Object.assign(store, {
                        dispatch
                    });
                });
        }

        return Promise.all(store.getWholeChain().map(saveBlock)).then(
            initFromFirebase
        );
    };
}
