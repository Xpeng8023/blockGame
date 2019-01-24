var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 * 位图池，控制创建和回收
 * DictBitmap.produce("common_block_1_png")
 */
var DictBitmap = (function () {
    function DictBitmap() {
    }
    /**生产*/
    DictBitmap.produce = function (_textureName) {
        var textureName = _textureName;
        if (DictBitmap.cacheDict[textureName] == null)
            DictBitmap.cacheDict[textureName] = [];
        var dict = DictBitmap.cacheDict[textureName];
        var tempBitmap;
        if (dict.length > 0) {
            tempBitmap = dict.pop();
        }
        else {
            tempBitmap = new egret.Bitmap(RES.getRes(textureName));
            tempBitmap["textureName"] = textureName;
        }
        return tempBitmap;
    };
    /**
     * @param target 回收对象
     * @param clear 是否重置动画(位置，大小，egret.Tween动画)
    */
    DictBitmap.reclaim = function (target, clear) {
        if (clear === void 0) { clear = true; }
        if (DictBitmap.cacheDict[target["textureName"]] == null)
            DictBitmap.cacheDict[target["textureName"]] = [];
        var dict = DictBitmap.cacheDict[target["textureName"]];
        if (dict.indexOf(target) == -1)
            dict.push(target);
        if (target.parent) {
            target.parent.removeChild(target);
        }
        if (target && clear) {
            egret.Tween.removeTweens(target);
            target.x = 0;
            target.y = 0;
            target.scaleX = target.scaleY = 1;
            target.rotation = 0;
            target.alpha = 1;
        }
    };
    DictBitmap.cacheDict = {};
    return DictBitmap;
}());
__reflect(DictBitmap.prototype, "DictBitmap");
//# sourceMappingURL=DictBitmap.js.map