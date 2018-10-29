/**
* name 
*/
module module{
	/**商店展示技能item */
	export class ExibitionSkillItem{
		/**根节点 */
		private _root:ui.game.ExhibitionSkillItemUI;
		constructor(root:ui.game.ExhibitionSkillItemUI){
			this._root = root;
		}

		public changeSkill(id:number):void{			
			var configData:ResSkillConfigData = ResSkillConfigData.getDataByID(id);
			this._root.imgLock.skin = configData.url_big_lock;
			this._root.imgUnlock.skin = configData.url_big_unlock;

			var isHave:boolean = GameDataManager.instance.isUnlockSkill(id);
			if(isHave){
				this._root.imgLock.visible = false;
				this._root.imgUnlock.visible = true;
			}else{
				this._root.imgLock.visible = true;
				this._root.imgUnlock.visible = false;
			}
		}

		/**释放 */
		public destroy():void{
			this._root = null;
		}
	}
}