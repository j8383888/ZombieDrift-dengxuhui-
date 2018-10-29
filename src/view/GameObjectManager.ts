/**
* name 
*/
module module{
	/**游戏物体管理器 */
	export class GameObjectManager{
		private static _instance:GameObjectManager;
		public static TYLE_ALPHA:number = 0.7;
		private _wheelTyleAry:Array<Laya.Sprite>;

		/**
		 * 构造函数
		 */
		constructor(){
			this.initialize();
		}

		/**初始化管理器 */
		private initialize():void{
			this._wheelTyleAry = new Array<Laya.Sprite>();
		}

		/**创建轮胎印 */
		public createWheelTyle(startX:number,startY:number,
		endX:number,endY:number,lineColor:string,lineWidth:number):Laya.Sprite{
			var tyle:Laya.Sprite = null;
			if(this._wheelTyleAry.length > 0){
				tyle = this._wheelTyleAry.shift();
				tyle.graphics.clear();				
			}else{
				tyle = new Laya.Sprite();
				tyle.alpha = GameObjectManager.TYLE_ALPHA;
			}
			tyle.graphics.drawLine(startX,startY,endX,endY,lineColor,lineWidth);
			return tyle;
		}

		/**释放所有轮胎印 */
		public destroyWheelTyles(tyles:Array<Laya.Sprite>):void{
			for(var i:number = 0;i < tyles.length;i++){
				if(tyles[i].parent != null){
					tyles[i].parent.removeChild(tyles[i]);
				}
				this._wheelTyleAry.push(tyles[i]);
			}
			tyles.length = 0;
		}

		public static get instance():GameObjectManager{
			if(this._instance == null){
				this._instance = new GameObjectManager();				
			}
			return this._instance;
		}
	}
}