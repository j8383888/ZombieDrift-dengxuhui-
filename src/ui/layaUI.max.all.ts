
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.game {
    export class CarItemUI extends View {
		public gas_front_left:Laya.Animation;
		public gas_front_right:Laya.Animation;
		public gas_back_left:Laya.Animation;
		public gas_back_right:Laya.Animation;
		public clipCar:Laya.Clip;
		public clipSawLeft:Laya.Clip;
		public clipSawRight:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":126,"height":197},"child":[{"type":"Image","props":{"y":0,"width":1,"skin":"ui/blackbg.png","name":"right_up","height":1}},{"type":"Image","props":{"width":1,"skin":"ui/blackbg.png","name":"right_down","height":1}},{"type":"Image","props":{"width":1,"skin":"ui/blackbg.png","name":"left_up","height":1}},{"type":"Image","props":{"width":1,"skin":"ui/blackbg.png","name":"left_down","height":1}},{"type":"Image","props":{"y":10,"x":10,"width":1,"skin":"ui/blackbg.png","name":"wheel_right_up","height":1}},{"type":"Image","props":{"y":20,"x":20,"width":1,"skin":"ui/blackbg.png","name":"wheel_right_down","height":1}},{"type":"Image","props":{"y":30,"x":30,"width":1,"skin":"ui/blackbg.png","name":"wheel_left_up","height":1}},{"type":"Image","props":{"y":40,"x":40,"width":1,"skin":"ui/blackbg.png","name":"wheel_left_down","height":1}},{"type":"Animation","props":{"y":105,"x":37,"var":"gas_front_left","source":"effect/TailGas1.ani","scaleY":0.3,"scaleX":0.3,"rotation":180}},{"type":"Animation","props":{"y":105,"x":134,"var":"gas_front_right","source":"effect/TailGas1.ani","scaleY":0.3,"scaleX":0.3,"rotation":180}},{"type":"Animation","props":{"y":189,"x":35,"var":"gas_back_left","source":"effect/TailGas1.ani","scaleY":0.3,"scaleX":0.3,"rotation":180}},{"type":"Animation","props":{"y":189,"x":140,"var":"gas_back_right","source":"effect/TailGas1.ani","scaleY":0.3,"scaleX":0.3,"rotation":180}},{"type":"Clip","props":{"y":0,"x":0,"var":"clipCar","skin":"car/clip_car_1.png","clipY":2,"clipX":2,"anchorY":0}},{"type":"Clip","props":{"y":89,"x":60,"var":"clipSawLeft","skin":"ui/clip_saw1.png","skewY":180,"skewX":0,"rotation":0,"clipY":6,"anchorY":0.5}},{"type":"Clip","props":{"y":89,"x":59,"var":"clipSawRight","skin":"ui/clip_saw1.png","clipY":6,"anchorY":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.CarItemUI.uiView);

        }

    }
}

module ui.game {
    export class CarListItemUI extends View {
		public imgUnlock:Laya.Image;
		public imgLock:Laya.Image;
		public imgSelect:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":150,"height":145},"child":[{"type":"Image","props":{"var":"imgUnlock","skin":"car/small_car_1.png"}},{"type":"Image","props":{"y":0,"x":0,"var":"imgLock","skin":"car/small_car_lock_1.png"}},{"type":"Image","props":{"y":81,"x":106,"var":"imgSelect","skin":"ui/flag.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.CarListItemUI.uiView);

        }

    }
}

module ui.game {
    export class ContinueGameDialogUI extends Dialog {
		public boxTimeCountDown:Laya.Box;
		public imgBottom:Laya.Image;
		public btnContinue:Laya.Button;
		public btnSkip:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":648,"height":1000},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/board.png"}},{"type":"Label","props":{"y":268,"x":78,"width":492,"text":"继续游戏！","height":88,"fontSize":60,"font":"Microsoft YaHei","color":"#000000","bold":true,"align":"center"}},{"type":"Box","props":{"y":363,"x":123,"var":"boxTimeCountDown"},"child":[{"type":"Image","props":{"var":"imgBottom","skin":"ui/img_continue_round.png"}}]},{"type":"Button","props":{"y":395,"x":155,"var":"btnContinue","stateNum":1,"skin":"ui/btn_continue.png","centerX":0}},{"type":"Button","props":{"y":816,"x":243,"var":"btnSkip","stateNum":1,"skin":"ui/btn_skin.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.ContinueGameDialogUI.uiView);

        }

    }
}

