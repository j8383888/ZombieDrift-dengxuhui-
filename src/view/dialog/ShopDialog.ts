/**
* name 
*/
module module {
	/**商店弹窗 */
	export class ShopDialog extends ui.game.ShopDialogUI {
		/**间隔 */
		public static OFFX: number = 5;
		/**是否显示汽车商店 */
		private _isShowCar: boolean = true;
		/**汽车展示item */
		private _carExibitionItem: ExibitionCarItem;
		/**基恩给你展示item */
		private _skillExibitionItem: ExibitionSkillItem;
		/**汽车列表 */
		private _carListDic: Laya.Dictionary;
		/**技能列表 */
		private _skillListDic: Laya.Dictionary;
		/**当前选中汽车id */
		private _carSelectID: number;
		/**当前选中技能id */
		private _skillSelectID: number;

		constructor() {
			super();
			this.onMoneyChange();
			this.initView();
			this.initEvent();
		}

		/**初始化界面 */
		private initView(): void {
			this.initCarShop();
			this.initSkillShop();
			this.onCarItemClick(GameDataManager.instance.selectCarID);
			this.onSkillItemClick(1);			
			this.updateContentVisible();
		}

		/**初始化汽车商店 */
		private initCarShop(): void {
			this.panelCar.hScrollBar.slider.mouseEnabled = false;
			this._carExibitionItem = new ExibitionCarItem(this.itemCar);
			this._carListDic = new Laya.Dictionary();
			var configDatas: Laya.Dictionary = ResCarConfigData.getAllData();

			var addX: number = 0;
			for (var i: number = 0; i < configDatas.values.length; i++) {
				var configData: ResCarConfigData = configDatas.values[i];
				var carListItem: CarListItem = new CarListItem(configData.id);
				this._carListDic.set(configData.id, carListItem);
				carListItem.x = addX;
				addX = (addX + carListItem.width + ShopDialog.OFFX);
				carListItem.on(Laya.Event.CLICK, this, this.onCarItemClick, [carListItem.configID, false]);
				this.panelCar.addChild(carListItem);
			}
			this.btnBuyCar.clickHandler = Laya.Handler.create(this, this.buyCar, null, false);
		}

		/**car item点击事件 */
		private onCarItemClick(carID: number, isUpdate: boolean = false): void {
			manager.SoundPlayMgr.instance.playClick();
			if (this._carSelectID == carID && !isUpdate) {
				return;
			}
			this._carSelectID = carID;

			var isHave: boolean = GameDataManager.instance.unlockCarAry.indexOf(carID) == -1 ? false : true;
			if (isHave) {
				GameDataManager.instance.selectCarID = carID;
				for (var i: number = 0; i < this._carListDic.values.length; i++) {
					var carListItem: CarListItem = this._carListDic.values[i];
					carListItem.updateSelectFlag();
				}
				this.btnBuyCar.visible = false;
			} else {
				this.btnBuyCar.visible = true;
				var configData: ResCarConfigData = ResCarConfigData.getDataByID(this._carSelectID);
				this.btnBuyCar.label = configData.price.toString();
			}
			this._carExibitionItem.changeCar(this._carSelectID);
		}

		/**购买车辆 */
		private buyCar() {
			var configData: ResCarConfigData = ResCarConfigData.getDataByID(this._carSelectID);
			if (GameDataManager.instance.money >= configData.price) {
				GameDataManager.instance.changeMoney(-configData.price);
				GameDataManager.instance.unLockCar(this._carSelectID);
				var carItem: CarListItem = this._carListDic.get(this._carSelectID);
				carItem.updateStatus();
				carItem.updateSelectFlag();
				this.onCarItemClick(this._carSelectID, true);

				this.tfMoney.text = GameDataManager.instance.money.toString();
				manager.SoundPlayMgr.instance.playBuySuccess();
			} else {
				GameDialogManager.instance.openEarnMoneyDialog();
			}
		}

		/**初始化技能商店 */
		private initSkillShop(): void {
			this.panelSkill.hScrollBar.slider.mouseEnabled = false;
			this._skillExibitionItem = new ExibitionSkillItem(this.itemSkill);
			this._skillListDic = new Laya.Dictionary();
			var configDatas: Laya.Dictionary = ResSkillConfigData.getAllDatas();

			var addX: number = 0;
			for (var i: number = 0; i < configDatas.values.length; i++) {
				var configData: ResSkillConfigData = configDatas.values[i];
				var skillListItem: SkillListItem = new SkillListItem(configData.id);
				this._skillListDic.set(skillListItem.configID, skillListItem);
				skillListItem.x = addX;

				addX = (addX + skillListItem.width + ShopDialog.OFFX);
				skillListItem.on(Laya.Event.CLICK, this, this.onSkillItemClick, [skillListItem.configID, false]);
				this.panelSkill.addChild(skillListItem);
			}
			this.btnBuySkill.clickHandler = Laya.Handler.create(this, this.buySkill, null, false);
		}

