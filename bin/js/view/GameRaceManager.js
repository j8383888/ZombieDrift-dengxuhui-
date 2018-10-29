/**
* name
*/
var module;
(function (module) {
    /**游戏比赛管理器 */
    var GameRaceManager = /** @class */ (function () {
        function GameRaceManager() {
        }
        Object.defineProperty(GameRaceManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameRaceManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return GameRaceManager;
    }());
    module.GameRaceManager = GameRaceManager;
})(module || (module = {}));
//# sourceMappingURL=GameRaceManager.js.map