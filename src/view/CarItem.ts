/**
* name 
*/
module module {
	/**汽车元件 */
	export class CarItem extends ui.game.CarItemUI {
		/**播放间隔 */
		public static INTERVAL: number = 100;
		/**默认id */
		public static DEFAULT_ID: number = 1;
		/**汽车帧速度 */
		public static CAR_MIN_SPEED: number = 18;
		/**汽车最低速度 */
		public static CAR_MAX_SPEED: number = 28;//30
		/**帧转向 */
		public static FRAME_ROTATION: number = 0.8;//0.8
		/**最大index */
		public static CLIP_MAX_INDEX: number = 3;
		/**电锯clip最大index */
		public static SAW_MAX_INDEX: number = 5;
		/**撞毁动画资源路径 */
		public static URL_CRASH: string = "effect/blow.ani";
		/**技能闪电效果 */
		public static URL_LIGHT: string = "effect/shandian.ani";
		/**尾气特效 */
		public static URL_TAIL: string = "effect/weiqi.ani";
		/**慢速特效 */
		public static URL_SLOW:string = "effect/animation_quan.ani";

		public static COLOR_WHEEL_NORMAL: string = "#000000";
		public static COLOR_WHEEL_OVER_MONSTER: string = "#407434";
		/**轮胎印宽度 */
		public static TYLE_WIDTH: number = 10;


		public static POINT_CODE_RIGHT_UP: string = "right_up";
		public static POINT_CODE_RIGHT_DOWN: string = "right_down";
		public static POINT_CODE_LEFT_UP: string = "left_up";
		public static POINT_CODE_LEFT_DOWN: string = "left_down";
		public static POINT_CODE_WHEEL_RIGHT_UP: string = "wheel_right_up";
		public static POINT_CODE_WHEEL_RIGHT_DOWN: string = "wheel_right_down";
		public static POINT_CODE_WHEEL_LEFT_UP: string = "wheel_left_up";
		public static POINT_CODE_WHEEL_LEFT_DOWN: string = "wheel_left_down";

		public static CHECK_NAME_KEY: Array<string> = ["right_up", "right_down", "left_up", "left_down", "wheel_right_up",
			"wheel_right_down", "wheel_left_up", "wheel_left_down"];
		/**上一帧旋转角度 */
		private _lastRotation: number;
		/**当前帧旋转角度 */
		private _curRotation: number;
		/**上一帧所在道路id */
		private _lastRoadUID: number = -1;
		/**当前帧所在道路id */
		private _curRoadUID: number = -1;
		/**汽车配置id */
		private _carID: number;
		/**配置数据 */
		private _configData: ResCarConfigData;
		/**检查点 */
		private _check_points: Laya.Dictionary;
		/**检查点上一帧相对道路坐标 */
		private _lastPoints: Laya.Dictionary;
		/**检查点当前帧相对于道路坐标 */
		private _curPoints: Laya.Dictionary;
		/**撞毁动画 */
		private _aniCrash: Laya.Animation;
		/**技能闪电特效 */
		private _aniSkillLight: Laya.Animation;		
		/**慢速技能特效 */
		private _aniSlowDown:Laya.Animation;
		/**汽车是否在放电 */
		private _isLighting: boolean = false;
		/**电锯左 */
		private _clipSawLeft: Laya.Clip;
		/**电锯右 */
		private _clipSawRight: Laya.Clip;
		/**是否正在播放尾气动画 */
		private _isPlayingWheelGas: boolean = false;
		/**汽车轮胎尾气字典 */
		private _wheelGasDic: Laya.Dictionary;
		/**碰撞半径 */
		public collision_radius: number;

		/**是否正在放电 */
		public get isLighting(): boolean {
			return this._isLighting;
		}
		/**
		 * 构造函数
		 * @param carID 汽车配置id
		 */
		constructor(carID: number) {
			super();
			this._carID = carID;
			this.initView();
			this.initEvent();
		}

