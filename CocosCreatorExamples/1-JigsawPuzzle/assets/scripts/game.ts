import Block from "./block";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    blockNode: cc.Prefab;
    // 块节点储存
    picNodeArr = new Array<Array<cc.Node>>()

    
    onLoad() {
        cc.loader.load({ url: "res/raw-assets/source/小白.jpg", type: "jpg" }, (err, texture) => {
            for (let i = 0; i < 4; i++) {
                this.picNodeArr[i] = [];
                for (let j = 0; j < 4; j++) {
                    let block = cc.instantiate(this.blockNode);
                    this.node.addChild(block);
                    block.setPosition(cc.v2(j * 180, -i * 180))
                    block.getComponent(Block).init(texture, cc.v2(j, i));
                    this.picNodeArr[i][j] = block;
                }

            }
            this.randPic();
        })

    }
    /**
     * 是否胜利
     */
    isWin(): boolean {
        for (let i = 0; i < this.picNodeArr.length; i++) {
            for (let j = 0; j < this.picNodeArr[i].length; j++) {
                let rightPos = this.picNodeArr[i][j].getComponent(Block).rightPos
                if (rightPos.x != j || rightPos.y != i)
                    return false;
            }
        }
        return true;
    }
    /**
     * 位置随机
     */
    randPic() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let block = this.picNodeArr[i][j];
                let exIdx = {
                    i: parseInt(Math.random() * 4 + ""),
                    j: parseInt(Math.random() * 4 + ""),
                }
                let exBlock = this.picNodeArr[exIdx.i][exIdx.j];

                let pos = block.position;
                let exPos = exBlock.position;

                block.setPosition(exPos);
                exBlock.setPosition(pos);

                this.picNodeArr[i][j] = exBlock;
                this.picNodeArr[exIdx.i][exIdx.j] = block;

            }

        }
    }
}