module ui.game {
    export class EarnMoneyDialogUI extends Dialog {
		public btnWatchVieo:Laya.Button;
		public btnShare:Laya.Button;
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":718,"height":538},"child":[{"type":"Image","props":{"skin":"ui/board_2.png"}},{"type":"Button","props":{"y":165,"x":431,"width":160,"var":"btnWatchVieo","stateNum":1,"skin":"ui/btn_continue.png","height":160}},{"type":"Button","props":{"y":165,"x":136,"width":160,"var":"btnShare","stateNum":1,"skin":"ui/btn_like.png","height":160}},{"type":"Label","props":{"y":347,"x":80,"width":264,"text":"分享获得50金币","height":42,"fontSize":30,"font":"Microsoft YaHei","color":"#0b0b0b","bold":true,"align":"center"}},{"type":"Label","props":{"y":347,"x":367,"width":303,"text":"观看视频获得150金币","height":42,"fontSize":30,"font":"Microsoft YaHei","color":"#0b0b0b","bold":true,"align":"center"}},{"type":"Button","props":{"y":64,"x":628,"var":"btnClose","stateNum":1,"skin":"ui/btn_close.png","scaleY":1.4,"scaleX":1.4}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.EarnMoneyDialogUI.uiView);

        }

    }
}

module ui.game {
    export class ExhibitionCarItemUI extends View {
		public imgCar:Laya.Image;
		public clipCar:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":340,"height":380},"child":[{"type":"Image","props":{"y":188,"x":171,"var":"imgCar","skin":"car/car3_lock.png","scaleY":1.5,"scaleX":1.5,"rotation":0,"anchorY":0.5,"anchorX":0.5}},{"type":"Clip","props":{"y":188,"x":171,"var":"clipCar","skin":"car/clip_car_3.png","scaleY":1.8,"scaleX":1.8,"clipY":2,"clipX":2,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.ExhibitionCarItemUI.uiView);

        }

    }
}

module ui.game {
    export class ExhibitionSkillItemUI extends View {
		public imgUnlock:Laya.Image;
		public imgLock:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":300,"height":300},"child":[{"type":"Image","props":{"y":150,"x":150,"width":300,"var":"imgUnlock","skin":"ui/more_arrows.png","height":300,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":150,"x":150,"width":300,"var":"imgLock","skin":"ui/more_arrows_lock.png","height":300,"anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.ExhibitionSkillItemUI.uiView);

        }

    }
}

module ui.game {
    export class GameOverDialogUI extends Dialog {
		public btnDoubleScore:Laya.Button;
		public btnCarShop:Laya.Button;
		public btnPlay:Laya.Button;
		public tfMonsterScore:Laya.Label;
		public tfTimeScore:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":648,"height":1000},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/board.png","centerY":0,"centerX":0}},{"type":"Button","props":{"y":693,"x":188,"var":"btnDoubleScore","stateNum":1,"skin":"ui/btn_double_score.png","centerX":0}},{"type":"Box","props":{"y":811,"x":111,"centerX":0},"child":[{"type":"Button","props":{"y":0,"x":0,"var":"btnCarShop","stateNum":1,"skin":"ui/btn_car_shop.png"}}]},{"type":"Button","props":{"y":508,"var":"btnPlay","stateNum":1,"skin":"ui/btn_play_circle.png","centerX":0}},{"type":"Label","props":{"y":241,"x":159,"width":321,"var":"tfMonsterScore","text":"32","height":115,"fontSize":90,"font":"Microsoft YaHei","color":"#000000","centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"y":233,"x":462,"skin":"ui/zombie_score.png","scaleY":0.3,"scaleX":0.3}},{"type":"Label","props":{"y":385,"x":159,"width":321,"var":"tfTimeScore","text":"32","height":115,"fontSize":90,"font":"Microsoft YaHei","color":"#000000","centerX":-5,"bold":true,"align":"center"}},{"type":"Image","props":{"y":379,"x":454,"skin":"ui/img_time.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameOverDialogUI.uiView);

        }

    }
}