		/**初始化界面 */
		private initView(): void {
			this._curRotation = 0;
			this._lastRotation = 0;
			this._check_points = new Laya.Dictionary();
			this._lastPoints = new Laya.Dictionary();
			this._curPoints = new Laya.Dictionary();

			//慢速动画
			this._aniSlowDown = new Laya.Animation();
			this._aniSlowDown.loadAnimation(CarItem.URL_SLOW);			

			//碰撞动画
			this._aniCrash = new Laya.Animation();
			this._aniCrash.loadAnimation(CarItem.URL_CRASH);
			this._aniCrash.scale(0.6, 0.6);

			//闪电技能
			this._aniSkillLight = new Laya.Animation();
			this._aniSkillLight.loadAnimation(CarItem.URL_LIGHT);

			//电锯
			this._clipSawLeft = this.clipSawLeft;
			this._clipSawLeft.parent.removeChild(this._clipSawLeft);
			this._clipSawRight = this.clipSawRight;
			this._clipSawRight.parent.removeChild(this._clipSawRight);

			this._wheelGasDic = new Laya.Dictionary();
			this._wheelGasDic.set(ResCarConfigData.ATTR_GAS_FRONT_LEFT, this.gas_front_left);
			this._wheelGasDic.set(ResCarConfigData.ATTR_GAS_FRONT_RIGHT, this.gas_front_right);
			this._wheelGasDic.set(ResCarConfigData.ATTR_GAS_BACK_LEFT, this.gas_back_left);
			this._wheelGasDic.set(ResCarConfigData.ATTR_GAS_BACK_RIGHT, this.gas_back_right);

			for (var i: number = 0; i < CarItem.CHECK_NAME_KEY.length; i++) {
				var point: Laya.Image = this.getChildByName(CarItem.CHECK_NAME_KEY[i]) as Laya.Image;
				var lastPoint: Laya.Point = new Laya.Point(0, 0);
				var curPoint: Laya.Point = new Laya.Point(0, 0);
				this._lastPoints.set(CarItem.CHECK_NAME_KEY[i], lastPoint);
				this._curPoints.set(CarItem.CHECK_NAME_KEY[i], curPoint);
				this._check_points.set(CarItem.CHECK_NAME_KEY[i], point);
			}
			this.updateCar();
		}

		/**更新汽车 */
		private updateCar(): void {
			this._configData = ResCarConfigData.getDataByID(this._carID);
			this.clipCar.skin = "car/" + ResCarConfigData.CLIP_CAR_PREFIX + this._carID + ".png";
			this.collision_radius = this._configData.collision_radius;
			this.size(this.clipCar.width, this.clipCar.height);
			this.updateCollisionPoints();
			this.updateWheelPoints();
			this.updateWheelGasPoints();
			this.pivot(this.width / 2, this.height / 4);
		}

		/**更新轮胎尾气点 */
		private updateWheelGasPoints(): void {
			for (var i: number = 0; i < this._wheelGasDic.values.length; i++) {
				var aniGas: Laya.Animation = this._wheelGasDic.values[i];
				aniGas.pos(this._configData[this._wheelGasDic.keys[i]].x,
					this._configData[this._wheelGasDic.keys[i]].y);
				aniGas.stop();
				if (aniGas.parent != null) {
					aniGas.parent.removeChild(aniGas);
				}
			}
			this._isPlayingWheelGas = false;
		}

		/**更新碰撞点 */
		private updateCollisionPoints(): void {
			var left_up: Laya.Image = this._check_points.get(CarItem.POINT_CODE_LEFT_UP);
			left_up.pos(0, 0);
			var left_down: Laya.Image = this._check_points.get(CarItem.POINT_CODE_LEFT_DOWN);
			left_down.pos(0, this.height - left_down.height);
			var right_up: Laya.Image = this._check_points.get(CarItem.POINT_CODE_RIGHT_UP);
			right_up.pos(this.width - right_up.width, 0);
			var right_down: Laya.Image = this._check_points.get(CarItem.POINT_CODE_RIGHT_DOWN);
			right_down.pos(this.width - right_down.width, this.height - right_down.height);
		}

