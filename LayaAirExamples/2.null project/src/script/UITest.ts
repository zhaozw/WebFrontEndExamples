import UIJoystick from "./UIJoystick";
import CameraFollow from "./CameraFollow";
import UserControl from "./UserControl";
import { CameraController } from "./CameraController";
import { UIMoveCamera } from "./UIMoveCamera";

export default class UITest extends Laya.Script {
    constructor() {
        super();
    }
    onAwake() {
        console.log('hello world');
        //3d场景加载
        Laya.Scene3D.load("res/LayaScene_SampleScene/Conventional/SampleScene.ls", Laya.Handler.create(this, this.onLoadSceneFinish));

    }
    onLoadSceneFinish(loadScene: Laya.Scene3D) {
        console.log(loadScene);
        loadScene.zOrder = -1;
        Laya.stage.addChild(loadScene)

        let cube = loadScene.getChildByName('PlayerHandle')
        let root = Laya.stage.getChildByName('root')
        let scene = root.getChildAt(0);
        let joystick = scene.getChildByName('Joystick');
        let moveCamera = scene.getChildByName('MoveCamera');

        let mainCamera = loadScene.getChildByName('PlayerHandle').getChildByName('CameraHandle').getChildByName('Main Camera')

        // console.log(root, joystick, mainCamera);
        mainCamera.addComponent(CameraController);
        moveCamera.addComponent(UIMoveCamera);
        cube.addComponent(UserControl);

        (joystick.addComponent(UIJoystick) as UIJoystick).initObject(cube as Laya.MeshSprite3D).initCamera(mainCamera as Laya.Camera);

        console.log(cube, joystick);
    }
}