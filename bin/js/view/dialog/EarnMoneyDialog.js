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
    /**赚取金币弹窗 */
    var EarnMoneyDialog = /** @class */ (function (_super) {
        __extends(EarnMoneyDialog, _super);
        function EarnMoneyDialog() {
            var _this = _super.call(this) || this;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        /**初始化界面 */
        EarnMoneyDialog.prototype.initView = function () {
        };
        /**初始化事件 */
        EarnMoneyDialog.prototype.initEvent = function () {
            this.btnShare.clickHandler = Laya.Handler.create(this, this.shareGame, null, false);
            this.btnWatchVieo.clickHandler = Laya.Handler.create(this, this.watchVieo, null, false);
            this.btnClose.clickHandler = Laya.Handler.create(this, this.closeDialog, null, false);
        };
        /**关闭 */
        EarnMoneyDialog.prototype.closeDialog = function () {
            manager.SoundPlayMgr.instance.playClick();
            module.GameDialogManager.instance.closeEarnMoneyDialog();
        };
        /**分享游戏 */
        EarnMoneyDialog.prototype.shareGame = function () {
            // this.btnShare.disabled = true;
            manager.SoundPlayMgr.instance.playClick();
            module.GameDataManager.instance.changeMoney(module.GameDataManager.MONEY_SHARE);
            manager.EventManager.instance.event(manager.EventManager.SHARE_GAME, null);
        };
        /**观看视频 */
        EarnMoneyDialog.prototype.watchVieo = function () {
            // this.btnWatchVieo.disabled = true;
            manager.SoundPlayMgr.instance.playClick();
            module.GameDataManager.instance.changeMoney(module.GameDataManager.MONEY_WATCH_VIDE);
            manager.EventManager.instance.event(manager.EventManager.WATCH_VIEO, null);
        };
        /**移除事件 */
        EarnMoneyDialog.prototype.removeEvent = function () {
        };
        /**释放 */
        EarnMoneyDialog.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.removeEvent();
            this.removeSelf();
        };
        return EarnMoneyDialog;
    }(ui.game.EarnMoneyDialogUI));
    module.EarnMoneyDialog = EarnMoneyDialog;
})(module || (module = {}));
//# sourceMappingURL=EarnMoneyDialog.js.map