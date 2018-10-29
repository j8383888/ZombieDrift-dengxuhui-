/**
* name
*/
var module;
(function (module) {
    /**路径生成器 */
    var RoadCreator = /** @class */ (function () {
        function RoadCreator() {
            /**道路实例映射 */
            this._roadClsDic = null;
            this._roadClsDic = new Laya.Dictionary();
            this._roadClsDic.set(module.ResRoadConfigData.SOURCE_BEGIN0, module.RoadStraight);
            this._roadClsDic.set(module.ResRoadConfigData.SOURCE_BEGIN1, module.RoadStraight);
            this._roadClsDic.set(module.ResRoadConfigData.SOURCE_STRAIGHT, module.RoadStraight);
            this._roadClsDic.set(module.ResRoadConfigData.SOURCE_TURN_90, module.RoadTurn90Angle);
            this._roadClsDic.set(module.ResRoadConfigData.SOURCE_TURN_45, module.RoadTurn45Angle);
            this._roadClsDic.set(module.ResRoadConfigData.SOURCE_SIDE, module.RoadSide);
            this.initEvent();
        }
        RoadCreator.prototype.initEvent = function () {
        };
        RoadCreator.prototype.removeEvent = function () {
        };
        /**
         * 创建道路了item
         * @param skinUrl 资源路径
         * @param roadClsID 道路实例映射id
         * @param rotation 旋转
         */
        RoadCreator.prototype.createRoad = function (skinUrl, configData, isMoreMonster) {
            var cls = this._roadClsDic.get(configData.sourceName);
            var road;
            if (isMoreMonster) {
                road = new cls(skinUrl, configData, true);
            }
            else {
                road = new cls(skinUrl, configData, false);
            }
            return road;
        };
        /**释放 */
        RoadCreator.prototype.destroy = function () {
            this.removeEvent();
        };
        return RoadCreator;
    }());
    module.RoadCreator = RoadCreator;
})(module || (module = {}));
//# sourceMappingURL=RoadCreator.js.map