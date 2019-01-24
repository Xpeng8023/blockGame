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
var Pause = (function (_super) {
    __extends(Pause, _super);
    function Pause() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createGameScene, _this);
        return _this;
    }
    Object.defineProperty(Pause, "instance", {
        /*
         * 获取对象实例
         */
        get: function () {
            if (Pause._instance == null)
                Pause._instance = new Pause();
            return Pause._instance;
        },
        enumerable: true,
        configurable: true
    });
    Pause.prototype.createGameScene = function () {
        var bg = Tool.createSprite(0x000000, [Main.stageW, Main.stageH]);
        this.addChild(bg);
        bg.touchEnabled = true;
        bg.alpha = 0.85;
        var mainBox = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);
        var btn_play = Tool.createBitmapByName("btn_play_png");
        mainBox.addChild(btn_play);
        Tool.anchorXY(btn_play);
        btn_play.x = 320;
        btn_play.y = 428;
        btn_play['name'] = 'play';
        btn_play.touchEnabled = true;
        btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        var btn_home = Tool.createBitmapByName("btn_home_png");
        mainBox.addChild(btn_home);
        Tool.anchorXY(btn_home);
        btn_home.x = 224;
        btn_home.y = 568;
        btn_home['name'] = 'home';
        btn_home.touchEnabled = true;
        btn_home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        var btn_replay = Tool.createBitmapByName("btn_replay_png");
        mainBox.addChild(btn_replay);
        Tool.anchorXY(btn_replay);
        btn_replay.x = 404;
        btn_replay.y = 568;
        btn_replay['name'] = 'replay';
        btn_replay.touchEnabled = true;
        btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    Pause.prototype.onTap = function (e) {
        if (e.currentTarget["name"] == 'play') {
        }
        else if (e.currentTarget["name"] == 'home') {
            Main.gameId = 0;
            EM.dispatch("main").dispatchEventWith("showGame");
        }
        else if (e.currentTarget["name"] == 'replay') {
            EM.dispatch("main").dispatchEventWith("replay");
        }
        EM.dispatch("main").dispatchEventWith("hidePause");
    };
    return Pause;
}(egret.DisplayObjectContainer));
__reflect(Pause.prototype, "Pause");
//# sourceMappingURL=Pause.js.map