(function () {
    'use strict';

    class GameManager extends Laya.Script {
        constructor() {
            super();
            this.numberArr = new Array(4);
            this.cardArr = new Array(4);
            this.list = null;
            this.mouseDownPos = null;
        }
        onAwake() {
            for (let i = 0; i < 4; i++) {
                this.numberArr[i] = new Array(4);
                this.cardArr[i] = new Array(4);
                for (let j = 0; j < 4; j++) {
                    this.numberArr[i][j] = 0;
                    this.cardArr[i][j] = null;
                }
            }
            console.log(this.numberArr);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.LoadTexture();
        }
        mouseDown() {
            this.mouseDownPos = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
        }
        mouseUp() {
            var deltaX = Laya.stage.mouseX - this.mouseDownPos.x;
            var deltaY = Laya.stage.mouseY - this.mouseDownPos.y;
            if (deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
                console.log("left");
                if (this.CanMoveLeft()) {
                    this.MoveLeft();
                    this.CreateNumberCard();
                }
            }
            if (deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
                console.log("right");
                if (this.CanMoveRight()) {
                    this.MoveRight();
                    this.CreateNumberCard();
                }
            }
            if (deltaY < 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
                console.log("up");
            }
            if (deltaY > 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
                console.log("down");
            }
            console.log(this.numberArr);
        }
        LoadTexture() {
            var infoArr = [
                { url: "images/2048Atlas_2.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_3.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_4.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_5.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_6.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_7.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_8.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_9.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_10.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_11.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_12.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_13.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_14.png", type: Laya.Loader.IMAGE },
            ];
            console.log(infoArr);
            Laya.loader.load(infoArr, Laya.Handler.create(this, (result) => {
                console.log(result);
                this.CreateNumberCard();
                this.CreateNumberCard();
            }));
        }
        CanMoveRight() {
            for (let i = 3; i >= 0; i--) {
                for (let j = 2; j >= 0; j--) {
                    if (this.numberArr[i][j] != 0) {
                        if (this.numberArr[i][j + 1] == 0 || this.numberArr[i][j + 1] == this.numberArr[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        CanMoveLeft() {
            for (let i = 3; i >= 0; i--) {
                for (let j = 0; j <= 2; j++) {
                    if (this.numberArr[i][j] != 0) {
                        if (this.numberArr[i][j - 1] == 0 || this.numberArr[i][j - 1] == this.numberArr[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        MoveLeft() {
            var lastK = -1, lastI = -1;
            for (let i = 3; i >= 0; i--) {
                for (let j = 0; j <= 3; j++) {
                    if (this.numberArr[i][j] != 0) {
                        for (let k = 0; k < j; k++) {
                            if (!this.InterIsNullLeft(i, j, k))
                                break;
                            if (this.numberArr[i][k] == 0) {
                                this.numberArr[i][k] = this.numberArr[i][j];
                                this.numberArr[i][j] = 0;
                                if (this.cardArr[i][j] != null) {
                                    this.cardArr[i][k] = this.cardArr[i][j];
                                    this.cardArr[i][j] = null;
                                    var point = this.GetGlobalPos(i * 4 + k, this.cardArr[i][k]);
                                    Laya.Tween.to(this.cardArr[i][k], { x: point.x, y: point.y }, Math.abs(point.x - this.cardArr[i][k].x) / 8);
                                }
                                continue;
                            }
                            if (this.numberArr[i][k] == this.numberArr[i][j] && (lastK != k || (i != lastI && lastK == k))) {
                                lastK = k;
                                lastI = i;
                                this.numberArr[i][k] += this.numberArr[i][j];
                                this.numberArr[i][j] = 0;
                                if (this.cardArr[i][j] != null && this.cardArr[i][k] != null) {
                                    this.cardArr[i][k].destroy();
                                    this.cardArr[i][k] = this.cardArr[i][j];
                                    this.cardArr[i][j] = null;
                                    var point = this.GetGlobalPos(i * 4 + k, this.cardArr[i][k]);
                                    Laya.Tween.to(this.cardArr[i][k], { x: point.x, y: point.y }, Math.abs(point.x - this.cardArr[i][k].x) / 8, null, Laya.Handler.create(this, () => {
                                        this.ChangeTexture({ x: i, y: k });
                                    }));
                                }
                                continue;
                            }
                        }
                    }
                }
            }
        }
        MoveRight() {
            var lastK = -1, lastI = -1;
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {
                    if (this.numberArr[i][j] != 0) {
                        for (let k = 3; k > j; k--) {
                            if (!this.InterIsNullRight(i, j, k))
                                break;
                            if (this.numberArr[i][k] == 0) {
                                this.numberArr[i][k] = this.numberArr[i][j];
                                this.numberArr[i][j] = 0;
                                if (this.cardArr[i][j] != null) {
                                    this.cardArr[i][k] = this.cardArr[i][j];
                                    this.cardArr[i][j] = null;
                                    var point = this.GetGlobalPos(i * 4 + k, this.cardArr[i][k]);
                                    Laya.Tween.to(this.cardArr[i][k], { x: point.x, y: point.y }, Math.abs(point.x - this.cardArr[i][k].x) / 8);
                                }
                                continue;
                            }
                            if (this.numberArr[i][k] == this.numberArr[i][j] && (lastK != k || (i != lastI && lastK == k))) {
                                lastK = k;
                                lastI = i;
                                this.numberArr[i][k] += this.numberArr[i][j];
                                this.numberArr[i][j] = 0;
                                if (this.cardArr[i][j] != null && this.cardArr[i][k] != null) {
                                    this.cardArr[i][k].destroy();
                                    this.cardArr[i][k] = this.cardArr[i][j];
                                    this.cardArr[i][j] = null;
                                    var point = this.GetGlobalPos(i * 4 + k, this.cardArr[i][k]);
                                    Laya.Tween.to(this.cardArr[i][k], { x: point.x, y: point.y }, Math.abs(point.x - this.cardArr[i][k].x) / 8, null, Laya.Handler.create(this, () => {
                                        this.ChangeTexture({ x: i, y: k });
                                    }));
                                }
                                continue;
                            }
                        }
                    }
                }
            }
        }
        InterIsNullRight(row, j, k) {
            for (let i = j + 1; i < k; i++) {
                if (this.numberArr[row][i] != 0) {
                    return false;
                }
            }
            return true;
        }
        InterIsNullLeft(row, j, k) {
            for (let i = j - 1; i > k; i--) {
                if (this.numberArr[row][i] != 0) {
                    return false;
                }
            }
            return true;
        }
        ChangeTexture(pos) {
            let cardValue = this.numberArr[pos.x][pos.y];
            this.cardArr[pos.x][pos.y].loadImage(`images/2048Atlas_${this.GetRooting(2, cardValue) + 1}.png`);
        }
        CreateNumberCard() {
            var pos = this.GetRandomNullPos();
            if (!pos)
                return;
            var valueArr = [2, 4];
            var cardValue = valueArr[this.GetRandom(0, valueArr.length - 1)];
            var sprite = new Laya.Sprite();
            var point = this.GetGlobalPos(pos.x * 4 + pos.y, sprite);
            Laya.stage.addChild(sprite);
            sprite.loadImage(`images/2048Atlas_${this.GetRooting(2, cardValue) + 1}.png`);
            sprite.width = 225;
            sprite.height = 225;
            sprite.pos(point.x + sprite.width / 2, point.y + sprite.height / 2);
            sprite.pivot(sprite.width / 2, sprite.height / 2);
            sprite.scale(0, 0);
            Laya.Tween.to(sprite, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadInOut);
            this.numberArr[pos.x][pos.y] = cardValue;
            this.cardArr[pos.x][pos.y] = sprite;
        }
        GetGlobalPos(index, sprite) {
            var cell = this.list.getCell(index);
            var point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));
            point.x += sprite.width / 2;
            point.y += sprite.height / 2;
            return point;
        }
        GetRooting(x, v) {
            if (x > v)
                return -1;
            if (x == v)
                return 1;
            v /= x;
            if (v == 1)
                return 1;
            return this.GetRooting(x, v) + 1;
        }
        GetRandomNullPos() {
            var arr = new Array();
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.numberArr[i][j] == 0) {
                        arr.push({ x: i, y: j });
                    }
                }
            }
            if (arr.length == 0)
                return undefined;
            return arr[this.GetRandom(0, arr.length - 1)];
        }
        GetRandom(min, max) {
            var value = Math.random() * (max - min);
            return Math.round(value) + min;
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scripts/GameManager.ts", GameManager);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
