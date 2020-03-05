export default class GameManager extends Laya.Script {
    numberArr: Array<Array<any>> = new Array(4);
    /** @prop {name:list,type:node} */
    list: Laya.List = null;
    // 鼠标位置
    mouseDownPos: Laya.Point = null;

    constructor() {
        super();
    }
    onAwake() {
        for (let i = 0; i < 4; i++) {
            this.numberArr[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                this.numberArr[i][j] = 0
            }
        }
        console.log(this.numberArr);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown)
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp)

        this.LoadTexture();

    }
    mouseDown() {
        this.mouseDownPos.x = Laya.stage.mouseX;
        this.mouseDownPos.y = Laya.stage.mouseY;
    }
    mouseUp() {
        var deltaX = Laya.stage.mouseX - this.mouseDownPos.x;
        var deltaY = Laya.stage.mouseY - this.mouseDownPos.y;
        if (deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
            console.log("left")
        }
        if (deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
            console.log("right")
        }
        if (deltaY < 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
            console.log("up")
        }
        if (deltaY > 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
            console.log("down")
        }
    }
    LoadTexture() {
        var infoArr = [
            { url: "images/2048Atlas_2.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_3.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_4.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_5.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_6.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_7.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_8.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_9.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_10.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_11.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_12.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_13.png", type: Laya.Loader.IMAGE },
            { url: "images/2048Atlas_14.png", type: Laya.Loader.IMAGE },

        ]
        console.log(infoArr);
        Laya.loader.load(infoArr, Laya.Handler.create(this, (result) => {
            console.log(result);
            this.CreateNumberCard();
            this.CreateNumberCard();
        }));
    }
    // 创建数字卡片
    CreateNumberCard() {
        var pos = this.GetRandomNullPos();
        if (!pos) return;
        var valueArr = [2, 4]
        var cardValue = valueArr[this.GetRandom(0, valueArr.length - 1)];

        var sprite = new Laya.Sprite();
        var point = this.GetGlobalPos(pos.x * 4 + pos.y, sprite);
        Laya.stage.addChild(sprite);
        sprite.loadImage(`images/2048Atlas_${this.GetRooting(2, cardValue) + 1}.png`);
        sprite.width = 225;
        sprite.height = 225;
        sprite.pos(point.x + sprite.width / 2, point.y + sprite.height / 2);
        sprite.pivot(sprite.width / 2, sprite.height / 2)
        sprite.scale(0, 0);
        Laya.Tween.to(sprite, { scaleX: 1, scaleY: 1 }, 100, Laya.Ease.quadInOut);

        this.numberArr[pos.x][pos.y] = cardValue;
    }
    GetGlobalPos(index, sprite: Laya.Sprite) {
        var cell = this.list.getCell(index);
        var point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));
        point.x += sprite.width / 2;
        point.y += sprite.height / 2;
        return point;
    }
    // 开根
    GetRooting(x: number, v: number): number {
        if (x > v)
            return -1;
        if (x == v)
            return 1;
        v /= x;
        if (v == 1)
            return 1;
        return this.GetRooting(x, v) + 1;
    }
    GetRandomNullPos(): { x: number, y: number } | undefined {
        var arr = new Array<{ x: number, y: number }>();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                // 格子为空
                if (this.numberArr[i][j] == 0) {
                    arr.push({ x: i, y: j })
                }
            }
        }
        if (arr.length == 0)
            return undefined;
        return arr[this.GetRandom(0, arr.length - 1)];
    }
    // 获取随机数
    GetRandom(min: number, max: number): number {
        var value = Math.random() * (max - min);
        return Math.round(value) + min
    }
}