		/**购买技能 */
		private buySkill(): void {
			var configData: ResSkillConfigData = ResSkillConfigData.getDataByID(this._skillSelectID);
			if (GameDataManager.instance.money >= configData.price) {
				GameDataManager.instance.changeMoney(-configData.price);
				GameDataManager.instance.unlockSkill(this._skillSelectID);
				this.onSkillItemClick(this._skillSelectID, true);
				var skillItem: SkillListItem = this._skillListDic.get(this._skillSelectID);
				skillItem.updateStatus();

				this.tfMoney.text = GameDataManager.instance.money.toString();
				manager.SoundPlayMgr.instance.playBuySuccess();
			} else {
				GameDialogManager.instance.openEarnMoneyDialog();
			}
		}

		/**技能item点击事件 */
		private onSkillItemClick(id: number, isUpdate: boolean = false): void {
			manager.SoundPlayMgr.instance.playClick();
			if (this._skillSelectID == id && !isUpdate) {
				return;
			}
			this._skillSelectID = id;

			var configData: ResSkillConfigData = ResSkillConfigData.getDataByID(this._skillSelectID);
			var isHave: boolean = GameDataManager.instance.isUnlockSkill(this._skillSelectID);
			if (isHave) {
				this.btnBuySkill.visible = false;
			} else {
				this.btnBuySkill.visible = true;
				this.btnBuySkill.label = configData.price.toString();
			}
			this.tfSkillName.text = configData.name;
			this._skillExibitionItem.changeSkill(this._skillSelectID);
		}

		/**初始化事件 */
		private initEvent(): void {
			this.btnToCar.clickHandler = Laya.Handler.create(this, this.onToCarClick, null, false);
			this.btnToSkill.clickHandler = Laya.Handler.create(this, this.onToSkillClick, null, false);
			this.btnClose.clickHandler = Laya.Handler.create(this, this.closeDialog, null, false);
			manager.EventManager.instance.on(manager.EventManager.MONEY_CHANGE,this,this.onMoneyChange);
		}

		/**金币改变事件 */
		private onMoneyChange():void{
			this.tfMoney.text = GameDataManager.instance.money.toString();
		}

		/**关闭面板 */
		private closeDialog(): void {			
			manager.SoundPlayMgr.instance.playClick();
			GameDialogManager.instance.closeShopDialog();
		}

		/**切换汽车切页 */
		private onToCarClick(): void {
			manager.SoundPlayMgr.instance.playClick();
			this._isShowCar = true;
			this.updateContentVisible();
		}

		/**切换技能切页 */
		private onToSkillClick(): void {
			manager.SoundPlayMgr.instance.playClick();
			this._isShowCar = false;
			this.updateContentVisible();
		}

		/**更新内容显示 */
		private updateContentVisible(): void {
			if (this._isShowCar) {
				this.boxCar.visible = true;
				this.boxSkill.visible = false;
			} else {
				this.boxSkill.visible = true;
				this.boxCar.visible = false;
			}
		}

		private removeEvent(): void {
			manager.EventManager.instance.off(manager.EventManager.MONEY_CHANGE,this,this.onMoneyChange);
		}

		/**释放汽车商店 */
		private destroyCarShop(): void {
			if (this._carExibitionItem != null) {
				this._carExibitionItem.destroy();
				this._carExibitionItem = null;
			}
			if (this._carListDic != null) {
				for (var i: number = 0; i < this._carListDic.values.length; i++) {
					var carListItem: CarListItem = this._carListDic.values[i];
					if (carListItem != null) {
						carListItem.off(Laya.Event.CLICK, this, this.onCarItemClick);
						carListItem.destroy();
						carListItem = null;
					}
				}
				this._carListDic.clear();
				this._carListDic = null;
			}
		}

		/**释放技能商店 */
		private destroySkillShop(): void {
			if (this._skillExibitionItem != null) {
				this._skillExibitionItem.destroy();
				this._skillExibitionItem = null;
			}
			if (this._skillListDic != null) {
				for (var i: number = 0; i < this._skillListDic.values.length; i++) {
					var skillListItem: SkillListItem = this._skillListDic.values[i];
					if (skillListItem != null) {
						skillListItem.off(Laya.Event.CLICK, this, this.onSkillItemClick);
						skillListItem.destroy();
						skillListItem = null;
					}
				}
				this._skillListDic.clear();
				this._skillListDic = null;
			}
		}

		public destroy(): void {
			super.destroy();
			this.destroyCarShop();
			this.destroySkillShop();
			this.removeEvent();
			this.removeSelf();
		}
	}
}

