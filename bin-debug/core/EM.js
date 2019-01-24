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
 * 事件管理类
 * @function get instance 获取实例对象
 * @function addEvent 添加事件
 * @function removeEvent 移除事件
 */
var EM = (function (_super) {
    __extends(EM, _super);
    function EM() {
        return _super.call(this) || this;
    }
    /**
     * 获取事件派发器
     * @param key 键值
     * key=null时，返回EM私有事件派发器
     */
    EM.dispatch = function (key) {
        if (key === void 0) { key = null; }
        if (key != null) {
            if (!EM.dispatchDict[key])
                EM.dispatchDict[key] = new egret.EventDispatcher();
            return EM.dispatchDict[key];
        }
        else {
            if (EM._dispatch == null)
                EM._dispatch = new egret.EventDispatcher();
            return EM._dispatch;
        }
    };
    /**
     * @key 根据事件的键名 移除对应的 事件触发器
     */
    EM.removeDispatch = function (key) {
        if (EM.dispatchDict == null)
            return;
        if (EM.dispatchDict[key] == null)
            EM.removeEvent(EM.dispatchDict[key]);
        delete EM.dispatchDict[key];
    };
    /**
     * @param target 侦听对象
     * @param type 事件类型
     * @param listener 侦听函数
     * @param thisObject 作用域
     */
    EM.addEvent = function (dispatch, type, listener, thisObject) {
        if (!EM.eventDict[dispatch.hashCode])
            EM.eventDict[dispatch.hashCode] = {};
        if (EM.eventDict[dispatch.hashCode][type])
            dispatch.removeEventListener(type, EM.eventDict[dispatch.hashCode][type]["listener"], EM.eventDict[dispatch.hashCode][type]["thisObject"]);
        EM.eventDict[dispatch.hashCode][type] = { "dispatch": dispatch, "type": type, "listener": listener, "thisObject": thisObject };
        dispatch.addEventListener(type, listener, thisObject);
    };
    /**
     * @param dispatch 侦听对象
     * @param type 事件类型
     */
    EM.removeEvent = function (dispatch, type) {
        if (type === void 0) { type = null; }
        if (!EM.eventDict[dispatch.hashCode])
            return;
        var obj;
        if (type == null) {
            for (var _type in EM.eventDict[dispatch.hashCode]) {
                obj = EM.eventDict[dispatch.hashCode][_type];
                dispatch.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
            }
            delete EM.eventDict[dispatch.hashCode]; //删除target键值
        }
        else {
            obj = EM.eventDict[dispatch.hashCode][type];
            dispatch.removeEventListener(obj["type"], obj["listener"], obj["thisObject"]);
            delete EM.eventDict[dispatch.hashCode][type]; //删除type键值
        }
    };
    /**
     * 派发器
     */
    EM.dispatchDict = {};
    EM.eventDict = {};
    return EM;
}(egret.EventDispatcher));
__reflect(EM.prototype, "EM");
/**
 * private demo():void{
* 		EM.dispatch().addEventListener("dispatch",this.onDispatch,this);
        EM.dispatch("main").addEventListener("dispatch",this.onDispatch,this);//加入键 main
        EM.removeEvent(EM.dispatch("main"))//删除键为 main 的所以事件
        
        EM.addEvent(this.stage,egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        EM.addEvent(this.stage,egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
    }
    private onTap(e:egret.TouchEvent):void{
        console.log("onTap");
        EM.dispatch("main").dispatchEventWith("dispatch");
        EM.removeEvent(e.target,egret.TouchEvent.TOUCH_TAP);
    }
    private onTouchBegin(e:egret.TouchEvent):void{
        console.log("onTouchBegin");
    }
    private onDispatch(e:egret.Event):void{
        console.log("onDispatch");
        EM.removeDispatch("main");
    }
 */ 
//# sourceMappingURL=EM.js.map