/**
* name
*/
var module;
(function (module) {
    /**
     * 游戏弹窗管理中心
     */
    var GameDialogManager = /** @class */ (function () {
        function GameDialogManager() {
            /**打开中的弹窗数量 */
            this._openDialogNum = 0;
            UIConfig.closeDialogOnSide = false;
        }
        Object.defineProperty(GameDialogManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameDialogManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**打开继续游戏弹窗 */
        GameDialogManager.prototype.openContinueDialog = function () {
            if (this._continueDialog != null) {
                return;
            }
            this._openDialogNum++;
            this._continueDialog = new module.ContinueGameDialog();
            this._continueDialog.show(false, true);
            this._continueDialog.startCountDown();
        };
        /**关闭继续游戏弹窗 */
        GameDialogManager.prototype.closeContinueDialog = function () {
            if (this._continueDialog != null) {
                this._openDialogNum--;
                this._continueDialog.close();
                this._continueDialog.destroy();
                this._continueDialog = null;
            }
        };
        /**打开技能选择界面 */
        GameDialogManager.prototype.openSkillSelectDialog = function () {
            if (this._selectSkillDialog != null) {
                return;
            }
            this._openDialogNum++;
            this._selectSkillDialog = new module.SkillSelectDialog();
            this._selectSkillDialog.show(false, true);
        };
        /**关闭技能选择界面 */
        GameDialogManager.prototype.closeSkillSelectDialog = function () {
            if (this._selectSkillDialog != null) {
                this._openDialogNum--;
                this._selectSkillDialog.close();
                this._selectSkillDialog.destroy();
                this._selectSkillDialog = null;
            }
        };
        /**
         * 打开游戏结算弹窗
         * @param moneyScore
         */
        GameDialogManager.prototype.openGameOverDialog = function (moneyScore, timeScore) {
            if (this._gameOverDialog != null) {
                return;
            }
            this._openDialogNum++;
            this._gameOverDialog = new module.GameOverDialog(moneyScore, timeScore);
            this._gameOverDialog.show(false, true);
        };
        /**
         * 关闭游戏结算弹窗
         */
        GameDialogManager.prototype.closeGameOverDialog = function () {
            if (this._gameOverDialog != null) {
                this._openDialogNum--;
                this._gameOverDialog.close();
                this._gameOverDialog.destroy();
                this._gameOverDialog = null;
            }
        };
        /**打开商店弹窗 */
        GameDialogManager.prototype.openShopDialog = function () {
            if (this._shopDialog != null) {
                return;
            }
            this._openDialogNum++;
            this._shopDialog = new module.ShopDialog();
            this._shopDialog.show(false, true);
        };
        /**关闭商店弹窗 */
        GameDialogManager.prototype.closeShopDialog = function () {
            if (this._shopDialog != null) {
                this._openDialogNum--;
                this._shopDialog.close();
                this._shopDialog.destroy();
                this._shopDialog = null;
            }
        };
        /**打开赚钱弹窗 */
        GameDialogManager.prototype.openEarnMoneyDialog = function () {
            if (this._earnMoneyDialog != null) {
                return;
            }
            this._openDialogNum++;
            this._earnMoneyDialog = new module.EarnMoneyDialog();
            this._earnMoneyDialog.show(false, true);
        };
        /**关闭赚钱弹窗 */
        GameDialogManager.prototype.closeEarnMoneyDialog = function () {
            if (this._earnMoneyDialog != null) {
                this._openDialogNum--;
                this._earnMoneyDialog.close();
                this._earnMoneyDialog.destroy();
                this._earnMoneyDialog = null;
            }
        };
        Object.defineProperty(GameDialogManager.prototype, "isExistOpeningDialog", {
            /**是否存在打开的弹窗 */
            get: function () {
                return this._openDialogNum <= 0 ? false : true;
            },
            enumerable: true,
            configurable: true
        });
        return GameDialogManager;
    }());
    module.GameDialogManager = GameDialogManager;
})(module || (module = {}));
//# sourceMappingURL=GameDialogManager.js.map