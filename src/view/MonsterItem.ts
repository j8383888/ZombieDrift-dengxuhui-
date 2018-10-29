/**
* name 
*/
module module {
	/**怪物item */
	export class MonsterItem extends laya.ui.Component {
		public static HUGE: number = 1.8;
		/**怪物单位移动速度 */
		public static MOVE_SPEED: number = 0.2;
		private _maxClipIndex: number;
		/**配置数据 */
		private _configData: Object;
		/**是否被撞死 */
		private _isDead: boolean = false;
		/**monster */
		private _clipMonster: Laya.Clip;
		/**被撞 */
		private _imgCrush: Laya.Image;
		/**碰撞半径 */
		private _collision_radius: number;
		/**是否变大 */
		private _isHuge: boolean = false;

		public get collision_radius(): number {
			return this._collision_radius;
		}
		/**
		 * 构造函数
		 */
		constructor(configData: Object, isHuge: boolean) {
			super();
			this._isHuge = isHuge;
			this._configData = configData;
			this.init();
		}

		/**初始化 */
		private init(): void {
			this._isDead = false;

			this.update();

			this._imgCrush = new Laya.Image();
			this._imgCrush.skin = MonsterConfig.ROOT_PATH + this._configData[MonsterConfig.CRUSH_SKIN];
			this.addChild(this._imgCrush);

			this._clipMonster = new Laya.Clip();
			this._clipMonster.skin = MonsterConfig.ROOT_PATH +
				MonsterConfig.MONSTER_PREFIX + this._configData[MonsterConfig.ID] + MonsterConfig.MONSTER_SUFFIX;
			this._clipMonster.clipX = this._configData[MonsterConfig.CLIP_X];
			this._clipMonster.clipY = this._configData[MonsterConfig.CLIP_Y];
			this.addChild(this._clipMonster);

			this._maxClipIndex = (this._configData[MonsterConfig.CLIP_X] - 1) * this._configData[MonsterConfig.CLIP_Y];

			this.changeVisible();

			this.anchorX = 0.5;
			this.anchorY = 0.5;
		}

		private update(): void {
			if (this._isHuge) {
				this._collision_radius = this._configData[MonsterConfig.COLLISION_RADIUS] * MonsterItem.HUGE;
				this.scale(MonsterItem.HUGE, MonsterItem.HUGE);
			} else {
				this._collision_radius = this._configData[MonsterConfig.COLLISION_RADIUS];
			}
		}

		/**更新显示状态 */
		private changeVisible(): void {
			if (this._isDead) {
				this._imgCrush.visible = true;
				this.stopPlay();
				this._clipMonster.visible = false;
			} else {
				this._imgCrush.visible = false;
				this._clipMonster.visible = true;
				this.playAni();
			}
		}

		/**停止播放 */
		private stopPlay(): void {
			Laya.timer.clear(this, this.loopClip);
		}

		/**定时循环播放帧动画 */
		private loopClip(): void {
			var curIndex: number = this._clipMonster.index;
			curIndex = curIndex >= this._maxClipIndex ? 0 : curIndex + 1;
			this._clipMonster.index = curIndex;
		}

		//-----------------------------------------public----------------------------------//

		public tweenHuge(): void {
			this._isHuge = true;
			this.update();
		}

		/**是否已经死亡 */
		public get isDead(): boolean {
			return this._isDead;
		}

		/**播放怪物动画 */
		public playAni(): void {
			Laya.timer.loop(1000, this, this.loopClip, null);
		}

		/**死亡 */
		public dead(): void {
			this._isDead = true;
			this.changeVisible();
		}

		/**释放 */
		public destroy(): void {
			super.destroy();
			if (this._clipMonster != null) {
				this._clipMonster.removeSelf();
				this._clipMonster.destroy();
				this._clipMonster = null;
			}
			if (this._imgCrush != null) {
				this._imgCrush.removeSelf();
				this._imgCrush.destroy();
				this._imgCrush = null;
			}
			this._configData = null;
		}
	}
}