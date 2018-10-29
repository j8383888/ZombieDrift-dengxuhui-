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
    /**怪物item */
    var MonsterItem = /** @class */ (function (_super) {
        __extends(MonsterItem, _super);
        /**
         * 构造函数
         */
        function MonsterItem(configData, isHuge) {
            var _this = _super.call(this) || this;
            /**是否被撞死 */
            _this._isDead = false;
            /**是否变大 */
            _this._isHuge = false;
            _this._isHuge = isHuge;
            _this._configData = configData;
            _this.init();
            return _this;
        }
        Object.defineProperty(MonsterItem.prototype, "collision_radius", {
            get: function () {
                return this._collision_radius;
            },
            enumerable: true,
            configurable: true
        });
        /**初始化 */
        MonsterItem.prototype.init = function () {
            this._isDead = false;
            this.update();
            this._imgCrush = new Laya.Image();
            this._imgCrush.skin = module.MonsterConfig.ROOT_PATH + this._configData[module.MonsterConfig.CRUSH_SKIN];
            this.addChild(this._imgCrush);
            this._clipMonster = new Laya.Clip();
            this._clipMonster.skin = module.MonsterConfig.ROOT_PATH +
                module.MonsterConfig.MONSTER_PREFIX + this._configData[module.MonsterConfig.ID] + module.MonsterConfig.MONSTER_SUFFIX;
            this._clipMonster.clipX = this._configData[module.MonsterConfig.CLIP_X];
            this._clipMonster.clipY = this._configData[module.MonsterConfig.CLIP_Y];
            this.addChild(this._clipMonster);
            this._maxClipIndex = (this._configData[module.MonsterConfig.CLIP_X] - 1) * this._configData[module.MonsterConfig.CLIP_Y];
            this.changeVisible();
            this.anchorX = 0.5;
            this.anchorY = 0.5;
        };
        MonsterItem.prototype.update = function () {
            if (this._isHuge) {
                this._collision_radius = this._configData[module.MonsterConfig.COLLISION_RADIUS] * MonsterItem.HUGE;
                this.scale(MonsterItem.HUGE, MonsterItem.HUGE);
            }
            else {
                this._collision_radius = this._configData[module.MonsterConfig.COLLISION_RADIUS];
            }
        };
        /**更新显示状态 */
        MonsterItem.prototype.changeVisible = function () {
            if (this._isDead) {
                this._imgCrush.visible = true;
                this.stopPlay();
                this._clipMonster.visible = false;
            }
            else {
                this._imgCrush.visible = false;
                this._clipMonster.visible = true;
                this.playAni();
            }
        };
        /**停止播放 */
        MonsterItem.prototype.stopPlay = function () {
            Laya.timer.clear(this, this.loopClip);
        };
        /**定时循环播放帧动画 */
        MonsterItem.prototype.loopClip = function () {
            var curIndex = this._clipMonster.index;
            curIndex = curIndex >= this._maxClipIndex ? 0 : curIndex + 1;
            this._clipMonster.index = curIndex;
        };
        //-----------------------------------------public----------------------------------//
        MonsterItem.prototype.tweenHuge = function () {
            this._isHuge = true;
            this.update();
        };
        Object.defineProperty(MonsterItem.prototype, "isDead", {
            /**是否已经死亡 */
            get: function () {
                return this._isDead;
            },
            enumerable: true,
            configurable: true
        });
        /**播放怪物动画 */
        MonsterItem.prototype.playAni = function () {
            Laya.timer.loop(1000, this, this.loopClip, null);
        };
        /**死亡 */
        MonsterItem.prototype.dead = function () {
            this._isDead = true;
            this.changeVisible();
        };
        /**释放 */
        MonsterItem.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this._clipMonster != null) {
                this._clipMonster.removeSelf();
                this._clipMonster.destroy();
                this._clipMonster = null;
            }
            if (this._imgCrush != null) {
                this._imgCrush.removeSelf();
                this._imgCrush.destroy();
                this._imgCrush = null;
            }
            this._configData = null;
        };
        MonsterItem.HUGE = 1.8;
        /**怪物单位移动速度 */
        MonsterItem.MOVE_SPEED = 0.2;
        return MonsterItem;
    }(laya.ui.Component));
    module.MonsterItem = MonsterItem;
})(module || (module = {}));
//# sourceMappingURL=MonsterItem.js.map