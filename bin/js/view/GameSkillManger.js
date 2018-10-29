/**
* name
*/
var module;
(function (module) {
    /**游戏技能管理器 */
    var GameSkillManger = /** @class */ (function () {
        /**
         * 构造函数
         * @param ui 视图根节点
         */
        function GameSkillManger(ui) {
            /**技能状态 */
            this._skillStatus = GameSkillManger.SKILL_STATUS_WAIT;
            /**当前使用技能 */
            this._curSkill = GameSkillManger.ERROR_SKILL;
            this._cacheSkill = GameSkillManger.ERROR_SKILL;
            this._ui = ui;
            this._freeSkillID = module.ResSkillConfigData.SKILL_SAW;
            this._ui.visible = false;
            this.initEvent();
        }
        /**移除事件 */
        GameSkillManger.prototype.initEvent = function () {
            manager.EventManager.instance.on(manager.EventManager.REQUSET_FIRE_FREE_SKILL, this, this.onUseFreeSkill);
        };
        /**注册事件 */
        GameSkillManger.prototype.removeEvent = function () {
            manager.EventManager.instance.off(manager.EventManager.REQUSET_FIRE_FREE_SKILL, this, this.onUseFreeSkill);
        };
        /**请求使用免费技能 */
        GameSkillManger.prototype.onUseFreeSkill = function () {
            manager.EventManager.instance.event(manager.EventManager.USE_SKILL, this._freeSkillID);
            this._skillStatus = GameSkillManger.SKILL_STATUS_USING;
        };
        /**尝试使用技能 */
        GameSkillManger.prototype.onTryUseSkill = function () {
            if (this._skillStatus != GameSkillManger.SKILL_STATUS_WAIT) {
                return;
            }
            this._ui.ani1.play(0, true);
            manager.EventManager.instance.event(manager.EventManager.USE_SKILL, this._curSkill);
            this._skillStatus = GameSkillManger.SKILL_STATUS_USING;
        };
        /**更新显示状态 */
        GameSkillManger.prototype.updateStatus = function () {
            if (this._curSkill == GameSkillManger.ERROR_SKILL) {
                this._ui.visible = false;
            }
            else {
                this._ui.visible = true;
            }
        };
        /**技能cd倒计时 */
        GameSkillManger.prototype.countDownCD = function () {
            if (this._curSkill == GameSkillManger.ERROR_SKILL) {
                return;
            }
            this._ui.ani1.stop();
            var config = module.ResSkillConfigData.getDataByID(this._curSkill);
            this._ui.imgSkill.skin = config.url_big_unlock;
            this._ui.imgSkillShade.height = GameSkillManger.SHADE_HEIGHT;
            this._skillStatus = GameSkillManger.SKILL_STATUS_CD;
            var tick = GameSkillManger.SKILL_CD / GameSkillManger.SHADE_HEIGHT;
            Laya.timer.loop(tick, this, this.countDownShade);
        };
        /**倒计时减少遮罩高度 */
        GameSkillManger.prototype.countDownShade = function () {
            this._ui.imgSkillShade.height--;
            if (this._ui.imgSkillShade.height <= 0) {
                Laya.timer.clear(this, this.countDownShade);
                this._skillStatus = GameSkillManger.SKILL_STATUS_WAIT;
                this.onTryUseSkill();
            }
        };
        /**运行技能管理器 */
        GameSkillManger.prototype.run = function (selectSkill) {
            this._curSkill = selectSkill;
            manager.EventManager.instance.on(manager.EventManager.TRY_USE_SKILL, this, this.onTryUseSkill, null);
            manager.EventManager.instance.on(manager.EventManager.USE_SKILL_COMPLETE, this, this.countDownCD);
            this.updateStatus();
            if (this._curSkill != GameSkillManger.ERROR_SKILL) {
                this.countDownCD();
            }
        };
        /**重置 */
        GameSkillManger.prototype.reset = function () {
            this._cacheSkill = this._curSkill;
            this._curSkill = GameSkillManger.ERROR_SKILL;
            manager.EventManager.instance.off(manager.EventManager.TRY_USE_SKILL, this, this.onTryUseSkill);
            manager.EventManager.instance.off(manager.EventManager.USE_SKILL_COMPLETE, this, this.countDownCD);
            this.updateStatus();
            Laya.timer.clearAll(this);
        };
        /**继续开始 */
        GameSkillManger.prototype.continue = function () {
            this._curSkill = this._cacheSkill;
            this._cacheSkill = GameSkillManger.ERROR_SKILL;
            this.run(this._curSkill);
        };
        GameSkillManger.prototype.destroy = function () {
            this.removeEvent();
            this._ui = null;
        };
        /**电锯技能时间 */
        GameSkillManger.SAW_TIME = 7000;
        /**闪电技能时间 */
        GameSkillManger.LIGHTING_TIME = 7000;
        /**时间减速时长 */
        GameSkillManger.SLOW_TIME = 10000;
        /**技能冷却时间 */
        GameSkillManger.SKILL_CD = 10000;
        /**强制创建直道数量 */
        GameSkillManger.FORCE_STRAIGHT_NUM = 10;
        /**双倍僵尸创建次数 */
        GameSkillManger.DOUBLE_MONSTER_TIMES = 3;
        /**遮罩高度 */
        GameSkillManger.SHADE_HEIGHT = 79;
        /**错误技能id */
        GameSkillManger.ERROR_SKILL = -1;
        /**技能冷却中 */
        GameSkillManger.SKILL_STATUS_CD = "skill_status_cd";
        /**技能等待使用中 */
        GameSkillManger.SKILL_STATUS_WAIT = "skill_status_wait";
        /**技能正在使用中 */
        GameSkillManger.SKILL_STATUS_USING = "skill_status_using";
        return GameSkillManger;
    }());
    module.GameSkillManger = GameSkillManger;
})(module || (module = {}));
//# sourceMappingURL=GameSkillManger.js.map