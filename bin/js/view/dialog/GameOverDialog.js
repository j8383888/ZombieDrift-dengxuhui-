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
    /**游戏结算弹窗 */
    var GameOverDialog = /** @class */ (function (_super) {
        __extends(GameOverDialog, _super);
        function GameOverDialog(moneyScore, timeScore) {
            var _this = _super.call(this) || this;
            _this._moneyScore = moneyScore;
            _this._timeScore = timeScore;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        /**初始化界面 */
        GameOverDialog.prototype.initView = function () {
            this.tfTimeScore.text = this._timeScore.toString();
            this.tfMonsterScore.text = this._moneyScore.toString();
        };
        /**初始事件监听 */
        GameOverDialog.prototype.initEvent = function () {
            this.btnCarShop.clickHandler = Laya.Handler.create(this, this.openShop, null, false);
            this.btnPlay.clickHandler = Laya.Handler.create(this, this.playNewGame, null, false);
            this.btnDoubleScore.clickHandler = Laya.Handler.create(this, this.requestDoubleMoney);
        };
        /**请求双倍金币 */
        GameOverDialog.prototype.requestDoubleMoney = function () {
            manager.EventManager.instance.event(manager.EventManager.WATCH_VIEO);
            this._moneyScore = this._moneyScore * 2;
            this.tfMonsterScore.text = this._moneyScore.toString();
            this.btnDoubleScore.disabled = true;
        };
        /**打开商店弹窗 */
        GameOverDialog.prototype.openShop = function () {
            manager.SoundPlayMgr.instance.playClick();
            module.GameDialogManager.instance.openShopDialog();
        };
        /**开始新游戏 */
        GameOverDialog.prototype.playNewGame = function () {
            manager.SoundPlayMgr.instance.playClick();
            module.GameDataManager.instance.changeMoney(this._moneyScore);
            manager.EventManager.instance.event(manager.EventManager.START_GAME, null);
            module.GameDialogManager.instance.closeGameOverDialog();
        };
        /**移除事件监听 */
        GameOverDialog.prototype.removeEvent = function () {
        };
        /**释放 */
        GameOverDialog.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.removeEvent();
            this.removeSelf();
        };
        return GameOverDialog;
    }(ui.game.GameOverDialogUI));
    module.GameOverDialog = GameOverDialog;
})(module || (module = {}));
//# sourceMappingURL=GameOverDialog.js.map