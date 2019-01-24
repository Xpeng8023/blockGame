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
 *
 * @author
 *
 */
var PostExp = (function (_super) {
    __extends(PostExp, _super);
    function PostExp(_url, _params) {
        var _this = _super.call(this) || this;
        _this._url = _url; //提交地址
        _this._params = _params; //提交数据
        return _this;
    }
    PostExp.prototype.send = function () {
        this.stop();
        this.sendPostRequest();
    };
    PostExp.prototype.stop = function () {
        if (this.request) {
            this.request.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            this.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
            this.request.removeEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
            this.request = null;
        }
    };
    PostExp.prototype.sendPostRequest = function () {
        this.request = new egret.HttpRequest();
        // this.request.withCredentials = true;跨域请求
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.open(this._url, egret.HttpMethod.POST);
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.request.send(this._params);
        this.request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        this.request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    PostExp.prototype.onPostComplete = function (event) {
        var request = event.currentTarget;
        this.response = request.response;
        // this.dispatchEventWith("complete");
        this.dispatchEventWith(egret.Event.COMPLETE);
    };
    PostExp.prototype.onPostIOError = function (event) {
        console.log("post error : " + event);
        // this.dispatchEventWith("ioError");
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
    };
    PostExp.prototype.onGetProgress = function (event) {
        // console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return PostExp;
}(egret.DisplayObjectContainer));
__reflect(PostExp.prototype, "PostExp");
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
            this.myPost = new PostExp(submit_url,"name=" + this.txt1.text + "&tel=" + this.txt2.text + "&addr=" + this.txt3.text + "&level=" + Util.level);

            this.myPost.addEventListener("complete",this.onComplete,this);
            this.myPost.addEventListener("ioError",this.ioError,this);
            
            this.myPost.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
            this.myPost.addEventListener(egret.IOErrorEvent.IO_ERROR,this.ioError,this);
            this.myPost.send();
        } else {
            alert("请正确输入手机号码");
        }
    }
    private myPost:PostExp;
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
//# sourceMappingURL=PostExp.js.map