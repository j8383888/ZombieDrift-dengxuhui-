/**
* name 
*/
module module {
	export class IndexView extends ui.game.IndexViewUI implements manager.EnterFrameFace {
		/**继续游戏倒计时 */
		public static CONTINUE_COUNT_DOWN: number = 3000;
		/**场景切换bg资源路径 */
		public static SCENE_CHANGE_URL: string = "ui/blackbg.png";
		/**帧id */
		public faceId: number;
		/**游戏界面背景 */
		private _gameBg: Laya.Sprite;
		/**汽车 */
		private _carItem: CarItem = null;		

		/**是否开始游戏 */
		private _isStartGame: boolean = false;
		/**当前得分 撞死的僵尸数量*/
		private _scoreMonster: number;
		/**当前得分 汽车跑的时间 */
		private _scoreTime:number;
		/**碰撞血集合 */
		private _collisionBloods: Array<Laya.Image>;
		/**技能管理器 */
		private _gameSkillMgr: GameSkillManger;

		public get isStartGame(): boolean {
			return this._isStartGame;
		}

		public get cartItem(): CarItem {
			return this._carItem;
		}
		constructor() {
			super();
			this.faceId = manager.EnterFrameManager.instance.id;
			this.initView();
			this.initEvent();
		}

		/**初始化界面 */
		private initView(): void {
			this.mouseEnabled = true;
			this.mouseThrough = true;			

			this.tfCoutDown.parent.removeChild(this.tfCoutDown);
			var shopX:number = 65;
			var shopY:number = Laya.stage.height - RoadManager.ROAD_HEIGHT + 500;
			this.btnShop.pos(shopX,shopY);

			var voiceX:number = 565;
			var voiceY:number = Laya.stage.height - RoadManager.ROAD_HEIGHT + 500;
			this.btnVoice.pos(voiceX,voiceY);

			this._scoreMonster = 0;
			this._scoreTime = 0;

			this._gameBg = new Laya.Sprite();
			manager.LayerManager.instace.addToLayer(this._gameBg, manager.LayerManager.STAGE_BACKGROUND_LAYER);

			this._carItem = new CarItem(GameDataManager.instance.selectCarID);
			this._carItem.x = Laya.stage.width / 2;
			this._carItem.y = Laya.stage.height - this._carItem.height - 200;
			this.addChild(this._carItem);

			this._gameSkillMgr = new GameSkillManger(this.skillModule);

			var isTrue: boolean = true;
			var index: number = 0;
			this._collisionBloods = new Array<Laya.Image>();
			while (isTrue) {
				var blood: Laya.Image = this.getChildByName("collision" + index) as Laya.Image;
				if (blood == null) {
					isTrue = false;
				} else {
					blood.visible = false;
					this._collisionBloods.push(blood);
				}
				index++;
			}

			this.updateGameScene();
			this.changeTipVisible(false, false);
			manager.EnterFrameManager.instance.addItem(this);

			//播放背景音乐
			manager.SoundPlayMgr.instance.playBgMusic();
		}

		/**变更提示显示状态 */
		private changeTipVisible(isShow: boolean, isFadeTween: boolean = true): void {
			if (isShow) {
				this.imgTapLeft.alpha = 1;
				this.imgTapRight.alpha = 1;
				this.imgTapLeft.visible = true;
				this.imgTapRight.visible = true;
			} else {
				if (isFadeTween) {
					Laya.Tween.to(this.imgTapLeft, { alpha: 0 }, 200, null, Laya.Handler.create(this, function () {
						this.imgTapLeft.visible = false;
					}));
					Laya.Tween.to(this.imgTapRight, { alpha: 0 }, 200, null, Laya.Handler.create(this, function () {
						this.imgTapRight.visible = false;
					}));
				} else {
					this.imgTapLeft.visible = false;
					this.imgTapRight.visible = false;
				}

			}
		}

		/**初始化游戏事件监听 */
		private initEvent(): void {
			OperationManager.instance.initilize(this);
			manager.EventManager.instance.on(manager.EventManager.START_GAME, this, this.onSceneChange, null);
			manager.EventManager.instance.on(manager.EventManager.SKIP_CONTINUE_GAME, this, this.gameOver, null);
			manager.EventManager.instance.on(manager.EventManager.PLAY_CONTINUE, this, this.gameContinue);						
		}

		/**游戏结算 */
		private gameOver(): void {
			Laya.timer.clear(this,this.updateScore);
			GameDialogManager.instance.closeContinueDialog();			
			GameDialogManager.instance.openGameOverDialog(this._scoreMonster,this._scoreTime);
		}

		private _continueCountDown: number;
		/**续命继续游戏 */
		private gameContinue(): void {
			this._continueCountDown = Math.floor(IndexView.CONTINUE_COUNT_DOWN / 1000);
			GameDialogManager.instance.closeContinueDialog();
			this._carItem.visible = true;

			this.addChildAt(this.tfCoutDown, this.numChildren - 1);
			this.tfCoutDown.text = this._continueCountDown.toString();
			this._carItem.rotation = RoadManager.instance.rollBackRoadPos();
			Laya.timer.loop(1000, this, this.gameContinueCountDown);
		}

