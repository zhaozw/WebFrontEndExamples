export default class UserControl extends Laya.Script {
    constructor() {
        super();
    }
    user: Laya.MeshSprite3D
    rb: Laya.Rigidbody3D
    ani: Laya.Animator
    model: Laya.MeshSprite3D

    isMove: boolean
    isRun: boolean
    onAwake() {
        this.user = (this.owner as Laya.MeshSprite3D);
        this.rb = this.user.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;

        this.model = (this.user.getChildByName('Player') as Laya.MeshSprite3D)
        this.ani = this.model.getComponent(Laya.Animator) as Laya.Animator;
        Laya.stage.on('MoveStatus', this, this.status)
        Laya.stage.on('MoveUser', this, this.move);
    }
    status(isMove: boolean) {
        console.log("isMove", isMove);
        this.rb.isKinematic = isMove;
        if (isMove)
            this.ani.crossFade('walk', .2);
        else
            this.ani.crossFade('idle', .2);
        this.isMove = isMove;
    }
    move(x: number, y: number, des: number) {
        // localPositionX += user.transform.localPositionX;
        // localPositionZ += user.transform.localPositionZ;

        // console.log("余弦值:", Math.cos(localPositionX / des))

        let anglur = Math.atan2(y, x) * 180 / Math.PI - 90;


        let resultRotation = new Laya.Quaternion();
        let currentRotation = this.model.transform.localRotation;
        let targetRotation = this.fromEuler(new Laya.Vector3(this.model.transform.localRotationEulerX, anglur, this.model.transform.localRotationEulerZ));

        // let aniPlayerStateName = this.ani.getCurrentAnimatorPlayState().animatorState.name;
        // console.log(aniPlayerStateName);
       
        console.log(des);

        // Laya.Vector3.lerp(currentRotationEuler, targetRotationEuler, .2, resultRotationEuler);
        // Laya.MathUtils3D.

        Laya.Quaternion.slerp(currentRotation, targetRotation, .2, resultRotation);
        this.model.transform.localRotation = resultRotation;

        // 获取模型的向前向量
        let tempForward = new Laya.Vector3();


        // this.user.transform.getForward(tempForward);
        // let tempForwardModel = new Laya.Vector3();
        // this.model.transform.getForward(tempForwardModel);
        // tempForward.x *= tempForwardModel.x * -1
        // tempForward.z *= tempForwardModel.z * -1
        // console.log("用户向前的向量",tempForward);
        // console.log("模型向前的向量",tempForwardModel);

        // console.log("用户的欧拉角", this.user.transform.localRotationEuler);
        // console.log("模型的欧拉角", this.model.transform.rotationEuler);
        // 模型的弧度
        let modelRadian = this.model.transform.rotationEuler.y * Math.PI / 180
        let modelCos = Math.cos(modelRadian);
        let modelSin = Math.sin(modelRadian);

        console.log('模型的全局弧度', modelRadian)
        console.log('余弦', modelCos);
        console.log('正弦', modelSin);

        let speed = .004;

        /**           y | 从这开始
         *              |         
         *       --------------
         *              |     x
         *              |  到这是90°
         *              |
         * 
         *      所以cos和sin是反的
         * 
         * 
         */

        tempForward.x = des * modelSin * speed;
        tempForward.z = des * modelCos * speed;

        console.log('移动向量', tempForward)
        this.user.transform.translate(tempForward, true);

    }

    fromEuler(v3: Laya.Vector3) {
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