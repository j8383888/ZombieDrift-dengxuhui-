/**
* name
*/
var manager;
(function (manager) {
    var Dictionary = laya.utils.Dictionary;
    var EnterFrameManager = /** @class */ (function () {
        function EnterFrameManager() {
            this.itemDic = new Dictionary();
            /**暂停循环帧 */
            this.pauseItemDic = new Dictionary();
            this._lastTime = 0;
        }
        EnterFrameManager.prototype.setup = function () {
            Laya.timer.loop(33, this, this.enterFrame);
        };
        /**帧更新 */
        EnterFrameManager.prototype.enterFrame = function () {
            // var curTime:number = new Date().getTime();
            // if(this._lastTime != 0){
            // 	var defTime:number = curTime - this._lastTime;
            // 	this._lastTime = curTime;								
            // 	console.log("帧循环间隔：" + defTime);
            // }
            // else{
            // 	this._lastTime = curTime;
            // }	
            for (var i = 0; i < this.itemDic.values.length; i++) {
                var item = this.itemDic.values[i];
                if (item != null) {
                    item.onEnterFrame();
                }
            }
        };
        EnterFrameManager.prototype.addItem = function (item) {
            this.itemDic.set(item.faceId, item);
        };
        EnterFrameManager.prototype.removeItem = function (faceId) {
            if (this.itemDic.get(faceId) != null) {
                this.itemDic.remove(faceId);
            }
        };
        EnterFrameManager.prototype.pauseItem = function (faceID) {
            if (this.itemDic.get(faceID) != null) {
                var item = this.itemDic.get(faceID);
                this.itemDic.remove(faceID);
                this.pauseItemDic.set(faceID, item);
            }
        };
        EnterFrameManager.prototype.recoverItem = function (faceId) {
            if (this.pauseItemDic.get(faceId) != null) {
                var item = this.pauseItemDic.get(faceId);
                this.pauseItemDic.remove(faceId);
                this.itemDic.set(faceId, item);
            }
        };
        Object.defineProperty(EnterFrameManager.prototype, "id", {
            get: function () {
                return EnterFrameManager.IDS++;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EnterFrameManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new EnterFrameManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EnterFrameManager._instance = null;
        EnterFrameManager.IDS = 1;
        return EnterFrameManager;
    }());
    manager.EnterFrameManager = EnterFrameManager;
})(manager || (manager = {}));
//# sourceMappingURL=EnterFrameManager.js.map