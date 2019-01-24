/**
 *
 * @author
 *流星
 */
class Meteor extends egret.Sprite {
    private static cacheDict: Object = {};
    /**生产*/
    public static produce(_textureName: string): Meteor {
        var textureName = _textureName;
        if (Meteor.cacheDict[textureName] == null)
            Meteor.cacheDict[textureName] = [];
        var dict: Meteor[] = Meteor.cacheDict[textureName];
        var temp: Meteor;
        if (dict.length > 0) {
            temp = dict.pop();
        } else {
            temp = new Meteor(textureName);
        }
        return temp;
    }
    /**回收*/
    public static reclaim(target: Meteor): void {
        if (Meteor.cacheDict[target.textureName] == null)
            Meteor.cacheDict[target.textureName] = [];
        var dict: Meteor[] = Meteor.cacheDict[target.textureName];
        if (dict.indexOf(target) == -1)
            dict.push(target);
        Tool.remove(target);
    }

    public textureName: string;
    public constructor(_textureName) {
        super();
        this.textureName = _textureName;
        var temp: egret.Bitmap = Tool.createBitmapByName(this.textureName);
        Tool.anchorXY(temp);
        temp.x = temp.width;
        temp.y = temp.height;
        this.addChild(temp);
        this.loop(temp);
    }
    private loop(_target: egret.Bitmap): void {
        var tw: egret.Tween;
        var tx;
        var ty;
        tx = Math.random() * 600 - 300;
        if (tx < -100) {
            ty = Math.random() * 700;
        } else {
            ty = - _target.height;
        }
        _target.x = tx;
        _target.y = ty;
        _target.scaleX = _target.scaleY = (0.5 + Math.random() * 0.5);
        _target.alpha = 1 - (1 - _target.scaleX) / 0.5 * 0.5;
        tw = egret.Tween.get(_target);
        tw.wait(Math.random() * 1500 + 500).to({ x: tx + 1000, y: ty + Math.tan(Math.PI / 180 * 40) * 1000 }, 4000 / _target.scaleX).call(this.loop, this, [_target]);
    }
}