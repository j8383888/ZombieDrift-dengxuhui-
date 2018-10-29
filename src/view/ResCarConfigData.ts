/**
* name 
*/
module module{
	export class ResCarConfigData{
		/**汽车数量 */
		public static CAR_NUM:number = 10;
		/**车辆ui锁住资源前缀 */
		public static SMALL_CAR_LOCK_PREFIX:string = "small_car_lock_";
		/**汽车图鉴前缀 */
		public static SMALL_CAR_UNLOCK_PREFIX:string = "small_car_";
		/**汽车被锁前缀 */
		public static BIG_LOCK_PREFIX:string = "car";
		/**汽车被锁后缀 */
		public static BIG_LOCK_SUFFIX:string = "_lock"
		/**汽车片段资源前缀 */
		public static CLIP_CAR_PREFIX:string = "clip_car_";	

		/**配置数据资源路径 */
		public static URL:string = "res/config/ResCarConfigData.json";
		/**是否加载完成 */
		public static isLoaded:boolean = false;
		/**配置数据字典 */
		private static dataDic:Laya.Dictionary = new Laya.Dictionary();

		/**通过id获取数据 */
		public static getDataByID(carID:number):ResCarConfigData{
			return this.dataDic.get(carID);
		}

		/**获取所有配置数据 */
		public static getAllData():Laya.Dictionary{
			return this.dataDic;
		}

		//属性定义
		public static ATTR_ID:string = "id";		
		public static ATTR_WHEEL_FRONT_LEFT:string = "wheel_front_left";
		public static ATTR_WHEEL_FRONT_RIGHT:string = "wheel_front_right";
		public static ATTR_WHEEL_BACK_LEFT:string = "wheel_back_left";
		public static ATTR_WHEEL_BACK_RIGHT:string = "wheel_back_right";	
		public static ATTR_SAW:string = "saw";
		public static ATTR_PRICE:string = "price";
		public static ATTR_TAIL:string = "tail";
		public static ATTR_GAS_FRONT_LEFT:string = "gas_front_left";
		public static ATTR_GAS_FRONT_RIGHT:string = "gas_front_right";
		public static ATTR_GAS_BACK_LEFT:string = "gas_back_left";
		public static ATTR_GAS_BACK_RIGHT:string = "gas_back_right";
		public static ATTR_COLLISION_RADIUS:string = "collision_radius";

		/**资源加载完成回调 */
		public static onLoadComplete():void{
			if(ResCarConfigData.isLoaded){
				return;
			}
			ResCarConfigData.isLoaded = true;
			var resource:Object = Laya.loader.getRes(ResCarConfigData.URL);
			for(var i:number = 1;i <= ResCarConfigData.CAR_NUM;i++){
				var data:Object = resource[i];
				var carData:ResCarConfigData = new ResCarConfigData();
				carData.id = data[ResCarConfigData.ATTR_ID];
				carData.price = data[ResCarConfigData.ATTR_PRICE];				
				carData.wheel_front_right.x = data[ResCarConfigData.ATTR_WHEEL_FRONT_RIGHT][0];
				carData.wheel_front_right.y = data[ResCarConfigData.ATTR_WHEEL_FRONT_RIGHT][1];
				carData.wheel_front_left.x = data[ResCarConfigData.ATTR_WHEEL_FRONT_LEFT][0];
				carData.wheel_front_left.y = data[ResCarConfigData.ATTR_WHEEL_FRONT_LEFT][1];
				carData.wheel_back_right.x = data[ResCarConfigData.ATTR_WHEEL_BACK_RIGHT][0];
				carData.wheel_back_right.y = data[ResCarConfigData.ATTR_WHEEL_BACK_RIGHT][1];
				carData.wheel_back_left.x = data[ResCarConfigData.ATTR_WHEEL_BACK_LEFT][0];
				carData.wheel_back_left.y = data[ResCarConfigData.ATTR_WHEEL_BACK_LEFT][1];	
				carData.saw.x = data[ResCarConfigData.ATTR_SAW][0];
				carData.saw.y = data[ResCarConfigData.ATTR_SAW][1];
				carData.tail.x = data[ResCarConfigData.ATTR_TAIL][0];
				carData.tail.y = data[ResCarConfigData.ATTR_TAIL][1];
				carData.gas_back_left.x = data[ResCarConfigData.ATTR_GAS_BACK_LEFT][0];
				carData.gas_back_left.y = data[ResCarConfigData.ATTR_GAS_BACK_LEFT][1];
				carData.gas_back_right.x = data[ResCarConfigData.ATTR_GAS_BACK_RIGHT][0];
				carData.gas_back_right.y = data[ResCarConfigData.ATTR_GAS_BACK_RIGHT][1];
				carData.gas_front_left.x = data[ResCarConfigData.ATTR_GAS_FRONT_LEFT][0];
				carData.gas_front_left.y = data[ResCarConfigData.ATTR_GAS_FRONT_LEFT][1];
				carData.gas_front_right.x = data[ResCarConfigData.ATTR_GAS_FRONT_RIGHT][0];
				carData.gas_front_right.y = data[ResCarConfigData.ATTR_GAS_FRONT_LEFT][1];
				carData.collision_radius = data[ResCarConfigData.ATTR_COLLISION_RADIUS];
				
				ResCarConfigData.dataDic.set(carData.id,carData);
			}
		}
		//-----------------------------------------static over---------------------------------------//
		public id:number;		
		public wheel_front_left:Laya.Point;
		public wheel_front_right:Laya.Point;
		public wheel_back_left:Laya.Point;
		public wheel_back_right:Laya.Point;		
		public gas_front_left:Laya.Point;
		public gas_front_right:Laya.Point;
		public gas_back_left:Laya.Point;
		public gas_back_right:Laya.Point;
		public saw:Laya.Point;
		public tail:Laya.Point;
		public price:number;
		public collision_radius:number;
		constructor(){
			this.wheel_front_left = new Laya.Point();
			this.wheel_front_right = new Laya.Point();
			this.wheel_back_left = new Laya.Point();
			this.wheel_back_right = new Laya.Point();
			this.saw = new Laya.Point();
			this.tail = new Laya.Point();
			this.gas_back_left = new Laya.Point();
			this.gas_back_right = new Laya.Point();
			this.gas_front_left = new Laya.Point();
			this.gas_front_right = new Laya.Point();
		}
	}
}