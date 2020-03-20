export default class CameraFollow extends Laya.Script {
    constructor() {
        super();
    }
    onAwake() {
        Laya.stage.on('MoveCamera', this, this.follow);
    }
    follow(localPositionX, localPositionZ) {
        // console.log(2)
        let camera = (this.owner as Laya.Camera);
        localPositionX += camera.transform.localPositionX;
        localPositionZ += camera.transform.localPositionZ;

        camera.transform.localPositionX = localPositionX;
        camera.transform.localPositionZ = localPositionZ;


        // Laya.Tween.to((this.owner as Laya.Camera).transform,{localPositionX:localPositionX,localPositionZ:localPositionZ},10,null,null)
    }

    
}