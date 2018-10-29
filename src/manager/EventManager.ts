/**
* name 
*/
module manager{
	/**事件全局发送 ， 接受管理器 
	 * 可在它身上 发送 事件 到其他模块
	 * 可在它身上 接受 其他模块发送的事件
	*/
	export class EventManager extends laya.events.EventDispatcher{
		private static _instance:EventManager = null;
		public static REMOVESOURCE_FROM_BLOCKBACKGROUND:string = "REMOVESOURCE_FROM_BLOCKBACKGROUND"; //将蒙版上的对象移除

		/**开始游戏 */
		public static START_GAME:string = "EventManager_Start_Game";
		/**重新开始游戏 */
		public static REPLAY:string = "EventManager_Replay";
		/**续命继续玩 */
		public static PLAY_CONTINUE:string = "EventManager_Play_Continue";
		/**上报游戏成绩 */
		public static PUSH_GAME_SCORE:string = "EventManager_Push_Game_Score";
		/**关闭声音 */
		public static CLOSE_VOICE:string = "EventManager_Close_Voice";
		/**打开声音 */
		public static OPEN_VOICE:string = "EventManager_Open_Voice";
		/**道路创建完成 */
		public static ROAD_CREATE_COMPLETE:string = "EventManager_Road_Create_Complete";
		/**比赛开始 */
		public static RACE_START:string = "EventManager_Race_Start";
		/**撞毁 */
		public static CRASH:string = "EventManager_Crash";
		/**碰撞到怪物 */
		public static COLLISION_MONSTER:string = "EventManager_Collision_Monster";
		/**不看广告继续退出 */
		public static SKIP_CONTINUE_GAME:string = "EventManager_Skip_Continue_Game";		
		/**观看视频*/		
		public static WATCH_VIEO:string = "EventManager_Watch_Vieo";
		/**分享游戏 */
		public static SHARE_GAME:string = "EventManger_Share_Game";
		/**选中汽车变更 */
		public static SELECT_CAR_CHANGE:string = "EventManager_Select_Car_Change";
		/**撞毁动画播放完成回调 */
		public static CRASH_PLAY_OVER:string = "EventManager_Crash_Play_Over";
		/**尝试使用技能 */
		public static TRY_USE_SKILL:string = "EventManager_Try_Use_Skill";
		/**使用技能 */
		public static USE_SKILL:string = "EventManager_Use_Skil";
		/**技能使用完成 */
		public static USE_SKILL_COMPLETE:string = "EventManager_Use_Skill_Complete";
		/**技能选择完成 */
		public static SKILL_SELECT_COMPLETE:string = "EventManager_Skill_Select_Complete";		
		/**请求使用一次免费技能 */
		public static REQUSET_FIRE_FREE_SKILL:string = "EventManager_Fire_Free_Skill";
		public static MONEY_CHANGE:string = "EventManager_Money_Change";	
		constructor(){
			super();
		}

		public static get instance():EventManager{
			if(this._instance == null){
				this._instance = new EventManager();
			}
			return this._instance;
		}

		public setup():void{

		}
	}
}