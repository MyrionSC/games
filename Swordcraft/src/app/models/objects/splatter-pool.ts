import {Enemy} from "./enemies/enemy";

export class SplatterPool extends Enemy {
    public LIVE_TIME = 150;
    public OFFSET= 30;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'splatter-pool');
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

        console.log(this.physics.body);
    }
}
