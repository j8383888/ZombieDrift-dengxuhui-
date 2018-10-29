/**
* name
*/
var module;
(function (module) {
    /**数据中心 */
    var GameDataManager = /** @class */ (function () {
        function GameDataManager() {
        }
        /**初始化 */
        GameDataManager.prototype.initialize = function () {
            var openVoiceStr = laya.net.LocalStorage.getItem(GameDataManager.OPEN_VOICE);
            if (openVoiceStr == null || openVoiceStr == "") {
                openVoiceStr = BOOLEAN.TRUE.toString();
            }
            this._isOpenVoice = parseInt(openVoiceStr);
            //当前道路风格	
            var roadStyleStr = laya.net.LocalStorage.getItem(GameDataManager.ROAD_STYLE);
            if (roadStyleStr == null || roadStyleStr == "") {
                roadStyleStr = "0";
                laya.net.LocalStorage.setItem(GameDataManager.ROAD_STYLE, roadStyleStr);
            }
            this._roadStyle = parseInt(roadStyleStr);
            //是否是新玩家
            var isNewPlayerStr = laya.net.LocalStorage.getItem(GameDataManager.IS_NEW_PLAYER);
            if (isNewPlayerStr == null || isNewPlayerStr == "") {
                isNewPlayerStr = BOOLEAN.TRUE.toString();
                laya.net.LocalStorage.setItem(GameDataManager.IS_NEW_PLAYER, isNewPlayerStr);
            }
            this._isNewPlayer = parseInt(isNewPlayerStr);
            //当前选择汽车id
            var selectCarIDStr = laya.net.LocalStorage.getItem(GameDataManager.SELECTE_CAR_ID);
            //for test
            // selectCarIDStr = "3";
            if (selectCarIDStr == null || selectCarIDStr == "") {
                selectCarIDStr = module.CarItem.DEFAULT_ID.toString();
                laya.net.LocalStorage.setItem(GameDataManager.SELECTE_CAR_ID, selectCarIDStr);
            }
            this._selectCarID = parseInt(selectCarIDStr);
            //已解锁汽车集合
            var unlockCarAryStr = laya.net.LocalStorage.getItem(GameDataManager.UNLOCK_CAR_ARY);
            if (unlockCarAryStr == null || unlockCarAryStr == "") {
                unlockCarAryStr = module.CarItem.DEFAULT_ID.toString();
                laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_CAR_ARY, unlockCarAryStr);
            }
            this._unlockCarAry = new Array();
            var splitAry = unlockCarAryStr.split(",");
            for (var i = 0; i < splitAry.length; i++) {
                this._unlockCarAry.push(parseInt(splitAry[i]));
            }
            var unlockSkillAryStr = laya.net.LocalStorage.getItem(GameDataManager.UNLOCK_SKILL_ARY);
            if (unlockSkillAryStr == null || unlockSkillAryStr == "") {
                unlockSkillAryStr = "0";
                laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_SKILL_ARY, unlockSkillAryStr);
            }
            this._unlockSkillAry = new Array();
            var skillSplitAry = unlockSkillAryStr.split(",");
            for (var j = 0; j < skillSplitAry.length; j++) {
                this._unlockSkillAry.push(parseInt(skillSplitAry[j]));
            }
            //当前金币
            var moneyStr = laya.net.LocalStorage.getItem(GameDataManager.MONEY);
            //for test
            // moneyStr = "10";
            if (moneyStr == null || moneyStr == "") {
                moneyStr = "0";
                laya.net.LocalStorage.setItem(GameDataManager.MONEY, moneyStr);
            }
            this._curMoney = parseInt(moneyStr);
        };
        Object.defineProperty(GameDataManager.prototype, "roadStyle", {
            get: function () {
                return this._roadStyle;
            },
            set: function (value) {
                this._roadStyle = value;
                laya.net.LocalStorage.setItem(GameDataManager.ROAD_STYLE, value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDataManager.prototype, "isNewPlayer", {
            get: function () {
                return this._isNewPlayer;
            },
            set: function (value) {
                this._isNewPlayer = value;
                laya.net.LocalStorage.setItem(GameDataManager.IS_NEW_PLAYER, value.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDataManager.prototype, "selectCarID", {
            get: function () {
                return this._selectCarID;
            },
            set: function (value) {
                this._selectCarID = value;
                laya.net.LocalStorage.setItem(GameDataManager.SELECTE_CAR_ID, value.toString());
                manager.EventManager.instance.event(manager.EventManager.SELECT_CAR_CHANGE, null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDataManager.prototype, "unlockCarAry", {
            get: function () {
                return this._unlockCarAry;
            },
            enumerable: true,
            configurable: true
        });
        /**是否解锁汽车 */
        GameDataManager.prototype.isUnlockCar = function (id) {
            return this._unlockCarAry.indexOf(id) == -1 ? false : true;
        };
        /**解锁汽车 */
        GameDataManager.prototype.unLockCar = function (carID) {
            if (this._unlockCarAry.indexOf(carID) != -1) {
                console.assert(false, "已存在该车型");
                return;
            }
            this._unlockCarAry.push(carID);
            laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_CAR_ARY, this._unlockCarAry.toString());
        };
        Object.defineProperty(GameDataManager.prototype, "unlockSkillAry", {
            /**获取已经解锁技能集合 */
            get: function () {
                return this._unlockSkillAry;
            },
            enumerable: true,
            configurable: true
        });
        /**是否解锁技能 */
        GameDataManager.prototype.isUnlockSkill = function (id) {
            return this._unlockSkillAry.indexOf(id) == -1 ? false : true;
        };
        /**解锁技能 */
        GameDataManager.prototype.unlockSkill = function (skillID) {
            if (this._unlockSkillAry.indexOf(skillID) != -1) {
                console.assert(false, "已经解开改技能");
                return;
            }
            this._unlockSkillAry.push(skillID);
            laya.net.LocalStorage.setItem(GameDataManager.UNLOCK_SKILL_ARY, this._unlockSkillAry.toString());
        };
        Object.defineProperty(GameDataManager.prototype, "money", {
            get: function () {
                return this._curMoney;
            },
            enumerable: true,
            configurable: true
        });
        /**变更当前持有金币数量 */
        GameDataManager.prototype.changeMoney = function (changeNum) {
            this._curMoney += changeNum;
            laya.net.LocalStorage.setItem(GameDataManager.MONEY, this._curMoney.toString());
            manager.EventManager.instance.event(manager.EventManager.MONEY_CHANGE);
        };
        Object.defineProperty(GameDataManager.prototype, "isVoiceOpen", {
            get: function () {
                return this._isOpenVoice;
            },
            set: function (value) {
                if (value == BOOLEAN.FALSE) {
                    this._isOpenVoice = BOOLEAN.FALSE;
                }
                else if (value == BOOLEAN.TRUE) {
                    this._isOpenVoice = BOOLEAN.TRUE;
                }
                else {
                    console.assert(false);
                }
                laya.net.LocalStorage.setItem(GameDataManager.OPEN_VOICE, this._isOpenVoice.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameDataManager, "instance", {
            /**
             * 获取实例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameDataManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameDataManager.IS_NEW_PLAYER = "gamedata_is_new_player";
        GameDataManager.ROAD_STYLE = "gamedata_road_style";
        GameDataManager.SELECTE_CAR_ID = "gamedata_select_car_id";
        GameDataManager.UNLOCK_CAR_ARY = "gamedata_unlock_car_ary";
        GameDataManager.MONEY = "gamedata_money";
        GameDataManager.UNLOCK_SKILL_ARY = "gamedata_unlock_skill_ary";
        GameDataManager.OPEN_VOICE = "gamedata_open_voice";
        GameDataManager.MONEY_SHARE = 50;
        GameDataManager.MONEY_WATCH_VIDE = 150;
        GameDataManager.CDN_PATH = "https://hlz.huanxiangying.com/ctmj/ZombieDrift/";
        /**是否正在使用cdn */
        GameDataManager.USE_CDN = 1;
        GameDataManager._instance = null;
        return GameDataManager;
    }());
    module.GameDataManager = GameDataManager;
})(module || (module = {}));
//# sourceMappingURL=GameDataManager.js.map