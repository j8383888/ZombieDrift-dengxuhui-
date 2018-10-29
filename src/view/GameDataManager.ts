/**
* name 
*/
module module {
	/**数据中心 */
	export class GameDataManager {
		public static IS_NEW_PLAYER: string = "gamedata_is_new_player";
		public static ROAD_STYLE: string = "gamedata_road_style";
		public static SELECTE_CAR_ID: string = "gamedata_select_car_id";
		public static UNLOCK_CAR_ARY: string = "gamedata_unlock_car_ary";
		public static MONEY: string = "gamedata_money";
		public static UNLOCK_SKILL_ARY: string = "gamedata_unlock_skill_ary";
		public static OPEN_VOICE: string = "gamedata_open_voice";

		public static MONEY_SHARE: number = 50;
		public static MONEY_WATCH_VIDE: number = 150;
		public static CDN_PATH: string = "https://hlz.huanxiangying.com/ctmj/ZombieDrift/";
		/**是否正在使用cdn */
		public static USE_CDN: number = 1;
		/**当前道路风格 */
		private _roadStyle: number;
		/**是否是新玩家 */
		private _isNewPlayer: number;
		/**当前选择汽车id */
		private _selectCarID: number;
		/**解锁汽车集合 */
		private _unlockCarAry: Array<number>;
		/**解锁技能集合 */
		private _unlockSkillAry: Array<number>;
		/**是否打开声音 */
		private _isOpenVoice: number;
		/**当前金币 */
		private _curMoney: number;
		private static _instance: GameDataManager = null;
		constructor() {

		}

		/**初始化 */
		public initialize(): void {
			var openVoiceStr: string = laya.net.LocalStorage.getItem(GameDataManager.OPEN_VOICE);
			if (openVoiceStr == null || openVoiceStr == "") {
				openVoiceStr = BOOLEAN.TRUE.toString();
			}
			this._isOpenVoice = parseInt(openVoiceStr);

			//当前道路风格	
			var roadStyleStr: string = laya.net.LocalStorage.getItem(GameDataManager.ROAD_STYLE);
			if (roadStyleStr == null || roadStyleStr == "") {
				roadStyleStr = "0";
				laya.net.LocalStorage.setItem(GameDataManager.ROAD_STYLE, roadStyleStr);
			}
			this._roadStyle = parseInt(roadStyleStr);

			//是否是新玩家
			var isNewPlayerStr: string = laya.net.LocalStorage.getItem(GameDataManager.IS_NEW_PLAYER);
			if (isNewPlayerStr == null || isNewPlayerStr == "") {
				isNewPlayerStr = BOOLEAN.TRUE.toString();
				laya.net.LocalStorage.setItem(GameDataManager.IS_NEW_PLAYER, isNewPlayerStr);
			}
			this._isNewPlayer = parseInt(isNewPlayerStr);

			//当前选择汽车id
			var selectCarIDStr: string = laya.net.LocalStorage.getItem(GameDataManager.SELECTE_CAR_ID);
			//for test
			// selectCarIDStr = "3";
			if (selectCarIDStr == null || selectCarIDStr == "") {
				selectCarIDStr = CarItem.DEFAULT_ID.toString();
				laya.net.LocalStorage.setItem(GameDataManager.SELECTE_CAR_ID, selectCarIDStr);
			}

			this._selectCarID = parseInt(selectCarIDStr);

			//已解锁汽车集合
			var unlockCarAryStr: string = laya.net.LocalStorage.getItem(GameDataManager.UNLOCK_CAR_ARY);
			if (unlockCarAryStr == null || unlockCarAryStr == "") {
				unlockCarAryStr = CarItem.DEFAULT_ID.toString();
				laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_CAR_ARY, unlockCarAryStr);
			}
			this._unlockCarAry = new Array<number>();
			var splitAry: Array<string> = unlockCarAryStr.split(",");
			for (var i: number = 0; i < splitAry.length; i++) {
				this._unlockCarAry.push(parseInt(splitAry[i]));
			}