module ui.game {
    export class GameSkillModuleUI extends View {
		public ani1:Laya.FrameAnimation;
		public imgSkill:Laya.Image;
		public imgSkillShade:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":133,"height":127},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/bonus.png","scaleY":1.5,"scaleX":1.5}},{"type":"Image","props":{"y":58,"x":73,"var":"imgSkill","skin":"ui/more_arrows.png","scaleY":0.2,"scaleX":0.2,"anchorY":0.5,"anchorX":0.5},"compId":4},{"type":"Image","props":{"y":18,"x":40,"width":64,"var":"imgSkillShade","skin":"ui/img_skill_shade.png","height":79}}],"animations":[{"nodes":[{"target":4,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":4,"key":"alpha","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.GameSkillModuleUI.uiView);

        }

    }
}

module ui.game {
    export class IndexViewUI extends View {
		public imgTapRight:Laya.Image;
		public imgTapLeft:Laya.Image;
		public tfScore:Laya.Label;
		public skillModule:ui.game.GameSkillModuleUI;
		public tfCoutDown:Laya.Label;
		public btnStartGame:Laya.Image;
		public btnShop:Laya.Image;
		public btnVoice:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"width":750,"top":0,"right":0,"left":0,"height":1334,"bottom":0},"child":[{"type":"Image","props":{"x":0,"var":"imgTapRight","skin":"ui/left.png","left":0,"centerY":0}},{"type":"Image","props":{"var":"imgTapLeft","skin":"ui/right.png","right":0,"centerY":0}},{"type":"Box","props":{"y":0,"x":0,"top":0,"left":0},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"ui/score.png"}},{"type":"Image","props":{"y":0,"x":44,"width":108,"skin":"ui/effect_1.png","height":96}},{"type":"Label","props":{"y":17,"x":47,"width":101,"var":"tfScore","text":"500","height":62,"fontSize":46,"font":"Microsoft YaHei","color":"#408692","bold":true,"align":"center"}},{"type":"GameSkillModule","props":{"y":120,"x":0,"var":"skillModule","runtime":"ui.game.GameSkillModuleUI"}}]},{"type":"Image","props":{"y":561,"x":26,"skin":"ui/collision_monster_0.png","scaleY":1.8,"scaleX":1.8,"name":"collision0"}},{"type":"Image","props":{"y":236,"x":9,"skin":"ui/collision_monster_1.png","scaleY":1.4,"scaleX":1.4,"name":"collision2"}},{"type":"Image","props":{"y":390,"x":75,"skin":"ui/collision_monster_2.png","scaleY":1.8,"scaleX":1.8,"name":"collision1"}},{"type":"Label","props":{"width":235,"var":"tfCoutDown","text":"0","height":200,"fontSize":140,"font":"Microsoft YaHei","color":"#fb0028","centerY":-300,"centerX":0,"bold":true,"align":"center"}},{"type":"Image","props":{"var":"btnStartGame","top":0,"skin":"ui/blackbg.png","right":0,"left":0,"bottom":0,"alpha":0}},{"type":"Image","props":{"y":1226,"x":0,"width":108,"var":"btnShop","skin":"ui/blackbg.png","height":108,"alpha":0}},{"type":"Image","props":{"y":1226,"x":642,"width":108,"var":"btnVoice","skin":"ui/blackbg.png","height":108,"alpha":0}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.game.GameSkillModuleUI",ui.game.GameSkillModuleUI);

            super.createChildren();
            this.createView(ui.game.IndexViewUI.uiView);

        }

    }
}

