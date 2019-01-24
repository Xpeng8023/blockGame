//拖放消除
class Pause extends egret.DisplayObjectContainer {
    public static _instance: Pause;
	/*
	 * 获取对象实例
	 */
    public static get instance(): Pause {
        if (Pause._instance == null)
            Pause._instance = new Pause();
        return Pause._instance;
    }

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.createGameScene, this);
    }
    private mainBox: egret.Sprite;
    private createGameScene() {
        let bg = Tool.createSprite(0x000000, [Main.stageW, Main.stageH]);
        this.addChild(bg);
        bg.touchEnabled = true;
        bg.alpha = 0.85;

        let mainBox: egret.Sprite = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);

        let btn_play = Tool.createBitmapByName("btn_play_png");
        mainBox.addChild(btn_play);
        Tool.anchorXY(btn_play);
        btn_play.x = 320;
        btn_play.y = 428;
        btn_play['name'] = 'play';
        btn_play.touchEnabled = true;
        btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)

        let btn_home = Tool.createBitmapByName("btn_home_png");
        mainBox.addChild(btn_home);
        Tool.anchorXY(btn_home);
        btn_home.x = 224;
        btn_home.y = 568;
        btn_home['name'] = 'home';
        btn_home.touchEnabled = true;
        btn_home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)

        let btn_replay = Tool.createBitmapByName("btn_replay_png");
        mainBox.addChild(btn_replay);
        Tool.anchorXY(btn_replay);
        btn_replay.x = 404;
        btn_replay.y = 568;
        btn_replay['name'] = 'replay';
        btn_replay.touchEnabled = true;
        btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
    }
    private onTap(e: egret.TouchEvent) {
        if (e.currentTarget["name"] == 'play') {

        } else if (e.currentTarget["name"] == 'home') {
            Main.gameId = 0;
            EM.dispatch("main").dispatchEventWith("showGame");
        } else if (e.currentTarget["name"] == 'replay') {
            EM.dispatch("main").dispatchEventWith("replay");
        }
        EM.dispatch("main").dispatchEventWith("hidePause");
    }
}