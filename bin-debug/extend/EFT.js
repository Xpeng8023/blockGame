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
 * 效果类
 * @author
 */
var EFT = (function (_super) {
    __extends(EFT, _super);
    function EFT() {
        return _super.call(this) || this;
    }
    /**
     * 淡入
     * @param target 对象
     * @param waitTime 等待时间
     * @param distance 位置差值[x,y]
     * @param speed 动画时间
     */
    // var temp;
    // var loc = [[124, 107], [121, 141], [121, 215], [121, 251], [120, 287]];
    // var tempArr = []
    // for (var i: number = 0; i < loc.length; i++) {
    //     temp = Tool.createBitmapByName("t1_" + (i + 1) + "_png");
    //     this.addChild(temp);
    //     temp.x = loc[i][0];
    //     temp.y = loc[i][1];
    //     EFT.fadeIn(temp, i * 100 + 500, [500 * Math.pow(-1, i), 0])
    // }
    EFT.fadeIn = function (target, waitTime, distance, speed) {
        if (waitTime === void 0) { waitTime = 0; }
        if (distance === void 0) { distance = [0, 300]; }
        if (speed === void 0) { speed = 1200; }
        target.x += distance[0];
        target.y += distance[1];
        target.alpha = 0;
        egret.Tween.get(target).wait(waitTime).to({ x: target.x - distance[0], y: target.y - distance[1], alpha: 1 }, speed, egret.Ease.quartOut);
    };
    /**
     * 打字
     * @param target 对象
     * @param locArr 中心点左上角，每个字的当前宽度
     * @param delayTime 打字间隔
     */
    //单行例子
    // var temp = Tool.createBitmapByName("t1_1_png");
    // this.addChild(temp);
    // temp.x = 124;
    // temp.y = 107;
    // var locArr = [[20, 0], [48, 0], [75, 0], [102, 0], [130, 0], [156, 0], [184, 0], [208, 0], [237, 0], [263, 0], [290, 0], [317, 0], [344, 0], [371, 0], [398, 0], [422, 0]]
    // EFT.typewrite(temp, locArr);
    //----------------------------------------------------------------------------------
    //多行例子
    // var loc = [[124, 107], [121, 141]];
    // var allArr = [];
    // allArr.push([[20, 0], [48, 0], [75, 0], [102, 0], [130, 0], [156, 0], [184, 0], [208, 0], [237, 0], [263, 0], [290, 0], [317, 0], [344, 0], [371, 0], [398, 0], [422, 0]]);
    // allArr.push([[12, 0], [40, 0], [67, 0], [93, 0], [121, 0], [142, 0], [170, 0], [193, 0], [217, 0], [241, 0], [265, 0], [274, 0]]);
    // var tempArr = [];
    // 例子1
    // var i = 0;
    // function typeNext() {
    //     var temp = Tool.createBitmapByName("t1_" + (i + 1) + "_png");
    //     this.addChild(temp);
    //     temp.x = loc[i][0];
    //     temp.y = loc[i][1];
    //     EFT.typewrite(temp, allArr[i]);
    //     temp.addEventListener("complete", () => {
    //         i++;
    //         if (i < loc.length) {
    //             typeNext.bind(this)();
    //         } else {
    //             console.log("打印结束");
    //         }
    //     }, this)
    // }
    // typeNext.bind(this)();
    // 例子2
    // var count = 0;
    // var j = 0;
    // for (var i: number = 0; i < loc.length; i++) {
    //     setTimeout(() => {
    //         var temp = Tool.createBitmapByName("t1_" + (count + 1) + "_png");
    //         this.addChild(temp);
    //         temp.x = loc[count][0];
    //         temp.y = loc[count][1];
    //         EFT.typewrite(temp, allArr[count], 40);
    //         if (count == loc.length - 1) {
    //             temp.addEventListener("complete", () => {
    //                 console.log("打印结束");
    //             }, this)
    //         }
    //         count++
    //     }, 40 * j)
    //     j += allArr[i].length;
    // }
    EFT.typewrite = function (target, locArr, delayTime) {
        if (delayTime === void 0) { delayTime = 40; }
        var msk = new egret.Sprite();
        msk.graphics.beginFill(0xff0000);
        msk.graphics.drawRect(0, 0, target.width, target.height);
        msk.graphics.endFill();
        target.parent.addChild(msk); //如果target没有被加入舞台，会报错
        target.mask = msk;
        msk.x = target.x;
        msk.y = target.y;
        msk.scaleX = 0;
        msk.scaleY = 0;
        var derecation = "";
        if (locArr[1][0] - locArr[0][0] != 0) {
            //如果X前后有变化
            derecation += "x";
        }
        else {
            //如果X前后没有变化，还原
            msk.scaleX = 1;
        }
        if (locArr[1][1] - locArr[0][1] != 0) {
            //如果Y前后有变化
            derecation += "y";
        }
        else {
            //如果Y前后没有变化，还原
            msk.scaleY = 1;
        }
        egret.Tween.get(msk).wait(delayTime).call(function () {
        }, this);
        var myTimer = new egret.Timer(delayTime, locArr.length);
        myTimer.addEventListener(egret.TimerEvent.TIMER, function (e) {
            var index = myTimer.currentCount - 1;
            if (derecation == "x") {
                msk.scaleX = locArr[index][0] / target.width;
            }
            else if (derecation == "y") {
                msk.scaleY = locArr[index][1] / target.height;
            }
            else {
                msk.scaleX = locArr[index][0] / target.width;
                msk.scaleY = locArr[index][1] / target.height;
            }
        }, this);
        myTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            target.mask = null;
            msk.parent.removeChild(msk);
            target.dispatchEventWith("complete");
        }, this);
        myTimer.start();
    };
    /**
     * 对象抖动效果
     * @  @param target 对象
     * @  @param time 抖动时间间隔，默认：70
     * @  @param value 抖动值，默认：1
     * @  @param range 抖动比例，默认：1
     * @  @param loop 是否循环，默认：true
     */
    EFT.shake = function (target, time, value, range, loop) {
        if (time === void 0) { time = 70; }
        if (value === void 0) { value = 1; }
        if (range === void 0) { range = 1; }
        if (loop === void 0) { loop = true; }
        var _time = time * range;
        var _value = value * range;
        target["__mcX"] = target.x;
        target["__mcY"] = target.y;
        var tw;
        if (loop == true) {
            tw = egret.Tween.get(target, { loop: true });
        }
        else {
            tw = egret.Tween.get(target);
        }
        tw.to({ x: target["__mcX"] + _value, y: target["__mcY"], alpha: 1 }, _time)
            .to({ x: target["__mcX"] - _value, y: target["__mcY"] - _value, alpha: 1 }, _time)
            .to({ x: target["__mcX"], y: target["__mcY"] - _value, alpha: 1 }, _time)
            .to({ x: target["__mcX"], y: target["__mcY"] + _value, alpha: 1 }, _time)
            .to({ x: target["__mcX"] - _value, y: target["__mcY"], alpha: 1 }, _time);
    };
    /**
     * @  {Array} _bitmapArr 位图集
     * @  {string} wh 检测宽高
     * 格式化位图，转化为"点"数据
     */
    // var temp = Tool.createBitmapByName("egret_icon_png");
    // var dataArr = Tool.FormatData([temp], 2);
    // var tempStr = "[";
    // for (var i = 0; i < dataArr.length; i++) {
    //     tempStr += "[";
    //     for (var j = 0; j < dataArr[i].length; j++) {
    //         tempStr += "[" + dataArr[i][j][0] + "," + dataArr[i][j][1] + "],";
    //     }
    //     tempStr = tempStr.substr(0, tempStr.length - 1);
    //     tempStr += "],";
    // }
    // tempStr = tempStr.substr(0, tempStr.length - 1);
    // tempStr += "]";
    // console.log(tempStr);
    // var tempPoint;
    // for (var i = 0; i < dataArr.length; i++) {
    //     for (var j = 0; j < dataArr[i].length; j++) {
    //         tempPoint = Tool.createBitmapByName("point_png");
    //         this.addChild(tempPoint);
    //         Tool.anchorXY(tempPoint);
    //         tempPoint.scaleX = tempPoint.scaleY = Tool.getRandom(0.1, 0.5);
    //         tempPoint.x = dataArr[i][j][0] + 124 + Tool.getRandom(-300, 800);
    //         tempPoint.y = dataArr[i][j][1] + 107 + Tool.getRandom(-300, 800);
    //         tempPoint.alpha = 0;
    //         egret.Tween.get(tempPoint).wait(Tool.getRandom(0, 3000) + 1000).to({ x: dataArr[i][j][0] + 124, y: dataArr[i][j][1] + 107, alpha: 1 }, 2000, egret.Ease.quartOut)
    //     }
    // }
    EFT.FormatData = function (_bitmapArr, wh) {
        if (wh === void 0) { wh = 1; }
        var bitmap;
        var tempArr = []; //临时集合：单个文字转换点的位置集合
        var dataArr = []; //需要返回的数据集合
        for (var i = 0; i < _bitmapArr.length; i++) {
            tempArr = [];
            bitmap = _bitmapArr[i];
            for (var j = 0; j < bitmap.width; j += wh) {
                for (var k = 0; k < bitmap.height; k += wh) {
                    if (bitmap.texture.getPixels(j, k, wh, wh)[3] > 255 / 2) {
                        tempArr.push([j, k]);
                    }
                }
            }
            dataArr.push(tempArr);
        }
        return dataArr;
    };
    return EFT;
}(egret.EventDispatcher));
__reflect(EFT.prototype, "EFT");
//# sourceMappingURL=EFT.js.map