/**
* name 
*/
module module {
	/**游戏道路管理器 */
	export class RoadManager {
		/**间隙修正 */
		public static INTERVAL_CORRECT:number = 1;
		/**最大缓存帧道路坐标 */
		public static MAX_CACHE: number = 18;
		/**唯一id */
		private _uID: number = 0;
		/**单位旋转角度 */
		public static UNIT_ROTATION: number = 0.8;
		/**道路宽度 */
		public static ROAD_WIDTH: number = 720;
		/**道路高度 */
		public static ROAD_HEIGHT: number = 720;
		/**单次创建道路数量 */
		public static ONCE_CREATE_NUM: number = 3;
		/**保留在舞台上的道路数量  汽车走过之后的道路*/
		public static KEEP_ROAD_NUM: number = 4;
		private static _instance: RoadManager;
		/**道路背景颜色字典 */
		private _roadBgColorDic: Laya.Dictionary;
		/**当前道路集合 */
		private _roadAry: Array<IRoad>;
		/**道路根节点 */
		private _roadContent: Laya.Component;
		/**道路旋转层 */
		private _roadRotationLayer: Laya.Component;
		/**道路生成器 */
		private _roadCreator: RoadCreator;
		/**下个路块 */
		private _nextRoadID: string = "";
		/**下个路块相对方向 */
		private _nextRoadDir: string = "";
		/**当前不可选方向 */
		private _disableDir: string = "";
		/**移动速度 */
		private _moveSpeed: number = CarItem.CAR_MIN_SPEED;
		/**是否正在缓慢移动 */
		private _isSlowing: boolean = false;
		/**缓存道路坐标 旋转 及汽车旋转 */
		private _cacheData: Array<string>;
		/**缓存的道路资源路径 */
		private _assetPath: Array<string>;
		/**僵尸增大增多剩余次数 */
		private _moreMonsterTimes: number;

		/**构造函数 */
		constructor() {
			this.init();
		}

		private init(): void {
			this._uID = 0;
			this._moreMonsterTimes = 0;
			this._roadBgColorDic = new Laya.Dictionary();
			this._roadBgColorDic.set(ROAD_STYLE.STYLE0, "#006a5d");
			this._roadBgColorDic.set(ROAD_STYLE.STYLE1, "#fcba2e");
			this._roadBgColorDic.set(ROAD_STYLE.STYLE2, "#004475");
			this._roadBgColorDic.set(ROAD_STYLE.STYLE3, "#418975");
			this._roadBgColorDic.set(ROAD_STYLE.STYLE4, "#5abde6");
			this._roadBgColorDic.set(ROAD_STYLE.STYLE5, "#004475");

			this._assetPath = new Array<string>();
			this._roadAry = new Array<IRoad>();
			this._cacheData = new Array<string>();

			this._moveSpeed = CarItem.CAR_MIN_SPEED;

			this._roadRotationLayer = new Laya.Component();
			this._roadRotationLayer.size(Laya.stage.width, Laya.stage.height);

			manager.LayerManager.instace.addToLayer(this._roadRotationLayer, manager.LayerManager.STAGE_ROAD_LAYER);

			this._roadContent = new Laya.Component();
			this._roadRotationLayer.addChild(this._roadContent);

			this._roadCreator = new RoadCreator();

			manager.EventManager.instance.on(manager.EventManager.USE_SKILL, this, this.onUseSkill);
		}

		/**使用减速技能 */
		private onUseSkill(skillID: number): void {
			if (skillID == ResSkillConfigData.SKILL_TIME_SLOW) {
				this._moveSpeed = this._moveSpeed / 2;
				this._isSlowing = true;
				Laya.timer.once(GameSkillManger.SLOW_TIME, this, function () {
					this._moveSpeed = this._moveSpeed * 2;
					this._isSlowing = false;
					manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
				});
			} else if (skillID == ResSkillConfigData.SKILL_ZOMBIES) {
				this._moreMonsterTimes = GameSkillManger.DOUBLE_MONSTER_TIMES;
			}
		}

		/**清空当前道路 */
		private clearCurRoad(): void {
			if (this._roadAry == null || this._roadAry.length <= 0) {
				return;
			}
			for (var i: number = 0; i < this._roadAry.length; i++) {
				var road: IRoad = this._roadAry[i];
				if (road != null) {
					road.destroy();
					road = null;
				}
			}
			this._roadAry.length = 0;
			for (var i: number = 0; i < this._assetPath.length; i++) {
				Laya.loader.clearRes(this._assetPath[i]);
			}
			this._assetPath.length = 0;
		}

