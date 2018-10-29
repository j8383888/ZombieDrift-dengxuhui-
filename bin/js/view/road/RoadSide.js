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
    /**斜直道路 */
    var RoadSide = /** @class */ (function (_super) {
        __extends(RoadSide, _super);
        function RoadSide(skinUrl, configData, isDoubleMonster) {
            var _this = _super.call(this) || this;
            /**是否创建双倍僵尸 */
            _this.isDoubleMonster = false;
            _this.configData = configData;
            _this._skinUrl = skinUrl;
            _this.uID = module.RoadManager.instance.createID();
            _this.isDoubleMonster = isDoubleMonster;
            _this.init();
            return _this;
        }
        /**初始化 */
        RoadSide.prototype.init = function () {
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.collision_points = new Array();
            var isTrue = true;
            var index = 0;
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
        };
        RoadSide.prototype.createMonster = function () {
            var monsterNum = this.isDoubleMonster ? this.configData.monsterNum * 2 : this.configData.monsterNum;
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
        RoadSide.prototype.tweenHugeMonster = function () {
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
        RoadSide.prototype.destroy = function () {
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
        };
        return RoadSide;
    }(ui.road.RoadSideItemUI));
    module.RoadSide = RoadSide;
})(module || (module = {}));
//# sourceMappingURL=RoadSide.js.map