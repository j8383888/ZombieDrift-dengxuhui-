/**
* name
*/
var manager;
(function (manager) {
    var SoundManager = Laya.SoundManager;
    var LocalStorage = laya.net.LocalStorage;
    /**laya 已有一个 SoundManger , 避免重名 */
    var SoundPlayMgr = /** @class */ (function () {
        function SoundPlayMgr() {
            this.resUrl = "res/music/";
            this.soundUrl = "res/music/sound/";
            this.popUrl = "res/music/pop_audio/";
            this.mp3 = ".wav";
            /**背景音量 */
            this._musicVolume = 1; //
            /**音效音量 */
            this._soundVolume = 1;
            /**音效是否静音 */
            this._soundMuted = false;
            this._monsterHitSoundAry = [1, 2, 3, 4, 5, 6, 7];
            this._soundMuted = module.GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE ? false : true;
            manager.EventManager.instance.on(manager.EventManager.CLOSE_VOICE, this, this.closeVoice);
            manager.EventManager.instance.on(manager.EventManager.OPEN_VOICE, this, this.openVoice);
        }
        SoundPlayMgr.prototype.closeVoice = function () {
            this._soundMuted = true;
            this.stopSound(this.resUrl + "bgm1" + ".mp3");
        };
        SoundPlayMgr.prototype.openVoice = function () {
            this._soundMuted = false;
            this.playBgMusic();
        };
        SoundPlayMgr.prototype.setup = function () {
            var music = LocalStorage.getItem(SoundPlayMgr.MUSIC_VOLUME);
            if (music != null && music != "") {
                this._musicVolume = Number(music);
                SoundManager.setMusicVolume(this._musicVolume);
            }
            var sound = LocalStorage.getItem(SoundPlayMgr.SOUND_VOLUME);
            if (sound != null && sound != "") {
                this._soundVolume = Number(sound);
                SoundManager.setSoundVolume(this._soundVolume);
                this.soundMuted = this._soundVolume <= 0;
            }
        };
        /**播放背景音乐 id:  1 , 2 */
        SoundPlayMgr.prototype.playBgMusic = function (id) {
            if (id === void 0) { id = 1; }
            if (this._soundMuted) {
                return;
            }
            SoundManager.playMusic(this.getUrl(this.resUrl + "bgm" + id + ".mp3"), 0);
        };
        /**播放音效 */
        SoundPlayMgr.prototype.playGSound = function (url) {
            this.playSound(this.soundUrl + url + this.mp3);
        };
        /**-------------------------需要播放什么声音就在下面添加对应方法或者通过url直接播放某个声音--------------------------- */
        /*停止播放所有音效 */
        SoundPlayMgr.prototype.stopAll = function () {
            SoundManager.stopAll();
        };
        /**播放僵尸被撞声音 */
        SoundPlayMgr.prototype.playMonsterHit = function () {
            var hitIndex = this._monsterHitSoundAry.shift();
            this._monsterHitSoundAry.push(hitIndex);
            this.playGSound("hit" + hitIndex);
        };
        /**播放购买成功 */
        SoundPlayMgr.prototype.playBuySuccess = function () {
            this.playGSound("BoughtSound");
        };
        /**播放汽车加速 */
        SoundPlayMgr.prototype.playCarSpeedingLoop = function () {
            this.playSound(this.soundUrl + "BoostLaneSound" + this.mp3, 0);
        };
        /**停止播放汽车加速声音 */
        SoundPlayMgr.prototype.stopCarSpeeding = function () {
            this.stopSound(this.soundUrl + "BoostLaneSound" + this.mp3);
        };
        /**播放电锯声音 */
        SoundPlayMgr.prototype.playSawLoop = function () {
            this.playSound(this.soundUrl + "chainsaw" + this.mp3, 0);
        };
        /**停止播放电锯 */
        SoundPlayMgr.prototype.stopSaw = function () {
            this.stopSound(this.soundUrl + "chainsaw" + this.mp3);
        };
        /**播放点击音效 */
        SoundPlayMgr.prototype.playClick = function () {
            this.playGSound("Click");
        };
        /**播放爆炸声音 */
        SoundPlayMgr.prototype.playExplosionLoop = function () {
            this.stopSkid();
            this.playSound(this.soundUrl + "Explosion" + this.mp3, 0);
        };
        /**停止播放爆炸声音 */
        SoundPlayMgr.prototype.stopExplosion = function () {
            this.stopSound(this.soundUrl + "Explosion" + this.mp3);
        };
        /**播放漂移声音 */
        SoundPlayMgr.prototype.playSkidLoop = function () {
            this.playSound(this.soundUrl + "skid_loop" + this.mp3, 0);
        };
        /**停止漂移声音 */
        SoundPlayMgr.prototype.stopSkid = function () {
            this.stopSound(this.soundUrl + "skid_loop" + this.mp3);
        };
        /**播放闪电声音 */
        SoundPlayMgr.prototype.playLight = function () {
            this.playGSound("skill_light");
        };
        /**-------------------------------------------------------------------------------------------------------------- */
        SoundPlayMgr.prototype.getSex = function (sex) {
            return this.resUrl + "" + "/" + (sex == 0 ? "woman/" : "man/");
        };
        SoundPlayMgr.prototype.getUrl = function (url) {
            if (module.GameDataManager.USE_CDN == BOOLEAN.TRUE) {
                return module.GameDataManager.CDN_PATH + url;
            }
            else {
                return manager.ResVersionMgr.instance.getMd5Url(url);
            }
        };
        /**播放一个音效 */
        SoundPlayMgr.prototype.playSound = function (url, loops) {
            if (this._soundMuted == false) {
                SoundManager.playSound(this.getUrl(url), loops);
            }
        };
        /**停止播放声音 */
        SoundPlayMgr.prototype.stopSound = function (url) {
            SoundManager.stopSound(this.getUrl(url));
        };
        Object.defineProperty(SoundPlayMgr.prototype, "soundMuted", {
            /**设置音效的静音 */
            set: function (value) {
                this._soundMuted = value;
                if (this._soundMuted) {
                    //TODO  添加需要关闭的音效  需要根据不同游戏而不同
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundPlayMgr.prototype, "soundVolume", {
            get: function () {
                return this._soundVolume;
            },
            set: function (value) {
                this._soundVolume = value;
                LocalStorage.setItem(SoundPlayMgr.SOUND_VOLUME, value + "");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundPlayMgr.prototype, "musicVolume", {
            get: function () {
                return this._musicVolume;
            },
            set: function (value) {
                this._musicVolume = value;
                LocalStorage.setItem(SoundPlayMgr.MUSIC_VOLUME, value + "");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundPlayMgr, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new SoundPlayMgr();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        SoundPlayMgr._instance = null;
        SoundPlayMgr.MUSIC_VOLUME = "MUSIC_VOLUME";
        SoundPlayMgr.SOUND_VOLUME = "SOUND_VOLUME";
        return SoundPlayMgr;
    }());
    manager.SoundPlayMgr = SoundPlayMgr;
})(manager || (manager = {}));
//# sourceMappingURL=SoundPlayMgr.js.map