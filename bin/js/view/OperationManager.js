/**
* name
*/
var module;
(function (module) {
    /**操作管理器 */
    var OperationManager = /** @class */ (function () {
        function OperationManager() {
            /**增长率 */
            this._increase = 1;
        }
        /**初始化 */
        OperationManager.prototype.initilize = function (view) {
            // this._curOperationType = OperationManager.OPERATION_MOUSE;
            this._curOperationType = OperationManager.OPERATION_MOUSE;
            this._indexView = view;
            if (this._curOperationType == OperationManager.OPERATION_KEYBORAD) {
                this.initKeyBordOperation();
            }
            else {
                this.initMouseOperation();
            }
        };
        /**初始鼠标操作 */
        OperationManager.prototype.initMouseOperation = function () {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown, null);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onStageMouseUp, null);
        };
        /**鼠标抬起事件 */
        OperationManager.prototype.onStageMouseUp = function (e) {
            this._increase = 1;
            Laya.timer.clear(this, this.turnLeft);
            Laya.timer.clear(this, this.turnRight);
        };
        /**鼠标按下事件 */
        OperationManager.prototype.onStageMouseDown = function (e) {
            if (!this._indexView.isStartGame) {
                return;
            }
            //右转
            if (e.stageX > Laya.stage.width / 2) {
                Laya.timer.frameLoop(1, this, this.turnRight);
            }
            else { //左转
                Laya.timer.frameLoop(1, this, this.turnLeft);
            }
        };
        /**左转 */
        OperationManager.prototype.turnLeft = function () {
            module.RoadManager.instance.rotationRoad(DIRECTION.LEFT);
            this._increase += 0.02;
            this._indexView.cartItem.rotation -= (module.CarItem.FRAME_ROTATION * this._increase);
        };
        /**右转 */
        OperationManager.prototype.turnRight = function () {
            module.RoadManager.instance.rotationRoad(DIRECTION.RIGHT);
            this._increase += 0.02;
            this._indexView.cartItem.rotation += (module.CarItem.FRAME_ROTATION * this._increase);
        };
        /**初始化键盘操作 */
        OperationManager.prototype.initKeyBordOperation = function () {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown, null);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp, null);
        };
        OperationManager.prototype.onKeyDown = function (e) {
            if (!this._indexView.isStartGame) {
                return;
            }
            if (e.keyCode == Laya.Keyboard.LEFT) {
                Laya.timer.frameLoop(1, this, this.turnLeft);
            }
            else if (e.keyCode == Laya.Keyboard.RIGHT) {
                Laya.timer.frameLoop(1, this, this.turnRight);
            }
        };
        OperationManager.prototype.onKeyUp = function () {
            this._increase = 1;
            Laya.timer.clear(this, this.turnLeft);
            Laya.timer.clear(this, this.turnRight);
        };
        Object.defineProperty(OperationManager, "instance", {
            /**获取实例 */
            get: function () {
                if (this._instance == null) {
                    this._instance = new OperationManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**键盘操作 */
        OperationManager.OPERATION_KEYBORAD = "operation_keyborad";
        /**鼠标操作 */
        OperationManager.OPERATION_MOUSE = "operation_mouse";
        return OperationManager;
    }());
    module.OperationManager = OperationManager;
})(module || (module = {}));
//# sourceMappingURL=OperationManager.js.map