		/**更新轮胎坐标 */
		private updateWheelPoints(): void {
			var left_up: Laya.Image = this._check_points.get(CarItem.POINT_CODE_WHEEL_LEFT_UP);
			left_up.pos(this._configData.wheel_front_left.x, this._configData.wheel_front_left.y);
			var left_down: Laya.Image = this._check_points.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN);
			left_down.pos(this._configData.wheel_back_left.x, this._configData.wheel_back_left.y);
			var right_up: Laya.Image = this._check_points.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP);
			right_up.pos(this._configData.wheel_front_right.x, this._configData.wheel_front_right.y);
			var right_down: Laya.Image = this._check_points.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN);
			right_down.pos(this._configData.wheel_back_right.x, this._configData.wheel_back_right.y);
		}

		/**移除事件 */
		private removeEvent(): void {
			manager.EventManager.instance.off(manager.EventManager.RACE_START, this, this.onRaceStart);
			manager.EventManager.instance.off(manager.EventManager.USE_SKILL, this, this.onUseSkill);			
			manager.EventManager.instance.off(manager.EventManager.SELECT_CAR_CHANGE, this, this.onSelectCarChange);
		}

		/**添加事件 */
		private initEvent(): void {
			manager.EventManager.instance.on(manager.EventManager.RACE_START, this, this.onRaceStart, null);
			manager.EventManager.instance.on(manager.EventManager.USE_SKILL, this, this.onUseSkill);			
			manager.EventManager.instance.on(manager.EventManager.SELECT_CAR_CHANGE, this, this.onSelectCarChange);
		}

		/**变更皮肤 */
		private onSelectCarChange(): void {
			var carID: number = GameDataManager.instance.selectCarID;
			if (this._carID == carID) {
				return;
			}
			this._carID = carID;
			this.updateCar();
		}

		/**技能使用监听 */
		private onUseSkill(skillID: number): void {
			if (skillID == ResSkillConfigData.SKILL_LIGHT) {
				this.addLightSkill();
			} else if (skillID == ResSkillConfigData.SKILL_SAW) {
				this.addSawSkill();
			}else if(skillID == ResSkillConfigData.SKILL_TIME_SLOW){
				this.addSlowSkill();
			}
		}

		/**添加慢速道具特效 */
		private addSlowSkill():void{
			this.addChild(this._aniSlowDown);
			this._aniSlowDown.pos(this.width / 2,this.height / 2);
			this._aniSlowDown.play(0,true);
			Laya.timer.once(GameSkillManger.SLOW_TIME,this,this.onSlowDownOver);
		}

		/**减速技能结束回调 */
		private onSlowDownOver():void{
			this._aniSlowDown.stop();
			if(this._aniSlowDown.parent != null){
				this._aniSlowDown.parent.removeChild(this._aniSlowDown);
			}
		}

		/**添加闪电特效道具 */
		private addLightSkill(): void {
			manager.SoundPlayMgr.instance.playLight();
			this.parent.addChild(this._aniSkillLight);
			this._aniSkillLight.pos(this.x, this.y);
			this._aniSkillLight.play(0, true);
			this._isLighting = true;			
			Laya.timer.once(GameSkillManger.LIGHTING_TIME,this,this.onLightPlayOver);
		}

		/**闪电特效播放完成回调 */
		private onLightPlayOver(): void {
			this._isLighting = false;
			this._aniSkillLight.stop();
			if (this._aniSkillLight.parent != null) {
				this._aniSkillLight.parent.removeChild(this._aniSkillLight);
			}
			manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
		}

		/**添加电锯道具 */
		private addSawSkill(): void {
			var configData: ResCarConfigData = ResCarConfigData.getDataByID(this._carID);
			this.collision_radius *= 2;
			this.addChildAt(this._clipSawLeft, 0);
			this._clipSawLeft.pos(configData.saw.x, configData.saw.y);
			this.addChildAt(this._clipSawRight, 0);
			this._clipSawRight.pos(configData.saw.x, configData.saw.y);
			this._clipSawLeft.rotation = -90;
			this._clipSawRight.rotation = 90;
			Laya.timer.frameLoop(1, this, this.loopSawClip);
			Laya.Tween.to(this._clipSawRight, { rotation: 0 }, 500);
			Laya.Tween.to(this._clipSawLeft, { rotation: 0 }, 500);
			Laya.timer.once(GameSkillManger.SAW_TIME, this, this.onSawSkillOver);
			manager.SoundPlayMgr.instance.playSawLoop();
		}

		/**定时播放电锯动画 */
		private loopSawClip(): void {
			var curIndex: number = this._clipSawLeft.index;
			curIndex = curIndex >= CarItem.SAW_MAX_INDEX ? 0 : curIndex + 1;
			this._clipSawRight.index = curIndex;
			this._clipSawLeft.index = curIndex;
		}

		/**电锯技能完毕 */
		private onSawSkillOver(): void {
			var configData: ResCarConfigData = ResCarConfigData.getDataByID(this._carID);
			this.collision_radius = configData.collision_radius;
			manager.SoundPlayMgr.instance.stopSaw();
			Laya.timer.clear(this, this.loopSawClip);
			Laya.timer.clear(this, this.onSawSkillOver);
			this._clipSawLeft.parent.removeChild(this._clipSawLeft);
			this._clipSawRight.parent.removeChild(this._clipSawRight);
			manager.EventManager.instance.event(manager.EventManager.USE_SKILL_COMPLETE);
		}

		/**比赛开始监听 */
		private onRaceStart(): void {
			Laya.timer.loop(CarItem.INTERVAL, this, this.playClip);
		}

		/**播放汽车循环动画 */
		private playClip(): void {
			var curIndex: number = this.clipCar.index;
			curIndex = curIndex >= CarItem.CLIP_MAX_INDEX ? 0 : curIndex + 1;
			this.clipCar.index = curIndex;
		}

		/**撞毁动画播放完成回调 */
		private onAniCrashPlayOver(): void {
			manager.SoundPlayMgr.instance.stopExplosion();
			if (this._aniCrash.parent != null) {
				this._aniCrash.parent.removeChild(this._aniCrash);
			}
			manager.EventManager.instance.event(manager.EventManager.CRASH_PLAY_OVER);
		}

		/**移除汽车烧胎气体 */
		private removeGasFromParent(): void {
			for (var i: number = 0; i < this._wheelGasDic.values.length; i++) {
				var aniGas: Laya.Animation = this._wheelGasDic.values[i];
				aniGas.stop();
				if (aniGas.parent != null) {
					aniGas.parent.removeChild(aniGas);
				}
			}
		}

		private tryRemoveAni(): void {
			if (this._aniSkillLight.parent != null) {
				this._aniSkillLight.stop();
				this._aniSkillLight.parent.removeChild(this._aniSkillLight);
			}			
			if (this._clipSawLeft != null && this._clipSawLeft.parent != null) {
				this.onSawSkillOver();
			}
			if(this._aniSlowDown.parent != null){
				this._aniSlowDown.stop();
				this._aniSlowDown.parent.removeChild(this._aniSlowDown);
			}
			this.removeGasFromParent();
		}

		/**撞毁 */
		public crash(): void {
			manager.SoundPlayMgr.instance.playExplosionLoop();
			this.tryRemoveAni();
			Laya.timer.clear(this, this.playClip);
			if (this._aniCrash != null) {
				this._aniCrash.pos(this.x, this.y);
				this.parent.addChild(this._aniCrash);
				this._aniCrash.once(Laya.Event.COMPLETE, this, this.onAniCrashPlayOver);
				this._aniCrash.play(0, false);
			}
		}

		/**更新汽车本地坐标及旋转 */
		public updateData(rotation: number, road: IRoad): void {
			for (var i: number = 0; i < this._curPoints.values.length; i++) {
				var key: string = this._curPoints.keys[i];
				var curPoint: Laya.Point = this._curPoints.values[i];
				var lastPoint: Laya.Point = this._lastPoints.get(key);
				lastPoint.setTo(curPoint.x, curPoint.y);
				var point: Laya.Image = this._check_points.get(key);
				var globPoint: Laya.Point = this.toParentPoint(new Laya.Point(point.x, point.y));
				var pointInRoad: Laya.Point = road["globalToLocal"](globPoint, false);
				curPoint.setTo(pointInRoad.x, pointInRoad.y);
			}
			this._lastRotation = this._curRotation;
			this._curRotation = rotation;
			this._lastRoadUID = this._curRoadUID;
			this._curRoadUID = road.uID;
		}

		/**获取两次rotation差值 */
		public getIsExistDrift(): boolean {
			var isExist: boolean = false;
			if (Math.abs(this._curRotation - this._lastRotation) > CarItem.FRAME_ROTATION) {
				isExist = true;
			}
			return isExist;
		}

		public reset(): void {
			if (this._aniCrash.parent != null) {
				this._aniCrash.parent.removeChild(this._aniCrash);
			}
			if (this._aniSkillLight.parent != null) {
				this._aniSkillLight.parent.removeChild(this._aniSkillLight);
			}			
			this.removeGasFromParent();
			this.rotation = 0;
			this._lastRotation = 0;
			this._curRotation = 0;
		}

		/**尝试停止播放尾气动画 */
		public tryStopWheelGas(): void {
			if (this._isPlayingWheelGas) {
				manager.SoundPlayMgr.instance.stopSkid();
				for (var i: number = 0; i < this._wheelGasDic.values.length; i++) {
					var aniGas: Laya.Animation = this._wheelGasDic.values[i];
					aniGas.stop();
					if (aniGas.parent != null) {
						aniGas.parent.removeChild(aniGas);
					}
				}
				this._isPlayingWheelGas = false;
			}
		}

		/**播放尾气动画 */
		public tryPlayWheelGas(): void {
			if (this._isPlayingWheelGas) {
				return;
			}
			manager.SoundPlayMgr.instance.playSkidLoop();
			for (var i: number = 0; i < this._wheelGasDic.values.length; i++) {
				var aniGas: Laya.Animation = this._wheelGasDic.values[i];
				this.addChildAt(aniGas, 0);
				aniGas.play(0, true);
			}
			this._isPlayingWheelGas = true;
		}

		/**绘制轮胎印 */
		public drawTyleSkid(road: IRoad, isRunOverMonster: boolean): void {
			if (this._curRoadUID != this._lastRoadUID) {
				//汽车在两个道路切换处会存在计算误差  先不计算着部分的坐标转换
				return;
			}
			var color: string = isRunOverMonster ? CarItem.COLOR_WHEEL_OVER_MONSTER : CarItem.COLOR_WHEEL_NORMAL;
			//TODO  碾过怪物  绘制红色  没碾过绘制黑色轮胎印				
			var front_left_sprite: Laya.Sprite = new Laya.Sprite();
			front_left_sprite.graphics.drawLine(
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).x,
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).y,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).x,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_UP).y,
				color, CarItem.TYLE_WIDTH
			);
			front_left_sprite.alpha = 0.7;
			road['addChild'](front_left_sprite);

			var front_right_sprite: Laya.Sprite = new Laya.Sprite();
			front_right_sprite.graphics.drawLine(
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).x,
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).y,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).x,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_UP).y,
				color, CarItem.TYLE_WIDTH
			);

			front_right_sprite.alpha = 0.7;
			road['addChild'](front_right_sprite);

			var back_left_sprite: Laya.Sprite = new Laya.Sprite();
			back_left_sprite.graphics.drawLine(
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).x,
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).y,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).x,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_LEFT_DOWN).y,
				color, CarItem.TYLE_WIDTH
			);
			back_left_sprite.alpha = 0.7;
			road['addChild'](back_left_sprite);

			var back_right_sprite: Laya.Sprite = new Laya.Sprite();
			back_right_sprite.graphics.drawLine(
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).x,
				this._lastPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).y,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).x,
				this._curPoints.get(CarItem.POINT_CODE_WHEEL_RIGHT_DOWN).y,
				color, CarItem.TYLE_WIDTH
			);
			back_right_sprite.alpha = 0.7;
			road['addChild'](back_right_sprite);
		}

		public get configData(): ResCarConfigData {
			return this._configData;
		}

		public getLastPoint(pointCode: string): Laya.Point {
			return this._lastPoints.get(pointCode);
		}

		public getCurPoint(pointCode: string): Laya.Point {
			return this._curPoints.get(pointCode);
		}

		public destroy(): void {
			super.destroy();
		}
	}
}