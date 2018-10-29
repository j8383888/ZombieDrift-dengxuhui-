/**
* name
*/
var core;
(function (core) {
    var XmlFileUtils = /** @class */ (function () {
        function XmlFileUtils() {
        }
        /**登录配置 */
        XmlFileUtils.prototype.onLoadedConfigXML = function (xml) {
        };
        /**模块配置 */
        XmlFileUtils.prototype.onLoadedModuleXML = function (xml) {
        };
        /**资源配置 */
        XmlFileUtils.prototype.onLoadResourceXML = function (xml) {
        };
        Object.defineProperty(XmlFileUtils, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new XmlFileUtils();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        XmlFileUtils._instance = null;
        return XmlFileUtils;
    }());
    core.XmlFileUtils = XmlFileUtils;
})(core || (core = {}));
//# sourceMappingURL=XmlFileUtils.js.map