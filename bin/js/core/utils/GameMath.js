/*
* name;
*/
var GameMath = /** @class */ (function () {
    function GameMath() {
    }
    /**
     * 获取两点间的夹角
     *
     * @param x1 点1——x
     * @param y1 点1——y
     * @param x2 点2——x
     * @param y2 点2——y
     * @param relativeAxis 相对轴
     */
    GameMath.getAngle = function (startX, startY, endX, endY, relativeAxis) {
        var angle; //弧度
        var theta; //角度
        if (relativeAxis == GameMath.Axis_X) {
            angle = Math.atan2((endY - startY), (endX - startX));
            theta = angle * (180 / Math.PI);
        }
        else if (relativeAxis == GameMath.Axis_Y) {
            angle = Math.atan2((endX - startX), (endY - startY));
            theta = angle * (180 / Math.PI);
        }
        else {
            console.assert(false, "请输入正确的对称轴");
        }
        return theta;
    };
    /**随机下一个道路配置id */
    GameMath.randomNextRoad = function (config, disableDir, time) {
        var nextRoadID;
        var dirAry = [];
        for (var j = 0; j < config.nextRoadDirAry.length; j++) {
            if (config.nextRoadDirAry[j] != disableDir) {
                dirAry.push(config.nextRoadDirAry[j]);
            }
        }
        if (dirAry.length <= 0) {
            console.assert(false, "存在死路");
        }
        var randomIndex = Math.floor(Math.random() * dirAry.length);
        var direction = dirAry[randomIndex];
        //可能会出现的道路数据
        var roadData = config.nextRoadProbabilityDic.get(direction);
        //道路概率分布
        var probability = module.ResRoadProbilityData.getDataByCurTime(time);
        var road_p;
        if (module.ResRoadConfigData.getIsCurveRoad(config.id)) {
            road_p = probability.probabilityDic.get(module.ResRoadProbilityData.ATTR_CUR_C);
        }
        else {
            road_p = probability.probabilityDic.get(module.ResRoadProbilityData.ATTR_CUR_S);
        }
        var p_next_c = road_p.get(module.ResRoadProbilityData.ATTR_NEXT_C);
        var p_next_s = road_p.get(module.ResRoadProbilityData.ATTR_NEXT_S);
        var new_road_data = new Laya.Dictionary();
        var new_total_p = 0;
        for (var i = 0; i < roadData.values.length; i++) {
            var new_probility;
            //弯道乘以弯道概率
            if (module.ResRoadConfigData.getIsCurveRoad(roadData.keys[i])) {
                new_probility = roadData.values[i] * p_next_c;
            }
            else { //直道乘以直道概率
                new_probility = roadData.values[i] * p_next_s;
            }
            new_total_p += new_probility;
            new_road_data.set(roadData.keys[i], new_probility);
        }
        var randomNumber;
        var addNumber = 0;
        if (new_total_p <= 0) {
            randomNumber = GameMath.getRandomNumBetween(1, 100);
            for (var i = 0; i < roadData.values.length; i++) {
                addNumber += roadData.values[i];
                if (randomNumber <= addNumber) {
                    nextRoadID = roadData.keys[i];
                    break;
                }
            }
        }
        else {
            randomNumber = GameMath.getRandomNumBetween(1, new_total_p);
            for (var i = 0; i < new_road_data.values.length; i++) {
                addNumber += new_road_data.values[i];
                if (randomNumber <= addNumber) {
                    nextRoadID = new_road_data.keys[i];
                    break;
                }
            }
        }
        return [nextRoadID, direction];
    };
    /**获取指定路段  如果没寻找到 返回空 */
    GameMath.randomSpecificNextRoad = function (specificRoadID, config, disableDir) {
        var nextRoadID;
        var dirAry = [];
        for (var j = 0; j < config.nextRoadDirAry.length; j++) {
            if (config.nextRoadDirAry[j] != disableDir) {
                dirAry.push(config.nextRoadDirAry[j]);
            }
        }
        if (dirAry.length <= 0) {
            console.assert(false, "存在死路");
        }
        var randomIndex = Math.floor(Math.random() * dirAry.length);
        var direction = dirAry[randomIndex];
        var probabilityData = config.nextRoadProbabilityDic.get(direction);
        for (var i = 0; i < specificRoadID.length; i++) {
            var key = specificRoadID[i];
            if (probabilityData.get(key) != null) {
                return [key, direction];
            }
        }
        return null;
    };
    /**
     * 随机获取两个数中间数
     * @param from  起始值(大于等于1整数)
     * @param to 终值（大于等于1整数）
     * @param isRound 是否取整
     */
    GameMath.getRandomNumBetween = function (from, to, isRound) {
        if (isRound === void 0) { isRound = true; }
        var random = Math.floor((Math.random() * (to - from) + from));
        return random;
    };
    /**获取四边形内随机点 */
    GameMath.getRandomPointInQuadRangle = function (left_point0, left_point1, right_point0, right_point1) {
        var randomPoint = new Laya.Point();
        //随机x轴坐标
        var randomX = GameMath.getRandomNumBetween(left_point0.x, right_point0.x);
        var rightAry = Array();
        //确定y范围
        var line0_k = (left_point1.y - left_point0.y) / (left_point1.x - left_point0.x);
        var line0_b = left_point0.y - left_point0.x * line0_k;
        var line1_k = (right_point0.y - right_point1.y) / (right_point0.x - right_point1.x);
        var line1_b = right_point0.y - right_point0.x * line1_k;
        var line2_k = (left_point1.y - right_point1.y) / (left_point1.x - right_point1.x);
        var line2_b = left_point1.y - left_point1.x * line2_k;
        var lineBegin_k = (left_point0.y - right_point0.y) / (left_point0.x - right_point0.x);
        var lineBegin_b = left_point0.y - left_point0.x * lineBegin_k;
        var minY = lineBegin_k * randomX + lineBegin_b;
        var line0_y = line0_k * randomX + line0_b;
        if (line0_y > minY) {
            rightAry.push(line0_y);
        }
        var line1_y = line1_k * randomX + line1_b;
        if (line1_y > minY) {
            rightAry.push(line1_y);
        }
        var line2_y = line2_k * randomX + line2_b;
        if (line2_y > minY) {
            rightAry.push(line2_y);
        }
        rightAry.push(line2_y);
        var maxY = minY;
        for (var i = 0; i < rightAry.length; i++) {
            if (rightAry[i] > maxY) {
                maxY = rightAry[i];
            }
        }
        //随机y轴坐标
        var randomY = GameMath.getRandomNumBetween(minY, maxY);
        randomPoint.setTo(randomX, randomY);
        return randomPoint;
    };
    /**相对于x轴 */
    GameMath.Axis_X = 0;
    /**相对于y轴 */
    GameMath.Axis_Y = 1;
    return GameMath;
}());
//# sourceMappingURL=GameMath.js.map