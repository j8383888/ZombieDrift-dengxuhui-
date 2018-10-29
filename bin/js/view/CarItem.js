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
    /**汽车元件 */
    var CarItem = /** @class */ (function (_super) {
        __extends(CarItem, _super);
        /**
         * 构造函数
         * @param carID 汽车配置id
         */
        function CarItem(carID) {
            var _this = _super.call(this) || this;
            /**上一帧所在道路id */
            _this._lastRoadUID = -1;
            /**当前帧所在道路id */
            _this._curRoadUID = -1;
            /**汽车是否在放电 */
            _this._isLighting = false;
            /**是否正在播放尾气动画 */
            _this._isPlayingWheelGas = false;
            _this._carID = carID;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        Object.defineProperty(CarItem.prototype, "isLighting", {
            /**是否正在放电 */
            get: function () {
                return this._isLighting;
            },
            enumerable: true,
            configurable: true
        });
        /**初始化界面 */
        CarItem.prototype.initView = function () {
            this._curRotation = 0;
            this._lastRotation = 0;
            this._check_points = new Laya.Dictionary();
            this._lastPoints = new Laya.Dictionary();
            this._curPoints = new Laya.Dictionary();
            //慢速动画
            this._aniSlowDown = new Laya.Animation();
            this._aniSlowDown.loadAnimation(CarItem.URL_SLOW);
            //碰撞动画
            this._aniCrash = new Laya.Animation();
            this._aniCrash.loadAnimation(CarItem.URL_CRASH);
            this._aniCrash.scale(0.6, 0.6);
            //闪电技能
            this._aniSkillLight = new Laya.Animation();
            this._aniSkillLight.loadAnimation(CarItem.URL_LIGHT);
            //电锯
            this._clipSawLeft = this.clipSawLeft;
            this._clipSawLeft.parent.removeChild(this._clipSawLeft);
            this._clipSawRight = this.clipSawRight;
            this._clipSawRight.parent.removeChild(this._clipSawRight);
            this._wheelGasDic = new Laya.Dictionary();
            this._wheelGasDic.set(module.ResCarConfigData.ATTR_GAS_FRONT_LEFT, this.gas_front_left);
            this._wheelGasDic.set(module.ResCarConfigData.ATTR_GAS_FRONT_RIGHT, this.gas_front_right);
            this._wheelGasDic.set(module.ResCarConfigData.ATTR_GAS_BACK_LEFT, this.gas_back_left);
            this._wheelGasDic.set(module.ResCarConfigData.ATTR_GAS_BACK_RIGHT, this.gas_back_right);
            for (var i = 0; i < CarItem.CHECK_NAME_KEY.length; i++) {
                var point = this.getChildByName(CarItem.CHECK_NAME_KEY[i]);
                var lastPoint = new Laya.Point(0, 0);
                var curPoint = new Laya.Point(0, 0);
                this._lastPoints.set(CarItem.CHECK_NAME_KEY[i], lastPoint);
                this._curPoints.set(CarItem.CHECK_NAME_KEY[i], curPoint);
                this._check_points.set(CarItem.CHECK_NAME_KEY[i], point);
            }
            this.updateCar();
        };
        /**更新汽车 */
        CarItem.prototype.updateCar = function () {
            this._configData = module.ResCarConfigData.getDataByID(this._carID);
            this.clipCar.skin = "car/" + module.ResCarConfigData.CLIP_CAR_PREFIX + this._carID + ".png";
            this.collision_radius = this._configData.collision_radius;
            this.size(this.clipCar.width, this.clipCar.height);
            this.updateCollisionPoints();
            this.updateWheelPoints();
            this.updateWheelGasPoints();
            this.pivot(this.width / 2, this.height / 4);
        };
        /**更新轮胎尾气点 */
        CarItem.prototype.updateWheelGasPoints = function () {
            for (var i = 0; i < this._wheelGasDic.values.length; i++) {
                var aniGas = this._wheelGasDic.values[i];
                aniGas.pos(this._configData[this._wheelGasDic.keys[i]].x, this._configData[this._wheelGasDic.keys[i]].y);
                aniGas.stop();
                if (aniGas.parent != null) {
                    aniGas.parent.removeChild(aniGas);
                }
            }
            this._isPlayingWheelGas = false;
        };
        /**更新碰撞点 */
        CarItem.prototype.updateCollisionPoints = function () {
            var left_up = this._check_points.get(CarItem.POINT_CODE_LEFT_UP);
            left_up.pos(0, 0);
            var left_down = this._check_points.get(CarItem.POINT_CODE_LEFT_DOWN);
            left_down.pos(0, this.height - left_down.height);
            var right_up = this._check_points.get(CarItem.POINT_CODE_RIGHT_UP);
            right_up.pos(this.width - right_up.width, 0);
            var right_down = this._check_points.get(CarItem.POINT_CODE_RIGHT_DOWN);
            right_down.pos(this.width - right_down.width, this.height - right_down.height);
        };
        /**更新轮胎坐标 */
        CarItem.prototype.updateWheelPoints = function () {
            var left_up = this._check_points.get(CarItem.POINT_CODE_WHEEL_LEFT_UP);
            left_up.pos(this._configData.wheel_front_left.x, this._configData.wheel_front_left.y);
            var left_down = this._check_points.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN);
            left_down.pos(this._configData.wheel_back_left.x, this._configData.wheel_back_left.y);
            var right_up = this._check_points.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP);
            right_up.pos(this._configData.wheel_front_right.x, this._configData.wheel_front_right.y);
            var right_down = this._check_points.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN);
            right_down.pos(this._configData.wheel_back_right.x, this._configData.wheel_back_right.y);
        };
        /**移除事件 */
        CarItem.prototype.removeEvent = function () {
            manager.EventManager.instance.off(manager.EventManager.RACE_START, this, this.onRaceStart);
            manager.EventManager.instance.off(manager.EventManager.USE_SKILL, this, this.onUseSkill);
            manager.EventManager.instance.off(manager.EventManager.SELECT_CAR_CHANGE, this, this.onSelectCarChange);
        };
        /**添加事件 */
        CarItem.prototype.initEvent = function () {
            manager.EventManager.instance.on(manager.EventManager.RACE_START, this, this.onRaceStart, null);
            manager.EventManager.instance.on(manager.EventManager.USE_SKILL, this, this.onUseSkill);
            manager.EventManager.instance.on(manager.EventManager.SELECT_CAR_CHANGE, this, this.onSelectCarChange);
        };
        /**变更皮肤 */
        CarItem.prototype.onSelectCarChange = function () {
            var carID = module.GameDataManager.instance.selectCarID;
            if (this._carID == carID) {
                return;
            }
            this._carID = carID;
            this.updateCar();
        };
        /**技能使用监听 */
        CarItem.prototype.onUseSkill = function (skillID) {
            if (skillID == module.ResSkillConfigData.SKILL_LIGHT) {
                this.addLightSkill();
            }
            else if (skillID == module.ResSkillConfigData.SKILL_SAW) {
                this.addSawSkill();
            }
            else if (skillID == module.ResSkillConfigData.SKILL_TIME_SLOW) {
                this.addSlowSkill();
            }
        };
        /**添加慢速道具特效 */
        CarItem.prototype.addSlowSkill = function () {
            this.addChild(this._aniSlowDown);
            this._aniSlowDown.pos(this.width / 2, this.height / 2);
            this._aniSlowDown.play(0, true);
            Laya.timer.once(module.GameSkillManger.SLOW_TIME, this, this.onSlowDownOver);
        };
        /**减速技能结束回调 */
        CarItem.prototype.onSlowDownOver = function () {
            this._aniSlowDown.stop();
            if (this._aniSlowDown.parent != null) {
                this._aniSlowDown.parent.removeChild(this._aniSlowDown);
            }
        };
        /**添加闪电特效道具 */
        CarItem.prototype.addLightSkill = function () {
            manager.SoundPlayMgr.instance.playLight();
            this.parent.addChild(this._aniSkillLight);
            this._aniSkillLight.pos(this.x, this.y);
            this._aniSkillLight.play(0, true);
            this._isLighting = true;
            Laya.timer.once(module.GameSkillManger.LIGHTING_TIME, this, this.onLightPlayOver);
        };
        /**闪电特效播放完成回调 */
        CarItem.prototype.onLightPlayOver = function () {
            this._isLighting = false;
            this._aniSkillLight.stop();
            if (this._aniSkillLight.parent != null) {
                this._aniSkillLight.parent.removeChild(this._aniSkillLight);
            }
            manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
        };
        /**添加电锯道具 */
        CarItem.prototype.addSawSkill = function () {
            var configData = module.ResCarConfigData.getDataByID(this._carID);
            this.collision_radius *= 2;
            this.addChildAt(this._clipSawLeft, 0);
            this._clipSawLeft.pos(configData.saw.x, configData.saw.y);
            this.addChildAt(this._clipSawRight, 0);
            this._clipSawRight.pos(configData.saw.x, configData.saw.y);
            this._clipSawLeft.rotation = -90;
            this._clipSawRight.rotation = 90;
            Laya.timer.frameLoop(1, this, this.loopSawClip);
            Laya.Tween.to(this._clipSawRight, { rotation: 0 }, 500);
            Laya.Tween.to(this._clipSawLeft, { rotation: 0 }, 500);
            Laya.timer.once(module.GameSkillManger.SAW_TIME, this, this.onSawSkillOver);
            manager.SoundPlayMgr.instance.playSawLoop();
        };
        /**定时播放电锯动画 */
        CarItem.prototype.loopSawClip = function () {
            var curIndex = this._clipSawLeft.index;
            curIndex = curIndex >= CarItem.SAW_MAX_INDEX ? 0 : curIndex + 1;
            this._clipSawRight.index = curIndex;
            this._clipSawLeft.index = curIndex;
        };
        /**电锯技能完毕 */
        CarItem.prototype.onSawSkillOver = function () {
            var configData = module.ResCarConfigData.getDataByID(this._carID);
            this.collision_radius = configData.collision_radius;
            manager.SoundPlayMgr.instance.stopSaw();
            Laya.timer.clear(this, this.loopSawClip);
            Laya.timer.clear(this, this.onSawSkillOver);
            this._clipSawLeft.parent.removeChild(this._clipSawLeft);
            this._clipSawRight.parent.removeChild(this._clipSawRight);
            manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
        };
        /**比赛开始监听 */
        CarItem.prototype.onRaceStart = function () {
            Laya.timer.loop(CarItem.INTERVAL, this, this.playClip);
        };
        /**播放汽车循环动画 */
        CarItem.prototype.playClip = function () {
            var curIndex = this.clipCar.index;
            curIndex = curIndex >= CarItem.CLIP_MAX_INDEX ? 0 : curIndex + 1;
            this.clipCar.index = curIndex;
        };
        /**撞毁动画播放完成回调 */
        CarItem.prototype.onAniCrashPlayOver = function () {
            manager.SoundPlayMgr.instance.stopExplosion();
            if (this._aniCrash.parent != null) {
                this._aniCrash.parent.removeChild(this._aniCrash);
            }
            manager.EventManager.instance.event(manager.EventManager.CRASH_PLAY_OVER);
        };
        /**移除汽车烧胎气体 */
        CarItem.prototype.removeGasFromParent = function () {
            for (var i = 0; i < this._wheelGasDic.values.length; i++) {
                var aniGas = this._wheelGasDic.values[i];
                aniGas.stop();
                if (aniGas.parent != null) {
                    aniGas.parent.removeChild(aniGas);
                }
            }
        };
        CarItem.prototype.tryRemoveAni = function () {
            if (this._aniSkillLight.parent != null) {
                this._aniSkillLight.stop();
                this._aniSkillLight.parent.removeChild(this._aniSkillLight);
            }
            if (this._clipSawLeft != null && this._clipSawLeft.parent != null) {
                this.onSawSkillOver();
            }
            if (this._aniSlowDown.parent != null) {
                this._aniSlowDown.stop();
                this._aniSlowDown.parent.removeChild(this._aniSlowDown);
            }
            this.removeGasFromParent();
        };
        /**撞毁 */
        CarItem.prototype.crash = function () {
            manager.SoundPlayMgr.instance.playExplosionLoop();
            this.tryRemoveAni();
            Laya.timer.clear(this, this.playClip);
            if (this._aniCrash != null) {
                this._aniCrash.pos(this.x, this.y);
                this.parent.addChild(this._aniCrash);
                this._aniCrash.once(Laya.Event.COMPLETE, this, this.onAniCrashPlayOver);
                this._aniCrash.play(0, false);
            }
        };
        /**更新汽车本地坐标及旋转 */
        CarItem.prototype.updateData = function (rotation, road) {
            for (var i = 0; i < this._curPoints.values.length; i++) {
                var key = this._curPoints.keys[i];
                var curPoint = this._curPoints.values[i];
                var lastPoint = this._lastPoints.get(key);
                lastPoint.setTo(curPoint.x, curPoint.y);
                var point = this._check_points.get(key);
                var globPoint = this.toParentPoint(new Laya.Point(point.x, point.y));
                var pointInRoad = road["globalToLocal"](globPoint, false);
                curPoint.setTo(pointInRoad.x, pointInRoad.y);
            }
            this._lastRotation = this._curRotation;
            this._curRotation = rotation;
            this._lastRoadUID = this._curRoadUID;
            this._curRoadUID = road.uID;
        };
        /**获取两次rotation差值 */
        CarItem.prototype.getIsExistDrift = function () {
            var isExist = false;
            if (Math.abs(this._curRotation - this._lastRotation) > CarItem.FRAME_ROTATION) {
                isExist = true;
            }
            return isExist;
        };
        CarItem.prototype.reset = function () {
            if (this._aniCrash.parent != null) {
                this._aniCrash.parent.removeChild(this._aniCrash);
            }
            if (this._aniSkillLight.parent != null) {
                this._aniSkillLight.parent.removeChild(this._aniSkillLight);
            }
            this.removeGasFromParent();
            this.rotation = 0;
            this._lastRotation = 0;
            this._curRotation = 0;
        };
        /**尝试停止播放尾气动画 */
        CarItem.prototype.tryStopWheelGas = function () {
            if (this._isPlayingWheelGas) {
                manager.SoundPlayMgr.instance.stopSkid();
                for (var i = 0; i < this._wheelGasDic.values.length; i++) {
                    var aniGas = this._wheelGasDic.values[i];
                    aniGas.stop();
                    if (aniGas.parent != null) {
                        aniGas.parent.removeChild(aniGas);
                    }
                }
                this._isPlayingWheelGas = false;
            }
        };
        /**播放尾气动画 */
        CarItem.prototype.tryPlayWheelGas = function () {
            if (this._isPlayingWheelGas) {
                return;
            }
            manager.SoundPlayMgr.instance.playSkidLoop();
            for (var i = 0; i < this._wheelGasDic.values.length; i++) {
                var aniGas = this._wheelGasDic.values[i];
                this.addChildAt(aniGas, 0);
                aniGas.play(0, true);
            }
            this._isPlayingWheelGas = true;
        };
        /**绘制轮胎印 */
        CarItem.prototype.drawTyleSkid = function (road, isRunOverMonster) {
            if (this._curRoadUID != this._lastRoadUID) {
                //汽车在两个道路切换处会存在计算误差  先不计算着部分的坐标转换
                return;
            }
            var color = isRunOverMonster ? CarItem.COLOR_WHEEL_OVER_MONSTER : CarItem.COLOR_WHEEL_NORMAL;
            //TODO  碾过怪物  绘制红色  没碾过绘制黑色轮胎印				
            var front_left_sprite = new Laya.Sprite();
            front_left_sprite.graphics.drawLine(this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).x, this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).y, this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).x, this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).y, color, CarItem.TYLE_WIDTH);
            front_left_sprite.alpha = 0.7;
            road['addChild'](front_left_sprite);
            var front_right_sprite = new Laya.Sprite();
            front_right_sprite.graphics.drawLine(this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).x, this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).y, this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).x, this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).y, color, CarItem.TYLE_WIDTH);
            front_right_sprite.alpha = 0.7;
            road['addChild'](front_right_sprite);
            var back_left_sprite = new Laya.Sprite();
            back_left_sprite.graphics.drawLine(this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).x, this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).y, this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).x, this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).y, color, CarItem.TYLE_WIDTH);
            back_left_sprite.alpha = 0.7;
            road['addChild'](back_left_sprite);
            var back_right_sprite = new Laya.Sprite();
            back_right_sprite.graphics.drawLine(this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).x, this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).y, this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).x, this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).y, color, CarItem.TYLE_WIDTH);
            back_right_sprite.alpha = 0.7;
            road['addChild'](back_right_sprite);
        };
        Object.defineProperty(CarItem.prototype, "configData", {
            get: function () {
                return this._configData;
            },
            enumerable: true,
            configurable: true
        });
        CarItem.prototype.getLastPoint = function (pointCode) {
            return this._lastPoints.get(pointCode);
        };
        CarItem.prototype.getCurPoint = function (pointCode) {
            return this._curPoints.get(pointCode);
        };
        CarItem.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        /**播放间隔 */
        CarItem.INTERVAL = 100;
        /**默认id */
        CarItem.DEFAULT_ID = 1;
        /**汽车帧速度 */
        CarItem.CAR_MIN_SPEED = 18;
        /**汽车最低速度 */
        CarItem.CAR_MAX_SPEED = 28; //30
        /**帧转向 */
        CarItem.FRAME_ROTATION = 0.8; //0.8
        /**最大index */
        CarItem.CLIP_MAX_INDEX = 3;
        /**电锯clip最大index */
        CarItem.SAW_MAX_INDEX = 5;
        /**撞毁动画资源路径 */
        CarItem.URL_CRASH = "effect/blow.ani";
        /**技能闪电效果 */
        CarItem.URL_LIGHT = "effect/shandian.ani";
        /**尾气特效 */
        CarItem.URL_TAIL = "effect/weiqi.ani";
        /**慢速特效 */
        CarItem.URL_SLOW = "effect/animation_quan.ani";
        CarItem.COLOR_WHEEL_NORMAL = "#000000";
        CarItem.COLOR_WHEEL_OVER_MONSTER = "#407434";
        /**轮胎印宽度 */
        CarItem.TYLE_WIDTH = 10;
        CarItem.POINT_CODE_RIGHT_UP = "right_up";
        CarItem.POINT_CODE_RIGHT_DOWN = "right_down";
        CarItem.POINT_CODE_LEFT_UP = "left_up";
        CarItem.POINT_CODE_LEFT_DOWN = "left_down";
        CarItem.POINT_CODE_WHEEL_RIGHT_UP = "wheel_right_up";
        CarItem.POINT_CODE_WHEEL_RIGHT_DOWN = "wheel_right_down";
        CarItem.POINT_CODE_WHEEL_LEFT_UP = "wheel_left_up";
        CarItem.POINT_CODE_WHEEL_LEFT_DOWN = "wheel_left_down";
        CarItem.CHECK_NAME_KEY = ["right_up", "right_down", "left_up", "left_down", "wheel_right_up",
            "wheel_right_down", "wheel_left_up", "wheel_left_down"];
        return CarItem;
    }(ui.game.CarItemUI));
    module.CarItem = CarItem;
})(module || (module = {}));
//# sourceMappingURL=CarItem.js.map