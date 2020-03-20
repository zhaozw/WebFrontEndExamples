export class CameraController extends Laya.Script3D {
    constructor() {
        super();
    }


    private playerHandle: Laya.Sprite3D;
    private cameraHandle: Laya.Sprite3D;
    private player: Laya.Sprite3D;

    private horizontalSpeed = .2;
    private verticalSpeed = .2;

    // private playerEulerAngles = new Laya.Vector3();

    onAwake() {
        this.cameraHandle = this.owner.parent as Laya.Sprite3D;
        this.playerHandle = this.cameraHandle.parent as Laya.Sprite3D;
        this.player = this.playerHandle.getChildByName('Player') as Laya.Sprite3D;
        Laya.stage.on('rotateCamera', this, this.rotateCamera)
        // console.log(this.cameraHandle, this.playerHandle);
    }

    rotateCamera(p: Laya.Point, n: Laya.Point) {
        // console.log(n.x - p.x, n.y - p.y);
        console.log(this.playerHandle.transform.position);
        var horizontal = (n.x - p.x) * this.horizontalSpeed * Laya.updateTimer.delta / 1000;
        var vertical = (n.y - p.y) * this.verticalSpeed * Laya.updateTimer.delta / 1000;

        let playerEulerAngles = this.player.transform.rotationEuler;

        this.playerHandle.transform.rotate(new Laya.Vector3(0, horizontal, 0), true, false)

        if (vertical + this.cameraHandle.transform.localRotationEulerX >= 10 && vertical + this.cameraHandle.transform.localRotationEulerX <= 60)
            this.cameraHandle.transform.rotate(new Laya.Vector3(vertical, 0, 0), true, false)

        this.player.transform.rotationEuler = playerEulerAngles;


    }

}