module ui.game {
    export class SelectSkillDialogUI extends Dialog {
		public tfMoney:Laya.Label;
		public btnClose:Laya.Button;
		public tfTip:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":574,"height":438},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/board_skill_use.png"}},{"type":"Label","props":{"y":18,"x":37,"width":124,"var":"tfMoney","text":"99999","height":51,"fontSize":32,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"SkillListItem","props":{"y":77,"x":48,"name":"skill1","runtime":"ui.game.SkillListItemUI"}},{"type":"SkillListItem","props":{"y":77,"x":202,"name":"skill2","runtime":"ui.game.SkillListItemUI"}},{"type":"SkillListItem","props":{"y":77,"x":356,"name":"skill3","runtime":"ui.game.SkillListItemUI"}},{"type":"SkillListItem","props":{"y":243,"x":48,"name":"skill4","runtime":"ui.game.SkillListItemUI"}},{"type":"Image","props":{"y":338,"x":148,"skin":"ui/flash.png","name":"use4"}},{"type":"Image","props":{"y":173,"x":148,"skin":"ui/flash.png","name":"use1"}},{"type":"Image","props":{"y":173,"x":300,"skin":"ui/flash.png","name":"use2"}},{"type":"Image","props":{"y":173,"x":445,"skin":"ui/flash.png","name":"use3"}},{"type":"Button","props":{"y":13,"x":506,"var":"btnClose","stateNum":1,"skin":"ui/btn_close.png","scaleY":1.2,"scaleX":1.2}},{"type":"Label","props":{"y":193,"x":55,"width":464,"var":"tfTip","text":"请在商店解锁","height":51,"fontSize":34,"font":"Microsoft YaHei","color":"#f90c08","bold":false,"align":"center"}},{"type":"Label","props":{"y":208,"x":48,"width":139,"text":"758","name":"name1","height":39,"fontSize":28,"font":"Microsoft YaHei","color":"#080808","bold":true,"align":"center"}},{"type":"Label","props":{"y":208,"x":202,"width":136,"text":"758","name":"name2","height":39,"fontSize":28,"font":"Microsoft YaHei","color":"#080808","bold":true,"align":"center"}},{"type":"Label","props":{"y":208,"x":355,"width":139,"text":"758","name":"name3","height":39,"fontSize":28,"font":"Microsoft YaHei","color":"#080808","bold":true,"align":"center"}},{"type":"Label","props":{"y":375,"x":48,"width":139,"text":"758","name":"name4","height":39,"fontSize":28,"font":"Microsoft YaHei","color":"#080808","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.game.SkillListItemUI",ui.game.SkillListItemUI);

            super.createChildren();
            this.createView(ui.game.SelectSkillDialogUI.uiView);

        }

    }
}

