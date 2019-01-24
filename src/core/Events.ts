/**
 * 事件类
 */
class Events extends egret.Event {
	/**
	 * 加载完毕
	 */
	public static LOAD_COMPLETE:string = "loadComplte";
	
	/**
	 * 显示页面
	 */
	public static SHOW_PAGE:string = "showPage";
	
	private _resName: string = "";
	/**
	 * @param type 事件类型
	 * @param resName 资源名字
	 */
	public constructor(type:string, resName:string="", bubbles:boolean=false, cancelable:boolean=false) {
        super(type,bubbles,cancelable);
		this._resName = resName;
    }
	public get resName():string{
        return this._resName;
    }
}