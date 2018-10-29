/**
* name 
*/
module module{
	/**汽车列表元素 */
	export class CarListItem extends ui.game.CarListItemUI{
		/**配置id */
		private _configID:number;		
		/**
		 * 构造函数
		 * @param carConfigID 汽车配置id
		 */
		constructor(carConfigID:number){
			super();
			this._configID = carConfigID;
			this.initView();
			this.initEvent();
		}

		private initView():void{			
			this.imgLock.skin = "car/" + ResCarConfigData.SMALL_CAR_LOCK_PREFIX + this._configID + ".png";
			this.imgUnlock.skin = "car/" + ResCarConfigData.SMALL_CAR_UNLOCK_PREFIX + this._configID + ".png";
			this.updateStatus();
			this.updateSelectFlag();
		}

		private initEvent():void{
			
		}

		private removeEvent():void{

		}

		/**更新显示状态 */
		public updateStatus():void{
			var isHave:boolean = GameDataManager.instance.unlockCarAry.indexOf(this._configID) == -1 ? false : true;
			if(isHave){
				this.imgLock.visible = false;
				this.imgUnlock.visible = true;
			}else{
				this.imgLock.visible = true;
				this.imgUnlock.visible = false;
			}
		}

		/**更新选中标志 */
		public updateSelectFlag():void{
			if(GameDataManager.instance.selectCarID == this._configID){
				this.imgSelect.visible = true;
			}else{
				this.imgSelect.visible = false;
			}
		}

		/**获取配置id */
		public get configID():number{
			return this._configID;
		}

		/**释放 */
		public destroy():void{
			super.destroy();
			this.removeEvent();
			this.removeSelf();
		}
	}
}