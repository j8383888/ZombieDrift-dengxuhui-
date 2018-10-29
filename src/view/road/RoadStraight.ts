/**
* name 
*/
module module{
	/**直线段路 */
	export class RoadStraight extends ui.road.RoadStraightItemUI implements IRoad{		
		public static URL_LOGO:string = "ui/logo.png";
		public static URL_START:string = "ui/start.png";
		public static URL_TAP:string = "ui/tap.png";
		/**碰撞点开始id */
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
		/**皮肤路径 */
		private _skinUrl:string;	
		/**是否创建双倍僵尸 */
		public isDoubleMonster:boolean = false;				
		private _imgLogo:Laya.Image = null;
		private _imgStart:Laya.Image = null;
		private _imgTap:Laya.Image = null;				
		/**
		 * 构造函数
		 * @param skinUrl 资源路径
		 * @param configData 配置数据
		 */
		constructor(skinUrl:string,configData:ResRoadConfigData,isDoubleMonster:boolean){
			super();
			this.configData = configData;
			this._skinUrl = skinUrl;	
			this.uID = RoadManager.instance.createID();		 
			this.isDoubleMonster = isDoubleMonster;
			this.init();
		}

		private init():void{			
			this.anchorX = 0.5;
			this.anchorY = 0.5;			
			this.collision_points = new Array<Laya.Image>();
			var isTrue:boolean = true;
			var index:number = RoadStraight.START_POINT_ID;
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

			if(this.configData.sourceName == ResRoadConfigData.SOURCE_BEGIN0){
				this._imgStart = new Laya.Image(RoadStraight.URL_START);
				this._imgStart.pos(170,20);
				this.addChild(this._imgStart);

				this._imgTap = new Laya.Image(RoadStraight.URL_TAP);
				this._imgTap.pos(246,646);
				this.addChild(this._imgTap);

				this.btnCarShop.visible = true;

				this.clipVoice.visible = true;	
				if(GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE){
					this.clipVoice.index = 1;
				}else{
					this.clipVoice.index = 0;
				}
				manager.EventManager.instance.on(manager.EventManager.CLOSE_VOICE,this,this.closeVoice);
				manager.EventManager.instance.on(manager.EventManager.OPEN_VOICE,this,this.openVoice);
			}
			else{
				this.btnCarShop.visible = false;
				this.clipVoice.visible = false;
			}

			if(this.configData.sourceName == ResRoadConfigData.SOURCE_BEGIN1){
				this._imgLogo = new Laya.Image(RoadStraight.URL_LOGO);
				this._imgLogo.pos(176,200);
				this.addChild(this._imgLogo);
			}			
		}

		private closeVoice():void{
			this.clipVoice.index = 0;
		}

		private openVoice():void{
			this.clipVoice.index = 1;
		}

		private onVoiceChange():void{
			if(this.clipVoice.visible){
				if(GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE){
					this.clipVoice.index = 1;
				}else{
					this.clipVoice.index = 0;
				}
			}
		}

		private onCarShopClick(e:Laya.Event):void{
			e.stopPropagation();
			GameDialogManager.instance.openShopDialog();
		}

		private createMonster():void{
			var monsterNum:number = this.isDoubleMonster ? this.configData.monsterNum * 3 : this.configData.monsterNum;
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
			if(this.clipVoice.visible){
				manager.EventManager.instance.off(manager.EventManager.CLOSE_VOICE,this,this.closeVoice);
				manager.EventManager.instance.off(manager.EventManager.OPEN_VOICE,this,this.openVoice);
			}
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
			if(this._imgLogo != null){
				this._imgLogo.removeSelf();
				this._imgLogo.destroy();
				this._imgLogo = null;
			}
			if(this._imgStart != null){
				this._imgStart.removeSelf();
				this._imgStart.destroy();
				this._imgStart = null;
			}
			if(this._imgTap != null){
				this._imgTap.removeSelf();
				this._imgTap.destroy();
				this._imgTap = null;
			}			
		}
	}
}