		/**继续游戏倒计时 */
		private gameContinueCountDown(): void {
			this._continueCountDown--;
			if (this._continueCountDown <= 0) {
				Laya.timer.clear(this, this.gameContinueCountDown);
				//开始游戏
				this.tfCoutDown.parent.removeChild(this.tfCoutDown);
				manager.EventManager.instance.event(manager.EventManager.RACE_START);
				this._gameSkillMgr.continue();
				RoadManager.instance.slowUpSpeed();
				this._isStartGame = true;
			} else {
				this.tfCoutDown.text = this._continueCountDown.toString();
			}
		}

		/**更新游戏场景 */
		private updateGameScene(): void {
			GameDataManager.instance.roadStyle = RoadManager.instance.randomRoadStyle();
			this.changeGameBgColor();
			this._carItem.reset();
			this._carItem.x = Laya.stage.width / 2;
			this._carItem.y = Laya.stage.height - this._carItem.height - 200;
			this._scoreMonster = 0;
			this._scoreTime = 0;
			this.tfScore.text = "0";
			Laya.timer.loop(1000,this,this.updateScore);

			this._carItem.visible = true;

			RoadManager.instance.clear();
			RoadManager.instance.startTimer();
			RoadManager.instance.addRoad();
			RoadManager.instance.changeRotationPivot(this._carItem.x, this._carItem.y);
			this.btnStartGame.on(Laya.Event.CLICK, this, this.onStartGameClick, null);
			this.btnShop.on(Laya.Event.CLICK,this,this.openShopDialog);
			this.btnVoice.on(Laya.Event.CLICK,this,this.openOrCloseVoice);
		}

		private updateScore():void{
			if(this._isStartGame){
				this._scoreTime++;
				this.tfScore.text = this._scoreTime.toString();
			}
		}

		private openOrCloseVoice():void{			
			if(GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE){
				GameDataManager.instance.isVoiceOpen = BOOLEAN.FALSE;
				manager.EventManager.instance.event(manager.EventManager.CLOSE_VOICE);
			}else{
				GameDataManager.instance.isVoiceOpen = BOOLEAN.TRUE;
				manager.EventManager.instance.event(manager.EventManager.OPEN_VOICE);
			}
		}

		private openShopDialog(e:Laya.Event):void{
			e.stopPropagation();
			GameDialogManager.instance.openShopDialog();
		}

		/**开始游戏 */
		private onStartGameClick(e: Laya.Event): void {
			if (GameDialogManager.instance.isExistOpeningDialog) {
				return;
			}						
			this.btnShop.off(Laya.Event.CLICK,this,this.openShopDialog);
			this.btnStartGame.off(Laya.Event.CLICK, this, this.onStartGameClick);
			manager.EventManager.instance.once(manager.EventManager.SKILL_SELECT_COMPLETE, this, this.onSkillSelectComplete);
			GameDialogManager.instance.openSkillSelectDialog();
		}

		/**技能选择完成回调 */
		private onSkillSelectComplete(selectSkill: number): void {
			this._gameSkillMgr.run(selectSkill);
			if (GameDataManager.instance.isNewPlayer == BOOLEAN.TRUE) {
				this.changeTipVisible(true);
				Laya.stage.once(Laya.Event.MOUSE_DOWN, this, function () {
					this.changeTipVisible(false, true);
					GameDataManager.instance.isNewPlayer = BOOLEAN.FALSE;
				});
			}
			this._isStartGame = true;
			manager.EventManager.instance.event(manager.EventManager.RACE_START);
			Laya.Tween.to(this._carItem, { y: Laya.stage.height / 2 }, 1000, null, Laya.Handler.create(this, function () {
				RoadManager.instance.changeRotationPivot(this._carItem.x, this._carItem.y);
				manager.EventManager.instance.event(manager.EventManager.REQUSET_FIRE_FREE_SKILL);
			}));
		}

		/**场景切换 */
		private onSceneChange(): void {
			this.updateGameScene();			
		}

		/**变更背景色 */
		private changeGameBgColor(): void {
			var color: string = RoadManager.instance.getRoadBgColor(GameDataManager.instance.roadStyle);
			this._gameBg.graphics.clear();
			this._gameBg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, color, color);
		}

