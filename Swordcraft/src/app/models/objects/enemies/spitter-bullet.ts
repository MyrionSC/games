import {Enemy} from "./enemy";
import {Global} from "../../../globals";

export class SpitterBullet extends Enemy {
    public INITIAL_MOVE_SPEED = 7 * Global.SPEED_MODIFIER;
    private LIVE_TIME = 400 * Global.SPEED_MODIFIER;

    public moveSpeed = this.INITIAL_MOVE_SPEED;
    private enemies: Enemy[];

    constructor(scene: Phaser.Scene, x: number, y: number, enemies: Enemy[], directionVector: Phaser.Math.Vector2) {
        super(scene, x, y, 'spitter-bullet');
        this.physics.setScale(0.03);
        this.physics.setBody({
            type: 'circle',
            radius: this.physics.width * 0.017
        }, {});
        this.physics.body.unit = this;

        this.physics.setFriction(0, 0);

        directionVector = directionVector.scale(this.moveSpeed);
        this.physics.setVelocity(directionVector.x, directionVector.y);

        this.enemies = enemies;
    }

    stun() {}
    stunEnd() {}

    update() {
        super.update(() => {
            if (this.liveCounter > this.LIVE_TIME) {
                const index = this.enemies.findIndex(o => o === this);
                if (index !== -1) {
                    this.enemies.splice(index, 1);
                    this.destroy();
                }
            }
        });
    }
}
