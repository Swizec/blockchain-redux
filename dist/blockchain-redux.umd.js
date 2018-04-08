(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('crypto-js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'crypto-js'], factory) :
	(factory((global.blockchainRedux = {}),global.CryptoJS));
}(this, (function (exports,CryptoJS) {

CryptoJS = CryptoJS && CryptoJS.hasOwnProperty('default') ? CryptoJS['default'] : CryptoJS;

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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJsb2NrLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWM7QUFFckIsTUFBTSxNQUFNO0lBQ1IsWUFBWSxDQUFFLGVBQWUsT0FBUTtRQUNqQyxJQUFBLENBQUssS0FBTCxDQUFBLENBQUEsQ0FBYSxhQUFBLENBQWMsS0FBZCxDQUFBLENBQUEsQ0FBc0I7UUFDbkMsSUFBQSxDQUFLLFlBQUwsQ0FBQSxDQUFBLENBQW9CLGFBQUEsQ0FBYyxJQUFkLENBQW1CLFFBQW5CO1FBQ3BCLElBQUEsQ0FBSyxTQUFMLENBQUEsQ0FBQSxDQUFpQixJQUFJLElBQUosRUFBQSxDQUFXLE9BQVgsRUFBQSxDQUFBLENBQUEsQ0FBdUI7UUFDeEMsSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVk7UUFFWixJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxLQUFBLENBQU0sYUFBTixDQUFvQjtJQUN4QztJQUVJLEdBQUEsQ0FBSSxLQUFLLE1BQU07UUFDWCxJQUFBLENBQUssS0FBTCxDQUFBLENBQUEsQ0FBYSxJQUFBLENBQUssU0FBTCxDQUFlO0lBQ3BDO0lBRUksR0FBQSxDQUFJLE9BQU87UUFDUCxPQUFPLE1BQUEsQ0FBTyxJQUFBLENBQUssS0FBWixDQUFBLEdBQUEsQ0FBc0IsV0FBdEIsR0FDRCxJQUFBLENBQUssS0FBTCxDQUFXLElBQUEsQ0FBSyxTQUNoQjtJQUNkO0lBR0ksT0FBTyxjQUFjLE9BQU87UUFDeEIsT0FBTyxRQUFBLENBQVMsTUFBVCxDQUNILEtBQUEsQ0FBTSxLQUFOLENBQUEsQ0FBQSxDQUFjLEtBQUEsQ0FBTSxZQUFwQixDQUFBLENBQUEsQ0FBbUMsS0FBQSxDQUFNLFNBQXpDLENBQUEsQ0FBQSxDQUFxRCxLQUFBLENBQU0sTUFEeEQsQ0FFTCxRQUZLO0lBR2Y7QUFDQTtBQUVBLGVBQWU7QUE5QmYiLCJmaWxlIjoiQmxvY2suanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENyeXB0b0pTIGZyb20gXCJjcnlwdG8tanNcIjtcblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKHsgcHJldmlvdXNCbG9jaywgZGF0YSB9KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBwcmV2aW91c0Jsb2NrLmluZGV4ICsgMTtcbiAgICAgICAgdGhpcy5wcmV2aW91c0hhc2ggPSBwcmV2aW91c0Jsb2NrLmhhc2gudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5oYXNoID0gQmxvY2suY2FsY3VsYXRlSGFzaCh0aGlzKTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YShkYXRhKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICBnZXQgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9kYXRhICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICA/IEpTT04ucGFyc2UodGhpcy5fZGF0YSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIHRoaXMgaXMgd2hlcmUgYSBQcm9vZi1vZi1Xb3JrIG9yIFByb29mLW9mLVN0YWtlIGFsZ28gY29tZXMgaW4sIEkgdGhpbmtcbiAgICBzdGF0aWMgY2FsY3VsYXRlSGFzaChibG9jaykge1xuICAgICAgICByZXR1cm4gQ3J5cHRvSlMuU0hBMjU2KFxuICAgICAgICAgICAgYmxvY2suaW5kZXggKyBibG9jay5wcmV2aW91c0hhc2ggKyBibG9jay50aW1lc3RhbXAgKyBibG9jay5fZGF0YVxuICAgICAgICApLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jaztcbiJdfQ==

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
            notifyListeners();
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




//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2NrY2hhaW5SZWR1eC5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXO0FBRWxCLFNBQVMsWUFBWSxPQUFTLEVBQUEsY0FBZ0IsRUFBQSxVQUFVO0lBQ3BELElBQ0ksTUFBQSxDQUFPLGNBQVAsQ0FBQSxHQUFBLENBQTBCLFVBQTFCLENBQUEsRUFBQSxDQUNBLE1BQUEsQ0FBTyxRQUFQLENBQUEsR0FBQSxDQUFvQixhQUN0QjtRQUNFLFFBQUEsQ0FBQSxDQUFBLENBQVc7UUFDWCxjQUFBLENBQUEsQ0FBQSxDQUFpQjtJQUN6QjtJQUVJLElBQUksTUFBQSxDQUFPLFFBQVAsQ0FBQSxHQUFBLENBQW9CLFlBQVk7UUFDaEMsT0FBTyxRQUFBLENBQVMsWUFBVCxDQUFzQixTQUFTO0lBQzlDO0lBRUksR0FBQSxDQUFJLGFBQWEsQ0FDYixJQUFJLEtBQUosQ0FBVTtRQUNOLGVBQWU7WUFDWCxPQUFPLENBREksQ0FBQTtZQUVYLE1BQU0sR0FGSyxDQUFBO1lBR1gsTUFBTSxFQUhLLENBQUE7WUFJWCxXQUFXLElBQUksSUFBSixFQUFBLENBQVcsT0FBWDtTQUxULENBQUE7UUFPTixNQUFNOztJQUdkLEdBQUEsQ0FBSSxZQUFZO0lBRWhCLFNBQVMsa0JBQWtCO1FBQ3ZCLFNBQUEsQ0FBVSxPQUFWLENBQWtCLFFBQUEsSUFBWSxRQUFBO0lBQ3RDOztJQUVJLFNBQVMsZUFBZTtRQUNwQixPQUFPLFVBQUEsQ0FBVyxVQUFBLENBQVcsTUFBWCxDQUFBLENBQUEsQ0FBb0I7SUFDOUM7O0lBRUksU0FBUyxTQUFTLFFBQVE7UUFDdEIsS0FBQSxDQUFNLFlBQVksWUFBQTtRQUNsQixLQUFBLENBQU0sV0FBVyxPQUFBLENBQVEsU0FBQSxDQUFVLE1BQU07UUFFekMsUUFBQSxDQUFTLElBQUksS0FBSixDQUFVO1lBQUUsZUFBZSxTQUFqQixDQUFBO1lBQTRCLE1BQU07O0lBQzdEOztJQUVJLFNBQVMsVUFBVSxVQUFVO1FBQ3pCLFNBQUEsQ0FBVSxJQUFWLENBQWU7UUFFZixPQUFPLFNBQVMsY0FBYztZQUMxQixTQUFBLENBQVUsTUFBVixDQUFpQixTQUFBLENBQVUsT0FBVixDQUFrQixXQUFXO1FBQzFEO0lBQ0E7O0lBRUksU0FBUyxTQUFTLFVBQVU7UUFDeEIsSUFBSSxlQUFBLENBQWdCLFVBQVUsWUFBQSxLQUFpQjtZQUMzQyxVQUFBLENBQVcsSUFBWCxDQUFnQjtZQUNoQixlQUFBO1FBQ1o7SUFDQTs7SUFFSSxTQUFTLGdCQUFnQixRQUFVLEVBQUEsZUFBZTtRQUM5QyxJQUFJLGFBQUEsQ0FBYyxLQUFkLENBQUEsQ0FBQSxDQUFzQixDQUF0QixDQUFBLEdBQUEsQ0FBNEIsUUFBQSxDQUFTLE9BQU87WUFDNUMsT0FBQSxDQUFRLEdBQVIsQ0FBWTtZQUNaLE9BQU87UUFDbkIsT0FBZSxJQUFJLGFBQUEsQ0FBYyxJQUFkLENBQUEsR0FBQSxDQUF1QixRQUFBLENBQVMsY0FBYztZQUNyRCxPQUFBLENBQVEsR0FBUixDQUFZO1lBQ1osT0FBTztRQUNuQixPQUFlLElBQUksS0FBQSxDQUFNLGFBQU4sQ0FBb0IsU0FBcEIsQ0FBQSxHQUFBLENBQWtDLFFBQUEsQ0FBUyxNQUFNO1lBQ3hELE9BQUEsQ0FBUSxHQUFSLENBQ0ksa0JBQ0EsS0FBQSxDQUFNLGFBQU4sQ0FBb0IsV0FDcEIsUUFBQSxDQUFTO1lBRWIsT0FBTztRQUNuQjtRQUNRLE9BQU87SUFDZjs7SUFFSSxTQUFTLGFBQWEsWUFBWTtRQUM5QixLQUFLLEdBQUEsQ0FBSSxJQUFJLEVBQUcsQ0FBQSxDQUFBLENBQUEsQ0FBSSxVQUFBLENBQVcsTUFBWCxDQUFBLENBQUEsQ0FBb0IsR0FBRyxDQUFBLElBQUs7WUFDNUMsSUFBSSxDQUFDLGVBQUEsQ0FBZ0IsVUFBQSxDQUFXLENBQUEsQ0FBQSxDQUFBLENBQUksSUFBSSxVQUFBLENBQVcsS0FBSztnQkFDcEQsT0FBTztZQUN2QjtRQUNBO1FBQ1EsT0FBTztJQUNmOztJQUVJLFNBQVMsYUFBYSxXQUFXO1FBQzdCLElBQUksWUFBQSxDQUFhLFVBQWIsQ0FBQSxFQUFBLENBQTJCLFNBQUEsQ0FBVSxNQUFWLENBQUEsQ0FBQSxDQUFtQixVQUFBLENBQVcsUUFBUTtZQUNqRSxPQUFBLENBQVEsS0FBUixDQUFjO1lBQ2QsVUFBQSxDQUFBLENBQUEsQ0FBYTtRQUN6QjtRQUNRLGVBQUE7SUFDUjs7SUFFSSxRQUFBLENBQVM7UUFBRSxNQUFNOztJQUVqQixPQUFPO1FBQ0gsYUFBVSxHQUFNLFlBQUEsRUFBQSxDQUFlLElBRDVCLENBQUE7UUFFSCxjQUFjLFlBRlgsQ0FBQTtRQUdILFVBQVUsUUFIUCxDQUFBO1FBSUgsV0FBVyxTQUpSLENBQUE7UUFNSCxVQUFVLFFBTlAsQ0FBQTtRQU9ILGNBQWMsWUFQWCxDQUFBO1FBUUgsa0JBQWUsR0FBTTs7QUFFN0I7O0FBRUEsZUFBZTtBQTNHZiIsImZpbGUiOiJibG9ja2NoYWluUmVkdXguanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJsb2NrIGZyb20gXCIuL0Jsb2NrXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIGVuaGFuY2VyID09PSBcInVuZGVmaW5lZFwiXG4gICAgKSB7XG4gICAgICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgICB9XG5cbiAgICBsZXQgYmxvY2tjaGFpbiA9IFtcbiAgICAgICAgbmV3IEJsb2NrKHtcbiAgICAgICAgICAgIHByZXZpb3VzQmxvY2s6IHtcbiAgICAgICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgICAgICBoYXNoOiBcIjBcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YTogcHJlbG9hZGVkU3RhdGVcbiAgICAgICAgfSlcbiAgICBdO1xuICAgIGxldCBsaXN0ZW5lcnMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIG5vdGlmeUxpc3RlbmVycygpIHtcbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TGFzdEJsb2NrKCkge1xuICAgICAgICByZXR1cm4gYmxvY2tjaGFpbltibG9ja2NoYWluLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgICBjb25zdCBsYXN0QmxvY2sgPSBnZXRMYXN0QmxvY2soKTtcbiAgICAgICAgY29uc3QgbmV4dERhdGEgPSByZWR1Y2VyKGxhc3RCbG9jay5kYXRhLCBhY3Rpb24pO1xuXG4gICAgICAgIGFkZEJsb2NrKG5ldyBCbG9jayh7IHByZXZpb3VzQmxvY2s6IGxhc3RCbG9jaywgZGF0YTogbmV4dERhdGEgfSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEJsb2NrKG5ld0Jsb2NrKSB7XG4gICAgICAgIGlmIChpc1ZhbGlkTmV3QmxvY2sobmV3QmxvY2ssIGdldExhc3RCbG9jaygpKSkge1xuICAgICAgICAgICAgYmxvY2tjaGFpbi5wdXNoKG5ld0Jsb2NrKTtcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZE5ld0Jsb2NrKG5ld0Jsb2NrLCBwcmV2aW91c0Jsb2NrKSB7XG4gICAgICAgIGlmIChwcmV2aW91c0Jsb2NrLmluZGV4ICsgMSAhPT0gbmV3QmxvY2suaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW52YWxpZCBpbmRleFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2aW91c0Jsb2NrLmhhc2ggIT09IG5ld0Jsb2NrLnByZXZpb3VzSGFzaCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHByZXZpb3VzaGFzaFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChCbG9jay5jYWxjdWxhdGVIYXNoKG5ld0Jsb2NrKSAhPT0gbmV3QmxvY2suaGFzaCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkIGhhc2g6IFwiLFxuICAgICAgICAgICAgICAgIEJsb2NrLmNhbGN1bGF0ZUhhc2gobmV3QmxvY2spLFxuICAgICAgICAgICAgICAgIG5ld0Jsb2NrLmhhc2hcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNWYWxpZENoYWluKGJsb2NrY2hhaW4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja2NoYWluLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkTmV3QmxvY2soYmxvY2tjaGFpbltpICsgMV0sIGJsb2NrY2hhaW5baV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VDaGFpbihuZXdCbG9ja3MpIHtcbiAgICAgICAgaWYgKGlzVmFsaWRDaGFpbihuZXdCbG9ja3MpICYmIG5ld0Jsb2Nrcy5sZW5ndGggPiBibG9ja2NoYWluLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlJlcGxhY2luZyBvbGQgY2hhaW4gd2l0aCBuZXdcIik7XG4gICAgICAgICAgICBibG9ja2NoYWluID0gbmV3QmxvY2tzO1xuICAgICAgICB9XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGRpc3BhdGNoKHsgdHlwZTogXCJJTklUXCIgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRTdGF0ZTogKCkgPT4gZ2V0TGFzdEJsb2NrKCkuZGF0YSxcbiAgICAgICAgZ2V0TGFzdEJsb2NrOiBnZXRMYXN0QmxvY2ssXG4gICAgICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG5cbiAgICAgICAgYWRkQmxvY2s6IGFkZEJsb2NrLFxuICAgICAgICByZXBsYWNlQ2hhaW46IHJlcGxhY2VDaGFpbiwgLy8gcHJpbWFyaWx5IHVzZWQgd2hlbiBzdGFydGluZyB1cCB0byB0YWtlIGxhdGVzdCBhdmFpbGFibGUgYmxvY2tjaGFpblxuICAgICAgICBnZXRXaG9sZUNoYWluOiAoKSA9PiBibG9ja2NoYWluXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmU7XG4iXX0=

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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpcmViYXNlTWlkZGxld2FyZS5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZSxVQUFTLGFBQWE7SUFDakMsS0FBQSxDQUFNLEtBQUssV0FBQSxDQUFZLFFBQVo7SUFFWCxPQUFPLFdBQUEsS0FBZ0IsR0FBRyxNQUFKLEdBQWE7UUFDL0IsS0FBQSxDQUFNLFFBQVEsV0FBQSxDQUFZLEdBQUc7UUFDN0IsS0FBQSxDQUFNLFlBQVksS0FBQSxDQUFNO1FBRXhCLFNBQVMsU0FBUyxRQUFRO1lBQ3RCLFNBQUEsQ0FBVTtZQUVWLEtBQUEsQ0FBTSxXQUFXLEtBQUEsQ0FBTSxZQUFOO1lBQ2pCLE9BQU8sU0FBQSxDQUFVO1FBQzdCOztRQUVRLFNBQVMsVUFBVSxPQUFPO1lBQ3RCLEtBQUEsQ0FBTSxLQUFOLENBQUEsQ0FBQSxDQUFjLEtBQUEsQ0FBTSxLQUFOLENBQUEsRUFBQSxDQUFlO1lBRTdCLE9BQU8sRUFBQSxDQUNGLEdBREUsQ0FDRSxjQUFjLEtBQUEsQ0FBTSxNQUFwQixFQURGLENBRUYsSUFGRSxDQUVHLFFBRkgsQ0FHRixJQUhFLENBR0csUUFBQSxJQUFZO2dCQUNkLElBQUksQ0FBQyxRQUFBLENBQVMsTUFBVCxJQUFtQjtvQkFDcEIsRUFBQSxDQUFHLEdBQUgsQ0FBTyxjQUFjLEtBQUEsQ0FBTSxNQUFwQixFQUFQLENBQW9DLEdBQXBDLENBQXdDO29CQUN4QyxPQUFPO2dCQUMvQixPQUEyQjtvQkFFSCxPQUFPO2dCQUMvQjtZQUNBO1FBQ0E7O1FBRVEsU0FBUyxxQkFBcUI7WUFDMUIsS0FBQSxDQUFNLFlBQVksS0FBQSxDQUFNLFlBQU4sRUFBQSxDQUFxQixLQUFyQixDQUFBLENBQUEsQ0FBNkI7WUFDL0MsS0FBQSxDQUFNLGVBQWUsVUFBUyxVQUFVO2dCQUNwQyxJQUFJLFFBQUEsQ0FBUyxNQUFULElBQW1CO29CQUNuQixHQUFBLENBQUksUUFBUSxRQUFBLENBQVMsR0FBVDtvQkFDWixLQUFBLENBQU0sSUFBTixDQUFBLENBQUEsQ0FBYSxLQUFBLENBQU0sS0FBTixHQUFjLElBQUEsQ0FBSyxLQUFMLENBQVcsS0FBQSxDQUFNLFNBQVM7b0JBRXJELE9BQUEsQ0FBUSxHQUFSLENBQVksK0JBQStCO29CQUczQyxLQUFBLENBQU0sUUFBTixDQUFlO29CQUNmLEVBQUEsQ0FDSyxHQURMLENBQ1MsY0FBYyxVQUFkLEVBRFQsQ0FFSyxHQUZMLENBRVMsU0FBUztvQkFFbEIsa0JBQUE7Z0JBQ3BCO1lBQ0E7WUFFWSxFQUFBLENBQUcsR0FBSCxDQUFPLGNBQWMsVUFBZCxFQUFQLENBQWtDLEVBQWxDLENBQXFDLFNBQVM7WUFDOUMsT0FBQSxDQUFRLEdBQVIsQ0FBWSxpQkFBaUI7UUFDekM7O1FBRVEsU0FBUyxtQkFBbUI7WUFDeEIsT0FBTyxFQUFBLENBQ0YsR0FERSxDQUNFLGFBREYsQ0FFRixVQUZFLEVBQUEsQ0FHRixJQUhFLENBR0csUUFISCxDQUlGLElBSkUsQ0FJRyxRQUFBLElBQVksUUFBQSxDQUFTLEdBQVQsR0FKZixDQUtGLElBTEUsQ0FLRyxVQUFBLElBQWM7Z0JBQ2hCLFVBQUEsQ0FBQSxDQUFBLENBQWEsTUFBQSxDQUFPLE1BQVAsQ0FBYyxXQUFkLENBQTBCLEdBQTFCLENBQThCLEtBQUEsSUFBUztvQkFDaEQsS0FBQSxDQUFNLElBQU4sQ0FBQSxDQUFBLENBQWEsS0FBQSxDQUFNLEtBQU4sR0FBYyxJQUFBLENBQUssS0FBTCxDQUFXLEtBQUEsQ0FBTSxTQUFTO29CQUNyRCxPQUFPO2dCQUMvQjtnQkFFb0IsT0FBQSxDQUFRLEtBQVIsQ0FBYyxrQkFBa0IsVUFBQSxDQUFXO2dCQUUzQyxLQUFBLENBQU0sWUFBTixDQUFtQjtnQkFFbkIsa0JBQUE7Z0JBRUEsT0FBTyxNQUFBLENBQU8sTUFBUCxDQUFjLE9BQU87b0JBQ3hCOztZQUV4QjtRQUNBOztRQUVRLE9BQU8sT0FBQSxDQUFRLEdBQVIsQ0FBWSxLQUFBLENBQU0sYUFBTixFQUFBLENBQXNCLEdBQXRCLENBQTBCLFdBQXRDLENBQWtELElBQWxELENBQ0g7SUFFWjtBQUNBOztBQWxGQSIsImZpbGUiOiJmaXJlYmFzZU1pZGRsZXdhcmUuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZmlyZWJhc2VBcHApIHtcbiAgICBjb25zdCBkYiA9IGZpcmViYXNlQXBwLmRhdGFiYXNlKCk7XG5cbiAgICByZXR1cm4gY3JlYXRlU3RvcmUgPT4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZSguLi5hcmdzKTtcbiAgICAgICAgY29uc3QgX2Rpc3BhdGNoID0gc3RvcmUuZGlzcGF0Y2g7XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgICBfZGlzcGF0Y2goYWN0aW9uKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3QmxvY2sgPSBzdG9yZS5nZXRMYXN0QmxvY2soKTtcbiAgICAgICAgICAgIHJldHVybiBzYXZlQmxvY2sobmV3QmxvY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZUJsb2NrKGJsb2NrKSB7XG4gICAgICAgICAgICBibG9jay5fZGF0YSA9IGJsb2NrLl9kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICByZXR1cm4gZGJcbiAgICAgICAgICAgICAgICAucmVmKGBibG9ja2NoYWluLyR7YmxvY2suaW5kZXh9YClcbiAgICAgICAgICAgICAgICAub25jZShcInZhbHVlXCIpXG4gICAgICAgICAgICAgICAgLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNuYXBzaG90LmV4aXN0cygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYi5yZWYoYGJsb2NrY2hhaW4vJHtibG9jay5pbmRleH1gKS5zZXQoYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xsaXNpb24gcmVzb2x1dGlvbj9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbGlzdGVuRm9yTmV4dEJsb2NrKCkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gc3RvcmUuZ2V0TGFzdEJsb2NrKCkuaW5kZXggKyAxO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVIYW5kbGVyID0gZnVuY3Rpb24oc25hcHNob3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoc25hcHNob3QuZXhpc3RzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLmRhdGEgPSBibG9jay5fZGF0YSA/IEpTT04ucGFyc2UoYmxvY2suX2RhdGEpIDoge307XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNlaXZlZCBibG9jayBmcm9tIG91dHNpZGVcIiwgYmxvY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHBvdGVudGlhbCBjb25mbGljdCB3aXRoIGxvY2FsIGxhc3QgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUuYWRkQmxvY2soYmxvY2spO1xuICAgICAgICAgICAgICAgICAgICBkYlxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZihgYmxvY2tjaGFpbi8ke25leHRJbmRleH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZihcInZhbHVlXCIsIHZhbHVlSGFuZGxlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuRm9yTmV4dEJsb2NrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGIucmVmKGBibG9ja2NoYWluLyR7bmV4dEluZGV4fWApLm9uKFwidmFsdWVcIiwgdmFsdWVIYW5kbGVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGlzdGVuaW5nIGZvclwiLCBuZXh0SW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdEZyb21GaXJlYmFzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYlxuICAgICAgICAgICAgICAgIC5yZWYoXCJibG9ja2NoYWluXCIpXG4gICAgICAgICAgICAgICAgLm9yZGVyQnlLZXkoKVxuICAgICAgICAgICAgICAgIC5vbmNlKFwidmFsdWVcIilcbiAgICAgICAgICAgICAgICAudGhlbihzbmFwc2hvdCA9PiBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAudGhlbihibG9ja2NoYWluID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tjaGFpbiA9IE9iamVjdC52YWx1ZXMoYmxvY2tjaGFpbikubWFwKGJsb2NrID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrLmRhdGEgPSBibG9jay5fZGF0YSA/IEpTT04ucGFyc2UoYmxvY2suX2RhdGEpIDoge307XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJHb3QgYmxvY2tjaGFpblwiLCBibG9ja2NoYWluLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RvcmUucmVwbGFjZUNoYWluKGJsb2NrY2hhaW4pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbkZvck5leHRCbG9jaygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN0b3JlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChzdG9yZS5nZXRXaG9sZUNoYWluKCkubWFwKHNhdmVCbG9jaykpLnRoZW4oXG4gICAgICAgICAgICBpbml0RnJvbUZpcmViYXNlXG4gICAgICAgICk7XG4gICAgfTtcbn1cbiJdfQ==

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGlCQUFpQjtBQUN4QixPQUFPLHdCQUF3QjtBQUUvQixPQUFBLENBQVMsYUFBYTtBQUh0QiIsImZpbGUiOiJpbmRleC5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlU3RvcmUgZnJvbSBcIi4vYmxvY2tjaGFpblJlZHV4XCI7XG5pbXBvcnQgZmlyZWJhc2VNaWRkbGV3YXJlIGZyb20gXCIuL2ZpcmViYXNlTWlkZGxld2FyZVwiO1xuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgZmlyZWJhc2VNaWRkbGV3YXJlIH07XG4iXX0=

exports.createStore = createStore;
exports.firebaseMiddleware = firebaseMiddleware;

})));
//# sourceMappingURL=blockchain-redux.umd.js.map
