/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */

export class Enemy extends Phaser.GameObjects.Image {
    private walkingSpeed = 1;
    private text: any;

    constructor(scene, params) {
        super(params.scene, params.x, params.y, params.key);
        this.scene = scene;
        this.initImage();
        this.initText();
        params.scene.add.existing(this);
    }

    private initImage(): void {
        this.setScale(0.25);
        this.setSize(100, 100);
        this.setAlpha(1);
        this.setFlip(true, true);
        this.setOrigin(0.4, 0.4);
    }
    private initText() {
        const style = { font: "22px Arial", fill: "#000000", align: "center" };
        // this.text = this.scene.add.text(-100, this.y - 35, "Balls", style);
        // this.text.x = this.x - this.text.width / 2;

        // @ts-ignore
        this.text = this.scene.add.rexBBCodeText(-100, this.y - 35, "B[color=red]al[/color]ls", {
            fontSize: '22px',
            align: 'center',
            stroke: 'red',
            strokeThickness: 1,
        });
        this.text.x = this.x - this.text.width / 2;


        // `123456[color=blue]AA[/color]
        // [i][color=red]B
        // B[/color][b]CC[/b][/i]DD[size=10]D[size=20]D[size=30][u]D[size=40]D[/u][size=50]D[/size]D
        // [size=20][u=red]EEE[/u][/size][shadow]FFF[/shadow][color=none][stroke]GGG[/stroke][stroke=blue]GGG[/stroke]`;
    }

    update(): void {
        this.move();
    }

    private move(): void {
        this.y += this.walkingSpeed;
        this.text.y += this.walkingSpeed;
    }
}
