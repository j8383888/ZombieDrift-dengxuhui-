/**
* name 
*/
module manager{
	import HttpRequest = Laya.HttpRequest;
	import ResourceConfigData = core.ResourceConfigData;
	declare function sendWeixinInfoRequest(access_code);

	export class ResVersionMgr{
		private static _instance:ResVersionMgr = null;
		private http:HttpRequest;

		constructor(){
		}

		/**获取带MD5的资源路径 */
		public getMd5Url(url:string):string{
			if(configManager.instance.resourceConfigDic.get(url) != null){
				var data:ResourceConfigData = configManager.instance.resourceConfigDic.get(url)
				return data.md5Url;
			}
			return url;
		}

		public static get instance():ResVersionMgr{
			if(this._instance == null){
				this._instance = new ResVersionMgr();
			}
			return this._instance;
		}
	}
}