var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 * sprite池，控制回收利用
 */
var SpriteDict = (function () {
    function SpriteDict() {
    }
    /**生产*/
    SpriteDict.produce = function (_id) {
        var id = _id;
        if (SpriteDict.cacheDict[id] == null)
            SpriteDict.cacheDict[id] = [];
        var dict = SpriteDict.cacheDict[id];
        var tempSprite;
        if (dict.length > 0) {
            tempSprite = dict.pop();
        }
        else {
            tempSprite = null;
        }
        return tempSprite;
    };
    /**
     * @param target 回收对象
     * @param clear 是否重置动画(位置，大小，egret.Tween动画)
    */
    SpriteDict.reclaim = function (target, clear) {
        if (clear === void 0) { clear = true; }
        if (SpriteDict.cacheDict[target["id"]] == null)
            SpriteDict.cacheDict[target["id"]] = [];
        var dict = SpriteDict.cacheDict[target["id"]];
        if (dict.indexOf(target) == -1)
            dict.push(target);
        if (target.parent) {
            target.parent.removeChild(target);
        }
        if (target && clear) {
            target.x = 0;
            target.y = 0;
            target.scaleX = target.scaleY = 1;
            target.rotation = 0;
            target.alpha = 1;
            egret.Tween.removeTweens(target);
        }
    };
    SpriteDict.cacheDict = {};
    return SpriteDict;
}());
__reflect(SpriteDict.prototype, "SpriteDict");
//# sourceMappingURL=DictSprite.js.map