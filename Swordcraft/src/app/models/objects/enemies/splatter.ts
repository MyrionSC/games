import {Enemy} from "./enemy";
import {Global} from "../../../globals";

export class Splatter extends Enemy {
    public INITIAL_MOVE_SPEED = 2 * Global.SPEED_MODIFIER;

    public moveSpeed = this.INITIAL_MOVE_SPEED;
    public moveVector: Phaser.Math.Vector2;

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
        this.moveVector = new Phaser.Math.Vector2(moveX, moveY).normalize();
    }

    update() {
        super.update(() => {
            this.physics.setVelocity(this.moveVector.x * this.moveSpeed,
                this.moveVector.y * this.moveSpeed);
        });
    }
}