module ui.game {
    export class ShopDialogUI extends Dialog {
		public boxCar:Laya.Box;
		public imgSelectCar:Laya.Image;
		public btnToSkill:Laya.Button;
		public itemCar:ui.game.ExhibitionCarItemUI;
		public panelCar:Laya.Panel;
		public btnBuyCar:Laya.Button;
		public boxSkill:Laya.Box;
		public btnToCar:Laya.Button;
		public itemSkill:ui.game.ExhibitionSkillItemUI;
		public tfSkillName:Laya.Label;
		public btnBuySkill:Laya.Button;
		public panelSkill:Laya.Panel;
		public btnClose:Laya.Button;
		public tfMoney:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":714,"height":1024},"child":[{"type":"Box","props":{"x":0,"var":"boxCar","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"var":"imgSelectCar","skin":"ui/board_car.png"}},{"type":"Button","props":{"y":18,"x":323,"width":166,"var":"btnToSkill","height":58}},{"type":"Image","props":{"y":127,"x":78,"skin":"ui/round_car.png"}},{"type":"ExhibitionCarItem","props":{"y":406,"x":355,"var":"itemCar","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.ExhibitionCarItemUI"}},{"type":"Panel","props":{"y":794,"x":60,"width":598,"var":"panelCar","height":174,"hScrollBarSkin":"ui/hscroll_2.png"}},{"type":"Button","props":{"y":706,"var":"btnBuyCar","stateNum":1,"skin":"ui/btn_buy.png","labelStrokeColor":"#ffffff","labelSize":30,"labelPadding":"-5,34","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"200","centerX":0}}]},{"type":"Box","props":{"x":0,"var":"boxSkill","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"skin":"ui/board_power_up.png"}},{"type":"Button","props":{"y":31,"x":140,"width":166,"var":"btnToCar","height":58}},{"type":"Image","props":{"y":126,"x":102,"skin":"ui/round_car.png","scaleY":0.9,"scaleX":0.9}},{"type":"ExhibitionSkillItem","props":{"y":374,"x":360,"var":"itemSkill","anchorY":0.5,"anchorX":0.5,"runtime":"ui.game.ExhibitionSkillItemUI"}},{"type":"Label","props":{"y":638,"x":55,"width":608,"var":"tfSkillName","text":"ANTI-ZOMBIE LIGHTING BOMB","height":70,"fontSize":38,"font":"Microsoft YaHei","color":"#000000","bold":true,"align":"center"}},{"type":"Button","props":{"y":713,"x":227,"var":"btnBuySkill","stateNum":1,"skin":"ui/btn_buy.png","labelStrokeColor":"#ffffff","labelSize":30,"labelPadding":"-5,34","labelFont":"Microsoft YaHei","labelColors":"#ffffff","labelBold":true,"labelAlign":"center","label":"200"}},{"type":"Panel","props":{"y":804,"x":62,"width":598,"var":"panelSkill","height":174,"hScrollBarSkin":"ui/hscroll_2.png"}}]},{"type":"Button","props":{"var":"btnClose","top":94,"stateNum":1,"skin":"ui/btn_close.png","scaleY":1.4,"scaleX":1.4,"right":45}},{"type":"Box","props":{"y":93,"x":57,"width":211,"height":56},"child":[{"type":"Image","props":{"y":4,"x":0,"skin":"ui/zombie_score.png","scaleY":0.1,"scaleX":0.1}},{"type":"Label","props":{"y":0,"x":48,"width":160,"var":"tfMoney","text":"9999999","height":53,"fontSize":38,"font":"Microsoft YaHei","color":"#000000","bold":false,"align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.game.ExhibitionCarItemUI",ui.game.ExhibitionCarItemUI);
			View.regComponent("ui.game.ExhibitionSkillItemUI",ui.game.ExhibitionSkillItemUI);

            super.createChildren();
            this.createView(ui.game.ShopDialogUI.uiView);

        }

    }
}

module ui.game {
    export class SkillListItemUI extends View {
		public imgUnlock:Laya.Image;
		public imgLock:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":136,"height":136},"child":[{"type":"Image","props":{"var":"imgUnlock","skin":"ui/small_hourglass.png"}},{"type":"Image","props":{"var":"imgLock","skin":"ui/small_hourglass_lock.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.game.SkillListItemUI.uiView);

        }

    }
}

