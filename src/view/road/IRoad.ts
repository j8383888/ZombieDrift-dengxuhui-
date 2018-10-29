/**
* name 
*/
module module{
	export interface IRoad{
		collision_points:Array<Laya.Image>;
		/**道路生成检查点 */
		check_points:Array<Laya.Image>;
		monsterAry:Array<MonsterItem>;		
		uID:number;		
		configData:ResRoadConfigData;	
		isDoubleMonster:boolean;
		tweenHugeMonster();					
		destroy();		
	}
}