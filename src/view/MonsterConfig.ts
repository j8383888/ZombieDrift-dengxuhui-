/**
* name 
*/
module module{
	/**怪物配置数据 */
	export class MonsterConfig{
		/**资源根节点 */
		public static ROOT_PATH:string = "monster/";
		public static MONSTER_PREFIX = "clip_monster_";
		public static MONSTER_SUFFIX = ".png";
		/**怪物最大数量 */
		public static MAX_NUM:number = 8;

		
		public static CLIP_X:string = "clipX";
		public static ID:string = "id";
		public static CLIP_Y:string = "clipY";
		public static CRUSH_SKIN:string = "crushSkin";
		public static COLLISION_RADIUS:string = "collisionRadius";
		/**配置数据 */
		public static CONFIG:Object = {
			"1":{
				id:1,
				clipX:5,
				clipY:1,
				collisionRadius:40,
				crushSkin:"crush_monster1,2.png"
			},
			"2":{
				id:2,
				clipX:5,
				clipY:1,
				collisionRadius:40,
				crushSkin:"crush_monster1,2.png"
			},
			"3":{
				id:3,
				clipX:3,
				clipY:1,
				collisionRadius:30,
				crushSkin:"crush_monster3.png"
			},
			"4":{
				id:4,
				clipX:6,
				clipY:1,
				collisionRadius:50,
				crushSkin:"crush_monster4,5.png"

			},
			"5":{
				id:5,
				clipX:6,
				clipY:1,
				collisionRadius:50,
				crushSkin:"crush_monster4,5.png"
			},
			"6":{
				id:6,
				clipX:5,
				clipY:1,
				collisionRadius:40,
				crushSkin:"crush_monster6.png"
			},
			"7":{
				id:7,
				clipX:4,
				clipY:1,
				collisionRadius:50,
				crushSkin:"crush_monster7-9.png"
				
			},
			"8":{
				id:8,
				clipX:4,
				clipY:1,
				collisionRadius:30,
				crushSkin:"crush_monster7-9.png"				
			},
			"9":{
				id:9,
				clipX:4,
				clipY:1,
				collisionRadius:40,
				crushSkin:"crush_monster7-9.png"
			}
		}

		/**
		 * 获取随机配置数据
		 * id clipX clipY crushSkin
		 */
		public static getRandomConfig():Object{
			var randomID:string = (Math.floor(Math.random() * MonsterConfig.MAX_NUM) + 1).toString();			
			return MonsterConfig.CONFIG[randomID];
		}
		constructor(){

		}
	}
}