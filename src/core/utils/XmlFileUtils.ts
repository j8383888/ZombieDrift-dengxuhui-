/**
* name 
*/
module core{
	import Dictionary = laya.utils.Dictionary;

	export class XmlFileUtils{
		private static _instance:XmlFileUtils = null;
		constructor(){
		}

		/**登录配置 */
		public onLoadedConfigXML(xml:any){

		}

		/**模块配置 */
		public onLoadedModuleXML(xml:any){

		}

		/**资源配置 */
		public onLoadResourceXML(xml:any):void{

		}

		public static get instance():XmlFileUtils{
			if(this._instance == null){
				this._instance = new XmlFileUtils();
			}
			return this._instance;
		}
	}
}