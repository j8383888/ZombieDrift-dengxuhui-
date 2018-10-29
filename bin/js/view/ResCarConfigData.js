/**
* name
*/
var module;
(function (module) {
    var ResCarConfigData = /** @class */ (function () {
        function ResCarConfigData() {
            this.wheel_front_left = new Laya.Point();
            this.wheel_front_right = new Laya.Point();
            this.wheel_back_left = new Laya.Point();
            this.wheel_back_right = new Laya.Point();
            this.saw = new Laya.Point();
            this.tail = new Laya.Point();
            this.gas_back_left = new Laya.Point();
            this.gas_back_right = new Laya.Point();
            this.gas_front_left = new Laya.Point();
            this.gas_front_right = new Laya.Point();
        }
        /**通过id获取数据 */
        ResCarConfigData.getDataByID = function (carID) {
            return this.dataDic.get(carID);
        };
        /**获取所有配置数据 */
        ResCarConfigData.getAllData = function () {
            return this.dataDic;
        };
        /**资源加载完成回调 */
        ResCarConfigData.onLoadComplete = function () {
            if (ResCarConfigData.isLoaded) {
                return;
            }
            ResCarConfigData.isLoaded = true;
            var resource = Laya.loader.getRes(ResCarConfigData.URL);
            for (var i = 1; i <= ResCarConfigData.CAR_NUM; i++) {
                var data = resource[i];
                var carData = new ResCarConfigData();
                carData.id = data[ResCarConfigData.ATTR_ID];
                carData.price = data[ResCarConfigData.ATTR_PRICE];
                carData.wheel_front_right.x = data[ResCarConfigData.ATTR_WHEEL_FRONT_RIGHT][0];
                carData.wheel_front_right.y = data[ResCarConfigData.ATTR_WHEEL_FRONT_RIGHT][1];
                carData.wheel_front_left.x = data[ResCarConfigData.ATTR_WHEEL_FRONT_LEFT][0];
                carData.wheel_front_left.y = data[ResCarConfigData.ATTR_WHEEL_FRONT_LEFT][1];
                carData.wheel_back_right.x = data[ResCarConfigData.ATTR_WHEEL_BACK_RIGHT][0];
                carData.wheel_back_right.y = data[ResCarConfigData.ATTR_WHEEL_BACK_RIGHT][1];
                carData.wheel_back_left.x = data[ResCarConfigData.ATTR_WHEEL_BACK_LEFT][0];
                carData.wheel_back_left.y = data[ResCarConfigData.ATTR_WHEEL_BACK_LEFT][1];
                carData.saw.x = data[ResCarConfigData.ATTR_SAW][0];
                carData.saw.y = data[ResCarConfigData.ATTR_SAW][1];
                carData.tail.x = data[ResCarConfigData.ATTR_TAIL][0];
                carData.tail.y = data[ResCarConfigData.ATTR_TAIL][1];
                carData.gas_back_left.x = data[ResCarConfigData.ATTR_GAS_BACK_LEFT][0];
                carData.gas_back_left.y = data[ResCarConfigData.ATTR_GAS_BACK_LEFT][1];
                carData.gas_back_right.x = data[ResCarConfigData.ATTR_GAS_BACK_RIGHT][0];
                carData.gas_back_right.y = data[ResCarConfigData.ATTR_GAS_BACK_RIGHT][1];
                carData.gas_front_left.x = data[ResCarConfigData.ATTR_GAS_FRONT_LEFT][0];
                carData.gas_front_left.y = data[ResCarConfigData.ATTR_GAS_FRONT_LEFT][1];
                carData.gas_front_right.x = data[ResCarConfigData.ATTR_GAS_FRONT_RIGHT][0];
                carData.gas_front_right.y = data[ResCarConfigData.ATTR_GAS_FRONT_LEFT][1];
                carData.collision_radius = data[ResCarConfigData.ATTR_COLLISION_RADIUS];
                ResCarConfigData.dataDic.set(carData.id, carData);
            }
        };
        /**汽车数量 */
        ResCarConfigData.CAR_NUM = 10;
        /**车辆ui锁住资源前缀 */
        ResCarConfigData.SMALL_CAR_LOCK_PREFIX = "small_car_lock_";
        /**汽车图鉴前缀 */
        ResCarConfigData.SMALL_CAR_UNLOCK_PREFIX = "small_car_";
        /**汽车被锁前缀 */
        ResCarConfigData.BIG_LOCK_PREFIX = "car";
        /**汽车被锁后缀 */
        ResCarConfigData.BIG_LOCK_SUFFIX = "_lock";
        /**汽车片段资源前缀 */
        ResCarConfigData.CLIP_CAR_PREFIX = "clip_car_";
        /**配置数据资源路径 */
        ResCarConfigData.URL = "res/config/ResCarConfigData.json";
        /**是否加载完成 */
        ResCarConfigData.isLoaded = false;
        /**配置数据字典 */
        ResCarConfigData.dataDic = new Laya.Dictionary();
        //属性定义
        ResCarConfigData.ATTR_ID = "id";
        ResCarConfigData.ATTR_WHEEL_FRONT_LEFT = "wheel_front_left";
        ResCarConfigData.ATTR_WHEEL_FRONT_RIGHT = "wheel_front_right";
        ResCarConfigData.ATTR_WHEEL_BACK_LEFT = "wheel_back_left";
        ResCarConfigData.ATTR_WHEEL_BACK_RIGHT = "wheel_back_right";
        ResCarConfigData.ATTR_SAW = "saw";
        ResCarConfigData.ATTR_PRICE = "price";
        ResCarConfigData.ATTR_TAIL = "tail";
        ResCarConfigData.ATTR_GAS_FRONT_LEFT = "gas_front_left";
        ResCarConfigData.ATTR_GAS_FRONT_RIGHT = "gas_front_right";
        ResCarConfigData.ATTR_GAS_BACK_LEFT = "gas_back_left";
        ResCarConfigData.ATTR_GAS_BACK_RIGHT = "gas_back_right";
        ResCarConfigData.ATTR_COLLISION_RADIUS = "collision_radius";
        return ResCarConfigData;
    }());
    module.ResCarConfigData = ResCarConfigData;
})(module || (module = {}));
//# sourceMappingURL=ResCarConfigData.js.map