/**
* name 
*/
module module{
	/**赚取金币弹窗 */
	export class EarnMoneyDialog extends ui.game.EarnMoneyDialogUI{
		constructor(){
			super();
			this.initView();
			this.initEvent();
		}

		/**初始化界面 */
		private initView():void{

		}

		/**初始化事件 */
		private initEvent():void{
			this.btnShare.clickHandler = Laya.Handler.create(this,this.shareGame,null,false);
			this.btnWatchVieo.clickHandler = Laya.Handler.create(this,this.watchVieo,null,false);
			this.btnClose.clickHandler = Laya.Handler.create(this,this.closeDialog,null,false);
		}

		/**关闭 */
		private closeDialog():void{
			manager.SoundPlayMgr.instance.playClick();
			GameDialogManager.instance.closeEarnMoneyDialog();
		}		

		/**分享游戏 */
		private shareGame():void{
			// this.btnShare.disabled = true;
			manager.SoundPlayMgr.instance.playClick();
			GameDataManager.instance.changeMoney(GameDataManager.MONEY_SHARE)
			manager.EventManager.instance.event(manager.EventManager.SHARE_GAME,null);
		}

		/**观看视频 */
		private watchVieo():void{
			// this.btnWatchVieo.disabled = true;
			manager.SoundPlayMgr.instance.playClick();
			GameDataManager.instance.changeMoney(GameDataManager.MONEY_WATCH_VIDE);
			manager.EventManager.instance.event(manager.EventManager.WATCH_VIEO,null);
		}

		/**移除事件 */
		private removeEvent():void{

		}

		/**释放 */
		public destroy():void{
			super.destroy();
			this.removeEvent();
			this.removeSelf();		
		}
	}
}