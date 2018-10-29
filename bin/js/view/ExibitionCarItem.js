/**
* name
*/
var module;
(function (module) {
    /**商店展示汽车item */
    var ExibitionCarItem = /** @class */ (function () {
        function ExibitionCarItem(root) {
            /**是否正在旋转 */
            this._isRotating = false;
            this._root = root;
        }
        ExibitionCarItem.prototype.rotationCar = function () {
            this._root.rotation -= 4;
        };
        ExibitionCarItem.prototype.loopPlay = function () {
            var curIndex = this._root.clipCar.index;
            curIndex = curIndex >= module.CarItem.CLIP_MAX_INDEX ? 0 : curIndex + 1;
            this._root.clipCar.index = curIndex;
        };
        ExibitionCarItem.prototype.stopPlayClip = function () {
            Laya.timer.clear(this, this.loopPlay);
        };
        ExibitionCarItem.prototype.playClip = function () {
            Laya.timer.loop(module.CarItem.INTERVAL, this, this.loopPlay);
        };
        /**改变展示车辆 */
        ExibitionCarItem.prototype.changeCar = function (id, autoRotation) {
            if (autoRotation === void 0) { autoRotation = true; }
            this._root.clipCar.skin = "car/" + module.ResCarConfigData.CLIP_CAR_PREFIX + id + ".png";
            this._root.imgCar.skin = "car/" + module.ResCarConfigData.BIG_LOCK_PREFIX + id +
                module.ResCarConfigData.BIG_LOCK_SUFFIX + ".png";
            var isHave = module.GameDataManager.instance.unlockCarAry.indexOf(id) == -1 ? false : true;
            if (isHave) {
                this._root.clipCar.visible = true;
                this._root.imgCar.visible = false;
                this.playClip();
            }
            else {
                this._root.clipCar.visible = false;
                this._root.imgCar.visible = true;
                this.stopPlayClip();
            }
            if (!this._isRotating) {
                this._isRotating = true;
                Laya.timer.loop(100, this, this.rotationCar, null);
            }
        };
        /**释放 */
        ExibitionCarItem.prototype.destroy = function () {
            Laya.timer.clearAll(this);
            this._root = null;
        };
        return ExibitionCarItem;
    }());
    module.ExibitionCarItem = ExibitionCarItem;
})(module || (module = {}));
//# sourceMappingURL=ExibitionCarItem.js.map