			var unlockSkillAryStr: string = laya.net.LocalStorage.getItem(GameDataManager.UNLOCK_SKILL_ARY);
			if (unlockSkillAryStr == null || unlockSkillAryStr == "") {
				unlockSkillAryStr = "0";
				laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_SKILL_ARY, unlockSkillAryStr);
			}			
			this._unlockSkillAry = new Array<number>();
			var skillSplitAry: Array<string> = unlockSkillAryStr.split(",");
			for (var j: number = 0; j < skillSplitAry.length; j++) {
				this._unlockSkillAry.push(parseInt(skillSplitAry[j]));
			}

			//当前金币
			var moneyStr: string = laya.net.LocalStorage.getItem(GameDataManager.MONEY);
			//for test
			// moneyStr = "10";
			if (moneyStr == null || moneyStr == "") {
				moneyStr = "0";
				laya.net.LocalStorage.setItem(GameDataManager.MONEY, moneyStr);
			}
			this._curMoney = parseInt(moneyStr);
		}

		public get roadStyle(): number {
			return this._roadStyle;
		}

		public set roadStyle(value: number) {
			this._roadStyle = value;
			laya.net.LocalStorage.setItem(GameDataManager.ROAD_STYLE, value.toString());
		}

		public get isNewPlayer(): number {
			return this._isNewPlayer;
		}

		public set isNewPlayer(value: number) {
			this._isNewPlayer = value;
			laya.net.LocalStorage.setItem(GameDataManager.IS_NEW_PLAYER, value.toString());
		}

		public get selectCarID(): number {
			return this._selectCarID;
		}

		public set selectCarID(value: number) {
			this._selectCarID = value;
			laya.net.LocalStorage.setItem(GameDataManager.SELECTE_CAR_ID, value.toString());
			manager.EventManager.instance.event(manager.EventManager.SELECT_CAR_CHANGE, null);
		}

		public get unlockCarAry(): Array<number> {
			return this._unlockCarAry;
		}

		/**是否解锁汽车 */
		public isUnlockCar(id: number): boolean {
			return this._unlockCarAry.indexOf(id) == -1 ? false : true;
		}

		/**解锁汽车 */
		public unLockCar(carID: number) {
			if (this._unlockCarAry.indexOf(carID) != -1) {
				console.assert(false, "已存在该车型");
				return;
			}
			this._unlockCarAry.push(carID);
			laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_CAR_ARY, this._unlockCarAry.toString());
		}

		/**获取已经解锁技能集合 */
		public get unlockSkillAry(): Array<number> {
			return this._unlockSkillAry;
		}

		/**是否解锁技能 */
		public isUnlockSkill(id: number): boolean {
			return this._unlockSkillAry.indexOf(id) == -1 ? false : true;
		}

		/**解锁技能 */
		public unlockSkill(skillID: number) {
			if (this._unlockSkillAry.indexOf(skillID) != -1) {
				console.assert(false, "已经解开改技能");
				return;
			}
			this._unlockSkillAry.push(skillID);
			laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_SKILL_ARY, this._unlockSkillAry.toString());
		}

		public get money(): number {
			return this._curMoney;
		}

		/**变更当前持有金币数量 */
		public changeMoney(changeNum: number) {
			this._curMoney += changeNum;
			laya.net.LocalStorage.setItem(GameDataManager.MONEY, this._curMoney.toString());
			manager.EventManager.instance.event(manager.EventManager.MONEY_CHANGE);
		}

		public get isVoiceOpen(): number {
			return this._isOpenVoice;
		}

		public set isVoiceOpen(value: number) {
			if (value == BOOLEAN.FALSE) {
				this._isOpenVoice = BOOLEAN.FALSE;
			} else if (value == BOOLEAN.TRUE) {
				this._isOpenVoice = BOOLEAN.TRUE;
			} else {
				console.assert(false);
			}
			laya.net.LocalStorage.setItem(GameDataManager.OPEN_VOICE, this._isOpenVoice.toString());
		}

		/**
		 * 获取实例
		 */
		public static get instance(): GameDataManager {
			if (this._instance == null) {
				this._instance = new GameDataManager();
			}
			return this._instance;
		}
	}
}