		/**移除所有监听事件 */
		private removeEvent(): void {
			manager.EventManager.instance.off(manager.EventManager.START_GAME, this, this.onSceneChange);
			manager.EventManager.instance.off(manager.EventManager.SKIP_CONTINUE_GAME, this, this.gameOver, null);			
			manager.EventManager.instance.off(manager.EventManager.PLAY_CONTINUE, this, this.gameContinue);
		}
		private _carInRoadPoint:Laya.Point = new Laya.Point();
		public onEnterFrame(): void {
			//游戏未开始
			if (!this._isStartGame) {
				return;
			}

			//1.移动ui
			RoadManager.instance.moveRoad(this._carItem.rotation);		
			//2.计算汽车在哪一块道路上
			var road: IRoad = RoadManager.instance.getCarInWhichRoad(this._carItem.x, this._carItem.y);
			if (road == null) {
				console.assert(false);
				return;
			}			
			//3.汽车在道路的局部坐标
			this._carInRoadPoint.setTo(this._carItem.x,this._carItem.y);
			this._carInRoadPoint = road['globalToLocal'](
				this._carInRoadPoint, false);

			//移动怪物
			RoadManager.instance.moveMonster(road, this._carInRoadPoint);

			//4.如果漂移绘制轮胎印记			
			this._carItem.updateData(this._carItem.rotation, road);
			//检测碰撞怪物
			var isRunOver: boolean = this.collisionMonster(road, this._carInRoadPoint);
			if (this._carItem.getIsExistDrift() && RoadManager.instance.moveSpeed >= 2) {
				this._carItem.tryPlayWheelGas();
				this._carItem.drawTyleSkid(road, isRunOver);
			} else {
				this._carItem.tryStopWheelGas();
			}

			//5.碰撞检测
			var isCrash: boolean = this.collisionIsCrash(road, this._carInRoadPoint);
			if (isCrash) {
				this.onCarCrash();
				console.log("撞毁时汽车在道路ID为：" + road.uID);
				return;
			}
			RoadManager.instance.tryUpdateRoad(road);
		}

		/**汽车撞毁 */
		private onCarCrash(): void {
			this._isStartGame = false;
			this._gameSkillMgr.reset();
			manager.EventManager.instance.once(manager.EventManager.CRASH_PLAY_OVER, this, this.onCarCrashComplete);
			this._carItem.visible = false;
			this._carItem.crash();
		}

		/**汽车撞毁完成回调 */
		private onCarCrashComplete(): void {
			GameDialogManager.instance.openContinueDialog();
		}

		/**
		 * 碰撞怪物
		 * @param road 当前道路
		 * @param carLocalPoint 小车局部坐标
		 * @return 返回是否碾过死亡的怪物
		 */
		private collisionMonster(road: IRoad, carLocalPoint: Laya.Point): boolean {
			var runOverMonster: boolean = false;
			for (var i: number = 0; i < road.monsterAry.length; i++) {
				var monster: MonsterItem = road.monsterAry[i];
				//如果技能正在使用直接杀死怪物				
				if (this._carItem.isLighting) {
					//判断是否碾过怪物
					if (monster.isDead && !runOverMonster) {
						runOverMonster = true;
					}
					//碰撞判断
					if (!monster.isDead) {
						this._scoreMonster++;						
						this.playRandomBlood();
						monster.dead();
						manager.SoundPlayMgr.instance.playMonsterHit();
					}
				}
				else {
					//使用电锯道具增加攻击范围
					if (Math.pow(carLocalPoint.x - monster.x, 2) + Math.pow(carLocalPoint.y - monster.y, 2) <=
						Math.pow(monster.collision_radius, 2) + Math.pow(this._carItem.collision_radius, 2)) {
						//判断是否碾过怪物
						if (monster.isDead && !runOverMonster) {
							runOverMonster = true;
						}
						//碰撞判断
						if (!monster.isDead) {
							this._scoreMonster++;							
							this.playRandomBlood();
							monster.dead();
							manager.SoundPlayMgr.instance.playMonsterHit();
						}
					}
				}				
			}
			return runOverMonster;
		}

		/**是否正在播放掉血动画 */
		private _isPlayBlood: boolean = false;
		/**随机播放血液动画 */
		private playRandomBlood(): void {
			if (this._isPlayBlood) {
				return;
			}
			this._isPlayBlood = true;
			var blood: Laya.Image = this._collisionBloods.shift();
			this._collisionBloods.push(blood);
			blood.visible = true;
			blood.alpha = 0.8;
			Laya.Tween.to(blood, { alpha: 0 }, 800, null, Laya.Handler.create(this, function () {
				blood.visible = false;
				this._isPlayBlood = false;
			}));
		}

		/**检测是否碰撞围栏 */
		private collisionIsCrash(road: IRoad, carLocalPoint: Laya.Point): boolean {
			var isCrash: boolean = false;
			for (var i: number = 0; i < road.collision_points.length; i++) {
				var imgPoint: Laya.Image = road.collision_points[i];
				if (carLocalPoint.distance(imgPoint.x, imgPoint.y) <= 50) {
					isCrash = true;
					break;
				}				
			}
			return isCrash;
		}

		/**释放 */
		public destroy(): void {
			super.destroy();
			this.removeEvent();
		}
	}
}