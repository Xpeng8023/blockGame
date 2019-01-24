class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        Main.stageW = this.stage.stageWidth;
        Main.stageH = this.stage.stageHeight;
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }
        
        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();

        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");

            // var version = 1.01;
            // RES.getVirtualUrl = function(url:string):string {
            //     return url+'?v='+version;
            // };

            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    public static stageW = 0;
    public static stageH = 0;
    public static gameId = 0;
    private class_arr = [Home, Game1, Game1, Game1];
    private currentGame;
    private game_arr = [];
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        EM.dispatch("main").addEventListener("showGame", this.showGame, this);
        EM.dispatch("main").addEventListener("showPause", this.showPause, this);
        EM.dispatch("main").addEventListener("hidePause", this.hidePause, this);
        EM.dispatch("main").addEventListener("replay", this.replay, this);

        this.showGame();
    }

    private showGame() {
        if (this.currentGame) {
            this.currentGame.touchChildren = false;
            egret.Tween.removeTweens(this.currentGame);
            egret.Tween.get(this.currentGame).to({ alpha: 0 }, 500).call(Tool.remove, this, [this.currentGame]);
        }
        if (!this.game_arr[Main.gameId]) {
            this.game_arr[Main.gameId] = new this.class_arr[Main.gameId]();
        }
        this.currentGame = this.game_arr[Main.gameId];
        this.addChild(this.currentGame);
        this.currentGame.touchChildren = true;
        egret.Tween.removeTweens(this.currentGame);
        this.currentGame.alpha = 0;
        egret.Tween.get(this.currentGame).to({ alpha: 1 }, 200, egret.Ease.quadOut);
    }

    private pause: Pause;
    private showPause() {
        this.pause = Pause.instance;
        this.stage.addChild(this.pause);
        this.pause.alpha = 0;
        this.pause.touchChildren = true;
        egret.Tween.removeTweens(this.pause);
        egret.Tween.get(this.pause).to({ alpha: 1 }, 300, egret.Ease.quadOut);
    }
    private hidePause() {
        if (this.pause) {
            this.pause.touchChildren = false;
            egret.Tween.removeTweens(this.pause);
            egret.Tween.get(this.pause).to({ alpha: 0 }, 300).call(Tool.remove, this, [this.pause]);
        }
    }

    private replay() {
        if (Main.gameId != 0) {
            this.currentGame.replay();
        }
    }
}