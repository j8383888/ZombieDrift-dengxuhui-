/**
* name
*/
var module;
(function (module) {
    /**游戏物体管理器 */
    var GameObjectManager = /** @class */ (function () {
        /**
         * 构造函数
         */
        function GameObjectManager() {
            this.initialize();
        }
        /**初始化管理器 */
        GameObjectManager.prototype.initialize = function () {
            this._wheelTyleAry = new Array();
        };
        /**创建轮胎印 */
        GameObjectManager.prototype.createWheelTyle = function (startX, startY, endX, endY, lineColor, lineWidth) {
            var tyle = null;
            if (this._wheelTyleAry.length > 0) {
                tyle = this._wheelTyleAry.shift();
                tyle.graphics.clear();
            }
            else {
                tyle = new Laya.Sprite();
                tyle.alpha = GameObjectManager.TYLE_ALPHA;
            }
            tyle.graphics.drawLine(startX, startY, endX, endY, lineColor, lineWidth);
            return tyle;
        };
        /**释放所有轮胎印 */
        GameObjectManager.prototype.destroyWheelTyles = function (tyles) {
            for (var i = 0; i < tyles.length; i++) {
                if (tyles[i].parent != null) {
                    tyles[i].parent.removeChild(tyles[i]);
                }
                this._wheelTyleAry.push(tyles[i]);
            }
            tyles.length = 0;
        };
        Object.defineProperty(GameObjectManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameObjectManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameObjectManager.TYLE_ALPHA = 0.7;
        return GameObjectManager;
    }());
    module.GameObjectManager = GameObjectManager;
})(module || (module = {}));
//# sourceMappingURL=GameObjectManager.js.map