module ui.game {
    export class TestPageUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Box","props":{"y":3381,"x":-6347,"width":720,"rotation":0,"height":729,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"RoadStraightItem","props":{"y":360,"x":360,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadStraightItemUI"}},{"type":"Label","props":{"y":221,"x":287,"text":"1","fontSize":300,"color":"#fdf8f8"}}]},{"type":"Box","props":{"y":1553,"x":2640,"width":1443,"rotation":0,"height":1471,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"RoadTurn45Item","props":{"y":360,"x":1108.0000192923262,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn45ItemUI"}},{"type":"RoadSideItem","props":{"y":710,"x":750.0000192923262,"rotation":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadSideItemUI"}},{"type":"RoadTurn45Item","props":{"y":1085,"x":360.0000192923262,"rotation":180,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn45ItemUI"}},{"type":"Label","props":{"y":1031,"x":177,"text":"1","fontSize":300,"color":"#fdf8f8"}},{"type":"Label","props":{"y":541,"x":707,"text":"2","fontSize":300,"color":"#fdf8f8"}},{"type":"Label","props":{"y":91,"x":1017,"width":167,"text":"3","pivotY":-80,"pivotX":-60,"height":300,"fontSize":300,"color":"#fdf8f8"}}]},{"type":"Box","props":{"y":971,"x":-5207,"width":1428,"rotation":0,"height":722,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"RoadTurn90Item","props":{"y":361,"x":1067,"rotation":180,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"RoadTurn90Item","props":{"y":360,"x":360,"rotation":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"Label","props":{"y":251,"x":297,"text":"1","fontSize":300,"color":"#fdf8f8"}},{"type":"Label","props":{"y":301,"x":1027,"text":"2","fontSize":300,"color":"#fdf8f8"}}]},{"type":"Box","props":{"y":812,"x":-2832,"width":1446,"rotation":180,"height":759,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"RoadTurn90Item","props":{"y":363.00000964616333,"x":360.00000964616356,"rotation":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"RoadTurn90Item","props":{"y":386,"x":1103,"rotation":270,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"Label","props":{"y":222,"x":233,"text":"1","fontSize":300,"color":"#fdf8f8"}},{"type":"Label","props":{"y":281,"x":1007,"text":"2","fontSize":300,"color":"#fdf8f8"}}]},{"type":"Box","props":{"y":1922,"x":-3522,"width":1446,"rotation":0,"height":759,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"RoadTurn90Item","props":{"y":363.00000964616333,"x":360.00000964616356,"rotation":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"RoadTurn90Item","props":{"y":386,"x":1103,"rotation":270,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"Label","props":{"y":222,"x":233,"text":"1","fontSize":300,"color":"#fdf8f8"}},{"type":"Label","props":{"y":281,"x":1007,"text":"2","fontSize":300,"color":"#fdf8f8"}}]},{"type":"Box","props":{"y":3461,"x":-237,"width":1428,"rotation":0,"height":722,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"RoadTurn90Item","props":{"y":361,"x":1067,"rotation":180,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"RoadTurn90Item","props":{"y":360,"x":360,"rotation":0,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}},{"type":"Label","props":{"y":251,"x":297,"text":"1","fontSize":300,"color":"#fdf8f8"}},{"type":"Label","props":{"y":301,"x":1027,"text":"2","fontSize":300,"color":"#fdf8f8"}}]},{"type":"RoadTurn90Item","props":{"y":786,"x":-1637,"rotation":180,"anchorY":0.5,"anchorX":0.5,"runtime":"ui.road.RoadTurn90ItemUI"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.road.RoadStraightItemUI",ui.road.RoadStraightItemUI);
			View.regComponent("ui.road.RoadTurn45ItemUI",ui.road.RoadTurn45ItemUI);
			View.regComponent("ui.road.RoadSideItemUI",ui.road.RoadSideItemUI);
			View.regComponent("ui.road.RoadTurn90ItemUI",ui.road.RoadTurn90ItemUI);

            super.createChildren();
            this.createView(ui.game.TestPageUI.uiView);

        }

    }
}

module ui.road {
    export class RoadSideItemUI extends View {
		public imgRoad:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":720},"child":[{"type":"Image","props":{"var":"imgRoad","skin":"road1/side_0.png"}},{"type":"Image","props":{"y":705,"x":273,"skin":"ui/img_collision_point.png","name":"point3"}},{"type":"Image","props":{"y":655,"x":324,"skin":"ui/img_collision_point.png","name":"point10"}},{"type":"Image","props":{"y":614,"x":367,"skin":"ui/img_collision_point.png","name":"point9"}},{"type":"Image","props":{"y":560,"x":415,"skin":"ui/img_collision_point.png","name":"point19"}},{"type":"Image","props":{"y":510,"x":464,"skin":"ui/img_collision_point.png","name":"point4"}},{"type":"Image","props":{"y":465,"x":511,"skin":"ui/img_collision_point.png","name":"point5"}},{"type":"Image","props":{"y":418,"x":554,"skin":"ui/img_collision_point.png","name":"point6"}},{"type":"Image","props":{"y":368,"x":605,"skin":"ui/img_collision_point.png","name":"point7"}},{"type":"Image","props":{"y":326,"x":648,"skin":"ui/img_collision_point.png","name":"point8"}},{"type":"Image","props":{"y":275,"x":699,"skin":"ui/img_collision_point.png","name":"point2"}},{"type":"Image","props":{"y":439,"x":3,"skin":"ui/img_collision_point.png","name":"point1"}},{"type":"Image","props":{"y":192,"x":253,"skin":"ui/img_collision_point.png","name":"point11"}},{"type":"Image","props":{"y":391,"x":53,"skin":"ui/img_collision_point.png","name":"point12"}},{"type":"Image","props":{"y":345,"x":99,"skin":"ui/img_collision_point.png","name":"point13"}},{"type":"Image","props":{"y":299,"x":148,"skin":"ui/img_collision_point.png","name":"point14"}},{"type":"Image","props":{"y":246,"x":194,"skin":"ui/img_collision_point.png","name":"point15"}},{"type":"Image","props":{"y":143,"x":298,"skin":"ui/img_collision_point.png","name":"point16"}},{"type":"Image","props":{"y":92,"x":345,"skin":"ui/img_collision_point.png","name":"point17"}},{"type":"Image","props":{"y":50,"x":389,"skin":"ui/img_collision_point.png","name":"point18"}},{"type":"Image","props":{"y":6,"x":435,"skin":"ui/img_collision_point.png","name":"point0"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.road.RoadSideItemUI.uiView);

        }

    }
}

