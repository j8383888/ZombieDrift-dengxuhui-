/**
* name
*/
var manager;
(function (manager) {
    var Dictionary = laya.utils.Dictionary;
    /**配置文件管理器 */
    var configManager = /** @class */ (function () {
        function configManager() {
            ////////////////////////////////////////////下面三个不能有任何变动（在打包工具中会修改这里）///////////////////////////////////////////////////////////
            /**登录方式 */
            this.loginType_js = 1;
            /**是否是编辑模式 */
            this.isEditor_js = 0;
            /**是否显示游客登录 */
            this.haveGuest_js = 1;
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /**H5的版本号 */
            this.versions = "";
            /**APP 的 IOS版 的版本号 */
            this.iosAppVersion = "";
            /**APP 的 Android 的版本号*/
            this.androidAppVersion = "";
            this.hallIp = ""; //
            this.hallPort = 0;
            this.httpUrl = "";
            /**模块的资源表 */
            this.moduleConfigDic = null;
            /**资源配置表 */
            this.resourceConfigDic = new Dictionary();
            this.moduleConfigDic = new Dictionary();
            this.moduleConfigDic.set("CompanyIcon", { name: "CompanyIcon", source: "smallload.json" });
            this.moduleConfigDic.set("LoginView", { name: "LoginView", source: "login.json" });
            this.moduleConfigDic.set("HallView", { name: "HallView", source: "hall.json" });
            this.moduleConfigDic.set("GameView", { name: "GameView", source: "ui.json" });
        }
        configManager.prototype.initEvent = function () {
        };
        /**获取模块的资源数组 */
        configManager.prototype.getModuleConfigSource = function (name) {
            return this.getSource(this.moduleConfigDic.get(name).source);
        };
        configManager.prototype.getSource = function (source) {
            var arr = source.split(",");
            var fileUrls = new Array();
            for (var i = 0; i < arr.length; i++) {
                fileUrls.push({ url: manager.ResVersionMgr.instance.getMd5Url("res/atlas/" + arr[i] + ""), type: laya.net.Loader.ATLAS });
            }
            return fileUrls;
        };
        Object.defineProperty(configManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new configManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        configManager._instance = null;
        return configManager;
    }());
    manager.configManager = configManager;
})(manager || (manager = {}));
//# sourceMappingURL=configManager.js.map