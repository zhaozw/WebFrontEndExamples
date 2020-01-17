import Game from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    // ✔的坐标
    rightPos: cc.Vec2 = null;
    // 移动开始的坐标
    startPos: cc.Vec2 = null;
    game: Game = null;
    /**
     * 初始化
     * - 获取cc.Sprite组件
     * - 获取宽高
     * - 根据Pos索引和自身的宽高来,截取贴图部分
     * - 将cc.Sprite中显示的图片替换掉
     * @param picTexture 贴图
     * @param pos 位置索引
     */
    init(picTexture, pos: cc.Vec2) {
        let sprite = this.node.getComponent(cc.Sprite);
        let w = this.node.width;
        let h = this.node.height;
        let frame = new cc.SpriteFrame(picTexture, cc.rect(pos.x * w, pos.y * h, w, h));
        sprite.spriteFrame = frame;
        this.rightPos = pos;
    }



    onLoad() {
        this.game = this.node.getParent().getComponent(Game);
        this.node.on("touchstart", this.touchStart, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
    }
    onDestroy() {
        this.node.off("touchstart", this.touchStart, this);
        this.node.off("touchmove", this.touchMove, this);
        this.node.off("touchend", this.touchEnd, this);
    }
    touchStart(e) {
        this.node.opacity = 128;
        this.startPos = this.node.position;
        this.node.zIndex = 1;
    }

    touchMove(e) {
        let delta = e.getDelta();
        this.node.x += delta.x;
        this.node.y += delta.y;
    }
    touchEnd(e) {
        this.node.opacity = 255;
        this.node.zIndex = 0;

        let w = this.node.width;
        let h = this.node.height;
        let { i, j } = this.getPosToIndex(this.node.position);

        let tmpNode = this.game.picNodeArr[i][j];
        if (tmpNode) {
            this.node.setPosition(j * w, -i * h);
            tmpNode.setPosition(this.startPos);

            let startIdx = this.getPosToIndex(this.startPos);
            this.game.picNodeArr[startIdx.i][startIdx.j] = tmpNode;
            this.game.picNodeArr[i][j] = this.node;
        }
        else {
            this.node.setPosition(this.startPos);
        }
        if (this.game.isWin()) {
            console.log("游戏胜利!");
        }
    }

    getPosToIndex(pos) {
        let w = this.node.width;
        let h = this.node.height;
        let i = Math.abs(parseInt(pos.y / h + ""));
        let j = Math.abs(parseInt(pos.x / w + ""));
        return { i, j }
    }


    start() {

    }

    // update (dt) {}
}
