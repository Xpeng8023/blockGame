var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//拖放消除
var GameOver1 = (function (_super) {
    __extends(GameOver1, _super);
    function GameOver1() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createGameScene, _this);
        return _this;
    }
    Object.defineProperty(GameOver1, "instance", {
        /*
         * 获取对象实例
         */
        get: function () {
            if (GameOver1._instance == null)
                GameOver1._instance = new GameOver1();
            return GameOver1._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameOver1.prototype.createGameScene = function () {
        var bg = Tool.createSprite(0x000000, [Main.stageW, Main.stageH]);
        this.addChild(bg);
        bg.touchEnabled = true;
        bg.alpha = 0.7;
        var mainBox = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);
        var txt = Tool.createBitmapByName("gameover_txt_png");
        mainBox.addChild(txt);
        Tool.anchorXY(txt);
        txt.x = 320;
        txt.y = 440;
        var scoreBox = new egret.Sprite();
        this.mainBox.addChild(scoreBox);
        var icon = Tool.createBitmapByName("icon_png");
        scoreBox.addChild(icon);
        var font = RES.getRes("score_num_fnt");
        ;
        var score_txt = new egret.BitmapText();
        score_txt.font = font;
        scoreBox.addChild(score_txt);
        score_txt.x = 50;
        score_txt.y = 7;
        score_txt.text = String(Game1.currentScore);
        this.score_txt = score_txt;
        scoreBox.x = Math.round((640 - scoreBox.width) / 2);
        scoreBox.y = 550;
        var btn = Tool.createBitmapByName("btn_replay_png");
        mainBox.addChild(btn);
        Tool.anchorXY(btn);
        btn.x = 320;
        btn.y = 660;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEnd, this);
    };
    GameOver1.prototype.updata = function () {
        this.score_txt.text = String(Game1.currentScore);
    };
    GameOver1.prototype.touchEnd = function (e) {
        this.dispatchEventWith("replay");
    };
    return GameOver1;
}(egret.DisplayObjectContainer));
__reflect(GameOver1.prototype, "GameOver1");
//# sourceMappingURL=GameOver1.js.map