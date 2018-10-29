/**
 * TS 调用 JS 的函数集合
 * JS 调用 TS 的回调函数
* name
*/
var manager;
(function (manager) {
    var TsJsmanager = /** @class */ (function () {
        function TsJsmanager() {
        }
        ///////////////////////////////////////APP 直调 TS///////////////////////////////////////////////////////////////
        ///////////////////////////////////////JS 调用 TS///////////////////////////////////////////////////////////////
        /**
         * 开始游戏
         * @param gateID 关卡ID
         */
        TsJsmanager.startGame = function (gateID) {
            manager.EventManager.instance.event(manager.EventManager.START_GAME, gateID);
        };
        /**
         * 重新开始游戏
         * @param gateID 关卡ID
         */
        TsJsmanager.replay = function (gateID) {
            manager.EventManager.instance.event(manager.EventManager.REPLAY, gateID);
        };
        /**续命继续游戏 */
        TsJsmanager.playContinue = function () {
            manager.EventManager.instance.event(manager.EventManager.PLAY_CONTINUE);
        };
        /**上报当前游戏成绩 0:当前局成绩  1:最大成绩*/
        TsJsmanager.pushGameScore = function (scoreType) {
            manager.EventManager.instance.event(manager.EventManager.PUSH_GAME_SCORE, scoreType);
        };
        /**关闭游戏声音 */
        TsJsmanager.closeVoice = function () {
            manager.EventManager.instance.event(manager.EventManager.CLOSE_VOICE);
        };
        /**打开游戏声音 */
        TsJsmanager.openVoice = function () {
            manager.EventManager.instance.event(manager.EventManager.OPEN_VOICE);
        };
        TsJsmanager.playMusic = function () {
            manager.SoundPlayMgr.instance.playBgMusic(1);
        };
        return TsJsmanager;
    }());
    manager.TsJsmanager = TsJsmanager;
})(manager || (manager = {}));
//# sourceMappingURL=TsJsmanager.js.map