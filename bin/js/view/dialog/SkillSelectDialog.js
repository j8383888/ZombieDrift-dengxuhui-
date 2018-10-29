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
    /**技能选择弹窗 */
    var SkillSelectDialog = /** @class */ (function (_super) {
        __extends(SkillSelectDialog, _super);
        function SkillSelectDialog() {
            var _this = _super.call(this) || this;
            /**选中技能 */
            _this._selectSkill = module.GameSkillManger.ERROR_SKILL;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        SkillSelectDialog.prototype.initView = function () {
            this.tfTip.visible = false;
            this._skillItemAry = new Array();
            this._selectFlagAry = new Array();
            this.tfMoney.text = module.GameDataManager.instance.money.toString();
            var index = 1;
            var isTrue = true;
            while (isTrue) {
                var skillItem = this.getChildByName("skill" + index);
                var flag = this.getChildByName("use" + index);
                var tfName = this.getChildByName("name" + index);
                if (skillItem != null && flag != null) {
                    this._selectFlagAry.push(flag);
                    this._skillItemAry.push(skillItem);
                    flag.visible = false;
                    var config = module.ResSkillConfigData.getDataByID(index);
                    skillItem.imgLock.skin = config.url_small_lock;
                    skillItem.imgUnlock.skin = config.url_small_unlock;
                    tfName.text = config.name;
                    var isHave = module.GameDataManager.instance.isUnlockSkill(index);
                    if (isHave) {
                        skillItem.imgLock.visible = false;
                        skillItem.imgUnlock.visible = true;
                    }
                    else {
                        skillItem.imgLock.visible = true;
                        skillItem.imgUnlock.visible = false;
                    }
                    skillItem.on(Laya.Event.CLICK, this, this.onSkillItemClick, [index]);
                }
                else {
                    isTrue = false;
                }
                index++;
            }
            this.btnClose.clickHandler = Laya.Handler.create(this, this.onClose);
        };
        /**界面关闭 */
        SkillSelectDialog.prototype.onClose = function () {
            manager.SoundPlayMgr.instance.playClick();
            if (this._selectSkill != module.GameSkillManger.ERROR_SKILL) {
                module.GameDataManager.instance.changeMoney(-SkillSelectDialog.SKILL_COST);
            }
            manager.EventManager.instance.event(manager.EventManager.SKILL_SELECT_COMPLETE, [this._selectSkill]);
            module.GameDialogManager.instance.closeSkillSelectDialog();
        };
        /**技能item点击事件 */
        SkillSelectDialog.prototype.onSkillItemClick = function (skillID) {
            manager.SoundPlayMgr.instance.playClick();
            var isHave = module.GameDataManager.instance.isUnlockSkill(skillID);
            //如果拥有技能判断钱够不够
            if (isHave) {
                if (this._selectSkill == skillID) {
                    this._selectSkill = module.GameSkillManger.ERROR_SKILL;
                }
                else {
                    if (SkillSelectDialog.SKILL_COST > module.GameDataManager.instance.money) {
                        this.showTip(SkillSelectDialog.MONEY_NOT_ENOUGH);
                    }
                    else {
                        this._selectSkill = skillID;
                    }
                }
                this.update();
            }
            else { //如果没拥有技能就弹出购买技能
                this.showTip(SkillSelectDialog.PLEASE_UNLOCK);
            }
        };
        SkillSelectDialog.prototype.update = function () {
            for (var i = 0; i < this._selectFlagAry.length; i++) {
                var skillID = i + 1;
                var flag = this._selectFlagAry[i];
                if (this._selectSkill == skillID) {
                    flag.visible = true;
                }
                else {
                    flag.visible = false;
                }
            }
        };
        /**显示提示 */
        SkillSelectDialog.prototype.showTip = function (tip) {
            this.tfTip.visible = true;
            this.tfTip.text = tip;
            Laya.Tween.to(this.tfTip, { alpha: 0 }, 1000, null, Laya.Handler.create(this, function () {
                this.tfTip.visible = false;
                this.tfTip.alpha = 1;
            }));
        };
        SkillSelectDialog.prototype.initEvent = function () {
        };
        SkillSelectDialog.prototype.removeEvent = function () {
        };
        SkillSelectDialog.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            for (var i = 0; i < this._skillItemAry.length; i++) {
                var skillItem = this._skillItemAry[i];
                if (skillItem != null) {
                    skillItem.off(Laya.Event.CLICK, this, this.onSkillItemClick);
                    skillItem.destroy();
                    skillItem = null;
                }
            }
            this._skillItemAry.length = 0;
            this.removeEvent();
            this.removeSelf();
        };
        SkillSelectDialog.PLEASE_UNLOCK = "请在商店解锁";
        SkillSelectDialog.MONEY_NOT_ENOUGH = "金币不足";
        /**单个技能消耗金币数量 */
        SkillSelectDialog.SKILL_COST = 45;
        return SkillSelectDialog;
    }(ui.game.SelectSkillDialogUI));
    module.SkillSelectDialog = SkillSelectDialog;
})(module || (module = {}));
//# sourceMappingURL=SkillSelectDialog.js.map