		/**根据配置文件创建道路 */
		private createRoad(configData: ResRoadConfigData): IRoad {
			var road: IRoad;
			var assetNum: number = ResRoadConfigData.getRoadAssetNum(GameDataManager.instance.roadStyle, configData.sourceName);
			var randomID: number = Math.floor(Math.random() * assetNum);
			var assetName: string = configData.sourceName + "_" + randomID;
			var assetPath: string = ResRoadConfigData.getRoadAssetPath(GameDataManager.instance.roadStyle, assetName);
			if(this._moreMonsterTimes > 0){
				road = this._roadCreator.createRoad(assetPath, configData,true);
				this._moreMonsterTimes--;
				if(this._moreMonsterTimes <= 0){
					manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
				}
			}else{
				road = this._roadCreator.createRoad(assetPath,configData,false);
			}
			
			if (this._assetPath.indexOf(assetPath) == -1) {
				this._assetPath.push(assetPath);
			}
			return road;
		}

		/**运行时间 */
		private _time: number = 0;
		private loopTime(): void {
			this._time++;
		}
		private clearTime(): void {
			Laya.timer.clear(this, this.loopTime);
			this._time = 0;
		}

		//-------------------------------------public------------------------------------//

		public startTimer(): void {
			Laya.timer.loop(1000, this, this.loopTime);
		}

		/**清空当前道路 */
		public clear(): void {
			this.clearTime();
			this.clearCurRoad();
			this._moreMonsterTimes = 0;
			this._cacheData.length = 0;
			this._isSlowing = false;
			this._roadRotationLayer.rotation = 0;
			this._roadContent.x = 0;
			this._roadContent.y = 0;
			this._nextRoadDir = "";
			this._nextRoadID = "";
			this._disableDir = "";
			this._moveSpeed = CarItem.CAR_MIN_SPEED;
		}

		/**旋转道路 */
		public rotationRoad(direction: number): void {
			switch (direction) {
				case DIRECTION.RIGHT:
					{
						this._roadRotationLayer.rotation -= RoadManager.UNIT_ROTATION;
						break;
					}
				case DIRECTION.LEFT:
					{
						this._roadRotationLayer.rotation += RoadManager.UNIT_ROTATION;
						break;
					}
				default:
					console.assert(false, "错误方向");
					break;
			}
		}

		/**获取道路旋转角度 */
		public get roadRotation(): number {
			return this._roadRotationLayer.rotation;
		}

		/**获取 */
		public getRoadBgColor(roadStyle: number): string {
			if (this._roadBgColorDic.indexOf(roadStyle) != -1) {
				return this._roadBgColorDic.get(roadStyle);
			}
			else {
				console.assert(false, "style输入错误");
				return "";
			}
		}

		/**随机道路风格 */
		public randomRoadStyle(): number {
			return Math.floor(Math.random() * this._roadBgColorDic.keys.length);
		}