module ui.road {
    export class RoadStraightItemUI extends View {
		public imgRoad:Laya.Image;
		public btnCarShop:Laya.Button;
		public clipVoice:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"imgRoad","skin":"road1/begin0_0.png"}},{"type":"Image","props":{"y":709,"x":161,"skin":"ui/img_collision_point.png","name":"point1"}},{"type":"Image","props":{"y":3,"x":161,"skin":"ui/img_collision_point.png","name":"point0"}},{"type":"Image","props":{"y":91,"x":161,"skin":"ui/img_collision_point.png","name":"point10"}},{"type":"Image","props":{"y":180,"x":161,"skin":"ui/img_collision_point.png","name":"point9"}},{"type":"Image","props":{"y":268,"x":161,"skin":"ui/img_collision_point.png","name":"point4"}},{"type":"Image","props":{"y":356,"x":161,"skin":"ui/img_collision_point.png","name":"point5"}},{"type":"Image","props":{"y":444,"x":161,"skin":"ui/img_collision_point.png","name":"point6"}},{"type":"Image","props":{"y":533,"x":161,"skin":"ui/img_collision_point.png","name":"point7"}},{"type":"Image","props":{"y":621,"x":161,"skin":"ui/img_collision_point.png","name":"point8"}},{"type":"Image","props":{"y":708,"x":548,"skin":"ui/img_collision_point.png","name":"point3"}},{"type":"Image","props":{"y":4,"x":548,"skin":"ui/img_collision_point.png","name":"point2"}},{"type":"Image","props":{"y":92,"x":548,"skin":"ui/img_collision_point.png","name":"point11"}},{"type":"Image","props":{"y":180,"x":548,"skin":"ui/img_collision_point.png","name":"point12"}},{"type":"Image","props":{"y":268,"x":548,"skin":"ui/img_collision_point.png","name":"point13"}},{"type":"Image","props":{"y":356,"x":548,"skin":"ui/img_collision_point.png","name":"point14"}},{"type":"Image","props":{"y":444,"x":548,"skin":"ui/img_collision_point.png","name":"point15"}},{"type":"Image","props":{"y":532,"x":548,"skin":"ui/img_collision_point.png","name":"point16"}},{"type":"Image","props":{"y":620,"x":548,"skin":"ui/img_collision_point.png","name":"point17"}},{"type":"Button","props":{"y":500,"x":50,"var":"btnCarShop","stateNum":1,"skin":"ui/btn_car_shop.png"}},{"type":"Clip","props":{"y":500,"x":565,"var":"clipVoice","skin":"ui/clip_voice.png","index":1,"clipY":1,"clipX":2}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.road.RoadStraightItemUI.uiView);

        }

    }
}

