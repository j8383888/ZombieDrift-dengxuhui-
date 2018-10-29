/**
* name
*/
var manager;
(function (manager) {
    /**模块，弹窗 的显示隐藏控制器 */
    var ModuleController = /** @class */ (function () {
        /**------------------------------------------------------------- */
        function ModuleController() {
            this.moduleClassDic = new laya.utils.Dictionary();
            this._curModuleView = null;
            this.nextModuleName = "";
            /**在这里添加注册界面索引 */
            this.moduleClassDic.set(ModuleController.MN_HallView, module.IndexView);
            // this.moduleClassDic.set(ModuleController.MN_GameView , module.GameView);	
        }
        /**
         * 显示弹框
         * @param name 弹框名字
         * @param center 弹框是否居中
         * @param blockBackgound 弹框是否需要黑色遮罩
         * @param isBackClose 点黑色遮罩弹框是否关闭
         * @param args 打开弹框传的参数
         * @param blockAp 弹框遮罩透明度
        */
        ModuleController.prototype.showDialog = function (name, center, blockBackgound, isBackClose, args, blockAp) {
            if (center === void 0) { center = false; }
            if (blockBackgound === void 0) { blockBackgound = false; }
            if (isBackClose === void 0) { isBackClose = true; }
            if (args === void 0) { args = null; }
            if (blockAp === void 0) { blockAp = 0.5; }
            var dialogClass = this.moduleClassDic.get(name);
            if (dialogClass != null) {
                var dialog = new dialogClass();
                if (args != null)
                    dialog.setData(args);
                manager.LayerManager.instace.addToLayer(dialog, manager.LayerManager.STAGE_DIALOG_LAYER, center, blockBackgound, isBackClose, blockAp);
            }
        };
        ModuleController.prototype.changeModule = function (name, isBackgound, isShowLoading) {
            if (isBackgound === void 0) { isBackgound = true; }
            if (isShowLoading === void 0) { isShowLoading = true; }
            this.nextModuleName = name;
            if (isBackgound) {
            }
            var sources = manager.configManager.instance.getModuleConfigSource(name);
            Laya.loader.load(sources, Laya.Handler.create(this, this.onLoadedModule));
        };
        ModuleController.prototype.onLoadedModule = function () {
            if (this._curModuleView != null) {
                this._curModuleView.destroy();
            }
            manager.LayerManager.instace.clearLayer(manager.LayerManager.STAGE_DIALOG_LAYER);
            var moduleClass = this.moduleClassDic.get(this.nextModuleName);
            if (moduleClass != null) {
                this._curModuleView = new moduleClass();
                manager.LayerManager.instace.addToLayer(this._curModuleView, manager.LayerManager.STAGE_BOTTOM_LAYER, false, false);
            }
        };
        Object.defineProperty(ModuleController, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new ModuleController();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ModuleController._instance = null;
        /**-----------------在这里添加界面索引 -------------------------*/
        /**游戏进入Icon */
        ModuleController.MN_CompanyIcon = "CompanyIcon";
        /**游戏页*/
        ModuleController.MN_GameView = "GameView";
        /**首页 */
        ModuleController.MN_HallView = "HallView";
        return ModuleController;
    }());
    manager.ModuleController = ModuleController;
})(manager || (manager = {}));
//# sourceMappingURL=ModuleController.js.map