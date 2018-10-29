/**
* name 
*/
module module {
	/**游戏技能管理器 */
	export class GameSkillManger {		
		/**电锯技能时间 */
		public static SAW_TIME: number = 7000;
		/**闪电技能时间 */
		public static LIGHTING_TIME:number = 7000;
		/**时间减速时长 */
		public static SLOW_TIME:number = 10000;
		/**技能冷却时间 */
		public static SKILL_CD: number = 10000;
		/**强制创建直道数量 */
		public static FORCE_STRAIGHT_NUM:number = 10;	
		/**双倍僵尸创建次数 */
		public static DOUBLE_MONSTER_TIMES:number = 3;
		/**遮罩高度 */
		public static SHADE_HEIGHT: number = 79;
		/**错误技能id */
		public static ERROR_SKILL: number = -1;
		/**技能冷却中 */
		public static SKILL_STATUS_CD: string = "skill_status_cd";
		/**技能等待使用中 */
		public static SKILL_STATUS_WAIT: string = "skill_status_wait";
		/**技能正在使用中 */
		public static SKILL_STATUS_USING: string = "skill_status_using";
		/**免费技能id */
		private _freeSkillID:number;
		/**技能状态 */
		private _skillStatus: string = GameSkillManger.SKILL_STATUS_WAIT;		
		/**根节点 */
		private _ui: ui.game.GameSkillModuleUI;
		/**当前使用技能 */
		private _curSkill: number = GameSkillManger.ERROR_SKILL;
		private _cacheSkill:number = GameSkillManger.ERROR_SKILL;

		/**
		 * 构造函数
		 * @param ui 视图根节点
		 */
		constructor(ui: ui.game.GameSkillModuleUI) {
			this._ui = ui;
			this._freeSkillID = ResSkillConfigData.SKILL_SAW;
			this._ui.visible = false;		
			this.initEvent();
		}

		/**移除事件 */
		private initEvent(): void {
			manager.EventManager.instance.on(manager.EventManager.REQUSET_FIRE_FREE_SKILL,this,this.onUseFreeSkill);
		}

		/**注册事件 */
		private removeEvent(): void {
			manager.EventManager.instance.off(manager.EventManager.REQUSET_FIRE_FREE_SKILL,this,this.onUseFreeSkill);
		}

		/**请求使用免费技能 */
		private onUseFreeSkill():void{
			manager.EventManager.instance.event(manager.EventManager.USE_SKILL,this._freeSkillID);
			this._skillStatus = GameSkillManger.SKILL_STATUS_USING;
		}

		/**尝试使用技能 */
		private onTryUseSkill(): void {
			if (this._skillStatus != GameSkillManger.SKILL_STATUS_WAIT) {
				return;
			}
			this._ui.ani1.play(0,true);
			manager.EventManager.instance.event(manager.EventManager.USE_SKILL, this._curSkill);
			this._skillStatus = GameSkillManger.SKILL_STATUS_USING;
		}

		/**更新显示状态 */
		private updateStatus(): void {
			if (this._curSkill == GameSkillManger.ERROR_SKILL) {
				this._ui.visible = false;
			} else {
				this._ui.visible = true;
			}
		}

		/**技能cd倒计时 */
		private countDownCD(): void {	
			if(this._curSkill == GameSkillManger.ERROR_SKILL){
				return;
			}
			this._ui.ani1.stop();			
			var config: ResSkillConfigData = ResSkillConfigData.getDataByID(this._curSkill);
			this._ui.imgSkill.skin = config.url_big_unlock;
			this._ui.imgSkillShade.height = GameSkillManger.SHADE_HEIGHT;
			this._skillStatus = GameSkillManger.SKILL_STATUS_CD;
			var tick: number = GameSkillManger.SKILL_CD / GameSkillManger.SHADE_HEIGHT;
			Laya.timer.loop(tick, this, this.countDownShade);
		}

		/**倒计时减少遮罩高度 */
		private countDownShade(): void {
			this._ui.imgSkillShade.height--;
			if (this._ui.imgSkillShade.height <= 0) {
				Laya.timer.clear(this, this.countDownShade);
				this._skillStatus = GameSkillManger.SKILL_STATUS_WAIT;
				this.onTryUseSkill();
			}
		}

		/**运行技能管理器 */
		public run(selectSkill:number): void {
			this._curSkill = selectSkill;
			manager.EventManager.instance.on(manager.EventManager.TRY_USE_SKILL, this, this.onTryUseSkill, null);
			manager.EventManager.instance.on(manager.EventManager.USE_SKILL_COMPLETE, this, this.countDownCD);			
			this.updateStatus();
			if (this._curSkill != GameSkillManger.ERROR_SKILL) {
				this.countDownCD();
			}
		}

		/**重置 */
		public reset(): void {
			this._cacheSkill = this._curSkill;
			this._curSkill = GameSkillManger.ERROR_SKILL;
			manager.EventManager.instance.off(manager.EventManager.TRY_USE_SKILL, this, this.onTryUseSkill);
			manager.EventManager.instance.off(manager.EventManager.USE_SKILL_COMPLETE, this, this.countDownCD);			
			this.updateStatus();
			Laya.timer.clearAll(this);
		}

		/**继续开始 */
		public continue():void{
			this._curSkill = this._cacheSkill;
			this._cacheSkill = GameSkillManger.ERROR_SKILL;
			this.run(this._curSkill);
		}

		public destroy(): void {
			this.removeEvent();
			this._ui = null;		
		}
	}
}