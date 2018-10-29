/**
* name 
*/
module module{
	/**操作管理器 */
	export class OperationManager{
		private static _instance:OperationManager;
		/**键盘操作 */
		public static OPERATION_KEYBORAD:string = "operation_keyborad";
		/**鼠标操作 */
		public static OPERATION_MOUSE:string = "operation_mouse";
		/**操作对象 */
		private _indexView:IndexView;
		/**当前操作类型 */
		private _curOperationType:string;
		/**增长率 */
		private _increase:number = 1;		

		constructor(){
					
		}

		/**初始化 */
		public initilize(view:IndexView):void{					
			// this._curOperationType = OperationManager.OPERATION_MOUSE;
			this._curOperationType = OperationManager.OPERATION_MOUSE;
			this._indexView = view;			
			if(this._curOperationType == OperationManager.OPERATION_KEYBORAD){
				this.initKeyBordOperation();
			}else{
				this.initMouseOperation();
			}
		}

		/**初始鼠标操作 */
		private initMouseOperation():void{
			Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onStageMouseDown, null);
			Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onStageMouseUp, null);			
		}

		/**鼠标抬起事件 */
		private onStageMouseUp(e: Laya.Event): void {
			this._increase = 1;			
			Laya.timer.clear(this, this.turnLeft);
			Laya.timer.clear(this, this.turnRight);
		}

		/**鼠标按下事件 */
		private onStageMouseDown(e: Laya.Event): void {
			if (!this._indexView.isStartGame) {
				return;
			}
			//右转
			if (e.stageX > Laya.stage.width / 2) {
				Laya.timer.frameLoop(1, this, this.turnRight);
			} else {//左转
				Laya.timer.frameLoop(1, this, this.turnLeft);				
			}
		}

		/**左转 */
		public turnLeft(): void {
			RoadManager.instance.rotationRoad(DIRECTION.LEFT);
			this._increase += 0.02;
			this._indexView.cartItem.rotation -= (CarItem.FRAME_ROTATION * this._increase);
		}

		/**右转 */
		public turnRight(): void {
			RoadManager.instance.rotationRoad(DIRECTION.RIGHT);
			this._increase += 0.02;
			this._indexView.cartItem.rotation += (CarItem.FRAME_ROTATION * this._increase);
		}
		
		/**初始化键盘操作 */
		private initKeyBordOperation():void{
			Laya.stage.on(Laya.Event.KEY_DOWN,this,this.onKeyDown,null);
			Laya.stage.on(Laya.Event.KEY_UP,this,this.onKeyUp,null);
		}

		private onKeyDown(e:Laya.Event):void{
			if (!this._indexView.isStartGame) {
				return;
			}
			if(e.keyCode == Laya.Keyboard.LEFT){				
				Laya.timer.frameLoop(1, this, this.turnLeft);				
			}else if(e.keyCode == Laya.Keyboard.RIGHT){
				Laya.timer.frameLoop(1,this,this.turnRight);				
			}
		}

		private onKeyUp():void{
			this._increase = 1;
			Laya.timer.clear(this, this.turnLeft);
			Laya.timer.clear(this, this.turnRight);			
		}

		/**获取实例 */
		public static get instance():OperationManager{
			if(this._instance == null){
				this._instance = new OperationManager();				
			}
			return this._instance;
		}

	}
}