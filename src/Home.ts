class Home extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.createGameScene();
    }
    public static currentScore = 0;
    private mainBox: egret.Sprite;
    private createGameScene() {
        let bg = Tool.createBitmapByName("bg_jpg");
        this.addChild(bg);
        bg.width = Main.stageW;
        bg.height = Main.stageH;

        let mainBox: egret.Sprite = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);

        var tempBtn: egret.Bitmap;
        var loc = [405, 550, 695];
        for (var i = 0; i < 16; i++) {
            tempBtn = Tool.createBitmapByName("home_btn" + (i + 1) + "_png");
            this.mainBox.addChild(tempBtn);
            Tool.anchorXY(tempBtn);
            tempBtn.x = 320;
            tempBtn.y = loc[i];
            tempBtn['id'] = i + 1;
            this.addEvent(tempBtn);
        }
    }

    private btn: egret.Bitmap;
    private addEvent(btn): void {
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        btn.touchEnabled = true;
        this.btn = btn;
    }
    private onBegin(e: egret.TouchEvent): void {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.btn = e.currentTarget;
        egret.Tween.get(this.btn).to({ scaleX: 0.9, scaleY: 0.9 }, 100);
    }
    private onEnd(e: egret.TouchEvent): void {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        egret.Tween.get(this.btn).to({ scaleX: 1, scaleY: 1 }, 100);
    }
    private onTap(e: egret.TouchEvent): void {
        Main.gameId = e.currentTarget["id"];
        EM.dispatch("main").dispatchEventWith("showGame");
    }
}