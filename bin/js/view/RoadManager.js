/**
* name
*/
var module;
(function (module) {
    /**游戏道路管理器 */
    var RoadManager = /** @class */ (function () {
        /**构造函数 */
        function RoadManager() {
            /**唯一id */
            this._uID = 0;
            /**下个路块 */
            this._nextRoadID = "";
            /**下个路块相对方向 */
            this._nextRoadDir = "";
            /**当前不可选方向 */
            this._disableDir = "";
            /**移动速度 */
            this._moveSpeed = module.CarItem.CAR_MIN_SPEED;
            /**是否正在缓慢移动 */
            this._isSlowing = false;
            /**运行时间 */
            this._time = 0;
            this._globPoint = new Laya.Point();
            this.init();
        }
        RoadManager.prototype.init = function () {
            this._uID = 0;
            this._moreMonsterTimes = 0;
            this._roadBgColorDic = new Laya.Dictionary();
            this._roadBgColorDic.set(ROAD_STYLE.STYLE0, "#006a5d");
            this._roadBgColorDic.set(ROAD_STYLE.STYLE1, "#fcba2e");
            this._roadBgColorDic.set(ROAD_STYLE.STYLE2, "#004475");
            this._roadBgColorDic.set(ROAD_STYLE.STYLE3, "#418975");
            this._roadBgColorDic.set(ROAD_STYLE.STYLE4, "#5abde6");
            this._roadBgColorDic.set(ROAD_STYLE.STYLE5, "#004475");
            this._assetPath = new Array();
            this._roadAry = new Array();
            this._cacheData = new Array();
            this._moveSpeed = module.CarItem.CAR_MIN_SPEED;
            this._roadRotationLayer = new Laya.Component();
            this._roadRotationLayer.size(Laya.stage.width, Laya.stage.height);
            manager.LayerManager.instace.addToLayer(this._roadRotationLayer, manager.LayerManager.STAGE_ROAD_LAYER);
            this._roadContent = new Laya.Component();
            this._roadRotationLayer.addChild(this._roadContent);
            this._roadCreator = new module.RoadCreator();
            manager.EventManager.instance.on(manager.EventManager.USE_SKILL, this, this.onUseSkill);
        };
        /**使用减速技能 */
        RoadManager.prototype.onUseSkill = function (skillID) {
            if (skillID == module.ResSkillConfigData.SKILL_TIME_SLOW) {
                this._moveSpeed = this._moveSpeed / 2;
                this._isSlowing = true;
                Laya.timer.once(module.GameSkillManger.SLOW_TIME, this, function () {
                    this._moveSpeed = this._moveSpeed * 2;
                    this._isSlowing = false;
                    manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
                });
            }
            else if (skillID == module.ResSkillConfigData.SKILL_ZOMBIES) {
                this._moreMonsterTimes = module.GameSkillManger.DOUBLE_MONSTER_TIMES;
            }
        };
        /**清空当前道路 */
        RoadManager.prototype.clearCurRoad = function () {
            if (this._roadAry == null || this._roadAry.length <= 0) {
                return;
            }
            for (var i = 0; i < this._roadAry.length; i++) {
                var road = this._roadAry[i];
                if (road != null) {
                    road.destroy();
                    road = null;
                }
            }
            this._roadAry.length = 0;
            for (var i = 0; i < this._assetPath.length; i++) {
                Laya.loader.clearRes(this._assetPath[i]);
            }
            this._assetPath.length = 0;
        };
        /**根据配置文件创建道路 */
        RoadManager.prototype.createRoad = function (configData) {
            var road;
            var assetNum = module.ResRoadConfigData.getRoadAssetNum(module.GameDataManager.instance.roadStyle, configData.sourceName);
            var randomID = Math.floor(Math.random() * assetNum);
            var assetName = configData.sourceName + "_" + randomID;
            var assetPath = module.ResRoadConfigData.getRoadAssetPath(module.GameDataManager.instance.roadStyle, assetName);
            if (this._moreMonsterTimes > 0) {
                road = this._roadCreator.createRoad(assetPath, configData, true);
                this._moreMonsterTimes--;
                if (this._moreMonsterTimes <= 0) {
                    manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
                }
            }
            else {
                road = this._roadCreator.createRoad(assetPath, configData, false);
            }
            if (this._assetPath.indexOf(assetPath) == -1) {
                this._assetPath.push(assetPath);
            }
            return road;
        };
        RoadManager.prototype.loopTime = function () {
            this._time++;
        };
        RoadManager.prototype.clearTime = function () {
            Laya.timer.clear(this, this.loopTime);
            this._time = 0;
        };
        //-------------------------------------public------------------------------------//
        RoadManager.prototype.startTimer = function () {
            Laya.timer.loop(1000, this, this.loopTime);
        };
        /**清空当前道路 */
        RoadManager.prototype.clear = function () {
            this.clearTime();
            this.clearCurRoad();
            this._moreMonsterTimes = 0;
            this._cacheData.length = 0;
            this._isSlowing = false;
            this._roadRotationLayer.rotation = 0;
            this._roadContent.x = 0;
            this._roadContent.y = 0;
            this._nextRoadDir = "";
            this._nextRoadID = "";
            this._disableDir = "";
            this._moveSpeed = module.CarItem.CAR_MIN_SPEED;
        };
        /**旋转道路 */
        RoadManager.prototype.rotationRoad = function (direction) {
            switch (direction) {
                case DIRECTION.RIGHT:
                    {
                        this._roadRotationLayer.rotation -= RoadManager.UNIT_ROTATION;
                        break;
                    }
                case DIRECTION.LEFT:
                    {
                        this._roadRotationLayer.rotation += RoadManager.UNIT_ROTATION;
                        break;
                    }
                default:
                    console.assert(false, "错误方向");
                    break;
            }
        };
        Object.defineProperty(RoadManager.prototype, "roadRotation", {
            /**获取道路旋转角度 */
            get: function () {
                return this._roadRotationLayer.rotation;
            },
            enumerable: true,
            configurable: true
        });
        /**获取 */
        RoadManager.prototype.getRoadBgColor = function (roadStyle) {
            if (this._roadBgColorDic.indexOf(roadStyle) != -1) {
                return this._roadBgColorDic.get(roadStyle);
            }
            else {
                console.assert(false, "style输入错误");
                return "";
            }
        };
        /**随机道路风格 */
        RoadManager.prototype.randomRoadStyle = function () {
            return Math.floor(Math.random() * this._roadBgColorDic.keys.length);
        };
        /**更新道路 */
        RoadManager.prototype.addRoad = function () {
            var lastX;
            var lastY;
            if (this._nextRoadID == "") {
                this.clearCurRoad();
                this._nextRoadID = module.ResRoadConfigData.DATA_KEY[0];
                this._nextRoadDir = module.ResRoadConfigData.RELATIVE_UP;
                this._disableDir = module.ResRoadTool.getDisableDir(this._nextRoadDir, this._nextRoadID);
                lastX = Laya.stage.width / 2;
                lastY = Laya.stage.height + RoadManager.ROAD_HEIGHT / 2;
            }
            else {
                lastX = this._roadAry[this._roadAry.length - 1]["x"];
                lastY = this._roadAry[this._roadAry.length - 1]["y"];
            }
            var needNum = RoadManager.ONCE_CREATE_NUM;
            while (needNum > 0) {
                this._disableDir = module.ResRoadTool.getDisableDir(this._nextRoadDir, this._nextRoadID);
                if (this._disableDir == "error") {
                    console.assert(false);
                }
                var config = module.ResRoadConfigData.getDataByID(this._nextRoadID);
                var road = this.createRoad(config);
                switch (this._nextRoadDir) {
                    //正上方
                    case module.ResRoadConfigData.RELATIVE_UP:
                        {
                            road.x = lastX;
                            road.y = lastY - RoadManager.ROAD_HEIGHT + RoadManager.INTERVAL_CORRECT;
                            break;
                        }
                    //正下方					
                    case module.ResRoadConfigData.RELATIVE_DOWN:
                        {
                            road.x = lastX;
                            road.y = lastY + RoadManager.ROAD_HEIGHT - RoadManager.INTERVAL_CORRECT;
                            break;
                        }
                    //正左
                    case module.ResRoadConfigData.RELATIVE_LEFT:
                        {
                            road.x = lastX - RoadManager.ROAD_WIDTH + RoadManager.INTERVAL_CORRECT;
                            road.y = lastY;
                            break;
                        }
                    //正右
                    case module.ResRoadConfigData.RELATIVE_RIGHT:
                        {
                            road.x = lastX + RoadManager.ROAD_WIDTH - RoadManager.INTERVAL_CORRECT;
                            road.y = lastY;
                            break;
                        }
                    //左上
                    case module.ResRoadConfigData.RELATIVE_LEFT_UP:
                        {
                            road.x = lastX - RoadManager.ROAD_WIDTH / 2 + RoadManager.INTERVAL_CORRECT / 2;
                            road.y = lastY - RoadManager.ROAD_HEIGHT / 2 + RoadManager.INTERVAL_CORRECT / 2;
                            break;
                        }
                    //右上
                    case module.ResRoadConfigData.RELATIVE_RIGHT_UP:
                        {
                            road.x = lastX + RoadManager.ROAD_WIDTH / 2 - RoadManager.INTERVAL_CORRECT / 2;
                            road.y = lastY - RoadManager.ROAD_HEIGHT / 2 + RoadManager.INTERVAL_CORRECT / 2;
                            break;
                        }
                    //左下
                    case module.ResRoadConfigData.RELATIVE_LEFT_DOWN:
                        {
                            road.x = lastX - RoadManager.ROAD_WIDTH / 2 + RoadManager.INTERVAL_CORRECT / 2;
                            road.y = lastY + RoadManager.ROAD_HEIGHT / 2 - RoadManager.INTERVAL_CORRECT / 2;
                            break;
                        }
                    //右下
                    case module.ResRoadConfigData.RELATIVE_RIGHT_DOWN:
                        {
                            road.x = lastX + RoadManager.ROAD_WIDTH / 2 - RoadManager.INTERVAL_CORRECT / 2;
                            road.y = lastY + RoadManager.ROAD_HEIGHT / 2 - RoadManager.INTERVAL_CORRECT / 2;
                            break;
                        }
                    default:
                        console.assert(false, "道路相对位置配置错误");
                        break;
                }
                lastX = road.x;
                lastY = road.y;
                var nextData = GameMath.randomNextRoad(config, this._disableDir, this._time);
                this._nextRoadID = nextData[0];
                this._nextRoadDir = nextData[1];
                this._roadAry.push(road);
                this._roadContent.addChildAt(road, 0);
                needNum--;
            }
        };
        /**尝试更新道路 */
        RoadManager.prototype.tryUpdateRoad = function (carInRoad) {
            var index = this._roadAry.indexOf(carInRoad);
            if (index == -1) {
                console.assert(false, "未找到对应道路");
            }
            //1.更新移动速度
            if (!this._isSlowing) {
                this._moveSpeed = this._moveSpeed >= module.CarItem.CAR_MAX_SPEED ? this._moveSpeed : (this._moveSpeed + 0.001);
            }
            //2.删除道路
            if (index + 1 >= RoadManager.KEEP_ROAD_NUM) {
                var delNumber = index + 1 - RoadManager.KEEP_ROAD_NUM;
                if (delNumber > 0) {
                    for (var i = 0; i < delNumber; i++) {
                        this._roadAry[i].destroy();
                        this._roadAry[i] = null;
                    }
                    this._roadAry.splice(0, delNumber);
                    index -= delNumber;
                }
            }
            //3.如果当前存在变大僵尸 则更新接下来道路僵尸
            if (this._moreMonsterTimes > 0) {
                for (var i = index; i < this._roadAry.length; i++) {
                    var road = this._roadAry[i];
                    if (road != null) {
                        road.tweenHugeMonster();
                        this._moreMonsterTimes--;
                    }
                    else {
                        console.assert(false);
                    }
                    if (this._moreMonsterTimes <= 0) {
                        manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
                        break;
                    }
                }
            }
            var curRoadToEndRoadNum = this._roadAry.length - index - 1;
            if (curRoadToEndRoadNum <= RoadManager.ONCE_CREATE_NUM) {
                this.addRoad();
            }
            for (var i = 0; i < this._roadAry.length; i++) {
                if (i != index) {
                    this._roadAry[i]["cacheAs"] = "bitmap";
                }
                else {
                    this._roadAry[i]["cacheAs"] = "none";
                }
            }
        };
        /**移动道路 */
        RoadManager.prototype.moveRoad = function (carRotation) {
            var moveY = this._moveSpeed * Math.cos((this._roadRotationLayer.rotation - carRotation) / 180 * Math.PI);
            var moveX = this._moveSpeed * Math.sin((this._roadRotationLayer.rotation - carRotation) / 180 * Math.PI);
            var lastData = this._roadContent.x + "," + this._roadContent.y + "," + this._roadContent.rotation + "," + carRotation;
            if (this._cacheData.length >= RoadManager.MAX_CACHE) {
                this._cacheData.shift();
            }
            this._cacheData.push(lastData);
            this._roadContent.y += moveY;
            this._roadContent.x += moveX;
            // console.log(this._roadContent.rotation);			
            // console.log("道路容器X：" + this._roadContent.x + "道路容器Y：" + this._roadContent.y);
        };
        Object.defineProperty(RoadManager.prototype, "moveSpeed", {
            /**移动速度 */
            get: function () {
                return this._moveSpeed;
            },
            enumerable: true,
            configurable: true
        });
        /**缓慢增速 */
        RoadManager.prototype.slowUpSpeed = function () {
            this._tempSpeed = this._moveSpeed;
            this._moveSpeed = 1;
            this._isSlowing = true;
            Laya.timer.frameLoop(3, this, this.frameSlowUp);
        };
        RoadManager.prototype.frameSlowUp = function () {
            this._moveSpeed += 0.5;
            if (this._moveSpeed >= this._tempSpeed) {
                Laya.timer.clear(this, this.frameSlowUp);
                this._isSlowing = false;
            }
        };
        /**移动怪物 */
        RoadManager.prototype.moveMonster = function (centerRoad, carInRoadPoint) {
            for (var i = 0; i < centerRoad.monsterAry.length; i++) {
                var monster = centerRoad.monsterAry[i];
                if (!monster.isDead) {
                    var angele = GameMath.getAngle(monster.x, monster.y, carInRoadPoint.x, carInRoadPoint.y, GameMath.Axis_Y);
                    monster.rotation = angele;
                    var long_X = module.MonsterItem.MOVE_SPEED * Math.sin(angele / 180 * Math.PI);
                    var long_Y = module.MonsterItem.MOVE_SPEED * Math.cos(angele / 180 * Math.PI);
                    monster.x += long_X;
                    monster.y += long_Y;
                }
            }
        };
        /**通过汽车全局坐标获取汽车在哪一块地块上 */
        RoadManager.prototype.getCarInWhichRoad = function (carGlobX, carGlobY) {
            var rightRoad = null;
            this._globPoint.setTo(carGlobX, carGlobY);
            this._globPoint = this._roadContent.globalToLocal(this._globPoint, false);
            // console.log("X:" + this._globPoint.x + " Y:" + this._globPoint.y);
            for (var i = 0; i < this._roadAry.length; i++) {
                var road = this._roadAry[i];
                if ((road['x'] - road['width'] / 2) <= this._globPoint.x &&
                    (road['x'] + road['width'] / 2) >= this._globPoint.x &&
                    (road['y'] + road['height'] / 2) >= this._globPoint.y &&
                    (road['y'] - road['height'] / 2) <= this._globPoint.y) {
                    rightRoad = road;
                    break;
                }
            }
            return rightRoad;
        };
        /**将道路位置回退 */
        RoadManager.prototype.rollBackRoadPos = function () {
            var lastData = this._cacheData[0];
            var lastDataAry = lastData.split(",");
            this._roadContent.x = parseInt(lastDataAry[0]);
            this._roadContent.y = parseInt(lastDataAry[1]);
            this._roadContent.rotation = parseInt(lastDataAry[2]);
            return parseInt(lastDataAry[3]);
        };
        /**设置旋转中心 */
        RoadManager.prototype.changeRotationPivot = function (carX, carY) {
            this._roadRotationLayer.pivotX = carX;
            this._roadRotationLayer.pivotY = carY;
            this._roadRotationLayer.pos(carX, carY);
        };
        /**创建道路唯一id */
        RoadManager.prototype.createID = function () {
            return this._uID++;
        };
        Object.defineProperty(RoadManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new RoadManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**间隙修正 */
        RoadManager.INTERVAL_CORRECT = 1;
        /**最大缓存帧道路坐标 */
        RoadManager.MAX_CACHE = 18;
        /**单位旋转角度 */
        RoadManager.UNIT_ROTATION = 0.8;
        /**道路宽度 */
        RoadManager.ROAD_WIDTH = 720;
        /**道路高度 */
        RoadManager.ROAD_HEIGHT = 720;
        /**单次创建道路数量 */
        RoadManager.ONCE_CREATE_NUM = 3;
        /**保留在舞台上的道路数量  汽车走过之后的道路*/
        RoadManager.KEEP_ROAD_NUM = 4;
        return RoadManager;
    }());
    module.RoadManager = RoadManager;
})(module || (module = {}));
//# sourceMappingURL=RoadManager.js.map