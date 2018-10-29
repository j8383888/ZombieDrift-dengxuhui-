/**
* name 
*/
module manager{
	import Dictionary = laya.utils.Dictionary;

	/**配置文件管理器 */
	export class configManager{
		private static _instance:configManager = null;

		////////////////////////////////////////////下面三个不能有任何变动（在打包工具中会修改这里）///////////////////////////////////////////////////////////
		/**登录方式 */
		public loginType_js:number=1;
		/**是否是编辑模式 */
		public isEditor_js:number=0;
		/**是否显示游客登录 */
		public haveGuest_js:number=1;
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/**H5的版本号 */
		public versions:string = "";
		/**APP 的 IOS版 的版本号 */
		public iosAppVersion:string = "";
		/**APP 的 Android 的版本号*/
		public androidAppVersion:string = "";

		public hallIp:string = "";//
		public hallPort:number = 0;
		public httpUrl:string = "";
		

		/**模块的资源表 */
		public moduleConfigDic:Dictionary = null;
		/**资源配置表 */
		public resourceConfigDic:Dictionary = new Dictionary();

		constructor(){
			this.moduleConfigDic = new Dictionary();
			this.moduleConfigDic.set("CompanyIcon" , {name:"CompanyIcon" , source:"smallload.json"});
			this.moduleConfigDic.set("LoginView" , {name:"LoginView" , source:"login.json"});
			this.moduleConfigDic.set("HallView" , {name:"HallView" , source:"hall.json"});
			this.moduleConfigDic.set("GameView" , {name:"GameView" , source:"ui.json"});
		}

		public initEvent():void{
		}

		/**获取模块的资源数组 */
		public getModuleConfigSource(name:string):Array<any>{
			return this.getSource(this.moduleConfigDic.get(name).source);
		}

		public getSource(source:string):Array<any>{
			var arr = source.split(",");
			var fileUrls:Array<any> = new Array<any>();
			for(var i:number = 0 ; i < arr.length ; i++){
				fileUrls.push({url:manager.ResVersionMgr.instance.getMd5Url("res/atlas/"+arr[i]+"") , type:laya.net.Loader.ATLAS});
			}
			return fileUrls;
		}

		public static get instance():configManager{
			if(this._instance == null){
				this._instance = new configManager();
			}
			return this._instance;
		}
	}
}