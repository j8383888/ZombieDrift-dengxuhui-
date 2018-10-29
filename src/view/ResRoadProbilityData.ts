/**
* name 
*/
module module{
	export class ResRoadProbilityData{
		/**资源路径 */
		public static URL:string = "res/config/ResRoadProbabilityData.json";
		/**数据集合 */
		private static dataDic:Laya.Dictionary = new Laya.Dictionary();

		public static ATTR_CUR_S:string = "cur_s";
		public static ATTR_CUR_C:string = "cur_c";
		public static ATTR_NEXT_S:string = "next_s";
		public static ATTR_NEXT_C:string = "next_c";

		public static TIME_0:number = 0;
		public static TIME_10:number = 10;
		public static TIME_50:number = 50;
		public static TIME_100:number = 100;
		public static TIME_200:number = 200;
		public static TIME_300:number = 300;
		public static TIME_500:number = 500;

		public static DATA_KEY:Array<string> = [
			"0","10","50","100","200","300","500"
		];
		/**
		 * 通过游戏进行时间获取概率分布数据
		 * @param time 时间 秒
		 */
		public static getDataByCurTime(time:number):ResRoadProbilityData{
			var data:ResRoadProbilityData;
			if(time >= ResRoadProbilityData.TIME_500){
				data = this.dataDic.get("500");
			}else if(time >= ResRoadProbilityData.TIME_300){
				data = this.dataDic.get("300");
			}else if(time >= ResRoadProbilityData.TIME_200){
				data = this.dataDic.get("200");
			}else if(time >= ResRoadProbilityData.TIME_100){
				data = this.dataDic.get("100");
			}else if(time >= ResRoadProbilityData.TIME_50){
				data = this.dataDic.get("50");
			}else if(time >= ResRoadProbilityData.TIME_10){
				data = this.dataDic.get("10");
			}else{
				data = this.dataDic.get("0");
			}
			return data;
		}
		/**是否加载完成 */
		public static isLoaded:boolean = false;

		public static onLoadComplete():void{
			if(ResRoadProbilityData.isLoaded){
				return;
			}
			ResRoadProbilityData.isLoaded = true;
			var resource:Object = Laya.loader.getRes(ResRoadProbilityData.URL);
			for(var i:number = 0;i < ResRoadProbilityData.DATA_KEY.length;i++){
				var configData:Object = resource[ResRoadProbilityData.DATA_KEY[i]];
				var data:ResRoadProbilityData = new ResRoadProbilityData();
				var cur_s_dic:Laya.Dictionary = new Laya.Dictionary();
				cur_s_dic.set(ResRoadProbilityData.ATTR_NEXT_C,
				configData[ResRoadProbilityData.ATTR_CUR_S][ResRoadProbilityData.ATTR_NEXT_C]);
				cur_s_dic.set(ResRoadProbilityData.ATTR_NEXT_S,
				configData[ResRoadProbilityData.ATTR_CUR_S][ResRoadProbilityData.ATTR_NEXT_S]);

				var cur_c_dic:Laya.Dictionary = new Laya.Dictionary();
				cur_c_dic.set(ResRoadProbilityData.ATTR_NEXT_C,
				configData[ResRoadProbilityData.ATTR_CUR_C][ResRoadProbilityData.ATTR_NEXT_C]);
				cur_c_dic.set(ResRoadProbilityData.ATTR_NEXT_S,
				configData[ResRoadProbilityData.ATTR_CUR_C][ResRoadProbilityData.ATTR_NEXT_S]);
				data.probabilityDic.set(ResRoadProbilityData.ATTR_CUR_S,cur_s_dic);
				data.probabilityDic.set(ResRoadProbilityData.ATTR_CUR_C,cur_c_dic);

				ResRoadProbilityData.dataDic.set(ResRoadProbilityData.DATA_KEY[i],data);
			}
		}

		//--------------------------------static over--------------------------------//	
		/**二维字典  字典中存储字典2*2 */
		public probabilityDic:Laya.Dictionary = new Laya.Dictionary();	
		constructor(){

		}
	}
}