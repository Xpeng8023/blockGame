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
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        var _this = _super.call(this) || this;
        _this.createGameScene();
        return _this;
    }
    Home.prototype.createGameScene = function () {
        var bg = Tool.createBitmapByName("bg_jpg");
        this.addChild(bg);
        bg.width = Main.stageW;
        bg.height = Main.stageH;
        var mainBox = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);
        var tempBtn;
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
    };
    Home.prototype.addEvent = function (btn) {
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        btn.touchEnabled = true;
        this.btn = btn;
    };
    Home.prototype.onBegin = function (e) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.btn = e.currentTarget;
        egret.Tween.get(this.btn).to({ scaleX: 0.9, scaleY: 0.9 }, 100);
    };
    Home.prototype.onEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        egret.Tween.get(this.btn).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    Home.prototype.onTap = function (e) {
        Main.gameId = e.currentTarget["id"];
        EM.dispatch("main").dispatchEventWith("showGame");
    };
    Home.currentScore = 0;
    return Home;
}(egret.DisplayObjectContainer));
__reflect(Home.prototype, "Home");
//# sourceMappingURL=Home.js.map