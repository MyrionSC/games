import {Enemy} from "./enemy";

export class Splatter extends Enemy {
    private MOVE_SPEED = 2;
    private moveVector: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'splatter');
        this.physics.setScale(0.08);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.04
        }, {});
        this.physics.body.unit = this;

        // move into map based on spawn position
        const moveX = x < 0 ? Math.random() : -Math.random();
        const moveY = y < 0 ? Math.random() : -Math.random();
        this.moveVector = new Phaser.Math.Vector2(moveX, moveY).normalize().scale(this.MOVE_SPEED);
    }

    update() {
        super.update(() => {
            // this.physics.setVelocity(this.moveVector.x, this.moveVector.y);
        });
    }
}
