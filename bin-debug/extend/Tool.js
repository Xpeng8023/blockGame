var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Tool = (function () {
    function Tool() {
    }
    /**
     * 变速接口
     */
    Tool.gear = function (num, rate) {
        if (rate === void 0) { rate = 1; }
        return num * rate;
    };
    /**
     * 检测两个对象是否碰撞
     * @param obj1 对象1
     * @param obj2 对象2
     * 检测两个对象是否有交集，前提 是在同一个容器下对比
     *
     */
    Tool.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    /**
     * 检测两个位置是否有交集
     * @param x1 对象1.x
     * @param y1 对象1.y
     * @param w1 对象1.width
     * @param h1 对象1.height
     * @param x2 对象2.x
     * @param y2 对象2.y
     * @param w2 对象2.width
     * @param h2 对象2.height
     * 没有旋转的情况下
     */
    Tool.hitTest2 = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
        }
        else if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
        }
        else if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
        }
        else if (y1 <= y2 && y1 + h1 <= y2) {
            return false;
        }
        return true;
    };
    /**
     * 移除对象
     */
    Tool.remove = function (_target) {
        if (_target) {
            if (_target.parent) {
                _target.parent.removeChild(_target);
            }
        }
        else {
            console.log("Tool.remove:对象为空");
        }
    };
    /**
     * 设置对象中心点
     */
    Tool.anchorXY = function (_target, _anchorX, _anchorY) {
        var anchorX = _anchorX || _anchorX == 0 ? _anchorX : Math.round(_target.width / 2);
        var anchorY = _anchorY || _anchorY == 0 ? _anchorY : Math.round(_target.height / 2);
        _target.anchorOffsetX = anchorX;
        _target.anchorOffsetY = anchorY;
    };
    /**
     * 根据名字返回相应纹理对象
     * @param name 资源名字
     * @param pro 属性集合 {x : number,  y : number, anchor : boolean, scaleX : number, scaleY : number, scale : number}
     */
    // Tool.createBitmapByName("obj_png", { x: this.pointArrX[0][0], y: this.pointArrX[0][1], anchor: true })
    Tool.createBitmapByName = function (name, pro) {
        if (pro === void 0) { pro = {}; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (pro.x || pro.x == 0) {
            result.x = pro.x;
        }
        if (pro.y || pro.y == 0) {
            result.y = pro.y;
        }
        if (pro.anchor) {
            Tool.anchorXY(result);
        }
        if (pro.scaleX) {
            result.scaleX = pro.scaleX;
        }
        if (pro.scaleY) {
            result.scaleY = pro.scaleY;
        }
        if (pro.scale) {
            result.scaleX = result.scaleY = pro.scale;
        }
        return result;
    };
    /**
     * 创建矩形
     */
    Tool.createSprite = function (_color, _pop) {
        if (_pop === void 0) { _pop = [640, 1030]; }
        var sprite = new egret.Sprite();
        sprite.graphics.beginFill(_color);
        sprite.graphics.drawRect(0, 0, _pop[0], _pop[1]);
        sprite.graphics.endFill();
        return sprite;
    };
    /**
     * 获取最小值和最大值之间的随机数，包含起始值，不包含结束值
     * @param _minNum:最小值
     * @param _maxNum:最大值
     * @param _fixedNum:保留小数(floor)
     */
    Tool.getRandom = function (_minNum, _maxNum, _fixedNum) {
        if (_fixedNum === void 0) { _fixedNum = 2; }
        var num = Math.random() * (_maxNum - _minNum) + _minNum;
        num = Math.floor(num * Math.pow(10, _fixedNum)) / Math.pow(10, _fixedNum);
        return num;
    };
    /**
     * @获取随机字符串(0-9,a-z)
     * @param length 获取字符长度
     */
    Tool.RandomString = function (length) {
        var str = '';
        for (; str.length < length; str += Math.random().toString(36).substr(2))
            ;
        return str.substr(0, length);
    };
    Tool.getMcData = function (data, texture) {
        data = RES.getRes(data);
        texture = RES.getRes(texture);
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        return mcDataFactory;
    };
    /**
     * 对象居中
     * @param obj 对象
     * @param showW 显示宽
     * @param showH 显示高
     * @param x 起始X
     * @param y 起始Y
     */
    Tool.alignObj = function (obj, objW, objH, showW, showH, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        obj.x = Math.round((showW - objW) / 2) + x;
        obj.y = Math.round((showH - objH) / 2) + y;
    };
    /**
     * 对象居中
     * @param obj 对象
     * @param showW 显示宽
     * @param showH 显示高
     * @param isAlign 是否居中
     */
    Tool.scaleObj = function (obj, objW, objH, showW, showH, type, isAlign) {
        if (type === void 0) { type = "out"; }
        if (isAlign === void 0) { isAlign = true; }
        var per = 1;
        if (type == "out") {
            if (objW / objH > showW / showH) {
                per = showH / objH;
            }
            else {
                per = showW / objW;
            }
        }
        else {
            if (objW / objH > showW / showH) {
                per = objW / showW;
            }
            else {
                per = objH / showH;
            }
        }
        obj.scaleX = obj.scaleY = per;
        if (isAlign) {
            Tool.alignObj(obj, objW * per, objH * per, showW, showH);
        }
    };
    return Tool;
}());
__reflect(Tool.prototype, "Tool");
//# sourceMappingURL=Tool.js.map