/**
* name 
*/
module module{
	export class ResSkillConfigData{
		/**技能数量 */
		public static SKILL_NUM:number = 4;
		/**资源路径 */
		public static URL:string = "res/config/ResSkillConfigData.json";
		/**数据集合 */
		private static dataDic:Laya.Dictionary = new Laya.Dictionary();		

		//数据属性定义
		public static ATTR_ID:string = "id";
		public static ATTR_URL_BIG_LOCK:string = "url_big_lock";
		public static ATTR_URL_BIG_UNLOCK:string = "url_big_unlock";
		public static ATTR_URL_SMALL_LOCK:string = "url_small_lock";
		public static ATTR_URL_SMALL_UNLOCK:string = "url_small_unlock";
		public static ATTR_PRICE:string = "price";
		public static ATTR_NAME:string = "name";

		public static NAME:Array<string> = ["闪电弹","电锯","速度降低","僵尸群"];

		/**闪电技能 */
		public static SKILL_LIGHT:number = 1;
		/**电锯技能 */
		public static SKILL_SAW:number = 2;
		/**时间减速 */
		public static SKILL_TIME_SLOW:number = 3;		
		/**生成僵尸数量翻倍 */
		public static SKILL_ZOMBIES:number = 4;		

		/**通过数据id获取数据 */
		public static getDataByID(id:number):ResSkillConfigData{
			return this.dataDic.get(id);
		}	
		/**获取所有数据 */
		public static getAllDatas():Laya.Dictionary{
			return this.dataDic;
		}
		/**是否加载完成 */
		public static isLoaded:boolean = false;

		/**加载完成回调 */
		public static onLoadComplete():void{
			if(ResSkillConfigData.isLoaded){
				return;
			}
			ResSkillConfigData.isLoaded = true;
			var resource:Object = Laya.loader.getRes(ResSkillConfigData.URL);
			for(var i:number = 1;i <= ResSkillConfigData.SKILL_NUM;i++){
				var configData:Object = resource[i];
				var skillData:ResSkillConfigData = new ResSkillConfigData();
				skillData.id = configData[ResSkillConfigData.ATTR_ID];
				skillData.url_big_lock = configData[ResSkillConfigData.ATTR_URL_BIG_LOCK];
				skillData.url_big_unlock = configData[ResSkillConfigData.ATTR_URL_BIG_UNLOCK];
				skillData.url_small_lock = configData[ResSkillConfigData.ATTR_URL_SMALL_LOCK];
				skillData.url_small_unlock = configData[ResSkillConfigData.ATTR_URL_SMALL_UNLOCK];
				skillData.price = configData[ResSkillConfigData.ATTR_PRICE];
				skillData.name = ResSkillConfigData.NAME[skillData.id - 1];

				ResSkillConfigData.dataDic.set(skillData.id,skillData);
			}
		}


		//--------------------------------static over--------------------------------//
		public id:number;
		public url_big_lock:string;
		public url_big_unlock:string;
		public url_small_lock:string;		
		public url_small_unlock:string;
		public price:number;
		public name:string;

		constructor(){

		}
	}
}