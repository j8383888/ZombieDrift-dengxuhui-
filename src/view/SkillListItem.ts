/**
* name 
*/
module module{
	/**技能列表item */
	export class SkillListItem extends ui.game.SkillListItemUI{
		/**配置id */
		private _configID:number;
		constructor(id:number){
			super();
			this._configID = id;
			this.initView();
			this.initEvent();
		}

		private initView():void{			
			var configData:ResSkillConfigData = ResSkillConfigData.getDataByID(this._configID);
			this.imgLock.skin = configData.url_small_lock;
			this.imgUnlock.skin = configData.url_small_unlock;
			this.updateStatus();
		}

		private initEvent():void{

		}

		/**更新显示状态 */
		public updateStatus():void{
			var isHave:boolean = GameDataManager.instance.isUnlockSkill(this._configID);
			if(isHave){
				this.imgLock.visible = false;
				this.imgUnlock.visible = true;
			}else{
				this.imgLock.visible = true;
				this.imgUnlock.visible = false;
			}
		}

		public destroy():void{
			super.destroy();
		}

		public get configID():number{
			return this._configID;
		}
	}
}