module ui.road {
    export class RoadTurn45ItemUI extends View {
		public imgRoad:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":720},"child":[{"type":"Image","props":{"var":"imgRoad","skin":"road1/turn45_0.png"}},{"type":"Image","props":{"y":375,"x":67,"skin":"ui/img_collision_point.png","name":"point1"}},{"type":"Image","props":{"y":91,"x":166,"skin":"ui/img_collision_point.png","name":"point11"}},{"type":"Image","props":{"y":161,"x":165,"skin":"ui/img_collision_point.png","name":"point15"}},{"type":"Image","props":{"y":227,"x":165,"skin":"ui/img_collision_point.png","name":"point10"}},{"type":"Image","props":{"y":291,"x":154,"skin":"ui/img_collision_point.png","name":"point4"}},{"type":"Image","props":{"y":332,"x":107,"skin":"ui/img_collision_point.png","name":"point5"}},{"type":"Image","props":{"y":475,"x":489,"skin":"ui/img_collision_point.png","name":"point6"}},{"type":"Image","props":{"y":398,"x":526,"skin":"ui/img_collision_point.png","name":"point7"}},{"type":"Image","props":{"y":324,"x":545,"skin":"ui/img_collision_point.png","name":"point8"}},{"type":"Image","props":{"y":242,"x":544,"skin":"ui/img_collision_point.png","name":"point9"}},{"type":"Image","props":{"y":594,"x":376,"skin":"ui/img_collision_point.png","name":"point3"}},{"type":"Image","props":{"y":20,"x":166,"skin":"ui/img_collision_point.png","name":"point0"}},{"type":"Image","props":{"y":540,"x":433,"skin":"ui/img_collision_point.png","name":"point12"}},{"type":"Image","props":{"y":171,"x":543,"skin":"ui/img_collision_point.png","name":"point13"}},{"type":"Image","props":{"y":104,"x":545,"skin":"ui/img_collision_point.png","name":"point14"}},{"type":"Image","props":{"y":35,"x":545,"skin":"ui/img_collision_point.png","name":"point2"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.road.RoadTurn45ItemUI.uiView);

        }

    }
}

module ui.road {
    export class RoadTurn90ItemUI extends View {
		public imgRoad:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":720},"child":[{"type":"Image","props":{"var":"imgRoad","skin":"road1/turn90_0.png"}},{"type":"Image","props":{"y":517,"x":537,"width":10,"skin":"ui/img_collision_point.png","name":"point12","height":10}},{"type":"Image","props":{"y":547,"x":690,"width":10,"skin":"ui/img_collision_point.png","name":"point1","height":10}},{"type":"Image","props":{"y":537,"x":610,"width":10,"skin":"ui/img_collision_point.png","name":"point13","height":10}},{"type":"Image","props":{"y":485,"x":467,"width":10,"skin":"ui/img_collision_point.png","name":"point17","height":10}},{"type":"Image","props":{"y":445,"x":399,"width":10,"skin":"ui/img_collision_point.png","name":"point4","height":10}},{"type":"Image","props":{"y":396,"x":338,"width":10,"skin":"ui/img_collision_point.png","name":"point5","height":10}},{"type":"Image","props":{"y":354,"x":297,"width":10,"skin":"ui/img_collision_point.png","name":"point6","height":10}},{"type":"Image","props":{"y":296,"x":254,"width":10,"skin":"ui/img_collision_point.png","name":"point7","height":10}},{"type":"Image","props":{"y":243,"x":224,"width":10,"skin":"ui/img_collision_point.png","name":"point8","height":10}},{"type":"Image","props":{"y":189,"x":200,"width":10,"skin":"ui/img_collision_point.png","name":"point9","height":10}},{"type":"Image","props":{"y":121,"x":178,"width":10,"skin":"ui/img_collision_point.png","name":"point10","height":10}},{"type":"Image","props":{"y":68,"x":168,"width":10,"skin":"ui/img_collision_point.png","name":"point11","height":10}},{"type":"Image","props":{"y":6,"x":164,"width":10,"skin":"ui/img_collision_point.png","name":"point0","height":10}},{"type":"Image","props":{"y":3,"x":547,"width":10,"skin":"ui/img_collision_point.png","name":"point2","height":10}},{"type":"Image","props":{"y":50,"x":554,"width":10,"skin":"ui/img_collision_point.png","name":"point14","height":10}},{"type":"Image","props":{"y":109,"x":590,"width":10,"skin":"ui/img_collision_point.png","name":"point15","height":10}},{"type":"Image","props":{"y":148,"x":642,"width":10,"skin":"ui/img_collision_point.png","name":"point16","height":10}},{"type":"Image","props":{"y":163,"x":705,"width":10,"skin":"ui/img_collision_point.png","name":"point3","height":10}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.road.RoadTurn90ItemUI.uiView);

        }

    }
}
