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
    /**商店弹窗 */
    var ShopDialog = /** @class */ (function (_super) {
        __extends(ShopDialog, _super);
        function ShopDialog() {
            var _this = _super.call(this) || this;
            /**是否显示汽车商店 */
            _this._isShowCar = true;
            _this.onMoneyChange();
            _this.initView();
            _this.initEvent();
            return _this;
        }
        /**初始化界面 */
        ShopDialog.prototype.initView = function () {
            this.initCarShop();
            this.initSkillShop();
            this.onCarItemClick(module.GameDataManager.instance.selectCarID);
            this.onSkillItemClick(1);
            this.updateContentVisible();
        };
        /**初始化汽车商店 */
        ShopDialog.prototype.initCarShop = function () {
            this.panelCar.hScrollBar.slider.mouseEnabled = false;
            this._carExibitionItem = new module.ExibitionCarItem(this.itemCar);
            this._carListDic = new Laya.Dictionary();
            var configDatas = module.ResCarConfigData.getAllData();
            var addX = 0;
            for (var i = 0; i < configDatas.values.length; i++) {
                var configData = configDatas.values[i];
                var carListItem = new module.CarListItem(configData.id);
                this._carListDic.set(configData.id, carListItem);
                carListItem.x = addX;
                addX = (addX + carListItem.width + ShopDialog.OFFX);
                carListItem.on(Laya.Event.CLICK, this, this.onCarItemClick, [carListItem.configID, false]);
                this.panelCar.addChild(carListItem);
            }
            this.btnBuyCar.clickHandler = Laya.Handler.create(this, this.buyCar, null, false);
        };
        /**car item点击事件 */
        ShopDialog.prototype.onCarItemClick = function (carID, isUpdate) {
            if (isUpdate === void 0) { isUpdate = false; }
            manager.SoundPlayMgr.instance.playClick();
            if (this._carSelectID == carID && !isUpdate) {
                return;
            }
            this._carSelectID = carID;
            var isHave = module.GameDataManager.instance.unlockCarAry.indexOf(carID) == -1 ? false : true;
            if (isHave) {
                module.GameDataManager.instance.selectCarID = carID;
                for (var i = 0; i < this._carListDic.values.length; i++) {
                    var carListItem = this._carListDic.values[i];
                    carListItem.updateSelectFlag();
                }
                this.btnBuyCar.visible = false;
            }
            else {
                this.btnBuyCar.visible = true;
                var configData = module.ResCarConfigData.getDataByID(this._carSelectID);
                this.btnBuyCar.label = configData.price.toString();
            }
            this._carExibitionItem.changeCar(this._carSelectID);
        };
        /**购买车辆 */
        ShopDialog.prototype.buyCar = function () {
            var configData = module.ResCarConfigData.getDataByID(this._carSelectID);
            if (module.GameDataManager.instance.money >= configData.price) {
                module.GameDataManager.instance.changeMoney(-configData.price);
                module.GameDataManager.instance.unLockCar(this._carSelectID);
                var carItem = this._carListDic.get(this._carSelectID);
                carItem.updateStatus();
                carItem.updateSelectFlag();
                this.onCarItemClick(this._carSelectID, true);
                this.tfMoney.text = module.GameDataManager.instance.money.toString();
                manager.SoundPlayMgr.instance.playBuySuccess();
            }
            else {
                module.GameDialogManager.instance.openEarnMoneyDialog();
            }
        };
        /**初始化技能商店 */
        ShopDialog.prototype.initSkillShop = function () {
            this.panelSkill.hScrollBar.slider.mouseEnabled = false;
            this._skillExibitionItem = new module.ExibitionSkillItem(this.itemSkill);
            this._skillListDic = new Laya.Dictionary();
            var configDatas = module.ResSkillConfigData.getAllDatas();
            var addX = 0;
            for (var i = 0; i < configDatas.values.length; i++) {
                var configData = configDatas.values[i];
                var skillListItem = new module.SkillListItem(configData.id);
                this._skillListDic.set(skillListItem.configID, skillListItem);
                skillListItem.x = addX;
                addX = (addX + skillListItem.width + ShopDialog.OFFX);
                skillListItem.on(Laya.Event.CLICK, this, this.onSkillItemClick, [skillListItem.configID, false]);
                this.panelSkill.addChild(skillListItem);
            }
            this.btnBuySkill.clickHandler = Laya.Handler.create(this, this.buySkill, null, false);
        };
        /**购买技能 */
        ShopDialog.prototype.buySkill = function () {
            var configData = module.ResSkillConfigData.getDataByID(this._skillSelectID);
            if (module.GameDataManager.instance.money >= configData.price) {
                module.GameDataManager.instance.changeMoney(-configData.price);
                module.GameDataManager.instance.unlockSkill(this._skillSelectID);
                this.onSkillItemClick(this._skillSelectID, true);
                var skillItem = this._skillListDic.get(this._skillSelectID);
                skillItem.updateStatus();
                this.tfMoney.text = module.GameDataManager.instance.money.toString();
                manager.SoundPlayMgr.instance.playBuySuccess();
            }
            else {
                module.GameDialogManager.instance.openEarnMoneyDialog();
            }
        };
        /**技能item点击事件 */
        ShopDialog.prototype.onSkillItemClick = function (id, isUpdate) {
            if (isUpdate === void 0) { isUpdate = false; }
            manager.SoundPlayMgr.instance.playClick();
            if (this._skillSelectID == id && !isUpdate) {
                return;
            }
            this._skillSelectID = id;
            var configData = module.ResSkillConfigData.getDataByID(this._skillSelectID);
            var isHave = module.GameDataManager.instance.isUnlockSkill(this._skillSelectID);
            if (isHave) {
                this.btnBuySkill.visible = false;
            }
            else {
                this.btnBuySkill.visible = true;
                this.btnBuySkill.label = configData.price.toString();
            }
            this.tfSkillName.text = configData.name;
            this._skillExibitionItem.changeSkill(this._skillSelectID);
        };
        /**初始化事件 */
        ShopDialog.prototype.initEvent = function () {
            this.btnToCar.clickHandler = Laya.Handler.create(this, this.onToCarClick, null, false);
            this.btnToSkill.clickHandler = Laya.Handler.create(this, this.onToSkillClick, null, false);
            this.btnClose.clickHandler = Laya.Handler.create(this, this.closeDialog, null, false);
            manager.EventManager.instance.on(manager.EventManager.MONEY_CHANGE, this, this.onMoneyChange);
        };
        /**金币改变事件 */
        ShopDialog.prototype.onMoneyChange = function () {
            this.tfMoney.text = module.GameDataManager.instance.money.toString();
        };
        /**关闭面板 */
        ShopDialog.prototype.closeDialog = function () {
            manager.SoundPlayMgr.instance.playClick();
            module.GameDialogManager.instance.closeShopDialog();
        };
        /**切换汽车切页 */
        ShopDialog.prototype.onToCarClick = function () {
            manager.SoundPlayMgr.instance.playClick();
            this._isShowCar = true;
            this.updateContentVisible();
        };
        /**切换技能切页 */
        ShopDialog.prototype.onToSkillClick = function () {
            manager.SoundPlayMgr.instance.playClick();
            this._isShowCar = false;
            this.updateContentVisible();
        };
        /**更新内容显示 */
        ShopDialog.prototype.updateContentVisible = function () {
            if (this._isShowCar) {
                this.boxCar.visible = true;
                this.boxSkill.visible = false;
            }
            else {
                this.boxSkill.visible = true;
                this.boxCar.visible = false;
            }
        };
        ShopDialog.prototype.removeEvent = function () {
            manager.EventManager.instance.off(manager.EventManager.MONEY_CHANGE, this, this.onMoneyChange);
        };
        /**释放汽车商店 */
        ShopDialog.prototype.destroyCarShop = function () {
            if (this._carExibitionItem != null) {
                this._carExibitionItem.destroy();
                this._carExibitionItem = null;
            }
            if (this._carListDic != null) {
                for (var i = 0; i < this._carListDic.values.length; i++) {
                    var carListItem = this._carListDic.values[i];
                    if (carListItem != null) {
                        carListItem.off(Laya.Event.CLICK, this, this.onCarItemClick);
                        carListItem.destroy();
                        carListItem = null;
                    }
                }
                this._carListDic.clear();
                this._carListDic = null;
            }
        };
        /**释放技能商店 */
        ShopDialog.prototype.destroySkillShop = function () {
            if (this._skillExibitionItem != null) {
                this._skillExibitionItem.destroy();
                this._skillExibitionItem = null;
            }
            if (this._skillListDic != null) {
                for (var i = 0; i < this._skillListDic.values.length; i++) {
                    var skillListItem = this._skillListDic.values[i];
                    if (skillListItem != null) {
                        skillListItem.off(Laya.Event.CLICK, this, this.onSkillItemClick);
                        skillListItem.destroy();
                        skillListItem = null;
                    }
                }
                this._skillListDic.clear();
                this._skillListDic = null;
            }
        };
        ShopDialog.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.destroyCarShop();
            this.destroySkillShop();
            this.removeEvent();
            this.removeSelf();
        };
        /**间隔 */
        ShopDialog.OFFX = 5;
        return ShopDialog;
    }(ui.game.ShopDialogUI));
    module.ShopDialog = ShopDialog;
})(module || (module = {}));
//# sourceMappingURL=ShopDialog.js.map