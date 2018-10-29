/**
* name 
*/
module module{
	/**游戏结算弹窗 */
	export class GameOverDialog extends ui.game.GameOverDialogUI{
		/**赚取的金币 */
		private _moneyScore:number;
		/**时间 */
		private _timeScore:number;

		constructor(moneyScore:number,timeScore:number){
			super();
			this._moneyScore = moneyScore;
			this._timeScore = timeScore;
			this.initView();
			this.initEvent();
		}

		/**初始化界面 */
		private initView():void{
			this.tfTimeScore.text = this._timeScore.toString();			
			this.tfMonsterScore.text = this._moneyScore.toString();
		}

		/**初始事件监听 */
		private initEvent():void{
			this.btnCarShop.clickHandler = Laya.Handler.create(this,this.openShop,null,false);
			this.btnPlay.clickHandler = Laya.Handler.create(this,this.playNewGame,null,false);
			this.btnDoubleScore.clickHandler = Laya.Handler.create(this,this.requestDoubleMoney);
		}

		/**请求双倍金币 */
		private requestDoubleMoney():void{
			manager.EventManager.instance.event(manager.EventManager.WATCH_VIEO);
			this._moneyScore = this._moneyScore * 2;	
			this.tfMonsterScore.text = this._moneyScore.toString();		
			this.btnDoubleScore.disabled = true;
		}

		/**打开商店弹窗 */
		private openShop():void{	
			manager.SoundPlayMgr.instance.playClick();
			GameDialogManager.instance.openShopDialog();
		}

		/**开始新游戏 */
		private playNewGame():void{
			manager.SoundPlayMgr.instance.playClick();
			GameDataManager.instance.changeMoney(this._moneyScore);
			manager.EventManager.instance.event(manager.EventManager.START_GAME,null);
			GameDialogManager.instance.closeGameOverDialog();
		}

		/**移除事件监听 */
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