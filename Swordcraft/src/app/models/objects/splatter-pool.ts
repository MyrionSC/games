import {Enemy} from "./enemies/enemy";

export class SplatterPool extends Enemy {
    public LIVE_TIME = 150;

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
        // this.physics.setScale(0.08);
        // this.physics.setPosition(x, y);

        console.log(this.physics.width);

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
