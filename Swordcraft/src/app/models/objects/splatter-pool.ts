import {Enemy} from "./enemies/enemy";

export class SplatterPool extends Enemy {
    public LIVE_TIME = 900;
    public OFFSET = 30;
    private enemies: Enemy[];

    constructor(scene: Phaser.Scene, x: number, y: number, enemies: Enemy[]) {
        super(scene, x, y, 'splatter-pool');
        this.enemies = enemies;
        this.physics.setScale(0.6);
        this.OFFSET = this.physics.displayWidth / 3;
        this.physics.body.unit = this;
        this.physics.setSensor(true);
        this.physics.setDepth(-1);
    }

    update() {
        super.update(() => {
            if (this.liveCounter > this.LIVE_TIME) {
                const index = this.enemies.findIndex(e => e === this);
                if (index === -1) {
                    throw new Error("Could not find and delete splatter pool");
                }
                this.enemies.splice(index, 1);
                this.destroy();
            }
        });
    }
}
