class Main {
    constructor() {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        Laya.MiniAdpter['getUrlEncode'] = function (url: string, type: string) {
            if (url.indexOf(".fnt") != -1
                || url.indexOf(module.ResCarConfigData.URL) != -1
                || url.indexOf(module.ResSkillConfigData.URL) != -1
                || url.indexOf(module.ResRoadProbilityData.URL) != -1
                || url.indexOf(module.ResRoadConfigData.URL) != -1) {
                return "utf8";
            } else if (type == "arraybuffer") {
                return "";
            }
            return "ascii";
        };

        var showWidth: number = Math.floor(Laya.Browser.width / (Laya.Browser.height / 1334));
        Laya.init(750, 1334, laya.webgl.WebGL);

        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        Laya.stage.bgColor = "#cce4fc";
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//设置缩放模式
        Laya.stage.alignH = "center";//设置剧中对齐
        Laya.stage.alignV = "middle";
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;//设置横竖屏
        Laya.Stat.show();
        // Laya.DebugTool.init();
        manager.LayerManager.instace.setup(Laya.stage); //初始化舞台上的层级

        Laya.loader.load([{ url: module.ResRoadConfigData.URL, type: laya.net.Loader.JSON },
        { url: module.ResCarConfigData.URL, type: laya.net.Loader.JSON },
        { url: module.ResSkillConfigData.URL, type: laya.net.Loader.JSON },
        { url: module.ResRoadProbilityData.URL, type: laya.net.Loader.JSON }],
            Laya.Handler.create(this, this.onLoadResourceComplete));
    }

    private onLoadResourceComplete(): void {
        module.ResRoadConfigData.onLoadComplete();
        module.ResCarConfigData.onLoadComplete();
        module.ResSkillConfigData.onLoadComplete();
        module.ResRoadProbilityData.onLoadComplete();
        Laya.loader.load([
            { url: "res/atlas/ui.atlas", type: laya.net.Loader.ATLAS },
            { url: "res/atlas/car.atlas", type: laya.net.Loader.ATLAS },
            { url: "res/atlas/monster.atlas", type: laya.net.Loader.ATLAS },
            { url: "res/atlas/effect.atlas", type: laya.net.Loader.ATLAS }],
            laya.utils.Handler.create(this, this.onLoaded));
    }

    private onLoaded(): void {
        module.GameDataManager.instance.initialize();
        manager.EnterFrameManager.instance.setup();
        //实例UI界面
        manager.ModuleController.instance.changeModule(manager.ModuleController.MN_HallView, false, false);
    }
}
new Main();