		/**更新道路 */
		public addRoad(): void {
			var lastX: number;
			var lastY: number;
			if (this._nextRoadID == "") {
				this.clearCurRoad();
				this._nextRoadID = ResRoadConfigData.DATA_KEY[0];
				this._nextRoadDir = ResRoadConfigData.RELATIVE_UP;
				this._disableDir = ResRoadTool.getDisableDir(this._nextRoadDir, this._nextRoadID);

				lastX = Laya.stage.width / 2;
				lastY = Laya.stage.height + RoadManager.ROAD_HEIGHT / 2;
			} else {
				lastX = this._roadAry[this._roadAry.length - 1]["x"];
				lastY = this._roadAry[this._roadAry.length - 1]["y"];
			}
			var needNum: number = RoadManager.ONCE_CREATE_NUM;
			while (needNum > 0) {
				this._disableDir = ResRoadTool.getDisableDir(this._nextRoadDir, this._nextRoadID);
				if (this._disableDir == "error") {
					console.assert(false);
				}
				var config: ResRoadConfigData = ResRoadConfigData.getDataByID(this._nextRoadID);
				var road: any = this.createRoad(config);
				switch (this._nextRoadDir) {
					//正上方
					case ResRoadConfigData.RELATIVE_UP:
						{
							road.x = lastX;
							road.y = lastY - RoadManager.ROAD_HEIGHT + RoadManager.INTERVAL_CORRECT;
							break;
						}
					//正下方					
					case ResRoadConfigData.RELATIVE_DOWN:
						{
							road.x = lastX;
							road.y = lastY + RoadManager.ROAD_HEIGHT - RoadManager.INTERVAL_CORRECT;
							break;
						}
					//正左
					case ResRoadConfigData.RELATIVE_LEFT:
						{
							road.x = lastX - RoadManager.ROAD_WIDTH + RoadManager.INTERVAL_CORRECT;
							road.y = lastY;
							break;
						}
					//正右
					case ResRoadConfigData.RELATIVE_RIGHT:
						{
							road.x = lastX + RoadManager.ROAD_WIDTH - RoadManager.INTERVAL_CORRECT;
							road.y = lastY;
							break;
						}
					//左上
					case ResRoadConfigData.RELATIVE_LEFT_UP:
						{
							road.x = lastX - RoadManager.ROAD_WIDTH / 2 + RoadManager.INTERVAL_CORRECT / 2;
							road.y = lastY - RoadManager.ROAD_HEIGHT / 2 + RoadManager.INTERVAL_CORRECT / 2;
							break;
						}
					//右上
					case ResRoadConfigData.RELATIVE_RIGHT_UP:
						{
							road.x = lastX + RoadManager.ROAD_WIDTH / 2 - RoadManager.INTERVAL_CORRECT / 2;
							road.y = lastY - RoadManager.ROAD_HEIGHT / 2 + RoadManager.INTERVAL_CORRECT / 2;
							break;
						}
					//左下
					case ResRoadConfigData.RELATIVE_LEFT_DOWN:
						{
							road.x = lastX - RoadManager.ROAD_WIDTH / 2 + RoadManager.INTERVAL_CORRECT / 2;
							road.y = lastY + RoadManager.ROAD_HEIGHT / 2 - RoadManager.INTERVAL_CORRECT / 2;
							break;
						}
					//右下
					case ResRoadConfigData.RELATIVE_RIGHT_DOWN:
						{
							road.x = lastX + RoadManager.ROAD_WIDTH / 2 - RoadManager.INTERVAL_CORRECT / 2;
							road.y = lastY + RoadManager.ROAD_HEIGHT / 2 - RoadManager.INTERVAL_CORRECT / 2;
							break;
						}
					default:
						console.assert(false, "道路相对位置配置错误");
						break;
				}
				lastX = road.x;
				lastY = road.y;
				var nextData: Array<string> = GameMath.randomNextRoad(config, this._disableDir, this._time);
				this._nextRoadID = nextData[0];
				this._nextRoadDir = nextData[1];
				this._roadAry.push(road);
				this._roadContent.addChildAt(road, 0);
				needNum--;
			}
		}

		/**尝试更新道路 */
		public tryUpdateRoad(carInRoad: IRoad): void {
			var index: number = this._roadAry.indexOf(carInRoad);
			if (index == -1) {
				console.assert(false, "未找到对应道路")
			}
			//1.更新移动速度
			if (!this._isSlowing) {
				this._moveSpeed = this._moveSpeed >= CarItem.CAR_MAX_SPEED ? this._moveSpeed : (this._moveSpeed + 0.001);
			}
			//2.删除道路
			if (index + 1 >= RoadManager.KEEP_ROAD_NUM) {
				var delNumber: number = index + 1 - RoadManager.KEEP_ROAD_NUM;
				if (delNumber > 0) {
					for (var i: number = 0; i < delNumber; i++) {
						this._roadAry[i].destroy();
						this._roadAry[i] = null;
					}
					this._roadAry.splice(0, delNumber);
					index -= delNumber;
				}
			}
			//3.如果当前存在变大僵尸 则更新接下来道路僵尸
			if (this._moreMonsterTimes > 0) {
				for (var i: number = index; i < this._roadAry.length; i++) {
					var road: IRoad = this._roadAry[i];
					if (road != null) {
						road.tweenHugeMonster();
						this._moreMonsterTimes--;
					} else {
						console.assert(false);
					}
					if(this._moreMonsterTimes <= 0){
						manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
						break;
					}
				}
			}

			var curRoadToEndRoadNum: number = this._roadAry.length - index - 1;
			if (curRoadToEndRoadNum <= RoadManager.ONCE_CREATE_NUM) {
				this.addRoad();
			}
			for (var i: number = 0; i < this._roadAry.length; i++) {
				if (i != index) {
					this._roadAry[i]["cacheAs"] = "bitmap";
				} else {
					this._roadAry[i]["cacheAs"] = "none";
				}
			}
		}


