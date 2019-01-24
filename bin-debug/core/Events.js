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
/**
 * 事件类
 */
var Events = (function (_super) {
    __extends(Events, _super);
    /**
     * @param type 事件类型
     * @param resName 资源名字
     */
    function Events(type, resName, bubbles, cancelable) {
        if (resName === void 0) { resName = ""; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._resName = "";
        _this._resName = resName;
        return _this;
    }
    Object.defineProperty(Events.prototype, "resName", {
        get: function () {
            return this._resName;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载完毕
     */
    Events.LOAD_COMPLETE = "loadComplte";
    /**
     * 显示页面
     */
    Events.SHOW_PAGE = "showPage";
    return Events;
}(egret.Event));
__reflect(Events.prototype, "Events");
//# sourceMappingURL=Events.js.map