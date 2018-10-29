/**
* name 
*/
module manager{
	import Component = laya.ui.Component;
	import Sprite = laya.display.Sprite;
	/**层级管理器 */
	export class LayerManager{
		private static _instance:LayerManager = null;

		private stageScenceChange:Sprite;
		private stageTopLayer:Sprite;
		private stageDialogLayer:Sprite;
		private stageDynamicLayer:Sprite;
		private stageBottomLayer:Sprite;
		private stageBackGroundLayer:Sprite;
		private stageRoadLayer:Sprite;
			
		public static STAGE_SCENCE_CHANGE:number = 0;
		public static STAGE_TOP_LAYER:number = 1;
		public static STAGE_DIALOG_LAYER:number = 2;
		public static STAGE_DYANMIC_LAYER:number = 3;
		public static STAGE_BOTTOM_LAYER:number = 4;
		public static STAGE_BACKGROUND_LAYER:number = 5;
		public static STAGE_ROAD_LAYER:number = 6;


		public static LAYER_ROAD_WIDTH:number = 20000;
		public static LAYER_ROAD_HEIGHT:number = 20000;
		constructor(){
		}

		public setup(stage:Laya.Stage):void{
			this.stageScenceChange = new Sprite();
			this.stageScenceChange.mouseEnabled = false;
			this.stageScenceChange.mouseThrough = false;
			this.stageTopLayer = new Sprite();
			this.stageDialogLayer = new Sprite();
			this.stageDynamicLayer = new Sprite();
			this.stageBottomLayer = new Sprite();
			this.stageBottomLayer.width = stage.width;
			this.stageBottomLayer.height = stage.height;
			this.stageBackGroundLayer = new Sprite();		
			this.stageRoadLayer = new Sprite();										

			stage.addChild(this.stageBackGroundLayer);
			stage.addChild(this.stageRoadLayer);
			stage.addChild(this.stageBottomLayer);
			stage.addChild(this.stageDynamicLayer);
			stage.addChild(this.stageDialogLayer);
			stage.addChild(this.stageTopLayer);
			stage.addChild(this.stageScenceChange);
		}

		public getLayerByType(type:number):Sprite
		{
			switch(type)
			{
				case LayerManager.STAGE_TOP_LAYER:
					return this.stageTopLayer;
				case LayerManager.STAGE_DIALOG_LAYER:
					return this.stageDialogLayer;
				case LayerManager.STAGE_DYANMIC_LAYER:
					return this.stageDynamicLayer;
				case LayerManager.STAGE_BOTTOM_LAYER:
					return this.stageBottomLayer;
				case LayerManager.STAGE_BACKGROUND_LAYER:
					return this.stageBackGroundLayer;
				case LayerManager.STAGE_SCENCE_CHANGE:
					return this.stageScenceChange;
				case LayerManager.STAGE_ROAD_LAYER:
					return this.stageRoadLayer;
			}
			return null;
		}

		public addToLayer(source:Sprite , type:number , center:boolean = false , blockBackgound:boolean = false , isBackClose:boolean = true , blockAp:number = 0.5):void
		{
			var container:Sprite = this.getLayerByType(type);
			if(center){
				source.x = (Laya.stage.width - source.width)/2;
				source.y = (Laya.stage.height - source.height)/2;
			}
			if(blockBackgound){ //为弹窗添加透明蒙版 ， 点击蒙版则清除此弹窗
				var bgview:module.BlockBackgound = new module.BlockBackgound(blockAp);
				bgview.sourceView = source;
				bgview.isBackClose = isBackClose;
				container.addChild(bgview);
			}
			container.addChild(source);
		}
		
		public clearLayer(type:number):void{
			manager.EventManager.instance.event(manager.EventManager.REMOVESOURCE_FROM_BLOCKBACKGROUND);
			var container:Sprite = this.getLayerByType(type);
			container.destroyChildren();
		}

		public static get instace():LayerManager{
			if(this._instance == null){
				this._instance = new LayerManager();
			}
			return this._instance;
		}
	}
}