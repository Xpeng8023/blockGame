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
var Game1 = (function (_super) {
    __extends(Game1, _super);
    function Game1() {
        var _this = _super.call(this) || this;
        _this.isGameOver = false; //是否游戏结束
        _this.cloNum = 10; //行数
        _this.rowNum = 10; //列数
        _this.blockStartX = 61; //起始X
        _this.blockStartY = 330; //起始Y
        _this.blockW = 50;
        _this.blockSpace = _this.blockW + 2; //小块间距
        /**
         * 各种组合情况 Array<any>
         */
        _this.blockGroupArr = [
            //------------------------
            //田字型
            [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ],
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ],
            [
                [1, 1],
                [1, 1]
            ],
            [
                [1],
            ],
            //------------------------
            //L型
            [
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 1]
            ],
            [
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 1]
            ],
            [
                [0, 0, 1],
                [0, 0, 1],
                [0, 0, 1],
                [1, 1, 1]
            ],
            [
                [1, 0, 0],
                [1, 0, 0],
                [1, 1, 1]
            ],
            [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            [
                [0, 1],
                [0, 1],
                [1, 1]
            ],
            [
                [1, 0],
                [1, 1]
            ],
            //------------------------
            //一字型
            [
                [1, 1, 1, 1]
            ],
            [
                [1, 1, 1]
            ],
            [
                [1, 1]
            ]
        ];
        _this.cacheDict = {};
        _this.createGameScene();
        return _this;
    }
    Object.defineProperty(Game1, "topScore", {
        get: function () {
            var topScore = localStorage.getItem("game1-topScore");
            if (!topScore) {
                topScore = '0';
                localStorage.setItem("game1-topScore", '0');
            }
            return topScore;
        },
        set: function (v) {
            localStorage.setItem("game1-topScore", v);
        },
        enumerable: true,
        configurable: true
    });
    Game1.prototype.createGameScene = function () {
        var _this = this;
        var bg = Tool.createBitmapByName("bg_jpg");
        this.addChild(bg);
        bg.width = Main.stageW;
        bg.height = Main.stageH;
        var btn_pause = Tool.createBitmapByName("btn_pause_png");
        this.addChild(btn_pause);
        Tool.anchorXY(btn_pause);
        btn_pause.x = 65;
        btn_pause.y = 65;
        btn_pause.touchEnabled = true;
        btn_pause.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            EM.dispatch("main").dispatchEventWith("showPause");
        }, this);
        for (var i = 0; i < 5; i++) {
            setTimeout(function () {
                var meteor = new Meteor("meteor_png");
                meteor.alpha = 0.5;
                _this.addChild(meteor);
            }, 800 * i);
        }
        var mainBox = new egret.Sprite();
        this.addChild(mainBox);
        this.mainBox = mainBox;
        mainBox.y = Math.round((Main.stageH - 1138) / 2);
        var icon = Tool.createBitmapByName("icon_png");
        mainBox.addChild(icon);
        Tool.anchorXY(icon);
        icon.x = 320;
        icon.y = 118;
        this.score_icon = icon;
        var font = RES.getRes("score_num_fnt");
        ;
        var score_txt = new egret.BitmapText();
        score_txt.font = font;
        mainBox.addChild(score_txt);
        score_txt.x = 320;
        score_txt.y = 105;
        score_txt.text = "0";
        this.score_txt = score_txt;
        this.score_icon.x = 320 - Math.round(this.score_txt.text.length * 32 / 2);
        this.score_txt.x = this.score_icon.x + 35;
        this.score_top_txt = new egret.TextField();
        mainBox.addChild(this.score_top_txt);
        this.score_top_txt.size = 24;
        this.score_top_txt.width = 640;
        this.score_top_txt.y = 170;
        this.score_top_txt.textAlign = "center";
        this.score_top_txt.text = "最高分数：" + Game1.topScore;
        var border = Tool.createBitmapByName("border_png");
        mainBox.addChild(border);
        Tool.anchorXY(border);
        border.x = 320;
        border.y = 590;
        //创建道具
        var reflush = Tool.createBitmapByName("btn_reflush_png");
        mainBox.addChild(reflush);
        Tool.anchorXY(reflush);
        reflush.x = 164;
        reflush.y = 260;
        reflush['name'] = 'reflush';
        this.addPropEvent(reflush);
        var add = Tool.createBitmapByName("btn_add_png");
        mainBox.addChild(add);
        Tool.anchorXY(add);
        add.x = 320;
        add.y = 260;
        add['name'] = 'add';
        this.addPropEvent(add);
        var hammer = Tool.createBitmapByName("btn_hammer_png");
        mainBox.addChild(hammer);
        Tool.anchorXY(hammer);
        hammer.x = 474;
        hammer.y = 260;
        hammer['name'] = 'hammer';
        this.addPropEvent(hammer);
        //-------------------------------------------------------------------------------
        //初始化总数组
        this.blockData = [];
        for (var i = 0; i < this.cloNum; i++) {
            this.blockData[i] = [];
            for (var j = 0; j < this.rowNum; j++) {
                this.blockData[i][j] = 0;
            }
        }
        this.blockArray = [];
        for (var i = 0; i < this.cloNum; i++) {
            this.blockArray[i] = [];
        }
        //创建预block组 3组
        this.createPreBlocks();
    };
    /**
     * 旋转二维数据(二维数组)
     * @param _arr 旋转数据
     * @param _index 值为 0、1、2、3,旋转角度等于  _index*90;默认随机
     */
    Game1.prototype.rotationBlockGroup = function (_arr, _index) {
        var numArr = [0, 1, 2, 3];
        if (_index != undefined) {
            var num = _index;
        }
        else {
            var num = numArr[Math.floor(Math.random() * 4)];
        }
        var tempArr;
        if (num > 0) {
            for (var k = 0; k < num; k++) {
                tempArr = [];
                //根据_arr列数，初始化tempArr行数
                for (var i = 0; i < _arr[0].length; i++) {
                    tempArr[i] = [];
                }
                //开始旋转赋值
                for (var i = 0; i < _arr.length; i++) {
                    for (var j = 0; j < _arr[i].length; j++) {
                        tempArr[j][_arr.length - i - 1] = _arr[i][j];
                    }
                }
                _arr = [].concat(tempArr);
            }
        }
        else {
            tempArr = _arr;
        }
        return tempArr;
    };
    /**
     * 随机获得一组block组的数据，并随机旋转
     */
    Game1.prototype.getBlockGroup = function () {
        var tempArr = this.blockGroupArr[Tool.getRandom(0, this.blockGroupArr.length, 0)];
        var resultArr = this.rotationBlockGroup(tempArr);
        return resultArr;
    };
    /**
     * 根据block组的数据》生成UI，默认循环3组
     */
    Game1.prototype.createPreBlocks = function () {
        this.preBlockArr = [];
        var spaceX = 175; //间距
        var startX = 85;
        var startY = 910;
        var tempBox; //单个组的盒子
        var tempBlock;
        var tempBlockGroupData; //组数据
        var tempBlockGroupArr; //组对象
        for (var i = 0; i < 3; i++) {
            tempBox = new egret.Sprite();
            this.mainBox.addChild(tempBox);
            this.preBlockArr.push(tempBox);
            tempBlockGroupData = this.getBlockGroup();
            tempBlockGroupArr = [];
            var colorId = Tool.getRandom(1, 8, 0);
            for (var ii = 0; ii < tempBlockGroupData.length; ii++) {
                tempBox["groupArr"] = [];
                tempBlockGroupArr[ii] = [];
                for (var jj = 0; jj < tempBlockGroupData[0].length; jj++) {
                    if (tempBlockGroupData[ii][jj] == 1) {
                        // tempBlock = Tool.createBitmapByName("common_block_" + colorId + "_png");
                        tempBlock = DictBitmap.produce("common_block_" + colorId + "_png");
                        tempBox.addChild(tempBlock);
                        tempBlock['colorId'] = colorId;
                        tempBlock.scaleX = tempBlock.scaleY = 1;
                        Tool.anchorXY(tempBlock);
                        tempBlock.x = this.blockSpace * jj + tempBlock.anchorOffsetX;
                        tempBlock.y = this.blockSpace * ii + tempBlock.anchorOffsetY;
                        tempBlockGroupArr[ii][jj] = tempBlock;
                    }
                }
            }
            tempBox["groupData"] = tempBlockGroupData;
            tempBox["groupArr"] = tempBlockGroupArr;
            Tool.anchorXY(tempBox);
            var degX = Math.round((this.blockSpace * 4 * 0.6 - tempBox.width) / 2);
            var degY = Math.round((this.blockSpace * 4 * 0.6 - tempBox.height) / 2);
            tempBox.scaleX = tempBox.scaleY = tempBox['mcS'] = 0.6;
            tempBox.x = tempBox["mcX"] = tempBox["beginX"] = startX + i * spaceX + tempBox.anchorOffsetX + degX;
            tempBox.y = tempBox["mcY"] = tempBox["beginY"] = startY + tempBox.anchorOffsetY + degY;
            this.addEvent(tempBox);
            tempBox.y += 500;
            egret.Tween.get(tempBox).wait(100 * i).to({ y: tempBox["mcY"] }, 600, egret.Ease.quartOut);
            //添加虚拟块
            // var hit = Tool.createSprite(0xff0000, [0, 0, tempBlockGroupData[0].length * this.blockSpace, tempBlockGroupData.length * this.blockSpace]);
            var hit = Tool.createSprite(0xff0000, [4 * this.blockSpace, 4 * this.blockSpace]);
            hit.x = Math.round((tempBox.width - hit.width) / 2);
            hit.y = Math.round((tempBox.height - hit.height) / 2);
            tempBox.addChild(hit);
            hit.alpha = 0;
        }
    };
    /**
     * 手指释放block组时，检测block位置，并和总数组进行相加运算
     */
    Game1.prototype.releaseBlockGroup = function (_blockGroup) {
        var groupData = _blockGroup["groupData"];
        var groupX = _blockGroup.x - _blockGroup.anchorOffsetX; //group左上角位置X
        var groupY = _blockGroup.y - _blockGroup.anchorOffsetY; //group左上角位置Y
        var startI = Math.round((groupY - this.blockStartY) / this.blockSpace);
        var startJ = Math.round((groupX - this.blockStartX) / this.blockSpace);
        var groupCloNum = groupData.length;
        var groupRowNum = groupData[0].length;
        var canPush = this.checkCanPush(groupData, startI, startJ);
        if (!canPush) {
            //无法放置，blockGroup返回原来位置
            egret.Tween.removeTweens(_blockGroup);
            egret.Tween.get(_blockGroup).to({ x: _blockGroup["mcX"], y: _blockGroup["mcY"], scaleX: 0.6, scaleY: 0.6 }, 300, egret.Ease.quadInOut);
        }
        else {
            //可以放置，把 blockGroup 数据添加到总数组
            var addScore = 0;
            var tempBlock;
            for (var i = 0; i < groupCloNum; i++) {
                for (var j = 0; j < groupRowNum; j++) {
                    if (groupData[i][j] == 1) {
                        tempBlock = _blockGroup["groupArr"][i][j];
                        this.blockData[i + startI][j + startJ] = 1;
                        this.blockArray[i + startI][j + startJ] = tempBlock;
                        this.mainBox.addChild(tempBlock);
                        tempBlock.x = this.blockStartX + (j + startJ) * this.blockSpace + tempBlock.anchorOffsetX;
                        tempBlock.y = this.blockStartY + (i + startI) * this.blockSpace + tempBlock.anchorOffsetY;
                        this.addPushEft(tempBlock);
                        addScore++;
                    }
                }
            }
            Game1.currentScore += addScore;
            egret.Tween.get(this).to({ score: Game1.currentScore }, 300);
            this.preBlockArr.splice(this.preBlockArr.indexOf(_blockGroup), 1);
            Tool.remove(_blockGroup);
            _blockGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this.checkBlockData();
            if (this.preBlockArr.length == 0) {
                //如果预group没了，则生成下一组
                this.createPreBlocks();
            }
            this.checkGameOver(); //检测游戏是否已经结束
        }
    };
    /**
     * 检测游戏是否结束
     */
    Game1.prototype.checkGameOver = function () {
        var tempBlockGroup;
        var canPush = false;
        for (var i = 0; i < this.preBlockArr.length; i++) {
            tempBlockGroup = this.preBlockArr[i];
            canPush = this.checkCanInit(tempBlockGroup["groupData"]);
            if (canPush) {
                break;
            }
        }
        if (!canPush) {
            this.isGameOver = true;
            this.showGameOver();
            //显示游戏结束
            console.log("游戏结束");
        }
    };
    /**
     * 检测是否能放得下，返回boolean
     * @param _blockGroup 方块对象
     * @param _startI 起始 行
     * @param _startJ 起始 列
     */
    Game1.prototype.checkCanPush = function (_groupData, _startI, _startJ) {
        var groupCloNum = _groupData.length;
        var groupRowNum = _groupData[0].length;
        var endI = _startI + groupCloNum;
        var endJ = _startJ + groupRowNum;
        if (_startI < 0 || _startJ < 0 || endI > this.cloNum || endJ > this.rowNum) {
            //超出边界，放不下
            return false;
        }
        else {
            var isBreak = false;
            for (var i = 0; i < groupCloNum; i++) {
                for (var j = 0; j < groupRowNum; j++) {
                    if (_groupData[i][j] == 1 && this.blockData[i + _startI][j + _startJ] == 1) {
                        //已经有方块，放不了
                        isBreak = true;
                        break;
                    }
                }
                if (isBreak) {
                    break;
                }
            }
            var isBreak = false;
            for (var i = 0; i < groupCloNum; i++) {
                for (var j = 0; j < groupRowNum; j++) {
                    if (_groupData[i][j] == 1 && this.blockData[i + _startI][j + _startJ] == 1) {
                        //已经有方块，放不了
                        isBreak = true;
                        break;
                    }
                }
                if (isBreak) {
                    break;
                }
            }
            if (!isBreak) {
                //检测后没有跳出，表示可以放得下
                //放下动作
                return true;
            }
            else {
                //检测后没有跳出，表示已经有方块，放不了
                return false;
            }
        }
    };
    /**
     * 检测总数据，是否有消除
     */
    Game1.prototype.checkBlockData = function () {
        var _this = this;
        var clearCloNumArr = [];
        var clearRowNumArr = [];
        var tempBlock;
        for (var i = 0; i < this.cloNum; i++) {
            if (this.blockData[i].indexOf(0) == -1) {
                // 整行没有0，记录消除的行索引
                clearCloNumArr.push(i);
            }
        }
        //判断列是否有满，先把数组旋转90度，方便判断
        var tempArr = this.rotationBlockGroup(this.blockData, 1);
        for (var i = 0; i < tempArr.length; i++) {
            if (tempArr[i].indexOf(0) == -1) {
                clearRowNumArr.push(i);
            }
        }
        //---------------------------------------------------------------------------------
        var addScore = 0;
        var stepScore = 10;
        var isAdd = false;
        for (var i = 0; i < this.cloNum; i++) {
            isAdd = false;
            for (var j = 0; j < this.rowNum; j++) {
                if (clearCloNumArr.indexOf(i) != -1 && this.blockData[i][j] != 0) {
                    //如果行满了
                    tempBlock = this.blockArray[i][j];
                    egret.Tween.get(tempBlock).wait(j * 60).call(function (target, _i, _j) {
                        egret.Tween.get(target).wait(100).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.quadOut).call(function (target) {
                            DictBitmap.reclaim(target);
                        }, _this, [target]);
                        _this.blockData[_i][_j] = 0;
                        _this.blockArray[_i][_j] = "";
                        _this.addClearEft(target);
                    }, this, [tempBlock, i, j]);
                    //
                    if (!isAdd) {
                        isAdd = true;
                        addScore += stepScore;
                        stepScore += 10;
                    }
                }
            }
        }
        var rowI;
        for (var i = 0; i < clearRowNumArr.length; i++) {
            rowI = clearRowNumArr[i];
            for (var j = 0; j < this.cloNum; j++) {
                tempBlock = this.blockArray[j][rowI];
                egret.Tween.get(tempBlock).wait(j * 60).call(function (target, _i, _j) {
                    egret.Tween.get(target).wait(100).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.quadOut).call(function (target) {
                        DictBitmap.reclaim(target);
                    }, _this, [target]);
                    _this.blockData[_j][rowI] = 0;
                    _this.blockArray[_j][rowI] = "";
                    _this.addClearEft(target);
                }, this, [tempBlock, i, j]);
            }
            addScore += stepScore;
            stepScore += 10;
        }
        Game1.currentScore += addScore;
        egret.Tween.get(this).to({ score: Game1.currentScore }, 500);
    };
    /**
     * 消除效果
     * @param _block 小块对象
     */
    Game1.prototype.addClearEft = function (_block) {
        var tempStar;
        for (var i = 0; i < 10; i++) {
            tempStar = DictBitmap.produce("star" + _block["colorId"] + "_" + Tool.getRandom(1, 3, 0) + "_png");
            this.mainBox.addChild(tempStar);
            tempStar.blendMode = egret.BlendMode.ADD;
            Tool.anchorXY(tempStar);
            tempStar.x = _block.x + Tool.getRandom(-10, 10);
            tempStar.y = _block.y + Tool.getRandom(-10, 10);
            tempStar.scaleX = tempStar.scaleY = 0;
            var wt = Tool.getRandom(0, 200);
            var speedTime = 400 + Tool.getRandom(0, 1000);
            if (Math.random() < 0.7) {
                egret.Tween.get(tempStar).wait(wt)
                    .to({ x: tempStar.x + Tool.getRandom(-100, 100), y: tempStar.y + Tool.getRandom(-100, 100) }, speedTime, egret.Ease.quadOut);
            }
            else {
                egret.Tween.get(tempStar).wait(wt)
                    .to({ x: tempStar.x + Tool.getRandom(-300, 300), y: tempStar.y + Tool.getRandom(-300, 300) }, speedTime, egret.Ease.quadOut);
            }
            egret.Tween.get(tempStar)
                .wait(wt)
                .to({ scaleX: 1, scaleY: 1 }, speedTime * 0.2)
                .to({ scaleX: 0, scaleY: 0 }, speedTime * 0.7, egret.Ease.quadOut)
                .call(function (target) {
                DictBitmap.reclaim(target);
            }, this, [tempStar]);
        }
    };
    /**
     * 摆放效果
     */
    Game1.prototype.addPushEft = function (_block) {
        _block;
        var tempStar;
        var lineNum = 6;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < lineNum; j++) {
                tempStar = DictBitmap.produce("star" + _block["colorId"] + "_" + Tool.getRandom(1, 3, 0) + "_png");
                this.mainBox.addChild(tempStar);
                tempStar.blendMode = egret.BlendMode.ADD;
                Tool.anchorXY(tempStar);
                if (i == 0) {
                    //top
                    tempStar.x = _block.x - _block.anchorOffsetX + j * _block.width / lineNum;
                    tempStar.y = _block.y - _block.anchorOffsetY;
                }
                else if (i == 1) {
                    //left
                    tempStar.x = _block.x + _block.anchorOffsetX;
                    tempStar.y = _block.y - _block.anchorOffsetY + j * _block.height / lineNum;
                }
                else if (i == 2) {
                    //bottom
                    tempStar.x = _block.x - _block.anchorOffsetX + j * _block.height / lineNum;
                    tempStar.y = _block.y + _block.anchorOffsetY;
                }
                else if (i == 3) {
                    //right
                    tempStar.x = _block.x - _block.anchorOffsetX;
                    tempStar.y = _block.y - _block.anchorOffsetX + j * _block.height / lineNum;
                }
                tempStar.scaleX = tempStar.scaleY = Tool.getRandom(0.2, 0.5);
                egret.Tween.get(tempStar).to({ x: tempStar.x + Tool.getRandom(-20, 20), y: tempStar.y + Tool.getRandom(-20, 20), scaleX: 0, scaleY: 0 }, 300 + Tool.getRandom(0, 500), egret.Ease.quadOut)
                    .call(function (target) {
                    DictBitmap.reclaim(target);
                }, this, [tempStar]);
            }
        }
    };
    Object.defineProperty(Game1.prototype, "score", {
        get: function () {
            return Number(this.score_txt.text);
        },
        set: function (v) {
            var str = "";
            this.score_txt.text = str + String(Math.floor(v));
            this.score_icon.x = 320 - Math.round(this.score_txt.text.length * 32 / 2);
            this.score_txt.x = this.score_icon.x + 35;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 检测当前预blockGroup是否还能放进去，放不进去提示GameOver
     * @param _groupData 需要检测的数组
     */
    Game1.prototype.checkCanInit = function (_groupData) {
        var isBreak = false;
        for (var i = 0; i <= this.blockData.length - _groupData.length; i++) {
            for (var j = 0; j <= this.blockData[i].length - _groupData[0].length; j++) {
                if (this.checkCanPush(_groupData, i, j)) {
                    isBreak = true;
                    break;
                }
            }
            if (isBreak) {
                break;
            }
        }
        return isBreak;
    };
    Game1.prototype.addEvent = function (target) {
        target.touchEnabled = true;
        target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    };
    Game1.prototype.touchBegin = function (e) {
        this.currentBox = e.currentTarget;
        this.currentBox["beginX"] = this.currentBox.x;
        this.currentBox["beginY"] = this.currentBox.y;
        this.mainBox.addChild(this.currentBox);
        this.currentBox.x = e.stageX;
        this.currentBox.y = e.stageY - Math.round(this.currentBox.height / 2) - 20;
        egret.Tween.removeTweens(this.currentBox);
        egret.Tween.get(this.currentBox).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.quadOut);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.touchBeginX = e.stageX;
        this.touchBeginY = e.stageY;
    };
    Game1.prototype.touchMove = function (e) {
        this.currentBox.x = e.stageX;
        this.currentBox.y = e.stageY - Math.round(this.currentBox.height / 2) - 30;
    };
    Game1.prototype.touchEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.releaseBlockGroup(this.currentBox);
    };
    Game1.prototype.showGameOver = function () {
        if (Number(Game1.topScore) < Game1.currentScore) {
            Game1.topScore = String(Game1.currentScore);
        }
        this.stage.addChild(GameOver1.instance);
        egret.Tween.removeTweens(GameOver1.instance);
        GameOver1.instance.updata();
        GameOver1.instance.alpha = 0;
        egret.Tween.get(GameOver1.instance).to({ alpha: 1 }, 500, egret.Ease.quadOut);
        GameOver1.instance.addEventListener("replay", this.replay, this);
    };
    Game1.prototype.replay = function () {
        this.hideGameOver();
        this.score_top_txt.text = "最高分数：" + Game1.topScore;
        Game1.currentScore = 0;
        egret.Tween.get(this).to({ score: Game1.currentScore }, 500);
        var tempBlockGroup;
        for (var i = 0; i < this.preBlockArr.length; i++) {
            tempBlockGroup = this.preBlockArr[i];
            Tool.remove(tempBlockGroup);
        }
        this.preBlockArr = [];
        //-------------------------------------------------------------------------------
        //初始化总数组
        this.blockData = [];
        for (var i = 0; i < this.cloNum; i++) {
            this.blockData[i] = [];
            for (var j = 0; j < this.rowNum; j++) {
                this.blockData[i][j] = 0;
            }
        }
        var tempBlock;
        for (var i = 0; i < this.blockArray.length; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                tempBlock = this.blockArray[i][j];
                if (tempBlock) {
                    egret.Tween.get(tempBlock).to({ scaleX: 0, scaleY: 0 }, 150, egret.Ease.quadOut).call(function (target) {
                        DictBitmap.reclaim(target);
                    }, this, [tempBlock]);
                }
            }
        }
        this.blockArray = [];
        for (var i = 0; i < this.cloNum; i++) {
            this.blockArray[i] = [];
        }
        //创建预block组 3组
        this.createPreBlocks();
    };
    Game1.prototype.hideGameOver = function () {
        egret.Tween.removeTweens(GameOver1.instance);
        egret.Tween.get(GameOver1.instance).to({ alpha: 0 }, 300, egret.Ease.quadOut).call(Tool.remove, this, [GameOver1.instance]);
    };
    /**
     * 添加道具功能
     */
    Game1.prototype.addPropEvent = function (target) {
        target.touchEnabled = true;
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPropTap, this);
    };
    Game1.prototype.onPropTap = function (e) {
        if (e.currentTarget["name"] == "reflush") {
            this.reflush();
        }
        else if (e.currentTarget["name"] == "add") {
            this.add();
        }
        else if (e.currentTarget["name"] == "hammer") {
            this.hammer();
        }
    };
    /**
     * 刷新预group
     */
    Game1.prototype.reflush = function () {
        var groupData;
        var tempBlock;
        var tempBlockGroup;
        for (var i = 0; i < this.preBlockArr.length; i++) {
            tempBlockGroup = this.preBlockArr[i];
            groupData = tempBlockGroup["groupData"];
            for (var ii = 0; ii < groupData.length; ii++) {
                for (var jj = 0; jj < groupData[0].length; jj++) {
                    if (groupData[ii][jj] == 1) {
                        tempBlock = tempBlockGroup["groupArr"][ii][jj];
                        DictBitmap.reclaim(tempBlock);
                    }
                }
            }
            Tool.remove(tempBlockGroup);
        }
        this.preBlockArr = [];
        this.createPreBlocks();
        this.checkGameOver();
    };
    Game1.prototype.add = function () {
        if (!this.addHit) {
            this.addHit = Tool.createBitmapByName("cover_png");
            this.addHit.x = this.mainBox.x;
            this.addHit.y = this.mainBox.y;
            this.addHit.touchEnabled = true;
            this.addHit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addBlock, this);
        }
        this.addChild(this.addHit);
    };
    Game1.prototype.addBlock = function (e) {
        Tool.remove(this.addHit);
        var i = Math.floor((e.stageY - this.mainBox.y - this.blockStartY) / this.blockSpace);
        var j = Math.floor((e.stageX - this.mainBox.x - this.blockStartX) / this.blockSpace);
        if (i < 0 || j < 0 || i > this.cloNum || j > this.rowNum) {
            return;
        }
        if (this.blockData[i][j] == 0) {
            var colorId = Tool.getRandom(1, 8, 0);
            var tempBlock = DictBitmap.produce("common_block_" + colorId + "_png");
            this.mainBox.addChild(tempBlock);
            tempBlock['colorId'] = colorId;
            Tool.anchorXY(tempBlock);
            tempBlock.x = this.blockStartX + j * this.blockSpace + tempBlock.anchorOffsetX;
            tempBlock.y = this.blockStartY + i * this.blockSpace + tempBlock.anchorOffsetY;
            this.blockArray[i][j] = tempBlock;
            this.blockData[i][j] = 1;
            this.addPushEft(tempBlock);
            Game1.currentScore += 1;
            egret.Tween.get(this).to({ score: Game1.currentScore }, 300);
            this.checkBlockData();
        }
    };
    Game1.prototype.hammer = function () {
        if (!this.hammerHit) {
            this.hammerHit = Tool.createBitmapByName("cover_png");
            this.hammerHit.x = this.mainBox.x;
            this.hammerHit.y = this.mainBox.y;
            this.hammerHit.touchEnabled = true;
            this.hammerHit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hammerBlock, this);
        }
        this.addChild(this.hammerHit);
    };
    Game1.prototype.hammerBlock = function (e) {
        Tool.remove(this.hammerHit);
        var i = Math.floor((e.stageY - this.mainBox.y - this.blockStartY) / this.blockSpace);
        var j = Math.floor((e.stageX - this.mainBox.x - this.blockStartX) / this.blockSpace);
        if (i < 0 || j < 0 || i > this.cloNum || j > this.rowNum) {
            return;
        }
        if (this.blockData[i][j] == 1) {
            this.blockData[i][j] = 0;
            var tempBlock = this.blockArray[i][j];
            this.blockArray[i][j] = undefined;
            this.addClearEft(tempBlock);
            DictBitmap.reclaim(tempBlock);
        }
    };
    Game1.currentScore = 0;
    return Game1;
}(egret.DisplayObjectContainer));
__reflect(Game1.prototype, "Game1");
//# sourceMappingURL=Game1.js.map