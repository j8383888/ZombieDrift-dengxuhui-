/**
* name 
*/
module module{
	/**路径生成器 */
	export class RoadCreator{				
		/**道路实例映射 */
		private _roadClsDic:Laya.Dictionary = null;				
		constructor(){
			this._roadClsDic = new Laya.Dictionary();			
			this._roadClsDic.set(ResRoadConfigData.SOURCE_BEGIN0,RoadStraight);
			this._roadClsDic.set(ResRoadConfigData.SOURCE_BEGIN1,RoadStraight);
			this._roadClsDic.set(ResRoadConfigData.SOURCE_STRAIGHT,RoadStraight);
			this._roadClsDic.set(ResRoadConfigData.SOURCE_TURN_90,RoadTurn90Angle);
			this._roadClsDic.set(ResRoadConfigData.SOURCE_TURN_45,RoadTurn45Angle);
			this._roadClsDic.set(ResRoadConfigData.SOURCE_SIDE,RoadSide);
			this.initEvent();
		}

		private initEvent():void{
			
		}	

		private removeEvent():void{
			
		}

		/**
		 * 创建道路了item
		 * @param skinUrl 资源路径
		 * @param roadClsID 道路实例映射id
		 * @param rotation 旋转
		 */
		public createRoad(skinUrl:string,configData:ResRoadConfigData,isMoreMonster:boolean):IRoad{	
			var cls:any = this._roadClsDic.get(configData.sourceName);
			var road:IRoad;	
			if(isMoreMonster){
				road = new cls(skinUrl,configData,true);
			}else{
				road = new cls(skinUrl,configData,false);
			}
			return road;
		}

		/**释放 */
		public destroy():void{
			this.removeEvent();
		}
	}
}