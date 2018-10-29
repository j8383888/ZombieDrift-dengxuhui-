var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var module;
(function (module) {
    /**汽车列表元素 */
    var CarListItem = /** @class */ (function (_super) {
        __extends(CarListItem, _super);
        /**
         * 构造函数
         * @param carConfigID 汽车配置id
         */
        function CarListItem(carConfigID) {
            var _this = _super.call(this) || this;
            _this._configID = carConfigID;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        CarListItem.prototype.initView = function () {
            this.imgLock.skin = "car/" + module.ResCarConfigData.SMALL_CAR_LOCK_PREFIX + this._configID + ".png";
            this.imgUnlock.skin = "car/" + module.ResCarConfigData.SMALL_CAR_UNLOCK_PREFIX + this._configID + ".png";
            this.updateStatus();
            this.updateSelectFlag();
        };
        CarListItem.prototype.initEvent = function () {
        };
        CarListItem.prototype.removeEvent = function () {
        };
        /**更新显示状态 */
        CarListItem.prototype.updateStatus = function () {
            var isHave = module.GameDataManager.instance.unlockCarAry.indexOf(this._configID) == -1 ? false : true;
            if (isHave) {
                this.imgLock.visible = false;
                this.imgUnlock.visible = true;
            }
            else {
                this.imgLock.visible = true;
                this.imgUnlock.visible = false;
            }
        };
        /**更新选中标志 */
        CarListItem.prototype.updateSelectFlag = function () {
            if (module.GameDataManager.instance.selectCarID == this._configID) {
                this.imgSelect.visible = true;
            }
            else {
                this.imgSelect.visible = false;
            }
        };
        Object.defineProperty(CarListItem.prototype, "configID", {
            /**获取配置id */
            get: function () {
                return this._configID;
            },
            enumerable: true,
            configurable: true
        });
        /**释放 */
        CarListItem.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.removeEvent();
            this.removeSelf();
        };
        return CarListItem;
    }(ui.game.CarListItemUI));
    module.CarListItem = CarListItem;
})(module || (module = {}));
//# sourceMappingURL=CarListItem.js.map