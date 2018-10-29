/**
 * TS 调用 JS 的函数集合
 * JS 调用 TS 的回调函数
* name 
*/
module manager {
	declare function getPlatform();
	declare function setOnShareHandler();
	declare function addShortcut();
	declare function toPopPayTips(number);
	declare function GetSearchString(string);
	declare function setUserId(string);
	declare function getUrl();
	declare function weixinConfig($appid, $timestamp, $nonceStr, $signature);
	declare function getIP();
	declare function addImgToDiV(string, closeimg);
	declare function createQrcode(string, closeimg);
	declare function weinxinPay($timestamp, $nonceStr, $package, $signType, $paySign);
	declare function onBridgeReady($appId, $timestamp, $nonceStr, $package, $signType, $paySign);
	declare function createBack();
	declare function shareMessageToQQ();

	export class TsJsmanager {
		constructor() {
		}

		///////////////////////////////////////APP 直调 TS///////////////////////////////////////////////////////////////

		///////////////////////////////////////JS 调用 TS///////////////////////////////////////////////////////////////

		/**
		 * 开始游戏
		 * @param gateID 关卡ID
		 */
		public static startGame(gateID: number): void {
			EventManager.instance.event(EventManager.START_GAME, gateID);
		}

		/**
		 * 重新开始游戏
		 * @param gateID 关卡ID
		 */
		public static replay(gateID: number): void {
			EventManager.instance.event(EventManager.REPLAY, gateID);
		}

		/**续命继续游戏 */
		public static playContinue(): void {
			EventManager.instance.event(EventManager.PLAY_CONTINUE);
		}

		/**上报当前游戏成绩 0:当前局成绩  1:最大成绩*/
		public static pushGameScore(scoreType: number): void {
			EventManager.instance.event(EventManager.PUSH_GAME_SCORE, scoreType);
		}

		/**关闭游戏声音 */
		public static closeVoice(): void {
			EventManager.instance.event(EventManager.CLOSE_VOICE);
		}

		/**打开游戏声音 */
		public static openVoice(): void {
			EventManager.instance.event(EventManager.OPEN_VOICE);
		}

		public static playMusic(): void {
			manager.SoundPlayMgr.instance.playBgMusic(1);
		}

		//////////////////////////////////////TS 调用 JS/////////////////////////////////////////////////////////////////
	}
}