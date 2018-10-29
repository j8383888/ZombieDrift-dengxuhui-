/**
* name 
*/
module manager{
	import BitmapFont = Laya.BitmapFont;
	import Text = Laya.Text;

	export class BmFontManager{
		//proto文件名称表 ， 新加一个proto文件，需要在这里注册，才能加载到/////////////////////////////////////////////////
		private filenames:Array<string> = ["cuyuanBlue","cuyuanGB"];
		/**字体间距 */
		private fontSpace:Array<number> = [0,0,0,0,0,0,0,0,0,0];

		public static cuyuanGB:string = "cuyuanGB";
		public static cuyuanBlue:string = "cuyuanBlue";

		private static _instance:BmFontManager = null;

		constructor(){
		}

		/**获取所有 Font文件 的加载路径 */
		public getFileUrls():Array<any>{
			var fileUrls:Array<any> = new Array<any>();
				for(var i:number = 0 ; i < this.filenames.length ; i++){
					fileUrls.push({url:this.getFileUrl(this.filenames[i]) , type:"font"});
				}
			return fileUrls;
		}

		/**解析Font文件 */
		public initialize():void{
			for(var i:number = 0 ; i < this.filenames.length ; i++){
				var bitmapFont:BitmapFont = Laya.loader.getRes(this.getFileUrl(this.filenames[i]));
				bitmapFont.letterSpacing = this.fontSpace[i];
				Text.registerBitmapFont(this.filenames[i] , bitmapFont);
			}
		}

		/**创建一个位图文本 */
		public createText(font: string , xx:number , yy:number , w:number = 0 , h:number = 0 , align:string="left" , leading:number = 0): Text {
			var txt: Text = new Text();
			if(w > 0) txt.width = w;
			if(h > 0) txt.height = h;
			txt.wordWrap = true;
			txt.font = font;
			txt.leading = leading;
			txt.x = xx;
			txt.y = yy;
			txt.align = align;

			return txt;
		}

		public getFileUrl(filename:string):string{
			return manager.ResVersionMgr.instance.getMd5Url("res/font/"+filename+".fnt");
		}

		public static get instance():BmFontManager{
			if(this._instance == null){
				this._instance = new BmFontManager();
			}
			return this._instance;
		}
	}
}