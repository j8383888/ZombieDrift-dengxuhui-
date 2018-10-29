/**
* name 
*/
module module{
	/**游戏比赛管理器 */
	export class GameRaceManager{
		
		private static _instance:GameRaceManager;
		constructor(){

		}

		public static get instance():GameRaceManager{
			if(this._instance == null){
				this._instance = new GameRaceManager();
			}
			return this._instance;
		}
	}
}