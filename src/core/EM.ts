/**
 * 事件管理类
 * @function get instance 获取实例对象
 * @function addEvent 添加事件
 * @function removeEvent 移除事件
 */
class EM extends egret.EventDispatcher {
	/**
	 * 派发器
	 */
	private static dispatchDict: Object = {};
	private static _dispatch: egret.EventDispatcher;
	/**
	 * 获取事件派发器
	 * @param key 键值
	 * key=null时，返回EM私有事件派发器
	 */
	public static dispatch(key=null): egret.EventDispatcher{
		if(key!=null){
			if(!EM.dispatchDict[key])
				EM.dispatchDict[key] = new egret.EventDispatcher();
			return EM.dispatchDict[key];
		}else{
			if (EM._dispatch == null)
				EM._dispatch = new egret.EventDispatcher();
			return EM._dispatch;
		}
	}
	/**
	 * @key 根据事件的键名 移除对应的 事件触发器
	 */
	public static removeDispatch(key):void {
		if (EM.dispatchDict==null)
			return;
		if (EM.dispatchDict[key]==null)
			EM.removeEvent(EM.dispatchDict[key]);
		delete EM.dispatchDict[key];
	}
	
	private static eventDict:Object = {};
	/**
	 * @param target 侦听对象
	 * @param type 事件类型
	 * @param listener 侦听函数
	 * @param thisObject 作用域
	 */
	public static addEvent(dispatch:any,type:string,listener:Function,thisObject:any):void{
		if(!EM.eventDict[dispatch.hashCode])
			EM.eventDict[dispatch.hashCode] = {};
		if(EM.eventDict[dispatch.hashCode][type])
			dispatch.removeEventListener(type,EM.eventDict[dispatch.hashCode][type]["listener"],EM.eventDict[dispatch.hashCode][type]["thisObject"]);
		EM.eventDict[dispatch.hashCode][type] = {"dispatch":dispatch,"type":type,"listener":listener,"thisObject":thisObject};
		dispatch.addEventListener(type, listener, thisObject);
	}
	
	/**
	 * @param dispatch 侦听对象
	 * @param type 事件类型
	 */
	public static removeEvent(dispatch:any,type:string=null):void{
		if(!EM.eventDict[dispatch.hashCode])
			return;
		var obj:Object;
		if(type==null){
			for(var _type in EM.eventDict[dispatch.hashCode]){
				obj = EM.eventDict[dispatch.hashCode][_type];
				dispatch.removeEventListener(obj["type"],obj["listener"],obj["thisObject"]);
			}
			delete EM.eventDict[dispatch.hashCode];//删除target键值
		}else{
			obj = EM.eventDict[dispatch.hashCode][type];
			dispatch.removeEventListener(obj["type"],obj["listener"],obj["thisObject"]);
			delete EM.eventDict[dispatch.hashCode][type];//删除type键值
		}
	}
	
	public constructor() {
		super();
	}
}

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