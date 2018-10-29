/**
* name 
*/
module manager{
	import Dictionary = laya.utils.Dictionary;

	export class EnterFrameManager{
		private static _instance:EnterFrameManager = null;
		public static IDS:number = 1;

		public itemDic:Dictionary = new Dictionary();
		/**暂停循环帧 */
		public pauseItemDic:Dictionary = new Dictionary();
		private _lastTime:number = 0;
		constructor(){
		}

		public setup():void{
			Laya.timer.loop(33 , this , this.enterFrame);
		}

		/**帧更新 */
		public enterFrame():void{
			// var curTime:number = new Date().getTime();
			// if(this._lastTime != 0){
			// 	var defTime:number = curTime - this._lastTime;
			// 	this._lastTime = curTime;								
			// 	console.log("帧循环间隔：" + defTime);
			// }
			// else{
			// 	this._lastTime = curTime;
			// }	
			for(var i:number = 0 ; i < this.itemDic.values.length ; i++){
				var item:EnterFrameFace = this.itemDic.values[i];
				if(item != null){
					item.onEnterFrame();
				}
			}
		}

		public addItem(item:EnterFrameFace):void{
			this.itemDic.set(item.faceId , item);
		}

		public removeItem(faceId:number):void{
			if(this.itemDic.get(faceId) != null){
				this.itemDic.remove(faceId);
			}
		}

		public pauseItem(faceID:number):void{
			if(this.itemDic.get(faceID) != null){
				var item = this.itemDic.get(faceID);
				this.itemDic.remove(faceID);
				this.pauseItemDic.set(faceID,item);
			}
		}

		public recoverItem(faceId:number):void{
			if(this.pauseItemDic.get(faceId) != null){
				var item = this.pauseItemDic.get(faceId);
				this.pauseItemDic.remove(faceId);
				this.itemDic.set(faceId,item);
			}
		}

		public get id():number{
			return EnterFrameManager.IDS++;
		}

		public static get instance():EnterFrameManager{
			if(this._instance == null){
				this._instance = new EnterFrameManager();
			}
			return this._instance;
		}
	}
}