(function () {
    'use strict';

    class UIJoystick extends Laya.Script {
        constructor() {
            super();
            this.isStart = false;
            this.radius = 100;
            this.movePos = new Laya.Vector3();
            this.des = 0;
        }
        initObject(obj) {
            this.moveObj = obj;
            return this;
        }
        initCamera(obj) {
            this.mainCamera = obj;
            return this;
        }
        onAwake() {
            console.log('hello world');
            this.btn = this.owner.getChildByName("JoystickBtn");
            let pos = new Laya.Point();
            this.btn.transform.transformPoint(pos);
            this.centerPos = this.btn.localToGlobal(new Laya.Point());
            console.log(pos);
            console.log(this.btn);
            this.btn.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        }
        mouseDown(e) {
            console.log(e);
            this.isStart = true;
            this.movePos = new Laya.Vector3();
            Laya.stage.event('MoveStatus', [true]);
        }
        mouseMove(e) {
            if (this.isStart) {
                let pos = new Laya.Point(e.stageX, e.stageY);
                this.setPos(pos);
            }
        }
        mouseUp(e) {
            console.log(e);
            if (this.isStart) {
                this.btn.centerX = 0;
                this.btn.centerY = 0;
                this.isStart = false;
                this.movePos = new Laya.Vector3();
                Laya.stage.event('MoveStatus', [false]);
            }
        }
        setPos(pos) {
            let a = (pos.y - this.btn.height / 2 - this.centerPos.y);
            let b = (pos.x - this.btn.width / 2 - this.centerPos.x);
            let des = Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));
            if (des > this.radius) {
                this.btn.centerX = (this.radius * b) / des;
                this.btn.centerY = (this.radius * a) / des;
                des = this.radius;
            }
            else {
                this.btn.centerX = b;
                this.btn.centerY = a;
            }
            let rb = this.moveObj.getComponent(Laya.Rigidbody3D);
            this.des = des;
            console.log(this.mainCamera.transform.position);
            console.log(this.mainCamera.transform.localPosition);
        }
        onUpdate() {
            if (this.isStart) {
                Laya.stage.event('MoveUser', [this.btn.centerX / this.radius, this.btn.centerY / this.radius * -1, this.des / this.radius]);
            }
        }
    }

    class UserControl extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.user = this.owner;
            this.rb = this.user.getComponent(Laya.Rigidbody3D);
            this.model = this.user.getChildByName('Player');
            this.ani = this.model.getComponent(Laya.Animator);
            Laya.stage.on('MoveStatus', this, this.status);
            Laya.stage.on('MoveUser', this, this.move);
        }
        status(isMove) {
            console.log("isMove", isMove);
            this.rb.isKinematic = isMove;
            if (isMove)
                this.ani.crossFade('walk', .2);
            else
                this.ani.crossFade('idle', .2);
        }
        move(x, y, des) {
            let anglur = Math.atan2(y, x) * 180 / Math.PI - 90;
            let resultRotation = new Laya.Quaternion();
            let currentRotation = this.model.transform.localRotation;
            let targetRotation = this.fromEuler(new Laya.Vector3(this.model.transform.localRotationEulerX, anglur, this.model.transform.localRotationEulerZ));
            if (des > .5)
                this.ani.crossFade('run', .2);
            if (des <= .5)
                this.ani.crossFade('walk', .2);
            console.log(des);
            Laya.Quaternion.slerp(currentRotation, targetRotation, .2, resultRotation);
            this.model.transform.localRotation = resultRotation;
            let tempForward = new Laya.Vector3();
            let modelRadian = this.model.transform.rotationEuler.y * Math.PI / 180;
            let modelCos = Math.cos(modelRadian);
            let modelSin = Math.sin(modelRadian);
            console.log('模型的全局弧度', modelRadian);
            console.log('余弦', modelCos);
            console.log('正弦', modelSin);
            let speed = .004;
            tempForward.x = des * modelSin * speed;
            tempForward.z = des * modelCos * speed;
            console.log('移动向量', tempForward);
            this.user.transform.translate(tempForward, true);
        }
        fromEuler(v3) {
            let X = v3.x / 180 * Math.PI;
            let Y = v3.y / 180 * Math.PI;
            let Z = v3.z / 180 * Math.PI;
            let x = Math.cos(Y / 2) * Math.sin(X / 2) * Math.cos(Z / 2) + Math.sin(Y / 2) * Math.cos(X / 2) * Math.sin(Z / 2);
            let y = Math.sin(Y / 2) * Math.cos(X / 2) * Math.cos(Z / 2) - Math.cos(Y / 2) * Math.sin(X / 2) * Math.sin(Z / 2);
            let z = Math.cos(Y / 2) * Math.cos(X / 2) * Math.sin(Z / 2) - Math.sin(Y / 2) * Math.sin(X / 2) * Math.cos(Z / 2);
            let w = Math.cos(Y / 2) * Math.cos(X / 2) * Math.cos(Z / 2) + Math.sin(Y / 2) * Math.sin(X / 2) * Math.sin(Z / 2);
            return new Laya.Quaternion(x, y, z, w);
        }
    }

    class CameraController extends Laya.Script3D {
        constructor() {
            super();
            this.horizontalSpeed = .2;
            this.verticalSpeed = .2;
        }
        onAwake() {
            this.cameraHandle = this.owner.parent;
            this.playerHandle = this.cameraHandle.parent;
            this.player = this.playerHandle.getChildByName('Player');
            Laya.stage.on('rotateCamera', this, this.rotateCamera);
        }
        rotateCamera(p, n) {
            console.log(this.playerHandle.transform.position);
            var horizontal = (n.x - p.x) * this.horizontalSpeed * Laya.updateTimer.delta / 1000;
            var vertical = (n.y - p.y) * this.verticalSpeed * Laya.updateTimer.delta / 1000;
            let playerEulerAngles = this.player.transform.rotationEuler;
            this.playerHandle.transform.rotate(new Laya.Vector3(0, horizontal, 0), true, false);
            if (vertical + this.cameraHandle.transform.localRotationEulerX >= 10 && vertical + this.cameraHandle.transform.localRotationEulerX <= 60)
                this.cameraHandle.transform.rotate(new Laya.Vector3(vertical, 0, 0), true, false);
            this.player.transform.rotationEuler = playerEulerAngles;
        }
    }

    class UIMoveCamera extends Laya.Script {
        constructor() {
            super();
            this.previous = new Laya.Point();
            this.next = new Laya.Point();
        }
        onAwake() {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.owner.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        }
        mouseMove(e) {
            if (this.previous.x == 0 && this.previous.y == 0)
                return;
            this.next.x = e.stageX;
            this.next.y = e.stageY;
        }
        mouseUp(e) {
            this.previous = new Laya.Point();
            this.next = new Laya.Point();
        }
        mouseDown(e) {
            this.previous.x = e.stageX;
            this.previous.y = e.stageY;
        }
        onUpdate() {
            if (this.previous.x == 0 && this.previous.y == 0)
                return;
            if (this.next.x == 0 && this.next.y == 0)
                return;
            Laya.stage.event('rotateCamera', [this.previous, this.next]);
        }
    }

    class UITest extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            console.log('hello world');
            Laya.Scene3D.load("res/LayaScene_SampleScene/Conventional/SampleScene.ls", Laya.Handler.create(this, this.onLoadSceneFinish));
        }
        onLoadSceneFinish(loadScene) {
            console.log(loadScene);
            loadScene.zOrder = -1;
            Laya.stage.addChild(loadScene);
            let cube = loadScene.getChildByName('PlayerHandle');
            let root = Laya.stage.getChildByName('root');
            let scene = root.getChildAt(0);
            let joystick = scene.getChildByName('Joystick');
            let moveCamera = scene.getChildByName('MoveCamera');
            let mainCamera = loadScene.getChildByName('PlayerHandle').getChildByName('CameraHandle').getChildByName('Main Camera');
            mainCamera.addComponent(CameraController);
            moveCamera.addComponent(UIMoveCamera);
            cube.addComponent(UserControl);
            joystick.addComponent(UIJoystick).initObject(cube).initCamera(mainCamera);
            console.log(cube, joystick);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/UITest.ts", UITest);
        }
    }
    GameConfig.width = 1080;
    GameConfig.height = 762;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "game.scene";
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
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
            console.log("Hello Layabox");
        }
    }
    new Main();

}());
