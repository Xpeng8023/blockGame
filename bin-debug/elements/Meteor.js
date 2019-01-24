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
 *
 * @author
 *流星
 */
var Meteor = (function (_super) {
    __extends(Meteor, _super);
    function Meteor(_textureName) {
        var _this = _super.call(this) || this;
        _this.textureName = _textureName;
        var temp = Tool.createBitmapByName(_this.textureName);
        Tool.anchorXY(temp);
        temp.x = temp.width;
        temp.y = temp.height;
        _this.addChild(temp);
        _this.loop(temp);
        return _this;
    }
    /**生产*/
    Meteor.produce = function (_textureName) {
        var textureName = _textureName;
        if (Meteor.cacheDict[textureName] == null)
            Meteor.cacheDict[textureName] = [];
        var dict = Meteor.cacheDict[textureName];
        var temp;
        if (dict.length > 0) {
            temp = dict.pop();
        }
        else {
            temp = new Meteor(textureName);
        }
        return temp;
    };
    /**回收*/
    Meteor.reclaim = function (target) {
        if (Meteor.cacheDict[target.textureName] == null)
            Meteor.cacheDict[target.textureName] = [];
        var dict = Meteor.cacheDict[target.textureName];
        if (dict.indexOf(target) == -1)
            dict.push(target);
        Tool.remove(target);
    };
    Meteor.prototype.loop = function (_target) {
        var tw;
        var tx;
        var ty;
        tx = Math.random() * 600 - 300;
        if (tx < -100) {
            ty = Math.random() * 700;
        }
        else {
            ty = -_target.height;
        }
        _target.x = tx;
        _target.y = ty;
        _target.scaleX = _target.scaleY = (0.5 + Math.random() * 0.5);
        _target.alpha = 1 - (1 - _target.scaleX) / 0.5 * 0.5;
        tw = egret.Tween.get(_target);
        tw.wait(Math.random() * 1500 + 500).to({ x: tx + 1000, y: ty + Math.tan(Math.PI / 180 * 40) * 1000 }, 4000 / _target.scaleX).call(this.loop, this, [_target]);
    };
    Meteor.cacheDict = {};
    return Meteor;
}(egret.Sprite));
__reflect(Meteor.prototype, "Meteor");
//# sourceMappingURL=Meteor.js.map