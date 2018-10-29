/**
* name 
*/
module module {
	/**技能选择弹窗 */
	export class SkillSelectDialog extends ui.game.SelectSkillDialogUI {
		public static PLEASE_UNLOCK: string = "请在商店解锁";
		public static MONEY_NOT_ENOUGH: string = "金币不足";
		/**单个技能消耗金币数量 */
		public static SKILL_COST: number = 45;
		/**选中技能 */
		private _selectSkill:number = GameSkillManger.ERROR_SKILL;
		/**技能item */
		private _skillItemAry: Array<ui.game.SkillListItemUI>;
		/**技能选中flag */
		private _selectFlagAry: Array<Laya.Image>;
		constructor() {
			super();
			this.initView();
			this.initEvent();
		}

		private initView(): void {			
			this.tfTip.visible = false;			

			this._skillItemAry = new Array<ui.game.SkillListItemUI>();
			this._selectFlagAry = new Array<Laya.Image>();
			this.tfMoney.text = GameDataManager.instance.money.toString();
			var index: number = 1;
			var isTrue: boolean = true;
			while (isTrue) {
				var skillItem: ui.game.SkillListItemUI = this.getChildByName("skill" + index) as ui.game.SkillListItemUI;
				var flag: Laya.Image = this.getChildByName("use" + index) as Laya.Image;
				var tfName:Laya.Label = this.getChildByName("name" + index) as Laya.Label;
				if (skillItem != null && flag != null) {
					this._selectFlagAry.push(flag);
					this._skillItemAry.push(skillItem);
					flag.visible = false;
					var config: ResSkillConfigData = ResSkillConfigData.getDataByID(index);
					skillItem.imgLock.skin = config.url_small_lock;
					skillItem.imgUnlock.skin = config.url_small_unlock;
					tfName.text = config.name;
					var isHave: boolean = GameDataManager.instance.isUnlockSkill(index);
					if (isHave) {
						skillItem.imgLock.visible = false;
						skillItem.imgUnlock.visible = true;
					} else {
						skillItem.imgLock.visible = true;
						skillItem.imgUnlock.visible = false;
					}
					skillItem.on(Laya.Event.CLICK, this, this.onSkillItemClick, [index]);
				} else {
					isTrue = false;
				}
				index++;
			}
			this.btnClose.clickHandler = Laya.Handler.create(this,this.onClose);
		}

		/**界面关闭 */
		private onClose():void{
			manager.SoundPlayMgr.instance.playClick();						
			if(this._selectSkill != GameSkillManger.ERROR_SKILL){				
				GameDataManager.instance.changeMoney(-SkillSelectDialog.SKILL_COST);
			}
			manager.EventManager.instance.event(manager.EventManager.SKILL_SELECT_COMPLETE,[this._selectSkill]);					
			GameDialogManager.instance.closeSkillSelectDialog();
		}

		/**技能item点击事件 */
		private onSkillItemClick(skillID: number): void {
			manager.SoundPlayMgr.instance.playClick();
			var isHave: boolean = GameDataManager.instance.isUnlockSkill(skillID);
			//如果拥有技能判断钱够不够
			if (isHave) {
				if(this._selectSkill == skillID){
					this._selectSkill = GameSkillManger.ERROR_SKILL;
				}else{
					if(SkillSelectDialog.SKILL_COST > GameDataManager.instance.money){
						this.showTip(SkillSelectDialog.MONEY_NOT_ENOUGH);
					}else{
						this._selectSkill = skillID;
					}					
				}
				this.update();
			} else {//如果没拥有技能就弹出购买技能
				this.showTip(SkillSelectDialog.PLEASE_UNLOCK);
			}
		}

		private update():void{			
			for(var i:number = 0;i < this._selectFlagAry.length;i++){
				var skillID:number = i + 1;
				var flag:Laya.Image = this._selectFlagAry[i];
				if(this._selectSkill == skillID){
					flag.visible = true;		
				}else{
					flag.visible = false;
				}
			}
		}

		/**显示提示 */
		private showTip(tip: string): void {
			this.tfTip.visible = true;
			this.tfTip.text = tip;
			Laya.Tween.to(this.tfTip, { alpha: 0 }, 1000, null, Laya.Handler.create(
				this, function () {
					this.tfTip.visible = false;
					this.tfTip.alpha = 1;
				}
			));
		}

		private initEvent(): void {

		}

		private removeEvent(): void {

		}

		public destroy(): void {
			super.destroy();
			for (var i: number = 0; i < this._skillItemAry.length; i++) {
				var skillItem: ui.game.SkillListItemUI = this._skillItemAry[i];
				if (skillItem != null) {
					skillItem.off(Laya.Event.CLICK, this, this.onSkillItemClick);
					skillItem.destroy();
					skillItem = null;
				}
			}
			this._skillItemAry.length = 0;			
			this.removeEvent();
			this.removeSelf();
		}
	}
}