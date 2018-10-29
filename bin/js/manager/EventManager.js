var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var manager;
(function (manager) {
    /**事件全局发送 ， 接受管理器
     * 可在它身上 发送 事件 到其他模块
     * 可在它身上 接受 其他模块发送的事件
    */
    var EventManager = /** @class */ (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            return _super.call(this) || this;
        }
        Object.defineProperty(EventManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new EventManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EventManager.prototype.setup = function () {
        };
        EventManager._instance = null;
        EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND = "REMOVESOURCE_FROM_BLOCKBACKGROUND"; //将蒙版上的对象移除
        /**开始游戏 */
        EventManager.START_GAME = "EventManager_Start_Game";
        /**重新开始游戏 */
        EventManager.REPLAY = "EventManager_Replay";
        /**续命继续玩 */
        EventManager.PLAY_CONTINUE = "EventManager_Play_Continue";
        /**上报游戏成绩 */
        EventManager.PUSH_GAME_SCORE = "EventManager_Push_Game_Score";
        /**关闭声音 */
        EventManager.CLOSE_VOICE = "EventManager_Close_Voice";
        /**打开声音 */
        EventManager.OPEN_VOICE = "EventManager_Open_Voice";
        /**道路创建完成 */
        EventManager.ROAD_CREATE_COMPLETE = "EventManager_Road_Create_Complete";
        /**比赛开始 */
        EventManager.RACE_START = "EventManager_Race_Start";
        /**撞毁 */
        EventManager.CRASH = "EventManager_Crash";
        /**碰撞到怪物 */
        EventManager.COLLISION_MONSTER = "EventManager_Collision_Monster";
        /**不看广告继续退出 */
        EventManager.SKIP_CONTINUE_GAME = "EventManager_Skip_Continue_Game";
        /**观看视频*/
        EventManager.WATCH_VIEO = "EventManager_Watch_Vieo";
        /**分享游戏 */
        EventManager.SHARE_GAME = "EventManger_Share_Game";
        /**选中汽车变更 */
        EventManager.SELECT_CAR_CHANGE = "EventManager_Select_Car_Change";
        /**撞毁动画播放完成回调 */
        EventManager.CRASH_PLAY_OVER = "EventManager_Crash_Play_Over";
        /**尝试使用技能 */
        EventManager.TRY_USE_SKILL = "EventManager_Try_Use_Skill";
        /**使用技能 */
        EventManager.USE_SKILL = "EventManager_Use_Skil";
        /**技能使用完成 */
        EventManager.USE_SKILL_COMPLETE = "EventManager_Use_Skill_Complete";
        /**技能选择完成 */
        EventManager.SKILL_SELECT_COMPLETE = "EventManager_Skill_Select_Complete";
        /**请求使用一次免费技能 */
        EventManager.REQUSET_FIRE_FREE_SKILL = "EventManager_Fire_Free_Skill";
        EventManager.MONEY_CHANGE = "EventManager_Money_Change";
        return EventManager;
    }(laya.events.EventDispatcher));
    manager.EventManager = EventManager;
})(manager || (manager = {}));
//# sourceMappingURL=EventManager.js.map