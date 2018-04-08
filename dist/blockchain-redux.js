function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var CryptoJS = _interopDefault(require('crypto-js'));

var Block = function Block(ref) {
    var previousBlock = ref.previousBlock;
    var data = ref.data;

    this.index = previousBlock.index + 1;
    this.previousHash = previousBlock.hash.toString();
    this.timestamp = new Date().getTime() / 1000;
    this.data = data;
    this.hash = Block.calculateHash(this);
};

var prototypeAccessors = { data: { configurable: true } };
prototypeAccessors.data.set = function (data) {
    this._data = JSON.stringify(data);
};
prototypeAccessors.data.get = function () {
    return typeof this._data !== "undefined" ? JSON.parse(this._data) : undefined;
};
Block.calculateHash = function calculateHash (block) {
    return CryptoJS.SHA256(block.index + block.previousHash + block.timestamp + block._data).toString();
};

Object.defineProperties( Block.prototype, prototypeAccessors );

function createStore(reducer, preloadedState, enhancer) {
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    if (typeof enhancer === "function") {
        return enhancer(createStore)(reducer, preloadedState);
    }
    var blockchain = [new Block({
        previousBlock: {
            index: 0,
            hash: "0",
            data: {},
            timestamp: new Date().getTime()
        },
        data: preloadedState
    })];
    var listeners = [];
    function notifyListeners() {
        listeners.forEach(function (listener) { return listener(); });
    }
    
    function getLastBlock() {
        return blockchain[blockchain.length - 1];
    }
    
    function dispatch(action) {
        var lastBlock = getLastBlock();
        var nextData = reducer(lastBlock.data, action);
        addBlock(new Block({
            previousBlock: lastBlock,
            data: nextData
        }));
        notifyListeners();
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
            console.log("invalid hash: ", Block.calculateHash(newBlock), newBlock.hash);
            return false;
        }
        return true;
    }
    
    function isValidChain(blockchain) {
        for (var i = 0;i < blockchain.length - 1; i++) {
            if (!isValidNewBlock(blockchain[i + 1], blockchain[i])) {
                return false;
            }
        }
        return true;
    }
    
    function replaceChain(newBlocks) {
        if (isValidChain(newBlocks) && newBlocks.length > blockchain.length) {
            console.debug("Replacing old chain with new");
            blockchain = newBlocks;
        }
        notifyListeners();
    }
    
    dispatch({
        type: "INIT"
    });
    return {
        getState: function () { return getLastBlock().data; },
        getLastBlock: getLastBlock,
        dispatch: dispatch,
        subscribe: subscribe,
        addBlock: addBlock,
        replaceChain: replaceChain,
        getWholeChain: function () { return blockchain; }
    };
}

function firebaseMiddleware (firebaseApp) {
    var db = firebaseApp.database();
    return function (createStore) { return function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var store = createStore.apply(void 0, args);
        var _dispatch = store.dispatch;
        function dispatch(action) {
            _dispatch(action);
            var newBlock = store.getLastBlock();
            return saveBlock(newBlock);
        }
        
        function saveBlock(block) {
            block._data = block._data || {};
            return db.ref(("blockchain/" + (block.index))).once("value").then(function (snapshot) {
                if (!snapshot.exists()) {
                    db.ref(("blockchain/" + (block.index))).set(block);
                    return true;
                } else {
                    return false;
                }
            });
        }
        
        function listenForNextBlock() {
            var nextIndex = store.getLastBlock().index + 1;
            var valueHandler = function (snapshot) {
                if (snapshot.exists()) {
                    var block = snapshot.val();
                    block.data = block._data ? JSON.parse(block._data) : {};
                    console.log("Received block from outside", block);
                    store.addBlock(block);
                    db.ref(("blockchain/" + nextIndex)).off("value", valueHandler);
                    listenForNextBlock();
                }
            };
            db.ref(("blockchain/" + nextIndex)).on("value", valueHandler);
            console.log("Listening for", nextIndex);
        }
        
        function initFromFirebase() {
            return db.ref("blockchain").orderByKey().once("value").then(function (snapshot) { return snapshot.val(); }).then(function (blockchain) {
                blockchain = Object.values(blockchain).map(function (block) {
                    block.data = block._data ? JSON.parse(block._data) : {};
                    return block;
                });
                console.debug("Got blockchain", blockchain.length);
                store.replaceChain(blockchain);
                listenForNextBlock();
                return Object.assign(store, {
                    dispatch: dispatch
                });
            });
        }
        
        return Promise.all(store.getWholeChain().map(saveBlock)).then(initFromFirebase);
    }; };
}

exports.createStore = createStore;
exports.firebaseMiddleware = firebaseMiddleware;
//# sourceMappingURL=blockchain-redux.js.map
