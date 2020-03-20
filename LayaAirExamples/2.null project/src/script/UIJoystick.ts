export default class UIJoystick extends Laya.Script {
    constructor() {
        super();
    }
    isStart: boolean = false;
    btn: Laya.Image
    centerPos: Laya.Point
    radius = 100;


    moveObj: Laya.MeshSprite3D
    mainCamera: Laya.Camera
    movePos = new Laya.Vector3();
    des: number = 0;

    initObject(obj: Laya.MeshSprite3D) {
        this.moveObj = obj
        return this;
    }
    initCamera(obj: Laya.Camera) {
        this.mainCamera = obj;
        return this;
    }

    onAwake() {
        console.log('hello world');
        this.btn = this.owner.getChildByName("JoystickBtn") as Laya.Image;
        let pos = new Laya.Point();
        this.btn.transform.transformPoint(pos);
        this.centerPos = this.btn.localToGlobal(new Laya.Point());
        console.log(pos);
        console.log(this.btn);
        this.btn.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown)
        // btn.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove)
        // btn.on(Laya.Event.MOUSE_UP, this, this.mouseUp)
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove)
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp)
    }
    mouseDown(e: any) {
        console.log(e);
        this.isStart = true
        // this.movePos = new Laya.Vector3()
        Laya.stage.event('MoveStatus', [true])
    }
    mouseMove(e: Laya.Event) {
        if (this.isStart) {
            let pos = new Laya.Point(e.stageX, e.stageY);
            this.setPos(pos);
        }


    }
    mouseUp(e: any) {
        console.log(e);
        if (this.isStart) {
            this.btn.centerX = 0;
            this.btn.centerY = 0;
            this.isStart = false;
            // this.movePos = new Laya.Vector3()
            Laya.stage.event('MoveStatus', [false])
        }

    }

    setPos(pos: Laya.Point) {
        let a = (pos.y - this.btn.height / 2 - this.centerPos.y);
        let b = (pos.x - this.btn.width / 2 - this.centerPos.x)
        let des = Math.sqrt(b ** 2 + a ** 2);
        if (des > this.radius) {
            this.btn.centerX = (this.radius * b) / des
            this.btn.centerY = (this.radius * a) / des
            des = this.radius;
        } else {
            this.btn.centerX = b
            this.btn.centerY = a
        }
        // let rb = this.moveObj.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        // rb.isKinematic = true;
        // this.moveObj.transform.translate(movePos);
        this.des = des;
        console.log(this.mainCamera.transform.position);
        console.log(this.mainCamera.transform.localPosition);


    }
    onUpdate() {
        if (this.isStart) {
            // let rb = this.moveObj.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
            // rb.isKinematic = true;
            // this.movePos.x += 0.2 * this.btn.centerX * -1 / 100;
            // this.movePos.z += 0.2 * this.btn.centerY * -1 / 100;
            // Laya.stage.event('MoveCamera', [0.2 * this.btn.centerX * -1 / 100, 0.2 * this.btn.centerY * -1 / 100])
            Laya.stage.event('MoveUser', [this.btn.centerX / this.radius, this.btn.centerY / this.radius * -1, this.des / this.radius])
        }
    }


}