/**
 * 效果类
 */
class EFT extends egret.DisplayObjectContainer {
    /**
     * 消除效果
     * @param _block 小块对象
     */
    public static addClearEft(_block) {
        var tempStar: egret.Bitmap;
        for (var i = 0; i < 10; i++) {
            tempStar = DictBitmap.produce("star" + _block["colorId"] + "_" + Tool.getRandom(1, 3, 0) + "_png");
            _block.parent.addChild(tempStar);
            tempStar.blendMode = egret.BlendMode.ADD;
            Tool.anchorXY(tempStar);
            tempStar.x = _block.x + Tool.getRandom(-10, 10);
            tempStar.y = _block.y + Tool.getRandom(-10, 10);
            tempStar.scaleX = tempStar.scaleY = 0;
            var wt = Tool.getRandom(0, 200);
            var speedTime = 400 + Tool.getRandom(0, 1000);
            if (Math.random() < 0.7) {
                egret.Tween.get(tempStar).wait(wt)
                    .to({ x: tempStar.x + Tool.getRandom(-100, 100), y: tempStar.y + Tool.getRandom(-100, 100) }, speedTime, egret.Ease.quadOut)
            } else {
                egret.Tween.get(tempStar).wait(wt)
                    .to({ x: tempStar.x + Tool.getRandom(-300, 300), y: tempStar.y + Tool.getRandom(-300, 300) }, speedTime, egret.Ease.quadOut)
            }

            egret.Tween.get(tempStar)
                .wait(wt)
                .to({ scaleX: 1, scaleY: 1 }, speedTime * 0.2)
                .to({ scaleX: 0, scaleY: 0 }, speedTime * 0.7, egret.Ease.quadOut)
                .call((target: egret.Bitmap) => {
                    DictBitmap.reclaim(target);
                }, this, [tempStar]);
        }
    }

    /**
     * 摆放效果
     */
    public static addPushEft(_block) {
        var tempStar: egret.Bitmap;
        var lineNum = 6;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < lineNum; j++) {
                tempStar = DictBitmap.produce("star" + _block["colorId"] + "_" + Tool.getRandom(1, 3, 0) + "_png");
                _block.parent.addChild(tempStar);
                tempStar.blendMode = egret.BlendMode.ADD;
                Tool.anchorXY(tempStar);
                if (i == 0) {
                    //top
                    tempStar.x = _block.x - _block.anchorOffsetX + j * _block.width / lineNum;
                    tempStar.y = _block.y - _block.anchorOffsetY;
                } else if (i == 1) {
                    //left
                    tempStar.x = _block.x + _block.anchorOffsetX;
                    tempStar.y = _block.y - _block.anchorOffsetY + j * _block.height / lineNum;
                } else if (i == 2) {
                    //bottom
                    tempStar.x = _block.x - _block.anchorOffsetX + j * _block.height / lineNum;
                    tempStar.y = _block.y + _block.anchorOffsetY;
                } else if (i == 3) {
                    //right
                    tempStar.x = _block.x - _block.anchorOffsetX;
                    tempStar.y = _block.y - _block.anchorOffsetX + j * _block.height / lineNum;
                }
                tempStar.scaleX = tempStar.scaleY = Tool.getRandom(0.2, 0.5);
                egret.Tween.get(tempStar).to({ x: tempStar.x + Tool.getRandom(-20, 20), y: tempStar.y + Tool.getRandom(-20, 20), scaleX: 0, scaleY: 0 }, 300 + Tool.getRandom(0, 500), egret.Ease.quadOut)
                    .call((target: egret.Bitmap) => {
                        DictBitmap.reclaim(target);
                    }, this, [tempStar]);
            }
        }
    }
}