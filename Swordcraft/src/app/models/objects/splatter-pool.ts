import {Enemy} from "./enemies/enemy";
import {Biter} from "./enemies/biter";
import {Splatter} from "./enemies/splatter";

export class SplatterPool extends Enemy {
    public LIVE_TIME = 300;
    public OFFSET = 30;
    private enemies: Enemy[];

    constructor(scene: Phaser.Scene, x: number, y: number, enemies: Enemy[]) {
        super(scene, x, y, 'splatter-pool');
        this.enemies = enemies;
        // this.physics.setBody({
        //     type: 'circle',
        //     radius: this.physics.width * 0.04
        // }, {});

        // const b = scene.matter.add.polygon(300, 100, 5, this.physics.width * 0.6, {
        //     chamfer: { radius: [10, 40, 20, 40, 10] }
        // });
        // this.physics.setExistingBody(b, false);
        // console.log([this.physics.displayWidth, this.physics.displayHeight]);
        // console.log([this.physics.x, this.physics.y]);
        // scene.add.circle(x, y, 5, 0xff00ff);
        // scene.add.circle(this.physics.x, this.physics.y, 5, 0x00ffff);
        this.physics.setScale(0.45);

        this.OFFSET = this.physics.displayWidth / 3;
        // console.log([this.physics.x, this.physics.y]);
        // console.log([this.physics.displayWidth, this.physics.displayHeight]);

        // this.physics.setPosition(x, y);

        // console.log(this.physics.width);

        // this.physics.setBody({
        //     type: 'polygon',
        //     sides: 5,
        //     radius: this.physics.width * 0.04
        // }, { // todo: discover how the fuck this chamfer stuff works
        //     // chamfer: { radius: [10, 40] }
        // });
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
