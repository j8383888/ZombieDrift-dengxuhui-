/**
* name
*/
var manager;
(function (manager) {
    var ResVersionMgr = /** @class */ (function () {
        function ResVersionMgr() {
        }
        /**获取带MD5的资源路径 */
        ResVersionMgr.prototype.getMd5Url = function (url) {
            if (manager.configManager.instance.resourceConfigDic.get(url) != null) {
                var data = manager.configManager.instance.resourceConfigDic.get(url);
                return data.md5Url;
            }
            return url;
        };
        Object.defineProperty(ResVersionMgr, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new ResVersionMgr();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ResVersionMgr._instance = null;
        return ResVersionMgr;
    }());
    manager.ResVersionMgr = ResVersionMgr;
})(manager || (manager = {}));
//# sourceMappingURL=ResVersionMgr.js.map