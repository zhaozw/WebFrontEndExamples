(function () {
    'use strict';

    class GameManager extends Laya.Script {
        constructor() {
            super();
            this.list = null;
            this.numberArr = new Array(4);
        }
        onAwake() {
            for (let i = 0; i < 4; i++) {
                this.numberArr[i] = new Array(4);
                for (let j = 0; j < 4; j++) {
                    this.numberArr[i][j] = 0;
                }
            }
            console.log(this.numberArr);
            this.LoadTexture();
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
        CreateNumberCard() {
            var pos = this.GetRandomNullPos();
            if (!pos)
                return;
            var valueArr = [2, 4];
            var cardValue = valueArr[this.GetRandom(0, valueArr.length - 1)];
            var cell = this.list.getCell(pos.x * 4 + pos.y);
            var sprite = new Laya.Sprite();
            var point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));
            Laya.stage.addChild(sprite);
            sprite.loadImage(`images/2048Atlas_${this.GetRooting(2, cardValue) + 1}.png`);
            sprite.width = 225;
            sprite.height = 225;
            sprite.pos(point.x + sprite.width / 2, point.y + sprite.height / 2);
            sprite.pivot(sprite.width / 2, sprite.height / 2);
            sprite.scale(0, 0);
            Laya.Tween.to(sprite, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadInOut);
            this.numberArr[pos.x][pos.y] = cardValue;
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
