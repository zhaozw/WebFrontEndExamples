const Input = {};
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {

    _speed = 200;
    state = '';
    playerAni: cc.Animation;
    sp = cc.v2(0, 0);
    // LIFE-CYCLE CALLBACKS:
    rb: cc.RigidBody
    setState(state: string) {
        if (this.state == state) return;
        this.state = state;
        this.playerAni.play(this.state);
        
    }

    onLoad() {

        this.playerAni = this.getComponent(cc.Animation);
        this.rb = this.getComponent(cc.RigidBody)
        cc.systemEvent.on('keydown', this.onKeydown, this);
        cc.systemEvent.on('keyup', this.onKeyup, this)
    }
    onKeyup(e: cc.Event.EventKeyboard) {
        console.log(e);
        Input[e.keyCode] = 0;
    }
    onKeydown(e: cc.Event.EventKeyboard) {
        console.log(e);
        Input[e.keyCode] = 1;
    }

    start() {

    }

    update(dt) {
        if (Input[cc.macro.KEY.a] || Input[cc.macro.KEY.left]) {
            this.sp.x = -1;
        }
        else if (Input[cc.macro.KEY.d] || Input[cc.macro.KEY.right]) {
            this.sp.x = 1;
        }
        else {
            this.sp.x = 0;
        }

        if (Input[cc.macro.KEY.w] || Input[cc.macro.KEY.up]) {
            this.sp.y = 1;
        }
        else if (Input[cc.macro.KEY.s] || Input[cc.macro.KEY.down]) {
            this.sp.y = -1;
        }
        else {
            this.sp.y = 0;
        }


        let lv = this.rb.linearVelocity;

        if (this.sp.x) {
            lv.y = 0;
            lv.x = this.sp.x * this._speed
            // this.node.x += this.sp.x * this._speed * dt;
        }
        else if (this.sp.y) {
            lv.y = 0;
            lv.y = this.sp.y * this._speed
            // this.node.y += this.sp.y * this._speed * dt;
        }
        else{
            lv = cc.Vec2.ZERO;
        }
        this.rb.linearVelocity = lv;
        let state = ''
        if (this.sp.x == 1) {
            state = 'kenan_right'
        } else if (this.sp.x == -1) {
            state = 'kenan_left'
        }
        else if (this.sp.y == 1) {
            state = 'kenan_up'
        }
        else if (this.sp.y == -1) {
            state = 'kenan_down'
        }
        else {
            this.playerAni.pause();
        }

        if (state)
            this.setState(state);
    }
}
