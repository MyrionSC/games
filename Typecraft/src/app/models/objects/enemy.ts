/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */

export class Enemy extends Phaser.GameObjects.Image {
    private walkingSpeed = 1;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key);
        this.initImage();
        params.scene.add.existing(this);
    }

    private initImage(): void {
        this.setScale(0.25);
        this.setSize(100, 100);
        this.setAlpha(1);
        this.setFlip(true, true);
        this.setOrigin(0.4, 0.4);
        // this.setAngle(0);
    }

    update(): void {
        this.move();
    }

    private move(): void {
        this.y += this.walkingSpeed;
    }
}
