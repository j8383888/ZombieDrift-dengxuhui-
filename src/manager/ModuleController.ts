/**
* name 
*/
module manager{
	/**模块，弹窗 的显示隐藏控制器 */
	export class ModuleController{
		private static _instance:ModuleController = null;
		private moduleClassDic:laya.utils.Dictionary = new laya.utils.Dictionary();

		/**-----------------在这里添加界面索引 -------------------------*/
		/**游戏进入Icon */
		public static MN_CompanyIcon:string = "CompanyIcon";	
		/**游戏页*/	
		public static MN_GameView:string = "GameView";
		/**首页 */
		public static MN_HallView:string = "HallView";
		/**------------------------------------------------------------- */

		constructor(){
			/**在这里添加注册界面索引 */			
			this.moduleClassDic.set(ModuleController.MN_HallView , module.IndexView);
			// this.moduleClassDic.set(ModuleController.MN_GameView , module.GameView);	
		}
		/** 
		 * 显示弹框
		 * @param name 弹框名字
		 * @param center 弹框是否居中
		 * @param blockBackgound 弹框是否需要黑色遮罩
		 * @param isBackClose 点黑色遮罩弹框是否关闭
		 * @param args 打开弹框传的参数
		 * @param blockAp 弹框遮罩透明度
		*/
		public showDialog(name:string , center:boolean = false, blockBackgound:boolean = false, isBackClose:boolean = true , args:Array<any> = null , blockAp:number = 0.5){
			var dialogClass:any = this.moduleClassDic.get(name);
			if(dialogClass != null){
				var dialog:any = new dialogClass();
				if(args != null) dialog.setData(args);
				LayerManager.instace.addToLayer(dialog , LayerManager.STAGE_DIALOG_LAYER , center , blockBackgound ,isBackClose , blockAp);
			}			
		}
		
		private _curModuleView:laya.display.Sprite = null;		
		private nextModuleName:string = "";

		public changeModule(name:string , isBackgound:boolean = true , isShowLoading:boolean = true):void{
			this.nextModuleName = name;

			if(isBackgound){			
			}
			
			var sources = manager.configManager.instance.getModuleConfigSource(name);
			Laya.loader.load(sources, Laya.Handler.create(this, this.onLoadedModule));
		}

		private onLoadedModule():void{			
			if(this._curModuleView != null){
				this._curModuleView.destroy();
			}
			LayerManager.instace.clearLayer(LayerManager.STAGE_DIALOG_LAYER);

			var moduleClass:any = this.moduleClassDic.get(this.nextModuleName);
			if(moduleClass != null){
				this._curModuleView = new moduleClass();
				LayerManager.instace.addToLayer(this._curModuleView , LayerManager.STAGE_BOTTOM_LAYER , false , false);
			}
		}

		public static get instance():ModuleController{
			if(this._instance == null){
				this._instance = new ModuleController();
			}
			return this._instance;
		}
	}
}