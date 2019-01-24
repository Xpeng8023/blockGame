/**
 *
 * @author
 * 位图池，控制创建和回收
 * DictBitmap.produce("common_block_1_png")
 */
class DictBitmap {
    private static cacheDict: Object = {};
    /**生产*/
    public static produce(_textureName: string): egret.Bitmap {
        var textureName = _textureName;
        if (DictBitmap.cacheDict[textureName] == null)
            DictBitmap.cacheDict[textureName] = [];
        var dict: Array<egret.Bitmap> = DictBitmap.cacheDict[textureName];
        var tempBitmap: egret.Bitmap;
        if (dict.length > 0) {
            tempBitmap = dict.pop();
        } else {
            tempBitmap = new egret.Bitmap(RES.getRes(textureName));
            tempBitmap["textureName"] = textureName;
        }
        return tempBitmap;
    }
    /**
     * @param target 回收对象
     * @param clear 是否重置动画(位置，大小，egret.Tween动画)
    */
    public static reclaim(target: egret.Bitmap, clear: Boolean = true): void {
        if (DictBitmap.cacheDict[target["textureName"]] == null)
            DictBitmap.cacheDict[target["textureName"]] = [];
        var dict: egret.Bitmap[] = DictBitmap.cacheDict[target["textureName"]];
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
    }
}