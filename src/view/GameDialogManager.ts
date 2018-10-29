/**
* name 
*/
module module{
	/**
	 * 游戏弹窗管理中心
	 */
	export class GameDialogManager{		
		private static _instance:GameDialogManager;
		private _continueDialog:ContinueGameDialog;
		private _gameOverDialog:GameOverDialog;
		private _shopDialog:ShopDialog;
		private _earnMoneyDialog:EarnMoneyDialog;
		private _selectSkillDialog:SkillSelectDialog;
		/**打开中的弹窗数量 */
		private _openDialogNum:number = 0;

		constructor(){
			UIConfig.closeDialogOnSide = false;
		}		

		public static get instance():GameDialogManager{
			if(this._instance == null){
				this._instance = new GameDialogManager();
			}
			return this._instance;
		}

		/**打开继续游戏弹窗 */
		public openContinueDialog():void{
			if(this._continueDialog != null){
				return;
			}
			this._openDialogNum++;
			this._continueDialog = new ContinueGameDialog();
			this._continueDialog.show(false,true);
			this._continueDialog.startCountDown();
		}

		/**关闭继续游戏弹窗 */
		public closeContinueDialog():void{
			if(this._continueDialog != null){
				this._openDialogNum--;
				this._continueDialog.close();
				this._continueDialog.destroy();
				this._continueDialog = null;
			}
		}

		/**打开技能选择界面 */
		public openSkillSelectDialog():void{
			if(this._selectSkillDialog != null){
				return;
			}
			this._openDialogNum++;
			this._selectSkillDialog = new SkillSelectDialog();
			this._selectSkillDialog.show(false,true);			
		}

		/**关闭技能选择界面 */
		public closeSkillSelectDialog():void{
			if(this._selectSkillDialog != null){
				this._openDialogNum--;
				this._selectSkillDialog.close();
				this._selectSkillDialog.destroy();
				this._selectSkillDialog = null;
			}
		}

		/**
		 * 打开游戏结算弹窗
		 * @param moneyScore 
		 */
		public openGameOverDialog(moneyScore:number,timeScore:number):void{
			if(this._gameOverDialog != null){
				return;
			}
			this._openDialogNum++;			
			this._gameOverDialog = new GameOverDialog(moneyScore,timeScore);
			this._gameOverDialog.show(false,true);
		}

		/**
		 * 关闭游戏结算弹窗
		 */
		public closeGameOverDialog():void{
			if(this._gameOverDialog != null){
				this._openDialogNum--;
				this._gameOverDialog.close();
				this._gameOverDialog.destroy();
				this._gameOverDialog = null;
			}
		}

		/**打开商店弹窗 */
		public openShopDialog():void{
			if(this._shopDialog != null){
				return;
			}			
			this._openDialogNum++;
			this._shopDialog = new ShopDialog();
			this._shopDialog.show(false,true);
		}

		/**关闭商店弹窗 */
		public closeShopDialog():void{
			if(this._shopDialog != null){
				this._openDialogNum--;
				this._shopDialog.close();
				this._shopDialog.destroy();
				this._shopDialog = null;
			}
		}

		/**打开赚钱弹窗 */
		public openEarnMoneyDialog():void{
			if(this._earnMoneyDialog != null){
				return;
			}
			this._openDialogNum++;
			this._earnMoneyDialog = new EarnMoneyDialog();
			this._earnMoneyDialog.show(false,true);
		}

		/**关闭赚钱弹窗 */
		public closeEarnMoneyDialog():void{			
			if(this._earnMoneyDialog != null){
				this._openDialogNum--;
				this._earnMoneyDialog.close();
				this._earnMoneyDialog.destroy();
				this._earnMoneyDialog = null;
			}
		}

		/**是否存在打开的弹窗 */
		public get isExistOpeningDialog():boolean{
			return this._openDialogNum <= 0 ? false : true;
		}
	}
}