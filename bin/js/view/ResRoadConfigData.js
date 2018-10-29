/**
* name
*/
var module;
(function (module) {
    var ResRoadConfigData = /** @class */ (function () {
        /**构造函数 */
        function ResRoadConfigData() {
            this.nextRoadProbabilityDic = new Laya.Dictionary();
            this.nextRoadDirAry = new Array();
        }
        /**获取资源数量 */
        ResRoadConfigData.getRoadAssetNum = function (roadStyle, roadID) {
            var num = 0;
            return ResRoadConfigData.ROAD_NUM_CONFIG[roadStyle][roadID];
        };
        /**获取资源路径 */
        ResRoadConfigData.getRoadAssetPath = function (roadStyle, assetName) {
            if (module.GameDataManager.USE_CDN == BOOLEAN.TRUE) {
                return module.GameDataManager.CDN_PATH + "road" + roadStyle + "/" + assetName + ".png";
            }
            else {
                return "road" + roadStyle + "/" + assetName + ".png";
            }
        };
        /**获取该id是否为弯道 */
        ResRoadConfigData.getIsCurveRoad = function (roadID) {
            switch (roadID) {
                case ResRoadConfigData.BEGIN0_ROTATION0:
                case ResRoadConfigData.BEGIN1_ROTATION0:
                case ResRoadConfigData.S_ROTATION0:
                case ResRoadConfigData.S_ROTATION90:
                case ResRoadConfigData.SIDE_ROTATION0:
                case ResRoadConfigData.SIDE_ROTATION90:
                    {
                        return false;
                    }
                case ResRoadConfigData.TURN45_ROTATION0:
                case ResRoadConfigData.TURN45_ROTATION90:
                case ResRoadConfigData.TURN45_ROTATION180:
                case ResRoadConfigData.TURN45_ROTATION270:
                case ResRoadConfigData.TURN90_ROTATION0:
                case ResRoadConfigData.TURN90_ROTATION90:
                case ResRoadConfigData.TURN90_ROTATION180:
                case ResRoadConfigData.TURN90_ROTATION270:
                    {
                        return true;
                    }
            }
        };
        /**加载完成回调 */
        ResRoadConfigData.onLoadComplete = function () {
            if (ResRoadConfigData.isLoaded) {
                return;
            }
            ResRoadConfigData.isLoaded = true;
            var resource = Laya.loader.getRes(ResRoadConfigData.URL);
            for (var i = 0; i < ResRoadConfigData.DATA_KEY.length; i++) {
                var data = resource[ResRoadConfigData.DATA_KEY[i]];
                if (data == null) {
                    console.assert(false, "数据key值配置错误");
                    return;
                }
                var roadConfig = new ResRoadConfigData();
                roadConfig.sourceName = data[ResRoadConfigData.ATTR_SOURCE_NAMEL];
                roadConfig.id = ResRoadConfigData.DATA_KEY[i];
                roadConfig.rotation = data[ResRoadConfigData.ATTR_ROTATION];
                roadConfig.monsterNum = data[ResRoadConfigData.ATTR_MONSTER_NUM];
                for (var j = 0; j < data[ResRoadConfigData.ATTR_NEXT_DIRECTION].length; j++) {
                    var direction = data[ResRoadConfigData.ATTR_NEXT_DIRECTION][j];
                    roadConfig.nextRoadDirAry.push(direction);
                    var probabitityData = data[ResRoadConfigData.ATTR_NEXT_ROAD_PROBABILITY + "&" + direction];
                    if (probabitityData != null) {
                        var probabitityDic = new Laya.Dictionary();
                        for (var k = 0; k < ResRoadConfigData.DATA_KEY.length; k++) {
                            var probabitity = probabitityData[ResRoadConfigData.DATA_KEY[k]];
                            if (probabitity > 0) {
                                probabitityDic.set(ResRoadConfigData.DATA_KEY[k], probabitity);
                            }
                        }
                        roadConfig.nextRoadProbabilityDic.set(direction, probabitityDic);
                    }
                }
                ResRoadConfigData.dataDic.set(roadConfig.id, roadConfig);
            }
        };
        /**通过id获取数据 */
        ResRoadConfigData.getDataByID = function (id) {
            return this.dataDic.get(id);
        };
        /**释放 */
        ResRoadConfigData.prototype.destroy = function () {
            this.nextRoadProbabilityDic.clear();
            this.nextRoadProbabilityDic = null;
        };
        //道路资源类别
        /**开始道路第一段 */
        ResRoadConfigData.SOURCE_BEGIN0 = "begin0";
        /**开始道路第二段 */
        ResRoadConfigData.SOURCE_BEGIN1 = "begin1";
        /**直线段路 */
        ResRoadConfigData.SOURCE_STRAIGHT = "s";
        /**90度弯路 */
        ResRoadConfigData.SOURCE_TURN_90 = "turn90";
        /**45度弯路 */
        ResRoadConfigData.SOURCE_TURN_45 = "turn45";
        /**斜直路 */
        ResRoadConfigData.SOURCE_SIDE = "side";
        //配置数据属性		
        /**资源名称 */
        ResRoadConfigData.ATTR_SOURCE_NAMEL = "sourceName";
        /**道路旋转 */
        ResRoadConfigData.ATTR_ROTATION = "rotation";
        /**下块道路 */
        ResRoadConfigData.ATTR_NEXT_ROAD_PROBABILITY = "nextRoadProbability";
        /**下块道路相对方向 */
        ResRoadConfigData.ATTR_NEXT_DIRECTION = "nextDirection";
        /**赛道上僵尸数量 */
        ResRoadConfigData.ATTR_MONSTER_NUM = "monsterNum";
        //与前一个道路模块的相对位置
        ResRoadConfigData.RELATIVE_UP = "up";
        ResRoadConfigData.RELATIVE_DOWN = "down";
        ResRoadConfigData.RELATIVE_LEFT = "left";
        ResRoadConfigData.RELATIVE_RIGHT = "right";
        ResRoadConfigData.RELATIVE_LEFT_UP = "left_up";
        ResRoadConfigData.RELATIVE_LEFT_DOWN = "left_down";
        ResRoadConfigData.RELATIVE_RIGHT_UP = "right_up";
        ResRoadConfigData.RELATIVE_RIGHT_DOWN = "right_down";
        /**弯道 */
        ResRoadConfigData.ROAD_S = "s";
        /**直道 */
        ResRoadConfigData.ROAD_C = "c";
        /**道路样式资源数量配置 */
        ResRoadConfigData.ROAD_NUM_CONFIG = {
            "0": {
                begin0: 1,
                begin1: 1,
                s: 8,
                side: 3,
                turn45: 3,
                turn90: 1
            },
            "1": {
                begin0: 1,
                begin1: 1,
                s: 3,
                side: 1,
                turn45: 1,
                turn90: 1
            },
            "2": {
                begin0: 1,
                begin1: 1,
                s: 3,
                side: 1,
                turn45: 1,
                turn90: 2
            },
            "3": {
                begin0: 1,
                begin1: 1,
                s: 3,
                side: 1,
                turn45: 1,
                turn90: 2
            },
            "4": {
                begin0: 1,
                begin1: 1,
                s: 3,
                side: 1,
                turn45: 1,
                turn90: 2
            },
            "5": {
                begin0: 1,
                begin1: 1,
                s: 3,
                side: 1,
                turn45: 1,
                turn90: 1
            }
        };
        /**资源路径 */
        ResRoadConfigData.URL = "res/config/ResRoadConfigData.json";
        /**是否加载完成 */
        ResRoadConfigData.isLoaded = false;
        /**数据集合 */
        ResRoadConfigData.dataDic = new Laya.Dictionary();
        /**数据key集合 */
        ResRoadConfigData.DATA_KEY = [
            "begin0_rotation0", "begin1_rotation0",
            "s_rotation0", "s_rotation90",
            "turn90_rotation0", "turn90_rotation90", "turn90_rotation180", "turn90_rotation270",
            "turn45_rotation0", "turn45_rotation90", "turn45_rotation180", "turn45_rotation270",
            "side_rotation0", "side_rotation90"
        ];
        ResRoadConfigData.BEGIN0_ROTATION0 = "begin0_rotation0";
        ResRoadConfigData.BEGIN1_ROTATION0 = "begin1_rotation0";
        ResRoadConfigData.S_ROTATION0 = "s_rotation0";
        ResRoadConfigData.S_ROTATION90 = "s_rotation90";
        ResRoadConfigData.TURN90_ROTATION0 = "turn90_rotation0";
        ResRoadConfigData.TURN90_ROTATION90 = "turn90_rotation90";
        ResRoadConfigData.TURN90_ROTATION180 = "turn90_rotation180";
        ResRoadConfigData.TURN90_ROTATION270 = "turn90_rotation270";
        ResRoadConfigData.TURN45_ROTATION0 = "turn45_rotation0";
        ResRoadConfigData.TURN45_ROTATION90 = "turn45_rotation90";
        ResRoadConfigData.TURN45_ROTATION180 = "turn45_rotation180";
        ResRoadConfigData.TURN45_ROTATION270 = "turn45_rotation270";
        ResRoadConfigData.SIDE_ROTATION0 = "side_rotation0";
        ResRoadConfigData.SIDE_ROTATION90 = "side_rotation90";
        return ResRoadConfigData;
    }());
    module.ResRoadConfigData = ResRoadConfigData;
})(module || (module = {}));
//# sourceMappingURL=ResRoadConfigData.js.map