		/**移动道路 */
		public moveRoad(carRotation: number): void {
			var moveY: number = this._moveSpeed * Math.cos((this._roadRotationLayer.rotation - carRotation) / 180 * Math.PI);
			var moveX: number = this._moveSpeed * Math.sin((this._roadRotationLayer.rotation - carRotation) / 180 * Math.PI);
			var lastData: string = this._roadContent.x + "," + this._roadContent.y + "," + this._roadContent.rotation + "," + carRotation;
			if (this._cacheData.length >= RoadManager.MAX_CACHE) {
				this._cacheData.shift();
			}
			this._cacheData.push(lastData);
			this._roadContent.y += moveY;
			this._roadContent.x += moveX;
			// console.log(this._roadContent.rotation);			
			// console.log("道路容器X：" + this._roadContent.x + "道路容器Y：" + this._roadContent.y);
		}

		/**移动速度 */
		public get moveSpeed(): number {
			return this._moveSpeed;
		}

		private _tempSpeed: number;
		/**缓慢增速 */
		public slowUpSpeed(): void {
			this._tempSpeed = this._moveSpeed;
			this._moveSpeed = 1;
			this._isSlowing = true;
			Laya.timer.frameLoop(3, this, this.frameSlowUp);
		}

		private frameSlowUp(): void {
			this._moveSpeed += 0.5;
			if (this._moveSpeed >= this._tempSpeed) {
				Laya.timer.clear(this, this.frameSlowUp);
				this._isSlowing = false;
			}
		}

		/**移动怪物 */
		public moveMonster(centerRoad: IRoad, carInRoadPoint: Laya.Point): void {
			for (var i: number = 0; i < centerRoad.monsterAry.length; i++) {
				var monster: MonsterItem = centerRoad.monsterAry[i];
				if (!monster.isDead) {
					var angele: number = GameMath.getAngle(monster.x, monster.y, carInRoadPoint.x, carInRoadPoint.y,
						GameMath.Axis_Y);
					monster.rotation = angele;
					var long_X: number = MonsterItem.MOVE_SPEED * Math.sin(angele / 180 * Math.PI);
					var long_Y: number = MonsterItem.MOVE_SPEED * Math.cos(angele / 180 * Math.PI);
					monster.x += long_X;
					monster.y += long_Y;
				}
			}
		}

		private _globPoint: Laya.Point = new Laya.Point();
		/**通过汽车全局坐标获取汽车在哪一块地块上 */
		public getCarInWhichRoad(carGlobX: number, carGlobY: number): IRoad {
			var rightRoad: IRoad = null;
			this._globPoint.setTo(carGlobX, carGlobY);
			this._globPoint = this._roadContent.globalToLocal(this._globPoint, false);
			// console.log("X:" + this._globPoint.x + " Y:" + this._globPoint.y);

			for (var i: number = 0; i < this._roadAry.length; i++) {
				var road: IRoad = this._roadAry[i];
				if ((road['x'] - road['width'] / 2) <= this._globPoint.x &&
					(road['x'] + road['width'] / 2) >= this._globPoint.x &&
					(road['y'] + road['height'] / 2) >= this._globPoint.y &&
					(road['y'] - road['height'] / 2) <= this._globPoint.y) {
					rightRoad = road;
					break;
				}
			}
			return rightRoad;
		}

		/**将道路位置回退 */
		public rollBackRoadPos(): number {
			var lastData: string = this._cacheData[0];
			var lastDataAry: Array<string> = lastData.split(",");
			this._roadContent.x = parseInt(lastDataAry[0]);
			this._roadContent.y = parseInt(lastDataAry[1]);
			this._roadContent.rotation = parseInt(lastDataAry[2]);
			return parseInt(lastDataAry[3]);
		}

		/**设置旋转中心 */
		public changeRotationPivot(carX: number, carY: number): void {
			this._roadRotationLayer.pivotX = carX;
			this._roadRotationLayer.pivotY = carY;
			this._roadRotationLayer.pos(carX, carY);
		}

		/**创建道路唯一id */
		public createID(): number {
			return this._uID++;
		}

		public static get instance(): RoadManager {
			if (this._instance == null) {
				this._instance = new RoadManager();
			}
			return this._instance;
		}
	}
}