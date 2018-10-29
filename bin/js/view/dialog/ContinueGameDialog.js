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
    /**继续游戏弹窗 */
    var ContinueGameDialog = /** @class */ (function (_super) {
        __extends(ContinueGameDialog, _super);
        function ContinueGameDialog() {
            var _this = _super.call(this) || this;
            /**当前扇形角度 */
            _this._curAngle = 0;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        /**初始界面 */
        ContinueGameDialog.prototype.initView = function () {
            this._pieShade = new Laya.Component();
            this._pieShade.size(this.imgBottom.width, this.imgBottom.height);
            this._pieShade.anchorX = 0.5;
            this._pieShade.anchorY = 0.5;
            this._pieShade.pos(this.imgBottom.width / 2, this.imgBottom.height / 2);
            this.boxTimeCountDown.addChild(this._pieShade);
        };
        /**初始事件监听 */
        ContinueGameDialog.prototype.initEvent = function () {
            this.btnSkip.clickHandler = Laya.Handler.create(this, this.quitGame, null, false);
            this.btnContinue.clickHandler = Laya.Handler.create(this, this.continueGame, null, false);
        };
        /**继续游戏 */
        ContinueGameDialog.prototype.continueGame = function () {
            manager.SoundPlayMgr.instance.playClick();
            manager.EventManager.instance.event(manager.EventManager.PLAY_CONTINUE, null);
        };
        /**退出游戏 */
        ContinueGameDialog.prototype.quitGame = function () {
            manager.SoundPlayMgr.instance.playClick();
            manager.EventManager.instance.event(manager.EventManager.SKIP_CONTINUE_GAME, null);
        };
        /**移除事件监听 */
        ContinueGameDialog.prototype.removeEvent = function () {
        };
        /**开始倒计时 */
        ContinueGameDialog.prototype.startCountDown = function () {
            var tickTime = ContinueGameDialog.COUNT_DOWN / 360;
            this._curAngle = 0;
            Laya.timer.loop(tickTime, this, this.drawPie, null);
        };
        /**绘制扇形倒计时 */
        ContinueGameDialog.prototype.drawPie = function () {
            this._pieShade.graphics.drawPie(this._pieShade.width / 2, this._pieShade.height / 2, this._pieShade.width / 2, 0, this._curAngle++, ContinueGameDialog.COLOR_SHADE, ContinueGameDialog.COLOR_SHADE);
            if (this._curAngle >= 360) {
                Laya.timer.clear(this, this.drawPie);
                manager.EventManager.instance.event(manager.EventManager.SKIP_CONTINUE_GAME, null);
            }
        };
        /**释放 */
        ContinueGameDialog.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.removeEvent();
            this.removeSelf();
        };
        /**观看视频选择倒计时 */
        ContinueGameDialog.COUNT_DOWN = 5000;
        /**倒计时遮罩颜色 */
        ContinueGameDialog.COLOR_SHADE = "#ececec";
        return ContinueGameDialog;
    }(ui.game.ContinueGameDialogUI));
    module.ContinueGameDialog = ContinueGameDialog;
})(module || (module = {}));
//# sourceMappingURL=ContinueGameDialog.js.map