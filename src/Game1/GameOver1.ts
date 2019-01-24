//拖放消除
class GameOver1 extends egret.DisplayObjectContainer {
    public static _instance: GameOver1;
	/*
	 * 获取对象实例
	 */
    public static get instance(): GameOver1 {
        if (GameOver1._instance == null)
            GameOver1._instance = new GameOver1();
        return GameOver1._instance;
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
        bg.alpha = 0.7;

        let mainBox: egret.Sprite = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);

        let txt = Tool.createBitmapByName("gameover_txt_png");
        mainBox.addChild(txt);
        Tool.anchorXY(txt);
        txt.x = 320;
        txt.y = 440;

        var scoreBox: egret.Sprite = new egret.Sprite();
        this.mainBox.addChild(scoreBox);

        let icon = Tool.createBitmapByName("icon_png");
        scoreBox.addChild(icon);

        let font: egret.BitmapFont = RES.getRes("score_num_fnt");;
        let score_txt: egret.BitmapText = new egret.BitmapText();
        score_txt.font = font;
        scoreBox.addChild(score_txt);
        score_txt.x = 50;
        score_txt.y = 7;
        score_txt.text = String(Game1.currentScore);
        this.score_txt = score_txt;

        scoreBox.x = Math.round((640 - scoreBox.width) / 2);
        scoreBox.y = 550;

        let btn = Tool.createBitmapByName("btn_replay_png");
        mainBox.addChild(btn);
        Tool.anchorXY(btn);
        btn.x = 320;
        btn.y = 660;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd, this)
    }
    private score_txt;
    public updata(){
        this.score_txt.text = String(Game1.currentScore);
    }
    private touchEnd(e: egret.TouchEvent) {
        this.dispatchEventWith("replay");
    }
}