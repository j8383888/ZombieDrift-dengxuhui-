/**
* name 
*/
module module{
	export class RoadTurn90Angle extends ui.road.RoadTurn90ItemUI implements IRoad{
		/**开始id */
		public static START_POINT_ID:number = 0;
		/**碰撞点集合 */
		public collision_points:Array<Laya.Image>;
		/**道路检查点 */
		public check_points:Array<Laya.Image>;
		/**怪物集合 */
		public monsterAry:Array<MonsterItem>;		
		/**唯一id */
		public uID:number;
		/**配置数据 */
		public configData:ResRoadConfigData;
		/**是否创建双倍僵尸 */
		public isDoubleMonster:boolean = false;				
		/**资源路径 */
		private _skinUrl:string;	
			
		/**
		 * 
		 * @param skinUrl 道路资源路径
		 * @param configData 配置数据
		 */
		constructor(skinUrl:string,configData:ResRoadConfigData,isDoubleMonster:boolean){
			super();
			this._skinUrl = skinUrl;
			this.configData = configData;
			this.uID = RoadManager.instance.createID();
			this.isDoubleMonster = isDoubleMonster;
			this.init();
		}

		/**初始化 */
		private init():void{			
			this.anchorX = 0.5;
			this.anchorY = 0.5;
			this.collision_points = new Array<Laya.Image>();	
			var isTrue:boolean = true;
			var index:number = 0;
			while(isTrue){
				var img:Laya.Image = this.getChildByName("point" + index) as Laya.Image;
				if(img == null){
					isTrue = false;
				}else{
					this.collision_points.push(img);
				}
				index++;
			}
			this.check_points = new Array<Laya.Image>();
			isTrue = true;
			index = 0;
			while(isTrue){
				var check:Laya.Image = this.getChildByName("check" + index)  as Laya.Image;
				if(check == null){
					isTrue = false;
				}else{
					this.check_points.push(check);
				}
				index++;
			}			
			this.imgRoad.skin = this._skinUrl;
			this.rotation = this.configData.rotation;
			this.createMonster();
		}

		private createMonster():void{			
			var monsterNum:number = this.isDoubleMonster ? this.configData.monsterNum * 2 : this.configData.monsterNum;
			this.monsterAry = new Array<MonsterItem>();			
			for(var i:number = 0;i < monsterNum;i++){
				var monsterData:Object = MonsterConfig.getRandomConfig();
				var monster:MonsterItem = new MonsterItem(monsterData,this.isDoubleMonster);								
				var randomX:number = GameMath.getRandomNumBetween(RoadManager.ROAD_WIDTH / 5,RoadManager.ROAD_WIDTH / 5 * 4);
				var randomY:number = GameMath.getRandomNumBetween(RoadManager.ROAD_HEIGHT / 5,RoadManager.ROAD_HEIGHT / 5 * 4);
				monster.pos(randomX,randomY);
				this.addChild(monster);
				this.monsterAry.push(monster);
			}
		}

		//------------------------------private over------------------------------------------//

		public tweenHugeMonster():void{
			var monsterNum:number = this.monsterAry.length;
			for(var i:number = 0;i < monsterNum;i++){
				var monsterData:Object = MonsterConfig.getRandomConfig();
				var newMonster:MonsterItem = new MonsterItem(monsterData,true);
				var randomX:number = GameMath.getRandomNumBetween(RoadManager.ROAD_WIDTH / 5,RoadManager.ROAD_WIDTH / 5 * 4);
				var randomY:number = GameMath.getRandomNumBetween(RoadManager.ROAD_HEIGHT / 5,RoadManager.ROAD_HEIGHT / 5 * 4);
				newMonster.pos(randomX,randomY);
				this.addChild(newMonster);
				this.monsterAry.push(newMonster);

				var oldMonster:MonsterItem = this.monsterAry[i];
				if(!oldMonster.isDead){
					oldMonster.tweenHuge();
				}
			}
		}

		/**释放 */
		public destroy():void{
			super.destroy();
			this.removeSelf();
			if(this.monsterAry != null){
				for(var i:number = 0;i < this.monsterAry.length;i++){
					var monster:MonsterItem = this.monsterAry[i];
					if(monster != null){
						monster.removeSelf();
						monster.destroy();
						monster = null;
					}
				}
				this.monsterAry.length = 0;
				this.monsterAry = null;
			}
		}
	}
}