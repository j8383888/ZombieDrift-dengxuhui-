/**
* name 
*/
module module{
	/**商店展示汽车item */
	export class ExibitionCarItem{
		/**根节点 */
		private _root:ui.game.ExhibitionCarItemUI;
		/**是否正在旋转 */
		private _isRotating:boolean = false;
		constructor(root:ui.game.ExhibitionCarItemUI){
			this._root = root;
		}

		private rotationCar():void{
			this._root.rotation -= 4;
		}

		private loopPlay():void{
			var curIndex:number = this._root.clipCar.index;			
			curIndex = curIndex >= CarItem.CLIP_MAX_INDEX ? 0 : curIndex + 1;
			this._root.clipCar.index = curIndex;
		}

		private stopPlayClip():void{
			Laya.timer.clear(this,this.loopPlay);
		}

		private playClip():void{
			Laya.timer.loop(CarItem.INTERVAL,this,this.loopPlay);
		}

		
		/**改变展示车辆 */
		public changeCar(id:number,autoRotation:boolean = true){			
			this._root.clipCar.skin = "car/" + ResCarConfigData.CLIP_CAR_PREFIX + id + ".png";
			this._root.imgCar.skin = "car/" + ResCarConfigData.BIG_LOCK_PREFIX + id + 
			ResCarConfigData.BIG_LOCK_SUFFIX + ".png";

			var isHave:boolean = GameDataManager.instance.unlockCarAry.indexOf(id) == -1 ? false : true;
			if(isHave){
				this._root.clipCar.visible = true;
				this._root.imgCar.visible = false;
				this.playClip();
			}else{
				this._root.clipCar.visible = false;
				this._root.imgCar.visible = true;
				this.stopPlayClip();
			}
			if(!this._isRotating){
				this._isRotating = true;
				Laya.timer.loop(100,this,this.rotationCar,null);
			}
		}
		
		/**释放 */
		public destroy():void{
			Laya.timer.clearAll(this);
			this._root = null;
		}
	}	
}