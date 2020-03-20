export class UIMoveCamera extends Laya.Script {
    constructor() {
        super();
    }

    previous: Laya.Point = new Laya.Point();
    next: Laya.Point = new Laya.Point();
    onAwake() {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.owner.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
    }
    mouseMove(e: Laya.Event) {
        // console.log(e);
        if (this.previous.x == 0 && this.previous.y == 0) return;

        this.next.x = e.stageX;
        this.next.y = e.stageY;

    }

    mouseUp(e: Laya.Event) {
        //console.log(e);
        this.previous = new Laya.Point()
        this.next = new Laya.Point();
    }
    mouseDown(e: Laya.Event) {
        // console.log(e);
        this.previous.x = e.stageX;
        this.previous.y = e.stageY;
    }

    onUpdate(){
        if (this.previous.x == 0 && this.previous.y == 0) return;
        if (this.next.x == 0 && this.next.y == 0) return;
        
        Laya.stage.event('rotateCamera', [this.previous, this.next])

    }
}