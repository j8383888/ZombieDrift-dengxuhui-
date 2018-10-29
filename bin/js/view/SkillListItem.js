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
    /**技能列表item */
    var SkillListItem = /** @class */ (function (_super) {
        __extends(SkillListItem, _super);
        function SkillListItem(id) {
            var _this = _super.call(this) || this;
            _this._configID = id;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        SkillListItem.prototype.initView = function () {
            var configData = module.ResSkillConfigData.getDataByID(this._configID);
            this.imgLock.skin = configData.url_small_lock;
            this.imgUnlock.skin = configData.url_small_unlock;
            this.updateStatus();
        };
        SkillListItem.prototype.initEvent = function () {
        };
        /**更新显示状态 */
        SkillListItem.prototype.updateStatus = function () {
            var isHave = module.GameDataManager.instance.isUnlockSkill(this._configID);
            if (isHave) {
                this.imgLock.visible = false;
                this.imgUnlock.visible = true;
            }
            else {
                this.imgLock.visible = true;
                this.imgUnlock.visible = false;
            }
        };
        SkillListItem.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(SkillListItem.prototype, "configID", {
            get: function () {
                return this._configID;
            },
            enumerable: true,
            configurable: true
        });
        return SkillListItem;
    }(ui.game.SkillListItemUI));
    module.SkillListItem = SkillListItem;
})(module || (module = {}));
//# sourceMappingURL=SkillListItem.js.map