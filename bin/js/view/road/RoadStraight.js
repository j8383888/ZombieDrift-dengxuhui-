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
    /**直线段路 */
    var RoadStraight = /** @class */ (function (_super) {
        __extends(RoadStraight, _super);
        /**
         * 构造函数
         * @param skinUrl 资源路径
         * @param configData 配置数据
         */
        function RoadStraight(skinUrl, configData, isDoubleMonster) {
            var _this = _super.call(this) || this;
            /**是否创建双倍僵尸 */
            _this.isDoubleMonster = false;
            _this._imgLogo = null;
            _this._imgStart = null;
            _this._imgTap = null;
            _this.configData = configData;
            _this._skinUrl = skinUrl;
            _this.uID = module.RoadManager.instance.createID();
            _this.isDoubleMonster = isDoubleMonster;
            _this.init();
            return _this;
        }
        RoadStraight.prototype.init = function () {
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.collision_points = new Array();
            var isTrue = true;
            var index = RoadStraight.START_POINT_ID;
            while (isTrue) {
                var img = this.getChildByName("point" + index);
                if (img == null) {
                    isTrue = false;
                }
                else {
                    this.collision_points.push(img);
                }
                index++;
            }
            this.check_points = new Array();
            isTrue = true;
            index = 0;
            while (isTrue) {
                var check = this.getChildByName("check" + index);
                if (check == null) {
                    isTrue = false;
                }
                else {
                    this.check_points.push(check);
                }
                index++;
            }
            this.imgRoad.skin = this._skinUrl;
            this.rotation = this.configData.rotation;
            this.createMonster();
            if (this.configData.sourceName == module.ResRoadConfigData.SOURCE_BEGIN0) {
                this._imgStart = new Laya.Image(RoadStraight.URL_START);
                this._imgStart.pos(170, 20);
                this.addChild(this._imgStart);
                this._imgTap = new Laya.Image(RoadStraight.URL_TAP);
                this._imgTap.pos(246, 646);
                this.addChild(this._imgTap);
                this.btnCarShop.visible = true;
                this.clipVoice.visible = true;
                if (module.GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE) {
                    this.clipVoice.index = 1;
                }
                else {
                    this.clipVoice.index = 0;
                }
                manager.EventManager.instance.on(manager.EventManager.CLOSE_VOICE, this, this.closeVoice);
                manager.EventManager.instance.on(manager.EventManager.OPEN_VOICE, this, this.openVoice);
            }
            else {
                this.btnCarShop.visible = false;
                this.clipVoice.visible = false;
            }
            if (this.configData.sourceName == module.ResRoadConfigData.SOURCE_BEGIN1) {
                this._imgLogo = new Laya.Image(RoadStraight.URL_LOGO);
                this._imgLogo.pos(176, 200);
                this.addChild(this._imgLogo);
            }
        };
        RoadStraight.prototype.closeVoice = function () {
            this.clipVoice.index = 0;
        };
        RoadStraight.prototype.openVoice = function () {
            this.clipVoice.index = 1;
        };
        RoadStraight.prototype.onVoiceChange = function () {
            if (this.clipVoice.visible) {
                if (module.GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE) {
                    this.clipVoice.index = 1;
                }
                else {
                    this.clipVoice.index = 0;
                }
            }
        };
        RoadStraight.prototype.onCarShopClick = function (e) {
            e.stopPropagation();
            module.GameDialogManager.instance.openShopDialog();
        };
        RoadStraight.prototype.createMonster = function () {
            var monsterNum = this.isDoubleMonster ? this.configData.monsterNum * 3 : this.configData.monsterNum;
            this.monsterAry = new Array();
            for (var i = 0; i < monsterNum; i++) {
                var monsterData = module.MonsterConfig.getRandomConfig();
                var monster = new module.MonsterItem(monsterData, this.isDoubleMonster);
                var randomX = GameMath.getRandomNumBetween(module.RoadManager.ROAD_WIDTH / 5, module.RoadManager.ROAD_WIDTH / 5 * 4);
                var randomY = GameMath.getRandomNumBetween(module.RoadManager.ROAD_HEIGHT / 5, module.RoadManager.ROAD_HEIGHT / 5 * 4);
                monster.pos(randomX, randomY);
                this.addChild(monster);
                this.monsterAry.push(monster);
            }
        };
        //------------------------------private over------------------------------------------//
        RoadStraight.prototype.tweenHugeMonster = function () {
            var monsterNum = this.monsterAry.length;
            for (var i = 0; i < monsterNum; i++) {
                var monsterData = module.MonsterConfig.getRandomConfig();
                var newMonster = new module.MonsterItem(monsterData, true);
                var randomX = GameMath.getRandomNumBetween(module.RoadManager.ROAD_WIDTH / 5, module.RoadManager.ROAD_WIDTH / 5 * 4);
                var randomY = GameMath.getRandomNumBetween(module.RoadManager.ROAD_HEIGHT / 5, module.RoadManager.ROAD_HEIGHT / 5 * 4);
                newMonster.pos(randomX, randomY);
                this.addChild(newMonster);
                this.monsterAry.push(newMonster);
                var oldMonster = this.monsterAry[i];
                if (!oldMonster.isDead) {
                    oldMonster.tweenHuge();
                }
            }
        };
        /**释放 */
        RoadStraight.prototype.destroy = function () {
            if (this.clipVoice.visible) {
                manager.EventManager.instance.off(manager.EventManager.CLOSE_VOICE, this, this.closeVoice);
                manager.EventManager.instance.off(manager.EventManager.OPEN_VOICE, this, this.openVoice);
            }
            _super.prototype.destroy.call(this);
            this.removeSelf();
            if (this.monsterAry != null) {
                for (var i = 0; i < this.monsterAry.length; i++) {
                    var monster = this.monsterAry[i];
                    if (monster != null) {
                        monster.removeSelf();
                        monster.destroy();
                        monster = null;
                    }
                }
                this.monsterAry.length = 0;
                this.monsterAry = null;
            }
            if (this._imgLogo != null) {
                this._imgLogo.removeSelf();
                this._imgLogo.destroy();
                this._imgLogo = null;
            }
            if (this._imgStart != null) {
                this._imgStart.removeSelf();
                this._imgStart.destroy();
                this._imgStart = null;
            }
            if (this._imgTap != null) {
                this._imgTap.removeSelf();
                this._imgTap.destroy();
                this._imgTap = null;
            }
        };
        RoadStraight.URL_LOGO = "ui/logo.png";
        RoadStraight.URL_START = "ui/start.png";
        RoadStraight.URL_TAP = "ui/tap.png";
        /**碰撞点开始id */
        RoadStraight.START_POINT_ID = 0;
        return RoadStraight;
    }(ui.road.RoadStraightItemUI));
    module.RoadStraight = RoadStraight;
})(module || (module = {}));
//# sourceMappingURL=RoadStraight.js.map