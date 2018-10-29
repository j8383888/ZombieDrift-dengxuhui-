/**
* name 
*/
module module{
	/**继续游戏弹窗 */
	export class ContinueGameDialog extends ui.game.ContinueGameDialogUI{
		/**观看视频选择倒计时 */
		public static COUNT_DOWN:number = 5000;
		/**倒计时遮罩颜色 */
		public static COLOR_SHADE:string = "#ececec";
		/**倒计时遮罩 */
		private _pieShade:Laya.Component;
		constructor(){
			super();
			this.initView();
			this.initEvent();
		}

		/**初始界面 */
		private initView():void{
			this._pieShade = new Laya.Component();
			this._pieShade.size(this.imgBottom.width,this.imgBottom.height);
			this._pieShade.anchorX = 0.5;
			this._pieShade.anchorY = 0.5;
			this._pieShade.pos(this.imgBottom.width / 2,this.imgBottom.height / 2);
			this.boxTimeCountDown.addChild(this._pieShade);
		}

		/**初始事件监听 */
		private initEvent():void{
			this.btnSkip.clickHandler = Laya.Handler.create(this,this.quitGame,null,false);
			this.btnContinue.clickHandler = Laya.Handler.create(this,this.continueGame,null,false);

		}

		/**继续游戏 */
		private continueGame():void{
			manager.SoundPlayMgr.instance.playClick();
			manager.EventManager.instance.event(manager.EventManager.PLAY_CONTINUE,null);
		}

		/**退出游戏 */
		private quitGame():void{
			manager.SoundPlayMgr.instance.playClick();
			manager.EventManager.instance.event(manager.EventManager.SKIP_CONTINUE_GAME,null);
		}

		/**移除事件监听 */
		private removeEvent():void{

		}

		/**当前扇形角度 */
		private _curAngle:number = 0;
		/**开始倒计时 */
		public startCountDown():void{
			var tickTime:number = ContinueGameDialog.COUNT_DOWN / 360;
			this._curAngle = 0;
			Laya.timer.loop(tickTime,this,this.drawPie,null);
			
		}

		/**绘制扇形倒计时 */
		private drawPie():void{			
			this._pieShade.graphics.drawPie(this._pieShade.width / 2,this._pieShade.height / 2,
			this._pieShade.width / 2,0,this._curAngle++,
			ContinueGameDialog.COLOR_SHADE,ContinueGameDialog.COLOR_SHADE);
			if(this._curAngle >= 360){
				Laya.timer.clear(this,this.drawPie);
				manager.EventManager.instance.event(manager.EventManager.SKIP_CONTINUE_GAME,null);
			}
		}

		/**释放 */
		public destroy():void{
			super.destroy();
			this.removeEvent();
			this.removeSelf();		
		}
	}
}