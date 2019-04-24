import {Enemy} from "./enemy";

export class SpitterBullet extends Enemy {
    private MOVE_SPEED = 7;
    private LIVE_TIME = 150;

    private enemies: Enemy[];

    private counter = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, enemies: Enemy[], directionVector: Phaser.Math.Vector2) {
        super(scene, x, y, 'spitter-bullet');
        this.physics.setScale(0.03);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.017
        }, {});
        this.physics.body.unit = this;

        this.physics.setFriction(0, 0);

        directionVector = directionVector.scale(this.MOVE_SPEED);
        this.physics.setVelocity(directionVector.x, directionVector.y);

        this.enemies = enemies;
    }

    update() {
        super.update();
        if (this.liveCounter > this.LIVE_TIME) {
            console.log("spitter bullet destroy");
            const index = this.enemies.findIndex(o => o === this);
            console.log(index);
            if (index !== -1) {
                this.enemies.splice(index, 1);
                this.destroy();
            }
        }
    }
}
