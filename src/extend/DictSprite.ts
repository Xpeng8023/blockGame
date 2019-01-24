/**
 *
 * @author
 * sprite池，控制回收利用
 */
class SpriteDict {
    private static cacheDict: Object = {};
    /**生产*/
    public static produce(_id: string): egret.Sprite {
        var id = _id;
        if (SpriteDict.cacheDict[id] == null)
            SpriteDict.cacheDict[id] = [];
        var dict: Array<egret.Sprite> = SpriteDict.cacheDict[id];
        var tempSprite: egret.Sprite;
        if (dict.length > 0) {
            tempSprite = dict.pop();
        } else {
            tempSprite = null;
        }
        return tempSprite;
    }
    /**
     * @param target 回收对象
     * @param clear 是否重置动画(位置，大小，egret.Tween动画)
    */
    public static reclaim(target: egret.Sprite, clear: Boolean = true): void {
        if (SpriteDict.cacheDict[target["id"]] == null)
            SpriteDict.cacheDict[target["id"]] = [];
        var dict: egret.Sprite[] = SpriteDict.cacheDict[target["id"]];
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
    }
}