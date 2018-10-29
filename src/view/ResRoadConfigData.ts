/**
* name 
*/
module module {
	export class ResRoadConfigData {
		//道路资源类别
		/**开始道路第一段 */
		public static SOURCE_BEGIN0: string = "begin0";
		/**开始道路第二段 */
		public static SOURCE_BEGIN1: string = "begin1";
		/**直线段路 */
		public static SOURCE_STRAIGHT: string = "s";
		/**90度弯路 */
		public static SOURCE_TURN_90: string = "turn90";
		/**45度弯路 */
		public static SOURCE_TURN_45: string = "turn45";
		/**斜直路 */
		public static SOURCE_SIDE: string = "side";


		//配置数据属性		
		/**资源名称 */
		public static ATTR_SOURCE_NAMEL: string = "sourceName";
		/**道路旋转 */
		public static ATTR_ROTATION: string = "rotation";
		/**下块道路 */
		public static ATTR_NEXT_ROAD_PROBABILITY: string = "nextRoadProbability";
		/**下块道路相对方向 */
		public static ATTR_NEXT_DIRECTION:string = "nextDirection";
		/**赛道上僵尸数量 */
		public static ATTR_MONSTER_NUM:string = "monsterNum";

		//与前一个道路模块的相对位置
		public static RELATIVE_UP: string = "up";
		public static RELATIVE_DOWN: string = "down";
		public static RELATIVE_LEFT: string = "left";
		public static RELATIVE_RIGHT: string = "right";
		public static RELATIVE_LEFT_UP: string = "left_up";
		public static RELATIVE_LEFT_DOWN: string = "left_down";
		public static RELATIVE_RIGHT_UP: string = "right_up";
		public static RELATIVE_RIGHT_DOWN: string = "right_down";

		/**弯道 */
		public static ROAD_S:string = "s";
		/**直道 */
		public static ROAD_C:string = "c";


		/**道路样式资源数量配置 */
		public static ROAD_NUM_CONFIG: Object = {
			"0": {
				begin0: 1,
				begin1: 1,
				s: 8,
				side: 3,
				turn45: 3,
				turn90: 1
			},
			"1": {
				begin0: 1,
				begin1: 1,
				s: 3,
				side: 1,
				turn45: 1,
				turn90: 1
			},
			"2": {
				begin0: 1,
				begin1: 1,
				s: 3,
				side: 1,
				turn45: 1,
				turn90: 2
			},
			"3": {
				begin0: 1,
				begin1: 1,
				s: 3,
				side: 1,
				turn45: 1,
				turn90: 2
			},
			"4": {
				begin0: 1,
				begin1: 1,
				s: 3,
				side: 1,
				turn45: 1,
				turn90: 2
			},
			"5": {
				begin0: 1,
				begin1: 1,
				s: 3,
				side: 1,
				turn45: 1,
				turn90: 1
			}
		};

		/**资源路径 */
		public static URL: string = "res/config/ResRoadConfigData.json";
		/**是否加载完成 */
		public static isLoaded: boolean = false;
		/**数据集合 */
		public static dataDic: Laya.Dictionary = new Laya.Dictionary();
		/**获取资源数量 */
		public static getRoadAssetNum(roadStyle: number, roadID: string): number {
			var num: number = 0;
			return ResRoadConfigData.ROAD_NUM_CONFIG[roadStyle][roadID];
		}
		/**获取资源路径 */
		public static getRoadAssetPath(roadStyle: number, assetName: string): string {
			if(GameDataManager.USE_CDN == BOOLEAN.TRUE){
				return GameDataManager.CDN_PATH + "road" + roadStyle + "/" + assetName + ".png";
			}else{
				return "road" + roadStyle + "/" + assetName + ".png";
			}			
		}        

		/**获取该id是否为弯道 */
		public static getIsCurveRoad(roadID:string):boolean{
			switch (roadID) {
				case ResRoadConfigData.BEGIN0_ROTATION0:
				case ResRoadConfigData.BEGIN1_ROTATION0:
				case ResRoadConfigData.S_ROTATION0:
				case ResRoadConfigData.S_ROTATION90:
				case ResRoadConfigData.SIDE_ROTATION0:
				case ResRoadConfigData.SIDE_ROTATION90:
				{
					return false;
				}					
				case ResRoadConfigData.TURN45_ROTATION0:
				case ResRoadConfigData.TURN45_ROTATION90:
				case ResRoadConfigData.TURN45_ROTATION180:
				case ResRoadConfigData.TURN45_ROTATION270:
				case ResRoadConfigData.TURN90_ROTATION0:
				case ResRoadConfigData.TURN90_ROTATION90:
				case ResRoadConfigData.TURN90_ROTATION180:
				case ResRoadConfigData.TURN90_ROTATION270:
				{
					return true;
				}
			}
		}

