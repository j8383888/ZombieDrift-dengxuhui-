/**
* name 
*/
module manager {
	import SoundManager = Laya.SoundManager;
	import SoundChannel = laya.media.SoundChannel;
	import LocalStorage = laya.net.LocalStorage;

	/**laya 已有一个 SoundManger , 避免重名 */
	export class SoundPlayMgr {
		private static _instance: SoundPlayMgr = null;
		public static MUSIC_VOLUME: string = "MUSIC_VOLUME";
		public static SOUND_VOLUME: string = "SOUND_VOLUME";

		public resUrl: string = "res/music/";
		public soundUrl: string = "res/music/sound/";
		public popUrl: string = "res/music/pop_audio/";
		public mp3: string = ".wav";

		/**背景音量 */
		private _musicVolume: number = 1;//
		/**音效音量 */
		private _soundVolume: number = 1;
		/**音效是否静音 */
		private _soundMuted: boolean = false;

		constructor() {
			this._soundMuted = module.GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE ? false : true;
			manager.EventManager.instance.on(manager.EventManager.CLOSE_VOICE,this,this.closeVoice);
			manager.EventManager.instance.on(manager.EventManager.OPEN_VOICE,this,this.openVoice);
		}

		private closeVoice():void{
			this._soundMuted = true;
			this.stopSound(this.resUrl + "bgm1" + ".mp3")
		}

		private openVoice():void{
			this._soundMuted = false;
			this.playBgMusic();
		}

		public setup(): void {
			var music: string = LocalStorage.getItem(SoundPlayMgr.MUSIC_VOLUME);
			if (music != null && music != "") {
				this._musicVolume = Number(music);
				SoundManager.setMusicVolume(this._musicVolume);
			}

			var sound: string = LocalStorage.getItem(SoundPlayMgr.SOUND_VOLUME);
			if (sound != null && sound != "") {
				this._soundVolume = Number(sound);
				SoundManager.setSoundVolume(this._soundVolume);
				this.soundMuted = this._soundVolume <= 0;
			}
		}

		/**播放背景音乐 id:  1 , 2 */
		public playBgMusic(id: number = 1): void {
			if(this._soundMuted){
				return;
			}
			SoundManager.playMusic(this.getUrl(this.resUrl + "bgm" + id + ".mp3"), 0);
		}

		/**播放音效 */
		public playGSound(url: string) {
			this.playSound(this.soundUrl + url + this.mp3);
		}
		/**-------------------------需要播放什么声音就在下面添加对应方法或者通过url直接播放某个声音--------------------------- */
		/*停止播放所有音效 */
		public stopAll(): void {
			SoundManager.stopAll();			
		}
		private _monsterHitSoundAry:Array<number> = [1,2,3,4,5,6,7];

		/**播放僵尸被撞声音 */
		public playMonsterHit():void{
			var hitIndex:number = this._monsterHitSoundAry.shift();
			this._monsterHitSoundAry.push(hitIndex);
			this.playGSound("hit" + hitIndex);
		}

		/**播放购买成功 */
		public playBuySuccess():void{
			this.playGSound("BoughtSound");
		}

		/**播放汽车加速 */
		public playCarSpeedingLoop():void{
			this.playSound(this.soundUrl + "BoostLaneSound" + this.mp3,0);
		}

		/**停止播放汽车加速声音 */
		public stopCarSpeeding():void{
			this.stopSound(this.soundUrl + "BoostLaneSound" + this.mp3);
		}

		/**播放电锯声音 */
		public playSawLoop():void{
			this.playSound(this.soundUrl + "chainsaw" + this.mp3,0);
		}

		/**停止播放电锯 */
		public stopSaw():void{
			this.stopSound(this.soundUrl + "chainsaw" + this.mp3);
		}

		/**播放点击音效 */
		public playClick():void{
			this.playGSound("Click");
		}

		/**播放爆炸声音 */
		public playExplosionLoop():void{
			this.stopSkid();
			this.playSound(this.soundUrl + "Explosion" + this.mp3,0);
		}

		/**停止播放爆炸声音 */
		public stopExplosion():void{
			this.stopSound(this.soundUrl + "Explosion" + this.mp3);
		}

		/**播放漂移声音 */
		public playSkidLoop():void{
			this.playSound(this.soundUrl + "skid_loop" + this.mp3,0);
		}

		/**停止漂移声音 */
		public stopSkid():void{
			this.stopSound(this.soundUrl + "skid_loop" + this.mp3);
		}

		/**播放闪电声音 */
		public playLight():void{
			this.playGSound("skill_light");
		}

		/**-------------------------------------------------------------------------------------------------------------- */

		private getSex(sex: number): string {
			return this.resUrl + "" + "/" + (sex == 0 ? "woman/" : "man/");
		}

		private getUrl(url: string): string {			
			if(module.GameDataManager.USE_CDN == BOOLEAN.TRUE){
				return module.GameDataManager.CDN_PATH + url;
			}else{
				return manager.ResVersionMgr.instance.getMd5Url(url);
			}
			
		}

		/**播放一个音效 */
		private playSound(url: string, loops?: number) {
			if (this._soundMuted == false) {
				SoundManager.playSound(this.getUrl(url), loops);
			}
		}

		/**停止播放声音 */
		private stopSound(url: string) {
			SoundManager.stopSound(this.getUrl(url));
		}

		/**设置音效的静音 */
		public set soundMuted(value: boolean) {
			this._soundMuted = value;
			if (this._soundMuted) {
				//TODO  添加需要关闭的音效  需要根据不同游戏而不同
			}
		}


		public set soundVolume(value: number) {
			this._soundVolume = value;
			LocalStorage.setItem(SoundPlayMgr.SOUND_VOLUME, value + "");
		}

		public get soundVolume(): number {
			return this._soundVolume;
		}

		public set musicVolume(value: number) {
			this._musicVolume = value;
			LocalStorage.setItem(SoundPlayMgr.MUSIC_VOLUME, value + "");
		}

		public get musicVolume(): number {
			return this._musicVolume;
		}

		public static get instance(): SoundPlayMgr {
			if (this._instance == null) {
				this._instance = new SoundPlayMgr();
			}
			return this._instance;
		}
	}
}