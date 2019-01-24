/**
 *
 * @author 
 *
 */
class GetExp extends egret.DisplayObjectContainer {
    private _url: string;
    private _params;
    public response;
    private request: egret.HttpRequest;
    public constructor(_url: string, _params) {
        super();
        var arr = _url.split("?")
        this._url = arr[0];
        this._params = _params + (arr[1] ? "&" + arr[1] : "");
    }
    public reSend() {
        this.stop();
        this.send();
    }
    public stop() {
        if (this.request) {
            this.request.removeEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            this.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            this.request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
            this.request = null;
        }
    }
    public send(): void {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.withCredentials = true;
        request.open(this._url, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    }
    private onGetComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        this.response = request.response;
        this.dispatchEventWith("complete");
    }
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("get error : " + event);
        this.dispatchEventWith("io_error");
    }
    private onGetProgress(event: egret.ProgressEvent): void {
        // console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }
}


/*
example:
    private msg: Msg;
    private submit(): void {
        if(this.txt1.text == "") {
            alert("请填写姓名！");
        } else if(this.txt2.text == "") {
            alert("请填写手机号码！");
        }else if(this.txt3.text == "") {
            alert("请填写地址！");
        }  else if(checkTel(this.txt2.text)) {
            this.msg = new Msg("数据提交中...");
            this.addChild(this.msg);
            egret.Tween.removeTweens(this.msg);
            this.msg.alpha = 0;
            var tw = egret.Tween.get(this.msg);
            tw.to({ alpha: 1 },500);
            
            this.btn_submit.touchEnabled = false;
            this.touchChildren = false;
            //console.log("开始提交表单");
            this.myGet = new GetExp(submit_url,"name=" + this.txt1.text + "&tel=" + this.txt2.text + "&addr=" + this.txt3.text + "&level=" + Util.level);
            this.myGet.addEventListener("complete",this.onComplete,this);
            this.myGet.addEventListener("io_error",this.ioError,this);
            this.myGet.send();
        } else {
            alert("请正确输入手机号码");
        }
    }
    private myGet:GetExp;
    private onComplete(event: egret.Event): void {
        var myJson = JSON.parse(event.currentTarget.response);
        if(myJson["result"]["status"] == 1) {
            this.msg.msg_txt.text = "提交成功！";
            egret.Tween.removeTweens(this.msg);
            this.removeMc(this.msg);
            this.dispatchEventWith("showShare");
            Util.hideQC();
        } else {
            this.btn_submit.touchEnabled = true;
            this.touchChildren = true;
            alert(myJson["result"]["msg"]);
            var tw = egret.Tween.get(this.msg);
            tw.to({ alpha: 0 },500).call(this.removeMc,this,[this.msg,this]);
        }
    }
    private ioError(event: egret.Event): void {
        console.log("post error : " + event);
        alert("数据提交出错！");
        this.btn_submit.touchEnabled = true;
        var tw = egret.Tween.get(this.msg);
        tw.to({ alpha: 0 },500).call(this.removeMc,this,[this.msg,this]);
    }

*/