		/**数据key集合 */
		public static DATA_KEY: Array<string> = [
			"begin0_rotation0", "begin1_rotation0",
			"s_rotation0", "s_rotation90",
			"turn90_rotation0", "turn90_rotation90", "turn90_rotation180", "turn90_rotation270",
			"turn45_rotation0", "turn45_rotation90", "turn45_rotation180", "turn45_rotation270",
			"side_rotation0", "side_rotation90"
		];

		public static BEGIN0_ROTATION0:string = "begin0_rotation0";
		public static BEGIN1_ROTATION0:string = "begin1_rotation0";
		public static S_ROTATION0:string = "s_rotation0";
		public static S_ROTATION90:string = "s_rotation90";
		public static TURN90_ROTATION0:string = "turn90_rotation0";
		public static TURN90_ROTATION90:string = "turn90_rotation90";
		public static TURN90_ROTATION180:string = "turn90_rotation180";
		public static TURN90_ROTATION270:string = "turn90_rotation270";
		public static TURN45_ROTATION0:string = "turn45_rotation0";
		public static TURN45_ROTATION90:string = "turn45_rotation90";
		public static TURN45_ROTATION180:string = "turn45_rotation180";
		public static TURN45_ROTATION270:string = "turn45_rotation270";
		public static SIDE_ROTATION0:string = "side_rotation0";
		public static SIDE_ROTATION90:string = "side_rotation90";

		/**加载完成回调 */
		public static onLoadComplete(): void {
			if (ResRoadConfigData.isLoaded) {
				return;
			}
			ResRoadConfigData.isLoaded = true;
			var resource:Object = Laya.loader.getRes(ResRoadConfigData.URL);
			for(var i:number = 0;i < ResRoadConfigData.DATA_KEY.length;i++){
				var data:Object = resource[ResRoadConfigData.DATA_KEY[i]];
				if(data == null){
					console.assert(false,"数据key值配置错误");
					return;
				}
				var roadConfig:ResRoadConfigData = new ResRoadConfigData();
				roadConfig.sourceName = data[ResRoadConfigData.ATTR_SOURCE_NAMEL];
				roadConfig.id = ResRoadConfigData.DATA_KEY[i];
				roadConfig.rotation = data[ResRoadConfigData.ATTR_ROTATION];
				roadConfig.monsterNum = data[ResRoadConfigData.ATTR_MONSTER_NUM];
				for(var j:number = 0;j < data[ResRoadConfigData.ATTR_NEXT_DIRECTION].length;j++){
					var direction:string = data[ResRoadConfigData.ATTR_NEXT_DIRECTION][j];
					roadConfig.nextRoadDirAry.push(direction);
					var probabitityData:Object = data[ResRoadConfigData.ATTR_NEXT_ROAD_PROBABILITY + "&" + direction];
					if(probabitityData != null){						
						var probabitityDic:Laya.Dictionary = new Laya.Dictionary();
						for(var k:number = 0;k < ResRoadConfigData.DATA_KEY.length;k++){
							var probabitity:number = probabitityData[ResRoadConfigData.DATA_KEY[k]];
							if(probabitity > 0){
								probabitityDic.set(ResRoadConfigData.DATA_KEY[k],probabitity);
							}
						}
						roadConfig.nextRoadProbabilityDic.set(direction,probabitityDic);
					}
				}				
				ResRoadConfigData.dataDic.set(roadConfig.id,roadConfig);
			}
		}

		/**通过id获取数据 */
		public static getDataByID(id: string): ResRoadConfigData {
			return this.dataDic.get(id);
		}

		//--------------------------------static over----------------------------------//		
		public id: string;
		/**资源名 */
		public sourceName: string;
		/**旋转 */
		public rotation: number;
		/**下一个路块的相对方向 */
		public nextRoadDirAry: Array<string>;
		/**下一个路块的概率分布 key:方向（up,down...）*/
		public nextRoadProbabilityDic: Laya.Dictionary;
		/**路块上怪物数量 */
		public monsterNum:number;
		/**构造函数 */
		constructor() {
			this.nextRoadProbabilityDic = new Laya.Dictionary();
			this.nextRoadDirAry = new Array<string>();
		}

		/**释放 */
		public destroy(): void {
			this.nextRoadProbabilityDic.clear();
			this.nextRoadProbabilityDic = null;
		}
	}
}