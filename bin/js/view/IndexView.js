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
var module;
(function (module) {
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView() {
            var _this = _super.call(this) || this;
            /**汽车 */
            _this._carItem = null;
            /**是否开始游戏 */
            _this._isStartGame = false;
            _this._carInRoadPoint = new Laya.Point();
            /**是否正在播放掉血动画 */
            _this._isPlayBlood = false;
            _this.faceId = manager.EnterFrameManager.instance.id;
            _this.initView();
            _this.initEvent();
            return _this;
        }
        Object.defineProperty(IndexView.prototype, "isStartGame", {
            get: function () {
                return this._isStartGame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IndexView.prototype, "cartItem", {
            get: function () {
                return this._carItem;
            },
            enumerable: true,
            configurable: true
        });
        /**初始化界面 */
        IndexView.prototype.initView = function () {
            this.mouseEnabled = true;
            this.mouseThrough = true;
            this.tfCoutDown.parent.removeChild(this.tfCoutDown);
            var shopX = 65;
            var shopY = Laya.stage.height - module.RoadManager.ROAD_HEIGHT + 500;
            this.btnShop.pos(shopX, shopY);
            var voiceX = 565;
            var voiceY = Laya.stage.height - module.RoadManager.ROAD_HEIGHT + 500;
            this.btnVoice.pos(voiceX, voiceY);
            this._scoreMonster = 0;
            this._scoreTime = 0;
            this._gameBg = new Laya.Sprite();
            manager.LayerManager.instace.addToLayer(this._gameBg, manager.LayerManager.STAGE_BACKGROUND_LAYER);
            this._carItem = new module.CarItem(module.GameDataManager.instance.selectCarID);
            this._carItem.x = Laya.stage.width / 2;
            this._carItem.y = Laya.stage.height - this._carItem.height - 200;
            this.addChild(this._carItem);
            this._gameSkillMgr = new module.GameSkillManger(this.skillModule);
            var isTrue = true;
            var index = 0;
            this._collisionBloods = new Array();
            while (isTrue) {
                var blood = this.getChildByName("collision" + index);
                if (blood == null) {
                    isTrue = false;
                }
                else {
                    blood.visible = false;
                    this._collisionBloods.push(blood);
                }
                index++;
            }
            this.updateGameScene();
            this.changeTipVisible(false, false);
            manager.EnterFrameManager.instance.addItem(this);
            //播放背景音乐
            manager.SoundPlayMgr.instance.playBgMusic();
        };
        /**变更提示显示状态 */
        IndexView.prototype.changeTipVisible = function (isShow, isFadeTween) {
            if (isFadeTween === void 0) { isFadeTween = true; }
            if (isShow) {
                this.imgTapLeft.alpha = 1;
                this.imgTapRight.alpha = 1;
                this.imgTapLeft.visible = true;
                this.imgTapRight.visible = true;
            }
            else {
                if (isFadeTween) {
                    Laya.Tween.to(this.imgTapLeft, { alpha: 0 }, 200, null, Laya.Handler.create(this, function () {
                        this.imgTapLeft.visible = false;
                    }));
                    Laya.Tween.to(this.imgTapRight, { alpha: 0 }, 200, null, Laya.Handler.create(this, function () {
                        this.imgTapRight.visible = false;
                    }));
                }
                else {
                    this.imgTapLeft.visible = false;
                    this.imgTapRight.visible = false;
                }
            }
        };
        /**初始化游戏事件监听 */
        IndexView.prototype.initEvent = function () {
            module.OperationManager.instance.initilize(this);
            manager.EventManager.instance.on(manager.EventManager.START_GAME, this, this.onSceneChange, null);
            manager.EventManager.instance.on(manager.EventManager.SKIP_CONTINUE_GAME, this, this.gameOver, null);
            manager.EventManager.instance.on(manager.EventManager.PLAY_CONTINUE, this, this.gameContinue);
        };
        /**游戏结算 */
        IndexView.prototype.gameOver = function () {
            Laya.timer.clear(this, this.updateScore);
            module.GameDialogManager.instance.closeContinueDialog();
            module.GameDialogManager.instance.openGameOverDialog(this._scoreMonster, this._scoreTime);
        };
        /**续命继续游戏 */
        IndexView.prototype.gameContinue = function () {
            this._continueCountDown = Math.floor(IndexView.CONTINUE_COUNT_DOWN / 1000);
            module.GameDialogManager.instance.closeContinueDialog();
            this._carItem.visible = true;
            this.addChildAt(this.tfCoutDown, this.numChildren - 1);
            this.tfCoutDown.text = this._continueCountDown.toString();
            this._carItem.rotation = module.RoadManager.instance.rollBackRoadPos();
            Laya.timer.loop(1000, this, this.gameContinueCountDown);
        };
        /**继续游戏倒计时 */
        IndexView.prototype.gameContinueCountDown = function () {
            this._continueCountDown--;
            if (this._continueCountDown <= 0) {
                Laya.timer.clear(this, this.gameContinueCountDown);
                //开始游戏
                this.tfCoutDown.parent.removeChild(this.tfCoutDown);
                manager.EventManager.instance.event(manager.EventManager.RACE_START);
                this._gameSkillMgr.continue();
                module.RoadManager.instance.slowUpSpeed();
                this._isStartGame = true;
            }
            else {
                this.tfCoutDown.text = this._continueCountDown.toString();
            }
        };
        /**更新游戏场景 */
        IndexView.prototype.updateGameScene = function () {
            module.GameDataManager.instance.roadStyle = module.RoadManager.instance.randomRoadStyle();
            this.changeGameBgColor();
            this._carItem.reset();
            this._carItem.x = Laya.stage.width / 2;
            this._carItem.y = Laya.stage.height - this._carItem.height - 200;
            this._scoreMonster = 0;
            this._scoreTime = 0;
            this.tfScore.text = "0";
            Laya.timer.loop(1000, this, this.updateScore);
            this._carItem.visible = true;
            module.RoadManager.instance.clear();
            module.RoadManager.instance.startTimer();
            module.RoadManager.instance.addRoad();
            module.RoadManager.instance.changeRotationPivot(this._carItem.x, this._carItem.y);
            this.btnStartGame.on(Laya.Event.CLICK, this, this.onStartGameClick, null);
            this.btnShop.on(Laya.Event.CLICK, this, this.openShopDialog);
            this.btnVoice.on(Laya.Event.CLICK, this, this.openOrCloseVoice);
        };
        IndexView.prototype.updateScore = function () {
            if (this._isStartGame) {
                this._scoreTime++;
                this.tfScore.text = this._scoreTime.toString();
            }
        };
        IndexView.prototype.openOrCloseVoice = function () {
            if (module.GameDataManager.instance.isVoiceOpen == BOOLEAN.TRUE) {
                module.GameDataManager.instance.isVoiceOpen = BOOLEAN.FALSE;
                manager.EventManager.instance.event(manager.EventManager.CLOSE_VOICE);
            }
            else {
                module.GameDataManager.instance.isVoiceOpen = BOOLEAN.TRUE;
                manager.EventManager.instance.event(manager.EventManager.OPEN_VOICE);
            }
        };
        IndexView.prototype.openShopDialog = function (e) {
            e.stopPropagation();
            module.GameDialogManager.instance.openShopDialog();
        };
        /**开始游戏 */
        IndexView.prototype.onStartGameClick = function (e) {
            if (module.GameDialogManager.instance.isExistOpeningDialog) {
                return;
            }
            this.btnShop.off(Laya.Event.CLICK, this, this.openShopDialog);
            this.btnStartGame.off(Laya.Event.CLICK, this, this.onStartGameClick);
            manager.EventManager.instance.once(manager.EventManager.SKILL_SELECT_COMPLETE, this, this.onSkillSelectComplete);
            module.GameDialogManager.instance.openSkillSelectDialog();
        };
        /**技能选择完成回调 */
        IndexView.prototype.onSkillSelectComplete = function (selectSkill) {
            this._gameSkillMgr.run(selectSkill);
            if (module.GameDataManager.instance.isNewPlayer == BOOLEAN.TRUE) {
                this.changeTipVisible(true);
                Laya.stage.once(Laya.Event.MOUSE_DOWN, this, function () {
                    this.changeTipVisible(false, true);
                    module.GameDataManager.instance.isNewPlayer = BOOLEAN.FALSE;
                });
            }
            this._isStartGame = true;
            manager.EventManager.instance.event(manager.EventManager.RACE_START);
            Laya.Tween.to(this._carItem, { y: Laya.stage.height / 2 }, 1000, null, Laya.Handler.create(this, function () {
                module.RoadManager.instance.changeRotationPivot(this._carItem.x, this._carItem.y);
                manager.EventManager.instance.event(manager.EventManager.REQUSET_FIRE_FREE_SKILL);
            }));
        };
        /**场景切换 */
        IndexView.prototype.onSceneChange = function () {
            this.updateGameScene();
        };
        /**变更背景色 */
        IndexView.prototype.changeGameBgColor = function () {
            var color = module.RoadManager.instance.getRoadBgColor(module.GameDataManager.instance.roadStyle);
            this._gameBg.graphics.clear();
            this._gameBg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, color, color);
        };
        /**移除所有监听事件 */
        IndexView.prototype.removeEvent = function () {
            manager.EventManager.instance.off(manager.EventManager.START_GAME, this, this.onSceneChange);
            manager.EventManager.instance.off(manager.EventManager.SKIP_CONTINUE_GAME, this, this.gameOver, null);
            manager.EventManager.instance.off(manager.EventManager.PLAY_CONTINUE, this, this.gameContinue);
        };
        IndexView.prototype.onEnterFrame = function () {
            //游戏未开始
            if (!this._isStartGame) {
                return;
            }
            //1.移动ui
            module.RoadManager.instance.moveRoad(this._carItem.rotation);
            //2.计算汽车在哪一块道路上
            var road = module.RoadManager.instance.getCarInWhichRoad(this._carItem.x, this._carItem.y);
            if (road == null) {
                console.assert(false);
                return;
            }
            //3.汽车在道路的局部坐标
            this._carInRoadPoint.setTo(this._carItem.x, this._carItem.y);
            this._carInRoadPoint = road['globalToLocal'](this._carInRoadPoint, false);
            //移动怪物
            module.RoadManager.instance.moveMonster(road, this._carInRoadPoint);
            //4.如果漂移绘制轮胎印记			
            this._carItem.updateData(this._carItem.rotation, road);
            //检测碰撞怪物
            var isRunOver = this.collisionMonster(road, this._carInRoadPoint);
            if (this._carItem.getIsExistDrift() && module.RoadManager.instance.moveSpeed >= 2) {
                this._carItem.tryPlayWheelGas();
                this._carItem.drawTyleSkid(road, isRunOver);
            }
            else {
                this._carItem.tryStopWheelGas();
            }
            //5.碰撞检测
            var isCrash = this.collisionIsCrash(road, this._carInRoadPoint);
            if (isCrash) {
                this.onCarCrash();
                console.log("撞毁时汽车在道路ID为：" + road.uID);
                return;
            }
            module.RoadManager.instance.tryUpdateRoad(road);
        };
        /**汽车撞毁 */
        IndexView.prototype.onCarCrash = function () {
            this._isStartGame = false;
            this._gameSkillMgr.reset();
            manager.EventManager.instance.once(manager.EventManager.CRASH_PLAY_OVER, this, this.onCarCrashComplete);
            this._carItem.visible = false;
            this._carItem.crash();
        };
        /**汽车撞毁完成回调 */
        IndexView.prototype.onCarCrashComplete = function () {
            module.GameDialogManager.instance.openContinueDialog();
        };
        /**
         * 碰撞怪物
         * @param road 当前道路
         * @param carLocalPoint 小车局部坐标
         * @return 返回是否碾过死亡的怪物
         */
        IndexView.prototype.collisionMonster = function (road, carLocalPoint) {
            var runOverMonster = false;
            for (var i = 0; i < road.monsterAry.length; i++) {
                var monster = road.monsterAry[i];
                //如果技能正在使用直接杀死怪物				
                if (this._carItem.isLighting) {
                    //判断是否碾过怪物
                    if (monster.isDead && !runOverMonster) {
                        runOverMonster = true;
                    }
                    //碰撞判断
                    if (!monster.isDead) {
                        this._scoreMonster++;
                        this.playRandomBlood();
                        monster.dead();
                        manager.SoundPlayMgr.instance.playMonsterHit();
                    }
                }
                else {
                    //使用电锯道具增加攻击范围
                    if (Math.pow(carLocalPoint.x - monster.x, 2) + Math.pow(carLocalPoint.y - monster.y, 2) <=
                        Math.pow(monster.collision_radius, 2) + Math.pow(this._carItem.collision_radius, 2)) {
                        //判断是否碾过怪物
                        if (monster.isDead && !runOverMonster) {
                            runOverMonster = true;
                        }
                        //碰撞判断
                        if (!monster.isDead) {
                            this._scoreMonster++;
                            this.playRandomBlood();
                            monster.dead();
                            manager.SoundPlayMgr.instance.playMonsterHit();
                        }
                    }
                }
            }
            return runOverMonster;
        };
        /**随机播放血液动画 */
        IndexView.prototype.playRandomBlood = function () {
            if (this._isPlayBlood) {
                return;
            }
            this._isPlayBlood = true;
            var blood = this._collisionBloods.shift();
            this._collisionBloods.push(blood);
            blood.visible = true;
            blood.alpha = 0.8;
            Laya.Tween.to(blood, { alpha: 0 }, 800, null, Laya.Handler.create(this, function () {
                blood.visible = false;
                this._isPlayBlood = false;
            }));
        };
        /**检测是否碰撞围栏 */
        IndexView.prototype.collisionIsCrash = function (road, carLocalPoint) {
            var isCrash = false;
            for (var i = 0; i < road.collision_points.length; i++) {
                var imgPoint = road.collision_points[i];
                if (carLocalPoint.distance(imgPoint.x, imgPoint.y) <= 50) {
                    isCrash = true;
                    break;
                }
            }
            return isCrash;
        };
        /**释放 */
        IndexView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.removeEvent();
        };
        /**继续游戏倒计时 */
        IndexView.CONTINUE_COUNT_DOWN = 3000;
        /**场景切换bg资源路径 */
        IndexView.SCENE_CHANGE_URL = "ui/blackbg.png";
        return IndexView;
    }(ui.game.IndexViewUI));
    module.IndexView = IndexView;
})(module || (module = {}));
//# sourceMappingURL=IndexView.js.map